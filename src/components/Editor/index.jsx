import Quill from "quill/core";
import "./style.css";
import classes from "./style.module.css";
import { forwardRef, useEffect, useRef, useState } from "react";
import "./Blots";
import SupportedBlots from "./Blots/supportedBlots.js";
import PropTypes from "prop-types";

const AddLinkModal = ({
  show,
  onClose,
  onSubmit,
  linkText,
  onLinkTextChange,
  link,
  onLinkChange,
}) => {
  const ref = useRef(null);
  useEffect(() => {
    const modal = ref.current;
    if (!show) {
      modal.close();
      return;
    }
    modal.showModal();
  }, [show]);

  const linkTextFieldId = "add-link-modal-link-text-field";
  const linkFieldId = "add-link-modal-link-field";

  return (
    <dialog onClose={onClose} ref={ref}>
      <div className={classes.field}>
        <label htmlFor={linkTextFieldId}>Text</label>
        <input
          type="text"
          id={linkTextFieldId}
          value={linkText}
          onChange={onLinkTextChange}
        />
      </div>
      <div className={classes.field}>
        <label htmlFor={linkFieldId}>Full URL</label>
        <input
          type="text"
          id={linkFieldId}
          value={link}
          onChange={onLinkChange}
        />
      </div>
      <button type="button" onClick={onClose}>
        Close
      </button>
      <button type="button" onClick={onSubmit}>
        Submit
      </button>
    </dialog>
  );
};

AddLinkModal.propTypes = {
  show: PropTypes.bool,
  onClose: PropTypes.func,
  onSubmit: PropTypes.func,
  linkText: PropTypes.string,
  onLinkTextChange: PropTypes.func,
  link: PropTypes.string,
  onLinkChange: PropTypes.func,
};

const Toolbar = ({ quillRef }) => {
  const [linkText, setLinkText] = useState("");
  const [link, setLink] = useState("");
  const [showAddLinkModal, setShowAddLinkModal] = useState(false);
  const handleLinkTextChange = (e) => {
    setLinkText(e.target.value);
  };
  const handleLinkChange = (e) => {
    setLink(e.target.value);
  };
  const showLinkModal = () => {
    setShowAddLinkModal(true);
  };
  const handleCloseModal = () => {
    setShowAddLinkModal(false);
    setLinkText("");
    setLink("");
  };
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
  const handleAddLinkModalSubmit = () => {
    const index = quillRef.current.getSelection(true).index;
    quillRef.current.insertText(index, linkText, Quill.sources.USER);
    quillRef.current.setSelection(index, linkText.length, Quill.sources.USER);
    quillRef.current.format(SupportedBlots.LINK, link);
    quillRef.current.setSelection(
      index + linkText.length,
      Quill.sources.SILENT
    );
    handleCloseModal();
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
      <button onClick={showLinkModal} type="button">
        Link
      </button>
      <AddLinkModal
        show={showAddLinkModal}
        onClose={handleCloseModal}
        onSubmit={handleAddLinkModalSubmit}
        link={link}
        onLinkChange={handleLinkChange}
        linkText={linkText}
        onLinkTextChange={handleLinkTextChange}
      />
    </div>
  );
};

Toolbar.propTypes = {
  quillRef: PropTypes.object,
};

const Editor = forwardRef(function Editor({ labelledBy }, ref) {
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
};

Editor.displayName = "Editor";

export default Editor;
