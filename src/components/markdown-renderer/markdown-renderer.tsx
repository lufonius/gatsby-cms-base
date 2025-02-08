import * as React from "react";
import ReactMarkdown from "react-markdown";
import "./markdown-renderer.css";

const MarkdownRenderer: React.FC<{children: any}> = ({children}) => {
  return (
    <div className="markdown-container">
        <ReactMarkdown >{children}</ReactMarkdown>
      </div>
  );
}

export default MarkdownRenderer;