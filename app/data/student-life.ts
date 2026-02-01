import { StudentLifeData } from "@/types";

export const studentLifeData: StudentLifeData = {
  services: {
    "boarding-school-life": {
      slug: "boarding-school-life",
      title: "Boarding School Life",
      metaTitle: "Boarding School Life at Kibali",
      tagline: "A Home Away From Home.",
      description:
        "At Kibali Educational Centre, boarding life is more than just a place to stay — it is a nurturing ecosystem where learners are supported to grow academically, socially, and emotionally.",
      image: "/images/boarding-hero.jpg",
      benefits: [
        "24/7 Professional House Parents",
        "Structured Evening Study Prep",
        "Wholesome, Nutritious Menu",
        "Safe & Secure Modern Dormitories",
      ],
      sections: [
        {
          title: "A Balanced and Enriching Routine",
          content:
            "Boarding life at Kibali strikes the perfect balance between academic rigor and necessary recreation. Our schedule includes supervised prep, talent development sessions, and organized weekend activities to help students unwind and bond.",
        },
        {
          title: "Character & Life Skills",
          content:
            "Living in a community fosters independence, personal organization, and leadership. Students learn to manage their time and collaborate with peers from diverse backgrounds, preparing them for life beyond graduation.",
        },
      ],
    },
    "counselling-department": {
      slug: "counselling-department",
      title: "Counselling Department",
      metaTitle: "Counselling & Wellness at Kibali",
      tagline: "Nurturing the Mind and Soul.",
      description:
        "We believe emotional well-being is the foundation of academic success. Our dedicated department provides a safe, confidential space for every child to express themselves and grow.",
      image: "/images/counselling-hero.jpg",
      benefits: [
        "Certified Professional Counselors",
        "One-on-One Support Sessions",
        "Peer Mediation & Leadership",
        "Career Guidance & Coaching",
      ],
      sections: [
        {
          title: "Emotional Resilience",
          content:
            "Our programs are designed to equip students with the tools to navigate life's challenges. We focus on building self-esteem, managing stress, and developing social-emotional intelligence.",
        },
        {
          title: "Career & Future Planning",
          content:
            "As part of our CBC commitment, we provide early career guidance to help students identify their strengths and align their academic pathways with their future aspirations.",
        },
      ],
    },
    "school-sanatorium": {
      slug: "school-sanatorium",
      title: "School Sanatorium",
      metaTitle: "Medical Facilities at Kibali",
      tagline: "Your Child's Health is Our Priority.",
      description:
        "Kibali operates a modern, fully-equipped sanatorium managed by qualified healthcare professionals to ensure immediate medical attention for all our learners.",
      image: "/images/sanatorium-hero.jpg",
      benefits: [
        "Resident Registered Nurses",
        "24-Hour Emergency Response",
        "Regular Health Screenings",
        "Fully Stocked Medical Unit",
      ],
      sections: [
        {
          title: "Comprehensive Healthcare",
          content:
            "Our medical team monitors the health trends within the school, provides first aid, and manages minor ailments. We maintain high standards of hygiene and preventive care to keep our community healthy.",
        },
        {
          title: "Emergency Protocols",
          content:
            "In case of specialized medical needs, the school has established partnerships with leading hospitals in the vicinity for quick referral and advanced treatment.",
        },
      ],
    },
    "transport-services": {
      slug: "transport-services",
      title: "Transport Department",
      metaTitle: "Safe Student Transport at Kibali",
      tagline: "Safe, Reliable, and Punctual.",
      description:
        "We offer a robust transport system with a modern fleet of buses, ensuring that our day scholars arrive at school and return home safely and on time.",
      image: "/images/transport-hero.jpg",
      benefits: [
        "GPS-Tracked School Buses",
        "Vetted & Experienced Drivers",
        "Professional Bus Assistants",
        "Strict Punctuality Policy",
      ],
      sections: [
        {
          title: "Safety & Monitoring",
          content:
            "All our vehicles undergo regular mechanical inspections and are fitted with speed governors and safety belts. Our bus assistants ensure orderly conduct and safety during transit.",
        },
        {
          title: "Route Efficiency",
          content:
            "We have carefully mapped out routes to minimize travel time for students, covering a wide catchment area while ensuring learners are not exhausted by the commute.",
        },
      ],
    },
  },
};
