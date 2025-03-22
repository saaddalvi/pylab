import { Inter, JetBrains_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "PyLab - Interactive Python Learning Environment",
  description: "Learn Python programming interactively in your browser with real-time feedback",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased min-h-screen bg-slate-950 text-white flex flex-col`}>
        {/* Navigation Header */}
        <Navbar />
        
        {/* Page Content */}
        <div className="pt-24 md:pt-28 flex-grow">
          {children}
        </div>
        
        {/* Footer */}
        <Footer />
      </body>
    </html>
  );
}
