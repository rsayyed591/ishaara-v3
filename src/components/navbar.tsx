"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { ModeToggle } from '@/components/ui/mode-toggle'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'Translate', href: '/translate' },
  { name: 'Gallery', href: '/gallery' },
  { name: 'About', href: '/about' },
  { name: 'Models', href: '/models' },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="w-full flex justify-between items-center p-4 bg-background/80 backdrop-blur-sm fixed top-0 z-50">
      <Link href="/" className="text-2xl font-bold font-poppins">
        Ishaara
      </Link>
      
      <div className="md:hidden">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      <div className="hidden md:flex space-x-4 items-center">
        {navItems.map((item) => (
          <Link 
            key={item.name} 
            href={item.href} 
            className="text-foreground hover-underline-animation"
          >
            {item.name}
          </Link>
        ))}
        <ModeToggle />
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 bg-background/95 backdrop-blur-sm md:hidden p-4 flex flex-col gap-4">
          {navItems.map((item) => (
            <Link 
              key={item.name} 
              href={item.href} 
              className="text-foreground hover:bg-accent/10 px-4 py-2 rounded-md transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  )
}

