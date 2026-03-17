import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Toaster } from "@/components/ui/sonner";
import { useSubmitLead } from "@/hooks/useQueries";
import {
  AlertTriangle,
  Award,
  Check,
  ChevronRight,
  Eye,
  Facebook,
  Instagram,
  Linkedin,
  Loader2,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  Star,
  TrendingUp,
  Users,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

// ── Scroll-fade hook ──────────────────────────────────────────────────────────
function useFadeInOnScroll() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          obs.unobserve(el);
        }
      },
      { threshold: 0.1 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

// ── FadeSection wrapper ───────────────────────────────────────────────────────
function FadeSection({
  children,
  className = "",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  const ref = useFadeInOnScroll();
  return (
    <div ref={ref} id={id} className={`section-fade-in ${className}`}>
      {children}
    </div>
  );
}

// ── Stars ─────────────────────────────────────────────────────────────────────
function Stars({ count = 5 }: { count?: number }) {
  const starKeys = ["s1", "s2", "s3", "s4", "s5"].slice(0, count);
  return (
    <div className="flex gap-0.5">
      {starKeys.map((k) => (
        <Star key={k} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
      ))}
    </div>
  );
}

// ── NAV ───────────────────────────────────────────────────────────────────────
const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Who We Help", href: "#who-we-help" },
  { label: "Results", href: "#results" },
  { label: "Contact", href: "#audit" },
];

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm"
          : "bg-white/80 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <button
          type="button"
          onClick={() => handleNavClick("#home")}
          className="flex items-center bg-transparent border-0 p-0"
        >
          <img
            src="/assets/generated/growmymaps-logo-transparent.dim_400x100.png"
            alt="GrowMyMaps"
            className="h-10 w-auto"
          />
        </button>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <button
              type="button"
              key={link.label}
              data-ocid={`nav.${link.label.toLowerCase().replace(/ /g, "-")}.link`}
              onClick={() => handleNavClick(link.href)}
              className="text-sm font-medium text-foreground/70 hover:text-brand-blue transition-colors"
            >
              {link.label}
            </button>
          ))}
          <Button
            data-ocid="nav.get-free-audit.button"
            onClick={() => handleNavClick("#audit")}
            className="bg-brand-orange hover:bg-brand-orange-dark text-white font-semibold shadow-orange"
          >
            Get Free Audit
          </Button>
        </nav>

        {/* Mobile hamburger */}
        <button
          type="button"
          data-ocid="nav.mobile-menu.toggle"
          className="md:hidden p-2 rounded-md text-foreground"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-border overflow-hidden"
          >
            <div className="flex flex-col px-4 py-4 gap-3">
              {NAV_LINKS.map((link) => (
                <button
                  type="button"
                  key={link.label}
                  data-ocid={`nav.mobile.${link.label.toLowerCase().replace(/ /g, "-")}.link`}
                  onClick={() => handleNavClick(link.href)}
                  className="text-left text-base font-medium py-2 text-foreground/70 hover:text-brand-blue transition-colors"
                >
                  {link.label}
                </button>
              ))}
              <Button
                data-ocid="nav.mobile.get-free-audit.button"
                onClick={() => handleNavClick("#audit")}
                className="bg-brand-orange hover:bg-brand-orange-dark text-white font-semibold w-full"
              >
                Get Free Audit
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

// ── HERO ──────────────────────────────────────────────────────────────────────
function HeroSection() {
  const handleScroll = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="hero-bg min-h-screen flex items-center pt-16 relative overflow-hidden"
    >
      {/* Decorative map dots */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[
          ["10%", "20%"],
          ["80%", "15%"],
          ["65%", "70%"],
          ["20%", "75%"],
          ["50%", "30%"],
        ].map(([top, left], i) => (
          <div
            key={`dot-${top}-${left}`}
            className="map-dot"
            style={{ top, left, animationDelay: `${i * 0.6}s` }}
          />
        ))}
        {/* Large subtle circle */}
        <div className="absolute -right-32 -top-32 w-[600px] h-[600px] rounded-full bg-brand-blue/5 border border-brand-blue/10" />
        <div className="absolute -left-20 bottom-20 w-[400px] h-[400px] rounded-full bg-brand-green/5 border border-brand-green/10" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 relative z-10">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 bg-brand-blue/10 text-brand-blue px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
              <MapPin className="w-4 h-4" />
              Google Maps Optimization Experts
            </div>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-foreground leading-tight mb-6">
              Get More Customers from{" "}
              <span className="text-brand-blue relative">
                Google Maps
                <svg
                  aria-hidden="true"
                  className="absolute -bottom-2 left-0 w-full"
                  height="6"
                  viewBox="0 0 300 6"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0 5 Q75 1 150 5 Q225 9 300 5"
                    stroke="oklch(0.72 0.18 50)"
                    strokeWidth="2.5"
                    fill="none"
                  />
                </svg>
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-foreground/65 mb-8 leading-relaxed max-w-2xl">
              We help local businesses rank higher, get more calls, and grow
              using Google Business Profile optimization.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-10">
              <Button
                data-ocid="hero.get-free-audit.primary_button"
                size="lg"
                onClick={() => handleScroll("#audit")}
                className="bg-brand-orange hover:bg-brand-orange-dark text-white font-bold text-base px-8 shadow-orange"
              >
                Get Free Audit
                <ChevronRight className="w-5 h-5 ml-1" />
              </Button>
              <Button
                data-ocid="hero.book-a-call.secondary_button"
                size="lg"
                variant="outline"
                onClick={() => handleScroll("#audit")}
                className="border-2 border-brand-blue text-brand-blue hover:bg-brand-blue/10 font-bold text-base px-8"
              >
                Book a Call
              </Button>
            </div>

            {/* Trust bar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 p-4 bg-white/70 backdrop-blur-sm rounded-2xl border border-border/50 w-fit">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-brand-blue/10 flex items-center justify-center">
                  <Users className="w-4 h-4 text-brand-blue" />
                </div>
                <span className="text-sm font-semibold text-foreground">
                  Trusted by Local Businesses
                </span>
              </div>
              <div className="w-px h-8 bg-border hidden sm:block" />
              <Stars />
              <div className="w-px h-8 bg-border hidden sm:block" />
              <span className="text-sm font-bold text-brand-green">
                100+ Happy Clients
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ── PROBLEM ───────────────────────────────────────────────────────────────────
const PROBLEMS = [
  "Not ranking in top results",
  "Low or no reviews",
  "Poor profile optimization",
  "No regular posts",
  "Weak photos",
];

function ProblemSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <FadeSection className="max-w-2xl mx-auto text-center mb-12">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Why Most Businesses Fail on Google Maps
          </h2>
          <p className="text-foreground/60">
            The common mistakes costing you customers every single day.
          </p>
        </FadeSection>

        <FadeSection className="max-w-2xl mx-auto">
          <div className="space-y-4 mb-8">
            {PROBLEMS.map((p, i) => (
              <motion.div
                key={p}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-4 p-4 bg-red-50 border border-red-100 rounded-xl"
              >
                <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="w-4 h-4 text-red-500" />
                </div>
                <span className="font-medium text-foreground">{p}</span>
              </motion.div>
            ))}
          </div>

          {/* Emotional callout */}
          <div className="relative p-6 bg-gradient-to-r from-red-600 to-red-500 rounded-2xl text-white text-center overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute -top-4 -right-4 w-32 h-32 rounded-full bg-white" />
              <div className="absolute -bottom-4 -left-4 w-24 h-24 rounded-full bg-white" />
            </div>
            <p className="relative font-display text-xl sm:text-2xl font-bold">
              ⚠️ You are losing customers every day without knowing it.
            </p>
          </div>
        </FadeSection>
      </div>
    </section>
  );
}

// ── SOLUTION ──────────────────────────────────────────────────────────────────
const SOLUTIONS = [
  {
    icon: "🎯",
    title: "Google Business Profile Optimization",
    desc: "We optimize every element of your GBP to maximize visibility and attract local customers.",
  },
  {
    icon: "📍",
    title: "Local SEO Improvements",
    desc: "Targeted strategies to boost your local search ranking and get found by nearby customers.",
  },
  {
    icon: "⭐",
    title: "Review Management",
    desc: "Build a strong review profile that builds trust and converts searchers into customers.",
  },
  {
    icon: "🛡️",
    title: "Profile Management",
    desc: "Ongoing management to keep your profile fresh, accurate, and performing at its best.",
  },
];

const BENEFITS = [
  { icon: <Eye className="w-5 h-5" />, label: "More Visibility" },
  { icon: <Phone className="w-5 h-5" />, label: "More Calls" },
  { icon: <Users className="w-5 h-5" />, label: "More Walk-in Customers" },
];

function SolutionSection() {
  return (
    <section className="py-20 bg-muted/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <FadeSection className="max-w-2xl mx-auto text-center mb-12">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
            How GrowMyMaps Helps You Grow
          </h2>
          <p className="text-foreground/60">
            Simple, proven strategies that deliver real results for local
            businesses.
          </p>
        </FadeSection>

        <FadeSection>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {SOLUTIONS.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl p-6 border border-border card-hover"
              >
                <div className="w-12 h-12 rounded-xl bg-brand-green/10 flex items-center justify-center text-2xl mb-4">
                  {s.icon}
                </div>
                <div className="flex items-start gap-2 mb-2">
                  <Check className="w-5 h-5 text-brand-green mt-0.5 flex-shrink-0" />
                  <h3 className="font-display font-bold text-foreground">
                    {s.title}
                  </h3>
                </div>
                <p className="text-sm text-foreground/60 leading-relaxed">
                  {s.desc}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Benefits row */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-12">
            {BENEFITS.map((b) => (
              <div key={b.label} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-brand-blue/10 flex items-center justify-center text-brand-blue">
                  {b.icon}
                </div>
                <span className="font-bold text-foreground">{b.label}</span>
              </div>
            ))}
          </div>
        </FadeSection>
      </div>
    </section>
  );
}

// ── SERVICES ──────────────────────────────────────────────────────────────────
const SERVICES = [
  {
    icon: "🗺️",
    title: "Google Business Profile Setup",
    desc: "We create and configure your Google Business Profile from scratch, ensuring every detail is optimized for maximum visibility from day one.",
  },
  {
    icon: "⚡",
    title: "Profile Optimization",
    desc: "A deep audit and optimization of your existing profile — categories, descriptions, photos, and attributes tuned for top rankings.",
  },
  {
    icon: "📅",
    title: "Monthly Management",
    desc: "Ongoing profile management with regular posts, Q&A updates, and performance reporting to keep your ranking strong every month.",
  },
  {
    icon: "💬",
    title: "Review Growth Strategy",
    desc: "Systematic strategies to grow your reviews, respond professionally, and build the social proof that converts new customers.",
  },
  {
    icon: "📈",
    title: "Local Ranking Improvement",
    desc: "Targeted local SEO tactics including citation building, keyword optimization, and competitor analysis to push you into the top 3.",
  },
];

function ServicesSection() {
  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <FadeSection className="max-w-2xl mx-auto text-center mb-12">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Our Services
          </h2>
          <p className="text-foreground/60">
            Everything your business needs to dominate local search.
          </p>
        </FadeSection>

        <FadeSection>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((s, i) => (
              <motion.div
                key={s.title}
                data-ocid={`services.item.${i + 1}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="group bg-white rounded-2xl p-6 border border-border hover:border-brand-blue/30 shadow-xs card-hover"
              >
                <div className="w-14 h-14 rounded-2xl bg-brand-blue/8 flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform">
                  {s.icon}
                </div>
                <h3 className="font-display font-bold text-lg text-foreground mb-3">
                  {s.title}
                </h3>
                <p className="text-sm text-foreground/60 leading-relaxed mb-4">
                  {s.desc}
                </p>
                <button
                  type="button"
                  data-ocid={`services.learn-more.button.${i + 1}`}
                  onClick={() => {
                    const el = document.querySelector("#audit");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="inline-flex items-center gap-1 text-sm font-semibold text-brand-blue hover:gap-2 transition-all"
                >
                  Learn More <ChevronRight className="w-4 h-4" />
                </button>
              </motion.div>
            ))}
          </div>
        </FadeSection>
      </div>
    </section>
  );
}

// ── WHO WE HELP ───────────────────────────────────────────────────────────────
const WHO = [
  { icon: "🍽️", label: "Restaurants" },
  { icon: "☕", label: "Cafes" },
  { icon: "💇", label: "Salons" },
  { icon: "🏋️", label: "Gyms" },
  { icon: "🏠", label: "Real Estate Agents" },
  { icon: "🏥", label: "Clinics" },
  { icon: "📚", label: "Coaching Centers" },
];

function WhoWeHelpSection() {
  return (
    <section id="who-we-help" className="py-20 bg-muted/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <FadeSection className="max-w-2xl mx-auto text-center mb-12">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Who We Help
          </h2>
          <p className="text-foreground/60">
            We specialize in helping local businesses of all types grow on
            Google Maps.
          </p>
        </FadeSection>

        <FadeSection>
          <div className="flex flex-wrap justify-center gap-4">
            {WHO.map((w, i) => (
              <motion.div
                key={w.label}
                data-ocid={`who.item.${i + 1}`}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="flex flex-col items-center gap-3 p-5 bg-white rounded-2xl border border-border card-hover w-32 sm:w-36 cursor-default"
              >
                <span className="text-4xl">{w.icon}</span>
                <span className="text-sm font-semibold text-foreground text-center leading-tight">
                  {w.label}
                </span>
              </motion.div>
            ))}
          </div>
        </FadeSection>
      </div>
    </section>
  );
}

// ── RESULTS ───────────────────────────────────────────────────────────────────
const RESULTS = [
  {
    icon: <TrendingUp className="w-7 h-7" />,
    stat: "Top 3",
    label: "Google Maps Ranking",
    color: "blue",
  },
  {
    icon: <Phone className="w-7 h-7" />,
    stat: "3×",
    label: "Increased Calls & Leads",
    color: "green",
  },
  {
    icon: <Award className="w-7 h-7" />,
    stat: "5★",
    label: "Better Customer Trust",
    color: "orange",
  },
  {
    icon: <Eye className="w-7 h-7" />,
    stat: "2×",
    label: "More Local Visibility",
    color: "blue",
  },
];

const resultColors: Record<string, string> = {
  blue: "bg-brand-blue/10 text-brand-blue",
  green: "bg-brand-green/10 text-brand-green",
  orange: "bg-brand-orange/10 text-brand-orange",
};

function ResultsSection() {
  return (
    <section id="results" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <FadeSection className="max-w-2xl mx-auto text-center mb-12">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
            What You Get
          </h2>
          <p className="text-foreground/60">
            Real, measurable results that grow your business.
          </p>
        </FadeSection>

        <FadeSection>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {RESULTS.map((r, i) => (
              <motion.div
                key={r.label}
                data-ocid={`results.item.${i + 1}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center p-8 bg-white rounded-2xl border border-border card-hover"
              >
                <div
                  className={`w-16 h-16 rounded-2xl ${resultColors[r.color]} flex items-center justify-center mx-auto mb-4`}
                >
                  {r.icon}
                </div>
                <div className="font-display text-4xl font-extrabold text-foreground mb-2">
                  {r.stat}
                </div>
                <p className="text-sm font-medium text-foreground/60">
                  {r.label}
                </p>
              </motion.div>
            ))}
          </div>
        </FadeSection>
      </div>
    </section>
  );
}

// ── TESTIMONIALS ──────────────────────────────────────────────────────────────
const TESTIMONIALS = [
  {
    quote:
      "We saw a 3x increase in calls within just 2 months! GrowMyMaps completely transformed our online presence.",
    name: "Rajesh Kumar",
    role: "Restaurant Owner",
    avatar: "RK",
  },
  {
    quote:
      "Now we rank in top 3 on Google Maps in our city! Our salon gets new walk-in clients every single week.",
    name: "Priya Sharma",
    role: "Salon Owner",
    avatar: "PS",
  },
  {
    quote:
      "Our walk-in customers doubled after GrowMyMaps optimized our profile. Best investment I made this year.",
    name: "Amit Patel",
    role: "Gym Owner",
    avatar: "AP",
  },
];

function TestimonialsSection() {
  return (
    <section className="py-20 bg-muted/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <FadeSection className="max-w-2xl mx-auto text-center mb-12">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
            What Our Clients Say
          </h2>
          <p className="text-foreground/60">
            Real results from real businesses across India.
          </p>
        </FadeSection>

        <FadeSection>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={t.name}
                data-ocid={`testimonials.item.${i + 1}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl p-6 border border-border card-hover relative"
              >
                <div className="absolute top-4 right-5 text-5xl text-brand-blue/10 font-display font-black leading-none select-none">
                  &ldquo;
                </div>
                <Stars />
                <p className="mt-4 text-foreground/70 leading-relaxed mb-6 text-sm italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-brand-blue text-white flex items-center justify-center text-xs font-bold">
                    {t.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-foreground text-sm">
                      {t.name}
                    </div>
                    <div className="text-xs text-foreground/50">{t.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </FadeSection>
      </div>
    </section>
  );
}

// ── FREE AUDIT FORM ───────────────────────────────────────────────────────────
function AuditSection() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    businessName: "",
    location: "",
  });
  const { mutate, isPending, isSuccess, isError, reset } = useSubmitLead();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate(
      { ...form, location: form.location || "Agartala", source: "free_audit" },
      {
        onSuccess: () => {
          toast.success(
            "🎉 Audit request received! We'll contact you within 24 hours.",
          );
          setForm({ name: "", phone: "", businessName: "", location: "" });
        },
        onError: () => {
          toast.error("Something went wrong. Please try again.");
        },
      },
    );
  };

  return (
    <section id="audit" className="py-20 blue-gradient-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <FadeSection className="max-w-xl mx-auto text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-white/20 text-white px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
            🎁 100% Free — No Obligations
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-4">
            Get a FREE Google Maps Audit
          </h2>
          <p className="text-white/75 text-lg">
            Find out why your business isn&apos;t showing up — for free.
          </p>
        </FadeSection>

        <FadeSection className="max-w-lg mx-auto">
          <div className="bg-white rounded-3xl p-8 shadow-brand">
            <AnimatePresence mode="wait">
              {isSuccess ? (
                <motion.div
                  key="success"
                  data-ocid="audit.success_state"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <div className="w-16 h-16 rounded-full bg-brand-green/15 flex items-center justify-center mx-auto mb-4">
                    <Check className="w-8 h-8 text-brand-green" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-foreground mb-2">
                    You&apos;re all set!
                  </h3>
                  <p className="text-foreground/60 mb-6">
                    We&apos;ll analyze your Google Business Profile and contact
                    you within 24 hours.
                  </p>
                  <Button
                    onClick={reset}
                    variant="outline"
                    className="border-brand-blue text-brand-blue"
                  >
                    Submit Another
                  </Button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className="space-y-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div>
                    <Label
                      htmlFor="audit-name"
                      className="text-sm font-semibold mb-1 block"
                    >
                      Full Name *
                    </Label>
                    <Input
                      id="audit-name"
                      data-ocid="audit.name.input"
                      value={form.name}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, name: e.target.value }))
                      }
                      placeholder="Your full name"
                      required
                      className="h-11"
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="audit-phone"
                      className="text-sm font-semibold mb-1 block"
                    >
                      Phone Number *
                    </Label>
                    <Input
                      id="audit-phone"
                      data-ocid="audit.phone.input"
                      type="tel"
                      value={form.phone}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, phone: e.target.value }))
                      }
                      placeholder="Your mobile number"
                      required
                      className="h-11"
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="audit-business"
                      className="text-sm font-semibold mb-1 block"
                    >
                      Business Name *
                    </Label>
                    <Input
                      id="audit-business"
                      data-ocid="audit.business.input"
                      value={form.businessName}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, businessName: e.target.value }))
                      }
                      placeholder="Your business name"
                      required
                      className="h-11"
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="audit-location"
                      className="text-sm font-semibold mb-1 block"
                    >
                      City / Location
                    </Label>
                    <Input
                      id="audit-location"
                      data-ocid="audit.location.input"
                      value={form.location}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, location: e.target.value }))
                      }
                      placeholder="Agartala"
                      className="h-11"
                    />
                  </div>

                  {isError && (
                    <div
                      data-ocid="audit.error_state"
                      className="text-sm text-red-600 bg-red-50 p-3 rounded-lg"
                    >
                      Something went wrong. Please try again.
                    </div>
                  )}

                  <Button
                    type="submit"
                    data-ocid="audit.submit_button"
                    disabled={isPending}
                    className="w-full h-12 bg-brand-orange hover:bg-brand-orange-dark text-white font-bold text-base shadow-orange"
                  >
                    {isPending ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />{" "}
                        Processing...
                      </>
                    ) : (
                      <>
                        Claim My Free Audit{" "}
                        <ChevronRight className="w-5 h-5 ml-1" />
                      </>
                    )}
                  </Button>

                  <p className="text-xs text-center text-foreground/40">
                    No spam. We respect your privacy. 100% confidential.
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </FadeSection>
      </div>
    </section>
  );
}

// ── CTA SECTION ───────────────────────────────────────────────────────────────
function CTASection() {
  const handleScroll = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <FadeSection>
          <div className="relative text-center bg-gradient-to-br from-foreground to-brand-blue-dark rounded-3xl p-12 sm:p-16 overflow-hidden">
            {/* Decorative */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-brand-blue/20 blur-3xl" />
              <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-brand-green/20 blur-3xl" />
            </div>
            <div className="relative">
              <h2 className="font-display text-3xl sm:text-5xl font-bold text-white mb-4">
                Start Getting More Customers Today
              </h2>
              <p className="text-white/70 text-lg mb-10 max-w-2xl mx-auto">
                Don&apos;t let your competitors take your customers. Get started
                now.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  data-ocid="cta.get-free-audit.primary_button"
                  size="lg"
                  onClick={() => handleScroll("#audit")}
                  className="bg-brand-orange hover:bg-brand-orange-dark text-white font-bold text-base px-10 shadow-orange"
                >
                  Get Free Audit
                  <ChevronRight className="w-5 h-5 ml-1" />
                </Button>
                <Button
                  data-ocid="cta.contact-us.secondary_button"
                  size="lg"
                  variant="outline"
                  onClick={() => handleScroll("#audit")}
                  className="border-2 border-white/60 text-white hover:bg-white/10 font-bold text-base px-10"
                >
                  Contact Us
                </Button>
              </div>
            </div>
          </div>
        </FadeSection>
      </div>
    </section>
  );
}

// ── FOOTER ────────────────────────────────────────────────────────────────────
function Footer() {
  const year = new Date().getFullYear();
  const hostname = encodeURIComponent(window.location.hostname);

  return (
    <footer className="bg-foreground text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div>
            <img
              src="/assets/generated/growmymaps-logo-transparent.dim_400x100.png"
              alt="GrowMyMaps"
              className="h-10 w-auto mb-4 brightness-0 invert"
            />
            <p className="text-white/60 text-sm leading-relaxed max-w-xs">
              GrowMyMaps helps local businesses rank higher on Google Maps and
              get more customers every day.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-bold text-white mb-4">
              Contact Us
            </h4>
            <div className="space-y-3">
              <a
                href="tel:9612077291"
                data-ocid="footer.phone.link"
                className="flex items-center gap-3 text-white/60 hover:text-white transition-colors text-sm"
              >
                <Phone className="w-4 h-4" />
                9612077291
              </a>
              <a
                href="mailto:info@growmymaps.com"
                data-ocid="footer.email.link"
                className="flex items-center gap-3 text-white/60 hover:text-white transition-colors text-sm"
              >
                <Mail className="w-4 h-4" />
                info@growmymaps.com
              </a>
              <a
                href="https://wa.me/919612077291"
                data-ocid="footer.whatsapp.link"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-white/60 hover:text-white transition-colors text-sm"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp: 9612077291
              </a>
            </div>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-display font-bold text-white mb-4">
              Follow Us
            </h4>
            <div className="flex gap-3">
              <button
                type="button"
                data-ocid="footer.facebook.link"
                className="w-10 h-10 rounded-xl bg-white/10 hover:bg-brand-blue/50 flex items-center justify-center transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </button>
              <button
                type="button"
                data-ocid="footer.instagram.link"
                className="w-10 h-10 rounded-xl bg-white/10 hover:bg-brand-blue/50 flex items-center justify-center transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </button>
              <button
                type="button"
                data-ocid="footer.linkedin.link"
                className="w-10 h-10 rounded-xl bg-white/10 hover:bg-brand-blue/50 flex items-center justify-center transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/40">
          <span>© {year} GrowMyMaps. All rights reserved.</span>
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${hostname}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white/70 transition-colors"
          >
            Built with ❤️ using caffeine.ai
          </a>
        </div>
      </div>
    </footer>
  );
}

// ── WHATSAPP BUTTON ───────────────────────────────────────────────────────────
function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/919612077291"
      data-ocid="whatsapp.button"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-green-500 hover:bg-green-600 flex items-center justify-center shadow-lg pulse-ring transition-colors"
      aria-label="Chat on WhatsApp"
    >
      <span className="sr-only">Chat on WhatsApp</span>
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="w-7 h-7 fill-white"
      >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    </a>
  );
}

// ── APP ROOT ──────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <div className="min-h-screen bg-background font-body">
      <Toaster position="top-center" richColors />
      <Header />
      <main>
        <HeroSection />
        <ProblemSection />
        <SolutionSection />
        <ServicesSection />
        <WhoWeHelpSection />
        <ResultsSection />
        <TestimonialsSection />
        <AuditSection />
        <CTASection />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
