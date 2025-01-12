import React from 'react'

import { ReactNode } from 'react';

const Loader = ({ children }: { children: ReactNode }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-50">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-lg font-semibold">{children}</p>
      </div>
    </div>
  )
}

export default Loader

