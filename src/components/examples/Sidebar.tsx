
import { useState } from 'react'
import { ChevronDown, ChevronRight } from 'lucide-react'

interface SidebarProps {
  selectedCategory: string
  onSelectCategory: (category: string) => void
}

const Sidebar = ({ selectedCategory, onSelectCategory }: SidebarProps) => {
  const [expanded, setExpanded] = useState(true)

  const categories = [
    {
      name: 'Buttons',
      id: 'buttons',
      items: ['Hover', 'Focus', 'Click/Active', 'Disabled']
    }
  ]

  return (
    <aside className={`w-64 bg-secondary/10 p-4 border-r border-border transition-all ${
      expanded ? 'translate-x-0' : '-translate-x-56'
    }`}>
      <div className="space-y-4">
        {categories.map(category => (
          <div key={category.id}>
            <button
              onClick={() => onSelectCategory(category.id)}
              className={`w-full text-left px-4 py-2 rounded-md transition-colors ${
                selectedCategory === category.id ? 'bg-primary text-primary-foreground' : 'hover:bg-accent'
              }`}
            >
              {category.name}
            </button>
            <div className="ml-4 mt-2 space-y-1">
              {category.items.map(item => (
                <button
                  key={item}
                  className="w-full text-left px-4 py-1 text-sm hover:text-primary transition-colors"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={() => setExpanded(!expanded)}
        className="absolute right-2 top-4 p-2 hover:bg-accent rounded-md transition-colors"
      >
        {expanded ? <ChevronRight size={20} /> : <ChevronDown size={20} />}
      </button>
    </aside>
  )
}

export default Sidebar
