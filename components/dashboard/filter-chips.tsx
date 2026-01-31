"use client"

import { cn } from "@/lib/utils"
import type { Category } from "@/types"

const categories: Category[] = ["All", "Process", "Communication", "Tools", "Culture", "Other"]

interface FilterChipsProps {
  activeFilter: Category
  onFilterChange: (category: Category) => void
}

export function FilterChips({ activeFilter, onFilterChange }: FilterChipsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onFilterChange(category)}
          className={cn(
            "px-4 py-2 text-sm font-medium rounded-lg transition-colors",
            activeFilter === category
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          )}
        >
          {category}
        </button>
      ))}
    </div>
  )
}
