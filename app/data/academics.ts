export type AcademicLevel = {
  slug: string;
  title: string;
  tagline: string;
  overview: string;
  image: string;
  subjects: string[];
  features: string[];
};

export const academicLevels: Record<string, AcademicLevel> = {
  jss: {
    slug: "jss",
    title: "Junior Secondary School (JSS)",
    tagline: "Transitioning to specialized pathways and technical mastery.",
    image: "/jss-lab.jpg",
    overview:
      "Our Junior Secondary program (Grade 7-9) is designed to provide a broad-based curriculum while allowing students to explore their interests in Science, Arts, and Social Sciences.",
    subjects: [
      "Pre-Technical Studies",
      "Integrated Science",
      "Computer Science",
      "Business Studies",
      "Health Education",
      "Agriculture",
    ],
    features: [
      "Modern Science & Computer Labs",
      "Career Guidance & Counseling",
      "Project-Based Learning (PBL)",
      "Formative & Summative Assessment Prep",
    ],
  },
  primary: {
    slug: "primary",
    title: "Primary School",
    tagline: "Building a strong foundation for lifelong learning.",
    image: "/primary-class.jpg",
    overview:
      "Focusing on literacy, numeracy, and social-emotional development through the CBC framework.",
    subjects: [
      "Mathematics",
      "English",
      "Kiswahili",
      "Science & Tech",
      "Creative Arts",
    ],
    features: [
      "Holistic Assessment",
      "Talent Identification",
      "Character Building",
    ],
  },
  kindergarten: {
    slug: "kindergarten",
    title: "Kindergarten",
    tagline: "Nurturing curiosity and creativity from the start.",
    image: "/kindergarten-play.jpg",
    overview:
      "A play-based curriculum that fosters social, emotional, and cognitive development in a safe environment.",
    subjects: [
      "Early Literacy",
      "Numeracy Basics",
      "Motor Skills Development",
      "Creative Play",
      "Social Skills",
    ],
    features: [
      "Safe & Stimulating Environment",
      "Experienced Early Childhood Educators",
      "Parental Involvement Programs",
    ],
  },

  // Add other levels here...
};
