"use client"

import { useEffect, useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Megaphone, Plus } from "lucide-react"
import { useAuth } from "@/lib/hooks/useAuth"
import { QuipList } from "@/components/quips/QuipList"
import { RespondModal } from "@/components/quips/RespondModal"
import { CreateQuipModal } from "@/components/quips/CreateQuipModal"
import { getQuipsFromSheet, submitQuipResponse, createQuipInMock, getQuipResponsesFromSheet } from "@/lib/api"
import type { Quip, QuipResponse } from "@/types"

/**
 * Helper to get responded quip IDs from localStorage
 */
function getRespondedQuipIds(userId: string): Set<string> {
  if (typeof window === "undefined") return new Set()
  try {
    const key = `quibi_quip_responses_${userId}`
    const stored = localStorage.getItem(key)
    if (stored) {
      return new Set(JSON.parse(stored))
    }
  } catch (error) {
    console.error("Failed to read responded quips from localStorage:", error)
  }
  return new Set()
}

/**
 * Helper to save responded quip ID to localStorage
 */
function saveRespondedQuipId(userId: string, quipId: string): void {
  if (typeof window === "undefined") return
  try {
    const key = `quibi_quip_responses_${userId}`
    const responded = getRespondedQuipIds(userId)
    responded.add(quipId)
    localStorage.setItem(key, JSON.stringify(Array.from(responded)))
  } catch (error) {
    console.error("Failed to save responded quip to localStorage:", error)
  }
}

/**
 * Helper to clear all quip responses from localStorage
 * This resets the status so users can submit responses again
 */
function clearAllQuipResponses(): void {
  if (typeof window === "undefined") return
  try {
    // Clear all localStorage keys that match the quip response pattern
    const keysToRemove: string[] = []
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (key && key.startsWith('quibi_quip_responses_')) {
        keysToRemove.push(key)
      }
    }
    keysToRemove.forEach(key => localStorage.removeItem(key))
    console.log(`Cleared ${keysToRemove.length} quip response records`)
  } catch (error) {
    console.error("Failed to clear quip responses from localStorage:", error)
  }
}

// Expose clear function to window for easy access in browser console
if (typeof window !== "undefined") {
  (window as any).clearQuipResponses = clearAllQuipResponses
}

export default function QuipsPage() {
  const router = useRouter()
  const { user, isLoading, isAdmin } = useAuth()
  const [mounted, setMounted] = useState(false)
  const [quips, setQuips] = useState<Quip[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedQuip, setSelectedQuip] = useState<Quip | null>(null)
  const [respondModalOpen, setRespondModalOpen] = useState(false)
  const [createQuipModalOpen, setCreateQuipModalOpen] = useState(false)
  const [respondedQuipIds, setRespondedQuipIds] = useState<Set<string>>(new Set())

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted && !isLoading && !user) {
      router.push("/login")
    }
  }, [mounted, isLoading, user, router])

  // Load responded quips from localStorage
  useEffect(() => {
    if (user) {
      setRespondedQuipIds(getRespondedQuipIds(user.id))
    }
  }, [user])

  // Fetch quips
  const fetchQuips = useCallback(async () => {
    if (!user) return
    
    setLoading(true)
    try {
      const data = await getQuipsFromSheet()
      
      // For admins, show all quips (active and closed). For regular users, only active
      if (isAdmin) {
        // Also fetch responses to calculate counts
        try {
          const allResponses = await getQuipResponsesFromSheet()
          const countsByQuipId: Record<string, number> = {}
          allResponses.forEach((response) => {
            countsByQuipId[response.quip_id] = (countsByQuipId[response.quip_id] || 0) + 1
          })
          
          const quipsWithCounts = data.map((quip) => ({
            ...quip,
            responses: countsByQuipId[quip.id] || 0,
          }))
          
          setQuips(quipsWithCounts)
        } catch (error) {
          console.warn("Failed to fetch quip responses, showing quips without counts:", error)
          setQuips(data.map((quip) => ({ ...quip, responses: 0 })))
        }
      } else {
        // Filter to only active quips for regular users
        const activeQuips = data.filter(q => q.status === "active")
        setQuips(activeQuips)
      }
    } catch (error) {
      console.error("Failed to fetch quips:", error)
    } finally {
      setLoading(false)
    }
  }, [user, isAdmin])

  useEffect(() => {
    if (mounted && !isLoading && user) {
      fetchQuips()
    }
  }, [mounted, isLoading, user, fetchQuips])

  const handleRespond = (quip: Quip) => {
    setSelectedQuip(quip)
    setRespondModalOpen(true)
  }

  const handleSubmitResponse = async (
    newResponse: Omit<QuipResponse, "id" | "created_at">
  ) => {
    if (!user) return

    try {
      await submitQuipResponse(newResponse)
      // Save to localStorage
      saveRespondedQuipId(user.id, newResponse.quip_id)
      setRespondedQuipIds(prev => new Set([...prev, newResponse.quip_id]))
      // Refresh quips to update response counts
      await fetchQuips()
    } catch (error) {
      console.error("Failed to submit response:", error)
      throw error
    }
  }

  const handleViewResponses = (quip: Quip) => {
    // Navigate to dashboard - the dashboard will handle showing the quip detail
    router.push(`/dashboard?quipId=${quip.id}`)
  }

  const handleCreateQuip = async (
    newQuip: Omit<Quip, "id" | "created_at" | "responses">
  ) => {
    if (!user) return
    try {
      await createQuipInMock({
        ...newQuip,
        created_by: user.id,
      })
      await fetchQuips()
    } catch (error) {
      console.error("Failed to create quip:", error)
      throw error
    }
  }

  // Show loading state while checking auth
  if (!mounted || isLoading || !user) {
    return (
      <div className="container mx-auto flex min-h-screen items-center justify-center px-4 py-12">
        <div className="text-center">
          <div className="h-8 w-48 animate-pulse rounded bg-muted mx-auto mb-4" />
          <div className="h-4 w-32 animate-pulse rounded bg-muted mx-auto" />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Megaphone className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Open Quips</h1>
              <p className="text-muted-foreground">
                {isAdmin 
                  ? "Manage quips and view responses from your team."
                  : "Share your anonymous feedback on these topics."
                }
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {isAdmin && (
              <Button
                className="bg-blue-600 hover:bg-blue-700 text-white"
                onClick={() => setCreateQuipModalOpen(true)}
              >
                <Plus className="h-4 w-4 mr-2" />
                Create Quip
              </Button>
            )}
            <Button variant="outline" asChild>
              <Link href="/">Back to Home</Link>
            </Button>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="h-8 w-48 animate-pulse rounded bg-muted mx-auto mb-4" />
            <p className="text-sm text-muted-foreground">Loading quips...</p>
          </div>
        ) : (
          <QuipList
            quips={quips}
            variant={isAdmin ? "admin" : "employee"}
            respondedQuipIds={respondedQuipIds}
            onRespond={handleRespond}
            onViewResponses={isAdmin ? handleViewResponses : undefined}
            emptyMessage="No open quips right now."
          />
        )}
      </div>

      <RespondModal
        open={respondModalOpen}
        onOpenChange={setRespondModalOpen}
        quip={selectedQuip}
        defaultDepartment={user?.team || ""}
        onSubmit={handleSubmitResponse}
      />

      {isAdmin && (
        <CreateQuipModal
          open={createQuipModalOpen}
          onOpenChange={setCreateQuipModalOpen}
          onCreate={handleCreateQuip}
        />
      )}
    </div>
  )
}
