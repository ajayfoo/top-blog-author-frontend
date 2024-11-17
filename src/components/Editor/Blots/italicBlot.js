import Quill from "quill/core";
import SupportedBlots from "./supportedBlots.js";

const Inline = Quill.import("blots/inline");

class ItalicBlot extends Inline {
  static blotName = SupportedBlots.ITALIC;
  static tagName = "em";
}

Quill.register(ItalicBlot);
