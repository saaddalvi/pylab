import React from "react";
import CodeMirror from '@uiw/react-codemirror';
import { python } from '@codemirror/lang-python';
import { oneDark } from '@codemirror/theme-one-dark';

const CodeEditor = ({ code, setCode }) => {
  const handleChange = React.useCallback((value) => {
    setCode(value);
  }, [setCode]);
  
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center space-x-2 mb-2">
        <div className="font-medium text-indigo-300">Code Editor</div>
        <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse"></div>
      </div>
      <div className="flex-1 border border-indigo-500/20 rounded-xl overflow-hidden shadow-lg bg-slate-900/70">
        <div className="bg-slate-800/50 border-b border-indigo-500/20 py-2 px-4 flex items-center space-x-2">
          <div className="h-3 w-3 rounded-full bg-red-400"></div>
          <div className="h-3 w-3 rounded-full bg-yellow-400"></div>
          <div className="h-3 w-3 rounded-full bg-green-400"></div>
          <div className="ml-2 text-xs text-gray-400">Python Code</div>
        </div>
        <div className="w-full h-[calc(100%-32px)]">
          <CodeMirror
            value={code}
            height="100%"
            theme={oneDark}
            extensions={[python()]}
            onChange={handleChange}
            basicSetup={{
              lineNumbers: true,
              highlightActiveLineGutter: true,
              highlightSpecialChars: true,
              foldGutter: true,
              dropCursor: true,
              allowMultipleSelections: true,
              indentOnInput: true,
              syntaxHighlighting: true,
              bracketMatching: true,
              closeBrackets: true,
              autocompletion: true,
              rectangularSelection: true,
              crosshairCursor: true,
              highlightActiveLine: true,
              highlightSelectionMatches: true,
              closeBracketsKeymap: true,
              searchKeymap: true,
              foldKeymap: true,
              completionKeymap: true,
              lintKeymap: true,
            }}
            className="text-indigo-100 font-mono"
          />
        </div>
      </div>
    </div>
  );
};

export default CodeEditor; 