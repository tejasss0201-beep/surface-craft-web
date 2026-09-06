/** Surface Craft — The Restoration Journal. Our Story page: candid, grounded, and community-minded. */
import { ArrowUpRight, ChevronLeft } from "lucide-react";

const ASSETS = {
  logo: "/manus-storage/surface-craft-user-logo_63e7e772.png",
  hero: "/manus-storage/surface-craft-hero_0e29b748.jpg",
  patio: "/manus-storage/surface-craft-patio_76dcd499.jpg",
};

const storyParagraphs = [
  "We are three sixteen-year-old high school students who decided we didn’t want to spend our time doing nothing. We wanted to build something real together. What started as a simple idea between friends quickly turned into a business that pushed us far beyond what we expected.",
  "The work is not easy. It is tiring, physical, and it is the kind of job adults do every day to support their families. Stepping into that world at our age has been challenging, but it has also taught us a lot about responsibility, consistency, and effort. Even when we are exhausted, we show up, we put in the work, and we take pride in the results. Every driveway we clean and every trash bin we wash reminds us that hard work matters more than age.",
  "Our goal is not just to run a small neighborhood service. We want to grow this into something people talk about, something known for dedication, reliability, and ambition. We want to expand, improve, and build a name that represents the effort we put into every job.",
  "This is only the beginning for us. With support from our community and belief in what we are creating, we know this project can become something much bigger. We are committed, we are learning fast, and we are excited for everything ahead.",
];

export default function OurStory() {
  return (
    <main className="detail-page">
      <header className="detail-nav">
        <a href="/" className="detail-brand"><img src={ASSETS.logo} alt="Surface Craft Exterior Care" className="detail-brand__logo" /></a>
        <a href="/" className="detail-back"><ChevronLeft size={16} /> Back to the journal</a>
      </header>
      <section className="detail-hero detail-hero--story">
        <div className="detail-hero-copy"><p className="eyebrow eyebrow--green">Surface Craft | Just The Start</p><h1>Our <em>Story.</em></h1><p>Three friends, one neighborhood, and the decision to build something real.</p></div>
        <figure className="detail-hero-image"><img src={ASSETS.hero} alt="A restored exterior at dusk" /><figcaption>Field note / The beginning</figcaption></figure>
      </section>
      <section className="detail-body detail-body--story">
        <div className="detail-body-aside"><span>Our Story</span><i /><span>01 — 04</span></div>
        <div className="detail-copy"><p className="detail-lede">We are three sixteen-year-old high school students who decided we didn’t want to spend our time doing nothing. We wanted to build something real together.</p>{storyParagraphs.slice(1).map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
        <figure className="detail-support-image"><img src={ASSETS.patio} alt="Natural stone patio with restored texture" /><figcaption>Material study / Work with what is already there.</figcaption></figure>
      </section>
      <section className="detail-cta"><p className="eyebrow eyebrow--green">A clear first step</p><h2>Let’s put the work <em>in motion.</em></h2><a className="button button--aqua" href="/#booking">Book a transformation <ArrowUpRight size={17} /></a></section>
    </main>
  );
}
