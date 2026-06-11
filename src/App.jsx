import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import {
  ShieldPlus,
  Percent,
  Umbrella,
  Stamp,
  Plane,
  Globe2,
  Menu,
  X,
  Phone,
  Mail,
  ArrowRight,
  Check,
  MapPin,
} from "lucide-react";

/* ---- Brand Colors ---- */
const C = {
  ink: "#292432",
  lavender: "#ADA2CD",
  periwinkle: "#DFE0EF",
  sage: "#6A877B",
  pink: "#EEBABD",
  cream: "#F5F4EE",
};

/* ---- Compass Star (brand motif) ---- */
function Star({ size = 24, color = C.ink, className = "", style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className={className} style={style} aria-hidden="true">
      <path d="M50 2 L58 42 L98 50 L58 58 L50 98 L42 58 L2 50 L42 42 Z" fill={color} />
    </svg>
  );
}

/* ---- Logo ---- */
function Logo({ onClick }) {
  return (
    <button onClick={onClick} className="logo" aria-label="951 Services — inicio">
      <img src="/logos/LogoLetrasBlanco.png" alt="951 Services" className="logo-img" />
    </button>
  );
}

/* ---- Translations (ES / EN) ---- */
const T = {
  nav: { home: ["Inicio", "Home"], services: ["Servicios", "Services"], about: ["Nosotros", "About"], contact: ["Contacto", "Contact"] },
  hero: {
    eyebrow: ["Servicios financieros y legales · Los Ángeles, CA", "Financial & legal services · Los Angeles, CA"],
    title: ["Todo en un solo lugar.", "Everything in one place."],
    sub: [
      "En 951 Services acompañamos a tu familia en seguros, impuestos, viajes, notaría, vacaciones e inmigración. Soluciones claras, en tu idioma.",
      "At 951 Services we guide your family through insurance, taxes, travel, notary, vacations and immigration. Clear solutions, in your language.",
    ],
    cta: ["Ver servicios", "See services"],
    book: ["Agendar cita", "Book a visit"],
  },
  servicesHead: { kicker: ["Lo que hacemos", "What we do"], title: ["Seis servicios, un equipo", "Six services, one team"] },
  detail: {
    includes: ["Qué incluye", "What's included"],
    book: ["Agenda tu cita", "Book your appointment"],
    bookSub: ["Elige el día y la hora que mejor te queden.", "Pick the day and time that work best for you."],
    back: ["Todos los servicios", "All services"],
  },
  about: {
    kicker: ["Nosotros", "About us"],
    title: ["Tu socio de confianza", "Your trusted partner"],
    mission: ["Misión", "Mission"],
    vision: ["Visión", "Vision"],
    missionTxt: [
      "Simplificar y enriquecer la vida de nuestros clientes con soluciones personalizadas en servicios financieros y legales, con la más alta calidad, integridad y confianza.",
      "To simplify and enrich our clients' lives with personalized financial and legal solutions, delivered with the highest quality, integrity and trust.",
    ],
    visionTxt: [
      "Ser líderes reconocidos en servicios financieros y legales, el destino preferido para quienes buscan soluciones integrales y confiables a nivel local e internacional.",
      "To be recognized leaders in financial and legal services — the preferred destination for those seeking complete, reliable solutions, locally and internationally.",
    ],
  },
  contact: {
    kicker: ["Contacto", "Get in touch"],
    title: ["Hablemos", "Let's talk"],
    sub: ["¿Tienes una pregunta? Escríbenos o llámanos, te respondemos rápido.", "Have a question? Write or call us — we reply fast."],
    phone: ["Teléfono", "Phone"],
    email: ["Correo", "Email"],
    location: ["Ubicación", "Location"],
    rights: ["Todos los derechos reservados.", "All rights reserved."],
  },
};

/* ---- Services Data ---- */
const SERVICES = [
  {
    id: "insurance", icon: ShieldPlus, accent: C.sage,
    name: ["Seguros", "Insurance"],
    tag: ["Protege lo que más importa", "Protect what matters most"],
    desc: ["Cobertura de auto, hogar, vida y salud diseñada para tu familia y tu presupuesto.", "Auto, home, life and health coverage built around your family and your budget."],
    bullets: [["Seguro de auto", "Auto insurance"], ["Seguro de hogar", "Home insurance"], ["Seguro de vida", "Life insurance"], ["Seguro médico", "Health insurance"]],
    calendly: "",
  },
  {
    id: "taxes", icon: Percent, accent: C.lavender,
    name: ["Impuestos", "Taxes"],
    tag: ["Tu declaración, sin estrés", "Your return, stress-free"],
    desc: ["Preparación de impuestos personales y de negocio, con o sin ITIN, incluyendo años atrasados.", "Personal and business tax prep, with or without an ITIN, including back years."],
    bullets: [["Preparación de taxes", "Tax preparation"], ["Trámite de ITIN", "ITIN application"], ["Impuestos de negocio", "Business taxes"], ["Años atrasados", "Back-year filing"]],
    calendly: "",
  },
  {
    id: "vacations", icon: Umbrella, accent: C.pink,
    name: ["Vacaciones", "Vacations"],
    tag: ["El descanso que mereces", "The break you deserve"],
    desc: ["Planes y paquetes vacacionales a tu medida, con opciones de pago a plazos.", "Custom vacation plans and packages, with installment payment options."],
    bullets: [["Paquetes todo incluido", "All-inclusive packages"], ["Cruceros", "Cruises"], ["Grupos y familias", "Groups & families"], ["Pagos a plazos", "Installment plans"]],
    calendly: "",
  },
  {
    id: "notary", icon: Stamp, accent: C.ink,
    name: ["Notaría", "Notary"],
    tag: ["Tus documentos, en orden", "Your documents, in order"],
    desc: ["Servicios de notario público para certificar y firmar tus documentos importantes.", "Notary public services to certify and sign your important documents."],
    bullets: [["Certificación de documentos", "Document certification"], ["Cartas poder", "Power of attorney"], ["Affidávits", "Affidavits"], ["Toma de firmas", "Signature witnessing"]],
    calendly: "",
  },
  {
    id: "travel", icon: Plane, accent: C.sage,
    name: ["Viajes", "Travel"],
    tag: ["Solo disfruta el viaje", "Just enjoy the trip"],
    desc: ["Vuelos, hospedaje y seguro de viaje organizados para que solo pienses en disfrutar.", "Flights, lodging and travel insurance handled so you only think about enjoying."],
    bullets: [["Vuelos", "Flights"], ["Hoteles", "Hotels"], ["Seguro de viaje", "Travel insurance"], ["Itinerarios", "Itineraries"]],
    calendly: "",
  },
  {
    id: "immigration", icon: Globe2, accent: C.lavender,
    name: ["Inmigración", "Immigration"],
    tag: ["Acompañamiento paso a paso", "Step-by-step support"],
    desc: ["Apoyo en el llenado de formularios y trámites migratorios, con seguimiento de tus citas.", "Help filling out forms and immigration paperwork, with appointment tracking."],
    bullets: [["Llenado de formularios", "Form filling"], ["Renovaciones", "Renewals"], ["Citas y biométricos", "Appointments & biometrics"], ["Asesoría general", "General guidance"]],
    calendly: "",
  },
];

/* ---- Calendly Placeholder ---- */
function Calendly({ url, lang, accent }) {
  const ref = useRef(null);
  useEffect(() => {
    if (!url || !ref.current) return;
    const s = document.createElement("script");
    s.src = "https://assets.calendly.com/assets/external/widget.js";
    s.async = true;
    document.body.appendChild(s);
    return () => { try { document.body.removeChild(s); } catch (e) {} };
  }, [url]);

  if (url) {
    return <div ref={ref} className="calendly-inline-widget" data-url={url} style={{ minWidth: 320, height: 660 }} />;
  }
  return (
    <div className="cal-placeholder">
      <Star size={26} color={accent} />
      <p className="cal-ph-title">{lang === 0 ? "Aquí va tu calendario de Calendly" : "Your Calendly calendar goes here"}</p>
      <p className="cal-ph-sub">{lang === 0 ? "Pega el link de este servicio y la agenda aparece automáticamente." : "Drop in this service's link and the scheduler appears automatically."}</p>
    </div>
  );
}

/* ---- Service Card ---- */
function ServiceCard({ s, lang, onOpen, i }) {
  const Icon = s.icon;
  const onInk = s.accent === C.ink;
  return (
    <button className="card" style={{ background: s.accent, animationDelay: `${i * 60}ms` }} onClick={() => onOpen(s.id)}>
      <div className="card-icon" style={{ color: onInk ? C.cream : C.ink }}><Icon size={30} strokeWidth={1.6} /></div>
      <h3 className="card-name" style={{ color: onInk ? C.cream : C.ink }}>{s.name[lang]}</h3>
      <p className="card-tag" style={{ color: onInk ? C.periwinkle : C.ink, opacity: onInk ? 0.85 : 0.75 }}>{s.tag[lang]}</p>
      <span className="card-arrow" style={{ color: onInk ? C.cream : C.ink }}><ArrowRight size={18} /></span>
    </button>
  );
}

/* ---- Service Detail Page ---- */
function ServiceDetail({ s, lang, go }) {
  const Icon = s.icon;
  const onInk = s.accent === C.ink;
  return (
    <div className="detail">
      <div className="detail-hero" style={{ background: s.accent }}>
        <div className="wrap">
          <button className="back-link" style={{ color: onInk ? C.cream : C.ink }} onClick={() => go("home")}>← {T.detail.back[lang]}</button>
          <div className="detail-hero-row">
            <div className="detail-hero-icon" style={{ color: onInk ? C.cream : C.ink }}><Icon size={46} strokeWidth={1.4} /></div>
            <div>
              <h1 className="detail-title" style={{ color: onInk ? C.cream : C.ink }}>{s.name[lang]}</h1>
              <p className="detail-tag" style={{ color: onInk ? C.periwinkle : C.ink }}>{s.tag[lang]}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="wrap detail-body">
        <div className="detail-left">
          <p className="detail-desc">{s.desc[lang]}</p>
          <h2 className="detail-sub"><Star size={16} color={s.accent} /> {T.detail.includes[lang]}</h2>
          <ul className="detail-list">
            {s.bullets.map((b, i) => (
              <li key={i}>
                <span className="check" style={{ background: s.accent === C.ink ? C.lavender : s.accent }}><Check size={13} color={C.ink} strokeWidth={3} /></span>
                {b[lang]}
              </li>
            ))}
          </ul>
        </div>
        <div className="detail-right">
          <div className="book-card">
            <h3 className="book-title">{T.detail.book[lang]}</h3>
            <p className="book-sub">{T.detail.bookSub[lang]}</p>
            <Calendly url={s.calendly} lang={lang} accent={s.accent} />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---- Page: Home ---- */
function Home({ lang, go }) {
  return (
    <>
      <section className="hero">
        <Star size={420} color={C.lavender} className="hero-star" />
        <div className="wrap hero-inner">
          <p className="hero-eyebrow">{T.hero.eyebrow[lang]}</p>
          <h1 className="hero-title">{T.hero.title[lang]}</h1>
          <p className="hero-sub">{T.hero.sub[lang]}</p>
          <div className="hero-cta">
            <button className="btn btn-light" onClick={() => document.getElementById("svc")?.scrollIntoView({ behavior: "smooth" })}>
              {T.hero.cta[lang]} <ArrowRight size={17} />
            </button>
            <button className="btn btn-ghost" onClick={() => go("contact")}>{T.hero.book[lang]}</button>
          </div>
        </div>
      </section>
      <section className="svc-sec" id="svc">
        <div className="wrap">
          <div className="svc-head">
            <p className="kicker"><Star size={13} color={C.sage} /> {T.servicesHead.kicker[lang]}</p>
            <h2 className="sec-title">{T.servicesHead.title[lang]}</h2>
          </div>
          <div className="grid">
            {SERVICES.map((s, i) => <ServiceCard key={s.id} s={s} lang={lang} i={i} onOpen={go} />)}
          </div>
        </div>
      </section>
    </>
  );
}

/* ---- Page: About ---- */
function About({ lang }) {
  return (
    <section className="about">
      <div className="wrap">
        <p className="kicker"><Star size={13} color={C.pink} /> {T.about.kicker[lang]}</p>
        <h1 className="sec-title light">{T.about.title[lang]}</h1>
        <div className="about-grid">
          <div className="about-card" style={{ background: C.periwinkle }}>
            <h2>{T.about.mission[lang]}</h2>
            <p>{T.about.missionTxt[lang]}</p>
          </div>
          <div className="about-card" style={{ background: C.lavender }}>
            <h2>{T.about.vision[lang]}</h2>
            <p>{T.about.visionTxt[lang]}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---- Page: Contact ---- */
function Contact({ lang }) {
  return (
    <section className="contact">
      <div className="wrap">
        <p className="kicker"><Star size={13} color={C.sage} /> {T.contact.kicker[lang]}</p>
        <h1 className="sec-title light">{T.contact.title[lang]}</h1>
        <p className="contact-sub">{T.contact.sub[lang]}</p>
        <div className="contact-grid">
          <a className="contact-card" href="tel:+15624362064">
            <Phone size={22} color={C.ink} />
            <span className="cc-label">{T.contact.phone[lang]}</span>
            <span className="cc-val">+1 562 436 2064</span>
          </a>
          <a className="contact-card" href="mailto:951pacific@gmail.com">
            <Mail size={22} color={C.ink} />
            <span className="cc-label">{T.contact.email[lang]}</span>
            <span className="cc-val">951pacific@gmail.com</span>
          </a>
          <div className="contact-card">
            <MapPin size={22} color={C.ink} />
            <span className="cc-label">{T.contact.location[lang]}</span>
            <span className="cc-val">Los Angeles, California</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---- Footer ---- */
function Footer({ lang, go }) {
  return (
    <footer className="ftr">
      <div className="wrap ftr-row">
        <Logo onClick={() => go("home")} />
        <div className="ftr-links">
          {SERVICES.map((s) => <button key={s.id} onClick={() => go(s.id)}>{s.name[lang]}</button>)}
        </div>
        <p className="ftr-copy">© 2024 951 Services. {T.contact.rights[lang]}</p>
      </div>
    </footer>
  );
}

/* ---- Main App ---- */
export default function App() {
  const [lang, setLang] = useState(0);
  const [page, setPage] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);

  const go = (p) => { setPage(p); setMenuOpen(false); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const activeService = SERVICES.find((s) => s.id === page);

  return (
    <div className="app">
      {/* Header */}
      <header className="hdr">
        <div className="wrap hdr-row">
          <Logo onClick={() => go("home")} />
          <nav className={`nav ${menuOpen ? "open" : ""}`}>
            <button onClick={() => go("home")} className={page === "home" ? "act" : ""}>{T.nav.home[lang]}</button>
            <button onClick={() => go("about")} className={page === "about" ? "act" : ""}>{T.nav.about[lang]}</button>
            <button onClick={() => go("contact")} className={page === "contact" ? "act" : ""}>{T.nav.contact[lang]}</button>
            <div className="nav-services">
              <button className="nav-svc-label" onClick={() => go("home")}>{T.nav.services[lang]}</button>
              <div className="nav-dropdown">
                {SERVICES.map((s) => <button key={s.id} onClick={() => go(s.id)} className={page === s.id ? "act" : ""}>{s.name[lang]}</button>)}
              </div>
            </div>
          </nav>
          <div className="hdr-actions">
            <div className="lang">
              <button className={lang === 0 ? "on" : ""} onClick={() => setLang(0)}>ES</button>
              <span>/</span>
              <button className={lang === 1 ? "on" : ""} onClick={() => setLang(1)}>EN</button>
            </div>
            <a href="mailto:951pacific@gmail.com" className="ico-btn" aria-label="Email"><Mail size={18} /></a>
            <a href="tel:+15624362064" className="ico-btn" aria-label="Phone"><Phone size={18} /></a>
            <button className="burger" onClick={() => setMenuOpen((o) => !o)} aria-label="Menu">
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {page === "home" && <Home lang={lang} go={go} />}
      {activeService && <ServiceDetail s={activeService} lang={lang} go={go} />}
      {page === "about" && <About lang={lang} />}
      {page === "contact" && <Contact lang={lang} />}

      <Footer lang={lang} go={go} />
    </div>
  );
}