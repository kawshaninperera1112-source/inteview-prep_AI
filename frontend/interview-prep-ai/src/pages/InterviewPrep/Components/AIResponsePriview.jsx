import React, { useState } from 'react';
import { LuCopy, LuCheck, LuCode } from "react-icons/lu";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const AIResponsePreview = ({ content }) => {
    if (!content) return null;

    return (
        <div className="w-full bg-[#0a0a0a] text-gray-200 p-6 rounded-xl border border-purple-900/30 font-sans leading-relaxed shadow-2xl">
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                    // 1. Code Block Logic (AI එකෙන් එවන code කොටස් හඳුනා ගැනීමට)
                    code({ node, inline, className, children, ...props }) {
                        const match = /language-(\w+)/.exec(className || '');
                        const language = match ? match[1] : '';

                        return !inline ? (
                            <CodeBlock
                                code={String(children).replace(/\n$/, '')}
                                language={language}
                            />
                        ) : (
                            <code className="bg-purple-900/40 text-purple-300 px-1.5 py-0.5 rounded text-sm font-mono border border-purple-800/20" {...props}>
                                {children}
                            </code>
                        );
                    },
                    // 2. Hydration Error එක Fix කිරීම (p වෙනුවට div පාවිච්චි කිරීම)
                    p: ({ children }) => <div className="mb-4 last:mb-0 text-gray-300">{children}</div>,
                    
                    // අනෙකුත් Element Styles
                    strong: ({ children }) => <strong className="font-bold text-purple-400">{children}</strong>,
                    ul: ({ children }) => <ul className="list-disc ml-6 mb-4 space-y-2 text-gray-300">{children}</ul>,
                    ol: ({ children }) => <ol className="list-decimal ml-6 mb-4 space-y-2 text-gray-300">{children}</ol>,
                    h1: ({ children }) => <h1 className="text-2xl font-bold text-purple-500 mb-4">{children}</h1>,
                    h2: ({ children }) => <h2 className="text-xl font-bold text-purple-400 mb-3">{children}</h2>,
                }}
            >
                {content}
            </ReactMarkdown>
        </div>
    );
};

// Code Block Component
function CodeBlock({ code, language }) {
    const [copied, setCopied] = useState(false);

    const copyCode = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="relative my-6 rounded-xl overflow-hidden border border-purple-500/20 bg-[#0d0d0d]">
            {/* Header Area */}
            <div className="flex items-center justify-between bg-zinc-900/90 px-4 py-2.5 border-b border-purple-500/10">
                <div className="flex items-center gap-2 text-purple-400">
                    <LuCode size={16} />
                    <span className="text-[11px] font-bold uppercase tracking-widest font-mono">
                        {language || 'code'}
                    </span>
                </div>
                
                <button 
                    onClick={copyCode}
                    className={`flex items-center gap-2 px-3 py-1 rounded-md text-xs font-medium transition-all duration-200 
                        ${copied 
                            ? "bg-green-500/20 text-green-400 border border-green-500/30" 
                            : "bg-purple-500/10 text-purple-300 border border-purple-500/20 hover:bg-purple-600 hover:text-white"
                        }`}
                >
                    {copied ? <><LuCheck size={14} /> Copied!</> : <><LuCopy size={14} /> Copy</>}
                </button>
            </div>

            {/* Code Rendering */}
            <div className="overflow-x-auto">
                <SyntaxHighlighter
                    language={language || 'javascript'}
                    style={vscDarkPlus}
                    customStyle={{
                        fontSize: '13px',
                        margin: 0,
                        padding: '1.5rem',
                        background: 'transparent',
                        lineHeight: '1.6',
                    }}
                >
                    {code}
                </SyntaxHighlighter>
            </div>
        </div>
    );
}

export default AIResponsePreview;