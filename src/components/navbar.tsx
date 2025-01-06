"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { ModeToggle } from '@/components/ui/mode-toggle'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'Translate', href: '/translate' },
  { name: 'Services', href: '/services' },
  { name: 'Gallery', href: '/gallery' },
  { name: 'About', href: '/about' },
  { name: 'Models', href: '/models' },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="w-full flex flex-wrap justify-between items-center p-4 bg-background/80 backdrop-blur-sm fixed top-0 z-50">
      <Link href="/" className="text-2xl font-bold font-poppins">
        Ishaara
      </Link>
      
      <div className="flex items-center gap-4 md:hidden">
        <ModeToggle />
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      <div className={`${isOpen ? 'flex' : 'hidden'} md:flex flex-col md:flex-row w-full md:w-auto mt-4 md:mt-0 gap-4 md:items-center`}>
        {navItems.map((item) => (
          <Link 
            key={item.name} 
            href={item.href} 
            className="text-foreground hover-underline-animation p-1 rounded-md hover:bg-accent/10 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            {item.name}
          </Link>
        ))}
        <div className="hidden md:block">
          <ModeToggle />
        </div>
      </div>
    </nav>
  )
}
