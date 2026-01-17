import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import React from "react";
export default function Markdown({ content }) {
  return (
    <div className="prose prose-invert max-w-none">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </div>
  );
}
