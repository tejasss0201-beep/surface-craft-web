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
  Facebook,
  Instagram,
  Mail,
  MapPin,
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
import ReactBitsStaggeredMenu from "@/components/StaggeredMenu";
import { trpc } from "@/lib/trpc";

const ASSETS = {
  logo: "/images/logo.png",
  hero: "/images/hero.jpg",
  driveway: "/images/surface-craft-driveway_0cacd7db.jpg",
  patio: "/images/patio.jpg",
  texture: "/images/texture.jpg",
  trashBins: "/images/naveen_bins.jpeg",
  residentialConcrete: "/images/navven_surfacecleaner.webp",
  driftwallHome: "/images/randomhome.jpg",
  driftwallConcrete: "/images/randomconcrete.jpg",
  concreteTexture: "/images/texture.jpg",
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
  { label: "Surface stories", href: "#stories" },
  { label: "Services", href: "#services" },
  { label: "Booking", href: "#booking" },
];

const portfolioItems = [
  { number: "01", title: "Our Story", location: "Surface Craft | Just The Start", image: ASSETS.driveway },
  { number: "02", title: "Trashbin Cleaning", location: "What We Offer", image: ASSETS.trashBins },
  { number: "03", title: "Concrete Surface Cleaning", location: "What We Offer", image: ASSETS.residentialConcrete },
];

function scrollToId(id: string) {
  document.querySelector(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function ClickSpark({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <ReactBitsClickSpark sparkColor="#2b8fd9" sparkSize={11} sparkRadius={18} sparkCount={8} duration={420} extraScale={1.1}><span className={`spark-wrap ${className}`}>{children}</span></ReactBitsClickSpark>;
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
        <img src={ASSETS.logo} alt="Surface Craft Exterior Care" className="brand-mark brand-mark--full" />
      </a>
      <nav className="desktop-nav" aria-label="Primary navigation">
        {navItems.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}
      </nav>
      <ClickSpark className="nav-cta">
        <button className="book-link" onClick={() => scrollToId("#booking")}>Book a transformation <ArrowDownRight size={15} /></button>
      </ClickSpark>
      <div className="mobile-staggered-menu"><ReactBitsStaggeredMenu position="right" colors={["#02161b", "#0a3b46", "#2b8fd9"]} items={[{ label: "Surface stories", link: "#stories", ariaLabel: "Go to Surface stories" }, { label: "Services", link: "#services", ariaLabel: "Go to Services" }, { label: "Booking", link: "#booking", ariaLabel: "Go to Booking" }]} socialItems={[{ label: "Call 972-880-9311", ariaLabel: "Call 972-880-9311", link: "tel:+19728809311", icon: <Phone size={21} strokeWidth={1.7} /> }, { label: "WhatsApp 972-880-9311", ariaLabel: "WhatsApp 972-880-9311", link: "https://wa.me/19728809311", icon: <WhatsAppIcon /> }, { label: "Instagram", ariaLabel: "Instagram", link: "https://www.instagram.com/surfacecraft1/", icon: <Instagram size={21} /> }, { label: "TikTok", ariaLabel: "TikTok", link: "https://www.tiktok.com/@surface.craft", icon: <TikTokIcon /> }, { label: "Facebook", ariaLabel: "Facebook", link: "https://www.facebook.com/share/14nPfyJ1an6/?mibextid=wwXIfr", icon: <Facebook size={21} /> }, { label: "Email us", ariaLabel: "Email surfacecraftfrisco@gmail.com", link: "mailto:surfacecraftfrisco@gmail.com", icon: <Mail size={21} strokeWidth={1.7} /> }]} displaySocials displayItemNumbering logoUrl={ASSETS.logo} menuButtonColor="#02080a" openMenuButtonColor="#2b8fd9" accentColor="#2b8fd9" changeMenuColorOnOpen={false} isFixed /></div>
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
  return <ReactBitsDepthText text={text} layers={30} depth={2.4} faceColor="#f8fbfc" depthColor="#2b8fd9" tilt={5.5} pointerTracking autoOrbit={false} smoothing={0.16} perspective={900} fontSize="inherit" fontWeight={400} shadow className="hero-depth-text" />;
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
        <p className="hero-kicker"><span className="pulse-dot" /> Restoration-led exterior cleaning</p>
        <h1><DepthText text="Surface Craft" /><span><em>Exterior Care.</em></span></h1>
        <div className="hero-bottom">
          <p><em>Serving Frisco, TX and surrounding areas.</em></p>
          <ClickSpark>
            <MagneticButton>
              <button className="circle-action" onClick={() => scrollToId("#booking")} aria-label="Book a transformation"><ArrowDownRight /></button>
            </MagneticButton>
          </ClickSpark>
        </div>
      </motion.div>
      <button className="hero-scroll" onClick={() => scrollToId("#stories")}><MoveDown size={15} /> Explore services</button>
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
  const items = [
    { image: ASSETS.driftwallHome, title: "Residential exterior", href: undefined },
    { image: ASSETS.driftwallConcrete, title: "Clean concrete surface", href: undefined },
    { image: ASSETS.driveway, title: "Driveway surface", href: undefined },
    { image: ASSETS.patio, title: "Outdoor hardscape", href: undefined },
    { image: ASSETS.texture, title: "Surface texture", href: undefined },
    { image: ASSETS.hero, title: "Exterior stone", href: undefined },
    { image: ASSETS.concreteTexture, title: "Concrete before renewal", href: undefined },
    { image: ASSETS.driftwallHome, title: "Neighborhood home", href: undefined },
  ];
  return <div className="drift-wall-stage"><ReactBitsDriftWall items={items} columns={5} tileWidth={205} tileHeight={140} gap={14} radius={0} tilt={10} turn={-10} speed={30} direction="up" variance={0.28} parallax={0.45} pauseOnHover={false} lift={22} fade={0.55} dim={0.52} grayscale={false} overlayColor="#061419" style={{}} className="drift-wall--surface" /></div>;
}

function StoriesSection() {
  return (
    <section id="stories" className="stories-section">
      <div className="stories-heading section-pad"><div><p className="eyebrow eyebrow--green">Surface stories / 01</p><h2>What changes when the <em>surface</em> does.</h2></div><p>Our Story, Trashbin Cleaning, and Concrete Surface Cleaning—clear details before you book.</p></div>
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
      <div className="services-heading"><p className="eyebrow eyebrow--green">Service index / 02</p><h2>Choose the work. <em>We’ll make it exact.</em></h2><p className="section-note">Our starting prices are clear by design. A typical 600–700 sq ft driveway is $100; extra concrete over 700 sq ft is $0.14 per sq ft. Other pressure-washing areas are add-ons quoted separately.</p></div>
      <div className="service-machine">
        <ReactBitsOptionWheel items={Object.keys(serviceDetails)} defaultSelected={0} onChange={(_index: number, item: string) => setService(item as Service)} textColor="#7d8581" activeColor="#02080a" side="left" fontSize={1.85} spacing={1.7} curve={1.15} tilt={6} blur={0} fade={0.25} smoothing={200} inset={0} loop={false} draggable className="service-option-wheel" />
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

function BookingFlow() {
  const [step, setStep] = useState(1);
  const [bookingService, setBookingService] = useState<BookingService>("Driveway");
  const [area, setArea] = useState(600);
  const [bins, setBins] = useState(2);
  const [form, setForm] = useState({ name: "", email: "", phone: "", date: "" });
  const [otherDetails, setOtherDetails] = useState("");
  const submitBooking = trpc.booking.submit.useMutation();
  const drivewayTotal = 100 + Math.max(0, area - 700) * 0.14;
  const binsTotal = bins * 15;
  const total = bookingService === "Driveway" ? drivewayTotal : bookingService === "Trash bins" ? binsTotal : bookingService === "Both" ? drivewayTotal + binsTotal : 0;
  const canContinue = step === 1 ? (bookingService !== "Other" || otherDetails.trim().length > 0) : Boolean(form.name && form.email && form.phone && form.date);
  const submit = async () => {
    try {
      await submitBooking.mutateAsync({
        name: form.name,
        email: form.email,
        phone: form.phone,
        date: form.date,
        service: bookingService,
        estimate: bookingService === "Other" ? "Custom quote" : `$${total.toFixed(2)} estimated`,
        drivewayArea: bookingService === "Driveway" || bookingService === "Both" ? area : undefined,
        binCount: bookingService === "Trash bins" || bookingService === "Both" ? bins : undefined,
        otherDetails: otherDetails || undefined,
      });
      setStep(3);
      toast.success("Your restoration request is noted.", { description: "We’ll use your details to follow up on the scope." });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "We could not send your request. Please try again.");
    }
  };
  return <section id="booking" className="booking-section section-pad">
    <div className="booking-rail"><p className="eyebrow eyebrow--green">Book the work / 03</p><h2>Begin with the <em>surface.</em></h2><p>A few considered details are all we need to prepare the next step.</p><div className="booking-steps">{["Scope", "Details", "Request"].map((label, i) => <div key={label} className={step >= i + 1 ? "booking-step booking-step--on" : "booking-step"}><span>0{i + 1}</span><i /><b>{label}</b></div>)}</div></div>
    <div className="booking-shell">
      <AnimatePresence mode="wait">
        {step === 1 && <motion.div key="scope" className="booking-panel" initial={{ opacity: 0, x: 28 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -28 }} transition={{ duration: 0.25 }}>
          <div className="panel-heading"><span>01 / Scope</span><h3>What needs a reset?</h3></div>
          <div className="booking-service-options"><button onClick={() => setBookingService("Driveway")} className={bookingService === "Driveway" ? "booking-choice booking-choice--selected" : "booking-choice"}><Droplets /><div><b>Driveway cleaning</b><span>$100 base for a typical 600–700 sq ft driveway; extra concrete over 700 sq ft is $0.14 per sq ft</span></div><i><Check /></i></button><button onClick={() => setBookingService("Trash bins")} className={bookingService === "Trash bins" ? "booking-choice booking-choice--selected" : "booking-choice"}><ShieldCheck /><div><b>Trash bin cleaning</b><span>$15 per bin</span></div><i><Check /></i></button><button onClick={() => setBookingService("Both")} className={bookingService === "Both" ? "booking-choice booking-choice--selected" : "booking-choice"}><Plus /><div><b>Both services</b><span>Choose driveway cleaning and trash bin cleaning together.</span></div><i><Check /></i></button><button onClick={() => setBookingService("Other")} className={bookingService === "Other" ? "booking-choice booking-choice--selected" : "booking-choice"}><Sparkles /><div><b>Other</b><span>Tell us what else you would like pressure washed.</span></div><i><Check /></i></button></div><p className="add-on-note"><Plus size={14} /> Patios, siding, walkways, and other areas requiring pressure washing are add-ons quoted separately.</p>
          {(bookingService === "Driveway" || bookingService === "Both") && <label className="booking-field"><span>Approximate driveway size <b>{area.toLocaleString()} sq ft</b></span><input type="range" min="600" max="3000" step="25" value={area} onChange={(e) => setArea(Number(e.target.value))} /></label>}
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
      {step < 3 && <div className="booking-actions"><button className="back-button" onClick={() => setStep(1)} disabled={step === 1}><ChevronLeft size={18} /> Back</button><ClickSpark><MagneticButton><button className="button button--green" disabled={!canContinue || submitBooking.isPending} onClick={() => step === 1 ? setStep(2) : submit()}>{step === 1 ? "Continue" : submitBooking.isPending ? "Sending…" : "Send request"} <ChevronRight size={18} /></button></MagneticButton></ClickSpark></div>}
    </div>
  </section>;
}

function TikTokIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true" className="social-logo social-logo--tiktok"><path d="M14.2 3.2c.3 2.2 1.5 3.5 3.7 3.7v2.8c-1.4.1-2.7-.3-3.7-1v6.4a5.1 5.1 0 1 1-4.4-5.1v2.9a2.3 2.3 0 1 0 1.6 2.2V3.2h2.8Z" fill="currentColor"/><path d="M15.1 3.2c.3 2.2 1.5 3.5 3.7 3.7" fill="none" stroke="#ff4f8b" strokeWidth="1.1" strokeLinecap="round"/><path d="M13.2 4.4v10.7a3.9 3.9 0 0 1-5.7 3.5" fill="none" stroke="#42e8ff" strokeWidth="1.1" strokeLinecap="round" opacity=".9"/></svg>;
}

function WhatsAppIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true" className="social-logo social-logo--whatsapp"><path d="M12 2.3a9.7 9.7 0 0 0-8.4 14.6L2.4 21.7l4.9-1.2A9.7 9.7 0 1 0 12 2.3Z" fill="currentColor"/><path d="M8.4 7.7c.2-.4.4-.4.7-.4h.5c.2 0 .4.1.5.4l.7 1.7c.1.3.1.5-.1.7l-.5.6c-.1.1-.2.3 0 .6.3.5 1.2 1.7 2.8 2.4.3.1.5.1.6-.1l.7-.8c.2-.2.4-.2.7-.1l1.6.8c.3.1.4.3.4.6 0 .8-.4 1.5-1 1.8-.6.3-1.4.2-2.2-.1-1.3-.5-2.9-1.6-4-2.8-1.1-1.2-1.8-2.6-2-3.5-.2-.8-.1-1.4.1-1.8Z" fill="#02161b"/></svg>;
}

function ContactFooter() {
  return <footer className="footer">
    <div className="footer-cta"><div><p className="eyebrow eyebrow--green">A clear first step</p><h2>Your exterior has more to <em>show.</em></h2></div><div className="footer-price"><span>Driveway cleaning</span><b>$100 base / 600–700 sq ft</b><small>Extra concrete over 700 sq ft: $0.14 / sq ft</small><span>Trash bin cleaning</span><b>$15 / bin</b></div><ClickSpark><MagneticButton><button className="button button--green" onClick={() => scrollToId("#booking")}>Book a transformation <ArrowDownRight size={18} /></button></MagneticButton></ClickSpark></div>
    <div className="footer-bottom"><a href="#top" className="footer-brand"><img src={ASSETS.logo} alt="Surface Craft Exterior Care" className="footer-brand__logo" /></a><div className="footer-contact"><a href="mailto:surfacecraftfrisco@gmail.com"><Mail size={16} /> surfacecraftfrisco@gmail.com</a><a href="tel:+19728809311"><Phone size={16} /> 972-880-9311</a><span className="service-area"><MapPin size={16} /> Serving Frisco, TX and surrounding areas.</span></div><div className="footer-nav">{navItems.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}</div><div className="footer-meta"><span>© 2026 Surface Craft</span><a href="https://www.instagram.com/surfacecraft1/" target="_blank" rel="noreferrer" aria-label="Instagram" title="Instagram"><Instagram size={17} /></a><a href="https://www.tiktok.com/@surface.craft" target="_blank" rel="noreferrer" aria-label="TikTok" title="TikTok"><TikTokIcon /></a><a href="https://www.facebook.com/share/14nPfyJ1an6/?mibextid=wwXIfr" target="_blank" rel="noreferrer" aria-label="Facebook" title="Facebook"><Facebook size={17} /></a><a href="https://wa.me/19728809311" target="_blank" rel="noreferrer" aria-label="WhatsApp" title="WhatsApp"><WhatsAppIcon /></a></div></div>
  </footer>;
}

export default function Home() {
  const [activeService, setActiveService] = useState<Service>("Driveway");
  return <main className="surface-craft"><CardNav /><aside className="particles-sidebar" aria-label="Page index"><WebGLParticles particleColors={["#D9D9D9", "#FFFFFF", "#C7C7C7"]} particleCount={350} particleSpread={8} speed={0.08} particleBaseSize={80} sizeRandomness={0.4} moveParticlesOnHover particleHoverFactor={0.6} alphaParticles pixelRatio={1.5} /><nav className="particles-sidebar__index"><strong>00</strong><i /><a href="#stories">01</a><a href="#services">02</a><a href="#booking">03</a></nav></aside><ScrollExpand /><StoriesSection /><ServicesSection service={activeService} setService={setActiveService} /><BookingFlow /><ContactFooter /></main>;
}
