"use client"

import React from 'react'
import { HeroHighlight, Highlight } from '@/components/ui/hero-highlight'
import { ButtonHoverBorderGradient } from '@/components/aceternity'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { motion, useMotionValue, useSpring, useInView } from 'framer-motion'
import { ArrowRight, Brain, Zap, Shield, Users, Clock, Target, Smartphone, Languages, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { Meteors } from '@/components/ui/meteors'
import { cn } from '@/lib/utils'
import { GlareCard } from '@/components/ui/glare-card'
import { useEffect, useRef } from 'react'

// Animated counter component
function AnimatedCounter({ value, duration = 2 }: { value: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const motionValue = useMotionValue(0)
  const springValue = useSpring(motionValue, {
    duration: duration * 1000,
    bounce: 0,
  })
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (isInView) {
      motionValue.set(value)
    }
  }, [motionValue, value, isInView])

  useEffect(() => {
    springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = Intl.NumberFormat("en-US").format(Number(latest.toFixed(0)))
      }
    })
  }, [springValue])

  return <span ref={ref} />
}

function SectionHeader({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="section-header">
      {children}
    </h2>
  );
}

export function HomeContent() {
  return (
    <>
      {/* Hero Section */}
      <HeroHighlight className="relative overflow-hidden">
        <Meteors number={20} />
        <div className="text-center max-w-5xl px-4 relative z-10">
          <motion.div 
            className="flex flex-col items-center gap-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-800 dark:text-white leading-tight tracking-tight">
              Convert{" "}
              <Highlight className='bg-gradient-to-r from-indigo-500 to-purple-500 text-transparent bg-clip-text'>Indian Sign Language</Highlight>{" "}
              To Text In Real-Time With{" "}
              <Highlight className='bg-gradient-to-r from-indigo-500 to-purple-500 text-transparent bg-clip-text'>ISHAARA</Highlight>
            </h1>
            <motion.p 
              className="text-lg sm:text-xl md:text-2xl mt-6 text-neutral-600 dark:text-neutral-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Trained on <Highlight className='bg-gradient-to-r from-indigo-500 to-purple-500 text-transparent bg-clip-text'>41k+</Highlight> images using <Highlight className='bg-gradient-to-r from-indigo-500 to-purple-500 text-transparent bg-clip-text'>RTX 4060</Highlight>, 
              refined over <Highlight className='bg-gradient-to-r from-indigo-500 to-purple-500 text-transparent bg-clip-text'>34 hrs</Highlight> and counting for unmatched accuracy
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Link href="/translate">
                <ButtonHoverBorderGradient>
                  Get Started
                </ButtonHoverBorderGradient>
              </Link>
              <Button 
                variant="outline" 
                className="px-6 py-2.5 text-base border-2 hover:bg-accent/10"
              >
                Learn More
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </HeroHighlight>

      {/* Counter Section */}
      <section className="w-full py-12 md:py-24 bg-gradient-to-b from-background to-muted dark:from-background dark:to-muted">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Deaf and Mute People in India", count: 63000000 },
              { title: "Users of Indian Sign Language", count: 8435000 },
              { title: "ISL Translators", count: 250 },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="p-6 rounded-lg bg-black/20 backdrop-blur-sm border border-white/10"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <h3 className="text-lg font-semibold text-center mb-4">{item.title}</h3>
                <p className="text-4xl font-bold text-center bg-gradient-to-r from-indigo-500 to-purple-500 text-transparent bg-clip-text">
                  <AnimatedCounter value={item.count} />
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Ishaara Models Section */}
      <section className="w-full py-12 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <SectionHeader>Ishaara Models</SectionHeader>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Alphanet",
                image: "/ishaara models/A.png",
                details: "Alphabets Only",
                version: "releasing soon",
                link: "alphanet"
              },
              {
                name: "Lexnet",
                image: "/ishaara models/A1.png",
                details: "Words Only",
                version: "2.0",
                link: "lexnet"
              },
              {
                name: "Ishaara Net",
                image: "/ishaara models/A2.png",
                details: "Alphabets + Words",
                version: "releasing soon",
                link: "ishaaranet"
              }
            ].map((model, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                viewport={{ once: true }}
                className="h-full"
              >
                <GlareCard className="h-full">
                  <Card className="overflow-hidden h-full transition-all duration-300 hover:scale-105 hover:shadow-lg dark:hover:shadow-primary/20">
                    <CardContent className="p-0 h-full flex flex-col">
                      <div className="relative h-48 w-full flex-grow pt-4">
                        <Image
                          src={model.image || "/placeholder.svg"}
                          alt={model.name}
                          fill
                          className="object-contain rounded-md"
                        />
                      </div>
                      <div className="p-4 flex flex-col justify-between flex-grow">
                        <div>
                          <p className="text-muted-foreground mb-2 text-center">{model.details}</p>
                        </div>
                        <div>
                          <p className={cn(
                            "text-sm font-medium mb-4 text-center",
                            `${model.version === "releasing soon" ? "text-yellow-500" : "text-green-500"}`
                          )}>
                            Version: {model.version}
                          </p>
                          <Link href={`/details/${model.link}`}>
                          <Button 
                              className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:from-indigo-600 hover:to-purple-600 transition-all duration-300"
                              disabled={model.version === "releasing soon"}
                            >
                              {model.version === "releasing soon" ? "Coming Soon" : "View Details"}
                              {model.version !== "releasing soon" && <ExternalLink className="ml-2 h-4 w-4" />}
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </GlareCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="w-full py-12 md:py-24 bg-background text-foreground">
        <div className="container mx-auto px-4">
          <SectionHeader>Our Services</SectionHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Real-time Translation",
                description: "Convert Indian Sign Language to text instantly.",
                icon: <ArrowRight className="h-8 w-8" />,
                gradient: "from-blue-500 to-cyan-500",
              },
              {
                title: "AI-powered Accuracy",
                description: "High-precision translations using advanced machine learning.",
                icon: <Brain className="h-8 w-8" />,
                gradient: "from-purple-500 to-pink-500",
              },
              {
                title: "Fast Processing",
                description: "Lightning-fast processing for seamless communication.",
                icon: <Zap className="h-8 w-8" />,
                gradient: "from-orange-500 to-red-500",
              },
              {
                title: "Secure Platform",
                description: "Your data is protected with enterprise-grade security.",
                icon: <Shield className="h-8 w-8" />,
                gradient: "from-green-500 to-emerald-500",
              },
              {
                title: "Community Support",
                description: "Join a growing community of users and contributors.",
                icon: <Users className="h-8 w-8" />,
                gradient: "from-indigo-500 to-purple-500",
              },
            ].map((service, index) => (
              <motion.div
                key={index}
                className="relative group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"
                  style={{
                    background: `linear-gradient(to right, var(--tw-gradient-stops))`,
                  }}
                />
                <div className="relative p-6 rounded-lg bg-black/20 backdrop-blur-sm border border-white/10 h-full">
                  <div className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${service.gradient} mb-4`}>
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                  <p className="text-muted-foreground">{service.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-12 md:py-24 bg-muted">
        <div className="container mx-auto px-4">
          <SectionHeader>Key Features</SectionHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Sign to Text Conversion",
                description: "Advanced algorithms for accurate sign language interpretation",
                icon: <Zap className="h-8 w-8 text-white" />,
              },
              {
                title: "Real-time Processing",
                description: "Instant translation with minimal latency",
                icon: <Clock className="h-8 w-8 text-white" />,
              },
              {
                title: "High Accuracy",
                description: "Precise recognition powered by AI",
                icon: <Target className="h-8 w-8 text-white" />,
              },
              {
                title: "User-friendly Interface",
                description: "Intuitive design for seamless experience",
                icon: <Smartphone className="h-8 w-8 text-white" />,
              },
              {
                title: "Multiple ISL Support",
                description: "Support for various Indian Sign Language dialects",
                icon: <Languages className="h-8 w-8 text-white" />,
              },
              {
                title: "Continuous Learning",
                description: "Self-improving system for better results",
                icon: <Brain className="h-8 w-8 text-white" />,
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="group h-full"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="transition-transform duration-300 group-hover:scale-105 h-full dark:bg-black/40">
                  <CardContent className="p-6 flex flex-col items-start h-full">
                    <div className="rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 p-3 mb-4">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Case Section */}
      <section className="w-full py-12 md:py-24 bg-background text-foreground">
        <div className="container mx-auto px-4">
          <SectionHeader>Use Cases</SectionHeader>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {[
              {
                title: "Education",
                description: "Enabling inclusive education through real-time sign language translation.",
                image: "/usecase/education.jpg",
              },
              {
                title: "Healthcare",
                description: "Improving medical communication for deaf and mute patients.",
                image: "/usecase/healthcare.jpg",
              },
              {
                title: "Public Services",
                description: "Making government services accessible to everyone.",
                image: "/usecase/government.jpeg",
              },
              {
                title: "Workplace Communication",
                description: "Creating inclusive workplaces with seamless communication.",
                image: "/usecase/workplace.jpg",
              },
            ].map((useCase, index) => (
              <motion.div
                key={index}
                className="group relative overflow-hidden rounded-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Image
                  src={useCase.image || "/placeholder.svg"}
                  alt={useCase.title}
                  width={600}
                  height={400}
                  className="w-full h-[300px] object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent p-6 flex flex-col justify-end">
                  <h3 className="text-xl font-semibold mb-2 text-white">{useCase.title}</h3>
                  <p className="text-white/80">{useCase.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Try It Now Section */}
      <section className="w-full py-12 md:py-24 bg-gradient-to-r from-indigo-500 to-purple-500">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white">Experience Ishaara Now</h2>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Join thousands of users who are already breaking communication barriers with Ishaara.
            </p>
            <Link href="/translate">
              <Button 
                size="lg" 
                variant="secondary" 
                className="text-lg relative overflow-hidden group bg-white text-primary hover:text-white transition-colors duration-300"
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative flex items-center">
                  Try It Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </span>
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Objectives Section */}
      <section className="w-full py-12 md:py-24 bg-background text-foreground">
        <div className="container mx-auto px-4">
          <SectionHeader>Our Objectives</SectionHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Enhance Communication Accessibility",
                description: "Making communication seamless for everyone",
              },
              {
                title: "Bridge Language Barriers",
                description: "Connecting communities through technology",
              },
              {
                title: "Promote Inclusivity",
                description: "Creating a more inclusive digital world",
              },
              {
                title: "Empower the Community",
                description: "Supporting independence and confidence",
              },
              {
                title: "Foster Educational Growth",
                description: "Enabling better learning opportunities",
              },
              {
                title: "Drive Innovation",
                description: "Advancing technology for social impact",
              },
            ].map((objective, index) => (
              <motion.div
                key={index}
                className="group perspective h-full"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="relative transform transition-all duration-300 group-hover:[transform:rotateX(10deg)_rotateY(10deg)] h-full">
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-100 blur transition-opacity duration-300" />
                  <Card className="relative bg-black/20 backdrop-blur-sm border border-white/10 h-full">
                    <CardContent className="p-6 flex flex-col h-full">
                      <h3 className="text-xl font-semibold mb-2">{objective.title}</h3>
                      <p className="text-muted-foreground">{objective.description}</p>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Architecture Section */}
      <section className="w-full py-12 md:py-24 bg-muted">
        <div className="container mx-auto px-4">
          <SectionHeader>Our Architecture</SectionHeader>
          <div className="relative max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="rounded-lg overflow-hidden"
            >
              <Image
              src="/architecture.gif"
              alt="Architecture Diagram"
              width={1200}
              height={600}
              className="w-full h-auto"
              unoptimized
              />
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}

