export interface NavLinks {
  label: string;
  href?: string;
  children?: { label: string; href: string }[];
}

export const navLinks: NavLinks[] = [
  {
    label: "About Us",
    children: [
      { label: "Our Story", href: "/about/story" },
      { label: "Director's Message", href: "/about/director" },
      { label: "Our Team", href: "/about/team" },
      { label: "Policies", href: "/about/policies" },
    ],
  },
  {
    label: "Academics",
    children: [
      { label: "Overview", href: "/academics/overview" },
      { label: "Kindergarten", href: "/academics/kindergarten" },
      { label: "Primary School", href: "/academics/primary" },
      { label: "Junior Secondary", href: "/academics/jss" },
    ],
  },
  {
    label: "Admissions",

    children: [
      { label: "Overview", href: "/admission" },
      { label: "Enrollment Process", href: "/admission/process" },
      { label: "Fees & Investment", href: "/admission/fees" },
      { label: "Required Documents", href: "/admission/requirements" },
    ],
  },

  {
    label: "Student Life",
    children: [
      { label: "Overview", href: "/student-life" },
      { label: "Boarding Life", href: "/student-life/boarding-school-life" },
      {
        label: "Counseling & Wellness",
        href: "/student-life/counselling-department",
      },
      { label: "Sanatorium", href: "/student-life/school-sanatorium" },
      { label: "Transport", href: "/student-life/transport-services" },
      { label: "Uniform", href: "/student-life/uniform" },
    ],
  },
  {
    label: "Portals",
    children: [
      { label: "Parent Portal", href: "/portals/parents/sign-in" },
      { label: "Staff Portal", href: "/portals/staff/sign-in" },
      { label: "Student Portal", href: "/portals/student/sign-in" },
    ],
  },
];
