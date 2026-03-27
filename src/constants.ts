export const SITE_TITLE = "srosani";

type Product = {
  name: string;
  type: string;
  icon: string;
};

type Job = {
  company: string;
  role: string;
  period: string;
  url: string;
  description?: string;
  products?: Product[];
};

export const JOBS: Job[] = [
  {
    company: "Aitek",
    role: "Software Engineer",
    period: "2025 - present ",
    url: "https://www.aitek.it/",
    description: "Currently building internal tools and microservices for industrial automation clients with Node.JS, C and C++.",
  },
  {
    company: "TAKAI",
    role: "Junior Developer",
    period: "2022 - 25'",
    url: "https://takai.it/",
    products: [
      { name: "Q8 Club", type: "Android App", icon: "/q8club_appicon.png" },
      { name: "La Repubblica", type: "Android App", icon: "/larepubblica_appicon.png" },
    ],
  },
  {
    company: "Bee",
    role: "Intern",
    period: "2021 - 21'",
    url: "https://beefree.io/",
    description: "Contributed to the backend of a drag-and-drop email builder.",
  },
];
