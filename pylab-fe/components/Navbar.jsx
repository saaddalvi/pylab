import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 w-full border-b border-indigo-500/20 bg-slate-950/80 backdrop-blur-md supports-[backdrop-filter]:bg-slate-950/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <a href="/" className="flex items-center">
              <h1 className="text-xl font-bold">
                <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Py</span>
                <span className="text-slate-200">Lab</span>
              </h1>
            </a>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center justify-center space-x-8">
            <a 
              href="#features" 
              className="text-sm font-medium text-indigo-200/80 hover:text-white transition-colors duration-200"
            >
              Features
            </a>
            <a 
              href="#how-it-works" 
              className="text-sm font-medium text-indigo-200/80 hover:text-white transition-colors duration-200"
            >
              How It Works
            </a>
          </nav>
          
          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="hidden sm:inline-flex text-sm text-indigo-200 hover:text-white hover:bg-indigo-500/10">
              Sign In
            </Button>
            <Button size="sm" className="text-sm font-medium bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 border-0 text-white">
              Get Started
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      <div className="border-t border-indigo-500/20 md:hidden">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-center space-x-10">
            <a 
              href="#features" 
              className="text-sm font-medium text-indigo-200/80 hover:text-white transition-colors duration-200"
            >
              Features
            </a>
            <a 
              href="#how-it-works" 
              className="text-sm font-medium text-indigo-200/80 hover:text-white transition-colors duration-200"
            >
              How It Works
            </a>
          </div>
        </div>
      </div>
    </header>
  );
} 