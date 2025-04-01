import Navbar from "./components/navbar";
import Footer from "./components/footer";
import "./styles/globals.css"; // Import global styles if needed

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen bg-gray-100 text-gray-800">
        <Navbar />
        <main className="flex-grow container mx-auto p-6">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
