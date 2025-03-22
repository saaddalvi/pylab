import React from "react";
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

const ExampleTemplates = ({ setCode, setOutput, setError }) => {
  const loadExample = (exampleKey) => {
    setCode(EXAMPLES[exampleKey]);
    setOutput("");
    setError(null);
  };

  return (
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
  );
};

// Export both the component and the examples object
export { EXAMPLES };
export default ExampleTemplates; 