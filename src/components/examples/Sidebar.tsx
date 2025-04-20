
import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import {
  Sidebar as ShadcnSidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

interface Category {
  title: string;
  items: { id: string; name: string }[];
}

const categories: Category[] = [
  {
    title: "Buttons",
    items: [
      { id: "button-hover", name: "Hover Effects" },
      { id: "button-focus", name: "Focus Effects" },
      { id: "button-click", name: "Click Effects" },
      { id: "button-disabled", name: "Disabled States" },
    ],
  },
];

export const Sidebar = () => {
  const [expanded, setExpanded] = useState<string[]>(["Buttons"]);
  const [selectedItem, setSelectedItem] = useState("button-hover");

  const toggleCategory = (title: string) => {
    setExpanded(prev =>
      prev.includes(title)
        ? prev.filter(t => t !== title)
        : [...prev, title]
    );
  };

  return (
    <ShadcnSidebar>
      <SidebarHeader className="p-4">
        <h2 className="text-lg font-semibold">Animation Examples</h2>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {categories.map((category) => (
            <div key={category.title} className="px-2">
              <button
                onClick={() => toggleCategory(category.title)}
                className="flex items-center w-full p-2 text-sm hover:bg-accent rounded-md"
              >
                {expanded.includes(category.title) ? (
                  <ChevronDown className="w-4 h-4 mr-1" />
                ) : (
                  <ChevronRight className="w-4 h-4 mr-1" />
                )}
                {category.title}
              </button>
              {expanded.includes(category.title) && (
                <div className="ml-4">
                  {category.items.map((item) => (
                    <SidebarMenuItem key={item.id}>
                      <SidebarMenuButton
                        onClick={() => setSelectedItem(item.id)}
                        className={selectedItem === item.id ? "bg-accent" : ""}
                      >
                        {item.name}
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </div>
              )}
            </div>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </ShadcnSidebar>
  );
};
