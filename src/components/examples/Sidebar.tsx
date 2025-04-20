
import { useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Menu } from 'lucide-react'
import { useIsMobile } from '@/hooks/use-mobile'

interface SidebarProps {
  selectedCategory: string
  onSelectCategory: (category: string) => void
}

const Sidebar = ({ selectedCategory, onSelectCategory }: SidebarProps) => {
  const isMobile = useIsMobile()
  const [mounted, setMounted] = useState(false)
  const sidebarRef = useRef<HTMLDivElement>(null)

  // Define categories
  const categories = [
    { id: 'buttons', name: 'Buttons' },
    { id: 'forms', name: 'Forms & Inputs' },
    { id: 'animations', name: 'Animations' },
    { id: 'modals', name: 'Modals & Dialogs' },
    { id: 'cards', name: 'Cards & Tiles' },
    { id: 'loaders', name: 'Loaders & Spinners' },
    { id: 'layouts', name: 'Layouts' }
  ]

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted && sidebarRef.current) {
      const items = sidebarRef.current.querySelectorAll('.sidebar-item')
      items.forEach((item, index) => {
        const element = item as HTMLElement
        element.style.opacity = '0'
        element.style.transform = 'translateX(-10px)'
        
        setTimeout(() => {
          element.style.transition = 'opacity 300ms, transform 300ms'
          element.style.opacity = '1'
          element.style.transform = 'translateX(0)'
        }, 100 + index * 50)
      })
    }
  }, [mounted])

  const SidebarContent = () => (
    <div className="h-full flex flex-col gap-1 pt-4" ref={sidebarRef}>
      <div className="mb-4 px-4">
        <h2 className="text-lg font-semibold">Component Categories</h2>
        <p className="text-sm text-muted-foreground">Select a category to explore examples</p>
      </div>
      {categories.map(category => (
        <Button 
          key={category.id}
          variant="ghost"
          className={`sidebar-item justify-start px-4 transition-none ${
            selectedCategory === category.id
              ? 'text-[#FDA858] font-bold'
              : 'hover:text-[#FDA858]'
          }`}
          onClick={() => onSelectCategory(category.id)}
        >
          {category.name}
        </Button>
      ))}
    </div>
  )

  if (!mounted) return null

  return isMobile ? (
    <div className="fixed top-16 left-0 z-30 w-full p-4 flex items-center border-b bg-background">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="mr-2">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-72 p-0">
          <SidebarContent />
        </SheetContent>
      </Sheet>
      <div>
        <h2 className="text-lg font-semibold">
          {categories.find(c => c.id === selectedCategory)?.name || 'Examples'}
        </h2>
      </div>
    </div>
  ) : (
    <aside className="w-64 border-r h-[calc(100vh-4rem)] sticky top-16">
      <SidebarContent />
    </aside>
  )
}

export default Sidebar
