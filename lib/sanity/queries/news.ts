export const NEWS_LIST_QUERY = `
  *[_type == "newsPost"] | order(date desc) {
    "id": _id,
    "slug": slug.current,
    category,
    title,
    excerpt,
    "date": date,
    "image": heroImage.asset->url,
    featured
  }
`;

export const NEWS_DETAIL_QUERY = `
  *[_type == "newsPost" && slug.current == $slug][0] {
    "id": _id,
    "slug": slug.current,
    category,
    title,
    excerpt,
    "date": date,
    "image": heroImage.asset->url,
    featured,
    body,
    seo
  }
`;

export const NEWS_RELATED_QUERY = `
  *[_type == "newsPost" && category == $category && slug.current != $slug] | order(date desc) [0...2] {
    "id": _id,
    "slug": slug.current,
    category,
    title,
    "date": date,
    "image": heroImage.asset->url
  }
`;
