// The Veya S3 Asset Manager (Space-Friendly Version)
const S3_BASE = "https://your-bucket-name.s3.amazonaws.com/";

export const getAssetUrl = (category, itemName) => {
  if (!itemName) return "";
  
  // 1. Lowercase for consistency
  // 2. We keep the spaces—the browser will handle the %20 conversion
  const formattedName = itemName.toLowerCase().trim();
  
  // Set extensions
  let extension = ".png"; 
  if (category === "Tarot Cards") extension = ".jpg";
  
  // Format the folder name (e.g., "Tarot Cards" -> "Tarot%20Cards")
  const folder = category.replace(/ /g, "%20");
  const file = formattedName.replace(/ /g, "%20");
  
  return ${S3_BASE}/;
};
