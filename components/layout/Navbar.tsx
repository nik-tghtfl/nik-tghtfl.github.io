"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { useAuth } from "@/lib/hooks/useAuth"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

function Logo() {
  // #region agent log
  if (typeof window !== 'undefined') {
    const basePath = window.location.pathname.split('/')[1] || '';
    fetch('http://127.0.0.1:7242/ingest/94295a68-58c0-4c7f-a369-b8d6564b2c9c',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'components/layout/Navbar.tsx:12',message:'Logo component rendering',data:{basePath:basePath,currentPath:window.location.pathname,origin:window.location.origin},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
  }
  // #endregion
  
  // Use regular img tag for static export compatibility with basePath
  // Next.js handles basePath automatically for public assets in static exports
  // Detect if we're in production (with basePath) or development (without)
  const isProduction = typeof window !== 'undefined' && window.location.pathname.startsWith('/tghtfl.github.io');
  const basePath = isProduction ? '/tghtfl.github.io' : '';
  const imageSrc = `${basePath}/logo.png`;
  
  // #region agent log
  if (typeof window !== 'undefined') {
    fetch('http://127.0.0.1:7242/ingest/94295a68-58c0-4c7f-a369-b8d6564b2c9c',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'components/layout/Navbar.tsx:22',message:'Calculated image src',data:{imageSrc:imageSrc,pathname:window.location.pathname,fullUrl:window.location.origin + imageSrc},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
  }
  // #endregion
  
  return (
    <div className="flex items-center gap-2">
      <img
        src={imageSrc}
        alt="Quippi Logo"
        width={32}
        height={32}
        className="h-8 w-8 object-contain"
        onError={(e) => {
          // #region agent log
          const target = e.target as HTMLImageElement;
          fetch('http://127.0.0.1:7242/ingest/94295a68-58c0-4c7f-a369-b8d6564b2c9c',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'components/layout/Navbar.tsx:35',message:'Image load error',data:{src:target?.src,currentSrc:target?.currentSrc,pathname:window.location.pathname},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'C'})}).catch(()=>{});
          // #endregion
          // Fallback to original Q in blue square if image fails to load
          if (target) {
            target.style.display = 'none';
            const fallback = target.parentElement?.querySelector('.logo-fallback');
            if (fallback) {
              (fallback as HTMLElement).style.display = 'flex';
            }
          }
        }}
        onLoad={() => {
          // #region agent log
          fetch('http://127.0.0.1:7242/ingest/94295a68-58c0-4c7f-a369-b8d6564b2c9c',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'components/layout/Navbar.tsx:48',message:'Image loaded successfully',data:{src:imageSrc},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'D'})}).catch(()=>{});
          // #endregion
        }}
      />
      <div className="logo-fallback hidden h-8 w-8 items-center justify-center rounded-lg bg-primary">
        <span className="text-sm font-bold text-primary-foreground">Q</span>
      </div>
      <span className="text-2xl font-bold text-foreground">Quippi</span>
    </div>
  )
}

export function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const { user, isLoading, isAdmin, logout } = useAuth()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  // Show loading state to avoid hydration mismatch
  if (!mounted || isLoading) {
    return (
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
            <Logo />
          </Link>
          <nav className="flex items-center gap-1">
            <div className="h-9 w-20 animate-pulse rounded-lg bg-muted" />
          </nav>
        </div>
      </header>
    )
  }

  // Determine which links to show based on auth state
  const navLinks = []
  
  // Always show Home
  navLinks.push({ href: "/", label: "Home" })

  if (user) {
    // Show Quips for all authenticated users
    navLinks.push({ href: "/quips", label: "Quips" })
    
    // Only members (not admins) can submit feedback
    if (!isAdmin) {
      navLinks.push({ href: "/feedback", label: "Submit Feedback" })
    }
    
    // Only admins can see dashboard
    if (isAdmin) {
      navLinks.push({ href: "/dashboard", label: "Dashboard" })
    }
  } else {
    // Not logged in - show login link
    navLinks.push({ href: "/login", label: "Login" })
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <Logo />
        </Link>

        <div className="flex items-center gap-4">
          <nav className="flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "rounded-lg px-4 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  )}
                >
                  {link.label}
                </Link>
              )
            })}
          </nav>

          {/* User Info and Logout */}
          {user && (
            <div className="flex items-center gap-3 border-l border-border pl-4">
              <div className="flex items-center gap-2">
                <span className="text-sm text-foreground">
                  Hi, {user.displayName.split(" ")[0]}
                </span>
                {isAdmin && (
                  <Badge variant="secondary" className="text-xs">
                    Admin
                  </Badge>
                )}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white"
              >
                Logout
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
