import { Inter, JetBrains_Mono } from "next/font/google";
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
  title: "PyLab - Learn Python Interactively",
  description: "Interactive virtual Python lab for learning and programming",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased bg-gradient-to-b from-slate-950 via-indigo-950/30 to-slate-900 text-foreground min-h-screen`}
      >
        {children}
      </body>
    </html>
  );
}
