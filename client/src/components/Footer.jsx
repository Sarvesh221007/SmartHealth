// src/components/layout/Footer.jsx
import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin, FaEnvelope, FaPhone } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-50 shadow-inner mt-10 border-t">
      <div className="container mx-auto px-6 py-8 grid gap-6 md:grid-cols-3 text-center md:text-left">

        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-blue-600">SmartHealth</h2>
          <p className="text-gray-500 mt-2">
            Your AI-powered health companion.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="font-semibold text-gray-700 mb-3">Quick Links</h3>
          <div className="flex flex-col gap-2">
            <Link to="/" className="hover:text-blue-600 transition">Home</Link>
            <Link to="/about" className="hover:text-blue-600 transition">About</Link>
            <Link to="/contact" className="hover:text-blue-600 transition">Contact</Link>
          </div>
        </div>

        {/* Contact & Social */}
        <div>
          <h3 className="font-semibold text-gray-700 mb-3">Get in Touch</h3>
          <p className="flex items-center justify-center md:justify-start gap-2 text-gray-600">
            <FaEnvelope /> sarveshsingh8303744279@gmail.com
          </p>
          <p className="flex items-center justify-center md:justify-start gap-2 text-gray-600">
            <FaPhone /> +91-8303744279
          </p>
          <div className="flex gap-6 justify-center md:justify-start mt-3 text-2xl">
            <a
              href="https://github.com/Sarvesh221007"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-900 transition"
            >
              <FaGithub />
            </a>
            <a
              href="https://www.linkedin.com/in/sarvesh-kumar-singh-5b01b5291"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-700 transition"
            >
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="border-t mt-6 py-4 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} SmartHealth Journal. All rights reserved.
      </div>
    </footer>
  );
}
