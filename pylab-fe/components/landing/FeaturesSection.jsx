import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const FEATURES = [
  {
    title: "Interactive Coding Environment",
    description: "Code directly in your browser with real-time execution and feedback",
    icon: "💻"
  },
  {
    title: "Step-by-Step Tutorials",
    description: "Follow guided lessons designed for beginners to advanced users",
    icon: "📚"
  },
  {
    title: "AI-Powered Assistance",
    description: "Get help and hints from our intelligent code assistant when you're stuck",
    icon: "🤖"
  },
  {
    title: "Visualization Tools",
    description: "See your algorithms and data structures visualized in real-time",
    icon: "📊"
  },
  {
    title: "Challenge Projects",
    description: "Test your skills with real-world coding challenges and exercises",
    icon: "🏆"
  },
  {
    title: "Progress Tracking",
    description: "Monitor your learning journey with detailed progress analytics",
    icon: "📈"
  }
];

export default function FeaturesSection() {
  return (
    <section id="features" className="bg-slate-900/50 py-12 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-4xl font-bold tracking-tight">Powerful Features</h2>
          <p className="text-muted-foreground mt-4 max-w-[700px] mx-auto">
            Everything you need to learn Python effectively in one place
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((feature, index) => (
            <Card key={index} className="h-full border-slate-800 bg-slate-950/50">
              <CardHeader>
                <div className="text-4xl mb-2">{feature.icon}</div>
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
} 