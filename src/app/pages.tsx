import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  Building2,
  CalendarClock,
  Check,
  ClipboardCheck,
  Download,
  Factory,
  FileText,
  MapPin,
  Package,
  Phone,
  Search,
  ShieldCheck,
  Share2,
  Sun,
  Truck,
  Zap,
} from "lucide-react";
import {
  ADDRESS_LINE_1,
  ADDRESS_LINE_2,
  BUSINESS_NAME,
  EMAIL,
  GOOGLE_MAPS_URL,
  HOURS_DISPLAY,
  HOURS_NEEDS_VERIFICATION,
  PHONE_DISPLAY,
  WA_GREETING,
  audiences,
  faqItems,
  orderSteps,
  projects,
  services,
} from "./content";
import { blogPosts, getPostBySlug } from "./blog";
import {
  AccentCheck,
  CtaBanner,
  ContactSection,
  Container,
  FaqList,
  NewsletterSignup,
  SectionHeading,
  TestimonialsPreview,
  WhyChooseGrid,
  bodyText,
  cardBorder,
  createWhatsAppUrl,
  dark,
  accent,
} from "./layout";

const serviceIconMap: Record<string, typeof Search> = {
  search: Search,
  zap: Zap,
  sun: Sun,
  clipboard: ClipboardCheck,
  shield: ShieldCheck,
  factory: Factory,
  package: Package,
  truck: Truck,
  file: FileText,
};

const projectTone: Record<string, { from: string; to: string }> = {
  amber: { from: "from-[#F2A60C]/15", to: "to-[#F2A60C]/5" },
  graphite: { from: "from-[#14181D]/10", to: "to-[#14181D]/5" },
  blue: { from: "from-[#1C6FB5]/15", to: "to-[#1C6FB5]/5" },
};

type HeroSlide = { type: "video" | "image"; src: string; alt: string; poster?: string };

// Drop real power/energy footage here (public/media) and it crossfades into the
// hero. Use .mp4 for video (autoplay/loop/muted) — set a `poster` SVG so the
// frame shows before/without the video. Use .jpg/.png/.svg for stills.
// If a file is missing, that layer falls back to the gradient base so the hero never breaks.
const heroSlides: HeroSlide[] = [
  { type: "video", src: "/media/hero.mp4", poster: "/media/hero-generator.jpg", alt: "Construction site with building materials delivery" },
  { type: "image", src: "/media/hero-solar.jpg", alt: "Solar panel installation on Lagos rooftop" },
  { type: "image", src: "/media/hero-consult.jpg", alt: "Building materials procurement and site consultation" },
  { type: "image", src: "/media/hero-construction.jpg", alt: "Construction site with building materials supply" },
];

function HeroBackground() {
  const gradientBase = [
    "linear-gradient(125deg,#0a0d10 0%,#1a2230 50%,#26301f 100%)",
    "linear-gradient(125deg,#241a06 0%,#3f2c08 42%,#7a4d06 120%)",
    "linear-gradient(125deg,#0a1622 0%,#0f2c3d 52%,#13405a 100%)",
  ];
  const [active, setActive] = useState(0);
  const [failed, setFailed] = useState<Set<number>>(new Set());

  useEffect(() => {
    const id = window.setInterval(() => {
      setActive((value) => (value + 1) % heroSlides.length);
    }, 6000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      {gradientBase.map((background, index) => (
        <div key={`g${index}`} className="absolute inset-0" style={{ background }} />
      ))}

      {heroSlides.map((slide, index) => {
        const visible = index === active && !failed.has(index);
        return (
          <div
            key={slide.src}
            className="absolute inset-0 transition-opacity duration-[2000ms] ease-in-out"
            style={{ opacity: visible ? 1 : 0 }}
          >
            {slide.type === "video" ? (
              <video
                className="h-full w-full object-cover"
                src={slide.src}
                poster={slide.poster}
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                onError={() => setFailed((prev) => new Set(prev).add(index))}
              />
            ) : (
              <img
                className="h-full w-full object-cover"
                src={slide.src}
                alt={slide.alt}
                onError={() => setFailed((prev) => new Set(prev).add(index))}
              />
            )}
          </div>
        );
      })}

      <div className="absolute inset-0 bg-[#0a0d10]/72" />
      <div
        className="absolute inset-0 opacity-[0.10]"
        style={{
          backgroundImage:
            "linear-gradient(#ffffff22 1px, transparent 1px), linear-gradient(90deg,#ffffff22 1px, transparent 1px)",
          backgroundSize: "52px 52px",
        }}
      />
    </div>
  );
}

function Hero({ onNavigate }: { onNavigate?: (path: string) => void }) {
  return (
    <section className="relative isolate overflow-hidden">
      <HeroBackground />
      <Container className="relative z-10 flex min-h-[88vh] flex-col justify-center py-20 text-white">
        <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.18em] backdrop-blur-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-[#F2A60C]" />
          Procurement, Construction & Building Materials · Lagos
        </div>
        <h1 className="max-w-4xl text-[clamp(2.4rem,6vw,4.6rem)] font-extrabold leading-[1.02] tracking-[-0.04em]" style={{ fontFamily: "'Sora', sans-serif" }}>
          Source power equipment, building materials, and construction supplies — delivered to your Lagos site.
        </h1>
        <p className="mt-5 max-w-2xl text-[18px] leading-relaxed text-white/80">
          Oguntimehin PES handles procurement, supplier verification, and delivery of generators, solar equipment, building materials, and construction supplies — for homes, offices, schools, workshops, and construction sites across Lagos.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a
            href="/#contact"
            onClick={(event) => {
              event.preventDefault();
              onNavigate?.("/#contact");
            }}
            className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-4 text-sm font-semibold text-[#14181D] transition hover:opacity-90"
            style={{ backgroundColor: accent }}
          >
            Request a Quote <ArrowRight className="h-4 w-4" />
          </a>
          <a
            href={createWhatsAppUrl(WA_GREETING)}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 bg-white/5 px-6 py-4 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            Chat on WhatsApp
          </a>
        </div>
        <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm text-white/70">
          <span className="inline-flex items-center gap-2"><Zap className="h-4 w-4" style={{ color: accent }} /> Generator supply</span>
          <span className="inline-flex items-center gap-2"><Sun className="h-4 w-4" style={{ color: accent }} /> Solar & inverter systems</span>
          <span className="inline-flex items-center gap-2"><Package className="h-4 w-4" style={{ color: accent }} /> Building materials</span>
          <span className="inline-flex items-center gap-2"><Building2 className="h-4 w-4" style={{ color: accent }} /> Construction supply</span>
        </div>
      </Container>
    </section>
  );
}

function WhoItsFor() {
  return (
    <section className="border-b border-[#ECEEEC] bg-white py-10 lg:py-14">
      <Container>
        <SectionHeading
          eyebrow="Who it's for"
          title="Built for Lagos homes, businesses, and institutions"
          body="If you need power equipment or a trusted buyer to source goods, we work the same way — check the supplier, quote in writing, deliver to your door."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {audiences.map((item) => (
            <div key={item} className={`flex items-start gap-3 rounded-[22px] border bg-[#F5F6F4] p-5 shadow-[0_10px_24px_rgba(20,24,29,0.03)] ${cardBorder}`}>
              <AccentCheck />
              <span className="text-sm font-semibold text-[#14181D]">{item}</span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

function ServicesSection() {
  return (
    <section id="what-we-do" className="border-b border-[#ECEEEC] bg-[#F5F6F4] py-10 lg:py-14">
      <Container>
        <SectionHeading
          eyebrow="What we do"
          title="Procurement and power/energy sourcing, handled end to end"
          body="From a single generator to a full solar setup or a procurement order, the process is the same: verified sourcing, clear quotation, and delivery in Lagos."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const Icon = serviceIconMap[service.icon] ?? Package;
            return (
              <div key={service.title} className={`group rounded-[24px] border bg-white p-6 shadow-[0_10px_24px_rgba(20,24,29,0.03)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_40px_rgba(20,24,29,0.06)] ${cardBorder}`}>
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl" style={{ backgroundColor: "rgba(242,166,12,0.10)" }}>
                  <Icon className="h-6 w-6" style={{ color: accent }} />
                </span>
                <h3 className="mt-5 text-lg font-bold tracking-[-0.02em] text-[#14181D]">{service.title}</h3>
                <p className="mt-2 text-sm leading-7 text-[#3C4248]">{service.description}</p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

function OrderProcess() {
  return (
    <section className="border-b border-[#ECEEEC] bg-white py-10 lg:py-14">
      <Container>
        <SectionHeading
          eyebrow="How it works"
          title="Five steps from your request to delivery"
          body="No mystery. You see the supplier check, the written quote, and the delivery — and you can ask at any stage."
        />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          {orderSteps.map((step, index) => (
            <div key={step.title} className={`rounded-[22px] border bg-[#F5F6F4] p-5 shadow-[0_10px_24px_rgba(20,24,29,0.03)] ${cardBorder}`}>
              <div className="flex items-center gap-3">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold text-white" style={{ backgroundColor: dark }}>
                  {index + 1}
                </span>
                <span className="text-[11px] font-extrabold uppercase tracking-[0.16em]" style={{ color: accent }}>{step.title}</span>
              </div>
              <p className="mt-4 text-sm leading-7 text-[#3C4248]">{step.heading}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

function ProjectsSection({ compact = false }: { compact?: boolean }) {
  return (
    <section className="border-b border-[#ECEEEC] bg-[#F5F6F4] py-10 lg:py-14">
      <Container>
        <SectionHeading
          eyebrow="Recent projects"
          title="Real sourcing and power work around Lagos"
          body="A few examples of what we have helped source and deliver. Details stay factual — no invented numbers."
        />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => {
            const tone = projectTone[project.tone];
            return (
              <article key={project.title} className={`overflow-hidden rounded-[24px] border bg-white shadow-[0_10px_24px_rgba(20,24,29,0.03)] ${cardBorder}`}>
                <div className="relative h-44 overflow-hidden bg-[#14181D]">
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    className="h-full w-full object-cover"
                    onError={(event) => { (event.currentTarget as HTMLImageElement).style.display = "none"; }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#14181D]/70 to-transparent" />
                  <span className="absolute left-4 top-4 text-[11px] font-extrabold uppercase tracking-[0.16em] text-white">{project.category}</span>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold tracking-[-0.02em] text-[#14181D]">{project.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-[#3C4248]">{project.summary}</p>
                  <p className="mt-3 text-sm leading-7 text-[#14181D]/80"><span className="font-semibold">Outcome:</span> {project.outcome}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span key={tag} className="rounded-full border border-[#E3E7E4] bg-white px-3 py-1 text-xs font-medium text-[#3C4248]">{tag}</span>
                    ))}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
        {compact ? null : (
          <div className="mt-8">
            <a href="/recent-projects" className="inline-flex items-center gap-2 text-sm font-semibold text-[#14181D] transition hover:text-[#F2A60C]">
              See all recent projects <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        )}
      </Container>
    </section>
  );
}

function FaqSection({ title, body }: { title?: string; body?: string }) {
  return (
    <section className="border-b border-[#ECEEEC] bg-white py-10 lg:py-14">
      <Container>
        <SectionHeading
          eyebrow="FAQ"
          title={title ?? "Questions people ask before they request a quote"}
          body={body ?? "Straight answers about what we source, supplier checks, sizing, delivery, and payments."}
        />
        <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          <FaqList items={faqItems} />
          <div className={`rounded-[28px] border bg-[#F5F6F4] p-6 shadow-[0_14px_34px_rgba(20,24,29,0.04)] ${cardBorder}`}>
            <h3 className="text-lg font-bold tracking-[-0.02em] text-[#14181D]">Still deciding?</h3>
            <p className="mt-2 text-sm leading-7 text-[#3C4248]">
              Send what you need to power or source. We reply with a written quote and the next step — no pressure.
            </p>
            <a
              href={createWhatsAppUrl(WA_GREETING)}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
              style={{ backgroundColor: accent }}
            >
              Ask on WhatsApp <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}

export function HomePage({ onNavigate }: { onNavigate?: (path: string) => void }) {
  return (
    <>
      <Hero onNavigate={onNavigate} />
      <section className="border-b border-[#ECEEEC] bg-white py-10 lg:py-14">
        <Container>
          <SectionHeading
            eyebrow="Why Oguntimehin"
            title="A Lagos buyer who checks before paying"
            body="We are local, we verify suppliers before money moves, and we keep you updated from quote to delivery."
          />
          <WhyChooseGrid />
        </Container>
      </section>
      <WhoItsFor />
      <ServicesSection />
      <OrderProcess />
      <ProjectsSection />
      <TestimonialsPreview />
      <FaqSection />
      <CtaBanner />
      <ContactSection />
    </>
  );
}

export function ServicesPage() {
  return (
    <>
      <section className="bg-[#14181D] py-14 text-white">
        <Container>
          <div className="text-[11px] font-extrabold uppercase tracking-[0.18em]" style={{ color: accent }}>Services</div>
          <h1 className="mt-3 max-w-3xl text-[clamp(2.2rem,5vw,3.6rem)] font-extrabold leading-[1.04] tracking-[-0.04em]" style={{ fontFamily: "'Sora', sans-serif" }}>
            Procurement and power/energy sourcing for Lagos
          </h1>
          <p className="mt-4 max-w-2xl text-[17px] leading-relaxed text-white/75">
            We source generators, solar and inverter equipment, and other goods — and we handle the checking, quoting, and delivery so you are not left guessing.
          </p>
        </Container>
      </section>
      <ServicesSection />
      <WhoItsFor />
      <CtaBanner />
    </>
  );
}

export function ServiceInformationPage() {
  const points = [
    {
      icon: ShieldCheck,
      title: "Supplier checks before payment",
      body: "We confirm the supplier is real and the specification matches what you pay for before any order is placed.",
      image: "/media/svc-supplier.jpg",
    },
    {
      icon: Factory,
      title: "Inspection before it moves",
      body: "Where possible, items are checked for rating, condition, and completeness before they leave the supplier.",
      image: "/media/svc-inspection.jpg",
    },
    {
      icon: FileText,
      title: "Paperwork and clearance",
      body: "We help with the documentation and clearance steps needed to get equipment to you without avoidable delay.",
      image: "/media/svc-supplier.jpg",
    },
    {
      icon: Truck,
      title: "Delivery in Lagos",
      body: "We coordinate transport to your address or an agreed pickup point, and keep you updated through the process.",
      image: "/media/svc-delivery.jpg",
    },
  ];

  const notes = [
    "Lead times depend on the item, supplier, and whether inspection or clearance is involved — we give a realistic timeline when we quote.",
    "Delivery outside Lagos can be arranged depending on the item and location. Confirm with us when you request a quote.",
    "Installation can be coordinated through trusted technicians; scope and cost are confirmed per job.",
    "We do not list live stock. Every quote is built around what you actually need.",
  ];

  return (
    <>
      <section className="bg-[#14181D] py-14 text-white">
        <Container>
          <div className="text-[11px] font-extrabold uppercase tracking-[0.18em]" style={{ color: accent }}>Service information</div>
          <h1 className="mt-3 max-w-3xl text-[clamp(2.2rem,5vw,3.6rem)] font-extrabold leading-[1.04] tracking-[-0.04em]" style={{ fontFamily: "'Sora', sans-serif" }}>
            How sourcing and delivery work
          </h1>
          <p className="mt-4 max-w-2xl text-[17px] leading-relaxed text-white/75">
            The same careful process applies whether you need a generator, a solar kit, or a general procurement order.
          </p>
        </Container>
      </section>
      <section className="border-b border-[#ECEEEC] bg-white py-10 lg:py-14">
        <Container>
          <div className="grid gap-4 md:grid-cols-2">
            {points.map((point) => (
              <div key={point.title} className={`overflow-hidden rounded-[24px] border bg-white shadow-[0_10px_24px_rgba(20,24,29,0.03)] ${cardBorder}`}>
                <div className="relative h-40 overflow-hidden bg-[#14181D]">
                  <img
                    src={point.image}
                    alt={point.title}
                    loading="lazy"
                    className="h-full w-full object-cover"
                    onError={(event) => { (event.currentTarget as HTMLImageElement).style.display = "none"; }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#14181D]/55 to-transparent" />
                </div>
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl" style={{ backgroundColor: "rgba(242,166,12,0.10)" }}>
                      <point.icon className="h-6 w-6" style={{ color: accent }} />
                    </span>
                    <div>
                      <h3 className="text-lg font-bold tracking-[-0.02em] text-[#14181D]">{point.title}</h3>
                      <p className="mt-2 text-sm leading-7 text-[#3C4248]">{point.body}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
      <section className="border-b border-[#ECEEEC] bg-[#F5F6F4] py-10 lg:py-14">
        <Container>
          <SectionHeading eyebrow="Before you order" title="A few things worth knowing" />
          <div className="grid gap-4 sm:grid-cols-2">
            {notes.map((note) => (
              <div key={note} className={`flex items-start gap-3 rounded-[22px] border bg-white p-5 shadow-[0_10px_24px_rgba(20,24,29,0.03)] ${cardBorder}`}>
                <AccentCheck />
                <span className="text-sm leading-7 text-[#3C4248]">{note}</span>
              </div>
            ))}
          </div>
        </Container>
      </section>
      <CtaBanner />
    </>
  );
}

export function HowItWorksPage() {
  return (
    <>
      <section className="bg-[#14181D] py-14 text-white">
        <Container>
          <div className="text-[11px] font-extrabold uppercase tracking-[0.18em]" style={{ color: accent }}>How it works</div>
          <h1 className="mt-3 max-w-3xl text-[clamp(2.2rem,5vw,3.6rem)] font-extrabold leading-[1.04] tracking-[-0.04em]" style={{ fontFamily: "'Sora', sans-serif" }}>
            From your request to delivery in five steps
          </h1>
        </Container>
      </section>
      <OrderProcess />
      <ServiceInformationPage />
    </>
  );
}

export function ProjectsPage() {
  return (
    <>
      <section className="bg-[#14181D] py-14 text-white">
        <Container>
          <div className="text-[11px] font-extrabold uppercase tracking-[0.18em]" style={{ color: accent }}>Recent projects</div>
          <h1 className="mt-3 max-w-3xl text-[clamp(2.2rem,5vw,3.6rem)] font-extrabold leading-[1.04] tracking-[-0.04em]" style={{ fontFamily: "'Sora', sans-serif" }}>
            Sourcing and power work around Lagos
          </h1>
          <p className="mt-4 max-w-2xl text-[17px] leading-relaxed text-white/75">
            Examples of what we have helped source and deliver. We keep claims factual and tied to the work.
          </p>
        </Container>
      </section>
      <ProjectsSection />
      <CtaBanner />
    </>
  );
}

export function TestimonialsPage() {
  return (
    <>
      <section className="bg-[#14181D] py-14 text-white">
        <Container>
          <div className="text-[11px] font-extrabold uppercase tracking-[0.18em]" style={{ color: accent }}>Reviews</div>
          <h1 className="mt-3 max-w-3xl text-[clamp(2.2rem,5vw,3.6rem)] font-extrabold leading-[1.04] tracking-[-0.04em]" style={{ fontFamily: "'Sora', sans-serif" }}>
            What customers say
          </h1>
        </Container>
      </section>
      <TestimonialsPreview />
      <CtaBanner />
    </>
  );
}

export function WhyChoosePage() {
  return (
    <>
      <section className="bg-[#14181D] py-14 text-white">
        <Container>
          <div className="text-[11px] font-extrabold uppercase tracking-[0.18em]" style={{ color: accent }}>Why choose us</div>
          <h1 className="mt-3 max-w-3xl text-[clamp(2.2rem,5vw,3.6rem)] font-extrabold leading-[1.04] tracking-[-0.04em]" style={{ fontFamily: "'Sora', sans-serif" }}>
            A local buyer who checks before paying
          </h1>
          <p className="mt-4 max-w-2xl text-[17px] leading-relaxed text-white/75">
            Lagos-based, practical, and straight about cost and timing. Here is what that means day to day.
          </p>
        </Container>
      </section>
      <section className="border-b border-[#ECEEEC] bg-white py-10 lg:py-14">
        <Container>
          <WhyChooseGrid />
        </Container>
      </section>
      <ServiceInformationPage />
    </>
  );
}

export function FaqPage() {
  return (
    <>
      <section className="bg-[#14181D] py-14 text-white">
        <Container>
          <div className="text-[11px] font-extrabold uppercase tracking-[0.18em]" style={{ color: accent }}>FAQ</div>
          <h1 className="mt-3 max-w-3xl text-[clamp(2.2rem,5vw,3.6rem)] font-extrabold leading-[1.04] tracking-[-0.04em]" style={{ fontFamily: "'Sora', sans-serif" }}>
            Answers before you request a quote
          </h1>
        </Container>
      </section>
      <FaqSection title="The questions we hear most" />
      <CtaBanner />
    </>
  );
}

export function ContactPage() {
  return (
    <>
      <section className="bg-[#14181D] py-14 text-white">
        <Container>
          <div className="text-[11px] font-extrabold uppercase tracking-[0.18em]" style={{ color: accent }}>Contact</div>
          <h1 className="mt-3 max-w-3xl text-[clamp(2.2rem,5vw,3.6rem)] font-extrabold leading-[1.04] tracking-[-0.04em]" style={{ fontFamily: "'Sora', sans-serif" }}>
            Tell us what you need
          </h1>
          <p className="mt-4 max-w-2xl text-[17px] leading-relaxed text-white/75">
            Send the item or the load you want to power. We check the supplier and reply with a written quote.
          </p>
        </Container>
      </section>
      <ContactSection />
    </>
  );
}

export function BlogPage({ onNavigate }: { onNavigate?: (path: string) => void }) {
  return (
    <>
      <section className="bg-[#14181D] py-14 text-white">
        <Container>
          <div className="text-[11px] font-extrabold uppercase tracking-[0.18em]" style={{ color: accent }}>Blog & guides</div>
          <h1 className="mt-3 max-w-3xl text-[clamp(2.2rem,5vw,3.6rem)] font-extrabold leading-[1.04] tracking-[-0.04em]" style={{ fontFamily: "'Sora', sans-serif" }}>
            Practical notes on power and procurement in Lagos
          </h1>
          <p className="mt-4 max-w-2xl text-[17px] leading-relaxed text-white/75">
            Generator sizing, solar basics, and how to source without overpaying — written for homes and businesses.
          </p>
        </Container>
      </section>
      <section className="border-b border-[#ECEEEC] bg-[#F5F6F4] py-10 lg:py-14">
        <Container>
          {blogPosts.length === 0 ? (
            <p className="text-sm text-[#3C4248]">Guides are being written. Check back soon, or ask us directly on WhatsApp.</p>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {blogPosts.map((post) => (
                <a
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  onClick={(event) => {
                    event.preventDefault();
                    if (onNavigate) onNavigate(`/blog/${post.slug}`);
                  }}
                  className={`group flex flex-col overflow-hidden rounded-[24px] border bg-white shadow-[0_10px_24px_rgba(20,24,29,0.03)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_40px_rgba(20,24,29,0.06)] ${cardBorder}`}
                >
                  <div className="relative h-40 overflow-hidden bg-[#14181D]">
                    {post.image ? (
                      <img
                        src={post.image}
                        alt={post.title}
                        loading="lazy"
                        className="h-full w-full object-cover"
                        onError={(event) => { (event.currentTarget as HTMLImageElement).style.display = "none"; }}
                      />
                    ) : null}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#14181D]/55 to-transparent" />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.14em]" style={{ color: accent }}>
                      <span>{post.category}</span>
                      {post.readTime ? <span className="text-[#9AA1A8]">· {post.readTime}</span> : null}
                    </div>
                    <h3 className="mt-3 text-lg font-bold leading-snug tracking-[-0.02em] text-[#14181D] group-hover:text-[#F2A60C]">{post.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-[#3C4248]">{post.excerpt}</p>
                    <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#14181D]">Read guide <ArrowRight className="h-4 w-4" style={{ color: accent }} /></span>
                  </div>
                </a>
              ))}
            </div>
          )}
        </Container>
      </section>
    </>
  );
}

export function BlogPostPage({ slug }: { slug: string }) {
  const post = getPostBySlug(slug);

  if (!post) {
    return (
      <section className="bg-[#F5F6F4] py-20">
        <Container>
          <h1 className="text-2xl font-bold text-[#14181D]">Guide not found</h1>
          <p className="mt-3 text-sm text-[#3C4248]">This guide may have been moved. Browse all guides from the blog page.</p>
        </Container>
      </section>
    );
  }

  return (
    <article className="bg-[#F5F6F4] py-12 lg:py-16">
      <Container className="max-w-3xl">
        <div className="flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.14em]" style={{ color: accent }}>
          <span>{post.category}</span>
          {post.date ? <span className="text-[#9AA1A8]">· {post.date}</span> : null}
          {post.readTime ? <span className="text-[#9AA1A8]">· {post.readTime}</span> : null}
        </div>
        <h1 className="mt-3 text-[clamp(2rem,4.5vw,3.2rem)] font-extrabold leading-[1.05] tracking-[-0.04em] text-[#14181D]" style={{ fontFamily: "'Sora', sans-serif" }}>
          {post.title}
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-[#3C4248]">{post.excerpt}</p>
        {post.image ? (
          <div className="mt-6 overflow-hidden rounded-[20px] border border-[#E3E7E4] bg-[#14181D]">
            <img
              src={post.image}
              alt={post.title}
              className="h-56 w-full object-cover sm:h-72"
              onError={(event) => { (event.currentTarget as HTMLImageElement).style.display = "none"; }}
            />
          </div>
        ) : null}
        <div className="mt-8 space-y-5 text-[17px] leading-8 text-[#2C3138]">
          {post.body.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap gap-3 border-t border-[#ECEEEC] pt-6">
          <a
            href={createWhatsAppUrl(WA_GREETING)}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
            style={{ backgroundColor: accent }}
          >
            Ask about this on WhatsApp <ArrowRight className="h-4 w-4" />
          </a>
          <a href="/blog" className="inline-flex items-center gap-2 rounded-full border border-[#E3E7E4] bg-white px-5 py-3 text-sm font-semibold text-[#14181D]">
            Back to all guides
          </a>
        </div>
      </Container>
    </article>
  );
}

export function PrivacyPage() {
  const sections = [
    {
      heading: "Information we collect",
      body: "When you request a quote or subscribe, we may collect your name, phone number, WhatsApp number, the item or load you describe, and your email if you provide it. We also use basic analytics and marketing cookies only after you accept them.",
    },
    {
      heading: "How we use it",
      body: "To respond to quote requests, deliver updates about your order, send the newsletter you opted into, and understand site traffic. We do not sell your information.",
    },
    {
      heading: "Storage and access",
      body: "Your details are used to contact you about your request. You can ask us to remove your information by reaching out on WhatsApp or email.",
    },
    {
      heading: "Cookies and consent",
      body: "Non-essential cookies (analytics and marketing) are off until you accept them in the consent banner. You can change your choice by clearing site data and reloading.",
    },
    {
      heading: "Third parties",
      body: "If analytics or marketing pixels are enabled, those providers process data under their own policies. We keep this disabled by default.",
    },
  ];

  return (
    <>
      <section className="bg-[#14181D] py-14 text-white">
        <Container>
          <div className="text-[11px] font-extrabold uppercase tracking-[0.18em]" style={{ color: accent }}>Privacy policy</div>
          <h1 className="mt-3 max-w-3xl text-[clamp(2.2rem,5vw,3.6rem)] font-extrabold leading-[1.04] tracking-[-0.04em]" style={{ fontFamily: "'Sora', sans-serif" }}>
            How we handle your information
          </h1>
        </Container>
      </section>
      <section className="border-b border-[#ECEEEC] bg-white py-10 lg:py-14">
        <Container className="max-w-3xl space-y-8">
          {sections.map((section) => (
            <div key={section.heading}>
              <h2 className="text-xl font-bold tracking-[-0.02em] text-[#14181D]">{section.heading}</h2>
              <p className="mt-2 text-[17px] leading-8 text-[#3C4248]">{section.body}</p>
            </div>
          ))}
          <p className="text-sm text-[#9AA1A8]">Last updated: {new Date().getFullYear()}. This policy follows NDPR-aligned practices for Nigerian users.</p>
        </Container>
      </section>
    </>
  );
}

export function CookiePolicyPage() {
  return (
    <>
      <section className="bg-[#14181D] py-14 text-white">
        <Container>
          <div className="text-[11px] font-extrabold uppercase tracking-[0.18em]" style={{ color: accent }}>Cookie policy</div>
          <h1 className="mt-3 max-w-3xl text-[clamp(2.2rem,5vw,3.6rem)] font-extrabold leading-[1.04] tracking-[-0.04em]" style={{ fontFamily: "'Sora', sans-serif" }}>
            Cookies, pixels, and your consent
          </h1>
        </Container>
      </section>
      <section className="border-b border-[#ECEEEC] bg-white py-10 lg:py-14">
        <Container className="max-w-3xl space-y-8">
          <div>
            <h2 className="text-xl font-bold tracking-[-0.02em] text-[#14181D]">What we use</h2>
            <p className="mt-2 text-[17px] leading-8 text-[#3C4248]">
              Essential cookies keep the site working. Analytics and marketing cookies (such as GA4, Meta Pixel, or TikTok Pixel if enabled) are loaded only after you accept them.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-bold tracking-[-0.02em] text-[#14181D]">Your control</h2>
            <p className="mt-2 text-[17px] leading-8 text-[#3C4248]">
              The consent banner lets you accept all or reject non-essential cookies. Your choice is stored locally and can be reset by clearing site data.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-bold tracking-[-0.02em] text-[#14181D]">Disabled by default</h2>
            <p className="mt-2 text-[17px] leading-8 text-[#3C4248]">
              No analytics or marketing tags run until you accept them. We keep tracking off unless you opt in.
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}

export function CompanyPolicyPage() {
  const sections = [
    {
      heading: "Quotation",
      body: "Every order starts with a written quote covering the item, specification, and total cost. We confirm details in writing before any payment is made.",
    },
    {
      heading: "Payments",
      body: "Payment terms are agreed at the quotation stage. We do not place orders against unconfirmed specifications.",
    },
    {
      heading: "Inspection and accuracy",
      body: "Where possible, items are inspected before they move. If an item does not match the agreed specification due to our error, we work it out with you directly.",
    },
    {
      heading: "Delivery",
      body: "Standard delivery is within Lagos. Delivery outside Lagos can be arranged depending on the item and location, confirmed before the order is placed.",
    },
    {
      heading: "Scope and limitations",
      body: "We source and supply equipment and can coordinate installation through trusted technicians. We do not provide live stock listings; each quote is built around your specific need.",
    },
  ];

  return (
    <>
      <section className="bg-[#14181D] py-14 text-white">
        <Container>
          <div className="text-[11px] font-extrabold uppercase tracking-[0.18em]" style={{ color: accent }}>Company policy</div>
          <h1 className="mt-3 max-w-3xl text-[clamp(2.2rem,5vw,3.6rem)] font-extrabold leading-[1.04] tracking-[-0.04em]" style={{ fontFamily: "'Sora', sans-serif" }}>
            How we run orders
          </h1>
        </Container>
      </section>
      <section className="border-b border-[#ECEEEC] bg-white py-10 lg:py-14">
        <Container className="max-w-3xl space-y-8">
          {sections.map((section) => (
            <div key={section.heading}>
              <h2 className="text-xl font-bold tracking-[-0.02em] text-[#14181D]">{section.heading}</h2>
              <p className="mt-2 text-[17px] leading-8 text-[#3C4248]">{section.body}</p>
            </div>
          ))}
          <div className={`overflow-hidden rounded-[24px] border bg-white shadow-[0_10px_24px_rgba(20,24,29,0.03)] ${cardBorder}`}>
            <div className="relative h-44 overflow-hidden bg-[#14181D]">
              <img
                src="/media/policy-office.jpg"
                alt="Oguntimehin Procurement & Energy Services, Ipaja, Lagos"
                loading="lazy"
                className="h-full w-full object-cover"
                onError={(event) => { (event.currentTarget as HTMLImageElement).style.display = "none"; }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#14181D]/55 to-transparent" />
            </div>
            <div className="p-6">
            <div className="flex items-center gap-3 text-sm font-semibold text-[#14181D]">
              <MapPin className="h-4 w-4" style={{ color: accent }} /> {ADDRESS_LINE_1}, {ADDRESS_LINE_2}
            </div>
            <div className="mt-2 flex flex-wrap gap-x-6 gap-y-2 text-sm text-[#3C4248]">
              <span className="inline-flex items-center gap-2"><Phone className="h-4 w-4" style={{ color: accent }} /> {PHONE_DISPLAY}</span>
              <span className="inline-flex items-center gap-2"><CalendarClock className="h-4 w-4" style={{ color: accent }} /> {HOURS_DISPLAY}{HOURS_NEEDS_VERIFICATION ? " (confirm before visiting)" : ""}</span>
            </div>
            </div>
          </div>
        </Container>
      </section>
      <CtaBanner />
    </>
  );
}

