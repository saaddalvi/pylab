import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CTASection() {
  return (
    <section className="py-16 md:py-28 relative overflow-hidden" id="get-started">
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/20 to-slate-950/90"></div>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent"></div>
      <div className="absolute -left-40 top-40 w-80 h-80 bg-purple-600/20 rounded-full blur-3xl opacity-30 pointer-events-none"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 inline-block mb-6">
            Get Started Today
          </span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6 text-white">
            Ready to Start Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Python Journey</span>?
          </h2>
          <p className="text-indigo-200/80 mb-10 text-lg max-w-2xl mx-auto leading-relaxed">
            Join thousands of learners who are building their Python skills with PyLab's interactive environment. Start coding in minutes, no setup required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/editor">
              <Button size="lg" className="px-8 py-6 text-base bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 border-0 text-white shadow-lg shadow-indigo-500/25">
                Try the Code Editor
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="px-8 py-6 text-base border-indigo-500/30 text-indigo-300 hover:bg-indigo-500/10 hover:text-white">
              View Learning Paths
            </Button>
          </div>
          <p className="mt-6 text-indigo-300/60 text-sm">No credit card required • Free forever plan available</p>
        </div>
      </div>
    </section>
  );
} 