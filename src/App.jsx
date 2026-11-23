import React, { useState } from 'react';
import { Routes, Route, Link, NavLink, useLocation } from 'react-router-dom';
import { ArrowRight, Check, Menu, X, MessageCircle, Target, Clock3, BarChart3, ShieldCheck, Send, Workflow, Mail } from 'lucide-react';

const WA_NUMBER = '917736037807';
const SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL || '';

const industries = [
  ['Clinics & Healthcare', 'Organise appointment enquiries and follow up with prospective patients without missing callbacks.', 'clinics'],
  ['HVAC & Home Services', 'Help AC repair, HVAC, roofing and plumbing teams capture urgent jobs and respond faster.', 'home-services'],
  ['Real Estate', 'Capture property enquiries and make sure every interested buyer gets a timely response.', 'real-estate'],
  ['Recruitment', 'Track employer and candidate enquiries without losing conversations.', 'recruitment'],
  ['Insurance', 'Keep policy enquiries organised and follow up on the next step.', 'insurance'],
  ['Small Businesses', 'A practical enquiry-to-customer process for growing local businesses.', 'small-business']
];

const posts = [
  {slug:'respond-to-leads-faster',title:'Why responding to leads quickly matters for small businesses',category:'Lead Management',desc:'A practical look at enquiry response time and the simple process that helps businesses avoid missed opportunities.',date:'5 min read'},
  {slug:'google-sheets-lead-tracker',title:'How to build a simple lead tracker in Google Sheets',category:'Google Sheets',desc:'The essential columns and follow-up habits for a useful, easy-to-maintain lead tracker.',date:'6 min read'},
  {slug:'real-estate-lead-follow-up',title:'A better follow-up process for real estate enquiries',category:'Real Estate',desc:'Organise buyer enquiries, property interest and next actions in one straightforward workflow.',date:'5 min read'},
  {slug:'clinic-enquiry-management',title:'How clinics can organise appointment enquiries',category:'Healthcare',desc:'A simple enquiry process for clinics that want to respond consistently and reduce forgotten callbacks.',date:'5 min read'},
  {slug:'missed-call-follow-up',title:'What to do when your business misses a call',category:'Lead Management',desc:'A practical callback and message workflow for busy service businesses.',date:'4 min read'},
  {slug:'lead-management-for-recruiters',title:'Lead management tips for recruitment agencies',category:'Recruitment',desc:'Keep employer prospects, candidate conversations and next steps visible to the team.',date:'5 min read'},
  {slug:'whatsapp-business-follow-up',title:'Using WhatsApp responsibly for customer follow-up',category:'WhatsApp',desc:'Make follow-up useful, timely and respectful with clear customer expectations.',date:'5 min read'},
  {slug:'when-to-use-a-simple-crm',title:'When does a small business need a CRM?',category:'CRM',desc:'Signs that a spreadsheet is no longer enough—and how to choose a tool without overcomplicating things.',date:'6 min read'}
];

function waLink(message='Hello LeadPilot, I would like to see a 2-minute live demo of your enquiry and follow-up system.') {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
}

function Logo() {
  return (
    <Link to="/" className="brand" aria-label="LeadPilot home">
      <img
        src="/images/leadpilot-full-logo-optimized.jpg"
        alt="LeadPilot"
        style={{
          width: '78px',
          height: '78px',
          objectFit: 'contain',
          display: 'block'
        }}
      />
    </Link>
  );
}

function Header() {
  const [open,setOpen] = useState(false);
  const location = useLocation();
  React.useEffect(()=>setOpen(false),[location.pathname]);
  return <header className="header"><div className="container nav-wrap"><Logo/><nav className={open?'nav open':'nav'}>
    <NavLink to="/" end>Home</NavLink><NavLink to="/services">Services</NavLink><NavLink to="/industries">Industries</NavLink><NavLink to="/pricing">Pricing</NavLink><NavLink to="/blog">Blog</NavLink><NavLink to="/about">About</NavLink>
    <a className="btn btn-small nav-cta" href={waLink()} target="_blank" rel="noreferrer">Live Demo <ArrowRight size={15}/></a>
  </nav><button className="menu-btn" onClick={()=>setOpen(!open)} aria-label="Toggle menu">{open?<X/>:<Menu/>}</button></div></header>;
}

function Footer() {
  return <footer className="footer"><div className="container footer-grid"><div><Logo/><p className="footer-copy">Practical lead capture, starter enquiry pages, and WhatsApp follow-up systems for local service businesses.</p><a className="footer-wa" href={waLink()} target="_blank" rel="noreferrer"><MessageCircle size={17}/> WhatsApp: +91 77360 37807</a></div><div><h4>Explore</h4><Link to="/services">Services</Link><Link to="/industries">Industries</Link><Link to="/pricing">Pricing</Link><Link to="/blog">Blog</Link></div><div><h4>Get started</h4><Link to="/contact">Request setup</Link><Link to="/about">About LeadPilot</Link><a href={waLink()} target="_blank" rel="noreferrer">WhatsApp live demo</a></div><div><h4>Our approach</h4><p>Simple tools. Clear follow-up. One-time setup.</p><p className="small-muted">Hosted on fast Cloudflare infrastructure with zero monthly hosting fees on our standard subdomain.</p></div></div><div className="container footer-bottom"><span>© {new Date().getFullYear()} LeadPilot. All rights reserved.</span><span>Built to help enquiries move forward.</span></div></footer>;
}

function ButtonLink({to='/contact',children='See a 2-Minute Live Demo',secondary=false,href=null}) {
  if (href) {
    return <a className={`btn ${secondary?'btn-outline':''}`} href={href} target="_blank" rel="noreferrer">{children} {!secondary&&<ArrowRight size={17}/>}</a>;
  }
  return <Link className={`btn ${secondary?'btn-outline':''}`} to={to}>{children} {!secondary&&<ArrowRight size={17}/>}</Link>;
}

function LeadForm({compact=false}) {
  const [form,setForm] = useState({name:'',business:'',phone:'',email:'',industry:'',message:''});
  const [status,setStatus] = useState('');
  const [busy,setBusy] = useState(false);
  const update = e => setForm({...form,[e.target.name]:e.target.value});
  async function submit(e) {
    e.preventDefault(); setBusy(true); setStatus('');
    const payload = {...form, source:'LeadPilot website', submittedAt:new Date().toISOString()};
    if (SCRIPT_URL) {
      try {
        await fetch(SCRIPT_URL,{method:'POST',mode:'no-cors',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)});
      } catch(err) { console.error(err); }
    }
    const message = `Hello LeadPilot, I would like to set up LeadPilot for my business.%0AName: ${encodeURIComponent(form.name)}%0ABusiness: ${encodeURIComponent(form.business)}%0APhone: ${encodeURIComponent(form.phone)}%0AEmail: ${encodeURIComponent(form.email)}%0AIndustry: ${encodeURIComponent(form.industry)}%0ADetails: ${encodeURIComponent(form.message)}`;
    setBusy(false);
    setStatus('Your WhatsApp message is ready. Please tap Send in WhatsApp to confirm your details.');
    window.open(`https://wa.me/${WA_NUMBER}?text=${message}`,'_blank','noopener,noreferrer');
    setForm({name:'',business:'',phone:'',email:'',industry:'',message:''});
  }
  return <form className={`lead-form ${compact?'compact':''}`} onSubmit={submit}>
    <div className="form-heading"><span className="eyebrow">LET'S GET STARTED</span><h3>Book your LeadPilot setup or demo</h3><p>Tell us a little about your business. We'll show you how your enquiries and follow-ups will work.</p></div>
    <div className="form-grid">
      <label>Your name *<input name="name" required value={form.name} onChange={update} placeholder="Your name"/></label>
      <label>Business name *<input name="business" required value={form.business} onChange={update} placeholder="Clinic or company name"/></label>
      <label>Phone / WhatsApp *<input name="phone" required value={form.phone} onChange={update} placeholder="+91..." /></label>
      <label>Email address<input name="email" type="email" value={form.email} onChange={update} placeholder="you@company.com"/></label>
      <label className="full">Industry<select name="industry" value={form.industry} onChange={update}><option value="">Choose your industry</option>{industries.map(i=><option key={i[2]}>{i[0]}</option>)}<option>Other</option></select></label>
      <label className="full">Do you already have a website?<textarea name="message" rows="3" value={form.message} onChange={update} placeholder="Tell us if you need the Starter Enquiry Page + LeadPilot bundle or LeadPilot only..."/></label>
    </div>
    <button className="btn form-submit" disabled={busy}>{busy?'Preparing...':'Continue to WhatsApp'} <Send size={16}/></button>
    {status&&<p className="form-status" role="status">{status}</p>}
    <p className="form-note">Submitting opens WhatsApp so you can send your enquiry directly. Please do not include sensitive personal or medical records.</p>
  </form>;
}

function ProductScreenshots() {
  const screenshots = [
    { src: '/images/crm-dashboard.png', alt: 'LeadPilot CRM dashboard', title: 'CRM Dashboard', desc: 'A clear overview of enquiries and daily follow-up activity.' },
    { src: '/images/lead-list.png', alt: 'LeadPilot lead list', title: 'Lead Management', desc: 'Keep every customer enquiry organised in one place.' },
    { src: '/images/lead-details-whatsapp.png', alt: 'LeadPilot lead details and WhatsApp actions', title: 'Lead Details & 1-Tap WhatsApp', desc: 'Review an enquiry and send a follow-up message in seconds.' },
    { src: '/images/lead-import.png', alt: 'LeadPilot lead import screen', title: 'Lead Import', desc: 'Bring existing customer enquiries into your workflow easily.' },
    { src: '/images/follow-up-schedule.png', alt: 'LeadPilot follow-up schedule', title: 'Follow-up Schedule', desc: 'See exactly which callbacks and messages are due today.' }
  ];

  return <>
    <style>{`
      .lp-screenshot-section { background: #f7f9fc; }
      .lp-screenshot-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 22px; margin-top: 34px; }
      .lp-screenshot-card { min-width: 0; overflow: hidden; border: 1px solid #e3e9f1; border-radius: 16px; background: #fff; box-shadow: 0 8px 24px rgba(12, 28, 54, .06); }
      .lp-screenshot-card:first-child { grid-column: 1 / -1; }
      .lp-screenshot-image { display: block; width: 100%; height: auto; aspect-ratio: 16 / 9; object-fit: contain; background: #101827; }
      .lp-screenshot-copy { padding: 18px 20px 20px; }
      .lp-screenshot-copy h3 { margin: 0 0 7px; }
      .lp-screenshot-copy p { margin: 0; }
      @media (max-width: 640px) {
        .lp-screenshot-grid { grid-template-columns: 1fr; gap: 16px; }
        .lp-screenshot-card:first-child { grid-column: auto; }
        .lp-screenshot-copy { padding: 15px; }
      }
    `}</style>
    <section className="section lp-screenshot-section">
      <div className="container">
        <div className="section-head center">
          <span className="eyebrow">A LOOK INSIDE LEADPILOT</span>
          <h2>See LeadPilot <span className="text-blue">in action.</span></h2>
          <p>Explore the tools that keep enquiries, customer details and follow-ups organised.</p>
        </div>
        <div className="lp-screenshot-grid">
          {screenshots.map(item => <article className="lp-screenshot-card" key={item.src}>
            <img className="lp-screenshot-image" src={item.src} alt={item.alt} loading="lazy" />
            <div className="lp-screenshot-copy"><h3>{item.title}</h3><p>{item.desc}</p></div>
          </article>)}
        </div>
      </div>
    </section>
  </>;
}

function PricingSection() {
  return (
    <section className="section" id="pricing">
      <div className="container">
        <div className="section-head center">
          <span className="eyebrow">STRAIGHTFORWARD PRICING</span>
          <h2>One-time setup. <span className="text-blue">Zero hosting fees.</span></h2>
          <p>No bloated SaaS subscriptions or per-user seat fees. Pay once to launch your enquiry system.</p>
        </div>
        <div className="pricing-grid">
          <article className="price-card featured">
            <span className="price-ribbon">MOST POPULAR • NO WEBSITE NEEDED</span>
            <span className="eyebrow light">COMPLETE STARTER BUNDLE</span>
            <h2>Enquiry Page + LeadPilot</h2>
            <div className="price"><span style={{textDecoration:'line-through',opacity:0.65,fontSize:'0.7em'}}>₹4,999</span> ₹3,999 <small>one time</small></div>
            <p><b>November Launch Offer:</b> ₹3,999 one-time setup (regular ₹4,999) through Nov 30, 2026. Ideal for clinics &amp; HVAC businesses without a website.</p>
            <ul className="check-list light-list">
              <li><Check/> Mobile-ready Starter Enquiry Page (works like your mini-website)</li>
              <li><Check/> Free fast Cloudflare hosting &amp; SSL included</li>
              <li><Check/> Full LeadPilot CRM &amp; Google Sheets automation</li>
              <li><Check/> 1-tap WhatsApp follow-up workflow</li>
              <li><Check/> Unlimited team members (no per-user charges)</li>
            </ul>
            <a className="btn" href={waLink('Hello LeadPilot, I want to claim the Enquiry Page + LeadPilot one-time setup offer.')} target="_blank" rel="noreferrer">Claim Starter Bundle on WhatsApp <ArrowRight size={17}/></a>
          </article>

          <article className="price-card">
            <span className="eyebrow">OPTIONAL ONGOING SUPPORT</span>
            <h2>LeadPilot Care Plan</h2>
            <div className="price">₹2,000 <small>/ month (optional)</small></div>
            <p>Only if you want hands-on monthly updates, new offer sections, and workflow adjustments as your business grows.</p>
            <ul className="check-list">
              <li><Check/> Routine checks and page/form updates</li>
              <li><Check/> New WhatsApp message templates</li>
              <li><Check/> Monthly enquiry &amp; follow-up process review</li>
              <li><Check/> Priority support on WhatsApp &amp; email</li>
              <li><Check/> Cancel anytime—your setup stays yours</li>
            </ul>
            <a className="btn btn-outline" href={waLink('Hello LeadPilot, I would like to ask a question about LeadPilot setup and custom domains.')} target="_blank" rel="noreferrer">Ask a Question on WhatsApp</a>
          </article>
        </div>

        <div className="pricing-notes">
          <p><b>Free Cloudflare Subdomain Included:</b> Every Enquiry Page includes fast global hosting and SSL on a Cloudflare subdomain at zero monthly hosting cost.</p>
          <p><b>Custom Domain (Optional Add-On):</b> Want your own branded <code>.in</code> or <code>.com</code> domain? Available separately at <b>₹1,500/year</b> (domain registration + DNS connection).</p>
          <p><b>Google Business Profile Setup (Optional Add-On):</b> Need your Google listing cleaned up and linked to WhatsApp? Add on for <b>₹1,999 one-time</b>.</p>
        </div>
      </div>
    </section>
  );
}

function Home() {
  return <>
    <section className="hero"><div className="container hero-grid"><div className="hero-copy"><span className="eyebrow light"><span className="pulse"></span> LEAD CAPTURE • FOLLOW-UP • CLARITY</span><h1>Every enquiry deserves a <span>next step.</span></h1><p>LeadPilot helps clinics, HVAC teams, and local service businesses capture every website and WhatsApp enquiry automatically—and follow up on time.</p><div className="hero-actions"><ButtonLink href={waLink()}/><ButtonLink to="/pricing" secondary>View ₹3,999 starter offer</ButtonLink></div><div className="hero-trust"><span><Check size={16}/> One-time setup</span><span><Check size={16}/> Free Cloudflare hosting</span><span><Check size={16}/> No per-user fees</span></div></div>
      <div className="hero-visual"><div className="visual-glow"></div><div className="dashboard-card"><div className="dash-top"><div><span className="dash-label">LEADPILOT OVERVIEW</span><h3>Enquiry workspace</h3></div><span className="live-dot">● Sample Preview</span></div><div className="dash-stats"><div><span>New enquiries</span><strong>24</strong></div><div><span>Follow-ups due</span><strong>08</strong></div></div><div className="dash-list"><div className="dash-list-head"><b>Recent enquiries</b></div>{[['Aarav M.','Dental consultation','New'],['Nisha K.','AC repair & gas refill','Follow-up'],['Daniel R.','3BHK site visit','Contacted']].map((r,i)=><div className="dash-row" key={r[0]}><span className="avatar">{r[0][0]}</span><div><b>{r[0]}</b><small>{r[1]}</small></div><em className={`tag tag-${i}`}>{r[2]}</em></div>)}</div><div className="dash-foot"><span><ShieldCheck size={15}/> Zero missed callbacks</span><span><BarChart3 size={15}/> One place to track</span></div></div><div className="float-card"><span className="float-icon"><MessageCircle size={19}/></span><div><b>Follow-up made simpler</b><small>Know what needs attention next</small></div></div></div></div></section>
    <section className="section intro"><div className="container intro-grid"><div><span className="eyebrow">THE EVERYDAY PROBLEM</span><h2>Enquiries come in.<br/><span className="text-blue">Then what happens?</span></h2></div><div><p className="lead">When calls, forms, WhatsApp messages and spreadsheets are scattered, enquiries slip through the cracks and customers book with whoever replies first.</p><p>LeadPilot brings your enquiry page, Google Sheets tracker, and WhatsApp follow-ups together—so your team works from one clear list instead of memory.</p></div></div></section>
    <section className="section soft"><div className="container"><div className="section-head center"><span className="eyebrow">HOW LEADPILOT WORKS</span><h2>Everything you need to capture and close your <span className="text-blue">next customer.</span></h2><p>Built for busy owners and front-desk teams—no technical skills required.</p></div><div className="feature-grid">{[[Target,'Capture every enquiry','Capture website, ad, and WhatsApp enquiries automatically in one organised place.'],[Clock3,'Follow up on time','Make next actions visible so no callback or WhatsApp follow-up slips through the cracks.'],[BarChart3,'See your pipeline','Know instantly which enquiries are new, contacted, awaiting follow-up, or closed.'],[Workflow,'Starter Enquiry Page included','No website yet? We launch a fast, mobile-ready mini-website on Cloudflare connected straight to LeadPilot.']].map(([Icon,title,desc])=><article className="feature-card" key={title}><span className="feature-icon"><Icon size={22}/></span><h3>{title}</h3><p>{desc}</p></article>)}</div></div></section>
    <ProductScreenshots/>
    <section className="section"><div className="container"><div className="section-head"><span className="eyebrow">BUILT AROUND YOUR INDUSTRY</span><h2>One clear process.<br/><span className="text-blue">Different business needs.</span></h2></div><div className="industry-grid">{industries.slice(0,6).map((it,i)=><Link to={`/industries/${it[2]}`} className="industry-card" key={it[2]}><span className="industry-num">0{i+1}</span><h3>{it[0]}</h3><p>{it[1]}</p><span className="text-link">Explore solution <ArrowRight size={15}/></span></Link>)}</div></div></section>
    <PricingSection/>
    <section className="section dark-band"><div className="container band-grid"><div><span className="eyebrow light">SIMPLE BY DESIGN</span><h2>You don't need an expensive CRM to stop losing leads.</h2><p>Get a fast enquiry page and a practical follow-up system your staff can start using the same day.</p><ButtonLink href={waLink()}/></div><div className="band-points"><div><Check/> Starter Enquiry Page on Cloudflare</div><div><Check/> Clear follow-up reminders &amp; status tracking</div><div><Check/> 1-tap WhatsApp reply templates</div><div><Check/> Hands-on setup and staff walkthrough</div></div></div></section>
  </>;
}

function PageHero({eyebrow,title,desc}) { return <section className="page-hero"><div className="container"><span className="eyebrow light">{eyebrow}</span><h1>{title}</h1><p>{desc}</p></div></section>; }

function Services() {
  const list=[
    ['Lead capture setup','Capture every website, ad, and WhatsApp enquiry automatically in one place.'],
    ['Follow-up workflow','Define who responds, what happens next, and ensure no callback slips through the cracks.'],
    ['Google Sheets automation','Use a clean, structured Google Sheet connected to your CRM view for live status updates.'],
    ['WhatsApp hand-off','Let visitors start a pre-filled WhatsApp enquiry in one tap and reply using quick templates.'],
    ['Starter Enquiry Page (For Businesses Without a Website)','A fast, mobile-ready mini-website hosted on Cloudflare that presents your services and sends leads straight into LeadPilot.']
  ];
  return <><PageHero eyebrow="SERVICES" title="A simpler way to capture and follow up on enquiries." desc="Core LeadPilot follow-up workflows plus a mobile Starter Enquiry Page for clinics, HVAC teams, and service businesses without a website."/><section className="section"><div className="container"><div className="service-grid">{list.map(([t,d],i)=><article className="service-card" key={t}><span className="service-index">0{i+1}</span><h3>{t}</h3><p>{d}</p></article>)}</div><div className="note-panel"><ShieldCheck/><div><b>Optional Starter Add-Ons Available</b><p>Need a custom <code>.in</code> / <code>.com</code> domain (₹1,500/year) or Google Business Profile optimisation (₹1,999 one-time)? Ask during your demo and we can include them in your setup.</p></div></div></div></section><section className="section soft"><div className="container split-cta"><div><span className="eyebrow">SEE IT IN 2 MINUTES</span><h2>Want to see how it works for your business?</h2><p>Message us on WhatsApp for a quick walkthrough tailored to your workflow.</p></div><ButtonLink href={waLink()}/></div></section></>;
}

function Industries() {
  return <><PageHero eyebrow="INDUSTRIES" title="Lead follow-up that fits your business." desc="Different businesses receive different types of enquiries. We help shape a straightforward process around your customers and team."/><section className="section"><div className="container"><div className="industry-grid large">{industries.map((it,i)=><Link to={`/industries/${it[2]}`} className="industry-card" key={it[2]}><span className="industry-num">0{i+1}</span><h3>{it[0]}</h3><p>{it[1]}</p><span className="text-link">View industry solution <ArrowRight size={15}/></span></Link>)}</div></div></section></>;
}

function IndustryDetail({slug}) {
  const item=industries.find(i=>i[2]===slug);
  if(!item) return <NotFound/>;
  const name=item[0];
  return <><PageHero eyebrow={`${name.toUpperCase()} SOLUTION`} title={`A clearer enquiry process for ${name.toLowerCase()}.`} desc={item[1]}/><section className="section"><div className="container detail-grid"><div><span className="eyebrow">THE OPPORTUNITY</span><h2>Make the next action easier to see.</h2><p className="lead">Your team may already be using calls, WhatsApp and spreadsheets. The challenge is making sure every enquiry has an owner and a next step—especially if you don't have a website yet.</p><ul className="check-list"><li><Check/> Capture contact details and enquiry context automatically</li><li><Check/> Optional Starter Enquiry Page on Cloudflare if you have no website</li><li><Check/> Record the next follow-up date and time</li><li><Check/> Reply faster with 1-tap WhatsApp templates</li></ul><ButtonLink href={waLink(`Hello LeadPilot, I run a ${name} business and would like to see a live demo.`)}/></div><div className="detail-card"><span className="eyebrow">A SIMPLE WORKFLOW</span>{['Enquiry received from page or WhatsApp','Details recorded automatically','Team member responds on WhatsApp','Next follow-up scheduled','Status updated to booked'].map((s,i)=><div className="workflow-step" key={s}><span>{i+1}</span><b>{s}</b></div>)}</div></div></section><section className="section soft"><div className="container"><div className="section-head center"><h2>Let's shape the right setup for your team.</h2><p>Get started with our one-time setup and zero monthly hosting fees.</p><ButtonLink to="/pricing">View pricing &amp; setup</ButtonLink></div></div></section></>;
}

function Pricing() {
  return <><PageHero eyebrow="STRAIGHTFORWARD PRICING" title="One-time setup. Zero hosting fees." desc="Start with our complete Enquiry Page + LeadPilot setup on Cloudflare, with optional monthly support and separate custom domain pricing."/><PricingSection/></>;
}

const articleBodies = {
  'respond-to-leads-faster': [
    'A new enquiry is a sign that someone is interested in your business. Responding quickly helps you provide a better customer experience.',
    'Choose one place to record new enquiries, assign someone to check it and set a realistic response target.',
    'Record contact details, understand the requirement, reply with a useful next step and schedule follow-up when needed.'
  ],
  'google-sheets-lead-tracker': [
    'A lead tracker should show who contacted you, what they need and what should happen next.',
    'Create columns for date, name, phone, email, enquiry source, assigned person, status and follow-up date.',
    'Use consistent statuses such as New, Contacted, Follow-up Due, Qualified and Closed.'
  ],
  'real-estate-lead-follow-up': [
    'Property enquiries can arrive through listing portals, calls, websites and WhatsApp.',
    'Record the enquiry date, customer contact, property reference, preferred location and assigned agent.',
    'Set a follow-up date and update the status after each meaningful conversation.'
  ],
  'clinic-enquiry-management': [
    'Clinics receive appointment enquiries through calls, website forms and messaging apps.',
    'Keep enquiry trackers limited to administrative details such as contact information and callback status.',
    'Do not store medical records or sensitive clinical information in a general marketing sheet.'
  ],
  'missed-call-follow-up': [
    'A missed call is an opportunity to follow up professionally.',
    'Check missed calls, return calls when practical and send a short message when appropriate.',
    'Record the outcome and next action. Avoid repeatedly contacting people who do not want further communication.'
  ],
  'lead-management-for-recruiters': [
    'Recruitment teams handle conversations with employers and candidates.',
    'Record employer requirements, contact details, enquiry source and next follow-up.',
    'Use appropriate access controls and retention practices for candidate information.'
  ],
  'whatsapp-business-follow-up': [
    'WhatsApp is convenient when customers choose to contact your business there.',
    'Identify your business clearly and keep messages relevant, expected and concise.',
    'Respect customer preferences and follow applicable privacy and messaging rules.'
  ],
  'when-to-use-a-simple-crm': [
    'A spreadsheet can work well when one person manages a modest number of enquiries.',
    'You may need a CRM when duplicate records, forgotten follow-ups and unclear ownership become common.',
    'Choose the smallest system that solves your current business problem.'
  ]
};

function Blog() {
  return <><PageHero eyebrow="LEADPILOT RESOURCES" title="Practical ideas for better lead follow-up." desc="Straightforward guidance for small businesses that want to organise enquiries and build more consistent customer communication."/><section className="section"><div className="container blog-grid">{posts.map((p,i)=><Link className="blog-card" to={`/blog/${p.slug}`} key={p.slug}><span className="blog-category">{p.category}</span><span className="blog-number">ARTICLE 0{i+1}</span><h3>{p.title}</h3><p>{p.desc}</p><span className="blog-meta">{p.date} <ArrowRight size={15}/></span></Link>)}</div></section></>;
}

function BlogPost({slug}) {
  const post=posts.find(p=>p.slug===slug);
  if(!post) return <NotFound/>;
  return <><PageHero eyebrow={post.category.toUpperCase()} title={post.title} desc={post.desc}/><article className="section"><div className="container article-wrap"><div className="article-meta">LeadPilot Resource · {post.date}</div>{(articleBodies[slug]||[]).map((para,i)=><p key={i}>{para}</p>)}<div className="article-cta"><h3>Want a clearer process for your business?</h3><p>Talk to LeadPilot about a practical enquiry page and follow-up setup.</p><ButtonLink href={waLink()}/></div><Link className="text-link" to="/blog">← Back to all articles</Link></div></article></>;
}

function About() {
  return <><PageHero eyebrow="ABOUT LEADPILOT" title="Simple systems for real business work." desc="We believe small businesses deserve practical tools and clear processes—not unnecessary complexity."/><section className="section"><div className="container about-grid"><div><span className="eyebrow">OUR APPROACH</span><h2>Make the everyday work easier to manage.</h2><p className="lead">LeadPilot focuses on the steps between a customer showing interest and your business responding with a helpful next action.</p><p>Whether you need a fast Starter Enquiry Page on Cloudflare or a structured Google Sheets &amp; WhatsApp follow-up routine, we keep the setup simple and useful for the people using it every day.</p></div><div className="about-values"><div><Target/><b>Practical first</b><span>Start with the real problem.</span></div><div><ShieldCheck/><b>Clear and honest</b><span>Transparent one-time setup pricing.</span></div><div><Workflow/><b>Keep it simple</b><span>Use only the tools that help.</span></div></div></div></section></>;
}

function Contact() {
  return <><PageHero eyebrow="CONTACT LEADPILOT" title="Tell us where enquiries get stuck." desc="Message us on WhatsApp or fill out the quick form below to get started with your LeadPilot setup."/><section className="section"><div className="container contact-grid"><div><span className="eyebrow">CONTACT DETAILS</span><h2>Let's start a conversation.</h2><p>Prefer WhatsApp? Tap below to message us directly and see a 2-minute live demo.</p><a className="contact-line" href={waLink()} target="_blank" rel="noreferrer"><MessageCircle/> +91 77360 37807</a><a className="contact-line" href="mailto:leadpilot25@gmail.com"><Mail/> leadpilot25@gmail.com</a><div className="privacy-note"><ShieldCheck/><span>Only share information needed to discuss your business enquiry. Do not submit sensitive personal or medical information.</span></div></div><LeadForm/></div></section></>;
}

function NotFound() { return <div className="section container not-found"><h1>Page not found</h1><p>The page you're looking for may have moved.</p><ButtonLink to="/">Return home</ButtonLink></div>; }

function App() {
  return <><Header/><main><Routes><Route path="/" element={<Home/>}/><Route path="/services" element={<Services/>}/><Route path="/industries" element={<Industries/>}/>{industries.map(i=><Route key={i[2]} path={`/industries/${i[2]}`} element={<IndustryDetail slug={i[2]}/>}/>)}<Route path="/pricing" element={<Pricing/>}/><Route path="/blog" element={<Blog/>}/>{posts.map(p=><Route key={p.slug} path={`/blog/${p.slug}`} element={<BlogPost slug={p.slug}/>}/>)}<Route path="/about" element={<About/>}/><Route path="/contact" element={<Contact/>}/><Route path="*" element={<NotFound/>}/></Routes></main><Footer/><a className="floating-wa" href={waLink()} target="_blank" rel="noreferrer" aria-label="Chat with LeadPilot on WhatsApp"><MessageCircle size={24}/></a></>;
}
export default App;
