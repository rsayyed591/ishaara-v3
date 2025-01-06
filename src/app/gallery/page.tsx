"use client"

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Carousel } from '@/components/ui/carousel'
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Download, ZoomIn, ZoomOut, Copy } from 'lucide-react'

const images = [
  { src: 'https://i.ibb.co/FzMMxdW/IMG-20240428-WA0006.jpg', category: 'Achievements' },
  { src: 'https://i.ibb.co/K5Cq0GN/IMG-20240428-WA0007.jpg', category: 'Achievements' },
  { src: 'https://i.ibb.co/Jzj16Cw/IMG-20240428-WA0008.jpg', category: 'Mentor' },
  { src: 'https://i.ibb.co/THbKfdZ/IMG-20240428-WA0009.jpg', category: 'School Survey' },
  { src: 'https://i.ibb.co/P16PHjw/IMG-20240428-WA0010.jpg', category: 'School Survey' },
  { src: 'https://i.ibb.co/bBKHHfr/IMG-20240428-WA0011.jpg', category: 'Team' },
  { src: 'https://i.ibb.co/SNTthc4/IMG-20240428-WA0012.jpg', category: 'School Survey' },
  { src: 'https://i.ibb.co/7YnHVGN/IMG-20240428-WA0013.jpg', category: 'School Survey' },
  { src: 'https://i.ibb.co/Ny5HZVK/IMG-20240428-WA0016.jpg', category: 'School Survey' },
]

const videos = [
  { src: '/vid/VID-20240428-WA0001.webm', category: 'School Survey' },
  { src: '/vid/VID-20240428-WA0002.webm', category: 'School Survey' },
  { src: '/vid/VID-20240428-WA0003.webm', category: 'School Survey' },
  { src: '/vid/VID-20240428-WA0005.webm', category: 'School Survey' },
]

const categories = ['School Survey', 'Mentor', 'Achievements', 'Team']

interface ImageModalProps {
  src: string;
}

const ImageModal = ({ src }: ImageModalProps) => {
  const [zoom, setZoom] = useState(1)

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.1, 3))
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.1, 0.5))
  const handleDownload = () => {
    const link = document.createElement('a')
    link.href = src
    link.download = 'image.jpg'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
  const handleCopy = () => {
    navigator.clipboard.writeText(src)
  }

  return (
    <DialogContent className="max-w-3xl max-h-[80vh] overflow-auto">
      <DialogTitle className="sr-only">Image Preview</DialogTitle>
      <div className="relative">
        <Image
          src={src}
          alt="Gallery image"
          width={800}
          height={600}
          className="w-full h-auto"
          style={{ transform: `scale(${zoom})` }}
        />
        <div className="absolute top-2 right-2 flex space-x-2">
          <Button size="icon" variant="secondary" onClick={handleZoomIn}>
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button size="icon" variant="secondary" onClick={handleZoomOut}>
            <ZoomOut className="h-4 w-4" />
          </Button>
          <Button size="icon" variant="secondary" onClick={handleDownload}>
            <Download className="h-4 w-4" />
          </Button>
          <Button size="icon" variant="secondary" onClick={handleCopy}>
            <Copy className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </DialogContent>
  )
}

const GalleryPage = () => {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % categories.length)
    }, 3000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="container mx-auto px-4 py-24">
      <h1 className="section-header text-4xl font-bold text-center mb-12">Ishaara Gallery</h1>
      
      {/* Carousel Section */}
      <Carousel className="mb-12">
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.5 }}
            className="relative h-[400px]"
          >
            <Image
              src={images.find(img => img.category === categories[currentSlide])?.src || ''}
              alt={categories[currentSlide]}
              fill
              className="object-contain"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-8 left-8 p-4 rounded-lg">
              <h2 className="text-2xl font-bold text-white">{categories[currentSlide]}</h2>
            </div>
          </motion.div>
        </AnimatePresence>
      </Carousel>

      {/* All Photos Section */}
      {categories.map((category) => (
        <section key={category} className="mb-12">
          <h2 className="text-2xl font-bold mb-4">{category}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.filter(img => img.category === category).map((img, index) => (
              <Dialog key={index}>
                <DialogTrigger>
                  <Image
                    src={img.src}
                    alt={`${category} image ${index + 1}`}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover rounded-lg cursor-pointer"
                  />
                </DialogTrigger>
                  <ImageModal src={img.src} />
                </Dialog>
            ))}
            {videos.filter(vid => vid.category === category).map((vid, index) => (
              <Dialog key={`video-${index}`}>
                <DialogTrigger>
                  <video className="w-full h-48 object-cover rounded-lg cursor-pointer">
                    <source src={vid.src} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </DialogTrigger>
                <DialogContent className="max-w-3xl max-h-[80vh] overflow-auto">
                  <DialogTitle className="sr-only">Video Preview</DialogTitle>
                  <video controls className="w-full">
                    <source src={vid.src} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </DialogContent>
              </Dialog>
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}

export default GalleryPage

