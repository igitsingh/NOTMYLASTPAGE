'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ComposableMap, Geographies, Geography, Marker, Graticule, Sphere } from 'react-simple-maps';
import { destinations, Destination } from '@/data/destinations';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';

const geoUrl = "/world-india.json";

export default function InteractiveMap({ onSelect, selectedId }: { onSelect: (dest: Destination) => void, selectedId?: string | null }) {
  const [hovered, setHovered] = useState<string | null>(null);
  const [rotation, setRotation] = useState<[number, number, number]>([-78, -20, 0]);
  const [isDragging, setIsDragging] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [scale, setScale] = useState(250);
  const lastPos = useRef<{ x: number; y: number } | null>(null);
  const autoRotateRef = useRef<number | null>(null);
  const [isNightMode, setIsNightMode] = useState(true);

  const hoveredDest = destinations.find(d => d.id === hovered);
  const hoveredCountryCode = hoveredDest?.countryCode;

  // Auto-rotation effect
  useEffect(() => {
    const rotate = () => {
      if (!isDragging && !isAnimating) {
        setRotation(([x, y, z]) => [x + 0.15, y, z]);
      }
      autoRotateRef.current = requestAnimationFrame(rotate);
    };

    autoRotateRef.current = requestAnimationFrame(rotate);
    return () => {
      if (autoRotateRef.current) cancelAnimationFrame(autoRotateRef.current);
    };
  }, [isDragging, isAnimating]);

  // Handle zoom-out when external selection is cleared
  useEffect(() => {
    if (!selectedId && scale > 250 && !isAnimating) {
      setIsAnimating(true);
      const startScale = scale;
      const duration = 1000;
      const startTime = performance.now();

      const animateOut = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        
        setScale(startScale + (250 - startScale) * easeProgress);
        
        if (progress < 1) {
          requestAnimationFrame(animateOut);
        } else {
          setIsAnimating(false);
        }
      };
      
      requestAnimationFrame(animateOut);
    }
  }, [selectedId]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    lastPos.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !lastPos.current || isAnimating) return;

    const dx = e.clientX - lastPos.current.x;
    const dy = e.clientY - lastPos.current.y;

    setRotation(([x, y, z]) => [x + dx * 0.5, y - dy * 0.5, z]);
    lastPos.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    lastPos.current = null;
  };

  const getMarkerColor = (status: string, isHovered: boolean) => {
    if (isHovered) return '#F4BD45';
    switch (status) {
      case 'Been Here': return isNightMode ? '#f5f5f5' : '#111';
      case 'On My Way': return '#F4BD45';
      default: return isNightMode ? '#444' : '#bbb';
    }
  };

  const handleMarkerClick = (dest: Destination) => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    
    // Smoothly animate rotation and scale
    let targetX = -dest.coordinates[0];
    let targetY = -dest.coordinates[1];
    
    // Normalize targetX to be within 180 degrees of current rotation to take shortest path
    const currentX = rotation[0];
    const diffX = ((targetX - currentX + 180) % 360 + 360) % 360 - 180;
    targetX = currentX + diffX;

    const targetRotate: [number, number, number] = [targetX, targetY, 0];
    
    // We'll use a simple interval or requestAnimationFrame to animate for more control
    // but a cleaner way in Framer Motion is to use the animate function
    const startRotate = [...rotation];
    const startScale = scale;
    const duration = 1500;
    const startTime = performance.now();

    const animateTransition = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing: easeOutExpo
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      
      const nextRotation: [number, number, number] = [
        startRotate[0] + (targetRotate[0] - startRotate[0]) * easeProgress,
        startRotate[1] + (targetRotate[1] - startRotate[1]) * easeProgress,
        startRotate[2] + (targetRotate[2] - startRotate[2]) * easeProgress,
      ];
      
      const nextScale = startScale + (600 - startScale) * easeProgress;
      
      setRotation(nextRotation);
      setScale(nextScale);
      
      if (progress < 1) {
        requestAnimationFrame(animateTransition);
      } else {
        setTimeout(() => {
          onSelect(dest);
          setIsAnimating(false);
          // Gently zoom back out after a delay to keep the map usable
          // or just stay zoomed in. User asked to "zoom in... before the modal expands"
        }, 300);
      }
    };
    
    requestAnimationFrame(animateTransition);
  };

  return (
    <div 
      className="w-full relative h-[60vh] md:h-[80vh] flex items-center justify-center overflow-hidden cursor-grab active:cursor-grabbing"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Background Glow */}
      <div className={`absolute inset-0 pointer-events-none transition-opacity duration-1000 ${isNightMode ? 'opacity-10' : 'opacity-5'}`} 
           style={{ background: `radial-gradient(circle_at_center,_#F4BD45_0%,_transparent_70%)`, filter: 'blur(120px)' }} />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true }}
        className="w-full h-full max-w-4xl mx-auto touch-none"
      >
        <ComposableMap
          projection="geoOrthographic"
          projectionConfig={{ 
            rotate: rotation,
            scale: scale 
          }}
          style={{ width: "100%", height: "100%" }}
        >
          {/* Globe Atmosphere/Background */}
          <Sphere 
            id="globe-sphere" 
            fill={isNightMode ? "#030303" : "#f0f0f0"} 
            stroke={isNightMode ? "#ffffff10" : "#00000010"} 
            strokeWidth={0.5} 
          />
          <Graticule stroke={isNightMode ? "#ffffff05" : "#00000005"} strokeWidth={0.5} />

          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const isHoveredCountry = hoveredCountryCode && (geo.properties.ISO_A3 === hoveredCountryCode || geo.id === hoveredCountryCode);
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={isHoveredCountry ? "#F4BD45" : (isNightMode ? "#111" : "#e0e0e0")}
                    stroke={isHoveredCountry ? "#F4BD45" : (isNightMode ? "#222" : "#ccc")}
                    strokeWidth={isHoveredCountry ? 1 : 0.5}
                    style={{
                      default: { outline: "none", transition: "all 500ms" },
                      hover: { fill: isNightMode ? "#1a1a1a" : "#d0d0d0", outline: "none" },
                      pressed: { fill: "#111", outline: "none" },
                    }}
                  />
                );
              })
            }
          </Geographies>

          {destinations.map((dest) => (
            <Marker key={dest.id} coordinates={dest.coordinates}>
              <circle
                r={hovered === dest.id ? 6 : 4}
                fill={getMarkerColor(dest.status, hovered === dest.id)}
                className="cursor-pointer transition-all duration-500 ease-in-out"
                onMouseEnter={() => setHovered(dest.id)}
                onMouseLeave={() => setHovered(null)}
                onClick={(e) => {
                  e.stopPropagation();
                  handleMarkerClick(dest);
                }}
              />
              <AnimatePresence>
                {hovered === dest.id && (
                  <motion.text
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    textAnchor="middle"
                    y={-15}
                    style={{
                      fontFamily: "var(--font-inter)",
                      fill: "#f5f5f5",
                      fontSize: "12px",
                      fontWeight: 600,
                      pointerEvents: "none",
                      textShadow: "0 0 10px rgba(0,0,0,0.8)"
                    }}
                  >
                    {dest.title}
                  </motion.text>
                )}
              </AnimatePresence>
            </Marker>
          ))}
        </ComposableMap>
      </motion.div>

      {/* Interaction Hint */}
      <div className="absolute bottom-10 left-10 hidden md:block select-none pointer-events-none">
        <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-white/20 transition-colors duration-1000" style={{ color: isNightMode ? undefined : '#666' }}>
          Click and drag to rotate the story
        </p>
      </div>

      {/* Mode Toggle */}
      <div className="absolute top-10 right-10 z-10">
        <button 
          onClick={() => setIsNightMode(!isNightMode)}
          className={`p-3 rounded-full border transition-all duration-500 flex items-center justify-center ${
            isNightMode 
              ? 'bg-white/5 border-white/10 text-white/50 hover:text-white' 
              : 'bg-black/5 border-black/10 text-black/50 hover:text-black'
          }`}
        >
          {isNightMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>

      {/* Legend */}
      <div className="absolute bottom-10 right-10 flex flex-col gap-3 font-sans text-[10px] tracking-widest text-[#666] select-none">
        <div className="flex items-center gap-3">
          <div className={`w-1.5 h-1.5 rounded-full ${isNightMode ? 'bg-[#f5f5f5]' : 'bg-[#111]'}`} /> BEEN HERE
        </div>
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-1.5 rounded-full bg-[#F4BD45]" /> ON MY WAY
        </div>
        <div className="flex items-center gap-3">
          <div className={`w-1.5 h-1.5 rounded-full ${isNightMode ? 'bg-[#333]' : 'bg-[#bbb]'}`} /> NOT YET
        </div>
      </div>
    </div>
  );
}
