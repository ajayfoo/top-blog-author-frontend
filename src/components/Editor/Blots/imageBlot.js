import Quill from "quill/core";
const BlockEmbed = Quill.import("blots/block/embed");
import SupportedBlots from "./supportedBlots.js";

class ImageBlot extends BlockEmbed {
  static blotName = SupportedBlots.IMAGE;
  static tagName = "img";

  static create(value) {
    let node = super.create();
    node.setAttribute("alt", value.alt);
    node.setAttribute("src", value.url);
    return node;
  }

  static value(node) {
    return {
      alt: node.getAttribute("alt"),
      url: node.getAttribute("src"),
    };
  }
}

Quill.register(ImageBlot);
