
import { useState } from 'react'
import Navbar from '@/components/Navbar'
import MainContainer from '@/components/examples/MainContainer'
import Sidebar from '@/components/examples/Sidebar'
import Footer from '@/components/Footer'

const Examples = () => {
  const [selectedCategory, setSelectedCategory] = useState('buttons')

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <div className="flex-1 flex mt-16">
        <Sidebar selectedCategory={selectedCategory} onSelectCategory={setSelectedCategory} />
        <MainContainer category={selectedCategory} />
      </div>
      <Footer />
    </div>
  )
}

export default Examples
