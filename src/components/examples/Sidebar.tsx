
import { useState } from 'react'
import { ChevronRight, ChevronDown } from 'lucide-react'
import { Card } from '@/components/ui/card'

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
    },
    {
      name: 'Cards',
      id: 'cards',
      items: ['Basic', 'Interactive', 'Stateful']
    },
    {
      name: 'Inputs',
      id: 'inputs',
      items: ['Text', 'Checkboxes', 'Radio']
    },
    {
      name: 'Navigation',
      id: 'navigation',
      items: ['Menus', 'Tabs', 'Breadcrumbs']
    }
  ]

  return (
    <aside className={`w-64 border-r border-border transition-all ${
      expanded ? 'translate-x-0' : '-translate-x-56'
    }`}>
      <div className="p-4">
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Components</h2>
          <p className="text-sm text-muted-foreground">Browse animation examples</p>
        </div>
        
        <div className="space-y-4">
          {categories.map(category => (
            <Card key={category.id} className={`overflow-hidden border ${
              selectedCategory === category.id ? 'border-primary' : 'border-border'
            }`}>
              <button
                onClick={() => onSelectCategory(category.id)}
                className={`w-full text-left px-4 py-3 transition-colors ${
                  selectedCategory === category.id 
                    ? 'bg-card text-foreground' 
                    : 'hover:bg-muted'
                }`}
              >
                <span className="font-medium">{category.name}</span>
              </button>
              {selectedCategory === category.id && (
                <div className="ml-4 pb-2 space-y-1">
                  {category.items.map(item => (
                    <button
                      key={item}
                      className="w-full text-left px-4 py-1.5 text-sm hover:text-primary transition-colors"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>
      <button
        onClick={() => setExpanded(!expanded)}
        className="absolute right-2 top-4 p-2 hover:bg-muted rounded-md transition-colors"
      >
        {expanded ? <ChevronRight size={20} /> : <ChevronDown size={20} />}
      </button>
    </aside>
  )
}

export default Sidebar
