// "use client";

// import Link from "next/link";
// import { motion } from "framer-motion";

// const MotionLink = motion(Link);

// export default function Header() {
//   return (
//     <motion.header
//       initial={{ opacity: 0, y: -20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.6 }}
//       className="fixed top-0 w-full bg-white/95 backdrop-blur-md z-50"
//     >
//       <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
//         <motion.div
//           whileHover={{ scale: 1.05 }}
//           className="flex items-center gap-1"
//         >
//           <span
//             style={{
//               fontFamily: "Akronim, serif",
//               fontSize: "32px",
//               fontWeight: 400,
//               color: "#00C896",
//             }}
//           >
//             R
//           </span>
//           <span
//             style={{
//               fontFamily: "Poppins, sans-serif",
//               fontSize: "16px",
//               fontWeight: 600,
//               color: "#00C896",
//             }}
//           >
//             seeds
//           </span>
//         </motion.div>

//         <nav className="hidden md:flex gap-8">
//           {["Home", "Our App", "Services", "Explore Projects"].map(
//             (item, i) => (
//               <motion.a
//                 key={item}
//                 href="#"
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ delay: i * 0.1 }}
//                 className="text-gray-700 hover:text-[#00C896] transition-colors"
//               >
//                 {item}
//               </motion.a>
//             )
//           )}
//         </nav>

//         <div className="flex gap-4">
//           <MotionLink
//             href="/login"
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             className="px-6 py-2 text-gray-700 hover:text-[#00C896] transition-colors"
//           >
//             Login
//           </MotionLink>
//           <MotionLink
//             href="/login"
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             className="px-6 py-2 bg-[#154035] text-white rounded-lg hover:bg-[#0d2818] transition-colors"
//           >
//             Get Started
//           </MotionLink>
//         </div>
//       </div>
//     </motion.header>
//   );
// }
