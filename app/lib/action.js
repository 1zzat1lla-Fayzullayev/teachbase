"use server";

import { supabase } from "../supabase/store";

// Function to escape special characters for SQL
function escapeSearchQuery(query) {
  return query.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

export async function searchMaterials(query) {
  if (!query) return [];

  const escapedQuery = escapeSearchQuery(query);

  try {
    // Search materials (title & content)
    const { data: materials, error: materialError } = await supabase
      .from("material")
      .select("*")
      .or(`title.ilike.%${escapedQuery}%, content.ilike.%${escapedQuery}%`);

    if (materialError) throw materialError;

    // Extract sentences with the query & highlight them
    const materialResults = materials.map((material) => {
      const regex = new RegExp(`([^.!?]*(${query})[^.!?]*[.!?])`, "gi");
      const match = material.content.match(regex);

      return {
        type: "material",
        id: material.id,
        title: highlightQuery(material.title, query),
        katalog_id: material.katolog_id,
        product_id: material.product_id,
        snippet: match ? highlightQuery(match[0], query) : null
      };
    });

    // Search catalogs and products (title only)
    const { data: catalogs } = await supabase
      .from("katalog")
      .select("id, title")
      .ilike("title", `%${escapedQuery}%`);

    const { data: products } = await supabase
      .from("product")
      .select("id, title, katolog_id")
      .ilike("title", `%${escapedQuery}%`);

    const catalogResults = catalogs.map((c) => ({
      type: "catalog",
      id: c.id,
      title: highlightQuery(c.title, query)
    }));

    const productResults = products.map((p) => ({
      type: "product",
      id: p.id,
      katolog_id: p.katolog_id,
      title: highlightQuery(p.title, query)
    }));

    return [...materialResults, ...catalogResults, ...productResults];
  } catch (error) {
    console.error("Search error:", error);
    return [];
  }
}

// Highlight search query in blue
function highlightQuery(text, query) {
  if (!text) return null;
  const regex = new RegExp(`(${query})`, "gi");
  return text.replace(regex, `<span class="text-[#2563EB] font-semibold">$1</span>`);
}
