export const SITE_URL = "https://oguntimehin-procurement.vercel.app";
export const BUSINESS_NAME = "Oguntimehin Procurement & Energy Services";
export const WA_PHONE = "2348107380672";
export const PHONE_DISPLAY = "0810 738 0672";
export const EMAIL = "oguntimehin.pes@gmail.com";
export const ADDRESS_LINE_1 = "11 Fagbayi Street, off Cash Street, Alimosho";
export const ADDRESS_LINE_2 = "Ipaja, Lagos 100278, Nigeria";
export const GOOGLE_MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=11+Fagbayi+Street+Ipaja+Lagos";
export const WA_GREETING =
  "Hello Oguntimehin Procurement & Energy Services, I would like to request a quote for procurement, construction, or building materials.";
export const HOURS_DISPLAY = "Mon–Sat, closes 6pm";
export const HOURS_NEEDS_VERIFICATION = true;

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
  tone: "amber" | "graphite" | "blue";
  image: string;
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

export const services: ServiceItem[] = [
  {
    icon: "search",
    title: "Building Materials Procurement",
    description:
      "Cement, steel, blocks, roofing, pipes, wiring — sourced from verified suppliers at competitive prices for projects of any scale.",
  },
  {
    icon: "zap",
    title: "Generator Supply & Installation",
    description:
      "Diesel and petrol generators sized for homes, offices, schools, and sites across Lagos, with professional installation and load testing.",
  },
  {
    icon: "sun",
    title: "Solar & Inverter Systems",
    description:
      "Solar panels, charge controllers, inverters, and battery banks sourced and matched to your load — from a single room to a full building.",
  },
  {
    icon: "clipboard",
    title: "Energy Consultation & Load Assessment",
    description:
      "We assess what you actually run — lights, fans, AC, equipment — and recommend a power setup that fits your budget and space.",
  },
  {
    icon: "shield",
    title: "Supplier Verification",
    description:
      "Before any payment, we confirm the supplier is real and the specification matches what you are paying for.",
  },
  {
    icon: "factory",
    title: "Pre-Delivery Inspection",
    description:
      "Items can be checked for rating, condition, and completeness before they leave the supplier, so you are not surprised on delivery.",
  },
  {
    icon: "package",
    title: "General Procurement",
    description:
      "Beyond power and construction, we handle sourcing of other goods and materials for businesses, schools, and offices that need a reliable buying process.",
  },
  {
    icon: "truck",
    title: "Logistics & Delivery",
    description:
      "We coordinate transport from supplier to your Lagos address or pickup point, and keep you updated through the process.",
  },
  {
    icon: "file",
    title: "Documentation & Clearance",
    description:
      "We help with the paperwork and clearance steps needed to get equipment and materials to your site without avoidable delay.",
  },
];

export const whyChoose = [
  "Lagos-based and on-ground",
  "Supplier checks before payment",
  "Power setups sized to your load",
  "Generator, solar & building materials sourcing",
  "Clear, written quotations",
  "Updates through the process",
  "Homes, businesses, schools, offices, sites",
  "Logistics handled to your door",
];

export const audiences = [
  "Homeowners dealing with erratic supply",
  "Offices and small businesses",
  "Schools and training centres",
  "Shops and workshops",
  "Estate and facility managers",
  "Construction sites & contractors",
  "Building material suppliers & distributors",
  "Anyone sourcing goods through a verified buyer",
];

export const orderSteps = [
  {
    title: "Step 1",
    heading: "Tell us what you need — a generator, solar parts, or another item.",
  },
  {
    title: "Step 2",
    heading: "We check the supplier and send a written quotation with specs and total cost.",
  },
  {
    title: "Step 3",
    heading: "You confirm and pay. We place the order and track it.",
  },
  {
    title: "Step 4",
    heading: "We inspect the equipment before it moves, where possible.",
  },
  {
    title: "Step 5",
    heading: "We deliver to your Lagos address or an agreed pickup point.",
  },
];

export const faqItems: FAQItem[] = [
  {
    question: "What do you source?",
    answer:
      "Primarily power and energy equipment — generators, solar panels, inverters, batteries, and related hardware. We also handle building materials (cement, steel, blocks, roofing, pipes, wiring) and general procurement for businesses, schools, and offices.",
  },
  {
    question: "Do you install the generators or solar systems?",
    answer:
      "We source and supply the equipment and can coordinate installation through trusted technicians. Installation scope and cost are confirmed per job — ask us when you request a quote.",
  },
  {
    question: "How do I know the supplier is genuine?",
    answer:
      "We verify suppliers before payment and, where possible, inspect the item before it ships. You get the specification in writing before you pay.",
  },
  {
    question: "Can you help me size a generator or solar system?",
    answer:
      "Yes. Tell us what you need to power — rooms, appliances, equipment — and we recommend a capacity and a bill of materials that fits your budget.",
  },
  {
    question: "Do you supply building materials like cement, steel, and blocks?",
    answer:
      "Yes. We source cement, steel reinforcement, blocks, roofing sheets, pipes, wiring, and other construction materials from verified suppliers at competitive prices for projects of any scale.",
  },
  {
    question: "Where do you deliver?",
    answer:
      "Within Lagos as standard. Delivery outside Lagos can be arranged depending on the item and location — confirm with us when you request a quote.",
  },
  {
    question: "How are payments handled?",
    answer:
      "Payment terms are agreed at the quotation stage. We confirm the total cost in writing before any order is placed.",
  },
  {
    question: "How long does sourcing take?",
    answer:
      "It depends on the item, supplier lead time, and whether inspection or clearance is involved. We give you a realistic timeline when we quote.",
  },
  {
    question: "Do you offer refunds?",
    answer:
      "If an item does not match the agreed specification due to our error, we work it out with you directly. Terms are confirmed before payment.",
  },
];

export const projects: ProjectItem[] = [
  {
    category: "Residential",
    title: "Home backup power",
    summary:
      "Sourced a generator and a small inverter-battery set for a family home in Ipaja dealing with frequent outages.",
    outcome: "Matched capacity to actual load instead of overselling a bigger unit.",
    tags: ["Generator", "Inverter", "Home"],
    tone: "amber",
    image: "/media/proj-home.jpg",
  },
  {
    category: "Business",
    title: "Shop and workshop supply",
    summary:
      "Procured generators and solar lighting for a workshop that needed steady power through the working day.",
    outcome: "Kept the owner's tools running without a full grid connection.",
    tags: ["Generator", "Solar", "Workshop"],
    tone: "graphite",
    image: "/media/proj-workshop.jpg",
  },
  {
    category: "Education",
    title: "School power setup",
    summary:
      "Helped a small school source solar panels and batteries to run lights and fans in core classrooms.",
    outcome: "Reduced reliance on noisy generators during school hours.",
    tags: ["Solar", "School", "Batteries"],
    tone: "blue",
    image: "/media/proj-school.jpg",
  },
  {
    category: "Office",
    title: "Office inverter system",
    summary:
      "Sourced an inverter and battery bank for a small office so computers and routers stay up through outages.",
    outcome: "Documented the load first, then sized the system to it.",
    tags: ["Inverter", "Office", "Batteries"],
    tone: "amber",
    image: "/media/proj-office.jpg",
  },
  {
    category: "General Procurement",
    title: "Materials for a facility",
    summary:
      "Handled sourcing of assorted materials for a facility manager who needed one reliable point of contact.",
    outcome: "Consolidated orders and reported progress at each stage.",
    tags: ["Procurement", "Facility"],
    tone: "graphite",
    image: "/media/proj-facility.jpg",
  },
  {
    category: "Residential",
    title: "Solar starter kit",
    summary:
      "Put together a first solar kit — panel, controller, battery — for a tenant who wanted lights and phone charging off-grid.",
    outcome: "Kept it to a budget the client could start with and expand later.",
    tags: ["Solar", "Starter kit", "Home"],
    tone: "blue",
    image: "/media/proj-solar.jpg",
  },
];

export const assistantFallback =
  "I can help with sourcing, power/energy options, sizing guidance, supplier checks, and the order process. For exact quotes, account issues, or anything outside the published information, please continue on WhatsApp.";

export const footerConsent =
  "By subscribing, you agree to receive updates from Oguntimehin Procurement & Energy Services. You can unsubscribe anytime.";
