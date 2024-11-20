import { useState } from "react";
import SupportedBlots from "../Blots/supportedBlots.js";
import Quill from "quill/core";
import PropTypes from "prop-types";
import AddLinkModal from "../AddLinkModal/index.jsx";

const BoldButton = ({ quillRef }) => {
  const toggleBold = () => {
    const currentFormat = quillRef.current.getFormat();
    quillRef.current.format(
      SupportedBlots.BOLD,
      !currentFormat[SupportedBlots.BOLD]
    );
  };
  return (
    <button onClick={toggleBold} type="button">
      Bold
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
    <button onClick={toggleItalic} type="button">
      Italic
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
    <button onClick={insertDivider} type="button">
      Divider
    </button>
  );
};
DividerButton.propTypes = {
  quillRef: PropTypes.object,
};

const Heading1Button = ({ quillRef }) => {
  const toggleHeading1 = () => {
    quillRef.current.format(SupportedBlots.HEADER, 1);
  };
  return (
    <button onClick={toggleHeading1} type="button">
      Heading 1
    </button>
  );
};
Heading1Button.propTypes = {
  quillRef: PropTypes.object,
};

const Heading2Button = ({ quillRef }) => {
  const toggleHeading2 = () => {
    quillRef.current.format(SupportedBlots.HEADER, 2);
  };
  return (
    <button onClick={toggleHeading2} type="button">
      Heading 2
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
    </>
  );
};

LinkButton.propTypes = {
  quillRef: PropTypes.object,
};

const Toolbar = ({ quillRef }) => {
  return (
    <div className="toolbar">
      <BoldButton quillRef={quillRef} />
      <ItalicButton quillRef={quillRef} />
      <DividerButton quillRef={quillRef} />
      <Heading1Button quillRef={quillRef} />
      <Heading2Button quillRef={quillRef} />
      <LinkButton quillRef={quillRef} />
    </div>
  );
};

Toolbar.propTypes = {
  quillRef: PropTypes.object,
};

export default Toolbar;
