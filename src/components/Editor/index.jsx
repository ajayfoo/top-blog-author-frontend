import Quill from "quill/core";
import "./style.css";

import { forwardRef, useEffect, useRef } from "react";

const Editor = forwardRef((props, ref) => {
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
  return <div ref={containerRef}></div>;
});

Editor.displayName = "Editor";

export default Editor;
