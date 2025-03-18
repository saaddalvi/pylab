import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 w-full border-b border-slate-800 bg-slate-950/90 backdrop-blur supports-[backdrop-filter]:bg-slate-950/80">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <a href="/" className="flex items-center">
              <h1 className="text-xl font-bold">
                <span className="text-primary">Py</span>
                <span className="text-foreground">Lab</span>
              </h1>
            </a>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center justify-center space-x-8">
            <a 
              href="#features" 
              className="text-sm font-medium text-slate-400 hover:text-white transition-colors duration-200"
            >
              Features
            </a>
            <a 
              href="#how-it-works" 
              className="text-sm font-medium text-slate-400 hover:text-white transition-colors duration-200"
            >
              How It Works
            </a>
          </nav>
          
          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="hidden sm:inline-flex text-sm">
              Sign In
            </Button>
            <Button size="sm" className="text-sm font-medium">
              Get Started
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      <div className="border-t border-slate-800 md:hidden">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-center space-x-10">
            <a 
              href="#features" 
              className="text-sm font-medium text-slate-400 hover:text-white transition-colors duration-200"
            >
              Features
            </a>
            <a 
              href="#how-it-works" 
              className="text-sm font-medium text-slate-400 hover:text-white transition-colors duration-200"
            >
              How It Works
            </a>
          </div>
        </div>
      </div>
    </header>
  );
} 