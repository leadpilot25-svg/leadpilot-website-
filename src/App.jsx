import React, { useState } from 'react';
import { Routes, Route, Link, NavLink, useLocation } from 'react-router-dom';
import { ArrowRight, Check, Menu, X, MessageCircle, Phone, Zap, Target, Clock3, BarChart3, ShieldCheck, ChevronDown, Send, Globe, ClipboardCheck, Workflow, Mail } from 'lucide-react';

const WA_NUMBER = '917736037807';
const SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL || '';

const industries = [
  ['Real Estate', 'Capture property enquiries and make sure every interested buyer gets a timely response.', 'real-estate'],
  ['Clinics & Healthcare', 'Organise appointment enquiries and follow up with prospective patients.', 'clinics'],
  ['Recruitment', 'Track employer and candidate enquiries without losing conversations.', 'recruitment'],
  ['Insurance', 'Keep policy enquiries organised and follow up on the next step.', 'insurance'],
  ['Home Services', 'Help HVAC, roofing, plumbing and other service teams respond faster.', 'home-services'],
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

function waLink(message='Hello LeadPilot, I would like to know more about your lead management service.') {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
}

function Logo() {
  return <Link to="/" className="brand" aria-label="LeadPilot home"><span className="brand-mark"><Workflow size={22}/></span><span>Lead<span className="brand-accent">Pilot</span></span></Link>;
}

function Header() {
  const [open,setOpen] = useState(false);
  const location = useLocation();
  React.useEffect(()=>setOpen(false),[location.pathname]);
  return <header className="header"><div className="container nav-wrap"><Logo/><nav className={open?'nav open':'nav'}>
    <NavLink to="/" end>Home</NavLink><NavLink to="/services">Services</NavLink><NavLink to="/industries">Industries</NavLink><NavLink to="/pricing">Pricing</NavLink><NavLink to="/blog">Blog</NavLink><NavLink to="/about">About</NavLink>
    <Link className="btn btn-small nav-cta" to="/contact">Free system audit <ArrowRight size={15}/></Link>
  </nav><button className="menu-btn" onClick={()=>setOpen(!open)} aria-label="Toggle menu">{open?<X/>:<Menu/>}</button></div></header>;
}

function Footer() {
  return <footer className="footer"><div className="container footer-grid"><div><Logo/><p className="footer-copy">Practical lead capture and follow-up systems for businesses that want fewer missed enquiries and a clearer next step.</p><a className="footer-wa" href={waLink()} target="_blank" rel="noreferrer"><MessageCircle size={17}/> WhatsApp: +91 77360 37807</a></div><div><h4>Explore</h4><Link to="/services">Services</Link><Link to="/industries">Industries</Link><Link to="/pricing">Pricing</Link><Link to="/blog">Blog</Link></div><div><h4>Get started</h4><Link to="/contact">Free system audit</Link><Link to="/about">About LeadPilot</Link><a href={waLink()} target="_blank" rel="noreferrer">WhatsApp us</a></div><div><h4>Our approach</h4><p>Simple tools. Clear follow-up. Practical support.</p><p className="small-muted">We do not publish fabricated reviews or customer results.</p></div></div><div className="container footer-bottom"><span>© {new Date().getFullYear()} LeadPilot. All rights reserved.</span><span>Built to help enquiries move forward.</span></div></footer>;
}

function ButtonLink({to='/contact',children='Get a free system audit',secondary=false}) {
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
    let sheetOk = false;
    if (SCRIPT_URL) {
      try {
        await fetch(SCRIPT_URL,{method:'POST',mode:'no-cors',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)});
        sheetOk = true;
      } catch(err) { console.error(err); }
    }
    const message = `Hello LeadPilot, I would like a free lead system audit.%0AName: ${encodeURIComponent(form.name)}%0ABusiness: ${encodeURIComponent(form.business)}%0APhone: ${encodeURIComponent(form.phone)}%0AEmail: ${encodeURIComponent(form.email)}%0AIndustry: ${encodeURIComponent(form.industry)}%0ADetails: ${encodeURIComponent(form.message)}`;
    setBusy(false);
    setStatus(SCRIPT_URL ? 'Your WhatsApp message is ready. Please tap Send in WhatsApp. The form has also been submitted to the Google Sheets endpoint.' : 'Your WhatsApp message is ready. Please tap Send in WhatsApp. Google Sheets is not connected yet; follow the setup guide to connect it.');
    window.open(`https://wa.me/${WA_NUMBER}?text=${message}`,'_blank','noopener,noreferrer');
    setForm({name:'',business:'',phone:'',email:'',industry:'',message:''});
  }
  return <form className={`lead-form ${compact?'compact':''}`} onSubmit={submit}>
    <div className="form-heading"><span className="eyebrow">LET'S TALK</span><h3>Request your free system audit</h3><p>Tell us a little about your business. We'll help identify where enquiries may be getting missed.</p></div>
    <div className="form-grid">
      <label>Your name *<input name="name" required value={form.name} onChange={update} placeholder="Your name"/></label>
      <label>Business name *<input name="business" required value={form.business} onChange={update} placeholder="Business name"/></label>
      <label>Phone / WhatsApp *<input name="phone" required value={form.phone} onChange={update} placeholder="+91..." /></label>
      <label>Email address<input name="email" type="email" value={form.email} onChange={update} placeholder="you@company.com"/></label>
      <label className="full">Industry<select name="industry" value={form.industry} onChange={update}><option value="">Choose your industry</option>{industries.map(i=><option key={i[2]}>{i[0]}</option>)}<option>Other</option></select></label>
      <label className="full">What would you like help with?<textarea name="message" rows="3" value={form.message} onChange={update} placeholder="Tell us about your enquiry and follow-up process..."/></label>
    </div>
    <button className="btn form-submit" disabled={busy}>{busy?'Preparing...':'Send enquiry'} <Send size={16}/></button>
    {status&&<p className="form-status" role="status">{status}</p>}
    <p className="form-note">Submitting opens WhatsApp so you can review and send your message. Please do not include sensitive personal or medical information.</p>
  </form>;
}

function Home() {
  return <>
    <section className="hero"><div className="container hero-grid"><div className="hero-copy"><span className="eyebrow light"><span className="pulse"></span> LEAD CAPTURE • FOLLOW-UP • CLARITY</span><h1>Every enquiry deserves a <span>next step.</span></h1><p>LeadPilot helps service businesses capture enquiries, respond faster and follow up consistently—with simple systems built around the way you work.</p><div className="hero-actions"><ButtonLink/><ButtonLink to="/services" secondary>Explore our services</ButtonLink></div><div className="hero-trust"><span><Check size={16}/> Practical setup</span><span><Check size={16}/> Simple to use</span><span><Check size={16}/> Human support</span></div></div>
      <div className="hero-visual"><div className="visual-glow"></div><div className="dashboard-card"><div className="dash-top"><div><span className="dash-label">LEADPILOT OVERVIEW</span><h3>Enquiry workspace</h3></div><span className="live-dot">● Demo view</span></div><div className="dash-stats"><div><span>New enquiries</span><strong>24</strong><small>This is sample data</small></div><div><span>Follow-ups due</span><strong>08</strong><small>Illustrative only</small></div></div><div className="dash-list"><div className="dash-list-head"><b>Recent enquiries</b><span>Sample records</span></div>{[['Aarav M.','Property enquiry','New'],['Nisha K.','Appointment request','Follow-up'],['Daniel R.','Service estimate','Contacted']].map((r,i)=><div className="dash-row" key={r[0]}><span className="avatar">{r[0][0]}</span><div><b>{r[0]}</b><small>{r[1]}</small></div><em className={`tag tag-${i}`}>{r[2]}</em></div>)}</div><div className="dash-foot"><span><ShieldCheck size={15}/> A clearer process</span><span><BarChart3 size={15}/> One place to track</span></div></div><div className="float-card"><span className="float-icon"><MessageCircle size={19}/></span><div><b>Follow-up made simpler</b><small>Know what needs attention next</small></div></div></div></div></section>
    <section className="section intro"><div className="container intro-grid"><div><span className="eyebrow">THE EVERYDAY PROBLEM</span><h2>Enquiries come in.<br/><span className="text-blue">Then what happens?</span></h2></div><div><p className="lead">When calls, forms, WhatsApp messages and spreadsheets are scattered, it becomes harder to see who needs a reply and what should happen next.</p><p>LeadPilot helps bring the important steps together—so your team can work from a simple, visible process instead of relying on memory.</p></div></div></section>
    <section className="section soft"><div className="container"><div className="section-head center"><span className="eyebrow">WHAT WE HELP WITH</span><h2>A practical system for your <span className="text-blue">next customer.</span></h2><p>Start with the essentials. Add more only when your business needs it.</p></div><div className="feature-grid">{[[Target,'Capture enquiries','Collect enquiries from your website and direct channels in a more organised way.'],[Clock3,'Follow up on time','Make next actions visible, so callbacks and messages are less likely to be forgotten.'],[BarChart3,'See the pipeline','Understand which enquiries are new, contacted, progressing or closed.'],[Workflow,'Connect simple tools','Use familiar tools such as Google Sheets and WhatsApp in a practical workflow.']].map(([Icon,title,desc])=><article className="feature-card" key={title}><span className="feature-icon"><Icon size={22}/></span><h3>{title}</h3><p>{desc}</p></article>)}</div></div></section>
    <section className="section"><div className="container"><div className="section-head"><span className="eyebrow">BUILT AROUND YOUR INDUSTRY</span><h2>One clear process.<br/><span className="text-blue">Different business needs.</span></h2></div><div className="industry-grid">{industries.slice(0,6).map((it,i)=><Link to={`/industries/${it[2]}`} className="industry-card" key={it[2]}><span className="industry-num">0{i+1}</span><h3>{it[0]}</h3><p>{it[1]}</p><span className="text-link">Explore solution <ArrowRight size={15}/></span></Link>)}</div></div></section>
    <section className="section dark-band"><div className="container band-grid"><div><span className="eyebrow light">SIMPLE BY DESIGN</span><h2>You don't need a complicated CRM to get organised.</h2><p>We help you put a useful enquiry and follow-up process in place, with straightforward tools your team can actually use.</p><ButtonLink/></div><div className="band-points"><div><Check/> Clear enquiry capture</div><div><Check/> Follow-up reminders and visibility</div><div><Check/> Simple reporting</div><div><Check/> Setup guidance and support</div></div></div></section>
    <section className="section"><div className="container cta-panel"><div><span className="eyebrow">TAKE THE FIRST STEP</span><h2>Let's find the gaps in your enquiry process.</h2><p>Request a free, no-obligation lead system audit. We'll discuss your current process and practical improvements.</p></div><ButtonLink/></div></section>
  </>;
}

function PageHero({eyebrow,title,desc}) { return <section className="page-hero"><div className="container"><span className="eyebrow light">{eyebrow}</span><h1>{title}</h1><p>{desc}</p></div></section>; }

function Services() {
  const list=[['Lead capture setup','Create a clear way to collect enquiries from your website and selected channels.'],['Follow-up workflow','Define who responds, what happens next and how follow-ups are tracked.'],['Google Sheets automation','Use a structured Google Sheet to organise enquiry details and status updates.'],['WhatsApp hand-off','Make it easy for a visitor to start a WhatsApp conversation with your business.'],['Landing page creation','A focused service page that explains your offer and makes it easy to enquire.'],['Google Business Profile support','Improve the completeness and clarity of your business profile.']];
  return <><PageHero eyebrow="SERVICES" title="A simpler way to manage business enquiries." desc="Lead capture, follow-up workflows and practical digital setup—designed for small and growing service businesses."/><section className="section"><div className="container"><div className="service-grid">{list.map(([t,d],i)=><article className="service-card" key={t}><span className="service-index">0{i+1}</span><h3>{t}</h3><p>{d}</p></article>)}</div><div className="note-panel"><ShieldCheck/><div><b>Built around your existing workflow</b><p>We start by understanding how enquiries arrive today. We recommend only the tools and steps that make sense for your business.</p></div></div></div></section><section className="section soft"><div className="container split-cta"><div><span className="eyebrow">NOT SURE WHERE TO START?</span><h2>Start with a free system audit.</h2><p>We'll help you identify a useful first improvement before you commit to a setup.</p></div><ButtonLink/></div></section></>;
}

function Industries() {
  return <><PageHero eyebrow="INDUSTRIES" title="Lead follow-up that fits your business." desc="Different businesses receive different types of enquiries. We help shape a straightforward process around your customers and team."/><section className="section"><div className="container"><div className="industry-grid large">{industries.map((it,i)=><Link to={`/industries/${it[2]}`} className="industry-card" key={it[2]}><span className="industry-num">0{i+1}</span><h3>{it[0]}</h3><p>{it[1]}</p><span className="text-link">View industry solution <ArrowRight size={15}/></span></Link>)}</div></div></section></>;
}

function IndustryDetail({slug}) {
  const item=industries.find(i=>i[2]===slug);
  if(!item) return <NotFound/>;
  const name=item[0];
  return <><PageHero eyebrow={`${name.toUpperCase()} SOLUTION`} title={`A clearer enquiry process for ${name.toLowerCase()}.`} desc={item[1]}/><section className="section"><div className="container detail-grid"><div><span className="eyebrow">THE OPPORTUNITY</span><h2>Make the next action easier to see.</h2><p className="lead">Your team may already be using calls, WhatsApp and spreadsheets. The challenge is making sure every enquiry has an owner and a next step.</p><ul className="check-list"><li><Check/> Capture contact details and enquiry context</li><li><Check/> Keep enquiry status visible</li><li><Check/> Record the next follow-up action</li><li><Check/> Review open enquiries regularly</li></ul><ButtonLink/></div><div className="detail-card"><span className="eyebrow">A SIMPLE WORKFLOW</span>{['Enquiry received','Details recorded','Team member responds','Next step scheduled','Outcome updated'].map((s,i)=><div className="workflow-step" key={s}><span>{i+1}</span><b>{s}</b></div>)}</div></div></section><section className="section soft"><div className="container"><div className="section-head center"><h2>Let's shape the right setup for your team.</h2><p>We'll learn how your enquiries arrive and recommend a practical starting point.</p><ButtonLink/></div></div></section></>;
}

function Pricing() {
  return <><PageHero eyebrow="STRAIGHTFORWARD PRICING" title="Start with what your business needs." desc="A clear setup price, optional ongoing support and no surprise hosting charge for the website hosting included in this offer."/><section className="section"><div className="container pricing-grid"><article className="price-card"><span className="eyebrow">ONE-TIME SETUP</span><h2>LeadPilot Starter</h2><div className="price">₹3,999 <small>one time</small></div><p>For businesses that need a focused enquiry capture and follow-up foundation.</p><ul className="check-list"><li><Check/> Enquiry landing page setup</li><li><Check/> Lead capture form</li><li><Check/> Google Sheets connection setup</li><li><Check/> WhatsApp enquiry hand-off</li><li><Check/> Basic setup guidance</li></ul><ButtonLink/></article><article className="price-card featured"><span className="price-ribbon">OPTIONAL SUPPORT</span><span className="eyebrow light">MONTHLY CARE PLAN</span><h2>LeadPilot Care</h2><div className="price">₹2,000 <small>/ month</small></div><p>Ongoing assistance to help keep your setup useful as your business changes.</p><ul className="check-list light-list"><li><Check/> Routine checks and minor updates</li><li><Check/> Help with workflow questions</li><li><Check/> Basic content and form adjustments</li><li><Check/> Monthly review of the process</li><li><Check/> Support by email or WhatsApp</li></ul><ButtonLink/></article></div><div className="container pricing-notes"><p><b>Custom domain:</b> Domain registration is a separate paid add-on if you choose a paid domain. A free subdomain may be used where available and approved.</p><p><b>Hosting:</b> Website hosting on the Vercel free plan is included subject to Vercel's plan limits and terms. Domain ownership, paid services and third-party charges are not included.</p><p><b>Scope:</b> Final deliverables and any additional integrations are confirmed before work begins.</p></div></div></section></>;
}

const articleBodies = {
 'respond-to-leads-faster': ['A new enquiry is a sign that someone is interested enough to contact your business. If the reply is delayed, the person may continue looking elsewhere or simply forget why they reached out.','A faster response does not require a large team or expensive software. Start by choosing one place where new enquiries are recorded, assigning someone to check it, and setting a realistic response target during business hours.','Use a short checklist: record the name and contact details, understand what the person needs, reply with a useful next step, and schedule a follow-up if they are not ready.','Review open enquiries at the start and end of each working day. A simple status such as New, Contacted, Follow-up Due or Closed can make outstanding work easier to see.','The goal is not to send more messages. It is to make each response timely, relevant and helpful.'],
 'google-sheets-lead-tracker': ['A lead tracker should make it easy to answer three questions: who contacted us, what do they need, and what should happen next? Google Sheets can be a useful starting point for a small team.','Create columns for date received, name, phone or email, enquiry source, requirement, assigned person, status, next follow-up date and notes. Keep the headings clear and avoid collecting information you do not need.','Use a small set of consistent statuses. For example: New, Contacted, Follow-up Due, Qualified, Not Interested and Won. Consistency makes filtering and reporting more useful.','Protect access to the sheet and share it only with people who need it. Avoid putting sensitive customer information into a general-purpose tracker.','A spreadsheet works best when someone owns the daily process. If several people edit it, agree who updates status and how follow-ups are assigned.'],
 'real-estate-lead-follow-up': ['Property enquiries can arrive through listing portals, calls, websites and WhatsApp. Without a shared record, it can be difficult to remember which property a person asked about or when they should be contacted again.','Record the enquiry date, customer contact, property reference, preferred location, budget range if voluntarily provided, source and assigned agent. Capture only details that are relevant to the enquiry.','After the first response, record the next action. It may be sharing property details, arranging a viewing or checking whether the customer wants more options.','Use a follow-up date rather than relying on memory. Review enquiries that are due and update the status after each meaningful conversation.','A simple, consistent process can help agents provide a more professional experience without turning every conversation into a complicated admin task.'],
 'clinic-enquiry-management': ['Clinics may receive appointment enquiries through phone calls, website forms and messaging apps. A simple process can help staff see which enquiries have been answered and which need a callback.','Keep the enquiry tracker limited to administrative details such as contact information, requested service category, preferred appointment time and callback status. Do not use a general marketing sheet to store medical records or sensitive clinical information.','Agree who monitors new enquiries and what information can be shared through each channel. Staff should direct clinical questions to an appropriately qualified healthcare professional.','Use a clear status such as New, Callback Needed, Appointment Requested or Closed. Record the next administrative action and review it during the day.','The best system is one that respects patient privacy while making routine communication more reliable.'],
 'missed-call-follow-up': ['A missed call does not always mean a lost customer, but it is an opportunity to follow up professionally. Customers may be calling while your team is serving someone else, travelling or outside normal working hours.','Set a simple routine: check missed calls, return the call when practical, and if appropriate send a short message identifying your business and asking how you can help.','Record the date, number, outcome and next action in your normal enquiry tracker. Avoid repeatedly contacting someone who has not asked for further communication.','If you use an automated message, make it clear, accurate and easy for the recipient to understand. Do not imply that a person has already spoken with your business when they have not.','A small callback habit can improve the customer experience and help your team understand how many enquiries need attention.'],
 'lead-management-for-recruiters': ['Recruitment teams handle conversations with both employers and candidates. These are different relationships and should be tracked with clear categories so the next action is not missed.','For employer prospects, record the organisation, hiring requirement, contact person, source and next follow-up. For candidates, use an appropriate recruitment system with access controls and clear retention practices.','Agree who owns each employer conversation and when it should be reviewed. Use short notes focused on business-relevant next steps rather than unnecessary personal details.','A weekly pipeline review can help the team see new prospects, active discussions, pending feedback and closed opportunities.','The aim is to improve visibility and consistency, not to replace sound judgement or respectful communication.'],
 'whatsapp-business-follow-up': ['WhatsApp can be a convenient channel when a customer chooses to contact your business there. It works best when messages are relevant, expected and easy to understand.','Identify your business clearly, refer to the enquiry where appropriate and keep the message concise. Give the person a clear next step, such as replying with a suitable time to talk.','Respect customer preferences. Do not add people to promotional lists or send repeated marketing messages without an appropriate basis and consent. Follow WhatsApp policies and applicable privacy and marketing rules.','Keep a record of the enquiry status in your business tracker, but avoid copying sensitive information into places where it does not belong.','Use messaging to make service easier—not to pressure people. A useful follow-up should help the customer decide what they want to do next.'],
 'when-to-use-a-simple-crm': ['A spreadsheet can work well when one person manages a modest number of enquiries. As volume grows, several people may need to update records, assign tasks and understand the status of each opportunity.','Common signs that you may need a CRM include duplicate records, unclear ownership, forgotten follow-ups, difficulty finding conversation history and no reliable view of the pipeline.','Before choosing software, write down the process you need. Decide what information to capture, which statuses matter, who can see records and what reports are genuinely useful.','Avoid buying a large platform just because it has many features. A tool that your team understands and updates consistently is often more useful than a complex system that nobody maintains.','Start with the smallest setup that solves the current problem. Review it after a few weeks and add features only when there is a clear reason.']
};

function Blog() {
  return <><PageHero eyebrow="LEADPILOT RESOURCES" title="Practical ideas for better lead follow-up." desc="Straightforward guidance for small businesses that want to organise enquiries and build more consistent customer communication."/><section className="section"><div className="container blog-grid">{posts.map((p,i)=><Link className="blog-card" to={`/blog/${p.slug}`} key={p.slug}><span className="blog-category">{p.category}</span><span className="blog-number">ARTICLE 0{i+1}</span><h3>{p.title}</h3><p>{p.desc}</p><span className="blog-meta">{p.date} <ArrowRight size={15}/></span></Link>)}</div></section></>;
}

function BlogPost({slug}) {
  const post=posts.find(p=>p.slug===slug);
  if(!post) return <NotFound/>;
  return <><PageHero eyebrow={post.category.toUpperCase()} title={post.title} desc={post.desc}/><article className="section"><div className="container article-wrap"><div className="article-meta">LeadPilot Resource · {post.date}</div>{(articleBodies[slug]||[]).map((para,i)=><p key={i}>{para}</p>)}<div className="article-cta"><h3>Want a clearer process for your business?</h3><p>Talk to LeadPilot about a practical lead capture and follow-up setup.</p><ButtonLink/></div><Link className="text-link" to="/blog">← Back to all articles</Link></div></article></>;
}

function About() {
  return <><PageHero eyebrow="ABOUT LEADPILOT" title="Simple systems for real business work." desc="We believe small businesses deserve practical tools and clear processes—not unnecessary complexity."/><section className="section"><div className="container about-grid"><div><span className="eyebrow">OUR APPROACH</span><h2>Make the everyday work easier to manage.</h2><p className="lead">LeadPilot focuses on the steps between a customer showing interest and your business responding with a helpful next action.</p><p>That can mean a clearer enquiry form, a structured Google Sheet, a WhatsApp hand-off or a simple follow-up routine. We aim to keep the setup understandable and useful for the people who use it every day.</p></div><div className="about-values"><div><Target/><b>Practical first</b><span>Start with the real problem.</span></div><div><ShieldCheck/><b>Clear and honest</b><span>No invented reviews or unsupported promises.</span></div><div><Workflow/><b>Keep it simple</b><span>Use only the tools that help.</span></div></div></div></section></>;
}

function Contact() {
  return <><PageHero eyebrow="CONTACT LEADPILOT" title="Tell us where enquiries get stuck." desc="Request a free lead system audit. We'll discuss your current process and suggest a practical next step."/><section className="section"><div className="container contact-grid"><div><span className="eyebrow">CONTACT DETAILS</span><h2>Let's start a conversation.</h2><p>Prefer WhatsApp? Send us a message directly and tell us what your business needs.</p><a className="contact-line" href={waLink()} target="_blank" rel="noreferrer"><MessageCircle/> +91 77360 37807</a><a className="contact-line" href="mailto:hello@leadpilot.in"><Mail/> hello@leadpilot.in <small>(replace if you use another email)</small></a><div className="privacy-note"><ShieldCheck/><span>Only share information needed to discuss your business enquiry. Do not submit sensitive personal or medical information.</span></div></div><LeadForm/></div></section></>;
}

function NotFound() { return <div className="section container not-found"><h1>Page not found</h1><p>The page you're looking for may have moved.</p><ButtonLink to="/">Return home</ButtonLink></div>; }

function App() {
  return <><Header/><main><Routes><Route path="/" element={<Home/>}/><Route path="/services" element={<Services/>}/><Route path="/industries" element={<Industries/>}/>{industries.map(i=><Route key={i[2]} path={`/industries/${i[2]}`} element={<IndustryDetail slug={i[2]}/>}/>)}<Route path="/pricing" element={<Pricing/>}/><Route path="/blog" element={<Blog/>}/>{posts.map(p=><Route key={p.slug} path={`/blog/${p.slug}`} element={<BlogPost slug={p.slug}/>}/>)}<Route path="/about" element={<About/>}/><Route path="/contact" element={<Contact/>}/><Route path="*" element={<NotFound/>}/></Routes></main><Footer/><a className="floating-wa" href={waLink()} target="_blank" rel="noreferrer" aria-label="Chat with LeadPilot on WhatsApp"><MessageCircle size={24}/></a></>;
}
export default App;