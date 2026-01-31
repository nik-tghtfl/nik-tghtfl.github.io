// Quippi TypeScript Types
// This file will contain shared types for the application

export type UserRole = "member" | "admin"

export interface User {
  id: string
  username: string
  displayName: string
  role: UserRole
  team: string
}

export interface Feedback {
  id: string
  content: string
  category?: string
  createdAt: Date
}

export interface FeedbackProgram {
  id: string
  title: string
  description: string
  isActive: boolean
  createdAt: Date
}
