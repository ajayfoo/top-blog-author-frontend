import Quill from "quill/core";
import SupportedBlots from "./supportedBlots.js";

const Inline = Quill.import("blots/inline");

class BoldBlot extends Inline {
  static blotName = SupportedBlots.BOLD;
  static tagName = "strong";
}

Quill.register(BoldBlot);
