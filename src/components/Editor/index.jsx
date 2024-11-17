import Quill from "quill/core";
import "./style.css";
import classes from "./style.module.css";

import { forwardRef, useEffect, useRef } from "react";

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
    <div
      className={classes.container}
      aria-labelledby={labelledBy}
      ref={containerRef}
    ></div>
  );
});

Editor.displayName = "Editor";

export default Editor;
