"use client"

import { useState, FormEvent } from "react"
import { useRouter } from "next/navigation"
import { login, getDemoCredentials } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function LoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const demoCredentials = getDemoCredentials()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    const user = login(username, password)

    if (!user) {
      setError("Invalid username or password")
      setIsLoading(false)
      return
    }

    // Redirect based on role
    if (user.role === "admin") {
      router.push("/dashboard")
    } else {
      router.push("/")
    }
  }

  return (
    <div className="container mx-auto flex min-h-screen items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Login to Quibi</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Error Message */}
            {error && (
              <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-800 dark:border-red-800 dark:bg-red-950 dark:text-red-200">
                {error}
              </div>
            )}

            {/* Username Field */}
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                required
                disabled={isLoading}
                autoComplete="username"
              />
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                disabled={isLoading}
                autoComplete="current-password"
              />
            </div>

            {/* Login Button */}
            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </form>

          {/* Demo Credentials Hint */}
          <div className="mt-6 rounded-lg border border-border bg-muted/30 p-4">
            <p className="mb-2 text-xs font-medium text-muted-foreground">
              Demo Credentials:
            </p>
            <div className="space-y-1 text-xs text-muted-foreground">
              <p>
                Employee: <span className="font-mono">{demoCredentials.member.username}</span> /{" "}
                <span className="font-mono">{demoCredentials.member.password}</span>
              </p>
              <p>
                Admin: <span className="font-mono">{demoCredentials.admin.username}</span> /{" "}
                <span className="font-mono">{demoCredentials.admin.password}</span>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
