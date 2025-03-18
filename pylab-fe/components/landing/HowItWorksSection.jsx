import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-16 md:py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-950/20 to-slate-950/30"></div>
      <div className="absolute -bottom-40 right-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl opacity-30 pointer-events-none"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 inline-block mb-4">
            How It Works
          </span>
          <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-white">
            A <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Simple</span> Yet Powerful Approach
          </h2>
          <p className="text-indigo-200/70 mt-4 max-w-[700px] mx-auto">
            Our methodology makes learning Python intuitive and enjoyable
          </p>
        </div>

        <Tabs defaultValue="learn" className="max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-3 bg-slate-900/60 border border-indigo-500/20 p-1">
            <TabsTrigger 
              value="learn" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500 data-[state=active]:to-purple-500 data-[state=active]:text-white"
            >
              Learn
            </TabsTrigger>
            <TabsTrigger 
              value="practice"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500 data-[state=active]:to-purple-500 data-[state=active]:text-white"
            >
              Practice
            </TabsTrigger>
            <TabsTrigger 
              value="create"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500 data-[state=active]:to-purple-500 data-[state=active]:text-white"
            >
              Create
            </TabsTrigger>
          </TabsList>
          <TabsContent value="learn" className="mt-8">
            <Card className="border-indigo-500/10 bg-slate-900/40 backdrop-blur-sm overflow-hidden">
              <CardHeader className="border-b border-indigo-500/10 pb-8">
                <CardTitle className="text-2xl text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                  Learn Python Fundamentals
                </CardTitle>
                <CardDescription className="text-indigo-200/70 text-base mt-1">
                  Start with the basics and build a solid foundation
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-8">
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <div className="md:w-1/2">
                    <p className="text-indigo-100/90 leading-relaxed mb-4">
                      Begin your journey with interactive lessons covering Python syntax, data types, control structures, and more. Each concept is explained with clear examples and visualizations.
                    </p>
                    <p className="text-indigo-200/70">
                      Our step-by-step approach ensures you gain a deep understanding of fundamental programming concepts.
                    </p>
                  </div>
                  <div className="md:w-1/2 bg-slate-950 p-5 rounded-lg border border-indigo-500/10 shadow-xl">
                    <div className="flex items-center mb-2 space-x-2">
                      <div className="h-2.5 w-2.5 rounded-full bg-red-400"></div>
                      <div className="h-2.5 w-2.5 rounded-full bg-yellow-400"></div>
                      <div className="h-2.5 w-2.5 rounded-full bg-green-400"></div>
                      <div className="ml-2 text-xs text-gray-400">lesson_1.py</div>
                    </div>
                    <pre className="text-sm overflow-x-auto text-indigo-100/90">
                      <code>
                        <span className="text-purple-400"># Learning variables and data types</span>{"\n"}
                        <span className="text-blue-400">name</span> = <span className="text-green-400">"Python Learner"</span>{"\n"}
                        <span className="text-blue-400">age</span> = <span className="text-amber-400">25</span>{"\n"}
                        <span className="text-blue-400">is_student</span> = <span className="text-amber-400">True</span>{"\n\n"}
                        <span className="text-indigo-400">print</span>(<span className="text-green-400">f"Hello, {"{name}"}! You are {"{age}"} years old."</span>)
                      </code>
                    </pre>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="practice" className="mt-8">
            <Card className="border-indigo-500/10 bg-slate-900/40 backdrop-blur-sm overflow-hidden">
              <CardHeader className="border-b border-indigo-500/10 pb-8">
                <CardTitle className="text-2xl text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                  Practice with Real Exercises
                </CardTitle>
                <CardDescription className="text-indigo-200/70 text-base mt-1">
                  Reinforce your knowledge through practical coding challenges
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-8">
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <div className="md:w-1/2">
                    <p className="text-indigo-100/90 leading-relaxed mb-4">
                      Apply what you've learned with hands-on exercises and projects. Receive immediate feedback on your code and suggestions for improvement as you work through each challenge.
                    </p>
                    <p className="text-indigo-200/70">
                      Practice is key to mastering programming, and our challenges range from simple exercises to complex problems.
                    </p>
                  </div>
                  <div className="md:w-1/2 bg-slate-950 p-5 rounded-lg border border-indigo-500/10 shadow-xl">
                    <div className="flex items-center mb-2 space-x-2">
                      <div className="h-2.5 w-2.5 rounded-full bg-red-400"></div>
                      <div className="h-2.5 w-2.5 rounded-full bg-yellow-400"></div>
                      <div className="h-2.5 w-2.5 rounded-full bg-green-400"></div>
                      <div className="ml-2 text-xs text-gray-400">exercise_2.py</div>
                    </div>
                    <pre className="text-sm overflow-x-auto text-indigo-100/90">
                      <code>
                        <span className="text-purple-400"># Exercise: Create a function to find the max number</span>{"\n"}
                        <span className="text-indigo-400">def</span> <span className="text-cyan-400">find_max</span>(numbers):{"\n"}
                        {"    "}<span className="text-purple-400"># Your code here</span>{"\n"}
                        {"    "}<span className="text-indigo-400">pass</span>{"\n\n"}
                        <span className="text-purple-400"># Test your function</span>{"\n"}
                        result = <span className="text-cyan-400">find_max</span>([<span className="text-amber-400">5</span>, <span className="text-amber-400">12</span>, <span className="text-amber-400">9</span>, <span className="text-amber-400">42</span>, <span className="text-amber-400">3</span>]){"\n"}
                        <span className="text-indigo-400">print</span>(<span className="text-green-400">f"Max number: {"{result}"}"</span>)
                      </code>
                    </pre>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="create" className="mt-8">
            <Card className="border-indigo-500/10 bg-slate-900/40 backdrop-blur-sm overflow-hidden">
              <CardHeader className="border-b border-indigo-500/10 pb-8">
                <CardTitle className="text-2xl text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                  Create Your Own Projects
                </CardTitle>
                <CardDescription className="text-indigo-200/70 text-base mt-1">
                  Build meaningful applications with your Python skills
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-8">
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <div className="md:w-1/2">
                    <p className="text-indigo-100/90 leading-relaxed mb-4">
                      Put everything together by working on complete projects like web scrapers, data analysis tools, games, and more. Save your work, share it with others, and build a portfolio.
                    </p>
                    <p className="text-indigo-200/70">
                      Building real projects is the best way to cement your knowledge and demonstrate your skills to others.
                    </p>
                  </div>
                  <div className="md:w-1/2 bg-slate-950 p-5 rounded-lg border border-indigo-500/10 shadow-xl">
                    <div className="flex items-center mb-2 space-x-2">
                      <div className="h-2.5 w-2.5 rounded-full bg-red-400"></div>
                      <div className="h-2.5 w-2.5 rounded-full bg-yellow-400"></div>
                      <div className="h-2.5 w-2.5 rounded-full bg-green-400"></div>
                      <div className="ml-2 text-xs text-gray-400">weather_app.py</div>
                    </div>
                    <pre className="text-sm overflow-x-auto text-indigo-100/90">
                      <code>
                        <span className="text-purple-400"># Simple weather app project</span>{"\n"}
                        <span className="text-indigo-400">import</span> requests{"\n\n"}
                        <span className="text-indigo-400">def</span> <span className="text-cyan-400">get_weather</span>(city):{"\n"}
                        {"    "}api_key = <span className="text-green-400">"YOUR_API_KEY"</span>{"\n"}
                        {"    "}url = <span className="text-green-400">f"https://api.example.com/weather?city={"{city}"}&key={"{api_key}"}"</span>{"\n"}
                        {"    "}response = requests.<span className="text-cyan-400">get</span>(url){"\n"}
                        {"    "}<span className="text-indigo-400">return</span> response.<span className="text-cyan-400">json</span>(){"\n\n"}
                        weather = <span className="text-cyan-400">get_weather</span>(<span className="text-green-400">"New York"</span>){"\n"}
                        <span className="text-indigo-400">print</span>(<span className="text-green-400">f"Current temperature: {"{weather['temp']}°C"}</span>)
                      </code>
                    </pre>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
} 