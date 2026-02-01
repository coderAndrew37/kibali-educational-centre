export type NewsPost = {
  id: string;
  slug: string;
  category: "Academic" | "Sports" | "Arts" | "Community";
  title: string;
  excerpt: string;
  date: string;
  image: string;
  featured?: boolean;
};

export const newsPosts: NewsPost[] = [
  {
    id: "1",
    category: "Academic",
    featured: true,
    title: "Kibali Leads in Regional CBC Science Fair 2026",
    slug: "kibali-leads-regional-cbc-science-fair-2026",
    excerpt:
      "Our Junior Secondary learners took home the gold for their innovative sustainable irrigation project...",
    date: "Feb 10, 2026",
    image: "/news/science-fair.jpg",
  },
  {
    id: "2",
    category: "Sports",
    title: "The Annual Inter-School Swimming Gala Highlights",
    slug: "the-annual-inter-school-swimming-gala-highlights",
    excerpt:
      "A day of record-breaking laps and incredible team spirit at the Karen Aquatic Centre.",
    date: "Jan 28, 2026",
    image: "/news/swimming.jpg",
  },
  {
    id: "3",
    category: "Arts",
    title: "Musical Theatre Night: A Journey Through African Folklore",
    slug: "musical-theatre-night-journey-through-african-folklore",
    excerpt:
      "The Kindergarten and Primary levels put on a stunning performance of 'The Wise Tortoise'.",
    date: "Jan 15, 2026",
    image: "/news/theatre.jpg",
  },
];
