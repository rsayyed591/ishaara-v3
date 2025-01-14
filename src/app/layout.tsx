import type { Metadata } from "next"
import { Inter, Poppins } from 'next/font/google'
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import Script from 'next/script'

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' })
const poppins = Poppins({ 
  weight: ['400', '600', '700'],
  subsets: ["latin"],
  variable: '--font-poppins'
})

export const metadata: Metadata = {
  title: "Ishaara - Indian Sign Language Translator",
  description: "Convert Indian Sign Language to text in real-time with Ishaara",
  icons: {
    icon: '/ishaaralogo.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <Script src="https://cdn.roboflow.com/0.2.26/roboflow.js" />
      </head>
      <body className={`${inter.variable} ${poppins.variable} font-sans flex flex-col min-h-screen`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}

