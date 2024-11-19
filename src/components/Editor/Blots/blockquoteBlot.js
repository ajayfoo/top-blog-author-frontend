import Quill from "quill/core";
import SupportedBlots from "./supportedBlots.js";

const Block = Quill.import("blots/block");

class BlockquoteBlot extends Block {
  static blotName = SupportedBlots.BLOCKQUOTE;
  static tagName = "blockquote";
}

Quill.register(BlockquoteBlot);
