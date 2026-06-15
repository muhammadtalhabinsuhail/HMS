const facilities = [
  {
    name: 'Air-Conditioned',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M3 12h18M6 16h12M9 20h6" />
      </svg>
    ),
  },
  {
    name: 'Elevator',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M12 3v18M8 7l4-4 4 4M16 17l-4 4-4-4" />
      </svg>
    ),
  },
  {
    name: 'Fitness Center Gym',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M6 12h12M4 10v4M20 10v4" />
      </svg>
    ),
  },
  {
    name: 'Safe Locker',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <rect x="3" y="7" width="18" height="13" rx="2" />
        <path d="M16 11a4 4 0 10-8 0" />
      </svg>
    ),
  },
  {
    name: 'Wifi Connectivity',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M2 8a16 16 0 0120 0M5 12a10 10 0 0114 0M8 16a4 4 0 018 0M12 20h.01" />
      </svg>
    ),
  },
  {
    name: 'Hot & Cold Water',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M12 3v18M5 12h14" />
      </svg>
    ),
  },
  {
    name: "43'' Smart TV",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <rect x="2" y="7" width="20" height="13" rx="2" />
        <path d="M8 21h8" />
      </svg>
    ),
  },
  {
    name: 'Room Service Till Midnight',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
  },
];

export default function Facilities() {
  return (
    <div className="p-8 bg-gray-50">
      <h1 className="text-3xl font-bold mb-2">Hotel Facilities</h1>
      <p className="text-gray-600 mb-8 max-w-xl">
        Experience unparalleled amenities with our top-notch services tailored to your every need.
      </p>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {facilities.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-md p-6 flex items-center gap-4 hover:shadow-xl hover:-translate-y-1 transition"
          >
            <div className="text-blue-600">{item.icon}</div>
            <p className="font-medium">{item.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
