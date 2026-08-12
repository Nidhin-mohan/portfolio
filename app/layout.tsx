import type React from "react"
import type { Metadata } from "next"
import "@/app/globals.css"
import { Anton, Martian_Mono } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { MotionProvider } from "@/components/motion-provider"
import { cn } from "@/lib/utils"

// Display: ultra-bold condensed impact face — poster/brutalist headlines
const anton = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
  display: "swap",
})

// Everything else: a squared, technical monospace
const martianMono = Martian_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-mono",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Nidhin Mohan | Backend-Focused Fullstack Engineer",
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
  description:
    "Backend-focused fullstack engineer. Billing, pricing, and OTA integrations in hospitality SaaS. Node.js, TypeScript, MongoDB, GraphQL.",
  keywords: [
    "Backend Engineer",
    "Fullstack Engineer",
    "Node.js",
    "TypeScript",
    "MongoDB",
    "GraphQL",
    "REST APIs",
    "Billing Systems",
    "API Integrations",
    "Channel Manager",
    "Hospitality SaaS",
    "AWS",
    "Docker",
    "Kochi",
  ],
  authors: [{ name: "Nidhin Mohan" }],
  openGraph: {
    title: "Nidhin Mohan | Backend-Focused Fullstack Engineer",
    description:
      "Billing, pricing, and integrations with systems I don't control. Node.js, TypeScript, MongoDB.",
    url: "https://nidhinm.vercel.app",
    siteName: "Nidhin Mohan — Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nidhin Mohan | Backend-Focused Fullstack Engineer",
    description:
      "Billing, pricing, and integrations with systems I don't control. Node.js, TypeScript, MongoDB.",
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
      <body
        suppressHydrationWarning
        className={cn(anton.variable, martianMono.variable, "font-mono antialiased")}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <MotionProvider>{children}</MotionProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
