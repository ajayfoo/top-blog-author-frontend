import Quill from "quill/core";
import "./style.css";
import classes from "./style.module.css";
import { forwardRef, useEffect, useRef } from "react";
import "./Blots";
import SupportedBlots from "./Blots/supportedBlots.js";

const Toolbar = ({ quillRef }) => {
  const handleBoldClick = () => {
    quillRef.current.format(SupportedBlots.BOLD, true);
  };
  const handleItalicClick = () => {
    quillRef.current.format(SupportedBlots.ITALIC, true);
  };
  return (
    <div className="toolbar">
      <button onClick={handleBoldClick} type="button">
        Bold
      </button>
      <button onClick={handleItalicClick} type="button">
        Italic
      </button>
    </div>
  );
};

const Editor = forwardRef(({ labelledBy }, ref) => {
  const containerRef = useRef(null);
  useEffect(() => {
    const container = containerRef.current;
    const editorContainer = container.appendChild(
      container.ownerDocument.createElement("div")
    );

    ref.current = new Quill(editorContainer);
    return () => {
      ref.current = null;
      container.textContent = "";
    };
  }, [ref]);
  return (
    <div className="editor">
      <Toolbar quillRef={ref} />
      <div
        className={classes.container}
        aria-labelledby={labelledBy}
        ref={containerRef}
      ></div>
    </div>
  );
});

Editor.displayName = "Editor";

export default Editor;
