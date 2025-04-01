import React from "react";
import Head from "next/head";
import Link from "next/link";
const About: React.FC = () => {
  return (
    <>
      <Head>
        <title>About | MessAPP</title>
      </Head>
      <div className="min-h-screen flex flex-col items-center justify-center bg-black-200 p-6">
        <div className="max-w-2xl bg-white p-8 rounded-2xl shadow-xl text-center">
          <h1 className="text-4xl font-extrabold text-yellow-300 mb-6">About MessAPP</h1>
          <p className="text-lg text-gray-700 mb-4">
            MessAPP is a project created using <strong>Next.js with TypeScript</strong>,
            developed by <span className="font-semibold">Harshith B (23BCE0559)</span> and
            <span className="font-semibold"> Sahaana (23BCE2128)</span>. Our goal is to enhance the
            mess management experience.
          </p>
          <p className="text-lg text-gray-700 mb-4">
            We use <strong>MySQL</strong> as our backend to efficiently store and manage user data.
            The application includes:
          </p>
          <ul className="list-disc list-inside text-gray-700 text-lg mb-4">
            <li><strong><span className="text-blue-600"><Link href="/">Home Page</Link></span></strong> – Displays general information.</li>
            <li><strong><span className="text-blue-600"><Link href="/feedback">Feedback Page</Link></span></strong> – Allows users to share their experience.</li>
          </ul>
          <p className="text-lg text-gray-700">
            Built with scalability and performance in mind, we leverage Next.js features
            such as server-side rendering and API routes to create a seamless experience.
          </p>
        </div>
      </div>
    </>
  );
};

export default About;