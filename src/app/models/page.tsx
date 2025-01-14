"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from "@/components/ui/card"
import { GlareCard } from '@/components/ui/glare-card'
import { Button } from '@/components/ui/button'
import { Brain, Cpu, Layers, Mail, Github } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

const models = [
  {
    title: "GRU Based Sequence To Sequence Model",
    subtitle: "using Mediapipe",
    description: `Leveraging MediaPipe's powerful landmark detection capabilities, this model achieves an impressive 99% testing accuracy across 6 distinct actions. The model supports basic conversational signs including 'hello', 'how are you', 'sorry', 'welcome', and 'thank you', along with a 'blank' state for no action.

    Key Features:
    • Landmark extraction from student video data
    • Ready model implementation
    • Depth detection capabilities
    • ChatGPT integration for sentence creation
    • Automated sign processing`,
    gif: "/models/rnn.gif",
    icon: <Brain className="w-6 h-6" />,
    metrics: ["99% Testing Accuracy", "6 Action Classes", "Real-time Processing"],
    githubLink: "https://github.com/vnrr2023/Ishaara_Ai.git"
  },
  {
    title: "ConvLSTM Based Model",
    subtitle: "Hybrid Architecture",
    description: `A sophisticated hybrid approach combining Convolutional layers with LSTM cells for advanced video classification. This model represents a perfect balance between spatial and temporal feature extraction, trained extensively on our custom dataset.

    Key Features:
    • Hybrid CNN-LSTM architecture
    • Comprehensive video classification
    • CPU-optimized training process
    • Efficient model storage system
    • Real-time prediction capabilities`,
    gif: "/models/convlstm.gif",
    icon: <Layers className="w-6 h-6" />,
    metrics: ["8 Hours Training", "Optimized Architecture", "Real-time Inference"],
    githubLink: "https://github.com/vnrr2023/Ishaara_Ai.git"
  },
  {
    title: "Conv3D Based Video Classification",
    subtitle: "Advanced Approach",
    description: `An ambitious implementation utilizing 3D convolutions for comprehensive spatio-temporal feature learning. While currently limited by hardware constraints, this model represents our vision for future development.

    Technical Requirements:
    • 32GB+ RAM
    • High-performance GPU
    • Powerful CPU
    • 3GB Model Size`,
    gif: "/models/3d.gif",
    icon: <Cpu className="w-6 h-6" />,
    metrics: ["3GB Model Size", "32GB+ RAM Required", "GPU Optimized"],
    contact: "chouhanvivek207@gmail.com"
  }
]

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-3xl font-bold text-center mb-12">
    <span className="border-b-2 border-primary pb-2">{children}</span>
  </h2>
)

export default function ModelsPage() {
  return (
    <div className="container mx-auto px-4 pt-24 pb-12">
      <SectionTitle>Research Models</SectionTitle>
      
      <div className="grid grid-cols-1 gap-12 mb-16">
        {models.map((model, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <GlareCard>
              <Card className="overflow-hidden bg-gradient-to-br from-primary/5 to-transparent">
                <CardContent className="p-6">
                  <div className="grid md:grid-cols-2 gap-8 items-start">
                    <div className="relative w-full h-0 pb-[56.25%] rounded-lg overflow-hidden">
                      <Image
                        src={model.gif}
                        alt={model.title}
                        fill
                        className="object-contain"
                        unoptimized
                      />
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        {model.icon}
                        <h3 className="text-2xl font-bold">{model.title}</h3>
                      </div>
                      <p className="text-lg text-primary">{model.subtitle}</p>
                      <div className="prose dark:prose-invert">
                        <p className="whitespace-pre-line">{model.description}</p>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-4">
                        {model.metrics.map((metric, idx) => (
                          <div
                            key={idx}
                            className="bg-primary/10 rounded-lg p-3 text-center text-sm font-medium"
                          >
                            {metric}
                          </div>
                        ))}
                      </div>
                      <div className="flex gap-4">
                        {model.githubLink && (
                          <Button asChild variant="outline">
                            <Link href={model.githubLink} target="_blank" className="flex items-center gap-2">
                              <Github className="w-4 h-4" />
                              View on GitHub
                            </Link>
                          </Button>
                        )}
                        {model.contact && (
                          <Button asChild variant="outline">
                            <Link href={`mailto:${model.contact}`} className="flex items-center gap-2">
                              <Mail className="w-4 h-4" />
                              Contact for Dataset
                            </Link>
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </GlareCard>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

