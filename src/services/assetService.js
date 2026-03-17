// The Veya S3 Asset Manager
const S3_BASE = "https://your-bucket-name.s3.amazonaws.com/";

export const getAssetUrl = (category, itemName) => {
  if (!itemName) return "";
  
  // Categories match your S3 folders exactly
  // Transforms "Rose Quartz" to "rose_quartz" or "rose quartz"
  const formattedName = itemName.toLowerCase().trim().replace(/ /g, "_");
  
  // Match extensions to your list
  let extension = ".png"; // Default for Crystals, Herbs, Chakras
  if (category === "Tarot Cards") extension = ".jpg";
  
  // Format the folder name for the URL (replaces spaces with %20)
  const folder = category.replace(/ /g, "%20");
  
  return ${S3_BASE}/;
};