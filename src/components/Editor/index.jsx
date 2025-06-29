import Quill from "quill/core";
import "./style.css";
import classes from "./style.module.css";
import { forwardRef, useEffect, useRef } from "react";
import "./Blots";
import PropTypes from "prop-types";
import Toolbar from "./Toolbar";

const Editor = forwardRef(function Editor(
  { labelledBy, initialContent = "" },
  ref
) {
  const containerRef = useRef(null);
  useEffect(() => {
    const container = containerRef.current;
    const editorContainer = container.appendChild(
      container.ownerDocument.createElement("div")
    );

    ref.current = new Quill(editorContainer);
    if (initialContent) {
      ref.current.setContents(JSON.parse(initialContent));
    }
    return () => {
      ref.current = null;
      container.textContent = "";
    };
  }, [ref, initialContent]);
  return (
    <>
      <div className="editor">
        <Toolbar quillRef={ref} />
        <div
          className={classes.container}
          aria-labelledby={labelledBy}
          ref={containerRef}
        ></div>
      </div>
    </>
  );
});

Editor.propTypes = {
  labelledBy: PropTypes.string,
  initialContent: PropTypes.string,
};

Editor.displayName = "Editor";

export default Editor;
