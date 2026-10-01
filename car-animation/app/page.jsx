"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Register the ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  const containerRef = useRef(null);
  const heroContentRef = useRef(null);
  const headlineRef = useRef(null);
  const statsRef = useRef([]);
  const carRef = useRef(null);

  useGSAP(() => {
    // --- 1. Initial Load Animation ---
    const tl = gsap.timeline();

    // Fade and slide up the headline smoothly
    tl.from(headlineRef.current, {
      y: 40,
      opacity: 0,
      duration: 1.2,
      ease: "power3.out",
      delay: 0.2,
    });

    // Staggered reveal for statistics
    tl.from(
      statsRef.current,
      {
        y: 20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
      },
      "-=0.6" // Start slightly before headline finishes
    );

    // Fade in the car initially
    tl.from(
      carRef.current,
      {
        opacity: 0,
        x: -50,
        duration: 1,
        ease: "power2.out",
      },
      "-=0.4"
    );

    // --- 2. Scroll-Based Animation ---
    // Pin the hero section and move the car based on scroll progress
    gsap.to(carRef.current, {
      x: () => window.innerWidth, // Moves the car across the entire screen width
      ease: "none", // Linear interpolation for natural scroll feeling
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=1500", // The scroll distance (controls the speed/duration of the scroll)
        scrub: 1, // 1-second smoothing effect so motion feels premium
        pin: heroContentRef.current, // Pins the layout in place while scrolling
        anticipatePin: 1,
      },
    });
  }, { scope: containerRef });

  const stats = [
    { percent: "98%", desc: "Performance Boost" },
    { percent: "50x", desc: "Smoother Scroll" },
    { percent: "100%", desc: "Satisfaction" },
  ];

  return (
    <main ref={containerRef} className="relative w-full bg-slate-900">
      {/* 
        This container acts as the pinned section. 
        It will stay on screen while the user scrolls down the defined '+1500' distance.
      */}
      <section 
        ref={heroContentRef} 
        className="h-screen w-full flex flex-col items-center justify-center relative overflow-hidden"
      >
        {/* Headline */}
        <h1 
          ref={headlineRef} 
          className="text-4xl md:text-6xl font-bold tracking-[0.5em] md:tracking-[1em] ml-[0.5em] md:ml-[1em] text-center uppercase"
        >
          Welcome Itzfizz
        </h1>

        {/* Impact Metrics / Statistics */}
        <div className="flex flex-wrap justify-center gap-8 md:gap-16 mt-16 z-10">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              ref={(el) => (statsRef.current[index] = el)} 
              className="text-center"
            >
              <h3 className="text-4xl md:text-5xl font-extrabold text-blue-500">
                {stat.percent}
              </h3>
              <p className="text-slate-400 mt-2 font-medium tracking-wide">
                {stat.desc}
              </p>
            </div>
          ))}
        </div>

        {/* 
          Main Visual Element (Car) 
          Starts positioned off-center left, moves to the right based on scroll.
        */}
        <div 
          ref={carRef} 
          className="absolute bottom-10 left-[-15%] md:left-[-10%] w-64 md:w-96 z-20"
        >
          {/* Using a placeholder car image. You can replace the src with your own asset */}
          <img 
            src="https://www.pngmart.com/files/4/Car-PNG-HD.png" 
            alt="Animated Car" 
            className="w-full h-auto object-contain drop-shadow-2xl" 
          />
        </div>
      </section>

      {/* Spacer to allow scrolling past the pinned section */}
      <div className="h-[1500px] w-full bg-slate-900"></div>
      
      {/* Next Section to prove scrolling works */}
      <section className="h-screen w-full flex items-center justify-center bg-slate-950 text-slate-500">
        <h2 className="text-3xl tracking-widest uppercase">Next Section</h2>
      </section>
    </main>
  );
}