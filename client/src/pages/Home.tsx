/**
 * Surface Craft — The Restoration Journal.
 * File style: editorial art direction, limestone/ink contrast, carefully rationed verdigris signals.
 * Does this choice reinforce or dilute our design philosophy? Prefer composed asymmetry over generic UI patterns.
 */
import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring, useTransform } from "framer-motion";
import {
  ArrowDownRight,
  ArrowUpRight,
  CalendarDays,
  Check,
  ChevronLeft,
  ChevronRight,
  Droplets,
  Instagram,
  Mail,
  Menu,
  MoveDown,
  Phone,
  Plus,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";
import { toast } from "sonner";
import WebGLParticles from "@/components/Particles";
import ReactBitsOptionWheel from "@/components/OptionWheel";
import ReactBitsDepthText from "@/components/DepthText";
import ReactBitsDriftWall from "@/components/DriftWall";
import ReactBitsClickSpark from "@/components/ClickSpark";

const ASSETS = {
  logo: "/manus-storage/surface-craft-logo_34061841.png",
  hero: "/manus-storage/surface-craft-hero_0e29b748.jpg",
  driveway: "/manus-storage/surface-craft-driveway_0cacd7db.jpg",
  patio: "/manus-storage/surface-craft-patio_76dcd499.jpg",
  texture: "/manus-storage/surface-craft-texture_3966913e.jpg",
};

type Service = "Driveway" | "Trash bins" | "Patio" | "Siding" | "Walkway";
type BookingService = "Driveway" | "Trash bins" | "Both" | "Other";

const serviceDetails: Record<Service, { index: string; eyebrow: string; copy: string; price: string; note: string }> = {
  Driveway: {
    index: "01",
    eyebrow: "Measured restoration",
    copy: "A precision wash that reintroduces the original finish. A typical 600–700 sq ft driveway is $100; additional concrete beyond 700 sq ft is $0.14 per sq ft.",
    price: "$100 base / 600–700 sq ft",
    note: "Extra concrete over 700 sq ft: $0.14 / sq ft",
  },
  "Trash bins": {
    index: "02",
    eyebrow: "Sanitized & reset",
    copy: "A compact reset for the part of the property most often overlooked.",
    price: "$15 / bin",
    note: "Simple, consistent per-bin pricing",
  },
  Patio: {
    index: "03",
    eyebrow: "Stone brought forward",
    copy: "Low-pressure care tuned to the composition, porosity, and patina of your patio.",
    price: "Custom scope",
    note: "Surface-led assessment",
  },
  Siding: {
    index: "04",
    eyebrow: "A quieter facade",
    copy: "A considered exterior wash that respects the materials framing your home.",
    price: "Custom scope",
    note: "Surface-led assessment",
  },
  Walkway: {
    index: "05",
    eyebrow: "A clearer arrival",
    copy: "Carefully renewed paths make the approach to home feel newly intentional.",
    price: "Custom scope",
    note: "Surface-led assessment",
  },
};

const navItems = [
  { label: "Our craft", href: "#craft" },
  { label: "Surface stories", href: "#stories" },
  { label: "Services", href: "#services" },
  { label: "Booking", href: "#booking" },
];

const portfolioItems = [
  { number: "01", title: "The arrival", location: "Driveway restoration", image: ASSETS.driveway },
  { number: "02", title: "The pause", location: "Patio care", image: ASSETS.patio },
  { number: "03", title: "The surface", location: "Material study", image: ASSETS.texture },
];

function scrollToId(id: string) {
  document.querySelector(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function ClickSpark({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <ReactBitsClickSpark sparkColor="#38d9ff" sparkSize={11} sparkRadius={18} sparkCount={8} duration={420} extraScale={1.1}><span className={`spark-wrap ${className}`}>{children}</span></ReactBitsClickSpark>;
}

function MagneticButton({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  return (
    <motion.div
      className={className}
      animate={offset}
      transition={{ type: "spring", stiffness: 320, damping: 16, mass: 0.35 }}
      onMouseMove={(event) => {
        const box = event.currentTarget.getBoundingClientRect();
        setOffset({ x: (event.clientX - box.left - box.width / 2) * 0.12, y: (event.clientY - box.top - box.height / 2) * 0.12 });
      }}
      onMouseLeave={() => setOffset({ x: 0, y: 0 })}
    >
      {children}
    </motion.div>
  );
}

function CardNav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`site-nav ${scrolled ? "site-nav--scrolled" : ""}`}>
      <a href="#top" className="brand-lockup" aria-label="Surface Craft home">
        <img src={ASSETS.logo} alt="" className="brand-mark" />
        <span><b>Surface</b><i>Craft</i></span>
      </a>
      <nav className="desktop-nav" aria-label="Primary navigation">
        {navItems.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}
      </nav>
      <ClickSpark className="nav-cta">
        <button className="book-link" onClick={() => scrollToId("#booking")}>Book a transformation <ArrowDownRight size={15} /></button>
      </ClickSpark>
      <button className="mobile-menu-button" aria-label="Open navigation" onClick={() => setOpen(true)}><Menu size={22} /></button>
      <AnimatePresence>
        {open && (
          <motion.div className="mobile-panel" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.24 }}>
            <div className="mobile-panel-head"><span className="eyebrow">Index / 2026</span><button onClick={() => setOpen(false)} aria-label="Close navigation"><X size={24} /></button></div>
            {navItems.map((item, index) => <a key={item.href} href={item.href} onClick={() => setOpen(false)}><small>0{index + 1}</small>{item.label}<ArrowUpRight /></a>)}
            <button className="button button--dark" onClick={() => { setOpen(false); scrollToId("#booking"); }}>Book a transformation</button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function Particles() {
  const dots = useMemo(() => Array.from({ length: 45 }, (_, i) => ({
    id: i,
    x: (i * 31.3) % 100,
    y: (i * 19.7) % 100,
    size: 1 + (i % 4) * 0.5,
    duration: 8 + (i % 7),
    delay: -(i % 9),
  })), []);
  return <div className="particles" aria-hidden="true">{dots.map((dot) => <span key={dot.id} style={{ left: `${dot.x}%`, top: `${dot.y}%`, width: dot.size, height: dot.size, animationDuration: `${dot.duration}s`, animationDelay: `${dot.delay}s` }} />)}</div>;
}

function DepthText({ text }: { text: string }) {
  return <ReactBitsDepthText text={text} layers={30} depth={2.4} faceColor="#f8fbfc" depthColor="#38d9ff" tilt={5.5} pointerTracking autoOrbit={false} smoothing={0.16} perspective={900} fontSize="inherit" fontWeight={400} shadow className="hero-depth-text" />;
}

function ScrollExpand() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const scale = useSpring(useTransform(scrollYProgress, [0, 1], [1.04, 1.2]), { stiffness: 130, damping: 28 });
  const textY = useTransform(scrollYProgress, [0, 1], [0, 88]);
  return (
    <section id="top" ref={ref} className="hero-section">
      <motion.img src={ASSETS.hero} alt="Restored exterior stone surface in cinematic light" className="hero-image" style={{ scale }} fetchPriority="high" />
      <div className="hero-shade" />
      <WebGLParticles className="hero-particles" particleColors={["#D9D9D9", "#FFFFFF", "#C7C7C7"]} particleCount={350} particleSpread={8} speed={0.08} particleBaseSize={80} sizeRandomness={0.4} moveParticlesOnHover particleHoverFactor={0.6} alphaParticles pixelRatio={1.5} />
      <div className="hero-grid" aria-hidden="true" />
      <motion.div className="hero-content" style={{ y: textY }}>
        <div className="hero-meta"><span>Exterior care, considered</span><span>Est. 2026</span></div>
        <div className="hero-masthead"><img src={ASSETS.logo} alt="" /><span>Surface<br /><i>Craft</i></span><b>Field journal / 00</b></div>
        <p className="hero-kicker"><span className="pulse-dot" /> Restoration-led exterior cleaning</p>
        <h1><DepthText text="Surface Craft" /><span><em>for renewal.</em></span></h1>
        <div className="hero-bottom">
          <p>Exceptional surfaces are not cleaned. <em>They are brought back into view.</em></p>
          <ClickSpark>
            <MagneticButton>
              <button className="circle-action" onClick={() => scrollToId("#booking")} aria-label="Book a transformation"><ArrowDownRight /></button>
            </MagneticButton>
          </ClickSpark>
        </div>
      </motion.div>
      <button className="hero-scroll" onClick={() => scrollToId("#craft")}><MoveDown size={15} /> Scroll to explore</button>
    </section>
  );
}

function CraftSection() {
  return (
    <section id="craft" className="craft-section section-pad">
      <div className="vertical-index" aria-hidden="true"><span>01</span><i /></div>
      <div className="craft-intro reveal-on-scroll">
        <p className="eyebrow eyebrow--green">Our craft / 01</p>
        <p className="craft-lede">Restoration begins with attention: to the grain in concrete, the shade beneath a threshold, and the material that made an exterior feel like home in the first place.</p>
      </div>
      <div className="craft-grid">
        <div className="craft-visual"><img src={ASSETS.patio} alt="Cleaned natural stone patio" loading="lazy" /><div className="photo-caption"><span>Material study</span><b>Natural stone</b></div></div>
        <div className="craft-copy">
          <span className="oversize-number">/02</span>
          <h2>Care that lets the surface speak <em>for itself.</em></h2>
          <p>We work with proportion and restraint. The aim is never a coated-over finish—it is an exterior that looks more like itself, with every original detail intact.</p>
          <a className="text-link" href="#stories">See our approach <ArrowUpRight size={16} /></a>
        </div>
      </div>
      <div className="craft-principles">
        {[["A", "Surface first", "Each service begins with the material in front of us."], ["B", "Quiet precision", "Focused work, considered method, no unnecessary disruption."], ["C", "Clear scope", "Straightforward pricing where it is appropriate—and clear custom scopes where it is not."]].map(([letter, title, copy]) => <div className="principle" key={letter}><span>{letter}</span><div><h3>{title}</h3><p>{copy}</p></div></div>)}
      </div>
    </section>
  );
}

function AccordionGallery() {
  const [active, setActive] = useState(1);
  const links = ["/our-story", "/trash-bins", "/concrete-cleaning"];
  return (
    <div className="accordion-gallery" aria-label="Surface restoration portfolio">
      {portfolioItems.map((item, index) => (
        <a key={item.title} href={links[index]} className={`gallery-item ${active === index ? "gallery-item--active" : ""}`} onMouseEnter={() => setActive(index)} onFocus={() => setActive(index)}>
          <img src={item.image} alt={`${item.location} by Surface Craft`} loading="lazy" />
          <span className="gallery-overlay" />
          <span className="gallery-index">{item.number}</span>
          <span className="gallery-content"><small>{item.location}</small><strong>{item.title}</strong><i>Read the detail <ArrowUpRight size={16} /></i></span>
        </a>
      ))}
    </div>
  );
}

function DriftWall() {
  const items = [...portfolioItems, ...portfolioItems].map((item) => ({ image: item.image, title: item.title, href: undefined }));
  return <div className="drift-wall-stage"><ReactBitsDriftWall items={items} columns={5} tileWidth={205} tileHeight={140} gap={14} radius={0} tilt={10} turn={-10} speed={30} direction="up" variance={0.28} parallax={0.45} pauseOnHover={false} lift={22} fade={0.55} dim={0.52} grayscale={false} overlayColor="#061419" style={{}} className="drift-wall--surface" /><div className="drift-wall-label">A moving study in <em>care &amp; material</em></div></div>;
}

function StoriesSection() {
  return (
    <section id="stories" className="stories-section">
      <div className="stories-heading section-pad"><div><p className="eyebrow eyebrow--green">Surface stories / 02</p><h2>What changes when the <em>surface</em> does.</h2></div><p>Three short studies in texture, light, and the kind of transformation you can feel from the curb.</p></div>
      <AccordionGallery />
      <DriftWall />
    </section>
  );
}

function OptionWheel({ value, onChange }: { value: Service; onChange: (value: Service) => void }) {
  return <div className="option-wheel" role="radiogroup" aria-label="Select a surface care service">
    {Object.keys(serviceDetails).map((item) => {
      const service = item as Service;
      return <button key={service} role="radio" aria-checked={value === service} className={value === service ? "wheel-option wheel-option--active" : "wheel-option"} onClick={() => onChange(service)}><span>{serviceDetails[service].index}</span>{service}<i /></button>;
    })}
  </div>;
}

function ServicesSection({ service, setService }: { service: Service; setService: (value: Service) => void }) {
  const detail = serviceDetails[service];
  return (
    <section id="services" className="services-section section-pad">
      <div className="services-heading"><p className="eyebrow eyebrow--green">Service index / 03</p><h2>Choose the work. <em>We’ll make it exact.</em></h2><p className="section-note">Our starting prices are clear by design. A typical 600–700 sq ft driveway is $100; extra concrete over 700 sq ft is $0.14 per sq ft. Other pressure-washing areas are add-ons quoted separately.</p></div>
      <div className="service-machine">
        <ReactBitsOptionWheel items={Object.keys(serviceDetails)} defaultSelected={0} onChange={(_index: number, item: string) => setService(item as Service)} textColor="#7d8581" activeColor="#02080a" side="left" fontSize={1.45} spacing={1.4} curve={1.15} tilt={6} blur={0} fade={0.25} smoothing={200} inset={0} loop={false} draggable className="service-option-wheel" />
        <AnimatePresence mode="wait">
          <motion.div key={service} className="service-detail" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.22 }}>
            <div className="service-detail-top"><p>{detail.eyebrow}</p><span>{detail.index} / 05</span></div>
            <h3>{service}</h3>
            <p>{detail.copy}</p>
            <div className="price-lockup"><strong>{detail.price}</strong><span>{detail.note}</span></div>
            <ClickSpark><MagneticButton><button className="button button--dark" onClick={() => scrollToId("#booking")}>Price this service <ArrowDownRight size={18} /></button></MagneticButton></ClickSpark>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

function QuoteCalculator() {
  const [quoteService, setQuoteService] = useState<BookingService>("Driveway");
  const [area, setArea] = useState(600);
  const [bins, setBins] = useState(2);
  const [quoteDetails, setQuoteDetails] = useState("");
  const drivewayTotal = 100 + Math.max(0, area - 700) * 0.14;
  const binsTotal = bins * 15;
  const total = quoteService === "Driveway" ? drivewayTotal : quoteService === "Trash bins" ? binsTotal : quoteService === "Both" ? drivewayTotal + binsTotal : 0;
  return <div className="quote-card">
    <div className="quote-top"><div><p className="eyebrow">Live estimate</p><h3>Put a number on it.</h3></div><span className="quote-status"><Sparkles size={14} /> Updates live</span></div>
    <div className="quote-toggle quote-toggle--expanded" role="group" aria-label="Estimate service selection"><button className={quoteService === "Driveway" ? "selected" : ""} onClick={() => setQuoteService("Driveway")}>Driveway</button><button className={quoteService === "Trash bins" ? "selected" : ""} onClick={() => setQuoteService("Trash bins")}>Trash bins</button><button className={quoteService === "Both" ? "selected" : ""} onClick={() => setQuoteService("Both")}>Both</button><button className={quoteService === "Other" ? "selected" : ""} onClick={() => setQuoteService("Other")}>Other</button></div>
    {(quoteService === "Driveway" || quoteService === "Both") && <div className="range-group"><div className="range-label"><span>Driveway size</span><b>{area.toLocaleString()} sq ft</b></div><input type="range" min="600" max="3000" step="25" value={area} onChange={(e) => setArea(Number(e.target.value))} aria-label="Driveway square footage" /><p>$100 base for a typical 600–700 sq ft driveway; extra concrete over 700 sq ft is $0.14 per sq ft.</p></div>}
    {(quoteService === "Trash bins" || quoteService === "Both") && <div className="range-group"><div className="range-label"><span>Number of bins</span><b>{bins} {bins === 1 ? "bin" : "bins"}</b></div><input type="range" min="1" max="12" step="1" value={bins} onChange={(e) => setBins(Number(e.target.value))} aria-label="Number of trash bins" /><p>$15 per bin</p></div>}
    {quoteService === "Other" && <label className="quote-details-field"><span>Tell us what you need</span><textarea value={quoteDetails} onChange={(e) => setQuoteDetails(e.target.value)} placeholder="Describe the surface or area." rows={3} /></label>}
    <div className="quote-total"><span>Estimated total</span><strong>{quoteService === "Other" ? "Custom" : `$${total.toFixed(2)}`}</strong><small>{quoteService === "Both" ? "Driveway base plus $15 per bin" : quoteService === "Driveway" ? "Includes the $100 base up to 700 sq ft" : quoteService === "Trash bins" ? "Based on $15 per bin" : "We’ll review the added scope and follow up."}</small></div>
  </div>;
}

function BookingFlow() {
  const [step, setStep] = useState(1);
  const [bookingService, setBookingService] = useState<BookingService>("Driveway");
  const [area, setArea] = useState(600);
  const [bins, setBins] = useState(2);
  const [form, setForm] = useState({ name: "", email: "", phone: "", date: "" });
  const [otherDetails, setOtherDetails] = useState("");
  const drivewayTotal = 100 + Math.max(0, area - 700) * 0.14;
  const binsTotal = bins * 15;
  const total = bookingService === "Driveway" ? drivewayTotal : bookingService === "Trash bins" ? binsTotal : bookingService === "Both" ? drivewayTotal + binsTotal : 0;
  const canContinue = step === 1 ? (bookingService !== "Other" || otherDetails.trim().length > 0) : Boolean(form.name && form.email && form.phone && form.date);
  const submit = () => { setStep(3); toast.success("Your restoration request is noted.", { description: "We’ll use your details to follow up on the scope." }); };
  return <section id="booking" className="booking-section section-pad">
    <div className="booking-rail"><p className="eyebrow eyebrow--green">Book the work / 04</p><h2>Begin with the <em>surface.</em></h2><p>A few considered details are all we need to prepare the next step.</p><div className="booking-steps">{["Scope", "Details", "Request"].map((label, i) => <div key={label} className={step >= i + 1 ? "booking-step booking-step--on" : "booking-step"}><span>0{i + 1}</span><i /><b>{label}</b></div>)}</div></div>
    <div className="booking-shell">
      <AnimatePresence mode="wait">
        {step === 1 && <motion.div key="scope" className="booking-panel" initial={{ opacity: 0, x: 28 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -28 }} transition={{ duration: 0.25 }}>
          <div className="panel-heading"><span>01 / Scope</span><h3>What needs a reset?</h3></div>
          <div className="booking-service-options"><button onClick={() => setBookingService("Driveway")} className={bookingService === "Driveway" ? "booking-choice booking-choice--selected" : "booking-choice"}><Droplets /><div><b>Driveway cleaning</b><span>$100 base for a typical 600–700 sq ft driveway; extra concrete over 700 sq ft is $0.14 per sq ft</span></div><i><Check /></i></button><button onClick={() => setBookingService("Trash bins")} className={bookingService === "Trash bins" ? "booking-choice booking-choice--selected" : "booking-choice"}><ShieldCheck /><div><b>Trash bin cleaning</b><span>$15 per bin</span></div><i><Check /></i></button><button onClick={() => setBookingService("Both")} className={bookingService === "Both" ? "booking-choice booking-choice--selected" : "booking-choice"}><Plus /><div><b>Both services</b><span>Choose driveway cleaning and trash bin cleaning together.</span></div><i><Check /></i></button><button onClick={() => setBookingService("Other")} className={bookingService === "Other" ? "booking-choice booking-choice--selected" : "booking-choice"}><Sparkles /><div><b>Other</b><span>Tell us what else you would like pressure washed.</span></div><i><Check /></i></button></div><p className="add-on-note"><Plus size={14} /> Patios, siding, walkways, and other areas requiring pressure washing are add-ons quoted separately.</p>\n          {(bookingService === "Driveway" || bookingService === "Both") && <label className="booking-field"><span>Approximate driveway size <b>{area.toLocaleString()} sq ft</b></span><input type="range" min="600" max="3000" step="25" value={area} onChange={(e) => setArea(Number(e.target.value))} /></label>}
          {(bookingService === "Trash bins" || bookingService === "Both") && <label className="booking-field"><span>Number of bins <b>{bins}</b></span><input type="range" min="1" max="12" value={bins} onChange={(e) => setBins(Number(e.target.value))} /></label>}
          {bookingService === "Other" && <label className="booking-field booking-field--textarea"><span>What else should we know?</span><textarea value={otherDetails} onChange={(e) => setOtherDetails(e.target.value)} placeholder="Describe the surface or area you would like us to review." rows={4} required /></label>}
          <div className="booking-price"><span>Current estimate</span><strong>{bookingService === "Other" ? "Custom" : `$${total.toFixed(2)}`}</strong><small>{bookingService === "Driveway" || bookingService === "Both" ? "$100 base up to 700 sq ft; $0.14 per extra sq ft. Trash bins are $15 each." : bookingService === "Trash bins" ? "$15 per bin" : "We’ll review your request and quote the added scope."}</small></div>
        </motion.div>}
        {step === 2 && <motion.div key="details" className="booking-panel" initial={{ opacity: 0, x: 28 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -28 }} transition={{ duration: 0.25 }}>
          <div className="panel-heading"><span>02 / Details</span><h3>Where should we begin?</h3></div>
          <div className="form-grid"><label><span>Your name</span><input placeholder="First and last name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></label><label><span>Email address</span><input placeholder="you@example.com" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></label><label><span>Phone number</span><input placeholder="(000) 000-0000" type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} /></label><label><span>Preferred date</span><input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} /></label></div>
          <p className="privacy-note"><ShieldCheck size={15} /> Your details are used only to coordinate this service request.</p>
        </motion.div>}
        {step === 3 && <motion.div key="complete" className="booking-panel booking-panel--success" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3 }}><span className="success-mark"><Check /></span><p className="eyebrow eyebrow--green">Request received</p><h3>Consider it in motion.</h3><p>Thank you, {form.name || "there"}. We will follow up to confirm the scope and your preferred window.</p><div className="success-summary"><span>{bookingService === "Other" ? "Custom scope" : bookingService}</span><b>{bookingService === "Other" ? "Quote to follow" : `$${total.toFixed(2)} estimated`}</b></div><button className="text-link" onClick={() => { setStep(1); setForm({ name: "", email: "", phone: "", date: "" }); setOtherDetails(""); }}>Start another request <ArrowUpRight size={16} /></button></motion.div>}
      </AnimatePresence>
      {step < 3 && <div className="booking-actions"><button className="back-button" onClick={() => setStep(1)} disabled={step === 1}><ChevronLeft size={18} /> Back</button><ClickSpark><MagneticButton><button className="button button--green" disabled={!canContinue} onClick={() => step === 1 ? setStep(2) : submit()}>{step === 1 ? "Continue" : "Send request"} <ChevronRight size={18} /></button></MagneticButton></ClickSpark></div>}
    </div>
  </section>;
}

function ContactFooter() {
  return <footer className="footer">
    <div className="footer-cta"><div><p className="eyebrow eyebrow--green">A clear first step</p><h2>Your exterior has more to <em>show.</em></h2></div><div className="footer-price"><span>Driveway cleaning</span><b>$100 base / 600–700 sq ft</b><small>Extra concrete over 700 sq ft: $0.14 / sq ft</small><span>Trash bin cleaning</span><b>$15 / bin</b></div><ClickSpark><MagneticButton><button className="button button--green" onClick={() => scrollToId("#booking")}>Book a transformation <ArrowDownRight size={18} /></button></MagneticButton></ClickSpark></div>
    <div className="footer-bottom"><a href="#top" className="footer-brand"><img src={ASSETS.logo} alt="" /><span>Surface<br /><i>Craft</i></span></a><div className="footer-contact"><a href="mailto:hello@surfacecraft.care"><Mail size={16} /> hello@surfacecraft.care</a><a href="tel:+10000000000"><Phone size={16} /> (000) 000-0000</a></div><div className="footer-nav">{navItems.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}</div><div className="footer-meta"><span>© 2026 Surface Craft</span><a href="#top" aria-label="Instagram"><Instagram size={17} /></a></div></div>
  </footer>;
}

export default function Home() {
  const [activeService, setActiveService] = useState<Service>("Driveway");
  return <main className="surface-craft"><CardNav /><aside className="particles-sidebar" aria-label="Field journal page index"><WebGLParticles particleColors={["#D9D9D9", "#FFFFFF", "#C7C7C7"]} particleCount={350} particleSpread={8} speed={0.08} particleBaseSize={80} sizeRandomness={0.4} moveParticlesOnHover particleHoverFactor={0.6} alphaParticles pixelRatio={1.5} /><nav className="particles-sidebar__index"><strong>00</strong><i /><a href="#craft">01</a><a href="#stories">02</a><a href="#services">03</a><a href="#booking">04</a></nav></aside><ScrollExpand /><CraftSection /><StoriesSection /><ServicesSection service={activeService} setService={setActiveService} /><section className="quote-section"><div className="quote-image"><img src={ASSETS.texture} alt="Water moving across stone" loading="lazy" /></div><div className="quote-copy"><p className="eyebrow eyebrow--green">A clearer scope</p><h2>Pricing should be a <em>known quantity.</em></h2><p>Choose a service, adjust the surface, and see a transparent starting estimate before you begin.</p><QuoteCalculator /></div></section><BookingFlow /><ContactFooter /></main>;
}
