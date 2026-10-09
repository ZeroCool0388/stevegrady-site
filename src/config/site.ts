export const site = {
  name: "Steve Grady",
  title: "Senior Technical Solutions Consultant",
  description:
    "Senior Technical Solutions Consultant working across pre-sales, solution architecture and delivery for enterprise SaaS.",
  introduction:
    "Pre-sales, solution architecture and delivery for enterprise SaaS, with AI designed into the solution from the outset.",
  location: "North East England",
  url: "https://stevegrady-site.vercel.app",
  github: "https://github.com/ZeroCool0388",
  linkedin: "https://www.linkedin.com/in/steve-jg",
  cv: "/cv/steve-grady-cv.pdf",
};
export const about = [
  "I work across the full solution lifecycle, from discovery and technical pre-sales through to architecture, implementation and adoption. Over seven years I have led complex SaaS deployments in vendor and contract lifecycle management, third-party risk and transport management, for organisations in logistics, bioscience, pharmaceuticals, finance and fintech.",
  "My current focus is AI-native solution design: building AI into workflows where it measurably reduces manual effort and shortens time to value, and being clear about where it does not belong.",
  "I began my career teaching Computer Science. It shaped how I work with customers: technical detail, explained precisely, for whoever is in the room.",
];
export const experience = [
  {
    date: "2024 – Present",
    title: "Senior Technical Solutions Consultant",
    descriptor: "Enterprise vendor and contract lifecycle management SaaS",
    description:
      "Technical pre-sales and solution design for EMEA prospects. Leads delivery of large-scale, multi-site and multi-country implementations, and manages relationships with three of the company's largest customers through renewal and expansion.",
    skills: [
      "Pre-sales",
      "Solution design",
      "VCLM",
      "TPRM",
      "Enterprise implementation",
      "Account management",
    ],
  },
  {
    date: "2022 – 2024",
    title: "Implementation Consultant → Senior Implementation Consultant",
    descriptor: "Same company, promoted twice",
    description:
      "End-to-end SaaS implementations, API integrations, workflow automation, legacy data migration and SSO (SAML/SCIM) advisory.",
    skills: [
      "API integrations",
      "Workflow automation",
      "Data migration",
      "SAML/SCIM",
      "SQL",
    ],
  },
  {
    date: "2019 – 2022",
    title: "Implementation Consultant",
    descriptor: "Transport management software",
    description:
      "Designed and delivered an end-to-end haulage planning solution, including cross-docking and invoice reconciliation, for a 700+ employee international haulier.",
    skills: ["TMS", "Solution design", "Implementation", "Integrations"],
  },
  {
    date: "2015 – 2019",
    title: "Computer Science Teacher",
    descriptor: "Secondary and A-level",
    description: "",
    skills: ["Computer Science", "Teaching"],
  },
];
const appSkills = [
  "Next.js",
  "TypeScript",
  "Tailwind CSS",
  "Vercel AI SDK",
  "LLM APIs",
  "Zod",
];
export const projects = [
  {
    name: "VendorRisk Triage",
    description:
      "Reviews vendor security evidence and produces cited risks, a risk score and follow-up questions.",
    image: "/work/vendor-risk-triage.webp",
    width: 1280,
    height: 800,
    href: "https://vendor-risk-triage-zerocool0388.vercel.app",
    repo: "https://github.com/ZeroCool0388/vendor-risk-triage",
    skills: appSkills,
  },
  {
    name: "Renewal Radar",
    description:
      "Tracks contract renewals and answers questions across a contract portfolio, with every answer cited.",
    image: "/work/renewal-radar.webp",
    width: 1280,
    height: 800,
    href: "https://renewal-radar-azure.vercel.app",
    repo: "https://github.com/ZeroCool0388/renewal-radar",
    skills: appSkills,
  },
  {
    name: "ScopeForge",
    description:
      "Converts an unstructured customer brief into a structured scope and one-page proposal.",
    image: "/work/scopeforge.webp",
    width: 1280,
    height: 800,
    href: "https://scopeforge-sable.vercel.app",
    repo: "https://github.com/ZeroCool0388/scopeforge",
    skills: appSkills,
  },
  {
    name: "Personal AI System",
    description:
      "A self-hosted multi-agent system with automatic model routing, bounded escalation and reviewable outputs. Architecture write-up.",
    image: "/work/personal-ai-system.png",
    width: 3200,
    height: 2840,
    href: "https://github.com/ZeroCool0388/personal-ai-system",
    repo: null,
    skills: ["OpenClaw", "Multi-agent", "Model routing", "LLM APIs"],
  },
];
