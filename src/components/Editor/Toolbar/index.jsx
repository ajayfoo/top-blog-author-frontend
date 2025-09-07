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
import { useEffect } from "react";

const BoldButton = ({ quillRef }) => {
  const [isActive, setIsActive] = useIsActive(quillRef, SupportedBlots.BOLD);

  const toggleBold = () => {
    const currentFormat = quillRef.current.getFormat();
    const newIsActive = !currentFormat[SupportedBlots.BOLD];
    quillRef.current.format(SupportedBlots.BOLD, newIsActive);
    setIsActive(newIsActive);
  };

  const buttonClassName = `${classes.button} ${isActive ? classes.active : ""}`;
  return (
    <button
      title="Bold"
      className={buttonClassName}
      onClick={toggleBold}
      type="button"
    >
      <BoldIcon className={classes.icon} />
    </button>
  );
};
BoldButton.propTypes = {
  quillRef: PropTypes.object,
  isActive: PropTypes.bool,
};

const ItalicButton = ({ quillRef }) => {
  const [isActive, setIsActive] = useIsActive(quillRef, SupportedBlots.ITALIC);

  const toggleItalic = () => {
    const currentFormat = quillRef.current.getFormat();
    const newIsActive = !currentFormat[SupportedBlots.ITALIC];
    quillRef.current.format(SupportedBlots.ITALIC, newIsActive);
    setIsActive(newIsActive);
  };
  const buttonClassName = `${classes.button} ${isActive ? classes.active : ""}`;
  return (
    <button
      title="italic"
      className={buttonClassName}
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
  const [isActive, setIsActive] = useIsActive(
    quillRef,
    SupportedBlots.BLOCKQUOTE
  );
  const toggleBlockquote = () => {
    const currentFormat = quillRef.current.getFormat();
    const newIsActive = !currentFormat[SupportedBlots.BLOCKQUOTE];
    quillRef.current.format(SupportedBlots.BLOCKQUOTE, newIsActive);
    setIsActive(newIsActive);
  };
  const buttonClassName = `${classes.button} ${isActive ? classes.active : ""}`;
  return (
    <button
      className={buttonClassName}
      onClick={toggleBlockquote}
      type="button"
    >
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

const Heading1Button = ({ quillRef }) => {
  const [isActive, setIsActive] = useIsActive(
    quillRef,
    SupportedBlots.HEADING_1
  );
  const toggleHeading1 = () => {
    const currentFormat = quillRef.current.getFormat();
    const newIsActive = !currentFormat[SupportedBlots.HEADING_1];
    quillRef.current.format(SupportedBlots.HEADING_1, newIsActive);
    setIsActive(newIsActive);
  };
  const buttonClassName = `${classes.button} ${isActive ? classes.active : ""}`;
  return (
    <button
      title="Heading 1"
      className={buttonClassName}
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
  const [isActive, setIsActive] = useIsActive(
    quillRef,
    SupportedBlots.HEADING_2
  );
  const toggleHeading2 = () => {
    const currentFormat = quillRef.current.getFormat();
    const newIsActive = !currentFormat[SupportedBlots.HEADING_2];
    quillRef.current.format(SupportedBlots.HEADING_2, newIsActive);
    setIsActive(newIsActive);
  };
  const buttonClassName = `${classes.button} ${isActive ? classes.active : ""}`;
  return (
    <button
      title="Heading 2"
      className={buttonClassName}
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
    const selection = quillRef.current.getSelection(true);
    const text = quillRef.current.getText(selection.index, selection.length);
    setLinkText(text);
    setShowAddLinkModal(true);
  };
  const handleCloseModal = () => {
    setShowAddLinkModal(false);
    setLinkText("");
    setLink("");
  };
  const handleAddLinkModalSubmit = () => {
    const selection = quillRef.current.getSelection(true);
    quillRef.current.deleteText(
      selection.index,
      selection.length,
      Quill.sources.USER
    );
    quillRef.current.insertText(selection.index, linkText, Quill.sources.USER);
    quillRef.current.setSelection(
      selection.index,
      linkText.length,
      Quill.sources.USER
    );
    quillRef.current.format(SupportedBlots.LINK, link);
    quillRef.current.setSelection(
      selection.index + linkText.length,
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

const useIsActive = (quillRef, blot) => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const quill = quillRef.current;
    if (!quill) return;
    const handler = () => {
      const selection = quill.getSelection();
      if (!selection) return;
      const currentFormat = quill.getFormat(selection.index, selection.length);
      const newIsActive = !!currentFormat[blot];
      setIsActive(newIsActive);
    };
    quill.on("editor-change", handler);
    return () => {
      quill.off(handler);
    };
  }, [quillRef, blot]);
  return [isActive, setIsActive];
};

const VerticalSeparator = () => {
  return (
    <span
      aria-label="separator"
      className={classes["vertical-separator"]}
    ></span>
  );
};

const Toolbar = ({ quillRef }) => {
  return (
    <div className={classes.toolbar}>
      <BoldButton quillRef={quillRef} />
      <ItalicButton quillRef={quillRef} />
      <Heading1Button quillRef={quillRef} />
      <Heading2Button quillRef={quillRef} />
      <VerticalSeparator />
      <LinkButton quillRef={quillRef} />
      <DividerButton quillRef={quillRef} />
      <ImageButton quillRef={quillRef} />
    </div>
  );
};

Toolbar.propTypes = {
  quillRef: PropTypes.object,
};

export default Toolbar;
