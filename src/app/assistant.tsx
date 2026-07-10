import { useEffect, useMemo, useState } from "react";
import { ArrowUp, Bot, MessageCircle, Send, X } from "lucide-react";
import { faqItems, services } from "./content";
import { WhatsAppBrandIcon, createWhatsAppUrl, gold } from "./layout";

type ChatMessage = {
  role: "assistant" | "user";
  text: string;
  pending?: boolean;
};

const greeting =
  "Hello. I can answer questions about generators, solar and inverter systems, supplier checks, sizing, delivery, and the order process. Ask me anything and I’ll think it through before replying.";

const fallback =
  "I can answer from the information published on this site. For exact quotes, account-specific issues, complaints, or anything outside the published information, please continue on WhatsApp.";

const handoffTerms = [
  "quote",
  "price for",
  "my order",
  "complaint",
  "issue",
  "problem",
  "refund status",
  "track my order",
  "tracking number",
  "account",
  "invoice",
  "specific cost",
];

const knowledge = [
  {
    patterns: ["generator", "diesel", "petrol", "fuel"],
    answer:
      "We source diesel and petrol generators sized for homes, offices, schools, and small businesses across Lagos. Tell us what you need to power and we’ll recommend a capacity.",
  },
  {
    patterns: ["solar", "panel", "inverter", "battery", "batteries"],
    answer:
      "We source solar panels, charge controllers, inverters, and battery banks, and match them to your load — from a single room to a full building.",
  },
  {
    patterns: ["size", "capacity", "kva", "how much can", "load"],
    answer:
      "Sizing starts with the load: what appliances and equipment you need to run, and for how long. Share that list and we’ll recommend a generator or solar/inverter setup that fits your budget.",
  },
  {
    patterns: ["install", "installation", "technician", "fit"],
    answer:
      "We supply the equipment and can coordinate installation through trusted technicians. Installation scope and cost are confirmed per job — ask when you request a quote.",
  },
  {
    patterns: ["verify", "supplier", "genuine", "real", "scam"],
    answer:
      "We verify suppliers before payment and, where possible, inspect the item before it ships, so you know the specification before you pay.",
  },
  {
    patterns: ["process", "how it works", "steps", "order process"],
    answer:
      "Tell us what you need, we check the supplier and send a written quote, you confirm and pay, we inspect where possible, then we deliver to your Lagos address or pickup point.",
  },
  {
    patterns: ["delivery", "deliver", "ship", "logistics", "transport"],
    answer:
      "We coordinate transport from supplier to your Lagos address or an agreed pickup point, and keep you updated through the process. Delivery outside Lagos can be arranged — confirm when you request a quote.",
  },
  {
    patterns: ["document", "paperwork", "clearance", "customs"],
    answer:
      "We help with the paperwork and clearance steps needed to get equipment into your hands without avoidable delay. We confirm what applies when we quote.",
  },
  {
    patterns: ["quote", "cost", "price", "fee", "pricing", "how much", "amount", "pay"],
    answer:
      "A quote depends on the specific item, supplier pricing, and whether inspection or clearance is involved. Tell us what you need and we’ll send a written total before any order is placed.",
  },
  {
    patterns: ["timeline", "how long", "lead time", "duration"],
    answer:
      "Timing depends on the item, supplier lead time, and whether inspection or clearance is involved. We give you a realistic timeline when we quote.",
  },
  {
    patterns: ["refund", "return", "warranty"],
    answer:
      "If an item does not match the agreed specification due to our error, we work it out with you directly. Terms are confirmed before payment.",
  },
  {
    patterns: ["who are you", "what do you do", "what is oguntimehin", "services offered", "how can you help"],
    answer:
      "I’m the Oguntimehin Assistant. I answer questions about generator and solar sourcing, supplier checks, sizing, delivery, and the order process using the published site information.",
  },
];

function matchFaq(query: string) {
  return faqItems.find((item) => {
    const normalizedQuestion = item.question.toLowerCase();
    return (
      query.includes(normalizedQuestion) ||
      normalizedQuestion
        .split(" ")
        .some((word) => word.length > 4 && query.includes(word))
    );
  });
}

function matchService(query: string) {
  return services.find(
    (service) =>
      query.includes(service.title.toLowerCase()) ||
      service.title
        .toLowerCase()
        .split(" ")
        .some((word) => word.length > 4 && query.includes(word)),
  );
}

function findReply(input: string) {
  const query = input.toLowerCase().trim();

  if (handoffTerms.some((term) => query.includes(term))) {
    return fallback;
  }

  const serviceMatch = matchService(query);
  if (serviceMatch) {
    return `${serviceMatch.title}: ${serviceMatch.description}${serviceMatch.note ? ` ${serviceMatch.note}` : ""}`;
  }

  const faqMatch = matchFaq(query);
  if (faqMatch) {
    return faqMatch.answer;
  }

  const bestKnowledge = knowledge
    .map((item) => ({
      score: item.patterns.reduce((count, pattern) => count + (query.includes(pattern) ? 1 : 0), 0),
      answer: item.answer,
    }))
    .sort((a, b) => b.score - a.score)[0];

  return bestKnowledge && bestKnowledge.score > 0 ? bestKnowledge.answer : fallback;
}

const quickQuestions = [
  "What generators do you source?",
  "Can you help me size a solar system?",
  "How does delivery work in Lagos?",
];

export function FloatingWhatsAppButton() {
  return (
    <a
      href={createWhatsAppUrl("Hello Oguntimehin, I would like to continue this conversation on WhatsApp.")}
      target="_blank"
      rel="noreferrer"
      className="group fixed bottom-5 right-5 z-50 inline-flex h-20 w-20 items-center justify-center rounded-full bg-white p-1 shadow-[0_22px_50px_rgba(37,211,102,0.35)] transition hover:scale-[1.04]"
      aria-label="Open WhatsApp"
    >
      <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-20 blur-xl transition group-hover:opacity-30" aria-hidden="true" />
      <span className="absolute inset-[-8px] animate-pulse rounded-full border border-[#25D366]/35" aria-hidden="true" />
      <WhatsAppBrandIcon className="relative h-16 w-16" />
    </a>
  );
}

export function BackToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handler = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", handler, { passive: true });
    handler();
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`fixed bottom-28 left-6 z-50 flex h-12 w-12 items-center justify-center rounded-full text-white shadow-[0_8px_24px_rgba(242,166,12,0.3)] transition-all duration-300 ${
        visible ? "scale-100 opacity-100" : "scale-75 opacity-0 pointer-events-none"
      }`}
      style={{ backgroundColor: gold }}
    >
      <ArrowUp className="h-5 w-5" />
    </button>
  );
}

export function AssistantWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([{ role: "assistant", text: greeting }]);

  useEffect(() => {
    const saved = window.sessionStorage.getItem("oguntimehin-assistant-messages");
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as ChatMessage[];
        if (Array.isArray(parsed) && parsed.length > 0) {
          setMessages(parsed);
        }
      } catch {
        /* ignore invalid saved chat */
      }
    }
  }, []);

  useEffect(() => {
    window.sessionStorage.setItem("oguntimehin-assistant-messages", JSON.stringify(messages));
  }, [messages]);

  const previewText = useMemo(() => messages[messages.length - 1]?.text ?? greeting, [messages]);

  const pushReply = (question: string) => {
    const trimmed = question.trim();
    if (!trimmed) return;

    setMessages((current) => {
      const lastUser = [...current].reverse().find((message) => message.role === "user")?.text;
      if (lastUser?.toLowerCase() === trimmed.toLowerCase()) {
        return current;
      }

      return [
        ...current,
        { role: "user", text: trimmed },
        { role: "assistant", text: "Thinking...", pending: true },
      ];
    });

    const reply = findReply(trimmed);
    const delay = Math.min(1400, 600 + trimmed.length * 25);
    window.setTimeout(() => {
      setMessages((current) => {
        const updated = [...current];
        const pendingIndex = updated.map((message) => message.pending).lastIndexOf(true);
        if (pendingIndex >= 0) {
          updated[pendingIndex] = { role: "assistant", text: reply };
        } else {
          updated.push({ role: "assistant", text: reply });
        }
        return updated;
      });
    }, delay);
  };

  const handleSend = () => {
    pushReply(input);
    setInput("");
  };

  if (!open) {
    return (
      <div className="pointer-events-auto fixed bottom-24 right-6 z-50">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-3 rounded-full border border-[#E3E7E4] bg-white px-4 py-3 text-sm font-semibold text-[#14181D] shadow-[0_18px_40px_rgba(20,24,29,0.12)] transition hover:border-[#F2A60C]"
        >
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#F5F6F4]" style={{ color: gold }}>
            <Bot className="h-5 w-5" />
          </span>
          Ask Oguntimehin
        </button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-40">
      <div className="absolute inset-0 bg-black/20 md:hidden" onClick={() => setOpen(false)} />
      <div
        onClick={(event) => event.stopPropagation()}
        className="pointer-events-auto fixed left-4 right-4 bottom-4 top-6 z-50 mx-auto w-full max-w-sm overflow-hidden rounded-[28px] border border-[#E3E7E4] bg-white shadow-[0_22px_54px_rgba(20,24,29,0.14)] md:left-auto md:right-6 md:bottom-6 md:top-auto md:w-[22rem] md:max-h-[calc(100vh-6rem)]"
      >
        <div className="flex items-center justify-between border-b border-[#ECEEEC] px-5 py-4">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#F5F6F4]" style={{ color: gold }}>
              <Bot className="h-5 w-5" />
            </span>
            <div>
              <div className="text-sm font-semibold text-[#14181D]">Oguntimehin Assistant</div>
              <div className="text-xs text-[#6B7280]">Published site knowledge only</div>
            </div>
          </div>
          <button type="button" onClick={() => setOpen(false)} className="rounded-full p-2 text-[#3C4248]">
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="max-h-[calc(100vh-22rem)] md:max-h-[24rem] space-y-3 overflow-y-auto px-5 py-4">
          {messages.map((message, index) => (
            <div
              key={`${message.role}-${index}`}
              className={
                message.role === "assistant"
                  ? "mr-6 rounded-2xl bg-[#F5F6F4] px-4 py-3 text-sm leading-6 text-[#3C4248]"
                  : "ml-6 rounded-2xl border border-[#E3E7E4] bg-white px-4 py-3 text-sm leading-6 text-[#14181D]"
              }
            >
              {message.pending ? (
                <div className="flex items-center gap-2 text-[#3C4248]">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#F2A60C] animate-pulse" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#F2A60C] animate-pulse" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#F2A60C] animate-pulse" />
                  Typing...
                </div>
              ) : (
                message.text
              )}
            </div>
          ))}
        </div>
        <div className="border-t border-[#ECEEEC] p-4">
          <div className="mb-3 flex flex-wrap gap-2">
            {quickQuestions.map((question) => (
              <button
                key={question}
                type="button"
                onClick={() => pushReply(question)}
                className="rounded-full border border-[#E3E7E4] bg-[#F5F6F4] px-3 py-2 text-xs font-semibold text-[#3C4248] transition hover:border-[#F2A60C] hover:text-[#14181D]"
              >
                {question}
              </button>
            ))}
          </div>
          <div className="flex gap-3">
            <input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  handleSend();
                }
              }}
              placeholder="Ask about generators, solar, or delivery"
              className="flex-1 rounded-full border border-[#D6DAD7] bg-[#F5F6F4] px-4 py-3 text-sm text-[#14181D] outline-none"
            />
            <button type="button" onClick={handleSend} className="inline-flex h-12 w-12 items-center justify-center rounded-full text-white" style={{ backgroundColor: gold }}>
              <Send className="h-4 w-4" />
            </button>
          </div>
          <a
            href={createWhatsAppUrl("Hello Oguntimehin, I need a live quote or support beyond the website FAQs.")}
            target="_blank"
            rel="noreferrer"
            className="mt-3 inline-flex items-center gap-2 text-xs font-semibold text-[#6B7280]"
          >
            Continue on WhatsApp if you need a live quote
          </a>
        </div>
      </div>
    </div>
  );
}
