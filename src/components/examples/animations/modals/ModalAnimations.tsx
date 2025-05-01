import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";
import { X } from "lucide-react";
import CodeBlock from "../CodeBlock";

const ModalAnimations = () => {
  const [codeVisible, setCodeVisible] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [bottomSheetOpen, setBottomSheetOpen] = useState(false);

  const codeExample = `// ... keep existing code (code example string)`;

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
            {codeVisible ? "Hide Code" : "View Code"}
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex flex-col gap-4">
            <div className="flex-1 min-w-[250px] space-y-4">
              <h3 className="text-lg font-medium">Fade & Scale Animations</h3>
              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
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
                      <p>
                        Dialog content appears with a subtle fade-in effect.
                      </p>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="button" onClick={() => setDialogOpen(false)}>
                      Close
                    </Button>
                  </DialogFooter>
                  <button
                    className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
                    onClick={() => setDialogOpen(false)}
                  >
                    <X className="h-4 w-4" />
                    <span className="sr-only">Close</span>
                  </button>
                </DialogContent>
              </Dialog>
            </div>

            <div className="flex-1 min-w-[250px] space-y-4">
              <h3 className="text-lg font-medium">Slide-in Animations</h3>
              <div className="flex flex-col gap-2">
                <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
                  <SheetTrigger asChild>
                    <Button variant="outline">Slide-in Drawer (Right)</Button>
                  </SheetTrigger>
                  <SheetContent>
                    <SheetHeader>
                      <SheetTitle>Slide-in Animation</SheetTitle>
                      <SheetDescription>
                        This drawer slides in from the side with a backdrop blur
                        effect.
                      </SheetDescription>
                    </SheetHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <p className="text-sm text-muted-foreground">
                          Content inside this drawer appears in sequence for a
                          staggered entrance effect.
                        </p>
                      </div>
                    </div>
                    <SheetFooter>
                      <Button type="button" onClick={() => setSheetOpen(false)}>
                        Close
                      </Button>
                    </SheetFooter>
                  </SheetContent>
                </Sheet>

                <Sheet open={bottomSheetOpen} onOpenChange={setBottomSheetOpen}>
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
                    <Button
                      type="button"
                      onClick={() => setBottomSheetOpen(false)}
                      className="absolute right-4 top-4"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </div>

          {codeVisible && <CodeBlock code={codeExample} />}
        </div>
      </CardContent>
    </Card>
  );
};

export default ModalAnimations;
