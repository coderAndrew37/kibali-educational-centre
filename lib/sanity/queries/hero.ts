export const HERO_QUERY = `*[_type == "hero"][0].slides[] {
  title,
  sub,
  "imageUrl": image.asset->url,
  "primaryLink": primaryCtaLink, 
  "secondaryLink": secondaryCtaLink,
  primaryCtaText,
  secondaryCtaText
}`;

export const FOUNDER_QUERY = `*[_type == "founder"][0] {
  name,
  role,
  bio,
  image,
  mission
}`;
