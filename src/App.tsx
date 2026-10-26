import { useMemo, useState, type FormEvent, type ReactNode } from 'react'
import { Link, NavLink, Route, Routes, useLocation, useParams } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowDownRight, ArrowLeft, ArrowRight, ArrowUpRight, Asterisk, AtSign, CalendarDays,
  Check, ChevronDown, Code2, ExternalLink, Facebook, Filter, Heart, Instagram,
  Linkedin, Mail, Menu, MessageCircle, MoveUpRight, Search, Sparkles, X, BookOpen,
  Users, BriefcaseBusiness, Palette, Globe2, Send, Quote, Play, Download
} from 'lucide-react'
import { articles, events, projects, socialLinks, team, testimonials } from './data'

const navItems = [
  { label: 'About', to: '/about' },
  { label: 'Team', to: '/team' },
  { label: 'Projects', to: '/projects' },
  { label: 'Public projects', to: '/public-projects' },
  { label: 'Events & media', to: '/events-media' },
  { label: 'Blog', to: '/blog' },
  { label: 'Brand kit', to: '/brand-guidelines' },
]

function Logo({ inverse = false }: { inverse?: boolean }) {
  return <Link to="/" className={`brand-lockup ${inverse ? 'brand-lockup-inverse' : ''}`} aria-label="WiT Community home">
    <span className="brand-wordmark">Wi<span>T</span></span>
    <span className="brand-caption">COMMUNITY</span>
  </Link>
}

function Header() {
  const [open, setOpen] = useState(false)
  const [moreOpen, setMoreOpen] = useState(false)
  const location = useLocation()
  const isMoreActive = ['/public-projects', '/events-media', '/brand-guidelines'].includes(location.pathname)
  return <header className="site-header">
    <div className="header-inner">
      <Logo />
      <nav className="desktop-nav" aria-label="Main navigation">
        <NavLink to="/about" className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>About</NavLink>
        <NavLink to="/team" className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>Team</NavLink>
        <NavLink to="/projects" className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>Projects</NavLink>
        <div className="nav-dropdown-wrap">
          <button className={`nav-link nav-dropdown-trigger ${isMoreActive ? 'active' : ''}`} onClick={() => setMoreOpen(v => !v)} aria-expanded={moreOpen}>
            Explore <ChevronDown size={14} />
          </button>
          <AnimatePresence>
            {moreOpen && <motion.div className="nav-dropdown" initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} exit={{opacity:0,y:8}}>
              <Link to="/public-projects" onClick={() => setMoreOpen(false)}>Public projects <ArrowUpRight size={14}/></Link>
              <Link to="/events-media" onClick={() => setMoreOpen(false)}>Events & media <ArrowUpRight size={14}/></Link>
              <Link to="/blog" onClick={() => setMoreOpen(false)}>The WIT journal <ArrowUpRight size={14}/></Link>
              <Link to="/brand-guidelines" onClick={() => setMoreOpen(false)}>Brand kit <ArrowUpRight size={14}/></Link>
              <Link to="/testimonials" onClick={() => setMoreOpen(false)}>Community voices <ArrowUpRight size={14}/></Link>
            </motion.div>}
          </AnimatePresence>
        </div>
      </nav>
      <div className="header-actions">
        <a className="header-social" href={socialLinks.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={17}/></a>
        <a className="button button-dark button-small" href={socialLinks.whatsapp} target="_blank" rel="noreferrer">Join the community <ArrowUpRight size={15}/></a>
        <button className="mobile-menu-button" aria-label={open ? 'Close menu' : 'Open menu'} onClick={() => setOpen(v => !v)}>{open ? <X/> : <Menu/>}</button>
      </div>
    </div>
    <AnimatePresence>
      {open && <motion.nav className="mobile-nav" initial={{height:0,opacity:0}} animate={{height:'auto',opacity:1}} exit={{height:0,opacity:0}} aria-label="Mobile navigation">
        {[{label:'Home',to:'/'},...navItems,{label:'Testimonials',to:'/testimonials'},{label:'Contact',to:'/contact'}].map(item => <Link key={item.to} to={item.to} onClick={() => setOpen(false)}>{item.label}<ArrowUpRight size={15}/></Link>)}
        <a href={socialLinks.whatsapp} target="_blank" rel="noreferrer" className="button button-dark">Join the community <ArrowUpRight size={15}/></a>
      </motion.nav>}
    </AnimatePresence>
  </header>
}

function Footer() {
  return <footer className="site-footer">
    <div className="footer-top">
      <div className="footer-brand">
        <Logo inverse />
        <p>A full-of-energy space for women in tech.<br/>Come as you are. Grow as you go.</p>
        <div className="social-row">
          <a href={socialLinks.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={17}/></a>
          <a href={socialLinks.instagram} target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram size={17}/></a>
          <a href={socialLinks.facebook} target="_blank" rel="noreferrer" aria-label="Facebook"><Facebook size={17}/></a>
          <a href={socialLinks.whatsapp} target="_blank" rel="noreferrer" aria-label="WhatsApp"><MessageCircle size={17}/></a>
        </div>
      </div>
      <div className="footer-links">
        <span className="footer-label">EXPLORE</span>
        <Link to="/about">About WIT</Link><Link to="/team">Meet the team</Link><Link to="/projects">Projects</Link><Link to="/events-media">Events & media</Link>
      </div>
      <div className="footer-links">
        <span className="footer-label">GET INVOLVED</span>
        <Link to="/public-projects">Public projects</Link><Link to="/blog">The WIT journal</Link><Link to="/contact">Contact us</Link><a href={socialLinks.whatsapp} target="_blank" rel="noreferrer">Join the WhatsApp group <ArrowUpRight size={13}/></a>
      </div>
      <div className="footer-note">
        <span className="footer-label">A LITTLE REMINDER</span>
        <p className="footer-bigline">You don't have<br/>to know it all<br/><em>to belong.</em></p>
        <Asterisk className="footer-star" size={38}/>
      </div>
    </div>
    <div className="footer-bottom"><span>© {new Date().getFullYear()} WiT Community. Made for the people building what’s next.</span><Link to="/brand-guidelines">Brand guidelines <ArrowUpRight size={13}/></Link><span className="demo-label">DEMO WEBSITE · CONTENT TO VERIFY</span></div>
  </footer>
}

function PageIntro({eyebrow, title, description, number}: {eyebrow:string;title:ReactNode;description:string;number?:string}) {
  return <section className="page-intro section-shell">
    <div className="eyebrow"><span className="eyebrow-dot"/>{eyebrow}</div>
    <h1>{title}</h1>
    <div className="page-intro-bottom"><p>{description}</p>{number && <span className="page-number">{number} / WIT</span>}</div>
    <div className="intro-decoration"><Asterisk size={70}/></div>
  </section>
}

function SectionHeading({eyebrow, title, description, link, linkText}: {eyebrow:string;title:ReactNode;description?:string;link?:string;linkText?:string}) {
  return <div className="section-heading">
    <div><div className="eyebrow"><span className="eyebrow-dot"/>{eyebrow}</div><h2>{title}</h2>{description && <p>{description}</p>}</div>
    {link && <Link className="text-link" to={link}>{linkText || 'Explore more'} <ArrowUpRight size={17}/></Link>}
  </div>
}

function BrandPattern({className=''}:{className?:string}) {
  return <div className={`brand-pattern ${className}`} aria-hidden="true"><span/><span/><span/><span/><i/></div>
}

function Home() {
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  return <>
    <section className="hero section-shell">
      <div className="hero-topline"><span><span className="live-dot"/> SRI LANKA · WOMEN IN TECHNOLOGY</span><span className="hero-index">A COMMUNITY IN MOTION <Asterisk size={17}/></span></div>
      <div className="hero-content">
        <div className="hero-copy">
          <div className="eyebrow"><span className="eyebrow-dot"/> YOUR PEOPLE. YOUR POSSIBILITIES.</div>
          <h1>Tech is better<br/>when <span className="scribble-word">we’re</span><br/><em>in it together.</em></h1>
          <p className="hero-description">A vibrant space for women in tech to connect, share what they’re learning, ask the real questions, and grow without pretending to have it all figured out.</p>
          <div className="hero-actions">
            <a className="button button-dark" href={socialLinks.whatsapp} target="_blank" rel="noreferrer">Find your people <ArrowUpRight size={17}/></a>
            <Link className="button button-outline" to="/about">Get to know WIT <ArrowRight size={17}/></Link>
          </div>
          <div className="hero-footnote"><span className="avatar-stack"><b>W</b><b>i</b><b>T</b></span><span>Curious minds. Real conversations.<br/><strong>Room for your next chapter.</strong></span></div>
        </div>
        <div className="hero-art">
          <div className="hero-art-frame">
            <img src="/images/wit-brand-portrait.jpg" alt="WIT brand artwork featuring a confident woman" />
            <div className="hero-art-sticker sticker-top"><Asterisk size={31}/><span>BE<br/>CURIOUS</span></div>
            <div className="hero-art-sticker sticker-bottom"><span>NOT HERE TO<br/>PLAY SMALL</span><ArrowDownRight size={24}/></div>
            <div className="hero-art-caption"><span>01 / COMMUNITY</span><span>BUILT TOGETHER ↗</span></div>
          </div>
          <div className="hero-orbit orbit-one"><span>W</span></div>
          <div className="hero-orbit orbit-two"><Asterisk size={38}/></div>
          <div className="hero-side-note">A LITTLE WIT.<br/>A LOT OF HEART.</div>
        </div>
      </div>
      <div className="hero-bottomline"><span>LEARN OUT LOUD</span><span>MAKE ROOM</span><span>BUILD EACH OTHER UP</span><span className="hero-bottom-right">SCROLL A LITTLE <ArrowDownRight size={15}/></span></div>
    </section>

    <section className="manifesto-section">
      <div className="section-shell manifesto-grid">
        <div className="manifesto-label"><span className="eyebrow"><span className="eyebrow-dot"/> THE WIT IDEA</span><Asterisk size={50}/></div>
        <div className="manifesto-copy"><h2>Ambitious without the intimidation.<br/><em>Supportive without the stuffy.</em></h2><p>WIT is a sisterhood for women in tech who want to grow, connect, and thrive. A place to bring the half-formed idea, the big question, the career plot twist—and be met with curiosity, not judgement.</p><Link className="text-link" to="/about">A little more about us <ArrowUpRight size={17}/></Link></div>
        <div className="manifesto-art"><div className="manifesto-grid-art"></div><div className="manifesto-art-card"><span>WIT / NOTE TO SELF</span><strong>You belong<br/>before you<br/>feel ready.</strong><Asterisk size={45}/></div></div>
      </div>
    </section>

    <section className="section-shell values-section section-padding">
      <SectionHeading eyebrow="WHAT WE MAKE ROOM FOR" title={<>Big energy.<br/><em>Better together.</em></>} description="Not another room where you have to prove you belong. A community where growth happens through connection." />
      <div className="value-grid">
        <article className="value-card value-card-purple"><span className="card-index">01 / CONNECT</span><div className="value-icon"><Users size={26}/></div><h3>Find your<br/>people.</h3><p>Meet women navigating the same industry—with different stories, skills, and perspectives to share.</p><Asterisk className="value-spark" size={56}/></article>
        <article className="value-card value-card-pink"><span className="card-index">02 / GROW</span><div className="value-icon"><Code2 size={26}/></div><h3>Keep getting<br/>curious.</h3><p>Swap ideas, ask the questions, learn out loud, and find your next challenge with a little support.</p><div className="value-ring"><span>LEARN<br/>UNLEARN<br/>RELEARN</span></div></article>
        <article className="value-card value-card-yellow"><span className="card-index">03 / THRIVE</span><div className="value-icon"><Sparkles size={26}/></div><h3>Make room<br/>for more.</h3><p>Celebrate each other’s wins, share what you know, and make the path a little clearer for the next person.</p><Asterisk className="value-spark" size={62}/></article>
      </div>
    </section>

    <section className="section-shell projects-preview section-padding">
      <SectionHeading eyebrow="GOOD THINGS IN MOTION" title={<>Ideas don’t stay<br/><em>inside the group chat.</em></>} description="A look at the ideas, resources, and community moments taking shape around WIT." link="/projects" linkText="See all projects"/>
      <div className="project-feature-grid">
        {projects.slice(0,2).map((p,i)=><Link to={`/projects/${p.id}`} className={`project-feature project-feature-${i+1}`} key={p.id}>
          <div className="project-feature-image"><img src={p.image} alt="" loading="lazy"/><span className="project-label">{p.label}</span><span className="round-arrow"><ArrowUpRight size={20}/></span></div>
          <div className="project-feature-meta"><span>{p.category}</span><span>0{i+1} / 03</span></div><h3>{p.title}</h3><p>{p.description}</p>
        </Link>)}
      </div>
    </section>

    <section className="events-band">
      <div className="section-shell events-band-inner">
        <div className="events-band-copy"><div className="eyebrow"><span className="eyebrow-dot"/> IRL {'>'} URL (SOMETIMES)</div><h2>Good conversations<br/>have <em>great afterthoughts.</em></h2><p>Meetups, shared lessons, new connections, and those “wait, you too?” moments. Here’s where WIT comes together.</p><Link className="button button-dark" to="/events-media">See the moments <ArrowUpRight size={17}/></Link></div>
        <div className="event-image-stack"><img className="event-main-image" src="/images/wit-event-stage.jpg" alt="WIT event stage artwork from the brand identity" loading="lazy"/><div className="event-floating-note"><CalendarDays size={19}/><span>THE NEXT CHAPTER<br/><strong>IS BETTER TOGETHER</strong></span></div><div className="event-sticker">MEET<br/>UP! <Asterisk size={27}/></div></div>
      </div>
    </section>

    <section className="section-shell voices-section section-padding">
      <SectionHeading eyebrow="WORDS FROM THE ROOM" title={<>Different journeys.<br/><em>Shared momentum.</em></>} description="Every perspective adds something. These spaces are made richer by the people who show up." link="/testimonials" linkText="More community voices"/>
      <div className="voice-feature">
        <div className="voice-quote-mark"><Quote size={43}/></div>
        <div className="voice-content"><p className="voice-quote">“{testimonials[activeTestimonial].quote}”</p><div className="voice-attribution"><span><strong>{testimonials[activeTestimonial].attribution}</strong><small>{testimonials[activeTestimonial].context} · illustrative demo copy</small></span><div className="voice-controls"><button aria-label="Previous testimonial" onClick={()=>setActiveTestimonial((activeTestimonial+testimonials.length-1)%testimonials.length)}><ArrowLeft size={17}/></button><button aria-label="Next testimonial" onClick={()=>setActiveTestimonial((activeTestimonial+1)%testimonials.length)}><ArrowRight size={17}/></button></div></div></div>
        <div className="voice-deco"><Asterisk size={90}/><span>WIT<br/>WIT<br/>WIT</span></div>
      </div>
      <p className="content-disclaimer">Demo note: these are illustrative placeholders, not real participant testimonials. Replace with approved quotes before launch.</p>
    </section>

    <section className="journal-section">
      <div className="section-shell journal-inner">
        <SectionHeading eyebrow="THE WIT JOURNAL" title={<>Thoughts, notes &<br/><em>tiny lightbulbs.</em></>} description="Ideas worth passing on, lessons worth sharing, and reminders for the days you need one." link="/blog" linkText="Visit the journal"/>
        <div className="journal-cards">{articles.slice(0,2).map((a,i)=><Link to={`/blog/${a.id}`} className="journal-card" key={a.id}><div className="journal-image"><img src={a.image} alt="" loading="lazy"/><span>{a.category}</span><ArrowUpRight size={20}/></div><div className="journal-meta">{a.date} <span>{a.readTime}</span></div><h3>{a.title}</h3><p>{a.excerpt}</p></Link>)}</div>
      </div>
    </section>

    <section className="join-section section-shell">
      <div className="join-card"><div className="join-card-pattern"><Asterisk size={120}/><Asterisk size={70}/></div><div className="join-card-copy"><span className="eyebrow">YOUR NEXT CHAPTER, MEET YOUR PEOPLE</span><h2>Come as you are.<br/><em>Grow as you go.</em></h2><p>Bring your curiosity, your questions, your ambition, your unfinished ideas. There’s room for all of it here.</p><a href={socialLinks.whatsapp} target="_blank" rel="noreferrer" className="button button-dark">Join the WIT community <ArrowUpRight size={17}/></a></div><div className="join-card-art"><img src="/images/wit-brand-phone.jpg" alt="WIT brand identity on a phone" loading="lazy"/><span>YOUR PEOPLE<br/>ARE OUT THERE ↗</span></div></div>
    </section>
  </>
}

function About() {
  return <><PageIntro eyebrow="THE STORY SO FAR" title={<>A little less gatekeeping.<br/><em>A lot more growing.</em></>} description="WIT is where women in tech can talk tech—without the pressure to have every answer, every plan, or every part of life figured out." number="01"/>
    <section className="section-shell split-story section-padding"><div className="story-image"><img src="/images/wit-event-stage.jpg" alt="WIT brand event visual"/><span className="image-corner-label">THE WIT ENERGY / 001</span></div><div className="story-copy"><div className="eyebrow"><span className="eyebrow-dot"/> WHAT IS WIT?</div><h2>A sisterhood for the curious, the ambitious, and the still-figuring-it-out.</h2><p>WIT stands for Women in Technology, Women Integrating Technology, Women Innovating Technology, and Women Inspiring Technology. At its heart, it is a supportive space for women to connect, exchange experiences, and grow together in the tech industry.</p><p>We believe meaningful progress happens when people can ask honest questions, share what they know, and make room for one another.</p><div className="story-signature">That’s the WIT idea. <Asterisk size={24}/></div></div></section>
    <section className="about-principles"><div className="section-shell section-padding"><SectionHeading eyebrow="OUR NORTH STAR" title={<>A space full of energy.<br/><em>And room to be human.</em></>}/><div className="principles-grid"><article><span>01 / VISION</span><Asterisk size={35}/><h3>A full-of-energy space for women in tech.</h3><p>A space that feels alive, inviting, and empowering—where women are seen, heard, and confident enough to show up as themselves.</p></article><article><span>02 / MISSION</span><Asterisk size={35}/><h3>Build a vibrant Women in Tech community.</h3><p>Create consistent opportunities for connection, open conversation, shared experience, and real progress together.</p></article><article><span>03 / VALUES</span><Asterisk size={35}/><h3>Curiosity over perfection.</h3><p>Be witty, be generous with what you know, and remember that nobody needs to know everything to belong.</p></article></div></div></section>
    <section className="section-shell about-cta section-padding"><div className="about-cta-inner"><div><div className="eyebrow"><span className="eyebrow-dot"/> THE DOOR IS OPEN</div><h2>Bring your whole<br/><em>work-in-progress self.</em></h2></div><div><p>You don’t need the perfect introduction or a five-year plan. Start with a hello, a question, or an idea you’re excited about.</p><a href={socialLinks.whatsapp} target="_blank" rel="noreferrer" className="button button-dark">Meet WIT <ArrowUpRight size={17}/></a></div></div></section>
  </>
}

function Team() {
  return <><PageIntro eyebrow="THE PEOPLE BEHIND THE ENERGY" title={<>Good people.<br/><em>Big-hearted ambition.</em></>} description="A community is more than a name or a logo. Add the people who bring WIT to life, one conversation and connection at a time." number="02"/>
    <section className="section-shell section-padding"><div className="team-intro-note"><div className="note-symbol"><Users size={26}/></div><div><strong>Team details need confirmation</strong><p>The brand and public profile materials supplied for this demo did not include a complete verified team roster. These cards are placeholders for approved names, roles, biographies, and portraits.</p></div></div><div className="team-grid">{team.map((person,i)=><article className="team-card" key={i}><div className={`team-photo team-photo-${i+1}`}><div className="team-placeholder"><span>{['W','i','T','+'][i]}</span><Asterisk size={52}/></div><span className="team-number">0{i+1}</span></div><div className="team-info"><div><h3>{person.name}</h3><span>{person.role}</span></div><button className="icon-button" aria-label={`View ${person.name} profile`} onClick={()=>alert('Replace this placeholder with the approved team member profile and social links.')}><ArrowUpRight size={18}/></button></div><p>{person.bio}</p></article>)}</div></section>
  </>
}

function ProjectCard({p, index}:{p:typeof projects[number];index:number}) {
  return <Link to={`/projects/${p.id}`} className="project-card"><div className="project-card-image"><img src={p.image} alt="" loading="lazy"/><span className={`pill pill-${p.accent}`}>{p.label}</span><span className="project-card-arrow"><ArrowUpRight size={20}/></span></div><div className="project-card-content"><div className="project-card-top"><span>{p.category}</span><span>0{index+1}</span></div><h3>{p.title}</h3><p>{p.description}</p><span className="card-read-link">Explore project <ArrowRight size={15}/></span></div></Link>
}

function Projects() {
  const [category,setCategory] = useState('All')
  const categories = ['All','Community','Events','Learning']
  const filtered = category === 'All' ? projects : projects.filter(p=>p.category===category)
  return <><PageIntro eyebrow="IDEAS WITH A LITTLE FOLLOW-THROUGH" title={<>Small sparks.<br/><em>Shared momentum.</em></>} description="A home for community initiatives, useful resources, collaborations, and the things we’re figuring out together." number="03"/>
    <section className="section-shell section-padding"><div className="filter-bar"><div className="filter-label"><Filter size={16}/> FIND YOUR INTEREST</div><div className="filter-buttons">{categories.map(c=><button key={c} className={category===c?'filter-chip selected':'filter-chip'} onClick={()=>setCategory(c)}>{c}</button>)}</div><span className="filter-count">{filtered.length} SHOWING</span></div><div className="projects-grid">{filtered.map((p,i)=><ProjectCard p={p} index={i} key={p.id}/>)}</div><p className="content-disclaimer">The cards above are concept examples for the website demo, not a verified list of official WIT projects. Replace with confirmed projects and links.</p></section>
  </>
}

function ProjectDetail() {
  const {id}=useParams()
  const p=projects.find(item=>item.id===id)
  if(!p) return <NotFound/>
  return <><section className="detail-hero section-shell"><Link to="/projects" className="back-link"><ArrowLeft size={16}/> All projects</Link><div className="eyebrow"><span className="eyebrow-dot"/>{p.category} / {p.label}</div><h1>{p.title}</h1><p>{p.description}</p><div className="detail-image"><img src={p.image} alt=""/></div></section><section className="section-shell detail-body section-padding"><div className="detail-body-main"><span className="eyebrow">ABOUT THIS SHOWCASE</span><h2>A starting point for shared ideas.</h2><p>This page demonstrates how a full project detail page could work. Replace this copy with approved project context, goals, contributors, outcomes, and links once those details are confirmed with the WIT team.</p><p>Give visitors a clear sense of the problem, the people involved, what has been made, and how they can learn more or participate.</p><a className="button button-dark" href={socialLinks.linkedin} target="_blank" rel="noreferrer">Follow WIT updates <ArrowUpRight size={16}/></a></div><aside className="detail-sidebar"><span>PROJECT NOTES</span><div><small>STATUS</small><strong>{p.status}</strong></div><div><small>CATEGORY</small><strong>{p.category}</strong></div><div><small>OFFICIAL LINKS</small><strong>To be added</strong></div></aside></section></>
}

function PublicProjects() {
  return <><PageIntro eyebrow="OPEN BY DESIGN" title={<>Ideas are better<br/><em>when shared.</em></>} description="A space for public-facing initiatives, open resources, and ways to contribute to work that helps the wider tech community." number="04"/>
    <section className="section-shell section-padding public-intro-grid"><div className="public-callout"><Asterisk size={54}/><span>OPEN DOORS.<br/>OPEN MINDS.<br/><em>OPEN POSSIBILITIES.</em></span></div><div className="public-copy"><h2>Make it easier to join in.</h2><p>Public projects are a way to turn community knowledge into something more people can use, build on, or learn from. This page is designed to make participation clear: what’s open, who it’s for, and how to get involved.</p><p>We’ll list verified initiatives here once the project owners, resources, and contribution instructions are confirmed.</p><a className="button button-dark" href={socialLinks.whatsapp} target="_blank" rel="noreferrer">Ask about contributing <ArrowUpRight size={17}/></a></div></section>
    <section className="section-shell section-padding"><SectionHeading eyebrow="OPEN PROJECT BOARD" title={<>A work in progress.<br/><em>On purpose.</em></>}/><div className="open-project-grid"><article><span className="open-status">RESOURCE / TO CONFIRM</span><div className="open-icon"><BookOpen size={25}/></div><h3>Shared learning resources</h3><p>A possible home for guides, notes, and learning links contributed by the community.</p><span className="open-footer">DETAILS PENDING <ArrowUpRight size={16}/></span></article><article><span className="open-status">COLLABORATION / TO CONFIRM</span><div className="open-icon pink"><Users size={25}/></div><h3>Community-led initiatives</h3><p>A space to discover collaborative projects and learn how to take part.</p><span className="open-footer">DETAILS PENDING <ArrowUpRight size={16}/></span></article><article><span className="open-status">CONTRIBUTION / TO CONFIRM</span><div className="open-icon yellow"><Code2 size={25}/></div><h3>Build in the open</h3><p>Highlight open-source or public work once official links and maintainers are available.</p><span className="open-footer">DETAILS PENDING <ArrowUpRight size={16}/></span></article></div><p className="content-disclaimer">These are suggested content placeholders, not confirmed public projects.</p></section>
  </>
}

function EventsMedia() {
  const [filter,setFilter]=useState('All')
  const [selectedImage,setSelectedImage]=useState<string|null>(null)
  const types=['All',...Array.from(new Set(events.map(e=>e.type)))]
  const visible=filter==='All'?events:events.filter(e=>e.type===filter)
  return <><PageIntro eyebrow="THE MOMENTS THAT MAKE THE COMMUNITY" title={<>Good people.<br/><em>Good things happening.</em></>} description="Meetups, career conversations, new connections, and the memories worth keeping. Explore the WIT event archive and media highlights." number="05"/>
    <section className="section-shell section-padding"><div className="feature-event"><div className="feature-event-image"><img src="/images/wit-event-stage.jpg" alt="WIT brand event image"/><span className="feature-event-stamp">WIT<br/>IRL <Asterisk size={27}/></span></div><div className="feature-event-copy"><div className="eyebrow"><span className="eyebrow-dot"/> COMMUNITY SPOTLIGHT</div><span className="event-date"><CalendarDays size={15}/> MAY 2025 · COLOMBO</span><h2>Navigating the<br/><em>tech career ladder.</em></h2><p>WIT’s first meetup brought women together to talk promotions, salary negotiation, leadership development, and navigating career growth in technology.</p><a className="text-link" href={socialLinks.linkedin} target="_blank" rel="noreferrer">Read the public recap <ArrowUpRight size={17}/></a><p className="content-disclaimer">Event summary based on the community's public LinkedIn description. Confirm the date, imagery, and full details before launch.</p></div></div></section>
    <section className="events-list-section"><div className="section-shell section-padding"><SectionHeading eyebrow="THE EVENT ARCHIVE" title={<>Every room has<br/><em>a story.</em></>}/><div className="filter-bar"><div className="filter-label"><Filter size={16}/> FILTER EVENTS</div><div className="filter-buttons">{types.map(t=><button key={t} className={filter===t?'filter-chip selected':'filter-chip'} onClick={()=>setFilter(t)}>{t}</button>)}</div><span className="filter-count">{visible.length} EVENTS</span></div><div className="events-grid">{visible.map((e,i)=><article className="event-card" key={e.id}><button className="event-card-image" onClick={()=>setSelectedImage(e.image)} aria-label={`View image for ${e.title}`}><img src={e.image} alt="" loading="lazy"/><span className="event-type">{e.type}</span><span className="event-image-open"><Play size={15}/></span></button><div className="event-card-content"><div className="event-card-meta"><span><CalendarDays size={14}/>{e.date}</span><span>{e.location}</span></div><h3>{e.title}</h3><p>{e.description}</p><span className="event-status">{e.status}</span></div></article>)}</div><p className="content-disclaimer">Some event cards are visual placeholders for future content. Only the first event is based on a publicly visible LinkedIn recap.</p></div></section>
    <section className="section-shell section-padding"><SectionHeading eyebrow="LITTLE MOMENTS, BIG ENERGY" title={<>The WIT scrapbook.</>} description="Use this gallery for approved event photography, community snapshots, and media features."/><div className="media-gallery">{['/images/wit-event-stage.jpg','/images/wit-brand-phone.jpg','/images/wit-brand-portrait.jpg','/images/wit-attention-art.jpg'].map((img,i)=><button key={img} className={`gallery-item gallery-item-${i+1}`} onClick={()=>setSelectedImage(img)}><img src={img} alt={`WIT brand visual ${i+1}`} loading="lazy"/><span>WIT / MOMENT 0{i+1} <ArrowUpRight size={15}/></span></button>)}</div></section>
    <AnimatePresence>{selectedImage && <motion.div className="lightbox" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={()=>setSelectedImage(null)}><button className="lightbox-close" aria-label="Close image" onClick={()=>setSelectedImage(null)}><X/></button><img src={selectedImage} alt="Expanded WIT gallery visual" onClick={e=>e.stopPropagation()}/></motion.div>}</AnimatePresence>
  </>
}

function Testimonials() {
  return <><PageIntro eyebrow="REAL PEOPLE, REAL PERSPECTIVES" title={<>The best part of WIT<br/><em>is the people in it.</em></>} description="Community voices help tell the story of what connection, shared experience, and belonging can feel like." number="06"/>
    <section className="section-shell section-padding"><div className="testimonial-notice"><Quote size={22}/><div><strong>Testimonials need approval</strong><p>The supplied materials did not contain verified participant quotations. The cards below are illustrative placeholder copy for layout review only; they must not be published as real testimonials.</p></div></div><div className="testimonial-grid">{testimonials.map((t,i)=><article className={`testimonial-card testimonial-card-${i+1}`} key={i}><div className="testimonial-mark">“</div><p>{t.quote}</p><div className="testimonial-bottom"><div className="testimonial-avatar">{['W','i','T'][i]}</div><div><strong>{t.attribution}</strong><span>{t.context}</span></div><span className="testimonial-number">0{i+1}</span></div></article>)}</div></section>
    <section className="testimonial-cta"><div className="section-shell testimonial-cta-inner"><Asterisk size={62}/><div><span className="eyebrow">YOUR VOICE BELONGS HERE, TOO</span><h2>Help us tell the story<br/><em>of this community.</em></h2><p>Have feedback from a WIT event or a community story to share? Reach out to the team.</p></div><Link className="button button-dark" to="/contact">Share your experience <ArrowUpRight size={17}/></Link></div></section>
  </>
}

function Blog() {
  const [query,setQuery]=useState('')
  const [category,setCategory]=useState('All')
  const categories=['All',...Array.from(new Set(articles.map(a=>a.category)))]
  const filtered=useMemo(()=>articles.filter(a=>(category==='All'||a.category===category)&&`${a.title} ${a.excerpt}`.toLowerCase().includes(query.toLowerCase())),[category,query])
  return <><PageIntro eyebrow="NOTES FROM THE WIT COMMUNITY" title={<>Thoughts worth sharing.<br/><em>Room to think out loud.</em></>} description="Career reflections, community learnings, useful resources, and little reminders for the journey through tech." number="07"/>
    <section className="section-shell section-padding"><div className="blog-featured"><div className="blog-featured-image"><img src="/images/wit-brand-portrait.jpg" alt="WIT brand portrait"/><span className="featured-badge">THE WIT NOTEBOOK <Asterisk size={17}/></span></div><div className="blog-featured-copy"><div className="eyebrow"><span className="eyebrow-dot"/> FEATURED NOTE</div><span className="article-category">CAREER / COMMUNITY</span><h2>You’re not late.<br/><em>You’re on your way.</em></h2><p>A reminder from the WIT community: your career is not a race with one finish line. Explore, ask questions, learn new things, and let your path look like yours.</p><Link className="button button-dark" to={`/blog/${articles[0].id}`}>Read the note <ArrowUpRight size={17}/></Link></div></div>
      <div className="blog-toolbar"><div className="blog-search"><Search size={17}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search the journal…" aria-label="Search articles"/></div><div className="filter-buttons">{categories.map(c=><button key={c} className={category===c?'filter-chip selected':'filter-chip'} onClick={()=>setCategory(c)}>{c}</button>)}</div></div>
      <div className="blog-grid">{filtered.map((a,i)=><Link className="blog-card" to={`/blog/${a.id}`} key={a.id}><div className="blog-card-image"><img src={a.image} alt="" loading="lazy"/><span>{a.category}</span><ArrowUpRight size={18}/></div><div className="blog-card-meta">{a.date}<span>{a.readTime}</span></div><h3>{a.title}</h3><p>{a.excerpt}</p><span className="card-read-link">Read article <ArrowRight size={15}/></span></Link>)}</div>
      {filtered.length===0 && <div className="empty-state"><Search size={26}/><h3>No notes found.</h3><p>Try another search or category.</p><button className="text-link" onClick={()=>{setQuery('');setCategory('All')}}>Clear filters <X size={15}/></button></div>}
      <p className="content-disclaimer">Some articles are draft/demo content and are not presented as published WIT statements. Replace with approved articles before launch.</p>
    </section>
  </>
}

function ArticleDetail() {
  const {id}=useParams()
  const a=articles.find(item=>item.id===id)
  if(!a) return <NotFound/>
  return <><section className="article-detail-hero section-shell"><Link to="/blog" className="back-link"><ArrowLeft size={16}/> Back to the journal</Link><span className="article-category">{a.category} · {a.readTime}</span><h1>{a.title}</h1><p>{a.excerpt}</p><div className="article-detail-image"><img src={a.image} alt=""/></div></section><article className="article-body section-shell"><div className="article-body-aside"><span>THE WIT JOURNAL</span><span>{a.date}</span><span>DEMO ARTICLE</span></div><div className="article-body-copy"><p className="article-lead">There is no one correct way to build a career in technology. There are only the questions you ask, the things you try, the people you learn from, and the small choices that move you forward.</p><h2>Give yourself permission to be in progress.</h2><p>Some days you’ll feel confident. Some days you’ll need to look something up, ask for help, or admit you don’t know yet. That isn’t proof you don’t belong. It is part of learning something that keeps changing.</p><p>Find people who make it easier to stay curious. Share what you’ve learned. Celebrate someone else’s win without shrinking your own. And when you can, leave the door a little more open for the next person.</p><blockquote>“You don’t have to have it all figured out to belong.”</blockquote><p className="content-disclaimer">Demo copy for layout review. Confirm editorial ownership and approve all article content before publication.</p><Link className="button button-outline" to="/blog"><ArrowLeft size={16}/> Back to all articles</Link></div></article></>
}

function BrandGuidelines() {
  const [copied,setCopied]=useState('')
  const colors=[['Electric violet','#6805F2'],['WIT pink','#F227D0'],['Warm orange','#E29417'],['Deep navy','#292F66'],['Ink brown','#40343E'],['Soft lavender','#EEEBF7'],['Bright lilac','#9D5FFF'],['Sunshine','#FFD05C'],['Neon rose','#FF64ED'],['Peach','#FFCC83']]
  const copyColor=async (hex:string)=>{try{await navigator.clipboard.writeText(hex);setCopied(hex);setTimeout(()=>setCopied(''),1400)}catch{setCopied(hex)}}
  return <><PageIntro eyebrow="THE LOOK. THE VOICE. THE WIT." title={<>A brand with a brain.<br/><em>And a little sparkle.</em></>} description="The practical guide to using WIT’s visual identity with consistency, confidence, and just the right amount of personality." number="08"/>
    <section className="section-shell section-padding"><div className="brandkit-hero"><div className="brandkit-wordmark">Wi<span>T</span><Asterisk size={58}/></div><div className="brandkit-copy"><span className="eyebrow">BRAND AT A GLANCE</span><h2>Sharp thinking.<br/><em>Playful by nature.</em></h2><p>The official WIT identity describes a confident, contemporary voice: precise but fun, smart without being intimidating, and witty without being complicated.</p><a className="text-link" href="/images/wit-purple-texture.png" download>Download included brand texture <Download size={16}/></a></div></div>
      <div className="brandkit-section-head"><div><span className="eyebrow">01 / COLOUR PALETTE</span><h2>Colour with a point of view.</h2></div><p>Tap any swatch to copy its HEX code.</p></div><div className="palette-grid">{colors.map(([name,hex])=><button className="palette-swatch" key={hex} onClick={()=>copyColor(hex)} style={{background:hex,color:['#EEEBF7','#FFD05C','#FFCC83','#F227D0','#FF64ED'].includes(hex)?'#292F66':'#fff'}}><span className="swatch-name">{name}</span><strong>{copied===hex?<><Check size={15}/> COPIED</>:hex}</strong><span className="swatch-action">{copied===hex?'Copied to clipboard':'Click to copy'}</span></button>)}</div>
      <div className="brandkit-two-col"><div className="brandkit-type"><span className="eyebrow">02 / TYPOGRAPHY</span><h2>Whyte Inktrap</h2><p>The brand guideline specifies Whyte Inktrap. The font file was not included with the supplied PDF, so this demo uses Space Grotesk as a temporary visual approximation. Use the licensed official font files for a precise match.</p><div className="type-sample"><span>Ag</span><div><strong>Bold yet approachable.</strong><small>Clear, confident, contemporary.</small></div></div></div><div className="brandkit-tone"><span className="eyebrow">03 / TONE OF VOICE</span><h2>Very witty.</h2><p>WIT speaks with confidence, intelligence, and a touch of playfulness. Clever without being complicated. Relatable, sharp, engaging, and memorable.</p><div className="tone-tags"><span>Warm</span><span>Witty</span><span>Confident</span><span>Curious</span></div></div></div>
      <div className="brandkit-pattern-section"><div><span className="eyebrow">04 / GRAPHIC LANGUAGE</span><h2>Grid meets spark.</h2><p>Structured grids signal precision and technology. Abstract star-like shapes add energy and collaboration. Use them to create movement—not visual noise.</p></div><div className="pattern-demo"><div className="pattern-grid-block"/><div className="pattern-star-block"><Asterisk size={115}/><Asterisk size={62}/><Asterisk size={38}/></div></div></div>
      <div className="brandkit-reminder"><Asterisk size={44}/><div><strong>Keep the WIT feeling.</strong><p>Preserve logo proportions, use approved brand colours, keep typography legible, and balance precision with playfulness. Refer to the original PDF for complete rules and logo do/don’ts.</p></div></div>
    </section>
  </>
}

function Contact() {
  const [form,setForm]=useState({name:'',email:'',subject:'',message:''})
  const [submitted,setSubmitted]=useState(false)
  const [error,setError]=useState('')
  const submit=(e:FormEvent)=>{e.preventDefault();if(!form.name.trim()||!form.email.includes('@')||!form.message.trim()){setError('Please add your name, a valid email, and a message.');return}setError('');setSubmitted(true)}
  return <><PageIntro eyebrow="SAY HELLO. START SOMETHING." title={<>The first hello<br/><em>can go a long way.</em></>} description="Questions, ideas, collaborations, event feedback, or just a little curiosity? We’re glad you’re here." number="09"/>
    <section className="section-shell section-padding contact-layout"><div className="contact-info"><span className="eyebrow"><span className="eyebrow-dot"/> FIND YOUR WAY TO WIT</span><h2>Let’s make<br/><em>the connection.</em></h2><p>Pick the channel that works for you. Follow along for updates, join the community, or send a note.</p><div className="contact-links"><button type="button" className="contact-email-placeholder" onClick={()=>setError('The official community email address has not been supplied yet. Add the verified email address before launch.')}><span className="contact-link-icon"><Mail size={20}/></span><span><small>EMAIL</small><strong>Community inbox <ArrowUpRight size={15}/></strong><em>Official email to be confirmed</em></span></button><a href={socialLinks.whatsapp} target="_blank" rel="noreferrer"><span className="contact-link-icon"><MessageCircle size={20}/></span><span><small>WHATSAPP COMMUNITY</small><strong>Join the conversation <ArrowUpRight size={15}/></strong><em>Official WIT group invite</em></span></a><a href={socialLinks.linkedin} target="_blank" rel="noreferrer"><span className="contact-link-icon"><Linkedin size={20}/></span><span><small>LINKEDIN</small><strong>Follow WIT Community <ArrowUpRight size={15}/></strong><em>Updates, events, and reflections</em></span></a><a href={socialLinks.instagram} target="_blank" rel="noreferrer"><span className="contact-link-icon"><Instagram size={20}/></span><span><small>INSTAGRAM</small><strong>@wit_community_sl <ArrowUpRight size={15}/></strong><em>Community moments</em></span></a><a href={socialLinks.facebook} target="_blank" rel="noreferrer"><span className="contact-link-icon"><Facebook size={20}/></span><span><small>FACEBOOK</small><strong>Find us on Facebook <ArrowUpRight size={15}/></strong><em>Community updates</em></span></a></div></div>
      <div className="contact-form-card"><div className="contact-form-heading"><span className="eyebrow">DROP US A NOTE</span><Asterisk size={36}/></div><h3>What’s on your mind?</h3><p>We’ll make space for the question, idea, or hello.</p>{submitted?<div className="form-success"><span><Check size={26}/></span><h3>Message preview ready.</h3><p>This demo validated your form locally. It has not been sent to WIT because no email service is connected.</p><button className="button button-outline" onClick={()=>{setSubmitted(false);setForm({name:'',email:'',subject:'',message:''})}}>Write another message</button></div>:<form onSubmit={submit} noValidate><label>Your name<input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="What should we call you?"/></label><label>Email address<input type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} placeholder="you@example.com"/></label><label>What’s this about?<select value={form.subject} onChange={e=>setForm({...form,subject:e.target.value})}><option value="">Choose a topic</option><option>Joining the community</option><option>Event or collaboration</option><option>Project idea</option><option>Media or partnership</option><option>Something else</option></select></label><label>Your message<textarea rows={4} value={form.message} onChange={e=>setForm({...form,message:e.target.value})} placeholder="Tell us a little about it…"/></label>{error&&<p className="form-error" role="alert">{error}</p>}<button className="button button-dark form-submit" type="submit">Preview message <Send size={16}/></button><small className="form-disclaimer">Demo only — no message is sent or stored.</small></form>}</div>
    </section>
  </>
}

function NotFound() {
  return <section className="not-found section-shell"><div className="eyebrow"><span className="eyebrow-dot"/> WRONG TURN, RIGHT COMMUNITY</div><h1>Well, this page<br/><em>has wandered off.</em></h1><p>The link may have changed, but you’re still welcome here.</p><Link to="/" className="button button-dark"><ArrowLeft size={16}/> Back to home</Link><Asterisk size={120}/></section>
}

function ScrollToTop() {
  const {pathname}=useLocation()
  useMemo(()=>{window.scrollTo({top:0,behavior:'instant' as ScrollBehavior})},[pathname])
  return null
}

export default function App() {
  const location=useLocation()
  return <><ScrollToTop/><Header/><main key={location.pathname}><Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/about" element={<About/>}/>
    <Route path="/team" element={<Team/>}/>
    <Route path="/projects" element={<Projects/>}/>
    <Route path="/projects/:id" element={<ProjectDetail/>}/>
    <Route path="/public-projects" element={<PublicProjects/>}/>
    <Route path="/events-media" element={<EventsMedia/>}/>
    <Route path="/testimonials" element={<Testimonials/>}/>
    <Route path="/blog" element={<Blog/>}/>
    <Route path="/blog/:id" element={<ArticleDetail/>}/>
    <Route path="/brand-guidelines" element={<BrandGuidelines/>}/>
    <Route path="/contact" element={<Contact/>}/>
    <Route path="*" element={<NotFound/>}/>
  </Routes></main><Footer/></>
}
