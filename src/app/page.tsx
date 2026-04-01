'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { Destination, destinations } from '@/data/destinations';
import dynamic from 'next/dynamic';
import Link from 'next/link';

const InteractiveMap = dynamic(() => import('@/components/InteractiveMap'), { 
  ssr: false,
  loading: () => <div className="w-full h-[60vh] md:h-[80vh] flex items-center justify-center bg-[#050505] rounded-[40px] animate-pulse" />
});

import DestinationModal from '@/components/DestinationModal';

export default function Home() {
  const [selectedDest, setSelectedDest] = useState<Destination | null>(null);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  
  // Apple-style hero scroll effects (0 to 0.15 scroll)
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.15], [1, 1.1]);
  const heroBlur = useTransform(scrollYProgress, [0, 0.15], ["blur(0px)", "blur(20px)"]);

  // Statement section (0.15 to 0.3)
  const statementOpacity = useTransform(scrollYProgress, [0.15, 0.2, 0.28, 0.35], [0, 1, 1, 0]);
  const statementY = useTransform(scrollYProgress, [0.15, 0.2, 0.28, 0.35], [50, 0, 0, -50]);
  const statementScale = useTransform(scrollYProgress, [0.15, 0.2, 0.28, 0.35], [0.95, 1, 1, 1.05]);

  useEffect(() => {
    if (selectedDest) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [selectedDest]);

  const navItems = [
    { label: 'Map', href: '#map' },
    { label: 'Chapters', href: '#timeline' },
    { label: 'Epilogue', href: '/epilogue', isNewPage: true },
  ];

  const sortedDestinations = [...destinations].sort((a, b) => {
    if (a.year_planned && b.year_planned) return a.year_planned - b.year_planned;
    return 0;
  });

  return (
    <main ref={containerRef} className="bg-black text-[#f5f5f5] selection:bg-[#F4BD45] selection:text-black">
      {/* Navigation - Apple style backdrop blur */}
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-40 px-6 sm:px-12 py-6 bg-black/40 backdrop-blur-2xl border-b border-white/[0.08] flex justify-between items-center"
      >
        <div className="flex items-center">
          <svg width="36" height="12" viewBox="0 0 36 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#F4BD45]">
            <circle cx="4" cy="6" r="3" fill="currentColor" />
            <circle cx="18" cy="6" r="3" fill="currentColor" />
            <circle cx="32" cy="6" r="3" fill="currentColor" />
          </svg>
        </div>
        <div className="hidden md:flex gap-10 text-[10px] sm:text-xs font-bold tracking-[0.3em] text-white/40 uppercase">
          {navItems.map((item, i) => (
            item.isNewPage ? (
              <Link
                key={i} 
                href={item.href} 
                className="hover:text-[#F4BD45] transition-all duration-500"
              >
                {item.label}
              </Link>
            ) : (
              <a 
                key={i} 
                href={item.href} 
                className="hover:text-[#F4BD45] transition-all duration-500"
              >
                {item.label}
              </a>
            )
          ))}
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative h-[150vh] bg-black">
        <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden">
          {/* Subtle glowing dark background */}
          <motion.div 
            style={{ opacity: heroOpacity }}
            className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none"
          >
             <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(198,169,107,0.08)_0%,_transparent_60%)]" />
          </motion.div>

          <motion.div 
            style={{ opacity: heroOpacity, scale: heroScale, filter: heroBlur }}
            className="relative z-10 text-center px-4 max-w-6xl mx-auto flex flex-col items-center"
          >
            <h1 className="font-sans text-6xl sm:text-7xl md:text-8xl lg:text-[11rem] font-bold leading-[0.9] tracking-tighter mb-8 text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 pb-4 md:pb-8">
              Not my <br /> last page.
            </h1>

            <p className="font-sans font-medium text-xl md:text-3xl tracking-tight text-white/50 max-w-2xl mx-auto">
              Just a chapter I'm living through.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Statement Section */}
      <section className="relative h-[150vh] bg-black">
        <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden px-4">
          <motion.div style={{ opacity: statementOpacity, y: statementY, scale: statementScale }} className="max-w-5xl text-center">
            <h2 className="font-sans text-5xl md:text-6xl lg:text-8xl font-bold tracking-tighter text-white/90 leading-[1.1]">
              Some places feel like <br className="hidden md:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F4BD45] to-[#F4D945]">unfinished chapters.</span>
            </h2>
            <p className="mt-8 font-sans text-xl md:text-3xl text-white/50 tracking-tight font-medium max-w-3xl mx-auto">
              Not a wishlist. A timeline mapped out by intention, waiting for the right moment to open.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Interactive Map Section */}
      <section id="map" className="relative py-32 min-h-screen flex flex-col justify-center bg-[#050505]">
        <div className="container mx-auto px-6 mb-20 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true, margin: "-100px" }}
            className="font-sans font-bold text-5xl md:text-7xl text-white tracking-tighter mb-4"
          >
            A world in waiting.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true, margin: "-100px" }}
            className="font-sans font-medium text-xl text-white/50 tracking-tight max-w-2xl mx-auto"
          >
            Explore the map. Click a pin to turn to that chapter.
          </motion.p>
        </div>

        <div className="container mx-auto px-4 lg:px-12">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true, margin: "-100px" }}
            className="relative rounded-[40px] overflow-hidden bg-[#0A0A0A] border border-white/5 shadow-2xl p-4 md:p-12"
          >
            <InteractiveMap 
              onSelect={(dest) => setSelectedDest(dest)} 
              selectedId={selectedDest?.id}
            />
          </motion.div>
        </div>
      </section>

      {/* Timeline Section */}
      <section id="timeline" className="relative py-40 bg-black">
        <div className="container mx-auto px-6 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-32"
          >
            <h2 className="font-sans font-bold text-5xl md:text-8xl text-white tracking-tighter mb-6">The Pages Ahead.</h2>
            <p className="font-sans font-medium text-2xl text-white/50 tracking-tight">Structured by time. Dictated by feeling.</p>
          </motion.div>

          <div className="space-y-40">
            {sortedDestinations.filter(d => d.year_planned).map((dest, i) => (
              <motion.div 
                key={dest.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: true, margin: "-20%" }}
                className="group cursor-pointer flex flex-col md:flex-row items-center gap-12 md:gap-24"
                onClick={() => setSelectedDest(dest)}
              >
                {/* Image standard Apple large imagery */}
                <div className={`w-full md:w-1/2 aspect-[4/3] rounded-[32px] overflow-hidden bg-[#0D0D0D] relative ${i % 2 !== 0 ? 'md:order-2' : ''}`}>
                   <motion.img 
                     src={dest.images[0]} 
                     alt={dest.title}
                     className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                   />
                   <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-[1s]" />
                </div>

                <div className={`w-full md:w-1/2 flex flex-col justify-center ${i % 2 !== 0 ? 'md:order-1 items-end text-right' : 'items-start text-left'}`}>
                   <span className="font-sans font-semibold text-[#F4BD45] text-xl tracking-tight mb-4">
                     {dest.year_planned}
                   </span>
                   <h3 className="font-sans font-bold text-5xl md:text-7xl text-white tracking-tighter mb-6">
                     {dest.title}
                   </h3>
                   <p className="font-sans text-xl md:text-2xl text-white/50 leading-relaxed font-medium max-w-md">
                     {dest.when_opens}
                   </p>
                   <button className="flex items-center gap-2 text-white font-sans font-semibold mt-10 text-lg hover:text-[#F4BD45] transition-colors">
                     Open chapter <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                   </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="footer" className="relative py-40 flex flex-col items-center justify-center bg-[#050505] border-t border-white/5 overflow-hidden">
        {/* Subtle glow */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-64 bg-[#F4BD45]/5 blur-[100px] pointer-events-none rounded-full" />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="text-center px-4 relative z-10"
        >
          <p className="font-sans font-bold text-5xl md:text-8xl lg:text-[7rem] leading-none text-white tracking-tighter mb-12">
            This was never <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white/30 to-white/10">meant to be finished.</span>
          </p>
        </motion.div>
      </footer>

      {/* Modal */}
      <DestinationModal 
        destination={selectedDest} 
        onClose={() => setSelectedDest(null)} 
      />
    </main>
  );
}
