import { useState } from 'react'
import { useRef, useEffect } from 'react'
import { CodeToggle } from './CodeToggle'
import ModalAnimations from './animations/modals/ModalAnimations'
import ModalShowcaseWrapper from './ModalShowcaseWrapper'
import { Button } from '@/components/ui/button'
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose
} from '@/components/ui/dialog'
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'

// --- Define Example Components --- 

// Existing component
const ExistingModalAnimations = () => <ModalAnimations />;

// New Example 1: Simple Info Dialog
const InfoDialogExample = () => (
  <Dialog>
    <DialogTrigger asChild>
      <Button variant="outline">Show Info</Button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Information</DialogTitle>
        <DialogDescription>This is a simple informational dialog.</DialogDescription>
      </DialogHeader>
      <p className="py-4">You can put any content here.</p>
      <DialogFooter>
        <DialogClose asChild>
          <Button type="button" variant="secondary">Close</Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);

// New Example 2: Form Dialog
const FormDialogExample = () => {
  const [name, setName] = useState('')
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Open Form</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>Make changes to your profile here.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="name" className="text-right">Name</label>
            <input id="name" value={name} onChange={(e) => setName(e.target.value)} className="col-span-3 p-2 border rounded" placeholder="Your Name"/>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild><Button type="button" variant="secondary">Cancel</Button></DialogClose>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// New Example 3: Confirmation Alert Dialog
const ConfirmAlertDialogExample = () => (
  <AlertDialog>
    <AlertDialogTrigger asChild>
      <Button variant="destructive">Delete Account</Button>
    </AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
        <AlertDialogDescription>
          This action cannot be undone. This will permanently delete your account.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction onClick={() => console.log('Account deleted') /* Add actual action */}>Continue</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
);

// New Example 4: Simple Alert
const SimpleAlertDialogExample = () => (
  <AlertDialog defaultOpen={false}>
    <AlertDialogTrigger asChild>
      <Button variant="outline">Show Alert</Button>
    </AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Action Required</AlertDialogTitle>
        <AlertDialogDescription>
          Please review the terms before proceeding.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
         <AlertDialogCancel>Close</AlertDialogCancel> 
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
);

// Updated data array (No code snippets needed with new wrapper)
const MODAL_DATA = [
  {
    label: "Animated Modals",
    description: "Examples of modal entrance and exit animations using Anime.js.",
    component: <ExistingModalAnimations />,
  },
  {
    label: "Simple Info Dialog",
    description: "Basic dialog using Shadcn Dialog component.",
    component: <InfoDialogExample />,
  },
  {
    label: "Dialog with Form",
    description: "Example of using a form within a Shadcn Dialog.",
    component: <FormDialogExample />,
  },
  {
    label: "Confirmation Alert Dialog",
    description: "Destructive action confirmation using Shadcn AlertDialog.",
    component: <ConfirmAlertDialogExample />,
  },
  {
    label: "Simple Alert",
    description: "Basic alert message using Shadcn AlertDialog.",
    component: <SimpleAlertDialogExample />,
  }
];

const ModalsExamples = () => {
  return (
    <div className="space-y-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-3">Modal & Dialog Examples</h2>
        <p className="text-muted-foreground">
          Explore different types of modals and dialogs.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {MODAL_DATA.map((modal) => (
          <ModalShowcaseWrapper
            key={modal.label}
            label={modal.label}
            description={modal.description}
            className="w-full"
          >
            {modal.component}
          </ModalShowcaseWrapper>
        ))}
      </div>
    </div>
  );
};

export default ModalsExamples
