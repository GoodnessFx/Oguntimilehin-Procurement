import { useEffect, useState } from "react";
import {
  ArrowRight,
  BatteryCharging,
  Building2,
  CalendarClock,
  ClipboardCheck,
  Factory,
  FileText,
  MapPin,
  Package,
  Phone,
  Search,
  ShieldCheck,
  Sun,
  Truck,
  Zap,
} from "lucide-react";
import {
  ADDRESS_LINE_1,
  ADDRESS_LINE_2,
  BUSINESS_NAME,
  BUSINESS_SHORT_NAME,
  EMAIL,
  GOOGLE_MAPS_URL,
  HOURS_DISPLAY,
  HOURS_NEEDS_VERIFICATION,
  PHONE_DISPLAY,
  WA_GREETING,
  audiences,
  faqItems,
  featuredMedia,
  heroStats,
  orderSteps,
  projects,
  services,
  trustPillars,
} from "./content";
import { blogPosts, getPostBySlug } from "./blog";
import {
  AccentCheck,
  ContactSection,
  Container,
  CtaBanner,
  DarkPanel,
  FaqList,
  NewsletterSignup,
  PrimaryButton,
  SecondaryButton,
  SectionHeading,
  SurfaceCard,
  TestimonialsPreview,
  WhyChooseGrid,
  accent,
  createWhatsAppUrl,
  displayFont,
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

const projectTone: Record<string, string> = {
  navy: "from-[#0D234F] via-[#173B77] to-[#244C9F]",
  gold: "from-[#8D6211] via-[#C79019] to-[#F5BE2E]",
  slate: "from-[#111111] via-[#24314D] to-[#40557B]",
};

type HeroSlide = { type: "video" | "image"; src: string; alt: string; poster?: string };

const heroSlides: HeroSlide[] = [
  { type: "video", src: "/media/hero-generator.mp4", poster: "/media/hero-generator.jpg", alt: "Industrial energy operations" },
  { type: "image", src: "/media/recent/solar-installation-001.jpeg", alt: "Large-scale solar installation by OPES" },
  { type: "image", src: "/media/recent/inverter-installed.jpeg", alt: "Commercial inverter deployment by OPES" },
  { type: "image", src: "/media/hero-construction.jpg", alt: "Project procurement and site operations" },
];

function HeroBackground() {
  const [active, setActive] = useState(0);
  const [failed, setFailed] = useState<Set<number>>(new Set());

  useEffect(() => {
    const id = window.setInterval(() => setActive((value) => (value + 1) % heroSlides.length), 5000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-[linear-gradient(135deg,#071326_0%,#0D234F_45%,#111111_100%)]" />
      {heroSlides.map((slide, index) => {
        const visible = index === active && !failed.has(index);
        return (
          <div
            key={slide.src}
            className="absolute inset-0 transition-opacity duration-[1600ms] ease-out"
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
      <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(7,19,38,0.88)_0%,rgba(13,35,79,0.78)_45%,rgba(17,17,17,0.82)_100%)]" />
      <div
        className="absolute inset-0 opacity-[0.10]"
        style={{
          backgroundImage: "linear-gradient(#ffffff18 1px, transparent 1px), linear-gradient(90deg,#ffffff18 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <div className="absolute -left-10 top-24 h-40 w-40 rounded-[30px] border border-white/10 bg-white/5 blur-[1px] animate-float-reverse" />
      <div className="absolute right-10 top-28 h-16 w-16 rounded-[18px] border border-[#F5BE2E]/50 bg-[#F5BE2E]/10 animate-float-slow" />
      <div className="absolute bottom-20 right-[18%] h-24 w-24 rounded-[20px] border border-white/10 bg-white/5 animate-float-fast" />
      <div className="absolute left-[15%] top-[35%] h-12 w-12 rounded-lg border border-[#E0A21A]/30 bg-[#E0A21A]/5 animate-float-slow" />
      <div className="absolute right-[25%] bottom-[30%] h-20 w-20 rounded-xl border border-white/10 bg-white/5 animate-float-reverse" />
    </div>
  );
}

function Hero({ onNavigate }: { onNavigate?: (path: string) => void }) {
  return (
    <section className="relative isolate overflow-hidden">
      <HeroBackground />
      <Container className="relative z-10 flex min-h-[92vh] flex-col justify-center py-24 text-white">
        <div className="mb-6 inline-flex w-fit items-center gap-3 rounded-full border border-white/12 bg-white/8 px-4 py-2 text-[11px] font-extrabold uppercase tracking-[0.2em] backdrop-blur-sm">
          <img src="/brand/opes-logo-primary.png" alt="" className="h-5 w-5 object-contain" aria-hidden="true" />
          World-class procurement and energy solutions
        </div>
        <h1 className="max-w-5xl text-[clamp(2.8rem,7vw,5.4rem)] font-extrabold leading-[0.98] tracking-[-0.05em]" style={{ fontFamily: displayFont }}>
          Premium procurement and energy execution for clients that expect confidence, clarity, and results.
        </h1>
        <p className="mt-6 max-w-3xl text-[18px] leading-relaxed text-white/78">
          {BUSINESS_SHORT_NAME} brings together procurement expertise, engineering thinking, energy solutions, supplier verification, and delivery support under one premium corporate identity.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <PrimaryButton
            href="/#contact"
            onClick={(event) => {
              event.preventDefault();
              onNavigate?.("/#contact");
            }}
          >
            Request a Quote <ArrowRight className="h-4 w-4" />
          </PrimaryButton>
          <SecondaryButton href={createWhatsAppUrl(WA_GREETING)}>Chat on WhatsApp</SecondaryButton>
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {heroStats.map((item) => (
            <div key={item.value} className="rounded-[24px] border border-white/10 bg-white/8 p-5 backdrop-blur-md">
              <div className="text-lg font-bold text-[#F5BE2E]" style={{ fontFamily: displayFont }}>
                {item.value}
              </div>
              <div className="mt-2 text-sm leading-6 text-white/72">{item.label}</div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

function TrustStrip() {
  return (
    <section className="border-b border-[#E7ECF3] bg-white py-8">
      <Container className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {trustPillars.map((item) => (
          <div key={item} className="flex items-center gap-3 rounded-[22px] border border-[#D7DEE9] bg-[#FBFCFD] px-5 py-4">
            <AccentCheck />
            <span className="text-sm font-semibold text-[#0D234F]">{item}</span>
          </div>
        ))}
      </Container>
    </section>
  );
}

function WhoItsFor() {
  return (
    <section className="border-b border-[#E7ECF3] bg-white py-12 lg:py-16">
      <Container>
        <SectionHeading
          eyebrow="Who we serve"
          title="Structured support for projects, facilities, institutions, and modern businesses"
          body="OPES is designed for clients who want a credible, polished, and execution-focused partner across procurement and energy scopes."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {audiences.map((item) => (
            <SurfaceCard key={item} className="flex items-start gap-3 p-5">
              <AccentCheck />
              <span className="text-sm font-semibold text-[#0D234F]">{item}</span>
            </SurfaceCard>
          ))}
        </div>
      </Container>
    </section>
  );
}

function ServicesSection() {
  return (
    <section id="what-we-do" className="border-b border-[#E7ECF3] bg-[#F4F6F8] py-12 lg:py-16">
      <Container>
        <SectionHeading
          eyebrow="Services"
          title="A premium service architecture built around performance, certainty, and presentation"
          body="The OPES offer spans energy systems, commercial sourcing, supplier diligence, and logistics coordination with a stronger corporate standard of communication."
        />
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => {
            const Icon = serviceIconMap[service.icon] ?? Package;
            return (
              <SurfaceCard key={service.title} className="group p-6 transition duration-300 hover:-translate-y-1 hover:shadow-[0_30px_70px_rgba(15,23,42,0.08)]">
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-[18px] bg-[linear-gradient(135deg,rgba(224,162,26,0.14),rgba(36,76,159,0.12))]">
                  <Icon className="h-6 w-6 text-[#0D234F]" />
                </div>
                <h3 className="mt-5 text-xl font-bold tracking-[-0.03em] text-[#0D234F]" style={{ fontFamily: displayFont }}>
                  {service.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-[#51607B]">{service.description}</p>
              </SurfaceCard>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

function SignatureSection() {
  return (
    <section className="border-b border-white/10 bg-[#091933] py-12 lg:py-16 text-white">
      <Container className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#F5BE2E]">
            Visual identity
          </div>
          <h2 className="max-w-3xl text-[clamp(2.1rem,5vw,3.6rem)] font-extrabold leading-[1.02] tracking-[-0.05em]" style={{ fontFamily: displayFont }}>
            The OPES folded-square motif becomes the site’s visual language.
          </h2>
          <p className="mt-4 max-w-2xl text-[17px] leading-8 text-white/76">
            Navy structure, gold emphasis, spacious composition, and geometric forms create a cleaner corporate presence comparable to established engineering and energy brands.
          </p>
        </div>
        <DarkPanel className="relative overflow-hidden p-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(245,190,46,0.18),transparent_34%)]" />
          <div className="relative flex h-full min-h-[260px] items-center justify-center">
            <div className="grid grid-cols-3 gap-4">
              <div className="h-20 w-20 rounded-[22px] border border-white/10 bg-white/6" />
              <div className="h-20 w-20 rounded-[22px] border border-[#F5BE2E]/40 bg-[#F5BE2E]/10" />
              <div className="h-20 w-20 rounded-[22px] border border-white/10 bg-white/6" />
              <div className="h-20 w-20 rounded-[22px] border border-white/10 bg-white/6" />
              <div className="flex h-20 w-20 items-center justify-center rounded-[22px] border border-white/10 bg-white">
                <img src="/brand/opes-logo-primary.png" alt={`${BUSINESS_SHORT_NAME} logo`} className="h-12 w-12 object-contain" />
              </div>
              <div className="h-20 w-20 rounded-[22px] border border-white/10 bg-white/6" />
              <div className="h-20 w-20 rounded-[22px] border border-[#244C9F]/50 bg-[#244C9F]/10" />
              <div className="h-20 w-20 rounded-[22px] border border-white/10 bg-white/6" />
              <div className="h-20 w-20 rounded-[22px] border border-white/10 bg-white/6" />
            </div>
          </div>
        </DarkPanel>
      </Container>
    </section>
  );
}

function OrderProcess() {
  return (
    <section className="border-b border-[#E7ECF3] bg-white py-12 lg:py-16">
      <Container>
        <SectionHeading
          eyebrow="Process"
          title="A disciplined five-step path from project brief to final delivery"
          body="The OPES process is designed to feel structured, transparent, and commercially dependable at every stage."
        />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {orderSteps.map((step, index) => (
            <SurfaceCard key={step.title} className="p-5">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#0D234F] text-sm font-bold text-white">
                  {index + 1}
                </span>
                <span className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#E0A21A]">{step.title}</span>
              </div>
              <p className="mt-4 text-sm leading-7 text-[#51607B]">{step.heading}</p>
            </SurfaceCard>
          ))}
        </div>
      </Container>
    </section>
  );
}

function ProjectsSection({ compact = false }: { compact?: boolean }) {
  const displayProjects = compact ? projects.slice(0, 3) : projects;

  return (
    <section className="border-b border-[#E7ECF3] bg-[#F4F6F8] py-12 lg:py-16">
      <Container>
        <SectionHeading
          eyebrow="Recent work"
          title="Real OPES project visuals now anchor the portfolio section"
          body="Your newly added installation photos and recent work media are now positioned as premium case-study assets instead of generic placeholders."
        />
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {displayProjects.map((project) => (
            <article key={project.title} className="overflow-hidden rounded-[28px] border border-[#D7DEE9] bg-white shadow-[0_18px_48px_rgba(15,23,42,0.06)]">
              <div className="relative h-56 overflow-hidden bg-[#091933]">
                <img src={project.image} alt={project.title} loading="lazy" className="h-full w-full object-cover transition duration-500 hover:scale-[1.03]" />
                <div className={`absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t ${projectTone[project.tone]} opacity-75`} />
                <span className="absolute left-5 top-5 rounded-full border border-white/15 bg-black/20 px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.18em] text-white backdrop-blur-md">
                  {project.category}
                </span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold tracking-[-0.03em] text-[#0D234F]" style={{ fontFamily: displayFont }}>
                  {project.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-[#51607B]">{project.summary}</p>
                <p className="mt-4 text-sm leading-7 text-[#0D234F]/85">
                  <span className="font-semibold">Outcome:</span> {project.outcome}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="rounded-full border border-[#D7DEE9] bg-[#F8FAFC] px-3 py-1 text-xs font-semibold text-[#4D5E7D]">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
        {compact ? null : (
          <div className="mt-8">
            <SecondaryButton href="/recent-projects">See the project portfolio <ArrowRight className="h-4 w-4" /></SecondaryButton>
          </div>
        )}
      </Container>
    </section>
  );
}

function MediaShowcase() {
  return (
    <section className="border-b border-white/10 bg-[#091933] py-12 lg:py-16 text-white">
      <Container>
        <SectionHeading
          eyebrow="Project media"
          title="Recent videos and field footage are now used where they add credibility"
          body="Instead of leaving recent work hidden in the folder, the site now turns those files into a polished portfolio story."
        />
        <div className="grid gap-5 lg:grid-cols-3">
          {featuredMedia.map((item) => (
            <DarkPanel key={item.title} className="overflow-hidden">
              <div className="h-56 overflow-hidden bg-black">
                {item.type === "video" ? (
                  <video className="h-full w-full object-cover" src={item.src} poster={item.poster} controls playsInline preload="metadata" />
                ) : (
                  <img className="h-full w-full object-cover" src={item.src} alt={item.title} />
                )}
              </div>
              <div className="p-6">
                <div className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#F5BE2E]">{item.category}</div>
                <h3 className="mt-3 text-xl font-bold tracking-[-0.03em]" style={{ fontFamily: displayFont }}>
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-white/74">{item.caption}</p>
              </div>
            </DarkPanel>
          ))}
        </div>
      </Container>
    </section>
  );
}

function FaqSection({ title, body }: { title?: string; body?: string }) {
  return (
    <section className="border-b border-[#E7ECF3] bg-white py-12 lg:py-16">
      <Container>
        <SectionHeading
          eyebrow="FAQ"
          title={title ?? "Answers to the questions serious clients ask first"}
          body={body ?? "Straight answers on procurement, energy systems, supplier verification, delivery, and project support."}
        />
        <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          <FaqList items={faqItems} />
          <DarkPanel className="p-6">
            <h3 className="text-xl font-bold tracking-[-0.03em]" style={{ fontFamily: displayFont }}>
              Still evaluating?
            </h3>
            <p className="mt-3 text-sm leading-7 text-white/74">
              Share the equipment, power objective, or procurement requirement and OPES will respond with a professional next step.
            </p>
            <div className="mt-5">
              <PrimaryButton href={createWhatsAppUrl(WA_GREETING)}>Ask on WhatsApp <ArrowRight className="h-4 w-4" /></PrimaryButton>
            </div>
          </DarkPanel>
        </div>
      </Container>
    </section>
  );
}

function InnerHero({ eyebrow, title, body }: { eyebrow: string; title: string; body?: string }) {
  return (
    <section className="relative overflow-hidden bg-[#091933] py-16 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(245,190,46,0.18),transparent_24%)]" />
      <div className="absolute right-12 top-12 h-24 w-24 rotate-45 rounded-[24px] border border-white/10 bg-white/5" />
      <Container className="relative z-10">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#F5BE2E]">
          {eyebrow}
        </div>
        <h1 className="mt-4 max-w-4xl text-[clamp(2.3rem,5vw,4rem)] font-extrabold leading-[1.02] tracking-[-0.05em]" style={{ fontFamily: displayFont }}>
          {title}
        </h1>
        {body ? <p className="mt-4 max-w-3xl text-[17px] leading-8 text-white/74">{body}</p> : null}
      </Container>
    </section>
  );
}

export function HomePage({ onNavigate }: { onNavigate?: (path: string) => void }) {
  return (
    <>
      <Hero onNavigate={onNavigate} />
      <TrustStrip />
      <section className="border-b border-[#E7ECF3] bg-white py-12 lg:py-16">
        <Container>
          <SectionHeading
            eyebrow="Why OPES"
            title="A more premium digital identity for a stronger real-world business"
            body="The site now speaks in a cleaner, more globally competitive tone while still keeping the message practical, credible, and tied to actual work."
          />
          <WhyChooseGrid />
        </Container>
      </section>
      <WhoItsFor />
      <ServicesSection />
      <SignatureSection />
      <OrderProcess />
      <ProjectsSection />
      <MediaShowcase />
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
      <InnerHero
        eyebrow="Services"
        title="Integrated procurement and energy services under a premium corporate brand"
        body="OPES now presents its service scope with the level of clarity and confidence expected from a world-class engineering and procurement company."
      />
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
      title: "Supplier diligence before commercial commitment",
      body: "Supplier credibility, product fit, and commercial alignment are reviewed before clients proceed.",
      image: "/media/svc-supplier.jpg",
    },
    {
      icon: Factory,
      title: "Technical and quality review",
      body: "Equipment condition, configuration, and key details are checked where possible before movement or handover.",
      image: "/media/recent/inverter-installed.jpeg",
    },
    {
      icon: FileText,
      title: "Clear quotations and documented scope",
      body: "Specifications, supply scope, and commercial details are kept documented so expectations stay aligned.",
      image: "/media/recent/hybrid-inverter-system-12kva.jpeg",
    },
    {
      icon: Truck,
      title: "Delivery and project coordination",
      body: "OPES manages supply movement and practical logistics planning with communication maintained throughout.",
      image: "/media/recent/deye-battery-pack-215kwh.jpeg",
    },
  ];

  const notes = [
    "Lead time depends on specification, source availability, supplier readiness, and logistics conditions.",
    "Delivery outside Lagos can be considered based on the project scope and item class.",
    "Installation support can be coordinated where required; the scope is clarified per project.",
    "OPES works around actual client needs rather than generic stock-driven proposals.",
  ];

  return (
    <>
      <InnerHero
        eyebrow="Service information"
        title="How OPES executes with structure, diligence, and commercial clarity"
        body="The redesigned service-information experience is built to reassure clients that the process is disciplined and professionally handled."
      />
      <section className="border-b border-[#E7ECF3] bg-white py-12 lg:py-16">
        <Container>
          <div className="grid gap-5 md:grid-cols-2">
            {points.map((point) => (
              <SurfaceCard key={point.title} className="overflow-hidden">
                <div className="relative h-48 overflow-hidden bg-[#091933]">
                  <img
                    src={point.image}
                    alt={point.title}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#091933]/65 to-transparent" />
                </div>
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,rgba(224,162,26,0.14),rgba(36,76,159,0.12))]">
                      <point.icon className="h-6 w-6 text-[#0D234F]" />
                    </span>
                    <div>
                      <h3 className="text-lg font-bold tracking-[-0.03em] text-[#0D234F]" style={{ fontFamily: displayFont }}>{point.title}</h3>
                      <p className="mt-2 text-sm leading-7 text-[#51607B]">{point.body}</p>
                    </div>
                  </div>
                </div>
              </SurfaceCard>
            ))}
          </div>
        </Container>
      </section>
      <section className="border-b border-[#E7ECF3] bg-[#F4F6F8] py-12 lg:py-16">
        <Container>
          <SectionHeading eyebrow="Before you engage" title="A few details that help keep projects smooth" />
          <div className="grid gap-4 sm:grid-cols-2">
            {notes.map((note) => (
              <SurfaceCard key={note} className="flex items-start gap-3 p-5">
                <AccentCheck />
                <span className="text-sm leading-7 text-[#51607B]">{note}</span>
              </SurfaceCard>
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
      <InnerHero
        eyebrow="How it works"
        title="A professional process clients can understand at a glance"
        body="The new layout presents the OPES workflow in a way that feels credible, premium, and easy to follow."
      />
      <OrderProcess />
      <ServiceInformationPage />
    </>
  );
}

export function ProjectsPage() {
  return (
    <>
      <InnerHero
        eyebrow="Recent projects"
        title="A stronger project portfolio built from your actual field media"
        body="The project section now uses your latest installation photos and videos to make the OPES story feel grounded, current, and professional."
      />
      <ProjectsSection />
      <MediaShowcase />
      <CtaBanner />
    </>
  );
}

export function TestimonialsPage() {
  return (
    <>
      <InnerHero
        eyebrow="Brand trust"
        title="Professional presentation matters because trust starts before the first quote"
      />
      <TestimonialsPreview />
      <CtaBanner />
    </>
  );
}

export function WhyChoosePage() {
  return (
    <>
      <InnerHero
        eyebrow="Why choose us"
        title="Why OPES should feel more like a premium corporate partner"
        body="The new design and messaging position the business around trust, execution quality, engineering confidence, and commercial professionalism."
      />
      <section className="border-b border-[#E7ECF3] bg-white py-12 lg:py-16">
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
      <InnerHero
        eyebrow="FAQ"
        title="Common OPES questions answered with clarity"
      />
      <FaqSection title="The questions we hear most" />
      <CtaBanner />
    </>
  );
}

export function ContactPage() {
  return (
    <>
      <InnerHero
        eyebrow="Contact"
        title="Bring your project, procurement, or energy requirement to OPES"
        body="The contact experience has been upgraded to feel more corporate, more direct, and easier to trust."
      />
      <ContactSection />
    </>
  );
}

export function BlogPage({ onNavigate }: { onNavigate?: (path: string) => void }) {
  return (
    <>
      <InnerHero
        eyebrow="Insights"
        title="Practical insight on energy systems, backup power, and smarter procurement"
        body="The blog now sits inside a more premium content shell that feels aligned with the upgraded OPES brand."
      />
      <section className="border-b border-[#E7ECF3] bg-[#F4F6F8] py-12 lg:py-16">
        <Container>
          {blogPosts.length === 0 ? (
            <p className="text-sm text-[#51607B]">Guides are being prepared. You can still reach OPES directly on WhatsApp for live support.</p>
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
                  className="group flex flex-col overflow-hidden rounded-[26px] border border-[#D7DEE9] bg-white shadow-[0_18px_48px_rgba(15,23,42,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_70px_rgba(15,23,42,0.09)]"
                >
                  <div className="relative h-44 overflow-hidden bg-[#091933]">
                    {post.image ? (
                      <img
                        src={post.image}
                        alt={post.title}
                        loading="lazy"
                        className="h-full w-full object-cover"
                      />
                    ) : null}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#091933]/65 to-transparent" />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.14em]" style={{ color: accent }}>
                      <span>{post.category}</span>
                      {post.readTime ? <span className="text-[#9AA1A8]">· {post.readTime}</span> : null}
                    </div>
                    <h3 className="mt-3 text-xl font-bold leading-snug tracking-[-0.03em] text-[#0D234F] group-hover:text-[#E0A21A]" style={{ fontFamily: displayFont }}>{post.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-[#51607B]">{post.excerpt}</p>
                    <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#0D234F]">Read guide <ArrowRight className="h-4 w-4" style={{ color: accent }} /></span>
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
      <section className="bg-[#F4F6F8] py-20">
        <Container>
          <h1 className="text-2xl font-bold text-[#0D234F]">Guide not found</h1>
          <p className="mt-3 text-sm text-[#51607B]">This guide may have been moved. Browse all guides from the blog page.</p>
        </Container>
      </section>
    );
  }

  return (
    <article className="bg-[#F4F6F8] py-12 lg:py-16">
      <Container className="max-w-3xl">
        <div className="flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.14em]" style={{ color: accent }}>
          <span>{post.category}</span>
          {post.date ? <span className="text-[#9AA1A8]">· {post.date}</span> : null}
          {post.readTime ? <span className="text-[#9AA1A8]">· {post.readTime}</span> : null}
        </div>
        <h1 className="mt-3 text-[clamp(2rem,4.5vw,3.2rem)] font-extrabold leading-[1.05] tracking-[-0.04em] text-[#0D234F]" style={{ fontFamily: displayFont }}>
          {post.title}
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-[#51607B]">{post.excerpt}</p>
        {post.image ? (
          <div className="mt-6 overflow-hidden rounded-[24px] border border-[#D7DEE9] bg-[#091933]">
            <img
              src={post.image}
              alt={post.title}
              className="h-56 w-full object-cover sm:h-72"
            />
          </div>
        ) : null}
        <div className="mt-8 space-y-5 text-[17px] leading-8 text-[#30435F]">
          {post.body.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap gap-3 border-t border-[#D7DEE9] pt-6">
          <PrimaryButton href={createWhatsAppUrl(WA_GREETING)}>Ask about this on WhatsApp <ArrowRight className="h-4 w-4" /></PrimaryButton>
          <SecondaryButton href="/blog">Back to all guides</SecondaryButton>
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
      <InnerHero eyebrow="Privacy policy" title="How OPES handles your information" />
      <section className="border-b border-[#E7ECF3] bg-white py-12 lg:py-16">
        <Container className="max-w-3xl space-y-8">
          {sections.map((section) => (
            <div key={section.heading}>
              <h2 className="text-xl font-bold tracking-[-0.03em] text-[#0D234F]" style={{ fontFamily: displayFont }}>{section.heading}</h2>
              <p className="mt-2 text-[17px] leading-8 text-[#51607B]">{section.body}</p>
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
      <InnerHero eyebrow="Cookie policy" title="Cookies, analytics, and your consent" />
      <section className="border-b border-[#E7ECF3] bg-white py-12 lg:py-16">
        <Container className="max-w-3xl space-y-8">
          <div>
            <h2 className="text-xl font-bold tracking-[-0.03em] text-[#0D234F]" style={{ fontFamily: displayFont }}>What we use</h2>
            <p className="mt-2 text-[17px] leading-8 text-[#51607B]">
              Essential cookies keep the site working. Analytics and marketing cookies (such as GA4, Meta Pixel, or TikTok Pixel if enabled) are loaded only after you accept them.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-bold tracking-[-0.03em] text-[#0D234F]" style={{ fontFamily: displayFont }}>Your control</h2>
            <p className="mt-2 text-[17px] leading-8 text-[#51607B]">
              The consent banner lets you accept all or reject non-essential cookies. Your choice is stored locally and can be reset by clearing site data.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-bold tracking-[-0.03em] text-[#0D234F]" style={{ fontFamily: displayFont }}>Disabled by default</h2>
            <p className="mt-2 text-[17px] leading-8 text-[#51607B]">
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
      <InnerHero eyebrow="Company policy" title="How OPES approaches orders and project execution" />
      <section className="border-b border-[#E7ECF3] bg-white py-12 lg:py-16">
        <Container className="max-w-3xl space-y-8">
          {sections.map((section) => (
            <div key={section.heading}>
              <h2 className="text-xl font-bold tracking-[-0.03em] text-[#0D234F]" style={{ fontFamily: displayFont }}>{section.heading}</h2>
              <p className="mt-2 text-[17px] leading-8 text-[#51607B]">{section.body}</p>
            </div>
          ))}
          <SurfaceCard className="overflow-hidden">
            <div className="relative h-52 overflow-hidden bg-[#091933]">
              <img
                src="/media/recent/inverter-installed.jpeg"
                alt="OPES recent project"
                loading="lazy"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#091933]/65 to-transparent" />
            </div>
            <div className="p-6">
            <div className="flex items-center gap-3 text-sm font-semibold text-[#0D234F]">
              <MapPin className="h-4 w-4" style={{ color: accent }} /> {ADDRESS_LINE_1}, {ADDRESS_LINE_2}
            </div>
            <div className="mt-2 flex flex-wrap gap-x-6 gap-y-2 text-sm text-[#51607B]">
              <span className="inline-flex items-center gap-2"><Phone className="h-4 w-4" style={{ color: accent }} /> {PHONE_DISPLAY}</span>
              <span className="inline-flex items-center gap-2"><CalendarClock className="h-4 w-4" style={{ color: accent }} /> {HOURS_DISPLAY}{HOURS_NEEDS_VERIFICATION ? " (confirm before visiting)" : ""}</span>
            </div>
            </div>
          </SurfaceCard>
        </Container>
      </section>
      <CtaBanner />
    </>
  );
}

