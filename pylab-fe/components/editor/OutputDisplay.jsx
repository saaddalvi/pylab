import React from "react";
import { Button } from "@/components/ui/button";
import { Loader2, Play, AlertTriangle, CheckCircle } from "lucide-react";

const OutputDisplay = ({ output, error, isLoading, onRunCode }) => {
  // Format output for better readability
  const formatOutput = (text) => {
    if (!text) return text;
    
    // Replace consecutive new lines with a single one
    return text.replace(/\n{3,}/g, '\n\n');
  };
  
  const formattedOutput = formatOutput(output);
  
  // Determine status indicator
  const StatusIndicator = () => {
    if (isLoading) {
      return <div className="h-2 w-2 rounded-full bg-yellow-400 animate-pulse"></div>;
    } else if (error) {
      return <AlertTriangle size={14} className="text-red-400" />;
    } else if (output) {
      return <CheckCircle size={14} className="text-green-400" />;
    }
    return null;
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center space-x-2">
          <div className="font-medium text-indigo-300">Output</div>
          <StatusIndicator />
        </div>
        <Button 
          onClick={onRunCode} 
          disabled={isLoading}
          size="lg"
          className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 border-0 text-white"
        >
          {isLoading ? (
            <>
              <Loader2 className="animate-spin mr-2" />
              Running...
            </>
          ) : (
            <>
              <Play className="mr-2" />
              Run Code
            </>
          )}
        </Button>
      </div>
      <div className="flex-1 border border-indigo-500/20 rounded-xl overflow-hidden shadow-lg bg-slate-900/70">
        <div className="bg-slate-800/50 border-b border-indigo-500/20 py-2 px-4 flex items-center space-x-2">
          <div className="h-3 w-3 rounded-full bg-red-400"></div>
          <div className="h-3 w-3 rounded-full bg-yellow-400"></div>
          <div className="h-3 w-3 rounded-full bg-green-400"></div>
          <div className="ml-2 text-xs text-gray-400">Output Terminal</div>
        </div>
        <pre className="w-full h-[calc(100%-32px)] p-4 font-mono text-sm overflow-auto text-indigo-100">
          {error ? (
            <div className="text-red-400">
              <div className="flex items-center mb-2">
                <AlertTriangle className="mr-2" size={16} />
                <span className="font-semibold">Error</span>
              </div>
              {error}
            </div>
          ) : formattedOutput ? (
            formattedOutput
          ) : (
            <div className="text-indigo-400/50 h-full flex flex-col justify-center items-center">
              {isLoading ? (
                <div className="flex flex-col items-center">
                  <Loader2 className="animate-spin mb-3" size={24} />
                  <span>Running your code...</span>
                </div>
              ) : (
                <div className="text-center">
                  <p className="mb-2">Code output will appear here after you click Run</p>
                  <span className="w-2 h-5 bg-indigo-400/50 inline-block animate-pulse"></span>
                </div>
              )}
            </div>
          )}
        </pre>
      </div>
    </div>
  );
};

export default OutputDisplay; 