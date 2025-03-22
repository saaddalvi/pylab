import React from "react";

const EditorHeader = () => {
  return (
    <div className="mb-8">
      <span className="px-3 py-1 rounded-full text-xs font-medium bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 inline-block mb-4">
        Interactive Python Environment
      </span>
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
        Python <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Code Editor</span>
      </h1>
      <p className="text-indigo-100/80 text-base max-w-[600px] leading-relaxed mt-2">
        Write and execute Python code directly in your browser with instant feedback.
      </p>
    </div>
  );
};

export default EditorHeader;