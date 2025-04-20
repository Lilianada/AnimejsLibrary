
import { Button } from "@/components/ui/button"

interface SidebarProps {
  selectedCategory: string
  onSelectCategory: (category: string) => void
}

const Sidebar = ({ selectedCategory, onSelectCategory }: SidebarProps) => {
  const categories = [
    { id: "buttons", name: "Buttons" },
    { id: "animations", name: "Animations" },
    { id: "forms", name: "Forms" },
    { id: "layouts", name: "Layouts" },
    { id: "cards", name: "Cards" },
  ]

  return (
    <aside className="w-56 bg-card border-r border-border p-4 space-y-2">
      <h2 className="font-bold text-lg mb-4">Categories</h2>
      {categories.map((category) => (
        <Button
          key={category.id}
          variant={selectedCategory === category.id ? "default" : "ghost"}
          className="w-full justify-start"
          onClick={() => onSelectCategory(category.id)}
        >
          {category.name}
        </Button>
      ))}
    </aside>
  )
}

export default Sidebar
