import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-12 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-4xl font-bold tracking-tight">How PyLab Works</h2>
          <p className="text-muted-foreground mt-4 max-w-[700px] mx-auto">
            A simple yet powerful approach to learning Python programming
          </p>
        </div>

        <Tabs defaultValue="learn" className="max-w-3xl mx-auto">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="learn">Learn</TabsTrigger>
            <TabsTrigger value="practice">Practice</TabsTrigger>
            <TabsTrigger value="create">Create</TabsTrigger>
          </TabsList>
          <TabsContent value="learn" className="mt-6">
            <Card className="border-slate-800 bg-slate-950/50">
              <CardHeader>
                <CardTitle>Learn Python Fundamentals</CardTitle>
                <CardDescription>
                  Start with the basics and build a solid foundation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-4 items-center">
                  <div className="md:w-1/2">
                    <p>Begin your journey with interactive lessons covering Python syntax, data types, control structures, and more. Each concept is explained with clear examples and visualizations.</p>
                  </div>
                  <div className="md:w-1/2 bg-slate-800 p-4 rounded-lg">
                    <pre className="text-sm overflow-x-auto">
                      <code>
                        # Learning variables and data types{"\n"}
                        name = "Python Learner"{"\n"}
                        age = 25{"\n"}
                        is_student = True{"\n\n"}
                        print(f"Hello, {"{name}"}! You are {"{age}"} years old.")
                      </code>
                    </pre>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="practice" className="mt-6">
            <Card className="border-slate-800 bg-slate-950/50">
              <CardHeader>
                <CardTitle>Practice with Real Exercises</CardTitle>
                <CardDescription>
                  Reinforce your knowledge through practical coding challenges
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-4 items-center">
                  <div className="md:w-1/2">
                    <p>Apply what you've learned with hands-on exercises and projects. Receive immediate feedback on your code and suggestions for improvement as you work through each challenge.</p>
                  </div>
                  <div className="md:w-1/2 bg-slate-800 p-4 rounded-lg">
                    <pre className="text-sm overflow-x-auto">
                      <code>
                        # Exercise: Create a function to find the max number{"\n"}
                        def find_max(numbers):{"\n"}
                        {"    "}# Your code here{"\n"}
                        {"    "}pass{"\n\n"}
                        # Test your function{"\n"}
                        result = find_max([5, 12, 9, 42, 3]){"\n"}
                        print(f"Max number: {"{result}"}")
                      </code>
                    </pre>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="create" className="mt-6">
            <Card className="border-slate-800 bg-slate-950/50">
              <CardHeader>
                <CardTitle>Create Your Own Projects</CardTitle>
                <CardDescription>
                  Build meaningful applications with your Python skills
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-4 items-center">
                  <div className="md:w-1/2">
                    <p>Put everything together by working on complete projects like web scrapers, data analysis tools, games, and more. Save your work, share it with others, and build a portfolio.</p>
                  </div>
                  <div className="md:w-1/2 bg-slate-800 p-4 rounded-lg">
                    <pre className="text-sm overflow-x-auto">
                      <code>
                        # Simple weather app project{"\n"}
                        import requests{"\n\n"}
                        def get_weather(city):{"\n"}
                        {"    "}api_key = "YOUR_API_KEY"{"\n"}
                        {"    "}url = f"https://api.example.com/weather?city={"{city}"}&key={"{api_key}"}"{"\n"}
                        {"    "}response = requests.get(url){"\n"}
                        {"    "}return response.json(){"\n\n"}
                        weather = get_weather("New York"){"\n"}
                        print(f"Current temperature: {"{weather['temp']°C}"}")
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