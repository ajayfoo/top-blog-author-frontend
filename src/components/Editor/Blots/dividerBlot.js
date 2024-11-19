import Quill from "quill/core";
import SupportedBlots from "./supportedBlots.js";

const BlockEmbed = Quill.import("blots/block/embed");

class DividerBlot extends BlockEmbed {
  static blotName = SupportedBlots.DIVIDER;
  static tagName = "hr";
}

Quill.register(DividerBlot);
