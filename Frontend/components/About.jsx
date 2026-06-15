'use client';

import { useState, useEffect } from 'react';

function IconOwn() {
  return (
    <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
      <circle cx="26" cy="26" r="25" stroke="rgba(180,140,60,0.4)" strokeWidth="1" />
      <path
        d="M18 20 L26 14 L34 20 L34 32 L26 38 L18 32 Z"
        stroke="rgba(180,140,60,0.8)"
        strokeWidth="1.2"
        fill="rgba(180,140,60,0.08)"
      />
      <circle cx="26" cy="26" r="3" fill="rgba(180,140,60,0.7)" />
    </svg>
  );
}

function IconWin() {
  return (
    <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
      <circle cx="26" cy="26" r="25" stroke="rgba(180,140,60,0.4)" strokeWidth="1" />
      <path
        d="M16 30 Q20 18 26 22 Q32 26 36 18"
        stroke="rgba(180,140,60,0.8)"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M32 14 L36 18 L32 22"
        stroke="rgba(180,140,60,0.8)"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="26" cy="35" r="4" stroke="rgba(180,140,60,0.6)" strokeWidth="1" fill="rgba(180,140,60,0.1)" />
      <path
        d="M24 35 L26 37 L29 33"
        stroke="rgba(180,140,60,0.9)"
        strokeWidth="1.2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconShare() {
  return (
    <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
      <circle cx="26" cy="26" r="25" stroke="rgba(180,140,60,0.4)" strokeWidth="1" />
      <circle cx="18" cy="22" r="5" stroke="rgba(180,140,60,0.7)" strokeWidth="1.2" fill="rgba(180,140,60,0.08)" />
      <circle cx="34" cy="22" r="5" stroke="rgba(180,140,60,0.7)" strokeWidth="1.2" fill="rgba(180,140,60,0.08)" />
      <circle cx="26" cy="34" r="5" stroke="rgba(180,140,60,0.7)" strokeWidth="1.2" fill="rgba(180,140,60,0.08)" />
      <path d="M22 24 L30 24 M21 27 L25 31 M31 27 L27 31" stroke="rgba(180,140,60,0.5)" strokeWidth="0.8" />
    </svg>
  );
}

const PRINCIPLES = [
  {
    icon: <IconOwn />,
    title: 'We Own',
    desc: 'We take full responsibility for every experience we deliver — celebrating our wins and owning our shortcomings with equal resolve. Accountability is the cornerstone of our character.',
  },
  {
    icon: <IconWin />,
    title: 'We Win',
    desc: 'Success for us is not measured in numbers alone — it\'s found in the smile of a guest who felt truly cared for. We pursue excellence relentlessly, elevating the standard with every interaction.',
  },
  {
    icon: <IconShare />,
    title: 'We Share',
    desc: 'Prosperity multiplies when shared. We invest in our community, our team, and our guests — because building something meaningful means bringing others along for the journey.',
  },
];

const SPONSORS = [
  {
    name: 'Indus Valley Group',
    bg: 'bg-blue-50',
    desc: 'A diversified organization inspired by the rich heritage of the Indus region, dedicated to sustainable development, business innovation, and community-focused initiatives in emerging markets.',
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <path d="M18 4 L30 11 L30 25 L18 32 L6 25 L6 11 Z" fill="#185FA5" opacity="0.2" />
        <path d="M18 4 L30 11 L30 25 L18 32 L6 25 L6 11 Z" stroke="#185FA5" strokeWidth="1.5" fill="none" />
        <path d="M12 18 L16 22 L24 14" stroke="#185FA5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    name: 'DHA Enterprises',
    bg: 'bg-green-50',
    desc: 'A well-established business group recognized for quality, innovation, and excellence — with a strong presence in urban development and commercial ventures that promote modern living.',
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <rect x="6" y="6" width="24" height="24" rx="3" fill="#3B6D11" opacity="0.15" />
        <rect x="6" y="6" width="24" height="24" rx="3" stroke="#3B6D11" strokeWidth="1.5" fill="none" />
        <path d="M12 18 H24 M18 12 V24" stroke="#3B6D11" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: 'Karachi Coastal Group',
    bg: 'bg-teal-50',
    desc: 'A dynamic organization focused on development and investment along Karachi\'s coastal regions — supporting modern infrastructure, tourism, and hospitality projects that enhance the city\'s growth.',
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <circle cx="18" cy="18" r="12" fill="#0F6E56" opacity="0.15" />
        <circle cx="18" cy="18" r="12" stroke="#0F6E56" strokeWidth="1.5" fill="none" />
        <path d="M18 10 Q26 18 18 26 Q10 18 18 10Z" stroke="#0F6E56" strokeWidth="1.2" fill="none" />
        <circle cx="18" cy="18" r="2.5" fill="#0F6E56" />
      </svg>
    ),
  },
  {
    name: 'PepsiCo — Beverage Partner',
    bg: 'bg-blue-50',
    desc: 'As our official food and beverage sponsor, PepsiCo brings the world\'s most recognized refreshments to every table — ensuring guests enjoy iconic flavors that complement every dining experience.',
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <ellipse cx="18" cy="18" rx="12" ry="12" fill="#1a5fa8" opacity="0.12" />
        <path d="M10 14 Q18 10 26 14 L26 24 Q18 28 10 24 Z" fill="#c41e3a" opacity="0.15" />
        <path d="M10 14 Q18 10 26 14" stroke="#1a5fa8" strokeWidth="1.5" fill="none" />
        <path d="M10 14 L10 24 Q18 28 26 24 L26 14" stroke="#c41e3a" strokeWidth="1.2" fill="none" />
        <text x="18" y="20" textAnchor="middle" fontSize="8" fontWeight="700" fill="#1a5fa8" fontFamily="sans-serif">
          PEPSI
        </text>
      </svg>
    ),
  },
];

export default function About() {
  const [slideIndex, setSlideIndex] = useState(0);
  const totalSlides = 3;

  const goTo = (n) => setSlideIndex((n + totalSlides) % totalSlides);

  useEffect(() => {
    const timer = setInterval(
      () => setSlideIndex((prev) => (prev + 1) % totalSlides),
      4000
    );
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="font-jost text-neutral-900 bg-stone-100">

      {/* HERO SLIDER */}
      <div className="relative h-[420px] overflow-hidden bg-[#1a1209]">
        <div
          className="flex h-full transition-transform duration-[900ms] ease-[cubic-bezier(.4,0,.2,1)]"
          style={{ transform: `translateX(-${slideIndex * 100}%)` }}
        >
          <div
            className="min-w-full h-full bg-cover bg-center brightness-[0.65]"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1200&q=80')" }}
          />
          <div
            className="min-w-full h-full bg-cover bg-center brightness-[0.65]"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200&q=80')" }}
          />
          <div
            className="min-w-full h-full bg-cover bg-center brightness-[0.65]"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80')" }}
          />
        </div>

        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 pointer-events-none">
          <span className="font-jost text-[11px] tracking-[4px] text-[rgba(255,220,160,0.9)] uppercase">
            Hospitality Redefined
          </span>
          <h1 className="font-playfair text-5xl md:text-[48px] text-white text-center leading-tight">
            Where Every Stay<br />Becomes a{' '}
            <em className="italic text-[rgba(255,220,160,0.95)]">Story</em>
          </h1>
        </div>

        <div className="absolute inset-0 flex items-center justify-between px-5">
          <button
            onClick={() => goTo(slideIndex - 1)}
            className="w-10 h-10 rounded-full bg-white/15 border border-white/30 text-white text-lg flex items-center justify-center hover:bg-white/25 transition-colors cursor-pointer"
          >
            &#8592;
          </button>
          <button
            onClick={() => goTo(slideIndex + 1)}
            className="w-10 h-10 rounded-full bg-white/15 border border-white/30 text-white text-lg flex items-center justify-center hover:bg-white/25 transition-colors cursor-pointer"
          >
            &#8594;
          </button>
        </div>

        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
          {[0, 1, 2].map((i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`w-1.5 h-1.5 rounded-full border-none transition-colors duration-300 cursor-pointer ${
                i === slideIndex ? 'bg-white' : 'bg-white/40'
              }`}
            />
          ))}
        </div>
      </div>

      {/* OUR STORY */}
      <section className="px-6 md:px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="rounded overflow-hidden aspect-[4/3]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&q=80"
              alt="Hotel lobby ambiance"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <p className="text-[11px] tracking-[4px] text-neutral-400 uppercase mb-4">Our Story</p>
            <h2 className="font-playfair text-[34px] font-normal leading-snug mb-7">
              A Vision Born<br />from Simplicity
            </h2>
            <p className="text-base leading-[1.85] text-neutral-500 font-light">
              Every journey has a story, and ours begins with a simple idea — to create a place where
              travelers feel at home. What started as a vision to offer comfort and care soon became a
              destination where guests arrive as strangers and leave with lasting memories.
            </p>
            <div className="w-12 h-px bg-[rgba(180,140,60,0.5)] my-6" />
            <p className="text-base leading-[1.85] text-neutral-500 font-light">
              From the moment you step inside, every detail is designed to bring ease and relaxation.
              Whether it&apos;s a warm welcome, a peaceful room, or attentive service, our goal is to make
              every stay special. Here, comfort meets convenience, and every guest becomes part of our story.
            </p>
          </div>
        </div>
      </section>

      {/* OUR PRINCIPLES */}
      <div className="bg-white border-y border-neutral-200">
        <div className="py-16">
          <div className="text-center px-6 md:px-10 pb-12">
            <p className="text-[11px] tracking-[4px] text-neutral-400 uppercase mb-4">Our Principles</p>
            <h2 className="font-playfair text-[34px] font-normal leading-snug">The Values We Live By</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 border-t border-neutral-200 divide-y md:divide-y-0 md:divide-x divide-neutral-200">
            {PRINCIPLES.map(({ icon, title, desc }) => (
              <div key={title} className="bg-white px-9 py-12 text-center">
                <div className="flex items-center justify-center mb-5">{icon}</div>
                <p className="font-playfair text-[22px] font-semibold mb-3">{title}</p>
                <p className="text-sm leading-[1.75] text-neutral-400 font-light">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ROOMS GALLERY */}
      <section className="px-6 md:px-10 py-16 bg-stone-100">
        <div className="text-center mb-10">
          <p className="text-[11px] tracking-[4px] text-neutral-400 uppercase mb-4">Our Spaces</p>
          <h2 className="font-playfair text-[34px] font-normal leading-snug">Crafted for Comfort</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            { src: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=700&q=80', alt: 'Bedroom', label: 'Bedrooms' },
            { src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=700&q=80', alt: 'Dining', label: 'Dining' },
            { src: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=700&q=80', alt: 'Hotel Ambiance', label: 'Ambiance' },
          ].map(({ src, alt, label }) => (
            <div key={label} className="rounded overflow-hidden relative group cursor-pointer">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt={alt}
                className="w-full aspect-[4/3] object-cover block transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute bottom-0 left-0 right-0 pt-5 px-4 pb-3.5 bg-gradient-to-t from-black/70 to-transparent">
                <span className="text-white text-[13px] tracking-[2px] uppercase">{label}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SPONSORS */}
      <section className="px-6 md:px-10 py-16 bg-white border-t border-neutral-200">
        <div className="text-center mb-12">
          <p className="text-[11px] tracking-[4px] text-neutral-400 uppercase mb-4">Our Sponsors</p>
          <h2 className="font-playfair text-[34px] font-normal leading-snug">Partners in Excellence</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[860px] mx-auto">
          {SPONSORS.map(({ name, bg, desc, icon }) => (
            <div key={name} className="border border-neutral-200 rounded-xl p-7 flex gap-5 items-start">
              <div className={`w-16 h-16 rounded-lg flex-shrink-0 flex items-center justify-center ${bg}`}>
                {icon}
              </div>
              <div>
                <p className="font-playfair text-[17px] font-semibold mb-2">{name}</p>
                <p className="text-[13px] leading-[1.7] text-neutral-400 font-light">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
