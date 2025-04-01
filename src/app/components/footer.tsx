import { FaFacebook , FaInstagram } from "react-icons/fa";
import { RiTwitterXLine } from "react-icons/ri";
import { FaUtensils } from "react-icons/fa";
import Link from "next/link";
export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-blue-700 to-indigo-600 text-gray-300 py-6 mt-8">
        <Link href="/" className="flex items-center gap-2 text-2xl font-bold">
          <FaUtensils className="text-yellow-300" />
          Mess Feedback
        </Link>
      <div className="container mx-auto text-center">
        {/* Links */}
        <div className="flex justify-center space-x-6 mb-4">
          <a href="#" className="hover:text-white transition">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-white transition">
            Terms of Service
          </a>
          <a href="#" className="hover:text-white transition">
            Contact Us
          </a>
        </div>

        {/* Social Icons */}
        <div className="flex justify-center space-x-4 text-xl">
          <a href="#" className="hover:text-blue-500 transition">
            <FaFacebook />
          </a>
          <a href="#" className="hover:text-blue-400 transition">
            <RiTwitterXLine />
          </a>
          <a href="#" className="hover:text-pink-500 transition">
            <FaInstagram />
          </a>
        </div>

        {/* Copyright */}
        <p className="mt-4 text-sm">
          © {new Date().getFullYear()} Mess Feedback System. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
