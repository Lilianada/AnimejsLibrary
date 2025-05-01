import React from 'react';
// ... other imports ...

const Navbar = () => {
  // ... state and hooks ...

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between h-16 px-4 md:px-6 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 lg:hidden">
      {/* Add lg:hidden class */}
      {/* ... rest of navbar content ... */}
    </header>
  );
};

export default Navbar; 