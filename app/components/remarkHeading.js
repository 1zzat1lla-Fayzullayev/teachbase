import { visit } from "unist-util-visit";
import { slugify } from "../utils/util"; // A helper function to generate unique IDs

export default function remarkHeadingIds() {
  return (tree) => {
    visit(tree, "heading", (node) => {
      if (node.depth === 2) {
        const text = node.children.map((child) => child.value).join(""); // Extract heading text
        const id = slugify(text); // Generate a unique slug (e.g., "my-heading")
        node.data = node.data || {};
        node.data.hProperties = { id }; // Add id attribute
      }
    });
  };
}
