export function slugify(text) {
    return text?.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]+/g, "");
  }  