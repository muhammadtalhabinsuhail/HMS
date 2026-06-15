export default function Booking() {
  return (
    <form className="w-full bg-[#8B4513] text-white shadow-xl rounded-2xl p-6 mt-4">
      <div className="flex flex-wrap items-end gap-4">

        {/* Check-in */}
        <div className="flex flex-col">
          <label htmlFor="checkin" className="text-sm font-medium mb-1">Check-in</label>
          <input
            type="date"
            id="checkin"
            name="checkin"
            className="border border-gray-300 text-black rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        {/* Check-out */}
        <div className="flex flex-col">
          <label htmlFor="checkout" className="text-sm font-medium mb-1">Check-out</label>
          <input
            type="date"
            id="checkout"
            name="checkout"
            className="border border-gray-300 text-black rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        {/* Room */}
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">Room</label>
          <select name="room" className="border text-black rounded-lg px-3 py-2">
            {[...Array(10)].map((_, i) => (
              <option key={i} value={i + 1}>{i + 1}</option>
            ))}
          </select>
        </div>

        {/* Location */}
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">Location</label>
          <select name="location" className="border text-black rounded-lg px-3 py-2">
            <option value="all">All</option>
            <option value="Sukkur">Sukkur</option>
            <option value="Karachi">Karachi</option>
            <option value="Hyderabad">Hyderabad</option>
          </select>
        </div>

        {/* Adult */}
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">Adult</label>
          <select name="adult" className="border text-black rounded-lg px-3 py-2">
            {[...Array(10)].map((_, i) => (
              <option key={i} value={i + 1}>{i + 1}</option>
            ))}
          </select>
        </div>

        {/* Children */}
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">Children</label>
          <select name="children" className="border text-black rounded-lg px-3 py-2">
            {[...Array(10)].map((_, i) => (
              <option key={i} value={i + 1}>{i + 1}</option>
            ))}
          </select>
        </div>

        {/* Button */}
        <div>
          <button
            type="submit"
            className="bg-yellow-500 text-black px-6 py-2 rounded-lg font-semibold hover:bg-yellow-400 transition"
          >
            Book Now
          </button>
        </div>

      </div>
    </form>
  );
}
