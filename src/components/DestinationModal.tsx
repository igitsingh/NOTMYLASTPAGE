'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight } from 'lucide-react';
import { Destination } from '@/data/destinations';

export default function DestinationModal({
  destination,
  onClose,
}: {
  destination: Destination | null;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {destination && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Subtle heavy blur backdrop - Apple style */}
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-3xl"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal Content - Rounded and bordered */}
          <motion.div
            className="relative w-full max-w-6xl h-[90vh] md:h-[85vh] bg-[#050505] border border-white/10 shadow-2xl shadow-black/50 overflow-hidden rounded-[32px] md:rounded-[48px] flex flex-col md:flex-row"
            initial={{ y: 50, scale: 0.95, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 20, scale: 0.98, opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 md:top-8 md:right-8 z-50 p-3 bg-black/20 hover:bg-white/10 backdrop-blur-md rounded-full transition-colors text-white/50 hover:text-white border border-white/5"
            >
              <X size={20} strokeWidth={2} />
            </button>

            {/* Left side: Images */}
            <div className="w-full md:w-[45%] h-[40vh] md:h-full relative overflow-hidden group">
              <motion.img
                src={destination.images[0]}
                alt={destination.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[10s] ease-in-out group-hover:scale-110"
                initial={{ scale: 1.1, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-[#050505]" />
              
              {/* Image content */}
              <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12">
                <span className="text-[#F4BD45] text-sm md:text-base font-bold tracking-tight mb-2 block font-sans">
                  {destination.status}
                </span>
                <h2 className="font-sans font-bold text-5xl md:text-7xl lg:text-8xl tracking-tighter text-white">
                  {destination.title}
                </h2>
              </div>
            </div>

            {/* Right side: Content */}
            <div className="w-full md:w-[55%] h-full overflow-y-auto p-8 md:p-16 lg:p-20 hide-scrollbar flex flex-col bg-[#050505]">
              <div className="space-y-16 my-auto">
                
                {destination.why_matters && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                  >
                    <h3 className="text-sm font-semibold tracking-wide text-white/30 mb-4 font-sans">
                      Why this page matters
                    </h3>
                    <p className="font-sans font-bold text-2xl md:text-4xl text-white/90 leading-snug tracking-tighter">
                      "{destination.why_matters}"
                    </p>
                  </motion.div>
                )}

                {destination.when_opens && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                  >
                    <h3 className="text-sm font-semibold tracking-wide text-white/30 mb-4 font-sans">
                      When this page opens
                    </h3>
                    <p className="text-lg md:text-2xl text-white/60 leading-relaxed font-sans font-medium tracking-tight">
                      {destination.when_opens}
                    </p>
                  </motion.div>
                )}

                {destination.feeling_prediction && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                  >
                    <h3 className="text-sm font-semibold tracking-wide text-white/30 mb-4 font-sans">
                      What I think it will feel like
                    </h3>
                    <p className="text-lg md:text-2xl text-white/60 leading-relaxed font-sans font-medium tracking-tight">
                      {destination.feeling_prediction}
                    </p>
                  </motion.div>
                )}

                {/* Memory Mode (Been Here) */}
                {destination.status === 'Been Here' && destination.reality && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                    className="p-8 bg-[#0D0D0D] border border-white/[0.05] rounded-[24px] mt-8 overflow-hidden relative"
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#F4BD45]/10 blur-[50px] pointer-events-none" />
                    
                    <h3 className="text-sm font-bold tracking-tight text-[#F4BD45] mb-8 font-sans">
                      Memory Mode / Expectation vs Reality
                    </h3>
                    <div className="space-y-8 relative z-10">
                      <div className="grid grid-cols-1 gap-8">
                        <div>
                          <p className="text-xs font-semibold text-white/30 uppercase tracking-widest mb-3">Expectation</p>
                          <p className="text-lg text-white/50 font-medium tracking-tight">"{destination.expectations}"</p>
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-white/30 uppercase tracking-widest mb-3">Reality</p>
                          <p className="text-xl text-white/90 font-medium tracking-tight">"{destination.reality}"</p>
                        </div>
                      </div>
                      
                      {destination.journal && (
                        <div className="pt-8 border-t border-white/10">
                          <p className="text-xs font-semibold text-white/30 uppercase tracking-widest mb-5">Journal</p>
                          <div className="space-y-6">
                            {destination.journal.map((entry, idx) => (
                              <p key={idx} className="font-sans font-medium text-xl text-white/80 border-l-2 pl-5 border-white/20 tracking-tight">
                                {entry}
                              </p>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.8 }}
                  className="pt-8 flex"
                >
                  <button onClick={onClose} className="group flex items-center gap-3 text-sm font-semibold tracking-wide text-white/50 hover:text-white transition-colors pb-1 border-b border-white/0 hover:border-white/30 font-sans">
                    Close Chapter
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </motion.div>

              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
