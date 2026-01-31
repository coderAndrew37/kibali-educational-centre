export interface SanityImage {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
}

export interface NavItem {
  label: string;
  href?: string;
  children?: { label: string; href: string }[];
}

export interface HeroSlide {
  title: string;
  sub: string;
  imageUrl: string;
  primaryLink: string;
  secondaryLink: string;
  primaryCtaText?: string;
  secondaryCtaText?: string;
}

export interface FounderData {
  name: string;
  role: string;
  bio: string;
  image: SanityImage;
  mission: string;
}

export interface Testimonial {
  parentName: string;
  role: string;
  content: string;
  rating: number;
  imageUrl: string;
}
