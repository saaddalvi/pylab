import { Separator } from "@/components/ui/separator";

export default function Footer() {
  return (
    <footer className="border-t border-indigo-500/20 py-8 md:py-10 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent"></div>
      <div className="absolute inset-0 bg-slate-950/80"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center">
            <div className="font-bold text-lg flex items-center">
              <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Py</span>
              <span className="text-slate-200">Lab</span>
            </div>
          </div>
          
          <p className="text-center md:text-left text-sm text-indigo-200/50 order-3 md:order-2">
            © 2023 PyLab. All rights reserved.
          </p>
          
          <div className="flex items-center gap-5 order-2 md:order-3">
            <a href="#" className="text-sm text-indigo-200/70 hover:text-indigo-300 transition-colors">
              Terms
            </a>
            <Separator orientation="vertical" className="h-4 bg-indigo-500/20" />
            <a href="#" className="text-sm text-indigo-200/70 hover:text-indigo-300 transition-colors">
              Privacy
            </a>
            <Separator orientation="vertical" className="h-4 bg-indigo-500/20" />
            <a href="#" className="text-sm text-indigo-200/70 hover:text-indigo-300 transition-colors">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
} 