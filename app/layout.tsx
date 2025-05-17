import { ThemeProvider } from "@/theme/theme-provider";
import "./globals.css";
import { Inter } from "next/font/google";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Nidhin | Portfolio",
  description: "Modern Portfolio of Nidhin – Fullstack Developer",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} bg-white text-black dark:bg-zinc-900 dark:text-white transition-colors duration-300`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Navbar />
          <main className="min-h-screen px-4 sm:px-8 max-w-7xl mx-auto">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
