"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaUtensils } from "react-icons/fa";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="bg-gradient-to-r from-blue-700 to-indigo-600 text-white shadow-md py-4 px-6">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 text-2xl font-bold">
          <FaUtensils className="text-yellow-300" />
          Mess Feedback
        </Link>

        {/* Navigation Links */}
        <div className="space-x-6 text-lg">
          <Link
            href="/"
            className={`hover:text-yellow-300 transition ${pathname === "/" ? "border-b-2 border-yellow-300 pb-1" : ""}`}
          >
            Home
          </Link>
          <Link
            href="/feedback"
            className={`hover:text-yellow-300 transition ${pathname === "/feedback" ? "border-b-2 border-yellow-300 pb-1" : ""}`}
          >
            Submit Feedback
          </Link>
          <Link
            href="/about"
            className={`hover:text-yellow-300 transition ${pathname === "/about" ? "border-b-2 border-yellow-300 pb-1" : ""}`}
          >
            About
          </Link>
          <Link
            href="/admin"
            className={`hover:text-yellow-300 transition ${pathname === "/admin" ? "border-b-2 border-yellow-300 pb-1" : ""}`}
          >
            Admin
          </Link>
        </div>
      </div>
    </nav>
  );
}
