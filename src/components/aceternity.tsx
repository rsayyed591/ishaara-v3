import React from 'react'
import { motion } from 'framer-motion'

export const HeroHighlight: React.FC<{
  title: string
  subtitle: string
  children: React.ReactNode
}> = ({ title, subtitle, children }) => {
  return (
    <div className="container mx-auto px-4 text-center">
      <motion.h1
        className="text-4xl md:text-6xl font-bold mb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {title}
      </motion.h1>
      <motion.p
        className="text-xl md:text-2xl mb-8 text-muted-foreground"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {subtitle}
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        {children}
      </motion.div>
    </div>
  )
}

export const WobbleCard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05, rotate: [-1, 1, -1, 1, 0] }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  )
}

export const AppleCardCarousel: React.FC<{
  items: { title: string; description: string; icon: React.ReactNode }[]
}> = ({ items }) => {
  return (
    <div className="flex overflow-x-auto gap-4 py-4">
      {items.map((item, index) => (
        <motion.div
          key={index}
          className="flex-shrink-0 w-64 bg-card rounded-lg p-6 shadow-lg"
          whileHover={{ scale: 1.05 }}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <div className="text-primary mb-4">{item.icon}</div>
          <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
          <p className="text-muted-foreground">{item.description}</p>
        </motion.div>
      ))}
    </div>
  )
}

export const ButtonHoverBorderGradient: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <button className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
      <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
        {children}
      </span>
    </button>
  )
}

