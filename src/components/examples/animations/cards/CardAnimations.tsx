
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Check } from 'lucide-react'
import CodeBlock from '../CodeBlock'
import './card-animations.css'

const CardAnimations = () => {
  const [codeVisible, setCodeVisible] = useState(false)
  const [selectedCard, setSelectedCard] = useState<number | null>(null)

  const handleCardSelect = (index: number) => {
    setSelectedCard(selectedCard === index ? null : index)
  }

  const codeExample = `
// CSS required for the animations
.card-hover {
  transition: all 0.3s ease;
}

.card-hover:hover {
  transform: translateY(-8px);
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
}

.card-reveal {
  position: relative;
  overflow: hidden;
}

.card-reveal .card-overlay {
  position: absolute;
  bottom: -100%;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 1rem;
  transition: bottom 0.3s ease-in-out;
}

.card-reveal:hover .card-overlay {
  bottom: 0;
}

.card-selectable {
  transition: all 0.2s ease;
  border: 2px solid transparent;
}

.card-selectable.selected {
  border-color: rgb(var(--primary));
  transform: scale(1.02);
}

.card-selectable .check-icon {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  opacity: 0;
  transform: scale(0);
  transition: all 0.2s ease;
}

.card-selectable.selected .check-icon {
  opacity: 1;
  transform: scale(1);
}

// React component
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Check } from 'lucide-react'

const AnimatedCards = () => {
  const [selectedCard, setSelectedCard] = useState(null)

  const handleCardSelect = (index) => {
    setSelectedCard(selectedCard === index ? null : index)
  }

  return (
    <div className="grid grid-cols-3 gap-4">
      {/* Hover Lift Card */}
      <Card className="card-hover">
        <CardHeader>
          <CardTitle>Hover Lift</CardTitle>
        </CardHeader>
        <CardContent>
          Hover over this card to see it lift up with a shadow.
        </CardContent>
      </Card>

      {/* Content Reveal Card */}
      <Card className="card-reveal">
        <CardHeader>
          <CardTitle>Content Reveal</CardTitle>
        </CardHeader>
        <CardContent>
          Hover to reveal additional information.
          <div className="card-overlay">
            Hidden content that slides in on hover!
          </div>
        </CardContent>
      </Card>

      {/* Selectable Card */}
      <Card 
        className={\`card-selectable relative \${selectedCard === 2 ? 'selected' : ''}\`}
        onClick={() => handleCardSelect(2)}
      >
        <div className="check-icon">
          <Check className="h-5 w-5 text-primary" />
        </div>
        <CardHeader>
          <CardTitle>Selectable Card</CardTitle>
        </CardHeader>
        <CardContent>
          Click to select this card with animation.
        </CardContent>
      </Card>
    </div>
  )
}
`

  return (
    <Card className="shadow-lg border-border">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Card & Tile Animations</span>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setCodeVisible(!codeVisible)}
          >
            {codeVisible ? 'Hide Code' : 'View Code'}
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Hover Lift Card */}
            <Card className="card-hover">
              <CardHeader>
                <CardTitle>Hover Lift</CardTitle>
                <CardDescription>Elevate on hover</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Hover over this card to see it lift up with an enhanced shadow effect.</p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm">Learn More</Button>
              </CardFooter>
            </Card>

            {/* Content Reveal Card */}
            <Card className="card-reveal">
              <CardHeader>
                <CardTitle>Content Reveal</CardTitle>
                <CardDescription>Hidden information</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-32 flex items-center justify-center bg-muted rounded-md">
                  <p className="text-center">Hover to reveal additional content</p>
                </div>
                <div className="card-overlay">
                  <h3 className="text-lg font-bold mb-2">Hidden Content</h3>
                  <p>This content slides in from the bottom when you hover over the card!</p>
                </div>
              </CardContent>
            </Card>

            {/* Image Zoom Card */}
            <Card className="overflow-hidden">
              <div className="image-zoom-container">
                <div className="image-zoom" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1964&auto=format&fit=crop')" }} />
              </div>
              <CardHeader>
                <CardTitle>Image Zoom</CardTitle>
                <CardDescription>Hover effect</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Hover over the image to see a smooth zoom animation.</p>
              </CardContent>
            </Card>

            {/* Selectable Card 1 */}
            <Card 
              className={`card-selectable relative ${selectedCard === 0 ? 'selected' : ''}`}
              onClick={() => handleCardSelect(0)}
            >
              <div className="check-icon">
                <Check className="h-5 w-5 text-primary" />
              </div>
              <CardHeader>
                <CardTitle>Selectable Card</CardTitle>
                <CardDescription>Click to select</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Click to select this card. Notice the animated border and checkmark.</p>
              </CardContent>
            </Card>

            {/* Selectable Card 2 */}
            <Card 
              className={`card-selectable relative ${selectedCard === 1 ? 'selected' : ''}`}
              onClick={() => handleCardSelect(1)}
            >
              <div className="check-icon">
                <Check className="h-5 w-5 text-primary" />
              </div>
              <CardHeader>
                <CardTitle>Another Option</CardTitle>
                <CardDescription>Selection animation</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Select this card to see a different animation style.</p>
              </CardContent>
            </Card>

            {/* Fade In Card */}
            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle>Fade In Card</CardTitle>
                <CardDescription>Entrance animation</CardDescription>
              </CardHeader>
              <CardContent>
                <p>This card fades in when the component mounts. Refresh to see the effect again.</p>
              </CardContent>
            </Card>
          </div>
          
          {codeVisible && <CodeBlock code={codeExample} />}
        </div>
      </CardContent>
    </Card>
  )
}

export default CardAnimations
