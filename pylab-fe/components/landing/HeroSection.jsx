import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <section className="px-4 py-12 md:py-24 lg:py-32">
      <div className="container mx-auto flex flex-col md:flex-row items-center gap-6 md:gap-12">
        <div className="flex flex-col space-y-4 md:w-1/2">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tighter">
            Learn Python Interactively in Your Browser
          </h1>
          <p className="text-muted-foreground text-base md:text-xl max-w-[600px]">
            PyLab provides an interactive, hands-on environment for learning Python programming without any installations. Code, experiment, and grow your skills with real-time feedback.
          </p>
          <div className="flex gap-4">
            <Button size="lg">Try It Now</Button>
            <Button size="lg" variant="outline">View Demos</Button>
          </div>
        </div>
        <div className="md:w-1/2 relative w-full h-[300px] md:h-[400px] rounded-lg overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-700 rounded-lg flex items-center justify-center text-white text-lg md:text-xl font-mono p-6">
            <div className="bg-slate-950/90 p-4 rounded-md w-full">
              <p className="text-green-400">&gt; Welcome to PyLab!</p>
              <p className="text-white">&gt; print("Hello, World!")</p>
              <p className="text-yellow-300">Hello, World!</p>
              <p className="text-white animate-pulse">&gt; _</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 