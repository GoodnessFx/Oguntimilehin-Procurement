export const SITE_URL = "https://oguntimehin-procurement.vercel.app";
export const BUSINESS_NAME = "Oguntimehin Procurement & Energy Services";
export const BUSINESS_SHORT_NAME = "OPES";
export const PHONE_DISPLAY = "0810 738 0672";
export const WA_PHONE = "2348107380672";
export const EMAIL = "oguntimehin.pes@gmail.com";
export const ADDRESS_LINE_1 = "11 Fagbayi Street, off Cash Street, Alimosho";
export const ADDRESS_LINE_2 = "Ipaja, Lagos 100278, Nigeria";
export const GOOGLE_MAPS_URL = "https://www.google.com/maps/search/?api=1&query=11+Fagbayi+Street+Ipaja+Lagos";
export const HOURS_DISPLAY = "Mon–Sat, closes 6pm";
export const HOURS_NEEDS_VERIFICATION = true;
export const WA_GREETING =
  "Hello OPES, I would like to request a quote for procurement, energy, or engineering support.";

export type ServiceItem = {
  icon: string;
  title: string;
  description: string;
  note?: string;
};

export type FAQItem = {
  question: string;
  answer: string;
};

export type ProjectItem = {
  category: string;
  title: string;
  summary: string;
  outcome: string;
  tags: string[];
  tone: "navy" | "gold" | "slate";
  image: string;
};

export type FeaturedMediaItem = {
  type: "image" | "video";
  src: string;
  poster?: string;
  title: string;
  caption: string;
  category: string;
};

export type SocialLink = {
  name: string;
  url: string;
  enabled: boolean;
};

export const socialLinks: SocialLink[] = [
  { name: "WhatsApp", url: `https://wa.me/${WA_PHONE}`, enabled: true },
  { name: "Google Business", url: GOOGLE_MAPS_URL, enabled: true },
  { name: "Instagram", url: "", enabled: false },
  { name: "Facebook", url: "", enabled: false },
];

export const analyticsConfig = {
  ga4Id: "",
  metaPixelId: "",
  tikTokPixelId: "",
  searchConsoleVerification: "",
  newsletterProvider: "Brevo",
  newsletterAction: "",
};

export const heroStats = [
  { value: "Energy", label: "solar, inverter, and backup power systems" },
  { value: "Procurement", label: "verified sourcing and commercial supply" },
  { value: "Logistics", label: "delivery coordination and project support" },
];

export const trustPillars = [
  "Engineering-led decision support",
  "Verified supplier and product checks",
  "Premium documentation and quote handling",
  "Responsive support from inquiry to delivery",
];

export const services: ServiceItem[] = [
  {
    icon: "search",
    title: "Strategic Procurement",
    description:
      "OPES sources industrial equipment, project materials, and commercial supplies through verified vendors with clear specifications and documented quotations.",
  },
  {
    icon: "zap",
    title: "Generator Solutions",
    description:
      "Diesel and hybrid generator systems for homes, offices, schools, facilities, and project sites, including sizing guidance and delivery coordination.",
  },
  {
    icon: "sun",
    title: "Solar & Inverter Systems",
    description:
      "Solar PV, inverters, battery storage, and hybrid power systems designed around the actual load profile of each client environment.",
  },
  {
    icon: "clipboard",
    title: "Energy Advisory",
    description:
      "Load assessment, capacity planning, and practical recommendations that balance reliability, budget, maintenance, and future expansion.",
  },
  {
    icon: "shield",
    title: "Supplier Verification",
    description:
      "We confirm supplier credibility, product specification, and commercial fit before money moves so clients buy with confidence.",
  },
  {
    icon: "factory",
    title: "Inspection & Quality Control",
    description:
      "Equipment condition, completeness, and key technical details are checked where possible before dispatch or installation.",
  },
  {
    icon: "package",
    title: "Industrial Supply Support",
    description:
      "From batteries and balance-of-system components to general project materials, OPES provides structured sourcing support for business-critical needs.",
  },
  {
    icon: "truck",
    title: "Logistics & Delivery",
    description:
      "We coordinate movement from supplier to site or pickup point with status updates and practical delivery planning.",
  },
  {
    icon: "file",
    title: "Documentation & Commercial Clarity",
    description:
      "Quotations, item specifications, and procurement communication stay documented so clients know exactly what is being supplied.",
  },
];

export const whyChoose = [
  "Premium brand experience with practical execution",
  "Strong experience across energy and procurement scopes",
  "Load-based recommendations instead of guesswork",
  "Commercially clear written quotations",
  "Supplier screening before commitment",
  "Project-ready logistics coordination",
  "Professional support for homes, institutions, and business operations",
  "A corporate standard of communication and follow-through",
];

export const audiences = [
  "Corporate offices and facilities",
  "Industrial and energy project teams",
  "Commercial property owners",
  "Schools, churches, and institutions",
  "Residential clients requiring reliable backup power",
  "Developers, contractors, and site managers",
  "Procurement teams that need a trusted sourcing partner",
  "Organizations expanding into hybrid and renewable power",
];

export const orderSteps = [
  {
    title: "Discovery",
    heading: "Share the project scope, equipment need, or operational challenge with OPES.",
  },
  {
    title: "Evaluation",
    heading: "We review the load, specification, quantity, and supplier options before recommending a direction.",
  },
  {
    title: "Quotation",
    heading: "You receive a written proposal with the item scope, commercial details, and next steps.",
  },
  {
    title: "Execution",
    heading: "Once approved, OPES coordinates procurement, quality checks, and supply movement.",
  },
  {
    title: "Delivery",
    heading: "Equipment is delivered or prepared for deployment with communication maintained throughout.",
  },
];

export const faqItems: FAQItem[] = [
  {
    question: "What does OPES do?",
    answer:
      "OPES provides procurement, energy, and project support services. That includes sourcing equipment and materials, advising on power solutions, verifying suppliers, and coordinating delivery.",
  },
  {
    question: "Can OPES handle solar and inverter projects?",
    answer:
      "Yes. OPES supports solar, inverter, and battery-based systems ranging from smaller backup setups to larger hybrid energy projects, with recommendations based on actual load needs.",
  },
  {
    question: "Do you install the equipment?",
    answer:
      "OPES can coordinate trusted technical support where needed. Installation scope and cost are always clarified per project before work proceeds.",
  },
  {
    question: "How do you make sure suppliers are genuine?",
    answer:
      "Supplier verification is part of the OPES process. We review the source, confirm the specification, and keep the commercial details documented before final commitment.",
  },
  {
    question: "Do you only work on energy projects?",
    answer:
      "No. Energy is a core strength, but OPES also supports broader procurement requirements for businesses, institutions, project teams, and facilities.",
  },
  {
    question: "Where do you deliver?",
    answer:
      "Lagos remains the core delivery base, with additional locations considered depending on project type, product class, and logistics requirements.",
  },
  {
    question: "How does pricing work?",
    answer:
      "Pricing depends on the project scope, specification, market availability, and delivery conditions. OPES provides written quotations so the commercial picture stays clear.",
  },
  {
    question: "Can you help size a power solution?",
    answer:
      "Yes. OPES can assess the appliances, equipment, or operational load involved and recommend a practical generator or hybrid power solution.",
  },
  {
    question: "How long does sourcing take?",
    answer:
      "Lead time depends on item availability, supplier readiness, technical complexity, and logistics. We communicate realistic timing at quotation stage.",
  },
];

export const projects: ProjectItem[] = [
  {
    category: "Hybrid Power",
    title: "Commercial inverter and battery deployment",
    summary:
      "A recent OPES energy project combining inverter infrastructure and battery storage for a more resilient operating environment.",
    outcome: "Delivered a cleaner, more structured backup power architecture with professional installation finish.",
    tags: ["Inverter", "Battery", "Commercial"],
    tone: "navy",
    image: "/media/recent/inverter-installed.jpeg",
  },
  {
    category: "Solar Infrastructure",
    title: "Large-scale solar canopy installation",
    summary:
      "A professionally mounted solar installation supporting daytime energy needs with a strong visual and engineering presence.",
    outcome: "Created durable renewable-energy coverage suited to institutional or business-grade operations.",
    tags: ["Solar", "Institutional", "Renewable"],
    tone: "gold",
    image: "/media/recent/solar-installation-001.jpeg",
  },
  {
    category: "Battery Systems",
    title: "Utility-scale storage equipment sourcing",
    summary:
      "OPES-curated battery storage systems for clients planning larger backup, hybrid, or distributed energy applications.",
    outcome: "Positioned the project for longer runtime and more dependable energy continuity.",
    tags: ["Battery", "Energy Storage", "Industrial"],
    tone: "slate",
    image: "/media/recent/deye-battery-pack-215kwh.jpeg",
  },
  {
    category: "Hybrid Inverter",
    title: "12kVA hybrid inverter system supply",
    summary:
      "A tailored hybrid inverter solution selected for clients who need dependable switching between multiple power sources.",
    outcome: "Balanced performance, expandability, and a premium commercial fit.",
    tags: ["12kVA", "Hybrid", "Power Systems"],
    tone: "navy",
    image: "/media/recent/hybrid-inverter-system-12kva.jpeg",
  },
  {
    category: "Energy Storage",
    title: "Battery-backed inverter packages",
    summary:
      "Battery and inverter combinations sourced for clients prioritizing quieter, cleaner, and more intelligent power backup.",
    outcome: "Reduced reliance on ad-hoc backup arrangements and improved system consistency.",
    tags: ["Storage", "Inverter", "Backup Power"],
    tone: "gold",
    image: "/media/recent/itel-battery-16kwh.jpeg",
  },
  {
    category: "Equipment Supply",
    title: "Modular inverter solutions",
    summary:
      "Compact inverter packages selected for scalable residential and commercial deployment, with clean procurement handling throughout.",
    outcome: "Made future expansion easier while keeping the immediate supply scope practical.",
    tags: ["Inverter", "Procurement", "Scalable"],
    tone: "slate",
    image: "/media/recent/inverter-001.jpeg",
  },
];

export const featuredMedia: FeaturedMediaItem[] = [
  {
    type: "video",
    src: "/media/recent/solar-installed.mp4",
    poster: "/media/recent/solar-installation-001.jpeg",
    title: "Solar project delivery",
    caption: "Recent OPES solar execution footage showing finished renewable infrastructure in use.",
    category: "Field video",
  },
  {
    type: "video",
    src: "/media/recent/inverter-delivered.mp4",
    poster: "/media/recent/inverter-installed.jpeg",
    title: "Inverter project delivery",
    caption: "A professional look at recent inverter-system delivery and deployment work.",
    category: "Delivery video",
  },
  {
    type: "video",
    src: "/media/recent/battery-delivery.mp4",
    poster: "/media/recent/deye-battery-pack-215kwh.jpeg",
    title: "Battery logistics",
    caption: "Battery logistics and supply movement captured as part of recent project execution.",
    category: "Operations video",
  },
  {
    type: "video",
    src: "/media/recent/lithium-battery-2.5kw.mp4",
    poster: "/media/recent/itel-battery-16kwh.jpeg",
    title: "Lithium storage sourcing",
    caption: "Recent delivery of a 2.5kW modular lithium battery system, checked and prepared for client installation.",
    category: "Logistics video",
  },
  {
    type: "image",
    src: "/media/recent/solar-inspection-site.jpeg",
    title: "Pre-installation site inspection",
    caption: "On-site quality check and electrical panel assessment to guarantee load capacity matches equipment specifications.",
    category: "Engineering check",
  },
];


export const assistantFallback =
  "I can help with procurement, power-system guidance, supplier verification, delivery questions, and OPES service information. For a live quote or project-specific discussion, please continue on WhatsApp.";

export const footerConsent =
  "By subscribing, you agree to receive occasional OPES updates and practical procurement or energy insights. You can unsubscribe anytime.";
