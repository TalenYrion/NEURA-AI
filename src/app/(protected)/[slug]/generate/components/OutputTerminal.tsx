'use client';

import React, { useEffect, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Copy, Check } from 'lucide-react';

interface OutputTerminalProps {
  content: string;
}

export function OutputTerminal({ content }: OutputTerminalProps) {
  const terminalRef = useRef<HTMLDivElement>(null);
  const bottomAnchorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomAnchorRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    });
  }, [content]);

  return (
    <div
      ref={terminalRef}
      className="flex-1 w-full bg-[#0D111A]/40 border border-slate-800/80 rounded-2xl p-6 font-mono text-xs leading-relaxed text-slate-300 overflow-y-auto max-h-[calc(100vh-12rem)] relative group"
    >
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b08_1px,transparent_1px),linear-gradient(to_bottom,#1e293b08_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />

      {content ? (
        <div className="relative z-10 prose prose-invert prose-xs max-w-none">
          <ReactMarkdown
            components={{
              code({ node, inline, className, children, ...props }: any) {
                const match = /language-(\w+)/.exec(className || '');
                const language = match ? match[1] : '';
                const codeRawStr = String(children).replace(/\n$/, '');

                return !inline && match ? (
                  <CodeBlockWindow
                    language={language}
                    rawCode={codeRawStr}
                    {...props}
                  />
                ) : (
                  <code
                    className="bg-slate-800/60 border border-slate-700/40 text-blue-300 px-1.5 py-0.5 rounded text-[11px] font-mono"
                    {...props}
                  >
                    {children}
                  </code>
                );
              },
            }}
          >
            {content}
          </ReactMarkdown>

          <div
            ref={bottomAnchorRef}
            className="h-2 w-full pointer-events-none"
          />
        </div>
      ) : (
        <span className="text-slate-600 italic relative z-10 block animate-pulse">
          Awaiting matrix instruction execution... Stream channel idle.
        </span>
      )}
    </div>
  );
}

interface CodeBlockWindowProps {
  language: string;
  rawCode: string;
}

// 💡 Isolated Sub-Component to manage localized copy state transitions cleanly
function CodeBlockWindow({
  language,
  rawCode,
  ...props
}: CodeBlockWindowProps) {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(rawCode);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000); // Reset icon status after 2 seconds
    } catch (err) {
      console.error('Failed to copy execution script payload:', err);
    }
  };

  return (
    <div className="relative my-4 rounded-xl overflow-hidden border border-slate-800 bg-[#0A0E17]">
      {/* Code block window utility header */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#0F1420] text-[10px] font-mono text-slate-400 border-b border-slate-800/80 select-none">
        <div className="flex items-center gap-2">
          <span className="uppercase tracking-wider font-semibold text-blue-400">
            {language}
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* Actionable Copy Action Trigger Button Node */}
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 text-slate-500 hover:text-slate-300 transition-colors focus:outline-none"
            title="Copy script to clipboard"
          >
            {isCopied ? (
              <>
                <Check className="h-3 w-3 text-emerald-400" />
                <span className="text-emerald-400 font-medium">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="h-3 w-3" />
                <span>Copy</span>
              </>
            )}
          </button>

          <div className="flex gap-1.5 ml-1">
            <span className="w-2 h-2 rounded-full bg-slate-700/60" />
            <span className="w-2 h-2 rounded-full bg-slate-700/60" />
            <span className="w-2 h-2 rounded-full bg-slate-700/60" />
          </div>
        </div>
      </div>

      <SyntaxHighlighter
        style={vscDarkPlus}
        language={language}
        PreTag="div"
        customStyle={{
          margin: 0,
          padding: '1.25rem',
          background: 'transparent',
          fontSize: '11px',
        }}
        {...props}
      >
        {rawCode}
      </SyntaxHighlighter>
    </div>
  );
}
