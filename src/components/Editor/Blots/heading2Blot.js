import Quill from "quill/core";
import SupportedBlots from "./supportedBlots.js";

const Block = Quill.import("blots/block");

class Heading2Blot extends Block {
  static blotName = SupportedBlots.HEADING_2;
  static tagName = "h2";
}

Quill.register(Heading2Blot);
