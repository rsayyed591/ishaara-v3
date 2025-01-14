"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { GlareCard } from '@/components/ui/glare-card'
import { Button } from '@/components/ui/button'
import { Check, HelpCircle } from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const pricingPlans = [
  {
    title: "Basic",
    price: "₹1,900",
    features: [
      "Single user access",
      "10 sign language translations",
      "Standard customer support"
    ]
  },
  {
    title: "Standard",
    price: "₹3,900",
    features: [
      "Dual user access",
      "50 sign language translations",
      "Priority customer support"
    ]
  },
  {
    title: "Premium",
    price: "₹5,900",
    features: [
      "Unlimited user access",
      "Unlimited sign language translations",
      "Premium customer support"
    ]
  }
]

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-3xl font-bold text-center mb-12">
    <span className="border-b-2 border-primary pb-2">{children}</span>
  </h2>
)

export function ServicesContent() {
  return (
    <div className="container mx-auto px-4 py-24">
      <SectionTitle>Our Services & Pricing</SectionTitle>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {pricingPlans.map((plan, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <GlareCard>
              <Card className="overflow-hidden bg-gradient-to-br from-primary/5 to-transparent h-full flex flex-col">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-center">
                    <span className="border-b-2 border-primary pb-1 text-primary">
                      {plan.title}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-grow mt-4">
                  <div className="text-4xl font-bold text-center mb-6">{plan.price}<span className="text-lg font-normal">/mo</span></div>
                  <ul className="space-y-4">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center">
                        <Check className="h-5 w-5 text-primary mr-2" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter className="flex justify-center">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div>
                          <Button className="w-full" disabled>
                            Subscribe Now
                          </Button>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Our services are not yet available. Stay tuned!</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </CardFooter>
              </Card>
            </GlareCard>
          </motion.div>
        ))}
      </div>

      <div className="text-center">
        <p className="text-lg mb-4">
          All plans include access to our cutting-edge Indian Sign Language translation technology.
        </p>
        <p className="text-lg mb-4">
          For custom enterprise solutions or additional information, please contact our sales team.
        </p>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" className="mt-4">
                <HelpCircle className="mr-2 h-4 w-4" />
                Learn More
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Detailed information coming soon!</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  )
}

