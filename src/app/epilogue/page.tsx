'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Plus } from 'lucide-react';
import { epilogueMoments, EpilogueMoment } from '@/data/epilogue';

const Polaroid = ({ moment, index }: { moment: EpilogueMoment; index: number }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Unique drifting for each card
  const y = useTransform(scrollYProgress, [0, 1], [100 + (index * 20), -100 - (index * 20)]);
  const x = useTransform(scrollYProgress, [0, 1], [index % 2 === 0 ? -30 : 30, index % 2 === 0 ? 30 : -30]);
  const rotate = useTransform(scrollYProgress, [0, 1], [moment.rotation || 0, (moment.rotation || 0) + (index % 2 === 0 ? 5 : -5)]);

  return (
    <motion.div
      ref={ref}
      style={{ 
        y, 
        x, 
        rotate, 
        scale: moment.scale,
        left: `${15 + (index * 12) % 65}%`,
        top: `${index * 40}vh`,
      }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      className="absolute w-64 md:w-80 p-4 pb-12 bg-[#fdfdfd] shadow-[0_15px_35px_rgba(0,0,0,0.3)] rounded-[2px] border border-black/5 hover:z-50 transition-shadow duration-500 hover:shadow-[0_25px_50px_rgba(0,0,0,0.5)] cursor-grab active:cursor-grabbing"
    >
      {moment.type === 'image' && moment.image_url ? (
        <div className="aspect-square w-full h-full bg-[#111] mb-6 overflow-hidden relative">
          <img 
            src={moment.image_url} 
            alt={moment.content}
            className="w-full h-full object-cover grayscale-[20%] sepia-[10%] contrast-[1.1]"
          />
          <div className="absolute inset-0 bg-black/5 pointer-events-none" />
        </div>
      ) : (
        <div className="min-h-[220px] md:min-h-[280px] flex items-center justify-center p-6 text-center text-black/80 font-sans italic text-lg leading-relaxed border-b border-black/5 mb-6">
          "{moment.content}"
        </div>
      )}
      
      <div className="flex flex-col items-start gap-1">
        <span className="text-black/60 font-sans text-[10px] tracking-widest uppercase font-bold">
          {moment.date}
        </span>
        <p className="text-black/30 font-sans text-[11px] leading-tight font-medium max-w-[150px]">
          {moment.type === 'image' ? moment.content : "A fleeting thought."}
        </p>
      </div>
      
      {/* Decorative Polaroid "Shadow" or "Texture" */}
      <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-t from-black/5 to-transparent pointer-events-none" />
    </motion.div>
  );
};

export default function EpiloguePage() {
  const containerRef = useRef(null);

  return (
    <main ref={containerRef} className="bg-black min-h-[500vh] text-white selection:bg-[#F4BD45] selection:text-black overflow-x-hidden">
      
      {/* Header Logo or "NOT" */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 sm:px-12 py-8 flex justify-between items-center mix-blend-difference pointer-events-none">
        <Link href="/" className="pointer-events-auto group flex items-center gap-4">
          <ArrowLeft size={16} className="text-white/40 group-hover:text-[#F4BD45] transition-colors" />
          <span className="font-sans font-bold text-xs tracking-widest uppercase text-white/40 group-hover:text-white transition-colors">BACK</span>
        </Link>
        <div className="pointer-events-auto">
           <svg width="36" height="12" viewBox="0 0 36 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#F4BD45]">
            <circle cx="4" cy="6" r="3" fill="currentColor" />
            <circle cx="18" cy="6" r="3" fill="currentColor" />
            <circle cx="32" cy="6" r="3" fill="currentColor" />
          </svg>
        </div>
      </nav>

      {/* Hero "Canvas" Title */}
      <section className="h-screen flex flex-col items-center justify-center relative">
         <motion.div 
           initial={{ opacity: 0, scale: 0.9 }}
           animate={{ opacity: 0.1, scale: 1 }}
           transition={{ duration: 3, delay: 0.5 }}
           className="absolute inset-0 flex items-center justify-center pointer-events-none"
         >
            <h1 className="text-[20vw] font-bold tracking-tighter leading-none opacity-20 text-white select-none">
              EPILOGUE
            </h1>
         </motion.div>
         
         <div className="relative z-10 text-center max-w-2xl px-6">
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, delay: 1 }}
              className="font-sans text-xl md:text-2xl text-white/50 tracking-tight font-medium"
            >
              Fleeting thoughts. <br/>
              Micro-moments that don't belong to a place, but to the journey.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2, delay: 2.5 }}
              className="mt-12"
            >
               <div className="w-[1px] h-24 bg-gradient-to-b from-[#F4BD45] to-transparent mx-auto" />
            </motion.div>
         </div>
      </section>

      {/* Floating Polaroid Grid */}
      <section className="relative w-full max-w-7xl mx-auto px-6 h-full pb-[100vh]">
         {epilogueMoments.map((moment, index) => (
           <Polaroid key={moment.id} moment={moment} index={index} />
         ))}
      </section>

      {/* Floating Add Button (Visual placeholder for "Canvas" feel) */}
      <div className="fixed bottom-12 right-12 z-50">
         <motion.button 
           initial={{ scale: 0, opacity: 0 }}
           animate={{ scale: 1, opacity: 1 }}
           transition={{ type: "spring", stiffness: 260, damping: 20, delay: 3 }}
           whileHover={{ scale: 1.1, backgroundColor: "#F4BD45", color: "#000" }}
           className="w-16 h-16 rounded-full bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/50 transition-all duration-300 group shadow-2xl"
         >
            <Plus size={24} className="group-hover:rotate-90 transition-transform duration-500" />
         </motion.button>
      </div>

      {/* Bottom Footer message */}
      <footer className="h-screen flex items-center justify-center px-6">
         <motion.div 
           initial={{ opacity: 0 }}
           whileInView={{ opacity: 1 }}
           transition={{ duration: 2 }}
           className="text-center"
         >
            <p className="font-sans text-white/30 tracking-tightest uppercase text-[10px] font-bold mb-8">FINISH FOR NOW</p>
            <h2 className="text-4xl md:text-6xl font-sans font-bold tracking-tighter text-white/10">
              The canvas stays open.
            </h2>
         </motion.div>
      </footer>

      {/* Global Grainy Texture Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-[100] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </main>
  );
}
