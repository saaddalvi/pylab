"use client";

import { useState, useEffect } from "react";
import EditorHeader from "@/components/editor/EditorHeader";
import CodeEditor from "@/components/editor/CodeEditor";
import OutputDisplay from "@/components/editor/OutputDisplay";
// import BackgroundDecoration from "@/components/editor/BackgroundDecoration";
import { executeCode } from "@/lib/services/codeService";
import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";

// Example code templates
const EXAMPLES = {
  helloWorld: `# Simple Hello World
print("Hello, World!")`,
  forLoop: `# For Loop Example
for i in range(1, 6):
    print(f"Count: {i}")`,
  calculator: `# Simple Calculator
def add(a, b):
    return a + b

def subtract(a, b):
    return a - b

def multiply(a, b):
    return a * b

def divide(a, b):
    if b == 0:
        return "Cannot divide by zero"
    return a / b

# Test the functions
print("10 + 5 =", add(10, 5))
print("10 - 5 =", subtract(10, 5))
print("10 * 5 =", multiply(10, 5))
print("10 / 5 =", divide(10, 5))
print("10 / 0 =", divide(10, 0))`,
  fibonacci: `# Fibonacci Sequence
def fibonacci(n):
    """Return the nth Fibonacci number"""
    if n <= 0:
        return "Input must be positive"
    elif n == 1:
        return 0
    elif n == 2:
        return 1
    else:
        return fibonacci(n-1) + fibonacci(n-2)

# Display first 10 Fibonacci numbers
print("First 10 Fibonacci numbers:")
for i in range(1, 11):
    print(f"Fibonacci({i}) = {fibonacci(i)}")`,
};

export default function EditorPage() {
  const [code, setCode] = useState(EXAMPLES.helloWorld);
  const [output, setOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pageLoading, setPageLoading] = useState(true);

  // Simulate page loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setPageLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  const runCode = async () => {
    setIsLoading(true);
    setError(null);
    setOutput("");
    
    try {
      const result = await executeCode(code);
      
      if (result.success) {
        setOutput(result.data.output);
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
      console.error("Error in runCode:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const loadExample = (exampleKey) => {
    setCode(EXAMPLES[exampleKey]);
    setOutput("");
    setError(null);
  };

  if (pageLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-16 w-16 rounded-full bg-indigo-600/30 mb-4"></div>
          <div className="h-4 w-40 bg-indigo-600/30 rounded mb-2"></div>
          <div className="h-3 w-32 bg-indigo-600/20 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Background decorative elements */}
      {/* BackgroundDecoration removed */}

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 relative z-10">
        <EditorHeader />
        
        {/* Example Templates */}
        <div className="mb-6">
          <div className="flex items-center mb-2 space-x-2">
            <BookOpen size={16} className="text-indigo-300" />
            <span className="text-sm font-medium text-indigo-300">Example Templates</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => loadExample('helloWorld')}
              className="border-indigo-500/30 text-indigo-300 hover:bg-indigo-500/10"
            >
              Hello World
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => loadExample('forLoop')}
              className="border-indigo-500/30 text-indigo-300 hover:bg-indigo-500/10"
            >
              For Loop
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => loadExample('calculator')}
              className="border-indigo-500/30 text-indigo-300 hover:bg-indigo-500/10"
            >
              Calculator
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => loadExample('fibonacci')}
              className="border-indigo-500/30 text-indigo-300 hover:bg-indigo-500/10"
            >
              Fibonacci
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Code Editor */}
          <div className="h-[600px]">
            <CodeEditor code={code} setCode={setCode} />
          </div>

          {/* Output Display */}
          <div className="h-[600px]">
            <OutputDisplay 
              output={output} 
              error={error} 
              isLoading={isLoading} 
              onRunCode={runCode} 
            />
          </div>
        </div>
      </main>
    </div>
  );
}
