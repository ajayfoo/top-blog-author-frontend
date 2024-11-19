import Quill from "quill/core";
import SupportedBlots from "./supportedBlots.js";

const Inline = Quill.import("blots/inline");

class LinkBlot extends Inline {
  static blotName = SupportedBlots.LINK;
  static tagName = "a";
  static create(url) {
    let node = super.create();
    node.setAttribute("href", url);
    node.setAttribute("target", "_blank");
    return node;
  }
  static formats(node) {
    return node.getAttribute("href");
  }
}

Quill.register(LinkBlot);
