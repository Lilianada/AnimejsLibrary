
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter
} from "@/components/ui/sheet"
import CodeBlock from '../CodeBlock'

const ModalAnimations = () => {
  const [codeVisible, setCodeVisible] = useState(false)

  const codeExample = `
import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from '@/components/ui/dialog'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'

// Fade-in, Scale-up Dialog
const FadeScaleDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Fade & Scale Dialog</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Fade & Scale Animation</DialogTitle>
          <DialogDescription>
            This dialog fades in and scales up when opened
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          Content appears with the dialog
        </div>
        <DialogFooter>
          <Button type="button">Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// Slide-in Sheet (Drawer)
const SlideInSheet = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Slide-in Drawer</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Slide-in Animation</SheetTitle>
          <SheetDescription>
            This drawer slides in from the side
          </SheetDescription>
        </SheetHeader>
        <div className="py-4">
          <p>Drawer content can slide in sequentially</p>
        </div>
        <SheetFooter>
          <Button type="button">Close</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
`

  return (
    <Card className="shadow-lg border-border">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Modal & Dialog Animations</span>
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
          <div className="p-6 bg-muted rounded-lg flex flex-wrap gap-4">
            <div className="flex-1 min-w-[250px] space-y-4">
              <h3 className="text-lg font-medium">Fade & Scale Animations</h3>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">Fade & Scale Dialog</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Fade & Scale Animation</DialogTitle>
                    <DialogDescription>
                      This dialog fades in and scales up when opened.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <p>Dialog content appears with a subtle fade-in effect.</p>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="button">Close</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            <div className="flex-1 min-w-[250px] space-y-4">
              <h3 className="text-lg font-medium">Slide-in Animations</h3>
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline">Slide-in Drawer (Right)</Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Slide-in Animation</SheetTitle>
                    <SheetDescription>
                      This drawer slides in from the side with a backdrop blur effect.
                    </SheetDescription>
                  </SheetHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <p className="text-sm text-muted-foreground">
                        Content inside this drawer appears in sequence for a staggered entrance effect.
                      </p>
                    </div>
                    <div className="grid gap-2">
                      <Button size="sm">Action Button</Button>
                    </div>
                  </div>
                  <SheetFooter>
                    <Button type="button">Close</Button>
                  </SheetFooter>
                </SheetContent>
              </Sheet>

              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline">Slide-in Drawer (Bottom)</Button>
                </SheetTrigger>
                <SheetContent side="bottom">
                  <SheetHeader>
                    <SheetTitle>Bottom Sheet</SheetTitle>
                    <SheetDescription>
                      This drawer slides in from the bottom of the screen.
                    </SheetDescription>
                  </SheetHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <p className="text-sm text-muted-foreground">
                        Bottom sheets are great for mobile interfaces.
                      </p>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
          
          {codeVisible && <CodeBlock code={codeExample} />}
        </div>
      </CardContent>
    </Card>
  )
}

export default ModalAnimations
