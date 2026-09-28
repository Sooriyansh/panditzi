"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const BRAND = "सुमित शर्मा";
const DEVANAGARI_FONT =
  '"Noto Serif Devanagari", "Nirmala UI", "Mangal", serif';

const containerVariants = {
  initial: { opacity: 1 },
  exit: {
    opacity: 0,
    transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] as const },
  },
};

export default function LandingAnimation({ onComplete }: { onComplete?: () => void }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let completeTimer: ReturnType<typeof setTimeout> | undefined;

    const mainTimer = setTimeout(() => {
      setVisible(false);

      completeTimer = setTimeout(() => {
        onComplete?.();
      }, 800);
    }, 3200);

    return () => {
      clearTimeout(mainTimer);
      if (completeTimer) clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-between overflow-hidden bg-[#faf6f0] py-10"
          variants={containerVariants}
          initial="initial"
          exit="exit"
        >
          {/* Subtle Ambient Radial Background Glow */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="h-[500px] w-[500px] rounded-full bg-radial from-[#c69a42]/10 via-[#c69a42]/5 to-transparent blur-3xl sm:h-[650px] sm:w-[650px]" />
          </div>

          {/* Top Decorative Element */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 flex items-center gap-2"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#b88b43]/60" />
            <span
              className="text-[11px] font-medium tracking-widest text-[#a18a7b]"
              style={{ fontFamily: DEVANAGARI_FONT }}
            >
              श्री गणेशाय नमः
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-[#b88b43]/60" />
          </motion.div>

          {/* Main Content Container */}
          <div className="relative z-10 flex w-full max-w-4xl flex-col items-center px-6 text-center">
            
            {/* ========================================
                REDESIGNED OM EMBLEM (Sacred Visual)
            ========================================= */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex items-center justify-center"
            >
              {/* Outer Slow Rotating Dotted Ring */}
              <motion.div
                className="absolute h-32 w-32 rounded-full border border-dashed border-[#b88b43]/35 sm:h-40 sm:w-40"
                animate={{ rotate: 360 }}
                transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
              />

              {/* Inner Soft Glowing Card Container */}
              <div className="relative flex h-28 w-28 items-center justify-center rounded-full border border-[#b88b43]/20 bg-[#f4ece1]/60 shadow-[0_8px_30px_rgb(184,139,67,0.08)] backdrop-blur-sm sm:h-36 sm:w-36">
                <motion.span
                  className="select-none text-[64px] leading-none text-[#781d16] drop-shadow-sm sm:text-[80px]"
                  style={{ fontFamily: DEVANAGARI_FONT }}
                  animate={{ scale: [1, 1.03, 1] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  ॐ
                </motion.span>
              </div>
            </motion.div>

            {/* Accent Divider Line */}
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 60, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
              className="mt-6 h-[1px] bg-gradient-to-r from-transparent via-[#b88b43] to-transparent"
            />

            {/* ========================================
                BRAND NAME ("सुमित शर्मा")
            ========================================= */}
            <motion.h1
              aria-label={BRAND}
              className="mt-5 w-full text-[40px] font-bold leading-tight text-[#241814] sm:text-[60px] md:text-[80px] lg:text-[96px]"
              style={{
                fontFamily: DEVANAGARI_FONT,
                fontFeatureSettings: '"kern", "liga"',
                textRendering: "optimizeLegibility",
              }}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.9,
                delay: 0.6,
                ease: [0.22, 1, 0.36, 1] as const,
              }}
            >
              {BRAND}
            </motion.h1>

            {/* Tagline */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.0 }}
              className="mt-3 flex items-center justify-center gap-3 sm:mt-4"
            >
              <span className="h-px w-8 bg-gradient-to-r from-transparent to-[#9c7b65]/50 sm:w-12" />
              <span
                className="text-[13px] font-semibold tracking-wider text-[#735848] sm:text-[15px]"
                style={{ fontFamily: DEVANAGARI_FONT }}
              >
                वैदिक ज्योतिष
              </span>
              <span className="h-px w-8 bg-gradient-to-l from-transparent to-[#9c7b65]/50 sm:w-12" />
            </motion.div>

            {/* Services List */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 1.3 }}
              className="mt-2 text-[10px] font-medium text-[#9c8374] sm:text-[12px]"
              style={{ fontFamily: DEVANAGARI_FONT }}
            >
              पूजा • अनुष्ठान • दोष निवारण
            </motion.p>

            {/* Progress Bar */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.5, delay: 1.45 }}
              className="mt-8 h-[2px] w-[110px] origin-center overflow-hidden rounded-full bg-[#781d16]/10 sm:w-[140px]"
            >
              <motion.div
                className="h-full w-full origin-left bg-gradient-to-r from-[#781d16] via-[#b88b43] to-[#781d16]"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{
                  duration: 1.1,
                  delay: 1.5,
                  ease: [0.76, 0, 0.24, 1] as const,
                }}
              />
            </motion.div>
          </div>

          {/* Footer Location */}
          <motion.div
            className="relative z-10 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8, duration: 0.6 }}
          >
            <p
              className="text-[10px] font-semibold tracking-widest text-[#a18a7b] sm:text-[11px]"
              style={{ fontFamily: DEVANAGARI_FONT }}
            >
              उज्जैन • मध्य प्रदेश
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}