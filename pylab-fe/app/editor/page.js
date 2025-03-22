"use client";

import { useState, useEffect } from "react";
import EditorHeader from "@/components/editor/EditorHeader";
import CodeEditor from "@/components/editor/CodeEditor";
import OutputDisplay from "@/components/editor/OutputDisplay";
// import BackgroundDecoration from "@/components/editor/BackgroundDecoration";
import ExampleTemplates, { EXAMPLES } from "@/components/editor/ExampleTemplates";
import { executeCode } from "@/lib/services/codeService";

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
        
        {/* Example Templates Component */}
        <ExampleTemplates 
          setCode={setCode} 
          setOutput={setOutput} 
          setError={setError} 
        />

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
