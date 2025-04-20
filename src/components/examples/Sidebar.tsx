
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Shapes, Sparkles, Layout, Square, MessageSquare } from 'lucide-react'

type CategoryType = 'buttons' | 'animations' | 'forms' | 'layouts' | 'cards'

interface SidebarProps {
  selectedCategory: string
  onSelectCategory: (category: CategoryType) => void
}

const Sidebar = ({ selectedCategory, onSelectCategory }: SidebarProps) => {
  const [isHovered, setIsHovered] = useState<CategoryType | null>(null)

  const categories = [
    { id: 'buttons', name: 'Buttons', icon: Sparkles },
    { id: 'animations', name: 'Animations', icon: Shapes },
    { id: 'forms', name: 'Forms & Inputs', icon: MessageSquare },
    { id: 'layouts', name: 'Layouts', icon: Layout },
    { id: 'cards', name: 'Cards', icon: Square }
  ]

  return (
    <aside className="w-64 border-r border-border bg-card h-[calc(100vh-4rem)] min-h-[calc(100vh-4rem)] overflow-auto">
      <ScrollArea className="px-4 py-6 h-full">
        <h3 className="text-lg font-semibold px-2 mb-3">Categories</h3>
        <nav className="space-y-1">
          {categories.map((category) => {
            const Icon = category.icon
            return (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? 'default' : 'ghost'}
                size="sm"
                className={cn(
                  'w-full justify-start relative overflow-hidden transition-all duration-300',
                  selectedCategory === category.id && 'bg-primary text-primary-foreground',
                  isHovered === category.id && selectedCategory !== category.id && 'bg-muted'
                )}
                onClick={() => onSelectCategory(category.id as CategoryType)}
                onMouseEnter={() => setIsHovered(category.id as CategoryType)}
                onMouseLeave={() => setIsHovered(null)}
              >
                <Icon className="h-4 w-4 mr-2" />
                {category.name}
                {selectedCategory === category.id && (
                  <span className="absolute bottom-0 left-0 h-[3px] w-full bg-accent" />
                )}
              </Button>
            )
          })}
        </nav>
      </ScrollArea>
    </aside>
  )
}

export default Sidebar
