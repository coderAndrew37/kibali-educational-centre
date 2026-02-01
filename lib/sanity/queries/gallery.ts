export const galleryQuery = `*[_type == "gallery"] | order(year desc) {
  label,
  album,
  year,
  gridSize,
  "src": image.asset->url
}`;
