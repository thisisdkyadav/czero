import { useState, type ReactNode } from "react";
import "./CodePreview.css";

interface CodePreviewProps {
  children: ReactNode;
  code: string;
}

export default function CodePreview({ children, code }: CodePreviewProps) {
  const [showCode, setShowCode] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

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
        <button
          className={`toolbar-btn toolbar-btn-copy ${copied ? "copied" : ""}`}
          onClick={handleCopy}
        >
          {copied ? "✓ Copied!" : "Copy"}
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
