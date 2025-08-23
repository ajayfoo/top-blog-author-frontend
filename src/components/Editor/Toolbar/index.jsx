import { useState } from "react";
import SupportedBlots from "../Blots/supportedBlots.js";
import Quill from "quill/core";
import PropTypes from "prop-types";
import AddLinkModal from "../AddLinkModal/index.jsx";
import BoldIcon from "../../Icons/BoldIcon.jsx";
import classes from "./style.module.css";
import ItalicIcon from "../../Icons/ItalicIcon.jsx";
import DividerIcon from "../../Icons/DividerIcon.jsx";
import H1Icon from "../../Icons/H1Icon.jsx";
import H2Icon from "../../Icons/H2Icon.jsx";
import LinkIcon from "../../Icons/LinkIcon.jsx";
import ImageIcon from "../../Icons/ImageIcon.jsx";

const BoldButton = ({ quillRef }) => {
  const toggleBold = () => {
    const currentFormat = quillRef.current.getFormat();
    quillRef.current.format(
      SupportedBlots.BOLD,
      !currentFormat[SupportedBlots.BOLD]
    );
  };
  return (
    <button
      title="Bold"
      className={classes.button}
      onClick={toggleBold}
      type="button"
    >
      <BoldIcon className={classes.icon} />
    </button>
  );
};
BoldButton.propTypes = {
  quillRef: PropTypes.object,
};

const ItalicButton = ({ quillRef }) => {
  const toggleItalic = () => {
    const currentFormat = quillRef.current.getFormat();
    quillRef.current.format(
      SupportedBlots.ITALIC,
      !currentFormat[SupportedBlots.ITALIC]
    );
  };
  return (
    <button
      title="italic"
      className={classes.button}
      onClick={toggleItalic}
      type="button"
    >
      <ItalicIcon className={classes.icon} />
    </button>
  );
};
ItalicButton.propTypes = {
  quillRef: PropTypes.object,
};

const BlockquoteButton = ({ quillRef }) => {
  const toggleBlockquote = () => {
    const currentFormat = quillRef.current.getFormat();
    quillRef.current.format(
      SupportedBlots.BLOCKQUOTE,
      !currentFormat[SupportedBlots.BLOCKQUOTE]
    );
  };
  return (
    <button onClick={toggleBlockquote} type="button">
      Blockquote
    </button>
  );
};
BlockquoteButton.propTypes = {
  quillRef: PropTypes.object,
};

const DividerButton = ({ quillRef }) => {
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
  return (
    <button
      title="Divider"
      className={classes.button}
      onClick={insertDivider}
      type="button"
    >
      <DividerIcon className={classes.icon} />
    </button>
  );
};
DividerButton.propTypes = {
  quillRef: PropTypes.object,
};

const removeHeaderFormat = (quillRef) => {
  const quill = quillRef.current;
  const { index } = quill.getSelection(true);
  const [line] = quill.getLine(index);
  const delta = line.cache.delta;
  const length = line.cache.length;
  const ops = delta.ops;
  const lastOp = ops[ops.length - 1];
  delete lastOp.attributes.header;
  const startIndex = index - length + 1;
  quill.deleteText(startIndex, length);
  let i = startIndex;
  const updatedOps = ops.slice(0, ops.length - 1);
  for (const op of updatedOps) {
    quill.insertText(i, op.insert, op.attributes);
    i += op.insert.length;
  }
  quill.setSelection(i);
};

const Heading1Button = ({ quillRef }) => {
  const toggleHeading1 = () => {
    const currentFormat = quillRef.current.getFormat();
    if (!currentFormat[SupportedBlots.HEADER]) {
      quillRef.current.format(SupportedBlots.HEADER, 1);
    } else {
      removeHeaderFormat(quillRef);
    }
  };
  return (
    <button
      title="Heading 1"
      className={classes.button}
      onClick={toggleHeading1}
      type="button"
    >
      <H1Icon className={classes.icon} />
    </button>
  );
};
Heading1Button.propTypes = {
  quillRef: PropTypes.object,
};

const Heading2Button = ({ quillRef }) => {
  const toggleHeading2 = () => {
    const currentFormat = quillRef.current.getFormat();
    if (!currentFormat[SupportedBlots.HEADER]) {
      quillRef.current.format(SupportedBlots.HEADER, 2);
    } else {
      removeHeaderFormat(quillRef);
    }
  };
  return (
    <button
      title="Heading 2"
      className={classes.button}
      onClick={toggleHeading2}
      type="button"
    >
      <H2Icon className={classes.icon} />
    </button>
  );
};
Heading2Button.propTypes = {
  quillRef: PropTypes.object,
};

const LinkButton = ({ quillRef }) => {
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
    <>
      <button
        title="Hyperlink"
        className={classes.button}
        onClick={showLinkModal}
        type="button"
      >
        <LinkIcon className={classes.icon} />
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
    </>
  );
};

LinkButton.propTypes = {
  quillRef: PropTypes.object,
};

const ImageButton = ({ quillRef }) => {
  const handleChange = (e) => {
    const url = URL.createObjectURL(e.target.files[0]);
    const value = {
      url,
      alt: "",
    };
    const quill = quillRef.current;
    const range = quill.getSelection(true);
    quill.insertText(range.index, "\n", Quill.sources.USER);
    quill.insertEmbed(
      range.index + 1,
      SupportedBlots.IMAGE,
      value,
      Quill.sources.USER
    );
    quill.setSelection(range.index + 2, Quill.sources.SILENT);
  };
  return (
    <label className={classes.imageIconLabel}>
      <ImageIcon className={classes.icon} />
      <input
        className={classes.imageInput}
        type="file"
        onChange={handleChange}
        name="image"
        accept="image/*"
      />
    </label>
  );
};

ImageButton.propTypes = {
  quillRef: PropTypes.object,
};

const Toolbar = ({ quillRef }) => {
  return (
    <div className={classes.toolbar}>
      <BoldButton quillRef={quillRef} />
      <ItalicButton quillRef={quillRef} />
      <DividerButton quillRef={quillRef} />
      <Heading1Button quillRef={quillRef} />
      <Heading2Button quillRef={quillRef} />
      <LinkButton quillRef={quillRef} />
      <ImageButton quillRef={quillRef} />
    </div>
  );
};

Toolbar.propTypes = {
  quillRef: PropTypes.object,
};

export default Toolbar;
