"use client"

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { GlareCard } from '@/components/ui/glare-card'
import { Twitter, Instagram, Linkedin, Github, ExternalLink } from 'lucide-react'

const projectInfo = [
  {
    content: "Over 63 million people in India, or about 6.3% of the population, are hard of hearing. This group is expected to grow due to factors such as aging. Though they do not regard their hearing loss as a disability, but rather a different way of life, their social interactions can be significantly limited.",
    image: "https://i.ibb.co/bBKHHfr/IMG-20240428-WA0011.jpg"
  },
  {
    content: "Our project focuses on creating a robust, scalable system to predict, interpret, and translate Indian Sign Language (ISL) in real-time, without requiring specialized hardware. ISL combines actions, facial expressions, and body language, differing from other sign languages like American Sign Language (ASL), which may use single-hand gestures; ISL usually uses both hands. This complexity presents challenges in developing an accurate machine learning model for ISL interpretation.",
    image: "https://i.ibb.co/P16PHjw/IMG-20240428-WA0010.jpg"
  },
  {
    content: "To create a more accessible solution, we started from scratch, building a new dataset of static actions frequently used in digital communication. We annotated these images and trained them using the MS COCO model. With the help of Roboflow, we were able to deploy our solution, ensuring real-time translation with low latency.",
    image: "https://i.ibb.co/K5Cq0GN/IMG-20240428-WA0007.jpg"
  }
]

const teamMembers = [
  { name: "Rehan Sayyed", role: "Fullstack Developer", image: "/team/Rehan.jpg", social: { twitter: "https://twitter.com/RehanFerozSayy1", instagram: "https://www.instagram.com/mr_rehan__06/", github: "https://github.com/rsayyed591/", linkedin: "https://www.linkedin.com/in/rehan42/" } },
  { name: "Vivek Chouhan", role: "Fullstack Developer", image: "/team/Vivek.jpg", social: { github: "https://github.com/Viv696969", linkedin: "https://www.linkedin.com/in/vivek-chouhan/" } },
  { name: "Nishikant Raut", role: "Fullstack Developer", image: "/team/Nishi.jpg", social: { instagram: "https://www.instagram.com/nishiuwu?igsh=MzRlODBiNWFlZA==", github: "https://github.com/Nishikant00", linkedin: "https://www.linkedin.com/in/nishidev/" } },
  { name: "Rohit Deshmukh", role: "Fullstack Developer", image: "/team/Rohit.jpg", social: { instagram: "https://www.instagram.com/__._.rohit_.__/", github: "https://github.com/ardie0727", linkedin: "https://www.linkedin.com/in/rohit-deshmukh-/" } },
]

const mentor = { name: "Fatima Anees Ansari", role: "Professor", image: "/team/Fatima.jpg" }

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-3xl font-bold text-center mb-12">
    <span className="border-b-2 border-primary pb-2">{children}</span>
  </h2>
)

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-24">
      <SectionTitle>About Ishaara</SectionTitle>

      {/* Project Information */}
      {projectInfo.map((info, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.2 }}
          className="flex flex-col md:flex-row items-center overflow-hidden mb-16 gap-8"
        >
          <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:order-1' : 'md:order-2'}`}>
            <div className="bg-card/50 p-6 rounded-lg backdrop-blur-sm">
              <div className="absolute w-32 h-32 bg-primary/10 rounded-full -top-12 -left-12 blur-2xl" />
              <div className="absolute w-32 h-32 bg-primary/10 rounded-full -bottom-12 -right-12 blur-2xl" />
              <p className="text-lg relative z-10">{info.content}</p>
            </div>
          </div>
          <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:order-2' : 'md:order-1'}`}>
            <Image
              src={info.image}
              alt={`Project image ${index + 1}`}
              width={600}
              height={400}
              className="rounded-lg shadow-lg"
            />
          </div>
        </motion.div>
      ))}

      {/* Legacy Website Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-16"
      >
        <Card className="p-6 bg-gradient-to-br from-primary/10 to-transparent">
          <h3 className="text-2xl font-semibold mb-4">Our Journey</h3>
          <p className="text-lg mb-4">
            We&apos;re excited to share that this current website represents an evolution of our project. Our team initially developed the Ishaara platform using React, which you can still explore at our legacy website. This original version served as the foundation for our current Next.js implementation, showcasing our commitment to continuous improvement and adoption of modern web technologies.
          </p>
          <Button asChild variant="outline">
            <Link href="https://ishaara.netlify.app/" target="_blank" className="flex items-center gap-2">
              Visit Legacy Website
              <ExternalLink className="h-4 w-4" />
            </Link>
          </Button>
        </Card>
      </motion.div>

      {/* Thank You Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-16"
      >
        <Card className="bg-gradient-to-br from-primary/10 to-transparent">
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Special Thanks</h2>
            <div className="flex items-center gap-4 mb-4">
              <Image
                src="https://i.ibb.co/Ny78szP/nicholas.jpg"
                alt="Nicholas Renotte"
                width={100}
                height={100}
                className="rounded-full"
              />
              <div>
                <h3 className="text-xl font-semibold">Nicholas Renotte</h3>
                <p className="text-muted-foreground">AI Educator and Developer</p>
              </div>
            </div>
            <p className="text-lg">
              We extend our heartfelt thanks to Nicholas Renotte for his invaluable contributions to the field of artificial intelligence. His insightful YouTube videos have been an integral part of our project journey, providing clear explanations and practical demonstrations. His guidance through complex AI concepts has been superb, making difficult topics accessible and understandable.
            </p>
            <Button asChild className="mt-4">
              <Link href="https://github.com/nicknochnack" target="_blank" className="flex items-center gap-2">
                Visit Nicholas&apos;s GitHub
                <Github className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </Card>
      </motion.div>

      {/* Team Section */}
      <SectionTitle>The Faces Behind Ishaara</SectionTitle>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
        {teamMembers.map((member, index) => (
          <GlareCard key={index} className="h-[400px]">
            <div className="relative h-full overflow-hidden rounded-lg shadow-lg">
              <Image
                src={member.image}
                alt={member.name}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-xl font-semibold text-white mb-1">{member.name}</h3>
                  <p className="text-gray-300 mb-4">{member.role}</p>
                  <div className="flex gap-4">
                    {member.social.twitter && (
                      <Link href={member.social.twitter} target="_blank" rel="noopener noreferrer">
                        <Twitter className="h-5 w-5 text-white hover:text-primary transition-colors" />
                      </Link>
                    )}
                    {member.social.instagram && (
                      <Link href={member.social.instagram} target="_blank" rel="noopener noreferrer">
                        <Instagram className="h-5 w-5 text-white hover:text-primary transition-colors" />
                      </Link>
                    )}
                    {member.social.github && (
                      <Link href={member.social.github} target="_blank" rel="noopener noreferrer">
                        <Github className="h-5 w-5 text-white hover:text-primary transition-colors" />
                      </Link>
                    )}
                    {member.social.linkedin && (
                      <Link href={member.social.linkedin} target="_blank" rel="noopener noreferrer">
                        <Linkedin className="h-5 w-5 text-white hover:text-primary transition-colors" />
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </GlareCard>
        ))}
      </div>

      {/* Mentor Section */}
      <SectionTitle>The Mentor Behind Ishaara</SectionTitle>
      <div className="flex justify-center">
        <GlareCard className="w-[300px] h-[400px]">
          <div className="relative h-full overflow-hidden rounded-lg shadow-lg">
            <Image
              src={mentor.image}
              alt={mentor.name}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-xl font-semibold text-white mb-1">{mentor.name}</h3>
                <p className="text-gray-300">{mentor.role}</p>
              </div>
            </div>
          </div>
        </GlareCard>
      </div>
    </div>
  )
}

