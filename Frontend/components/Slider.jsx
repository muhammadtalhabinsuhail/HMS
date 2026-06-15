'use client';

import { useEffect, useState } from 'react';

const images = [
  'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85',
  'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa',
  'https://images.unsplash.com/photo-1414235077428-338989a2e8c0',
];

export default function Slider() {
  const [index, setIndex] = useState(0);

  const nextSlide = () => setIndex((prev) => (prev + 1) % images.length);
  const prevSlide = () => setIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));

  useEffect(() => {
    const interval = setInterval(nextSlide, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[500px] overflow-hidden rounded-2xl shadow-lg">

      {/* Image */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={images[index]}
        alt="slide"
        className="w-full h-full object-cover transition-all duration-700"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Animated Text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
        <h1 className="text-3xl md:text-5xl font-bold animate-fadeInUp">
          Welcome to a world
        </h1>
        <h2 className="text-xl md:text-3xl mt-2 font-light animate-fadeInUp delay-200">
          where luxury meets elegance
        </h2>
      </div>

      {/* Left Button */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white px-3 py-2 rounded-full hover:bg-black"
      >
        ❮
      </button>

      {/* Right Button */}
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white px-3 py-2 rounded-full hover:bg-black"
      >
        ❯
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 w-full flex justify-center gap-2">
        {images.map((_, i) => (
          <div
            key={i}
            onClick={() => setIndex(i)}
            className={`w-3 h-3 rounded-full cursor-pointer ${i === index ? 'bg-white' : 'bg-gray-400'}`}
          />
        ))}
      </div>

      <style>{`
        .animate-fadeInUp {
          animation: fadeInUp 1s ease forwards;
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .delay-200 { animation-delay: 0.2s; }
      `}</style>
    </div>
  );
}
