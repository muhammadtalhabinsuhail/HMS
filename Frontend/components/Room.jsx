import Link from 'next/link';

const rooms = [
  {
    name: 'Deluxe Room',
    price: '$120 / night',
    image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a',
    link: '/deluxe',
  },
  {
    name: 'Executive Room',
    price: '$180 / night',
    image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa',
    link: '/executive',
  },
  {
    name: 'Suites',
    price: '$250 / night',
    image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461',
    link: '/suites',
  },
];

export default function Room() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-2">Rooms &amp; Suites</h1>
      <p className="text-gray-600 mb-8 max-w-xl">
        Escape the ordinary with our luxurious suites, designed for ultimate comfort and style.
      </p>

      <div className="grid md:grid-cols-3 gap-6">
        {rooms.map((room, index) => (
          <Link href={room.link} key={index}>
            <div className="relative group rounded-2xl overflow-hidden shadow-lg cursor-pointer">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={room.image}
                alt={room.name}
                className="w-full h-64 object-cover group-hover:scale-110 transition duration-500"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition"></div>
              <div className="absolute bottom-4 left-4 text-white text-xl font-semibold">
                {room.name}
              </div>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                <span className="bg-white text-black px-4 py-2 rounded-lg font-semibold">
                  {room.price}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
