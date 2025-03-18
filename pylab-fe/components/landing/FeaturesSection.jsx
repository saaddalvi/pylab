import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const FEATURES = [
  {
    title: "Interactive Coding Environment",
    description: "Code directly in your browser with real-time execution and feedback",
    icon: "💻",
    gradient: "from-blue-400 to-indigo-400"
  },
  {
    title: "Step-by-Step Tutorials",
    description: "Follow guided lessons designed for beginners to advanced users",
    icon: "📚",
    gradient: "from-indigo-400 to-purple-400"
  },
  {
    title: "AI-Powered Assistance",
    description: "Get help and hints from our intelligent code assistant when you're stuck",
    icon: "🤖",
    gradient: "from-purple-400 to-pink-400"
  },
  {
    title: "Visualization Tools",
    description: "See your algorithms and data structures visualized in real-time",
    icon: "📊",
    gradient: "from-pink-400 to-rose-400"
  },
  {
    title: "Challenge Projects",
    description: "Test your skills with real-world coding challenges and exercises",
    icon: "🏆",
    gradient: "from-amber-400 to-orange-400"
  },
  {
    title: "Progress Tracking",
    description: "Monitor your learning journey with detailed progress analytics",
    icon: "📈",
    gradient: "from-emerald-400 to-teal-400"
  }
];

export default function FeaturesSection() {
  return (
    <section id="features" className="py-12 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-indigo-900/10"></div>
      <div className="absolute -top-40 left-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl opacity-30 pointer-events-none"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 inline-block mb-4">
            Features
          </span>
          <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-white">
            Everything You Need to Learn Python
          </h2>
          <p className="text-indigo-200/70 mt-4 max-w-[700px] mx-auto">
            Powerful tools and resources to make your learning journey effective and enjoyable
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {FEATURES.map((feature, index) => (
            <Card key={index} className="h-full border-indigo-500/10 bg-slate-900/40 backdrop-blur-sm overflow-hidden relative group">
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
              <CardHeader>
                <div className="text-4xl mb-3">{feature.icon}</div>
                <CardTitle className="text-xl text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-indigo-400 group-hover:to-purple-400 transition-all duration-300">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-indigo-100/70">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
} 