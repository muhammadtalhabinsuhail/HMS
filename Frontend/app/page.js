"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import { Shield, Star, Wifi, Coffee, Car, Clock } from "lucide-react";

const SLIDES = [
  { img: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1400&q=80", title: "Welcome to RT Grace", sub: "Where luxury meets elegance" },
  { img: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1400&q=80", title: "Exceptional Rooms", sub: "Crafted for your comfort" },
  { img: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1400&q=80", title: "Fine Dining", sub: "A culinary journey awaits" },
];

const AMENITIES = [
  { icon: Wifi, label: "Free WiFi" },
  { icon: Coffee, label: "Room Service" },
  { icon: Car, label: "Valet Parking" },
  { icon: Shield, label: "24/7 Security" },
  { icon: Star, label: "5-Star Rating" },
  { icon: Clock, label: "Late Checkout" },
];

export default function HomePage() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIdx((p) => (p + 1) % SLIDES.length), 4000);
    return () => clearInterval(t);
  }, []);

  const slide = SLIDES[idx];

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Slider */}
      <section className="relative h-screen overflow-hidden">
        <img
          key={idx}
          src={slide.img}
          alt="hero"
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-6">
          <p className="font-jost text-xs tracking-[6px] text-brand-300 uppercase mb-4">RT Grace Hotel</p>
          <h1 className="font-playfair text-5xl md:text-7xl font-normal leading-tight mb-4">
            {slide.title}
          </h1>
          <p className="font-jost font-light text-white/80 text-lg md:text-xl mb-10">{slide.sub}</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/hotels" className="bg-brand-700 text-white font-jost font-medium px-8 py-3 rounded hover:bg-brand-800 transition-colors tracking-wide text-sm">
              Explore Hotels
            </Link>
            <Link href="/auth/signup" className="border border-white/60 text-white font-jost font-light px-8 py-3 rounded hover:bg-white/10 transition-colors text-sm">
              Get Started
            </Link>
          </div>
        </div>

        {/* Slide dots */}
        <div className="absolute bottom-8 w-full flex justify-center gap-2">
          {SLIDES.map((_, i) => (
            <button key={i} onClick={() => setIdx(i)} className={`h-1.5 rounded-full transition-all duration-300 ${i === idx ? "w-8 bg-brand-400" : "w-2 bg-white/40"}`} />
          ))}
        </div>
      </section>

      {/* Amenities Strip */}
      <section className="bg-brand-50 border-y border-brand-100 py-10">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 text-center">
          {AMENITIES.map(({ icon: Icon, label }) => (
            <div key={label} className="flex flex-col items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-brand-100 flex items-center justify-center">
                <Icon size={18} className="text-brand-700" />
              </div>
              <span className="font-jost text-xs font-medium text-neutral-600 tracking-wide">{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <p className="text-xs tracking-[4px] text-brand-600 uppercase mb-3">About Us</p>
          <h2 className="font-playfair text-4xl font-normal mb-5 leading-snug">
            A Heritage of <em className="text-brand-700 italic">Excellence</em>
          </h2>
          <p className="font-jost font-light text-neutral-500 leading-relaxed mb-5">
            RT Grace Hotel has been a symbol of refined hospitality across Pakistan for over two decades. 
            Our properties in Karachi, Sukkur, and Hyderabad offer world-class accommodation, 
            fine dining, and event spaces tailored to every occasion.
          </p>
          <p className="font-jost font-light text-neutral-500 leading-relaxed">
            Every guest is a cherished story waiting to be written. We go beyond accommodation — 
            we craft experiences that linger long after checkout.
          </p>
          <div className="flex gap-8 mt-8">
            {[["3+", "Locations"], ["500+", "Rooms"], ["20K+", "Guests"]].map(([num, label]) => (
              <div key={label}>
                <div className="font-playfair text-3xl text-brand-700">{num}</div>
                <div className="font-jost text-xs text-neutral-400 tracking-wider uppercase mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="relative h-80 md:h-96">
          <img src="https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&q=80" alt="hotel" className="w-full h-full object-cover rounded-2xl" />
          <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-brand-700 rounded-xl -z-10" />
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-800 py-16 text-center text-white">
        <p className="font-jost text-xs tracking-[4px] text-brand-300 uppercase mb-3">Ready to Experience Luxury?</p>
        <h2 className="font-playfair text-4xl font-normal mb-6">Book Your Perfect Stay</h2>
        <Link href="/hotels" className="inline-block bg-white text-brand-800 font-jost font-medium px-10 py-3 rounded hover:bg-brand-50 transition-colors tracking-wide text-sm">
          View All Hotels
        </Link>
      </section>

      {/* Footer */}
      <footer className="bg-neutral-900 py-8 text-center">
        <p className="font-jost font-light text-neutral-400 text-sm tracking-wider">
          © {new Date().getFullYear()} RT Grace Hotel — All Rights Reserved
        </p>
      </footer>
    </main>
  );
}