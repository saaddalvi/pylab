import { Button } from "@/components/ui/button";

export default function CTASection() {
  return (
    <section className="py-12 md:py-24 bg-slate-900/50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-4xl font-bold tracking-tight mb-4">
            Ready to Start Your Python Journey?
          </h2>
          <p className="text-muted-foreground mb-8 text-lg">
            Join thousands of learners who are building their Python skills with PyLab's interactive environment.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="px-8">Get Started for Free</Button>
            <Button size="lg" variant="outline">View Learning Paths</Button>
          </div>
        </div>
      </div>
    </section>
  );
} 