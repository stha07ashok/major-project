// components/Footer.tsx
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-gray-700 py-4">
      <div className="container mx-auto px-2 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo and Description */}
        <div>
          <h2 className="text-xl font-bold  mb-4">Nepal Traffic Police</h2>
          <p className="text-sm">
            Nepal Traffic Police is dedicated to ensuring road safety and smooth
            traffic flow across the country. They work tirelessly to enforce
            traffic regulations and promote public awareness.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold  mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/" className="">
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" className="">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/services" className="">
                Services
              </Link>
            </li>
            <li>
              <Link href="/news" className="">
                News & Updates
              </Link>
            </li>
            <li>
              <Link href="/contact" className="">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold  mb-4">Contact Us</h3>
          <p className="text-sm">
            Nepal Traffic Police Headquarters
            <br />
            Lamachaur-16, Pokhara, Nepal
            <br />
            Phone: +977 1 4213200
            <br />
            Email: info@nepaltrafficpolice.gov.np
          </p>
        </div>
      </div>

      <div className="mt-8 border-t border-gray-700 pt-4 text-center text-xs text-gray-400">
        &copy; {new Date().getFullYear()} Nepal Traffic Police. All rights
        reserved.
      </div>
    </footer>
  );
}
