import Quill from "quill/core";
import SupportedBlots from "./supportedBlots.js";

const Block = Quill.import("blots/block");

class HeaderBlot extends Block {
  static blotName = SupportedBlots.HEADER;
  static tagName = ["h1", "h2"];
}

Quill.register(HeaderBlot);
