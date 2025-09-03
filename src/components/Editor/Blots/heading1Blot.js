import Quill from "quill/core";
import SupportedBlots from "./supportedBlots.js";

const Block = Quill.import("blots/block");

class Heading1Blot extends Block {
  static blotName = SupportedBlots.HEADING_1;
  static tagName = "h1";
}

Quill.register(Heading1Blot);
