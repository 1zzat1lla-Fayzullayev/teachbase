"use client";
import { useState } from "react";
import ReactMarkdown, { MarkdownHooks } from "react-markdown";
import rehypeStarryNight from "rehype-starry-night";
import remarkGfm from "remark-gfm";

import "github-markdown-css";


export default function MarkdownEditor() {
  const [content, setContent] = useState(``);

  // Extract code snippets from markdown
  const extractCodeBlocks = (text) => {
    const codeBlocks = [];
    const regex = /```(.*?)\n([\s\S]*?)```/g;
    let match;
    while ((match = regex.exec(text)) !== null) {
      codeBlocks.push({ language: match[1], code: match[2] });
    }
    return codeBlocks;
  };

  const codeBlocks = extractCodeBlocks(content);

  return (
    <div className="flex flex-col gap-4 p-4 max-w-2xl mx-auto bg-gray-900 text-white rounded-lg shadow-lg">
      <textarea
        className="w-full h-40 p-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write your markdown here..."
      /> 
      
      <div className="p-4 bg-gray-800 border border-gray-700 rounded-lg">
        <h2 className="text-lg prose prose-invert font-semibold">Предварительный просмотр страницы</h2>
        {/* <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {content}
        </ReactMarkdown> */}
     <div className="markdown-body prose prose-invert p-2">
     <MarkdownHooks remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeStarryNight]} >
          {content}
        </MarkdownHooks>
     </div>
      </div>

      {/* {codeBlocks.length > 0 && (
        <div className="p-4 bg-gray-800 border border-gray-700 rounded-lg">
          <h2 className="text-lg font-semibold">Extracted Code Blocks</h2>
          {codeBlocks.map((block, index) => (
            <pre key={index} className="p-2 bg-gray-700 rounded-md overflow-auto">
              <code>{block.code}</code>
            </pre>
          ))}
        </div>
      )} */}
    </div>
  );
}
