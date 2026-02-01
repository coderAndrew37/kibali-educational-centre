export const TESTIMONIAL_QUERY = `*[_type == "testimonial" && isApproved == true] | order(_createdAt desc) [0...6] {
  parentName,
  role,
  content,
  rating,
  "imageUrl": image.asset->url
}`;
