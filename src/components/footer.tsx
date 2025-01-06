import React from 'react'
import Link from 'next/link'
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'

export function Footer() {
  return (
    <footer className="w-full py-12 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 font-poppins">Ishaara</h3>
            <p className="text-muted-foreground font-inter">Converting Indian Sign Language to text in real-time.</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4 font-poppins">Quick Links</h4>
            <ul className="space-y-2 font-inter">
              <li><Link href="/" className="hover:text-secondary">Home</Link></li>
              <li><Link href="/translate" className="hover:text-secondary">Translate</Link></li>
              <li><Link href="/services" className="hover:text-secondary">Services</Link></li>
              <li><Link href="/about" className="hover:text-secondary">About</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4 font-poppins">Connect With Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-foreground hover:text-secondary"><Facebook /></a>
              <a href="#" className="text-foreground hover:text-secondary"><Twitter /></a>
              <a href="#" className="text-foreground hover:text-secondary"><Instagram /></a>
              <a href="#" className="text-foreground hover:text-secondary"><Linkedin /></a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-muted text-center font-inter">
          <p>&copy; 2025 Ishaara. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

