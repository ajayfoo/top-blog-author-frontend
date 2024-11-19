import Quill from "quill/core";
import "./style.css";
import classes from "./style.module.css";
import { forwardRef, useEffect, useRef } from "react";
import "./Blots";
import SupportedBlots from "./Blots/supportedBlots.js";

const Toolbar = ({ quillRef }) => {
  const toggleBold = () => {
    const currentFormat = quillRef.current.getFormat();
    quillRef.current.format(
      SupportedBlots.BOLD,
      !currentFormat[SupportedBlots.BOLD]
    );
  };
  const toggleItalic = () => {
    const currentFormat = quillRef.current.getFormat();
    quillRef.current.format(
      SupportedBlots.ITALIC,
      !currentFormat[SupportedBlots.ITALIC]
    );
  };
  const toggleBlockquote = () => {
    const currentFormat = quillRef.current.getFormat();
    quillRef.current.format(
      SupportedBlots.BLOCKQUOTE,
      !currentFormat[SupportedBlots.BLOCKQUOTE]
    );
  };
  const toggleHeading1 = () => {
    quillRef.current.format(SupportedBlots.HEADER, 1);
  };
  const toggleHeading2 = () => {
    quillRef.current.format(SupportedBlots.HEADER, 2);
  };
  const insertDivider = () => {
    const range = quillRef.current.getSelection(true);
    quillRef.current.insertText(range.index, "\n", Quill.sources.USER);
    quillRef.current.insertEmbed(
      range.index + 1,
      SupportedBlots.DIVIDER,
      true,
      Quill.sources.USER
    );
    quillRef.current.setSelection(range.index + 2, Quill.sources.SILENT);
  };
  const insertLink = () => {
    const text = "I am a link";
    const url = "https://www.archlinux.org";
    const index = quillRef.current.getSelection(true).index;
    quillRef.current.insertText(index, text, Quill.sources.USER);
    quillRef.current.setSelection(index, text.length, Quill.sources.USER);
    quillRef.current.format(SupportedBlots.LINK, url);
    quillRef.current.setSelection(index + text.length, Quill.sources.SILENT);
  };

  return (
    <div className="toolbar">
      <button onClick={toggleBold} type="button">
        Bold
      </button>
      <button onClick={toggleItalic} type="button">
        Italic
      </button>
      <button onClick={toggleBlockquote} type="button">
        Blockquote
      </button>
      <button onClick={toggleHeading1} type="button">
        Heading 1
      </button>
      <button onClick={toggleHeading2} type="button">
        Heading 2
      </button>
      <button onClick={insertDivider} type="button">
        Divider
      </button>
      <button onClick={insertLink} type="button">
        Link
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
