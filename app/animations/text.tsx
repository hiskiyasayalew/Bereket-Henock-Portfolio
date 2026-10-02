// "use client";

// import { motion } from "framer-motion";

// const textVariants = {
//   hidden: {
//     y: "100%",
//     opacity: 0,
//   },

//   visible: {
//     y: "0%",
//     opacity: 1,
//     transition: {
//       duration: 0.8,
//       ease: [0.22, 1, 0.36, 1],
//     },
//   },
// };

// export function MaskText({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <span className="block overflow-hidden">
//       <motion.span
//         className="block"
//         variants={textVariants}
//         initial="hidden"
//         whileInView="visible"
//         viewport={{
//           once: true,
//           amount: 0.2,
//         }}
//       >
//         {children}
//       </motion.span>
//     </span>
//   );
// }