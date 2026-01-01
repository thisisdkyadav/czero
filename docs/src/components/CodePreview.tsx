import { useState, type ReactNode } from "react";
import "./CodePreview.css";

interface CodePreviewProps {
  children: ReactNode;
  code: string;
}

export default function CodePreview({ children, code }: CodePreviewProps) {
  const [showCode, setShowCode] = useState(false);

  return (
    <div className="code-preview">
      <div className="preview-area">{children}</div>
      <div className="preview-toolbar">
        <button
          className={`toolbar-btn ${showCode ? "active" : ""}`}
          onClick={() => setShowCode(!showCode)}
        >
          {showCode ? "Hide Code" : "Show Code"}
        </button>
      </div>
      {showCode && (
        <pre className="code-block">
          <code>{code}</code>
        </pre>
      )}
    </div>
  );
}
