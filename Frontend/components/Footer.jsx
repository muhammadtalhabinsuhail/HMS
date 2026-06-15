import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-white border-y">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">

        {/* Top Section */}
        <div className="md:flex md:justify-between">

          {/* Logo */}
          <div className="mb-6 md:mb-0">
            <Link href="/" className="flex items-center">
              <Image src="/hotellogo.png" alt="Logo" width={80} height={64} style={{ height: '4rem', width: 'auto', marginRight: '0.75rem' }} />
            </Link>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 sm:gap-6">

            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase">Resources</h2>
              <ul className="text-gray-500 font-medium space-y-3">
                <li><Link href="/about">About</Link></li>
                <li><Link href="/#rooms">Rooms</Link></li>
                <li><Link href="/#booking">Booking</Link></li>
                <li><Link href="/#facilities">Service</Link></li>
              </ul>
            </div>

            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase">Follow us</h2>
              <ul className="text-gray-500 font-medium space-y-3">
                <li>
                  <a href="https://instagram.com/" target="_blank" rel="noreferrer">Instagram</a>
                </li>
                <li><a href="#">Facebook</a></li>
              </ul>
            </div>

            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase">Legal</h2>
              <ul className="text-gray-500 font-medium space-y-3">
                <li><a href="#">Privacy Policy</a></li>
                <li><a href="#">Terms &amp; Conditions</a></li>
                <li><a href="#">Cancellation Policy</a></li>
              </ul>
            </div>

          </div>
        </div>

        <hr className="my-6 border-gray-200 lg:my-8" />

        {/* Bottom Section */}
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-gray-500">
            © 2026{' '}
            <a href="#" target="_blank" rel="noreferrer">muzammilahmed</a>. All Rights Reserved.
          </span>

          <div className="flex mt-4 space-x-5 sm:mt-0">
            {/* Facebook */}
            <a href="#" className="text-gray-500 hover:text-gray-900">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22 12a10 10 0 1 0-11.5 9.9v-7H8v-3h2.5V9.5c0-2.5 1.5-4 3.8-4 1.1 0 2.2.2 2.2.2v2.5h-1.2c-1.2 0-1.6.7-1.6 1.5V12H17l-.5 3h-2.3v7A10 10 0 0 0 22 12z" />
              </svg>
            </a>
            {/* Instagram */}
            <a href="#" className="text-gray-500 hover:text-pink-500">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M7 2C4.2 2 2 4.2 2 7v10c0 2.8 2.2 5 5 5h10c2.8 0 5-2.2 5-5V7c0-2.8-2.2-5-5-5H7zm10 2c1.7 0 3 1.3 3 3v10c0 1.7-1.3 3-3 3H7c-1.7 0-3-1.3-3-3V7c0-1.7 1.3-3 3-3h10zm-5 3.5A4.5 4.5 0 1 0 16.5 12 4.5 4.5 0 0 0 12 7.5zm0 2A2.5 2.5 0 1 1 9.5 12 2.5 2.5 0 0 1 12 9.5zM17.8 6.2a1 1 0 1 0 1 1 1 1 0 0 0-1-1z" />
              </svg>
            </a>
            {/* Twitter */}
            <a href="#" className="text-gray-500 hover:text-blue-500">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22 5.9c-.7.3-1.5.6-2.3.7.8-.5 1.4-1.2 1.7-2.1-.7.4-1.6.8-2.5 1-1.3-1.4-3.6-1.3-4.9.3-.8.9-1 2.1-.7 3.2-3.3-.2-6.2-1.7-8.1-4.3-1.1 1.9-.5 4.3 1.4 5.5-.6 0-1.2-.2-1.7-.5 0 2 1.4 3.7 3.3 4.1-.6.2-1.2.2-1.8.1.5 1.6 2 2.8 3.8 2.8C6.2 18.6 3.8 19.3 2 19c1.8 1.1 3.9 1.8 6.1 1.8 7.3 0 11.3-6.1 11.3-11.3v-.5c.8-.6 1.5-1.3 2.1-2.1z" />
              </svg>
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
