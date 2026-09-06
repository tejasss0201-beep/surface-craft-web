/** Surface Craft — The Restoration Journal. Service detail pages: clear scope, useful pricing, no filler. */
import { ArrowUpRight, Check, ChevronLeft, Droplets, ShieldCheck } from "lucide-react";

type ServiceKind = "trash" | "concrete";

const ASSETS = {
  logo: "/manus-storage/surface-craft-user-logo_63e7e772.png",
  driveway: "/manus-storage/surface-craft-driveway_0cacd7db.jpg",
  texture: "/manus-storage/surface-craft-texture_3966913e.jpg",
  trashBins: "/manus-storage/surface-craft-trashbin-cleaning-user_8bf47eb3.jpeg",
  residentialConcrete: "/manus-storage/surface-craft-concrete-cleaning-user_361a17f6.webp",
  concreteTexture: "/manus-storage/surface-craft-concrete-texture_f16e6ae1.webp",
};

const details: Record<ServiceKind, {
  eyebrow: string;
  title: string;
  intro: string;
  price: string;
  image: string;
  imageAlt: string;
  icon: typeof Droplets;
  includes: string[];
  sections: { title: string; copy: string }[];
}> = {
  trash: {
    eyebrow: "What We Offer",
    title: "Trashbin Cleaning",
    intro: "A small service that makes a visible difference. We wash and reset the part of the property that gets overlooked most often.",
    price: "$15 / bin",
    image: ASSETS.trashBins,
    imageAlt: "Residential trash bins being cleaned on a driveway",
    icon: ShieldCheck,
    includes: ["Per-bin pricing that is easy to understand", "A focused clean for household trash bins", "A simple add-on to a larger exterior-care visit"],
    sections: [
      { title: "Why it matters", copy: "Bins sit at the edge of the property, but they are part of the everyday rhythm of a home. Keeping them clean brings a little more care to the details people use every week." },
      { title: "How to book", copy: "Choose Trash bin cleaning in the booking flow, select the number of bins, and see the estimate update at $15 per bin before you send the request." },
    ],
  },
  concrete: {
    eyebrow: "What We Offer",
    title: "Concrete Surface Cleaning",
    intro: "Driveway cleaning with a clear starting point and an honest rule for additional concrete. The goal is a surface that feels like itself again.",
    price: "$100 base / 600–700 sq ft",
    image: ASSETS.residentialConcrete,
    imageAlt: "Concrete driveway restored after cleaning",
    icon: Droplets,
    includes: ["$100 base for a typical 600–700 sq ft driveway", "$0.14 per extra square foot above 700 sq ft", "Patios, siding, walkways, and other areas quoted as add-ons"],
    sections: [
      { title: "The base scope", copy: "A driveway around 600–700 square feet is covered by the $100 base price. If the concrete area extends beyond 700 square feet, the added area is calculated at $0.14 per extra square foot." },
      { title: "Beyond the driveway", copy: "If you would like other surfaces pressure washed, choose Other in the booking flow and describe the added scope. We will review those details and quote them separately." },
    ],
  },
};

export default function ServiceDetail({ kind }: { kind: ServiceKind }) {
  const detail = details[kind];
  const Icon = detail.icon;
  return (
    <main className="detail-page detail-page--service">
      <header className="detail-nav">
        <a href="/" className="detail-brand"><img src={ASSETS.logo} alt="Surface Craft Exterior Care" className="detail-brand__logo" /></a>
        <a href="/" className="detail-back"><ChevronLeft size={16} /> Back to the journal</a>
      </header>
      <section className="detail-hero detail-hero--service">
        <div className="detail-hero-copy"><p className="eyebrow eyebrow--green">{detail.eyebrow}</p><h1>{detail.title}</h1><p>{detail.intro}</p><div className="detail-price"><Icon size={18} /><strong>{detail.price}</strong></div><a className="button button--aqua" href="/#booking">Book this service <ArrowUpRight size={17} /></a></div>
        <figure className="detail-hero-image"><img src={detail.image} alt={detail.imageAlt} /><figcaption>Surface study / {kind === "trash" ? "The overlooked detail" : "Measured renewal"}</figcaption></figure>
      </section>
      <section className="detail-body detail-body--service">
        <div className="detail-body-aside"><span>What We Offer</span><i /><span>{kind === "trash" ? "01 — 03" : "01 — 04"}</span></div>
        <div className="detail-copy"><p className="detail-lede">What to expect from this part of the work.</p>{detail.sections.map((section) => <div className="detail-section-note" key={section.title}><h2>{section.title}</h2><p>{section.copy}</p></div>)}<ul className="detail-includes">{detail.includes.map((item) => <li key={item}><Check size={16} /><span>{item}</span></li>)}</ul></div>{kind === "concrete" && <figure className="detail-support-image"><img src={ASSETS.concreteTexture} alt="Close-up of dirty exposed-aggregate residential concrete before cleaning" /><figcaption>Material study / Existing concrete before renewal.</figcaption></figure>}
      </section>
      <section className="detail-cta"><p className="eyebrow eyebrow--green">A clearer scope</p><h2>See the estimate <em>before you begin.</em></h2><a className="button button--aqua" href="/#booking">Open the booking flow <ArrowUpRight size={17} /></a></section>
    </main>
  );
}

export function TrashBinsPage() {
  return <ServiceDetail kind="trash" />;
}

export function ConcreteCleaningPage() {
  return <ServiceDetail kind="concrete" />;
}
