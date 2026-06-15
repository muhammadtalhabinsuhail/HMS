'use client';

import { useState } from 'react';

function ImageSlider({ images, height = 'h-64' }) {
  const [idx, setIdx] = useState(0);
  const prev = () => setIdx((i) => (i - 1 + images.length) % images.length);
  const next = () => setIdx((i) => (i + 1) % images.length);

  return (
    <div className={`relative w-full ${height} overflow-hidden rounded-xl group`}>
      {images.map((src, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={i}
          src={src}
          alt={`slide-${i}`}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
            i === idx ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ))}

      <button
        onClick={prev}
        className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/60 z-10"
      >
        &#8592;
      </button>
      <button
        onClick={next}
        className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/60 z-10"
      >
        &#8594;
      </button>

      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setIdx(i)}
            className={`h-1.5 rounded-full border-none transition-all duration-300 ${
              i === idx ? 'bg-white w-4' : 'bg-white/50 w-1.5'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

function CapacityTable({ rows, headers }) {
  return (
    <div className="overflow-x-auto mt-5">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="bg-amber-900/10">
            {headers.map((h) => (
              <th
                key={h}
                className="px-4 py-2.5 text-left font-jost font-medium text-amber-900 border border-amber-200 whitespace-nowrap text-xs tracking-wider uppercase"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-amber-50/40'}>
              {row.map((cell, j) => (
                <td
                  key={j}
                  className="px-4 py-2.5 text-neutral-700 border border-amber-100 font-jost font-light"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const TABS = ['Events', 'Dining'];

const VENUES = [
  {
    id: 'rang-mahal',
    name: 'Rang Mahal',
    type: 'Banquet Hall',
    description:
      'Within Rang Mahal\'s grand hall, elegance meets festivity — where celebrations unfold in a tapestry of grandeur and grace at RT Grace Hotel\'s timeless banquet sanctuary.',
    images: [
      'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&q=80',
      'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=80',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80',
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&q=80',
      'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&q=80',
      'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&q=80',
    ],
    tableHeaders: ['Dimension', 'Area Sq.ft', 'Theater Style', 'Classroom', '"U" Shape', 'Sit Down', 'Reception'],
    tableRows: [['60" × 35"', '2,100', '150', '80', '60', '125', '150']],
  },
  {
    id: 'deewan-e-khaas',
    name: 'Deewan E Khaas',
    type: 'Conference Hall',
    description:
      'RT Grace Hotel\'s premier conference space where innovation meets elegance, fostering insightful exchanges and transformative gatherings in an atmosphere of refined sophistication.',
    images: [
      'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
      'https://images.unsplash.com/photo-1431540015161-0bf868a2d407?w=800&q=80',
      'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&q=80',
      'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=800&q=80',
      'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=800&q=80',
    ],
    tableHeaders: ['Dimension', 'Area Sq.ft', '"U" Shape'],
    tableRows: [['20" × 20"', '400', '20']],
  },
  {
    id: 'executive-board-room',
    name: 'Executive Board Room',
    type: 'Board Room',
    description:
      'Elevate your meetings in RT Grace Hotel\'s Executive Board Room — setting the stage for impactful discussions, strategic decisions, and visionary outcomes in unmatched comfort.',
    images: [
      'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&q=80',
      'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&q=80',
      'https://images.unsplash.com/photo-1582653291997-079a1c04e5a1?w=800&q=80',
      'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=80',
    ],
    tableHeaders: ['Dimension', 'Area Sq.ft', '"U" Shape'],
    tableRows: [['23" × 15"', '345', '20']],
  },
];

const DINING = [
  {
    id: 'main-restaurant',
    name: 'The Grand Table',
    type: 'Main Restaurant',
    cuisine: 'Continental & Pakistani',
    hours: '7:00 AM – 11:00 PM',
    capacity: '120 Guests',
    description:
      'An all-day dining destination offering a rich blend of continental classics and authentic Pakistani cuisine. Immerse yourself in warm, inviting surroundings where every meal becomes an occasion.',
    images: [
      'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80',
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80',
      'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=800&q=80',
      'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=800&q=80',
    ],
  },
  {
    id: 'rooftop-lounge',
    name: 'Sky Lounge',
    type: 'Rooftop Bar & Grill',
    cuisine: 'BBQ & International Tapas',
    hours: '5:00 PM – 1:00 AM',
    capacity: '60 Guests',
    description:
      'Dine under the stars at our rooftop lounge with panoramic city views. Enjoy artisan grills, crafted beverages, and an atmosphere that turns every evening into an unforgettable experience.',
    images: [
      'https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?w=800&q=80',
      'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=800&q=80',
      'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80',
      'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80',
    ],
  },
  {
    id: 'cafe',
    name: 'Café Nishat',
    type: 'Specialty Café',
    cuisine: 'Café Bites & Desserts',
    hours: '8:00 AM – 10:00 PM',
    capacity: '35 Guests',
    description:
      'A cozy corner for light bites, premium coffee, and artisan desserts. Café Nishat is the perfect retreat for a quiet breakfast, an afternoon catch-up, or an evening sweet indulgence.',
    images: [
      'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&q=80',
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80',
      'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&q=80',
      'https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=800&q=80',
    ],
  },
  {
    id: 'private-dining',
    name: 'Mehfil Private Dining',
    type: 'Private Dining Room',
    cuisine: "Chef's Tasting Menu",
    hours: 'By Reservation',
    capacity: '12 Guests',
    description:
      'An intimate dining room reserved for exclusive gatherings and special occasions. Experience a curated chef\'s tasting menu paired with personalized service in an atmosphere of complete privacy and luxury.',
    images: [
      'https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=800&q=80',
      'https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?w=800&q=80',
      'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80',
      'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=800&q=80',
    ],
  },
];

export default function EventAndDining() {
  const [activeTab, setActiveTab] = useState('Events');

  return (
    <div className="font-jost text-neutral-900 bg-[#faf8f5] min-h-screen">

      {/* HERO BANNER */}
      <div className="relative h-[480px] overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1400&q=80"
          alt="Events and Dining"
          className="w-full h-full object-cover brightness-50"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <p className="font-jost text-[11px] tracking-[5px] text-amber-300 uppercase mb-4">
            RT Grace Hotel
          </p>
          <h1 className="font-playfair text-5xl md:text-6xl text-white leading-tight mb-4">
            Elevate Your <em className="italic text-amber-300">Events</em>
            <br />&amp; Dining Experience
          </h1>
          <p className="font-jost font-light text-white/75 text-base max-w-xl mt-2">
            Conference Room precision, Banquet Hall grandeur — where every occasion is crafted with elegance and expertise.
          </p>
        </div>
      </div>

      {/* STICKY TABS */}
      <div className="sticky top-0 z-50 bg-white border-b border-neutral-200 shadow-sm">
        <div className="max-w-6xl mx-auto flex">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-4 font-jost font-medium text-sm tracking-[3px] uppercase transition-all duration-300 ${
                activeTab === tab
                  ? 'text-amber-800 border-b-2 border-amber-700 bg-amber-50/60'
                  : 'text-neutral-400 hover:text-neutral-700'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* EVENTS TAB */}
      {activeTab === 'Events' && (
        <div className="max-w-6xl mx-auto px-6 py-16 space-y-24">
          <div className="text-center">
            <p className="text-[11px] tracking-[4px] text-amber-700 uppercase mb-3">Our Venues</p>
            <h2 className="font-playfair text-4xl font-normal">Spaces Made for Every Occasion</h2>
            <div className="w-16 h-px bg-amber-400/50 mx-auto mt-5" />
          </div>

          {VENUES.map((venue, i) => (
            <div
              key={venue.id}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-10 items-start ${
                i % 2 === 1 ? 'lg:flex lg:flex-row-reverse' : ''
              }`}
            >
              <div className="w-full">
                <ImageSlider images={venue.images} height="h-80" />
              </div>
              <div className="flex flex-col justify-center">
                <span className="inline-block font-jost text-[10px] tracking-[3px] uppercase text-amber-700 bg-amber-50 border border-amber-200 rounded-full px-3 py-1 w-fit mb-4">
                  {venue.type}
                </span>
                <h3 className="font-playfair text-3xl font-normal mb-4 leading-snug">{venue.name}</h3>
                <p className="font-jost font-light text-neutral-500 leading-relaxed text-[15px] mb-6">
                  {venue.description}
                </p>
                <div className="w-10 h-px bg-amber-400/60 mb-6" />
                <p className="font-jost text-xs tracking-[3px] uppercase text-neutral-400 mb-2">
                  Capacity &amp; Dimensions
                </p>
                <CapacityTable headers={venue.tableHeaders} rows={venue.tableRows} />
                <button className="mt-7 self-start px-7 py-3 bg-amber-800 text-white font-jost font-medium text-sm tracking-wider rounded hover:bg-amber-900 transition-colors">
                  Book This Venue
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* DINING TAB */}
      {activeTab === 'Dining' && (
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="text-center mb-16">
            <p className="text-[11px] tracking-[4px] text-amber-700 uppercase mb-3">Our Restaurants</p>
            <h2 className="font-playfair text-4xl font-normal">A Culinary Journey Awaits</h2>
            <div className="w-16 h-px bg-amber-400/50 mx-auto mt-5" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {DINING.map((place) => (
              <div
                key={place.id}
                className="bg-white rounded-2xl overflow-hidden border border-neutral-100 shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <ImageSlider images={place.images} height="h-60" />
                <div className="p-7">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div>
                      <span className="inline-block font-jost text-[10px] tracking-[3px] uppercase text-amber-700 bg-amber-50 border border-amber-200 rounded-full px-3 py-1 mb-3">
                        {place.type}
                      </span>
                      <h3 className="font-playfair text-2xl font-normal leading-snug">{place.name}</h3>
                    </div>
                  </div>
                  <p className="font-jost font-light text-neutral-500 text-sm leading-relaxed mb-5">
                    {place.description}
                  </p>
                  <div className="grid grid-cols-3 gap-3 border-t border-neutral-100 pt-5">
                    <div>
                      <p className="text-[10px] tracking-[2px] uppercase text-neutral-400 mb-1">Cuisine</p>
                      <p className="font-jost text-xs font-medium text-neutral-700">{place.cuisine}</p>
                    </div>
                    <div>
                      <p className="text-[10px] tracking-[2px] uppercase text-neutral-400 mb-1">Hours</p>
                      <p className="font-jost text-xs font-medium text-neutral-700">{place.hours}</p>
                    </div>
                    <div>
                      <p className="text-[10px] tracking-[2px] uppercase text-neutral-400 mb-1">Capacity</p>
                      <p className="font-jost text-xs font-medium text-neutral-700">{place.capacity}</p>
                    </div>
                  </div>
                  <button className="mt-6 w-full py-2.5 border border-amber-700 text-amber-800 font-jost font-medium text-sm tracking-wider rounded hover:bg-amber-800 hover:text-white transition-colors duration-300">
                    Reserve a Table
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* FOOTER STRIP */}
      <div className="bg-neutral-900 py-8 mt-16 text-center">
        <p className="font-jost font-light text-neutral-400 text-sm tracking-wider">
          © {new Date().getFullYear()} RT Grace Hotel — All Rights Reserved
        </p>
      </div>

    </div>
  );
}
