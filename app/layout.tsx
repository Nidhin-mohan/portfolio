import type React from "react"
import type { Metadata } from "next"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Nidhin Mohan | Full-Stack Developer — Backend Systems & APIs",
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
  description:
    "Full-stack developer with a backend focus. 3+ years building production MERN applications with TypeScript, MongoDB, and GraphQL.",
  keywords: [
    "Full-Stack Engineer",
    "Backend Developer",
    "Node.js",
    "TypeScript",
    "MongoDB",
    "GraphQL",
    "MERN Stack",
    "REST APIs",
    "AWS",
    "Docker",
    "CI/CD",
  ],
  authors: [{ name: "Nidhin Mohan" }],
  openGraph: {
    title: "Nidhin Mohan | Full-Stack Developer",
    description:
      "Full-stack developer with a backend focus. Building reliable APIs and systems with TypeScript, Node.js, and MongoDB.",
    url: "https://nidhin.dev",
    siteName: "Nidhin Mohan — Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nidhin Mohan | Full-Stack Engineer",
    description:
      "Building backend systems that scale. TypeScript-first MERN engineer focused on architecture, performance, and reliability.",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
