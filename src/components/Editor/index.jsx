import Quill from "quill";
import "./style.css";
const ColorClass = Quill.import("attributors/class/color");
const SizeStyle = Quill.import("attributors/style/size");
Quill.register(ColorClass, true);
Quill.register(SizeStyle, true);

import { forwardRef, useEffect, useRef } from "react";

const Editor = forwardRef((props, ref) => {
  const containerRef = useRef(null);
  useEffect(() => {
    const container = containerRef.current;
    const editorContainer = container.appendChild(
      container.ownerDocument.createElement("div")
    );
    const toolbarOptions = ["bold", "italic", "underline"];

    ref.current = new Quill(editorContainer, {
      modules: {
        toolbar: toolbarOptions,
      },
    });
    return () => {
      ref.current = null;
      container.textContent = "";
    };
  }, [ref]);
  return <div ref={containerRef}></div>;
});

Editor.displayName = "Editor";

export default Editor;
