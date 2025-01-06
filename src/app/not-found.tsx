// import Link from 'next/link'
// import { Button } from "@/components/ui/button"
// import { GlareCard } from '@/components/ui/glare-card'
// import { motion } from 'framer-motion'
// import { SignpostIcon } from 'lucide-react'

// export default function NotFound() {
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10">
//       <GlareCard className="w-full max-w-lg">
//         <motion.div 
//           className="text-center p-8"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//         >
//           <SignpostIcon className="w-24 h-24 mx-auto mb-6 text-primary" />
//           <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
//           <p className="text-xl mb-8">Oops! It seems the sign for this page is missing.</p>
//           <Button asChild>
//             <Link href="/">
//               Return to Home
//             </Link>
//           </Button>
//         </motion.div>
//       </GlareCard>
//     </div>
//   )
// }