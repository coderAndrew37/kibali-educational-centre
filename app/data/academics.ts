export type AcademicLevel = {
  slug: string;
  title: string;
  tagline: string;
  overview: string;
  philosophy: string;
  outcomes: string[];
  image: string;
  subjects: { name: string; description: string }[];
  features: string[];
};

export const academicLevels: Record<string, AcademicLevel> = {
  kindergarten: {
    slug: "kindergarten",
    title: "Kindergarten (PP1 - PP2)",
    tagline: "Nurturing curiosity and creativity from the start.",
    image: "/kindergarten-play.jpg",
    philosophy:
      "We believe that play is the highest form of research. Our early years program focuses on social-emotional anchoring and sensory-based learning.",
    overview:
      "A play-based curriculum that fosters social, emotional, and cognitive development in a safe, stimulating environment designed for the smallest learners.",
    outcomes: [
      "Confident self-expression and basic communication",
      "Refined fine and gross motor skills",
      "Foundational numeracy and letter recognition",
      "Social integration and collaborative play",
    ],
    subjects: [
      {
        name: "Language Activities",
        description:
          "Developing pre-reading and listening skills through storytelling.",
      },
      {
        name: "Mathematical Activities",
        description: "Exploring shapes, numbers, and logic through play.",
      },
      {
        name: "Environmental Activities",
        description: "Discovering nature and the world around them.",
      },
      {
        name: "Creative Activities",
        description: "Art, music, and movement to spark imagination.",
      },
      {
        name: "Religious Education",
        description: "Introduction to moral values and spiritual growth.",
      },
    ],
    features: [
      "Safe & Stimulating Indoor/Outdoor Play Zones",
      "Child-Centered Learning Corners",
      "Experienced Early Childhood Caregivers",
      "Regular Parent-Teacher Developmental Reviews",
    ],
  },
  primary: {
    slug: "primary",
    title: "Primary School (Grade 1 - 6)",
    tagline: "Building a strong foundation for lifelong learning.",
    image: "/primary-class.jpg",
    philosophy:
      "We follow the CBC framework, shifting focus from 'what a learner knows' to 'what a learner can do' with that knowledge.",
    overview:
      "Our primary school program provides a comprehensive academic experience that balances core literacy and numeracy with talent identification.",
    outcomes: [
      "High proficiency in literacy and mental math",
      "Ability to apply knowledge to real-life situations",
      "Identification and nurturing of unique talents",
      "Strong grounding in national and global values",
    ],
    subjects: [
      {
        name: "Science & Technology",
        description: "Hands-on exploration of the physical and digital world.",
      },
      {
        name: "Social Studies",
        description: "Understanding citizenship, history, and geography.",
      },
      {
        name: "English & Kiswahili",
        description: "Mastering bilingual communication and literature.",
      },
      {
        name: "Agriculture & Nutrition",
        description: "Learning about food security and healthy living.",
      },
      {
        name: "Creative Arts",
        description: "Developing skills in music, visual arts, and theatre.",
      },
    ],
    features: [
      "Small Class Sizes for Personalized Attention",
      "Integrated ICT in Teaching & Learning",
      "Vibrant Co-curricular Talent Centers",
      "Strong Character Development Program",
    ],
  },
  jss: {
    slug: "jss",
    title: "Junior Secondary School (JSS)",
    tagline: "Transitioning to specialized pathways and technical mastery.",
    image: "/jss-lab.jpg",
    philosophy:
      "At JSS, we bridge the gap between primary exploration and secondary specialization. Our focus is on competence-based transition.",
    overview:
      "Our Junior Secondary program (Grade 7-9) provides a broad-based curriculum while allowing students to explore their interests in Science, Arts, and Social Sciences.",
    outcomes: [
      "Critical thinking and problem-solving skills",
      "Technological literacy and digital citizenship",
      "Self-directed learning and research abilities",
      "Moral and ethical leadership foundations",
    ],
    subjects: [
      {
        name: "Pre-Technical Studies",
        description: "Hands-on engineering and carpentry basics.",
      },
      {
        name: "Integrated Science",
        description: "Merging Biology, Chemistry, and Physics.",
      },
      {
        name: "Computer Science",
        description: "Coding, hardware, and digital safety.",
      },
      {
        name: "Business Studies",
        description: "Entrepreneurship and financial literacy.",
      },
      {
        name: "Agriculture",
        description: "Modern farming and food sustainability.",
      },
    ],
    features: [
      "Modern Science & Computer Labs",
      "Career Guidance & Counseling",
      "Project-Based Learning (PBL)",
      "Formative & Summative Assessment Prep",
    ],
  },
};
