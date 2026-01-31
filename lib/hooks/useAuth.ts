"use client"

import { useState, useEffect } from "react"
import { getUser, logout as authLogout, isAdmin, isMember } from "@/lib/auth"
import type { User } from "@/types"

interface UseAuthReturn {
  user: User | null
  isLoading: boolean
  isAdmin: boolean
  isMember: boolean
  logout: () => void
}

/**
 * Custom hook for managing authentication state
 * Handles SSR-safe auth state checking and prevents hydration mismatches
 */
export function useAuth(): UseAuthReturn {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Only run on client side
    if (typeof window !== "undefined") {
      const currentUser = getUser()
      setUser(currentUser)
      setIsLoading(false)
    }
  }, [])

  const handleLogout = () => {
    authLogout()
    setUser(null)
  }

  return {
    user,
    isLoading,
    isAdmin: isAdmin(),
    isMember: isMember(),
    logout: handleLogout,
  }
}
