import { useState, type ReactNode } from "react";
import "./CodePreview.css";

interface CodePreviewProps {
  children: ReactNode;
  code: string;
  /** How the demo sits on the canvas. Default: centered & wrapping. */
  align?: "center" | "start" | "stretch";
}

export default function CodePreview({ children, code, align = "center" }: CodePreviewProps) {
  const [tab, setTab] = useState<"preview" | "code">("preview");
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="cz-preview">
      <div className="cz-preview-bar">
        <div className="cz-preview-tabs" role="tablist">
          <button
            role="tab"
            aria-selected={tab === "preview"}
            className={`cz-preview-tab ${tab === "preview" ? "is-active" : ""}`}
            onClick={() => setTab("preview")}
          >
            Preview
          </button>
          <button
            role="tab"
            aria-selected={tab === "code"}
            className={`cz-preview-tab ${tab === "code" ? "is-active" : ""}`}
            onClick={() => setTab("code")}
          >
            Code
          </button>
        </div>
        <button
          className={`cz-preview-copy ${copied ? "is-copied" : ""}`}
          onClick={handleCopy}
          aria-label="Copy code"
        >
          {copied ? (
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg>
          ) : (
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="9" y="9" width="11" height="11" rx="0" /><path d="M5 15V5a1 1 0 0 1 1-1h10" /></svg>
          )}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>

      {tab === "preview" ? (
        <div className={`cz-preview-canvas align-${align}`}>{children}</div>
      ) : (
        <pre className="cz-preview-code">
          <code>{code}</code>
        </pre>
      )}
    </div>
  );
}
