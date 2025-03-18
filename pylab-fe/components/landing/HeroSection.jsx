import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <section className="px-4 py-12 md:py-24 lg:py-32 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl opacity-20 pointer-events-none"></div>
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl opacity-20 pointer-events-none"></div>
      
      <div className="container mx-auto flex flex-col md:flex-row items-center gap-6 md:gap-12 relative z-10">
        <div className="flex flex-col space-y-6 md:w-1/2">
          <div>
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 inline-block mb-4">
              Virtual Python Laboratory
            </span>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-slate-50 leading-tight">
              Learn Python <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Interactively</span> in Your Browser
            </h1>
          </div>
          <p className="text-indigo-100/80 text-base md:text-xl max-w-[600px] leading-relaxed">
            PyLab provides an interactive, hands-on environment for learning Python programming without any installations. Code, experiment, and grow your skills with real-time feedback.
          </p>
          <div className="flex gap-4 pt-2">
            <Button size="lg" className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 border-0 text-white font-medium">
              Try It Now
            </Button>
            <Button size="lg" variant="outline" className="border-indigo-500/30 text-indigo-300 hover:bg-indigo-500/10 hover:text-white">
              View Demos
            </Button>
          </div>
        </div>
        <div className="md:w-1/2 relative w-full h-[300px] md:h-[400px] rounded-xl overflow-hidden mt-10 md:mt-0">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center text-white text-lg md:text-xl font-mono p-6 shadow-2xl border border-white/10">
            <div className="bg-slate-900/90 p-6 rounded-md w-full border border-white/10 shadow-inner">
              <div className="flex items-center mb-4 space-x-2">
                <div className="h-3 w-3 rounded-full bg-red-400"></div>
                <div className="h-3 w-3 rounded-full bg-yellow-400"></div>
                <div className="h-3 w-3 rounded-full bg-green-400"></div>
                <div className="ml-2 text-xs text-gray-400">python terminal</div>
              </div>
              <p className="text-indigo-300">&gt; Welcome to PyLab!</p>
              <p className="text-white">&gt; print("Hello, World!")</p>
              <p className="text-yellow-300">Hello, World!</p>
              <p className="text-white flex items-center">
                &gt; <span className="w-2 h-5 bg-indigo-400 ml-1 inline-block animate-pulse"></span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 