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
  return <Link to="/" className="brand" aria-label="LeadPilot home"><img src="/images/leadpilot-wordmark.png" alt="LeadPilot" style={{width:'145px',height:'auto',display:'block'}} /></Link>;
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
