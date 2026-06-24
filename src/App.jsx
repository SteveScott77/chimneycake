import { useState, useEffect, useRef } from 'react'

/* ---------------- Data ---------------- */
const CONE_FLAVORS = [
  {
    name: 'Snickers Chimney Cone',
    note: '(Chocolate-vanilla ice cream, snickers chocolate, peanut, caramel sauce)',
    img: '/assets/snickers_cone.png',
  },
  {
    name: 'Twix Chimney Cone',
    note: '(Vanilla ice cream, twix, caramel sauce)',
    img: '/assets/twix_cone.png',
  },
  {
    name: 'Oreo Chimney Cone',
    note: '(Chocolate-vanilla ice cream, oreo, chocolate sauce)',
    img: '/assets/oreo_cone.png',
  },
  {
    name: 'Bounty Chimney Cone',
    note: '(Vanilla ice cream, bounty, chocolate-coconut, chocolate sauce)',
    img: '/assets/bounty_cone.png',
  },
  {
    name: 'Raspberry Chimney Cone',
    note: '(Vanilla ice cream, lyophated raspberry, raspberry sauce)',
    img: '/assets/malna_cone.png',
  },
  {
    name: 'Apple Pie Chimney Cone',
    note: '(Apple chutney, whipped cream)',
    img: '/assets/apple_cone.png',
  },
  {
    name: 'Whipped Cream Chimney Cone',
    note: '(Whipped cream)',
    img: '/assets/whipped_cone.png',
  },
  {
    name: 'Ice Cream Chimney Cone',
    note: '(Ice cream)',
    img: '/assets/icecream-cone.png',
  },
]

const FLAVOR_CARDS = [
  { name: 'Cinnamon', hu: '(Fahéjas)', img: '/assets/cinnamon.png', hover: '/assets/cinnamon-hover.png' },
  { name: 'Vanilla', hu: '(Vaníliás)', img: '/assets/vanilla.png', hover: '/assets/vanilla-hover.png' },
  { name: 'Pistachio', hu: '(Pisztáciás)', img: '/assets/pistachio.png', hover: '/assets/pistachio-hover.png' },
  { name: 'Coconut', hu: '(Kókuszos)', img: '/assets/coconut.png', hover: '/assets/coconut-hover.png' },
  { name: 'Raspberry', hu: '(Málnás)', img: '/assets/raspberry.png', hover: '/assets/raspberry-hover.png' },
  { name: 'Almond', hu: '(Mandulás)', img: '/assets/almond-cake.png', hover: '/assets/almond-cake-hover.png' },
  { name: 'Chocolate', hu: '(Csokoládés)', img: '/assets/chocolate.png', hover: '/assets/chocolate-hover.png' },
  { name: 'Walnut', hu: '(Diós)', img: '/assets/walnut.png', hover: '/assets/walnut-hover.png' },
]

const WHY_CARDS = [
  {
    img: '/assets/why-3.jpg',
    title: 'Freshly baked & warm',
    text: 'Crispy, soft and best enjoyed straight from the oven.',
  },
  {
    img: '/assets/why-1.jpg',
    title: 'A true Budapest treat',
    text: 'A sweet classic tourists love to discover.',
  },
  {
    img: '/assets/why-2.jpg',
    title: 'Perfect on the go',
    text: 'Grab one, walk around, take a photo, share the moment.',
  },
]

const LOC_HOURS = 'Sunday – Thursday: 11:00 – 22:00\nFriday – Saturday: 11:00 – 23:00'
const LOCATIONS = [
  { name: 'Váci utca', img: '/assets/loc-vaci.png', addr: '1052 Budapest, Váci u. 11/B.', hours: LOC_HOURS, cid: '13599539892897907328' },
  { name: 'Fashion street', img: '/assets/loc-fashion.png', addr: '1051 Budapest, Deák Ferenc u. 10.', hours: LOC_HOURS, cid: '16718429277565892994' },
  { name: 'Akvárium', img: '/assets/loc-akvarium.png', addr: '1051 Budapest, Erzsébet tér 12.', hours: LOC_HOURS, cid: '18311191613973595767' },
  { name: 'Deák tér', img: '/assets/loc-deak.png', addr: '1052 Budapest, Deák Ferenc tér 3.', hours: LOC_HOURS, cid: '15644560448914780515' },
  { name: 'Madách tér', img: '/assets/loc-madach.png', addr: '1075 Budapest, Károly krt. 13-15.', hours: LOC_HOURS, cid: '16663013220313701957' },
  { name: 'Bazilika', img: '/assets/loc-bazilika.jpg', addr: '1051 Budapest, Szent István tér 2.', hours: LOC_HOURS, cid: '11089372304823282514' },
  { name: 'Zrínyi utca', img: '/assets/loc-zrinyi.jpg', addr: '1051 Budapest, Zrínyi u. 14.', hours: LOC_HOURS, cid: '145345763919310174' },
  { name: 'Kígyó utca', placeholder: true, addr: '1052 Budapest, Kígyó u. 2.', hours: LOC_HOURS, cid: '3128396529710505300' },
  { name: 'Sas utca', placeholder: true, addr: '1051 Budapest, Sas u. 10.', hours: LOC_HOURS, cid: '11826260180090323375' },
]

const REVIEWS = [
  {
    name: 'Diana R',
    date: '2026.05.18.',
    rating: 5,
    text: 'Fresh, warm chimney cakes filled with creamy ice cream and rich chocolate. The combination is absolutely perfect: crispy on the outside, soft inside.',
  },
  {
    name: 'Bing C',
    date: '2026.04.07.',
    rating: 5,
    text: 'It was sweet, warm, and absolutely delicious. A little overwhelming at first (so much sugar and goodness!), but totally worth it. A must-try experience!',
  },
  {
    name: 'Elina G',
    date: '2026.03.22.',
    rating: 5,
    text: 'The worker was amazing — very pleasant, funny, patient and made our chimney exactly the way we asked. Highly recommend!',
  },
  {
    name: 'Ahsen A',
    date: '2026.02.15.',
    rating: 4,
    text: 'The taste was excellent, and they had a wide variety of options to choose from. The ice cream served with the chimney cakes was also a highlight — smooth and creamy.',
  },
]

const FAQS = [
  {
    q: 'What is chimney cake?',
    a: 'Chimney cake, or kürtőskalács, is a traditional Hungarian sweet pastry baked on a rotating spit. It is crispy outside, soft inside and usually served warm.',
  },
  {
    q: 'What is the difference between chimney cake and chimney cone?',
    a: 'A chimney cake is the classic open pastry, while a chimney cone shapes that same dough into a sealed cone that we fill with soft serve, sauces and toppings.',
  },
  {
    q: 'Is chimney cake Hungarian?',
    a: 'Yes — kürtőskalács is a beloved traditional Hungarian and Transylvanian pastry with centuries of history.',
  },
  {
    q: 'Can I eat it while walking?',
    a: 'Absolutely. Chimney cake is the ideal street-food treat to enjoy while exploring Budapest.',
  },
  {
    q: 'Where can I find your shops?',
    a: 'We are located in some of Budapest’s busiest city-centre spots. Check the locations section above for the nearest shop.',
  },
  {
    q: 'Do you accept card payment?',
    a: 'Yes, we accept card payments at all of our locations.',
  },
  {
    q: 'Do you have vegan or lactose-free options?',
    a: 'Yes — we offer vegan, lactose-free and egg-free options so everyone can enjoy a chimney cake.',
  },
]

const FOOTER_RESTAURANTS = [
  'VÁCI UTCA: 1052 Budapest, Váci u. 11/B.',
  'FASHION STREET: 1051 Budapest, Deák Ferenc u. 10.',
  'AKVÁRIUM: 1051 Budapest, Erzsébet tér 12.',
  'DEÁK TÉR: 1052 Budapest, Deák Ferenc tér 3.',
  'MADÁCH TÉR: 1075 Budapest, Károly krt. 13-15.',
  'BAZILIKA: 1051 Budapest, Szent István tér 2.',
  'ZRÍNYI UTCA: 1051 Budapest, Zrínyi u. 14.',
  'KÍGYÓ UTCA: 1052 Budapest, Kígyó u. 2.',
  'SAS UTCA: 1051 Budapest, Sas u. 10.',
]

/* ---------------- Small components ---------------- */
function Star({ filled = true }) {
  return (
    <svg className={filled ? 'on' : 'off'} viewBox="0 0 24 24" aria-hidden>
      <path d="M12 2l2.9 6.1 6.6.9-4.8 4.6 1.2 6.5L12 18.6 6.1 20.6l1.2-6.5L2.5 9.5l6.6-.9z" />
    </svg>
  )
}

function ArrowLeft() {
  return (
    <svg viewBox="0 0 15 8" aria-hidden>
      <path d="M14 4H1M1 4l3-3M1 4l3 3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ArrowRight() {
  return (
    <svg viewBox="0 0 15 8" aria-hidden>
      <path d="M1 4h13M14 4l-3-3M14 4l-3 3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/* ---------------- Header ---------------- */
function Header() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <header className={`header${scrolled ? ' scrolled' : ''}`}>
      <div className="container">
        <a className="logo" href="#top" aria-label="Chimney Cake Shop">
          <img className="logo-emblem" src="/assets/logo-emblema.png" alt="Chimney Cake Shop" />
        </a>
        <nav className="nav">
          <div className="nav-links">
            <a href="#products">Products</a>
            <a href="#story">Our Story</a>
            <a href="#franchise">Franchise</a>
          </div>
          <a className="btn-3d sm" href="#locations">Locations</a>
        </nav>
      </div>
    </header>
  )
}

/* ---------------- Hero ---------------- */
function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-bg">
        <img src="/assets/banner.png" alt="" />
      </div>
      <div className="container">
        <h1>
          Discover Budapest with{' '}
          <span className="hl"><span>a chimney cake</span></span>{' '}
          <span className="hl"><span>in your hand</span></span>
        </h1>
        <p className="hero-lead">
          A warm, sweet stop while exploring Budapest’s most iconic streets.
        </p>
        <div className="hero-actions">
          <a className="btn-3d" href="#locations">Find the nearest</a>
          <a className="btn-3d" href="#products">Explore our treats</a>
        </div>
        <div className="hero-features">
          <div className="feature">
            <span className="icon">
              <svg viewBox="0 0 21 21" fill="none" aria-hidden>
                <path d="M4.31128 20C2.20301 18.4519 -1.03071 15.1462 2.73008 11.1333C8.07201 5.43333 2.73004 1 2.73004 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M11.7605 20C9.65223 18.4519 6.41851 15.1462 10.1793 11.1333C15.5212 5.43333 10.1793 1 10.1793 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M19.2058 20C17.0975 18.4519 13.8638 15.1462 17.6246 11.1333C22.9665 5.43333 17.6246 1 17.6246 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </span>
            Freshly baked
          </div>
          <div className="feature">
            <span className="icon">
              <svg viewBox="0 0 20 26" fill="none" aria-hidden>
                <path d="M10 1C14.9703 1 19 5.01482 19 9.96666C19 16.1941 10 18.9128 10 25C5.91876 18.7965 1 16.1941 1 9.96666C1 5.01482 5.02975 1 10 1Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M1 25H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M9.83254 13.5706C11.9233 13.5706 13.6182 11.882 13.6182 9.79898C13.6182 7.71596 11.9233 6.02734 9.83254 6.02734C7.74177 6.02734 6.04688 7.71596 6.04688 9.79898C6.04688 11.882 7.74177 13.5706 9.83254 13.5706Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            City centre locations
          </div>
          <div className="feature">
            <span className="icon">
              <svg viewBox="0 0 25 18" fill="none" aria-hidden>
                <rect x="1" y="1" width="23" height="16" rx="1" stroke="currentColor" strokeWidth="2" />
                <rect y="5.14453" width="25" height="2.57143" fill="currentColor" />
              </svg>
            </span>
            Card payment accepted
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---------------- What is chimney cake ---------------- */
const TAG_ICONS = {
  vegan: (
    <svg className="ic-veg" viewBox="0 0 31 21" fill="none" aria-hidden>
      <g transform="translate(0 2.62)">
        <path d="M0 0.129431C0 0.129431 19.2231 -2.24357 16.5874 13.332C16.5874 13.332 15.0303 8.09987 7.18535 5.422C7.18535 5.422 16.6469 13.6355 17.1254 17.4683L16.2468 18.3815C16.2468 18.3815 15.748 15.9481 15.2101 15.5828C15.2101 15.5828 10.9767 18.6521 7.06641 16.6169C3.79272 14.9127 2.11668 11.8709 1.37733 7.00401C0.955614 4.22177 0 0.129431 0 0.129431Z" fill="#fff" />
      </g>
      <g transform="translate(15.11 0)">
        <path d="M0 5.20187C0 5.20187 1.67739 -0.598808 15.8899 0.0507471C15.8899 0.0507471 14.1315 6.788 13.8544 9.42055C13.4746 13.0199 9.78186 19.845 2.27752 16.762C2.27752 16.762 3.71432 13.9221 3.31559 11.1234C3.31559 11.1234 6.25947 7.20959 8.86545 5.32272C8.86545 5.32272 4.73346 6.17415 2.35862 8.73529C2.35862 8.73529 1.50033 6.14393 0.00270284 5.2005L0 5.20187Z" fill="#fff" />
      </g>
    </svg>
  ),
  lactose: (
    <svg className="ic-tall" viewBox="0 0 15 29.0018" fill="none" aria-hidden>
      <path d="M15 8.45348L10.3997 3.91813H10.396V2.76381C10.396 2.76381 11.087 2.76381 11.1073 2.76017C11.4934 2.72922 11.7964 2.41242 11.7964 2.02461V0.739202C11.7964 0.331366 11.4602 0 11.0463 0C11.0463 0 9.27269 0 7.49908 0C5.72546 0 3.95184 0 3.95184 0C3.538 0 3.20175 0.331366 3.20175 0.739202V2.02461C3.20175 2.41242 3.50474 2.73104 3.89087 2.76017C3.9112 2.76017 4.60217 2.76381 4.60217 2.76381V3.91813H4.59847L0 8.45348V26.9535C0 28.0769 3.48442 29.0018 7.48245 29.0018C7.48799 29.0018 7.49353 29.0018 7.49908 29.0018C7.50462 29.0018 7.51016 29.0018 7.5157 29.0018C11.5137 29.0018 14.9982 28.0769 14.9982 26.9535V8.45348H15Z" fill="#fff" />
    </svg>
  ),
  egg: (
    <svg className="ic-tall" viewBox="0 0 18.9983 25.0019" fill="none" aria-hidden>
      <path d="M9.49916 0.000291973C5.41413 -0.0509443 0 6.64944 0 13.5531C0 20.4568 4.25348 25.0019 9.49916 25.0019C14.7448 25.0019 18.9983 20.4568 18.9983 13.5531C18.9983 6.64944 13.5842 0.0515283 9.49916 0.000291973Z" fill="#fff" />
    </svg>
  ),
}

function WhatIs() {
  const tags = [
    { label: 'Vegan', icon: TAG_ICONS.vegan },
    { label: 'Lactose Free', icon: TAG_ICONS.lactose },
    { label: 'Egg Free', icon: TAG_ICONS.egg },
  ]
  return (
    <section className="section whatis" id="story">
      <div className="container">
        <div className="whatis-media">
          <img src="/assets/almond.png" alt="A freshly baked chimney cake" />
        </div>
        <div className="whatis-text">
          <h2>What is <span className="accent">chimney cake?</span></h2>
          <p>
            Chimney cake, or kürtőskalács, is a traditional Hungarian sweet pastry
            baked on a rotating spit. It’s crispy and caramelised on the outside,
            soft and fluffy inside, and best enjoyed warm while exploring Budapest.
          </p>
          <div className="tags">
            {tags.map((t) => (
              <div className="tag" key={t.label}>
                <span className="icon">{t.icon}</span>
                {t.label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---------------- Meet the cone ---------------- */
function MeetTheCone() {
  const [active, setActive] = useState(0)
  const scrollRef = useRef(null)

  useEffect(() => {
    const onScroll = () => {
      const el = scrollRef.current
      if (!el) return
      const total = el.offsetHeight - window.innerHeight
      const scrolled = Math.min(Math.max(-el.getBoundingClientRect().top, 0), total)
      const progress = total > 0 ? scrolled / total : 0
      const idx = Math.min(
        CONE_FLAVORS.length - 1,
        Math.floor(progress * CONE_FLAVORS.length),
      )
      setActive(idx)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    onScroll()
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  const cone = CONE_FLAVORS[active]
  return (
    <section className="cone" id="products">
      <div className="container cone-head">
        <h2 className="section-title center">
          Meet the Chimney <span className="accent">Cone</span>
        </h2>
        <p className="section-sub center">
          Our chimney cones take the classic pastry and turn it into a filled
          dessert: soft serve, Nutella, whipped cream, chocolate and toppings
          inside a freshly baked chimney cake cone.
        </p>
      </div>
      <div className="cone-scroll" ref={scrollRef}>
        <div className="cone-sticky">
          <div className="container cone-grid">
            <div className="cone-list">
              <div className="accordion">
                {CONE_FLAVORS.map((f, i) => (
                  <div className={`acc-item${active === i ? ' open active' : ''}`} key={f.name}>
                    <div className="acc-head">
                      <span className="acc-toggle" />
                      <span className="acc-title">{f.name}</span>
                    </div>
                    {f.note && (
                      <div className="acc-body-wrap">
                        <div className="acc-body">
                          <div className="acc-body-inner">{f.note}</div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="cone-more">
                <span className="plus" aria-hidden />
                <img src="/assets/nutella-logo.png" alt="Nutella" />
              </div>
            </div>
            <div className="cone-feature">
              <div className="cone-stage" key={active}>
                <img className="cone-img" src={cone.img} alt={cone.name} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---------------- Classic experience ---------------- */
const CONELINE = [
  { t: '1.5%', r: '84.82%', b: '0.44%', l: '0' },
  { t: '1.49%', r: '77.47%', b: '0.06%', l: '8.01%' },
  { t: '0', r: '69.87%', b: '0', l: '15.43%' },
  { t: '1.35%', r: '63.06%', b: '1.81%', l: '23.21%' },
  { t: '2.98%', r: '57.45%', b: '1.67%', l: '30.7%' },
  { t: '4.62%', r: '0', b: '0.6%', l: '38.52%' },
  { t: '5%', r: '20.83%', b: '10.51%', l: '46.58%' },
  { t: '14.99%', r: '46.31%', b: '4.48%', l: '45.51%' },
  { t: '16.64%', r: '32.58%', b: '51.19%', l: '55.05%' },
  { t: '14.43%', r: '3.53%', b: '43.15%', l: '74.18%' },
]

function ConeLineArt() {
  return (
    <div className="coneline" aria-hidden>
      {CONELINE.map((p, i) => (
        <div
          key={i}
          className="coneline-piece"
          style={{ top: p.t, right: p.r, bottom: p.b, left: p.l }}
        >
          <img src={`/assets/coneline-${i}.svg`} alt="" />
        </div>
      ))}
    </div>
  )
}

function ClassicExperience() {
  const scrollRef = useRef(null)
  const trackRef = useRef(null)
  const cardsRef = useRef(null)

  useEffect(() => {
    const onScroll = () => {
      const el = scrollRef.current
      const cards = cardsRef.current
      const track = trackRef.current
      if (!el || !cards || !track) return
      const total = el.offsetHeight - window.innerHeight
      const scrolled = Math.min(Math.max(-el.getBoundingClientRect().top, 0), total)
      const progress = total > 0 ? scrolled / total : 0
      const max = Math.max(0, cards.scrollWidth - track.clientWidth)
      cards.style.transform = `translateX(${-progress * max}px)`
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    onScroll()
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <section className="classic" id="classic">
      <div className="classic-scroll" ref={scrollRef}>
        <div className="classic-sticky">
          <div className="classic-row">
            <div className="classic-intro">
              <h2 className="section-title">
                The classic chimney <span className="accent">cake</span> experience
              </h2>
              <p>
                Our classic chimney cakes are freshly baked, rolled in sugar,
                caramelised over heat and coated in your favourite flavour. Simple,
                warm, sweet and made to be enjoyed on the go.
              </p>
              <div className="flavor-tabs">
                <span className="plus" aria-hidden />
                <img src="/assets/nutella-logo.png" alt="Nutella" />
                <span className="tab-slash" aria-hidden />
                <span className="tab-pistachio">Pistachio</span>
              </div>
            </div>
            <div className="classic-cards" ref={trackRef}>
              <div className="flavor-cards" ref={cardsRef}>
                {FLAVOR_CARDS.map((c) => (
                  <div key={c.name}>
                    <div className="flavor-card">
                      <img className="cone-base" src={c.img} alt={c.name} />
                      <img className="cone-hover" src={c.hover} alt="" aria-hidden />
                    </div>
                    <div className="flavor-meta">
                      <div className="name">{c.name}</div>
                      <div className="hu">{c.hu}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <ConeLineArt />
        </div>
      </div>
    </section>
  )
}

/* ---------------- Why you can't skip ---------------- */
function WhySkip() {
  return (
    <section className="section why">
      <div className="container">
        <h2 className="section-title center">
          Why you <span className="accent">can’t skip</span>
          <br /> chimney cake in Budapest
        </h2>
        <p className="section-sub center">
          Freshly baked chimney cake is more than a dessert — it’s part of the
          Budapest street-food experience. Warm dough, caramelised sugar, cinnamon,
          ice cream, toppings and that unmistakable sweet smell make it the perfect
          treat between sightseeing stops.
        </p>
        <div className="why-cards">
          {WHY_CARDS.map((c) => (
            <div className="why-card" key={c.title}>
              <img src={c.img} alt={c.title} />
              <div className="why-caption">
                <h3>{c.title}</h3>
                <p>{c.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------------- Locations ---------------- */
function Locations() {
  const [open, setOpen] = useState(2)
  const cardsRef = useRef(null)
  const fillRef = useRef(null)

  const updateProgress = () => {
    const el = cardsRef.current
    const fill = fillRef.current
    if (!el || !fill) return
    const frac = Math.min(1, el.clientWidth / el.scrollWidth)
    const max = el.scrollWidth - el.clientWidth
    const p = max > 0 ? el.scrollLeft / max : 0
    fill.style.width = `${frac * 100}%`
    fill.style.transform = `translateX(${(p * (1 - frac)) / (frac || 1) * 100}%)`
  }

  useEffect(() => {
    updateProgress()
    window.addEventListener('resize', updateProgress)
    return () => window.removeEventListener('resize', updateProgress)
  }, [])

  const onPointerDown = (e) => {
    const el = cardsRef.current
    if (!el) return
    const startX = e.clientX
    const startScroll = el.scrollLeft
    let moved = false
    const move = (ev) => {
      const dx = ev.clientX - startX
      if (Math.abs(dx) > 4) {
        moved = true
        el.classList.add('dragging')
      }
      el.scrollLeft = startScroll - dx
    }
    const up = () => {
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerup', up)
      el.classList.remove('dragging')
      if (moved) {
        const stop = (ce) => {
          ce.stopPropagation()
          ce.preventDefault()
          window.removeEventListener('click', stop, true)
        }
        window.addEventListener('click', stop, true)
        setTimeout(() => window.removeEventListener('click', stop, true), 0)
      }
    }
    window.addEventListener('pointermove', move)
    window.addEventListener('pointerup', up)
  }

  const selected = open >= 0 ? LOCATIONS[open] : null
  const mapSrc =
    selected && selected.cid
      ? `https://www.google.com/maps?cid=${selected.cid}&output=embed`
      : `https://www.google.com/maps?q=${encodeURIComponent(
          'Chimney Cake Shop, Budapest',
        )}&z=13&output=embed`
  const mapTitle = selected
    ? `${selected.name} — ${selected.addr}`
    : 'Chimney Cake Shop locations in Budapest'

  return (
    <section className="section locations" id="locations">
      <div className="container">
        <h2 className="section-title">
          Find your <span className="accent">nearest</span>
          <br /> Chimney Cake Shop
        </h2>
        <p>
          We’re in some of Budapest’s busiest city-centre spots, so a freshly baked
          chimney cake is probably just a short walk away.
        </p>
        <div
          className="loc-cards"
          ref={cardsRef}
          onScroll={updateProgress}
          onPointerDown={onPointerDown}
        >
          {LOCATIONS.map((l, i) => {
            const isOpen = open === i
            return (
              <div
                className={`loc-card${isOpen ? ' open' : ''}${l.placeholder ? ' placeholder' : ''}`}
                key={l.name}
                onClick={() => setOpen(i)}
              >
                {l.placeholder ? (
                  <div className="loc-ph"><img src="/assets/logo-emblema.png" alt="" /></div>
                ) : (
                  <img src={l.img} alt={l.name} />
                )}
                <div className="loc-bar">
                  <div className="loc-bar-head">
                    <h4>{l.name}</h4>
                    <button
                      className="loc-toggle"
                      aria-label={`Toggle ${l.name}`}
                      onClick={(e) => {
                        e.stopPropagation()
                        setOpen(isOpen ? -1 : i)
                      }}
                    />
                  </div>
                  <div className="loc-detail-wrap">
                    <div className="loc-detail">
                      <p className="addr">{l.addr}</p>
                      <p className="hours">{l.hours}</p>
                      <a className="btn-maps" href="#map">Open in maps</a>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
        <div className="progress"><span ref={fillRef} /></div>
        <div className="map-embed" id="map">
          <iframe
            title={mapTitle}
            src={mapSrc}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  )
}

/* ---------------- Gallery ---------------- */
// Original design order (left → right), with the featured cone centered
const GALLERY = [
  '/assets/gallery-2.jpg',
  '/assets/gallery-3.jpg',
  '/assets/gallery-5.jpg',
  '/assets/gallery-4.jpg',
  '/assets/gallery-1.jpg',
]

function Gallery() {
  const [active, setActive] = useState(2)
  const trackRef = useRef(null)
  const [tx, setTx] = useState(0)

  const recenter = () => {
    const track = trackRef.current
    if (!track) return
    const item = track.children[active]
    if (!item) return
    const winW = track.parentElement.clientWidth
    const itemCenter = item.offsetLeft + item.offsetWidth / 2
    setTx(winW / 2 - itemCenter)
  }

  useEffect(() => {
    recenter()
    window.addEventListener('resize', recenter)
    return () => window.removeEventListener('resize', recenter)
  }, [active])

  const prev = () => setActive((a) => Math.max(0, a - 1))
  const next = () => setActive((a) => Math.min(GALLERY.length - 1, a + 1))

  return (
    <section className="section gallery">
      <h2 className="section-title center">Gallery</h2>
      <div className="gallery-window">
        <div
          className="gallery-track"
          ref={trackRef}
          style={{ transform: `translateX(${tx}px)` }}
        >
          {GALLERY.map((src, i) => {
            const d = Math.abs(i - active)
            return (
              <figure
                key={i}
                className={`gallery-item${active === i ? ' active' : ''}`}
                style={{
                  transform: `scale(${Math.max(0.66, 1.14 - d * 0.24)})`,
                  opacity: Math.max(0.55, 1 - d * 0.14),
                  zIndex: GALLERY.length - d,
                }}
                onClick={() => setActive(i)}
              >
                <img src={src} alt="" />
              </figure>
            )
          })}
        </div>
      </div>
      <div className="gallery-nav">
        <button className="round-btn" onClick={prev} aria-label="Previous" disabled={active === 0}>
          <ArrowLeft />
        </button>
        <button className="round-btn" onClick={next} aria-label="Next" disabled={active === GALLERY.length - 1}>
          <ArrowRight />
        </button>
      </div>
    </section>
  )
}

/* ---------------- Reviews ---------------- */
function Reviews() {
  const n = REVIEWS.length
  const windowRef = useRef(null)
  const [start, setStart] = useState(0)
  const [perView, setPerView] = useState(3)
  const [step, setStep] = useState(0)

  useEffect(() => {
    const recalc = () => {
      const el = windowRef.current
      if (!el) return
      const pv = window.innerWidth <= 680 ? 1 : window.innerWidth <= 1100 ? 2 : 3
      const gap = 24
      const cardW = (el.clientWidth - gap * (pv - 1)) / pv
      el.style.setProperty('--card-w', `${cardW}px`)
      setPerView(pv)
      setStep(cardW + gap)
    }
    recalc()
    window.addEventListener('resize', recalc)
    return () => window.removeEventListener('resize', recalc)
  }, [])

  const maxStart = Math.max(0, n - perView)
  const clampedStart = Math.min(start, maxStart)
  const prev = () => setStart((s) => Math.max(0, s - 1))
  const next = () => setStart((s) => Math.min(maxStart, s + 1))

  return (
    <section className="section reviews">
      <div className="container">
        <h3 className="reviews-head">Loved by Budapest visitors</h3>
        <div className="reviews-window" ref={windowRef}>
          <div
            className="review-track"
            style={{ transform: `translateX(${-clampedStart * step}px)` }}
          >
            {REVIEWS.map((r) => (
              <div className="review-card" key={r.name}>
                <div className="review-top">
                  <div className="review-id">
                    <span className="avatar">{r.name.charAt(0)}</span>
                    <div>
                      <div className="name">{r.name}</div>
                      <div className="stars">
                        {[0, 1, 2, 3, 4].map((s) => (
                          <Star key={s} filled={s < (r.rating ?? 5)} />
                        ))}
                      </div>
                      <span className="review-date">{r.date}</span>
                    </div>
                  </div>
                </div>
                <p>{r.text}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="reviews-nav">
          <button
            className="round-btn"
            onClick={prev}
            disabled={clampedStart === 0}
            aria-label="Previous reviews"
          >
            <ArrowLeft />
          </button>
          <div className="dots" style={{ marginTop: 0 }}>
            {Array.from({ length: maxStart + 1 }).map((_, i) => (
              <button
                key={i}
                className={`dot${clampedStart === i ? ' active' : ''}`}
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => setStart(i)}
              />
            ))}
          </div>
          <button
            className="round-btn"
            onClick={next}
            disabled={clampedStart === maxStart}
            aria-label="Next reviews"
          >
            <ArrowRight />
          </button>
        </div>
      </div>
    </section>
  )
}

/* ---------------- FAQ ---------------- */
function Faq() {
  const [open, setOpen] = useState(0)
  return (
    <section className="section faq" id="faq">
      <div className="container">
        <h2 className="section-title">
          Good to <span className="accent">know</span> before you visit
        </h2>
        <div className="faq-list">
          {FAQS.map((f, i) => (
            <div className={`faq-item${open === i ? ' open' : ''}`} key={f.q}>
              <button className="faq-head" onClick={() => setOpen(open === i ? -1 : i)}>
                <span className="faq-q">{f.q}</span>
                <span className="faq-icon" />
              </button>
              <div className="faq-body-wrap">
                <div className="faq-body">
                  <div className="faq-body-inner">{f.a}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------------- Footer ---------------- */
function Footer() {
  return (
    <footer className="footer" id="franchise">
      <div className="container footer-top">
        <img className="footer-emblem" src="/assets/logo-emblema.png" alt="Chimney Cake Shop" />
        <div className="footer-col">
          <h5>Restaurants</h5>
          {FOOTER_RESTAURANTS.map((r) => <p key={r}>{r}</p>)}
        </div>
        <div className="footer-col">
          <h5>Sitemap</h5>
          <a href="#products">Products</a>
          <a href="#story">Our Story</a>
          <a href="#franchise">Franchise</a>
          <a href="#locations">Locations</a>
        </div>
        <div className="footer-col">
          <h5>Contact</h5>
          <p>Magyarország</p>
          <p>Budapest</p>
          <p>Váci utca 23.</p>
        </div>
      </div>
      <div className="footer-bar">
        <div className="container">
          <div className="footer-copy">
            <p>© 2026 – Chimney Cake Shop – Minden jog fenntartva</p>
            <p>A weboldalt a Chimney Cake megbízásából a Peppersgroup készítette.</p>
          </div>
          <div className="footer-right">
            <span className="footer-email">chimneycakeshop.hu@gmail.com</span>
            <div className="socials">
              <a href="#" aria-label="Instagram">
                <svg viewBox="0 0 24 24"><path d="M12 2.2c3.2 0 3.6 0 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s0 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58 0-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.8 3.8 0 0 1-1.38-.9 3.8 3.8 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.21 15.58 2.2 15.2 2.2 12s0-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.21 8.8 2.2 12 2.2zm0 3.13A6.67 6.67 0 1 0 18.67 12 6.67 6.67 0 0 0 12 5.33zm0 11a4.33 4.33 0 1 1 4.33-4.33A4.33 4.33 0 0 1 12 16.33zm6.93-11.27a1.56 1.56 0 1 1-1.56-1.56 1.56 1.56 0 0 1 1.56 1.56z" /></svg>
              </a>
              <a href="#" aria-label="TikTok">
                <svg viewBox="0 0 24 24"><path d="M16.5 2h-3v13.5a2.5 2.5 0 1 1-2.5-2.5c.17 0 .34 0 .5.05V9.9a5.6 5.6 0 0 0-.5-.02 5.62 5.62 0 1 0 5.62 5.62V8.66a6.5 6.5 0 0 0 3.88 1.27V6.93a3.62 3.62 0 0 1-3.5-3.5V2z" /></svg>
              </a>
              <a href="#" aria-label="Facebook">
                <svg viewBox="0 0 24 24"><path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12z" /></svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

/* ---------------- App ---------------- */
export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <WhatIs />
        <MeetTheCone />
        <ClassicExperience />
        <WhySkip />
        <Locations />
        <Gallery />
        <Reviews />
        <Faq />
      </main>
      <Footer />
    </>
  )
}
