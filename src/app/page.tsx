"use client";

import { useState, useEffect } from "react";

const menuData = {
  breakfast: {
    items: ["Idli & Sambar", "Dosa & Chutney", "Pongal", "Coffee/Tea"],
    time: "7:30 AM - 9:00 AM",
  },
  lunch: {
    items: ["Rice & Sambar", "Chapati & Dal", "Curd Rice", "Vegetable Curry"],
    time: "12:30 PM - 2:00 PM",
  },
  dinner: {
    items: ["Fried Rice", "Roti & Paneer Masala", "Lemon Rice", "Soup"],
    time: "7:00 PM - 8:30 PM",
  },
};

export default function HomePage() {
  const [menu, setMenu] = useState(menuData);

  useEffect(() => {
    // Future: Fetch menu dynamically if needed
  }, []);

  return (
    <div className="min-h-screen bg-black-100 flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold text-yellow-400 mb-4">📌 Today's Mess Menu</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
        {Object.entries(menu).map(([meal, data]) => (
          <div key={meal} className="bg-white shadow-lg rounded-lg p-5">
            <h2 className="text-xl font-semibold text-gray-700 capitalize">{meal}</h2>
            <p className="text-gray-500 mb-2">⏰ {data.time}</p>
            <ul className="list-disc list-inside text-gray-600">
              {data.items.map((item, index) => (
                <li key={index} className="text-gray-700">{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
