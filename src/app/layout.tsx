import { useMemo, useState } from "react";
import type { FormEvent, ReactNode } from "react";
import { ArrowRight, CalendarDays, ChevronDown, CircleHelp, Mail, MapPin, Menu, MessageCircle, Phone, Star, X } from "lucide-react";
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
  WA_PHONE,
  analyticsConfig,
  footerConsent,
  socialLinks,
  whyChoose,
} from "./content";

export type QuoteFormState = {
  name: string;
  phoneNumber: string;
  whatsappNumber: string;
  itemNeeded: string;
  quantity: string;
  serviceType: string;
  additionalInformation: string;
  contactPreference: "WhatsApp" | "Email";
  honeypot: string;
  productImageName: string;
};

export type RouteMeta = {
  title: string;
  description: string;
};

export const accent = "#E0A21A";
export const accentBright = "#F5BE2E";
export const accentSoft = "#B88412";
export const dark = "#0D234F";
export const displayFont = "'Space Grotesk', 'Manrope', sans-serif";
export const darkSoft = "#111111";
export const bodyText = "#51607B";
export const muted = "#6E7C96";
export const borderColor = "border-[#D7DEE9]";
export const bg = "#F4F6F8";
export const cardBorder = "border-[#D7DEE9]";

export const pageLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Service Info", href: "/service-information" },
  { label: "Projects", href: "/recent-projects" },
  { label: "FAQ", href: "/faq" },
  { label: "Blog", href: "/blog" },
  { label: "Why Choose Us", href: "/why-choose-us" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "Contact Us", href: "/contact" },
];

export type MenuItem = {
  label: string;
  href: string;
};

export type MenuGroup = {
  label: string;
  links: MenuItem[];
};

export const menuGroups: MenuGroup[] = [
  {
    label: "Services",
    links: [
      { label: "Our Services", href: "/services" },
      { label: "Service Information", href: "/service-information" },
      { label: "How It Works", href: "/how-it-works" },
    ],
  },
  {
    label: "Work",
    links: [
      { label: "Recent Projects", href: "/recent-projects" },
      { label: "Why Choose Us", href: "/why-choose-us" },
    ],
  },
  {
    label: "Resources",
    links: [
      { label: "FAQs", href: "/faq" },
      { label: "Blog & Guides", href: "/blog" },
      { label: "Contact Us", href: "/contact" },
      { label: "Company Policy", href: "/company-policy" },
    ],
  },
];

export const homeSectionLinks = [
  { label: "What We Do", href: "/#what-we-do" },
];

export const routeMeta: Record<string, RouteMeta> = {
  "/": {
    title: "OPES | Procurement & Energy Services",
    description:
      "Premium procurement, engineering support, and energy solutions from OPES (Oguntimehin Procurement & Energy Services).",
  },
  "/services": {
    title: "Services | OPES",
    description:
      "Explore OPES services across strategic procurement, energy systems, logistics, supplier verification, and project delivery support.",
  },
  "/service-information": {
    title: "Service Information | OPES",
    description:
      "How OPES handles discovery, supplier evaluation, technical review, quotation, procurement, and delivery.",
  },
  "/recent-projects": {
    title: "Recent Projects | OPES",
    description:
      "Recent OPES work across inverter systems, solar infrastructure, battery storage, and project supply.",
  },
  "/faq": {
    title: "FAQ | OPES",
    description:
      "Answers to common OPES questions about procurement, energy systems, delivery, sizing, and service scope.",
  },
  "/blog": {
    title: "Insights | OPES",
    description:
      "Guides and practical insights on procurement, energy systems, backup power, and project planning from OPES.",
  },
  "/privacy-policy": {
    title: "Privacy Policy | OPES",
    description:
      "How OPES collects, uses, stores, and protects customer information under NDPR-aligned privacy terms.",
  },
  "/why-choose-us": {
    title: "Why Choose OPES",
    description:
      "Why OPES is a premium procurement and energy partner for projects, facilities, institutions, and businesses.",
  },
  "/how-it-works": {
    title: "How It Works | OPES",
    description:
      "The OPES process from project discovery and evaluation to quotation, execution, and delivery.",
  },
  "/contact": {
    title: "Contact | OPES",
    description:
      "Get in touch with OPES for procurement, energy, and project support. Call, email, or continue on WhatsApp.",
  },
  "/cookie-policy": {
    title: "Cookie Policy | OPES",
    description: "How OPES uses cookies and similar technologies, including analytics and marketing pixels when enabled.",
  },
  "/company-policy": {
    title: "Company Policy | OPES",
    description:
      "OPES policy covering quotations, payments, delivery, supplier handling, and service limitations.",
  },
};

export function normalizePath(pathname: string) {
  const trimmed = pathname.replace(/\/+$/, "");
  return trimmed === "" ? "/" : trimmed;
}

export function createWhatsAppUrl(message: string) {
  return `https://wa.me/${WA_PHONE}?text=${encodeURIComponent(message)}`;
}

export function setMetaTag(name: string, content: string, property = false) {
  const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
  let meta = document.head.querySelector(selector) as HTMLMetaElement | null;

  if (!meta) {
    meta = document.createElement("meta");
    if (property) {
      meta.setAttribute("property", name);
    } else {
      meta.name = name;
    }
    document.head.appendChild(meta);
  }

  meta.content = content;
}

export function upsertLink(rel: string, href: string) {
  let link = document.head.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;

  if (!link) {
    link = document.createElement("link");
    link.rel = rel;
    document.head.appendChild(link);
  }

  link.href = href;
}

export function classNames(...values: Array<string | false | undefined>) {
  return values.filter(Boolean).join(" ");
}

export function Logo() {
  return <img src="/brand/opes-logo-primary.png" alt="OPES logo" className="h-12 w-12 object-contain" />;
}

export function Container({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={classNames("mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-10", className)}>{children}</div>;
}

export function SectionTag({ children }: { children: ReactNode }) {
  return (
    <div className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-[#E6C875] bg-white/95 px-4 py-2 text-[11px] font-extrabold uppercase tracking-[0.2em] shadow-[0_10px_30px_rgba(13,35,79,0.06)] backdrop-blur-sm" style={{ color: dark }}>
      <span className="relative inline-flex h-2 w-2 rounded-full bg-[#E0A21A]" />
      <span className="inline-flex h-2 w-2 rotate-45 rounded-[3px] bg-[#244C9F]" />
      <span className="inline-flex h-2 w-2 rotate-45 rounded-[3px] bg-[#E0A21A]" />
      <span className="text-[#0D234F]">{children}</span>
    </div>
  );
}

export function PrimaryButton({
  href,
  children,
  onClick,
}: {
  href?: string;
  children: ReactNode;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
}) {
  return (
    <a
      href={href}
      onClick={onClick}
      className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0D234F] px-6 py-4 text-sm font-semibold text-white shadow-[0_12px_32px_rgba(13,35,79,0.20)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#E0A21A] hover:shadow-[0_0_24px_rgba(224,162,26,0.30)] hover:text-white"
    >
      {children}
    </a>
  );
}

export function SecondaryButton({
  href,
  children,
  onClick,
}: {
  href?: string;
  children: ReactNode;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
}) {
  return (
    <a
      href={href}
      onClick={onClick}
      className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#0D234F]/30 bg-white px-6 py-4 text-sm font-semibold text-[#0D234F] transition duration-300 hover:-translate-y-0.5 hover:border-[#E0A21A] hover:text-[#E0A21A]"
    >
      {children}
    </a>
  );
}

export function SurfaceCard({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div
      className={classNames(
        "rounded-2xl border border-[#D7DEE9] bg-white shadow-[0_12px_36px_rgba(15,23,42,0.05)]",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function DarkPanel({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div
      className={classNames(
        "rounded-2xl border border-white/10 bg-[linear-gradient(135deg,#0D234F_0%,#244C9F_52%,#111111_100%)] text-white shadow-[0_20px_50px_rgba(13,35,79,0.22)]",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function LogoWordmark({ light = false }: { light?: boolean }) {
  return (
    <div className="min-w-0">
      <div
        style={{ fontFamily: displayFont }}
        className={classNames("truncate text-[1.05rem] font-extrabold tracking-[-0.04em]", light ? "text-white" : "text-[#0D234F]")}
      >
        {BUSINESS_SHORT_NAME}
      </div>
      <div className={classNames("text-[10px] uppercase tracking-[0.22em]", light ? "text-white/70" : "text-[#6E7C96]")}>
        Oguntimehin Procurement & Energy Services
      </div>
    </div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  body,
  center = false,
}: {
  eyebrow: string;
  title: string;
  body?: string;
  center?: boolean;
}) {
  return (
    <div className={classNames("mb-12", center && "text-center")}>
      <SectionTag>{eyebrow}</SectionTag>
      <h2
        className="max-w-3xl text-[clamp(2rem,4vw,3.5rem)] font-extrabold leading-[1.02] tracking-[-0.04em]"
        style={{ color: dark, fontFamily: displayFont, marginInline: center ? "auto" : undefined }}
      >
        {title}
      </h2>
      {body ? (
        <p className="mt-4 max-w-2xl text-[17px] leading-relaxed" style={{ color: bodyText, marginInline: center ? "auto" : undefined }}>
          {body}
        </p>
      ) : null}
    </div>
  );
}

export function AccentCheck() {
  return (
    <span
      className="inline-flex h-7 w-7 items-center justify-center rounded-full border"
      style={{ borderColor: "rgba(13,35,79,0.12)", backgroundColor: "rgba(224,162,26,0.10)" }}
      aria-hidden="true"
    >
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path
          d="M2.75 7.35L5.55 10.15L11.25 4.45"
          stroke={dark}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

export { AccentCheck as GoldCheck };

export function WhatsAppBrandIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 175.216 175.552"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path
        fill="#25D366"
        d="M87.184 25.227c-33.733 0-61.166 27.423-61.178 61.13a60.98 60.98 0 0 0 9.349 32.535l1.455 2.313-6.179 22.558 23.146-6.069 2.235 1.324c9.387 5.571 20.15 8.517 31.126 8.523h.023c33.707 0 61.14-27.426 61.153-61.135a60.75 60.75 0 0 0-17.895-43.251 60.75 60.75 0 0 0-43.235-17.928Z"
      />
      <path
        fill="#FFF"
        fillRule="evenodd"
        d="M68.772 55.603c-1.378-3.061-2.828-3.123-4.137-3.176l-3.524-.043c-1.226 0-3.218.46-4.902 2.3s-6.435 6.287-6.435 15.332 6.588 17.785 7.506 19.013 12.718 20.381 31.405 27.75c15.529 6.124 18.689 4.906 22.061 4.6s10.877-4.447 12.408-8.74 1.532-7.971 1.073-8.74-1.685-1.226-3.525-2.146-10.877-5.367-12.562-5.981-2.91-.919-4.137.921-4.746 5.979-5.819 7.206-2.144 1.381-3.984.462-7.76-2.861-14.784-9.124c-5.465-4.873-9.154-10.891-10.228-12.73s-.114-2.835.808-3.751c.825-.824 1.838-2.147 2.759-3.22s1.224-1.84 1.836-3.065.307-2.301-.153-3.22-4.032-10.011-5.666-13.647"
      />
    </svg>
  );
}

function SocialIcon({ name }: { name: string }) {
  if (name === "WhatsApp") {
    return <WhatsAppBrandIcon className="h-5 w-5" />;
  }

  if (name === "Google Business") {
    return <MapPin className="h-4 w-4" />;
  }

  return <MapPin className="h-4 w-4" />;
}

export function SocialLinks({ compact = false }: { compact?: boolean }) {
  const enabledSocials = socialLinks.filter((item) => item.enabled);

  return (
    <div className="flex flex-wrap items-center gap-3">
      {enabledSocials.map((item) => (
        <a
          key={item.name}
          href={item.url}
          target="_blank"
          rel="noreferrer"
          className={classNames(
            "inline-flex items-center justify-center rounded-full border border-[#D7DEE9] bg-white text-[#0D234F] transition hover:border-[#E0A21A] hover:text-[#E0A21A]",
            compact ? "h-9 w-9" : "h-10 w-10",
          )}
          aria-label={item.name}
          title={item.name}
        >
          <SocialIcon name={item.name} />
        </a>
      ))}
    </div>
  );
}

export function NavAnchor({
  href,
  label,
  currentPath,
  onNavigate,
  onClick,
}: {
  href: string;
  label: string;
  currentPath: string;
  onNavigate: (path: string) => void;
  onClick?: () => void;
}) {
  const active = href === "/" ? currentPath === "/" : currentPath === href || currentPath.startsWith(`${href}/`);

  return (
    <a
      href={href}
      onClick={(event) => {
        if (href.startsWith("/#")) {
          onClick?.();
          return;
        }

        event.preventDefault();
        onNavigate(href);
        onClick?.();
      }}
      className={classNames(
        "text-sm font-medium transition",
        active ? "text-[#E0A21A]" : "text-white/85 hover:text-[#E0A21A]",
      )}
    >
      {label}
    </a>
  );
}

export function Header({
  currentPath,
  onNavigate,
}: {
  currentPath: string;
  onNavigate: (path: string) => void;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeMobileGroup, setActiveMobileGroup] = useState<string | null>(null);
  const [activeDesktopGroup, setActiveDesktopGroup] = useState<string | null>(null);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#091933]/90 backdrop-blur-xl">
      <Container className="flex h-20 items-center justify-between gap-6">
        <a
          href="/"
          onClick={(event) => {
            event.preventDefault();
            onNavigate("/");
            setMenuOpen(false);
          }}
          className="flex min-w-0 items-center gap-3"
        >
          <Logo />
          <LogoWordmark light />
        </a>

        <nav className="hidden items-center gap-7 lg:flex">
          <NavAnchor href="/" label="Home" currentPath={currentPath} onNavigate={onNavigate} />
          {menuGroups.map((group) => {
            const isGroupActive = group.links.some(
              (link) => link.href === currentPath || (link.href !== "/" && currentPath.startsWith(link.href))
            );
            const isDesktopOpen = activeDesktopGroup === group.label;

            return (
              <div
                key={group.label}
                className="relative group py-2"
                onMouseEnter={() => setActiveDesktopGroup(group.label)}
                onMouseLeave={() => setActiveDesktopGroup(null)}
              >
                <button
                  type="button"
                  onClick={() => setActiveDesktopGroup(isDesktopOpen ? null : group.label)}
                  className={classNames(
                    "flex items-center gap-1.5 text-sm font-semibold transition cursor-pointer outline-none bg-transparent border-none",
                    isGroupActive ? "text-[#E0A21A]" : "text-white/85 hover:text-[#E0A21A]"
                  )}
                >
                  {group.label}
                  <ChevronDown className={classNames("h-3.5 w-3.5 transition duration-200", isDesktopOpen ? "rotate-180" : "group-hover:rotate-180")} />
                </button>

                <div className={classNames(
                  "absolute top-full left-1/2 -translate-x-1/2 z-50 pt-2 w-56 transition-all duration-200 ease-out transform",
                  isDesktopOpen ? "opacity-100 visible scale-100" : "opacity-0 invisible scale-95"
                )}>
<div className="rounded-2xl border border-[#D7DEE9] bg-white p-2.5 shadow-[0_18px_40px_rgba(15,23,42,0.10)]">
                    {group.links.map((link) => {
                      const isLinkActive = currentPath === link.href;
                      return (
                        <a
                          key={link.href}
                          href={link.href}
                          onClick={(event) => {
                            event.preventDefault();
                            onNavigate(link.href);
                            setActiveDesktopGroup(null);
                          }}
                          className={classNames(
                            "block rounded-xl px-3.5 py-2.5 text-sm font-medium transition",
                            isLinkActive
                              ? "bg-[#0D234F] text-white"
                              : "text-[#0D234F] hover:bg-[#F4F6F8] hover:text-[#E0A21A]"
                          )}
                        >
                          {link.label}
                        </a>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <SocialLinks compact />
          <a href={`tel:${PHONE_DISPLAY.replace(/\s/g, "")}`} className="text-sm font-medium text-white/85 transition hover:text-[#E0A21A]">
            {PHONE_DISPLAY}
          </a>
          <PrimaryButton href={createWhatsAppUrl(WA_GREETING)}>
            WhatsApp <ArrowRight className="h-4 w-4" />
          </PrimaryButton>
        </div>

        <button
          type="button"
          aria-label="Toggle navigation"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white lg:hidden"
          onClick={() => setMenuOpen((value) => !value)}
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </Container>

{menuOpen ? (
        <div className="border-t border-white/10 bg-[#091933] lg:hidden">
          <Container className="flex flex-col gap-4 py-6">
            <NavAnchor
              href="/"
              label="Home"
              currentPath={currentPath}
              onNavigate={onNavigate}
              onClick={() => setMenuOpen(false)}
            />

{menuGroups.map((group) => {
  const isGroupOpen = activeMobileGroup === group.label;
  const isGroupActive = group.links.some(
    (link) => link.href === currentPath || (link.href !== "/" && currentPath.startsWith(link.href))
  );

  return (
    <div key={group.label} className="border-t border-white/10 pt-2">
      <button
        type="button"
        onClick={() => setActiveMobileGroup(isGroupOpen ? null : group.label)}
        className={classNames(
          "flex w-full items-center justify-between py-2 text-sm font-semibold transition cursor-pointer text-left bg-transparent border-none outline-none",
          isGroupActive ? "text-[#E0A21A]" : "text-white/85 hover:text-[#E0A21A]"
        )}
      >
        <span>{group.label}</span>
        <ChevronDown className={classNames("h-4 w-4 transition-transform duration-200", isGroupOpen && "rotate-180")} />
      </button>
      {isGroupOpen ? (
        <div className="mt-1 flex flex-col gap-2.5 border-l border-white/10 pl-4 py-1">
          {group.links.map((link) => {
            const isLinkActive = currentPath === link.href;
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={(event) => {
                  event.preventDefault();
                  onNavigate(link.href);
                  setMenuOpen(false);
                }}
className={classNames(
                              "block py-1 text-sm font-medium transition",
                              isLinkActive ? "text-[#E0A21A]" : "text-white/80 hover:text-[#E0A21A]"
                            )}
              >
                {link.label}
              </a>
            );
          })}
        </div>
      ) : null}
    </div>
  );
})}


            <div className="border-t border-white/10 pt-4">
              <SocialLinks />
            </div>
          </Container>
        </div>
      ) : null}
    </header>
  );
}

export function NewsletterSignup({
  inline = false,
  dark = false,
  title = "Insights",
  body = "Get occasional OPES updates on procurement strategy, energy systems, and practical project decisions.",
}: {
  inline?: boolean;
  dark?: boolean;
  title?: string;
  body?: string;
}) {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [feedback, setFeedback] = useState("");

  const submitNewsletter = async (payload: {
    email: string;
    consent: boolean;
    source: string;
    website: string;
  }) => {
    if (!analyticsConfig.newsletterAction) {
      return {
        message: "You’re subscribed — you’ll hear from us occasionally with procurement, construction, and energy tips.",
      };
    }

    const fallbackEndpoint = analyticsConfig.newsletterAction || "/newsletter.php";
    const endpoints = ["/api/newsletter", fallbackEndpoint].filter(
      (endpoint, index, values) => endpoint && values.indexOf(endpoint) === index,
    );

    let lastError = "We couldn’t complete your signup right now. Please try again.";

    for (const endpoint of endpoints) {
      try {
        const response = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        const result = (await response.json().catch(() => null)) as { message?: string; error?: string } | null;

        if (response.ok) {
          return result;
        }

        lastError = result?.error ?? lastError;

        if (response.status >= 500 || response.status === 404) {
          continue;
        }

        throw new Error(lastError);
      } catch (error) {
        lastError = error instanceof Error ? error.message : lastError;
      }
    }

    throw new Error(lastError);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (honeypot) {
      return;
    }

    const normalizedEmail = email.trim().toLowerCase();
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail);

    if (!isValidEmail) {
      setStatus("error");
      setFeedback("Enter a valid email address.");
      return;
    }

    if (!consent) {
      setStatus("error");
      setFeedback("Please confirm you want to receive the newsletter.");
      return;
    }

    setStatus("loading");
    setFeedback("");

    try {
      const payload = await submitNewsletter({
        email: normalizedEmail,
        consent: true,
        source: inline ? "inline-newsletter" : "site-newsletter",
        website: honeypot,
      });

      setStatus("success");
      setFeedback(
        payload?.message ??
          "You’re subscribed — you’ll hear from us occasionally with procurement, construction, and energy tips.",
      );
      setEmail("");
      setConsent(false);
    } catch (error) {
      setStatus("error");
      setFeedback(
        error instanceof Error
          ? error.message
          : "We couldn’t complete your signup right now. Please try again.",
      );
    }
  };

  const content = (
    <>
      <div className={classNames("text-xs uppercase tracking-[0.2em]", dark ? "text-white/70" : "text-[#6E7C96]")}>{title}</div>
      <p className={classNames("mt-3 max-w-xl text-sm leading-7", dark ? "text-white/78" : "text-[#51607B]")}>{body}</p>
      <form onSubmit={handleSubmit} className="mt-4 grid gap-3">
        <input
          type="text"
          name="website"
          autoComplete="off"
          tabIndex={-1}
          value={honeypot}
          onChange={(event) => setHoneypot(event.target.value)}
          className="hidden"
        />
        <div className="flex flex-col gap-3 sm:flex-row">
          <input
            type="email"
            name="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Enter your email address"
            className={classNames(
              "min-w-0 flex-1 rounded-full border px-4 py-3 text-sm outline-none transition focus:border-[#E0A21A]",
              dark
                ? "border-white/15 bg-white/5 text-white placeholder-white/40"
                : "border-[#D7DEE9] bg-white text-[#0D234F]"
            )}
            aria-label="Email address"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0D234F] px-5 py-3 text-sm font-semibold text-white transition duration-300 hover:bg-[#E0A21A] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {status === "loading" ? "Subscribing..." : "Subscribe"} <ArrowRight className="h-4 w-4" />
          </button>
        </div>
        <label className={classNames(
          "flex items-start gap-3 rounded-2xl border px-4 py-3 text-sm leading-6",
          dark
            ? "border-white/10 bg-white/5 text-white/80"
            : "border-[#D7DEE9] bg-[#F8FAFC] text-[#51607B]"
        )}>
          <input
            type="checkbox"
            checked={consent}
            onChange={(event) => setConsent(event.target.checked)}
            className={classNames(
              "mt-1 h-4 w-4 rounded accent-[#E0A21A]",
              dark ? "border-white/30 bg-white/5" : "border-[#D7DEE9] bg-white"
            )}
          />
          <span>Yes, I want occasional OPES emails about procurement, energy systems, and project updates.</span>
        </label>
        {feedback ? (
          <p
            className={classNames(
              "text-sm leading-6",
              status === "success" ? (dark ? "text-green-400" : "text-[#1F7A34]") : (dark ? "text-red-400" : "text-[#B42318]"),
            )}
            role={status === "error" ? "alert" : "status"}
          >
            {feedback}
          </p>
        ) : null}
      </form>
      <p className={classNames("mt-3 text-xs leading-6", dark ? "text-white/50" : "text-[#6E7C96]")}>{footerConsent}</p>
    </>
  );

  if (inline) {
    return <DarkPanel className="p-6">{content}</DarkPanel>;
  }

  return content;
}

export function QuoteForm({ compact = false }: { compact?: boolean }) {
  const [form, setForm] = useState<QuoteFormState>({
    name: "",
    phoneNumber: "",
    whatsappNumber: "",
    itemNeeded: "",
    quantity: "",
    serviceType: "Generator",
    additionalInformation: "",
    contactPreference: "WhatsApp",
    honeypot: "",
    productImageName: "",
  });

  const setField = (field: keyof QuoteFormState, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const formattedMessage = useMemo(
    () =>
      [
        "New Quote Request",
        `Name: ${form.name}`,
        `Phone Number: ${form.phoneNumber}`,
        `WhatsApp Number: ${form.whatsappNumber}`,
        `Item Needed: ${form.itemNeeded}`,
        `Quantity: ${form.quantity}`,
        `Service Type: ${form.serviceType}`,
        `Preferred Response: ${form.contactPreference}`,
        `Additional Information: ${form.additionalInformation || "Not provided"}`,
        `Product Image: ${form.productImageName || "No image attached"}`,
      ].join("\n"),
    [form],
  );

  const sendQuoteToCompany = async () => {
    try {
      await fetch("/api/quote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          phoneNumber: form.phoneNumber,
          whatsappNumber: form.whatsappNumber,
          itemNeeded: form.itemNeeded,
          quantity: form.quantity,
          serviceType: form.serviceType,
          contactPreference: form.contactPreference,
          additionalInformation: form.additionalInformation,
          productImageName: form.productImageName,
          requestedAt: new Date().toISOString(),
          honeypot: form.honeypot,
        }),
      });
    } catch (error) {
      console.error("Failed to send quote request to company email:", error);
    }
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (form.honeypot) {
      return;
    }

    const mailto = `mailto:${EMAIL}?subject=${encodeURIComponent("Oguntimehin Quote Request")}&body=${encodeURIComponent(formattedMessage)}`;

    if (form.contactPreference === "WhatsApp") {
      window.open(createWhatsAppUrl(formattedMessage), "_blank", "noopener,noreferrer");
      sendQuoteToCompany();
      return;
    }

    await sendQuoteToCompany();
    window.location.href = mailto;
  };

  return (
    <form onSubmit={handleSubmit} className={classNames("grid gap-4", compact && "gap-3")}>
      <input
        type="text"
        name="company"
        autoComplete="off"
        tabIndex={-1}
        value={form.honeypot}
        onChange={(event) => setField("honeypot", event.target.value)}
        className="hidden"
      />
      {[
        ["Name", "name", "e.g. Amina Bello"],
        ["Phone Number", "phoneNumber", "e.g. 0810 738 0672"],
        ["WhatsApp Number", "whatsappNumber", "e.g. 0810 738 0672"],
        ["Item Needed", "itemNeeded", "e.g. 12kVA inverter system, battery bank, or project supply scope"],
        ["Quantity", "quantity", "e.g. 1 system, 6 batteries, or full project lot"],
      ].map(([label, field, placeholder]) => (
        <label key={field} className="grid gap-2 text-sm font-medium text-[#0D234F]">
          {label}
          <input
            required={field !== "whatsappNumber"}
            value={form[field as keyof QuoteFormState]}
            onChange={(event) => setField(field as keyof QuoteFormState, event.target.value)}
            className="rounded-2xl border border-[#D7DEE9] bg-white px-4 py-3 text-sm text-[#0D234F] outline-none transition focus:border-[#E0A21A]"
            placeholder={placeholder}
          />
        </label>
      ))}
      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2 text-sm font-medium text-[#0D234F]">
          Service Type
          <select
            value={form.serviceType}
            onChange={(event) => setField("serviceType", event.target.value)}
            className="rounded-2xl border border-[#D7DEE9] bg-white px-4 py-3 text-sm text-[#0D234F] outline-none transition focus:border-[#E0A21A]"
          >
            <option>Generator</option>
            <option>Solar / Inverter</option>
            <option>General Procurement</option>
            <option>Engineering Support</option>
            <option>Not sure yet</option>
          </select>
        </label>
        <label className="grid gap-2 text-sm font-medium text-[#0D234F]">
          Response Preference
          <select
            value={form.contactPreference}
            onChange={(event) => setField("contactPreference", event.target.value as QuoteFormState["contactPreference"])}
            className="rounded-2xl border border-[#D7DEE9] bg-white px-4 py-3 text-sm text-[#0D234F] outline-none transition focus:border-[#E0A21A]"
          >
            <option>WhatsApp</option>
            <option>Email</option>
          </select>
        </label>
      </div>
      <label className="grid gap-2 text-sm font-medium text-[#0D234F]">
        Product Image (optional upload)
        <span className="flex cursor-pointer items-center gap-3 rounded-2xl border border-[#D7DEE9] bg-[#0D234F] px-4 py-3 text-sm text-white/90 transition hover:border-[#E0A21A]">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#0D234F]">
            <MessageCircle className="h-4 w-4" />
          </span>
          <span className="flex-1">{form.productImageName || "Choose an image to reference in your quote request"}</span>
          <span className="rounded-full border border-white/15 bg-white px-3 py-2 text-xs font-semibold text-[#0D234F]">Select file</span>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(event) => setField("productImageName", event.target.files?.[0]?.name ?? "")}
          />
        </span>
      </label>
      <label className="grid gap-2 text-sm font-medium text-[#0D234F]">
        Additional Information
        <textarea
          value={form.additionalInformation}
          onChange={(event) => setField("additionalInformation", event.target.value)}
          rows={4}
          className="rounded-2xl border border-[#D7DEE9] bg-white px-4 py-3 text-sm text-[#0D234F] outline-none transition focus:border-[#E0A21A]"
          placeholder="Add the load profile, preferred brand, project location, delivery requirement, or any commercial detail."
        />
      </label>
      <button
        type="submit"
        className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0D234F] px-6 py-4 text-sm font-semibold text-white transition duration-300 hover:bg-[#E0A21A]"
      >
        Submit Request <ArrowRight className="h-4 w-4" />
      </button>
    </form>
  );
}

export function WhyChooseGrid() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {whyChoose.map((item) => (
        <SurfaceCard
          key={item}
          className="flex items-center gap-3 p-5"
        >
          <AccentCheck />
          <span className="text-sm font-semibold text-[#0D234F]">{item}</span>
        </SurfaceCard>
      ))}
    </div>
  );
}

export function FaqList({
  items,
}: {
  items: Array<{
    question: string;
    answer: string;
  }>;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="grid gap-4">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <SurfaceCard
            key={item.question}
            className="overflow-hidden transition-all duration-300"
          >
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="flex w-full cursor-pointer items-center justify-between gap-4 p-5 text-left text-base font-semibold text-[#0D234F]"
            >
              <span>{item.question}</span>
              <ChevronDown className={`h-4 w-4 shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} style={{ color: accent }} />
            </button>
            <div
              className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}
            >
              <p className="px-5 pb-5 text-sm leading-7 text-[#51607B]">{item.answer}</p>
            </div>
          </SurfaceCard>
        );
      })}
    </div>
  );
}

export function TestimonialsPreview() {
  return (
    <section className="border-b border-[#E7ECF3] bg-white py-8 lg:py-12">
      <Container>
        <DarkPanel className="flex flex-col items-start justify-between gap-6 p-6 sm:flex-row sm:items-center lg:p-8">
          <div>
            <div className="text-xs uppercase tracking-[0.2em]" style={{ color: "#F5BE2E" }}>
              Brand confidence
            </div>
            <div className="mt-2 flex items-center gap-3">
              <span style={{ fontFamily: displayFont }} className="text-4xl font-bold tracking-[-0.04em] text-white">
                Premium
              </span>
              <span className="flex gap-1">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star key={index} className="h-4 w-4 fill-[#F5BE2E] text-[#F5BE2E]" />
                ))}
              </span>
            </div>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-white/78">
              OPES is positioned as a premium procurement and energy partner: trusted, documented, and execution-focused from inquiry to delivery.
            </p>
          </div>
          <PrimaryButton href={GOOGLE_MAPS_URL}>
            Leave a review <ArrowRight className="h-4 w-4" />
          </PrimaryButton>
        </DarkPanel>
      </Container>
    </section>
  );
}

export function ContactSection({ compact = false }: { compact?: boolean }) {
  return (
    <section id="contact" className="border-b border-[#D7DEE9] bg-[#F4F6F8] py-12 lg:py-16">
      <Container className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
        <div>
          <div className="mb-6">
            <h2 className="text-[clamp(2.3rem,5vw,3.5rem)] font-extrabold tracking-[-0.04em] text-[#0D234F]" style={{ fontFamily: displayFont }}>
              Start the conversation with <span style={{ color: accent }}>OPES.</span>
            </h2>
            <p className="mt-4 max-w-2xl text-[17px] leading-relaxed text-[#51607B]">
              Share your equipment requirement, project scope, or energy challenge. We will review it, advise where needed, and respond with a professional next step.
            </p>
          </div>
          <div className="grid gap-4">
            <SurfaceCard className="p-5">
              <div className="flex items-start gap-3">
                <Phone className="mt-1 h-4 w-4" style={{ color: accent }} />
                <div>
                  <div className="text-sm font-semibold text-[#0D234F]">{PHONE_DISPLAY}</div>
                  <div className="text-sm leading-6 text-[#51607B]">Call or continue on WhatsApp for immediate support.</div>
                </div>
              </div>
            </SurfaceCard>
            <SurfaceCard className="p-5">
              <div className="flex items-start gap-3">
                <Mail className="mt-1 h-4 w-4" style={{ color: accent }} />
                <div>
                  <div className="text-sm font-semibold text-[#0D234F]">{EMAIL}</div>
                  <div className="text-sm leading-6 text-[#51607B]">Use email if you want a documented commercial thread.</div>
                </div>
              </div>
            </SurfaceCard>
            <SurfaceCard className="p-5">
              <div className="flex items-start gap-3">
                <MapPin className="mt-1 h-4 w-4" style={{ color: accent }} />
                <div>
                  <div className="text-sm font-semibold text-[#0D234F]">
                    {ADDRESS_LINE_1}, {ADDRESS_LINE_2}
                  </div>
                  <div className="text-sm leading-6 text-[#51607B]">
                    Office hours: {HOURS_DISPLAY}
                    {HOURS_NEEDS_VERIFICATION ? " - please confirm before visiting." : ""}
                  </div>
                </div>
              </div>
            </SurfaceCard>
          </div>
        </div>

        <SurfaceCard className="p-6">
          <div className="mb-5 text-xl font-bold tracking-[-0.02em] text-[#0D234F]" style={{ fontFamily: displayFont }}>
            Request a Quote
          </div>
          <QuoteForm compact={compact} />
        </SurfaceCard>
      </Container>
    </section>
  );
}

export function CtaBanner() {
  return (
    <section className="py-10 lg:py-14" style={{ backgroundColor: "rgba(224,162,26,0.08)" }}>
      <Container>
        <SurfaceCard className="flex flex-col gap-6 p-8 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#E6C875] bg-[#0D234F] px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/90">
              <CalendarDays className="h-4 w-4" style={{ color: accent }} />
              Ready to engage
            </div>
            <h2 style={{ fontFamily: displayFont }} className="text-[clamp(2rem,4vw,3.2rem)] font-extrabold leading-[1.02] tracking-[-0.04em] text-[#0D234F]">
              Need a procurement or energy partner you can trust?
            </h2>
            <p className="mt-3 max-w-2xl text-base leading-7 text-[#51607B]">
              OPES combines corporate presentation, practical technical thinking, and clear execution for clients who want quality and certainty.
            </p>
          </div>
          <PrimaryButton
            href="/#contact"
          >
            Request a Quote <ArrowRight className="h-4 w-4" />
          </PrimaryButton>
        </SurfaceCard>
      </Container>
    </section>
  );
}

export function Footer({ onNavigate }: { onNavigate: (path: string) => void }) {
  return (
    <footer className="border-t border-white/10 bg-[#091933] py-10 lg:py-14">
      <Container className="grid gap-10 lg:grid-cols-[1fr_0.8fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <Logo />
            <LogoWordmark light />
          </div>
          <p className="mt-4 max-w-md text-sm leading-7 text-white/90">
            OPES delivers premium procurement, engineering support, and energy solutions with the clarity and professionalism expected from a modern corporate brand.
          </p>
          <div className="mt-6">
            <SocialLinks />
          </div>
        </div>

        <div>
          <div className="text-xs uppercase tracking-[0.18em] text-white">Pages</div>
          <div className="mt-4 grid gap-3">
            {[...pageLinks, { label: "Privacy Policy", href: "/privacy-policy" }, { label: "Cookie Policy", href: "/cookie-policy" }, { label: "Company Policy", href: "/company-policy" }].map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(event) => {
                  event.preventDefault();
                  onNavigate(item.href);
                }}
                className="text-sm font-medium text-white transition hover:text-[#E0A21A]"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>

        <div className="grid gap-8">
          <div>
            <div className="text-xs uppercase tracking-[0.18em] text-white/70">Contact</div>
            <div className="mt-4 grid gap-4">
              <a href={`tel:${PHONE_DISPLAY.replace(/\s/g, "")}`} className="flex items-start gap-3 text-sm text-white">
                <Phone className="mt-1 h-4 w-4" style={{ color: accent }} />
                <span className="text-white">{PHONE_DISPLAY}</span>
              </a>
              <a href={`mailto:${EMAIL}`} className="flex items-start gap-3 text-sm text-white">
                <Mail className="mt-1 h-4 w-4" style={{ color: accent }} />
                <span className="text-white">{EMAIL}</span>
              </a>
              <a href={GOOGLE_MAPS_URL} target="_blank" rel="noreferrer" className="flex items-start gap-3 text-sm text-white">
                <MapPin className="mt-1 h-4 w-4" style={{ color: accent }} />
                <span className="text-white">
                  {ADDRESS_LINE_1}, {ADDRESS_LINE_2}
                </span>
              </a>
              <div className="flex items-start gap-3 text-sm text-white">
                <CircleHelp className="mt-1 h-4 w-4" style={{ color: accent }} />
                <span className="text-white">Office hours: {HOURS_DISPLAY}{HOURS_NEEDS_VERIFICATION ? " (confirm before visiting)" : ""}</span>
              </div>
            </div>
          </div>
          <NewsletterSignup dark title="Newsletter signup" body="Subscribe for OPES updates, procurement insight, and practical energy guidance." />
        </div>
      </Container>
      <Container className="mt-10 border-t border-white/10 pt-6 text-xs text-white/70">
        © {new Date().getFullYear()} {BUSINESS_NAME}. All rights reserved.
      </Container>
    </footer>
  );
}

export function AnnouncementBar({ onNavigate }: { onNavigate: (path: string) => void }) {
  const message = "Premium procurement and energy support from OPES. Start your quote or project discussion today.";

  return (
    <a
      href="/contact"
      onClick={(event) => {
        event.preventDefault();
        onNavigate("/contact");
      }}
      className="relative w-full overflow-hidden border-b border-white/10 bg-[linear-gradient(90deg,#0B1E43_0%,#173A78_50%,#0B1E43_100%)] py-2"
      role="region"
      aria-label="Announcement"
    >
      <span
        className="inline-block whitespace-nowrap"
        style={{
          fontFamily: displayFont,
          color: "#F5BE2E",
          fontWeight: "500",
          fontSize: "0.875rem",
          letterSpacing: "0.02em",
          animation: "marquee 25s linear infinite",
        }}
      >
        {message}
      </span>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
      `}</style>
    </a>
  );
}











