"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  Check,
  ChevronDown,
  MessageCircle,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const faqs = [
  {
    q: "क्या पूजा और अनुष्ठान पहले से बुक किए जा सकते हैं?",
    a: "हाँ। आप अपनी आवश्यकता, पसंदीदा पूजा या अनुष्ठान और संभावित तारीख साझा करके पहले से बुकिंग के लिए संपर्क कर सकते हैं। उपलब्धता और अनुष्ठान की आवश्यकताओं के अनुसार तारीख एवं आगे की प्रक्रिया तय की जाती है।",
  },
  {
    q: "पूजा या अनुष्ठान के लिए क्या-क्या जानकारी देनी होती है?",
    a: "आमतौर पर पूजा के प्रकार, आपकी आवश्यकता, पसंदीदा तारीख और स्थान जैसी जानकारी उपयोगी रहती है। कुछ विशेष अनुष्ठानों के लिए जन्म संबंधी जानकारी या अन्य आवश्यक विवरण भी पूछे जा सकते हैं।",
  },
  {
    q: "क्या पूजा के लिए सामग्री की व्यवस्था भी की जाती है?",
    a: "पूजा की प्रकृति के अनुसार आवश्यक सामग्री और उसकी व्यवस्था के बारे में पहले से जानकारी दी जाती है। कौन-सी सामग्री उपलब्ध कराई जाएगी और किन चीज़ों की आवश्यकता होगी, यह अनुष्ठान तय होने के बाद स्पष्ट किया जाता है।",
  },
  {
    q: "कुंडली देखने के लिए कौन-कौन सी जानकारी आवश्यक है?",
    a: "कुंडली संबंधी मार्गदर्शन के लिए सामान्यतः जन्म तिथि, जन्म का सही समय और जन्म स्थान की आवश्यकता होती है। सही जानकारी उपलब्ध होने पर ज्योतिषीय चर्चा के लिए बेहतर संदर्भ मिलता है।",
  },
  {
    q: "क्या ज्योतिष परामर्श ऑनलाइन भी लिया जा सकता है?",
    a: "हाँ, ऑनलाइन परामर्श की सुविधा उपलब्धता और समय के अनुसार ली जा सकती है। परामर्श के माध्यम और उपलब्ध समय के बारे में पहले संपर्क करके जानकारी प्राप्त की जा सकती है।",
  },
  {
    q: "क्या पूजा के लिए पहले परामर्श लेना आवश्यक है?",
    a: "हर पूजा या अनुष्ठान के लिए पहले परामर्श लेना आवश्यक नहीं है। यदि आपकी आवश्यकता व्यक्तिगत या विशेष प्रकृति की है, तो पहले चर्चा करने से उपयुक्त प्रक्रिया और अनुष्ठान को समझने में सहायता मिल सकती है।",
  },
  {
    q: "पूजा की तारीख कैसे तय की जाती है?",
    a: "पूजा की तारीख अनुष्ठान की प्रकृति, उपलब्धता और आवश्यकताओं के अनुसार तय की जाती है। यदि किसी विशेष तिथि को पूजा करवानी हो, तो बुकिंग के समय अपनी पसंदीदा तारीख साझा की जा सकती है।",
  },
  {
    q: "क्या मंगल दोष या कालसर्प दोष का निवारण निश्चित परिणाम देता है?",
    a: "ज्योतिषीय दोष और उनके निवारण को पारंपरिक ज्योतिष एवं धार्मिक मान्यताओं के संदर्भ में समझा जाता है। किसी भी पूजा या अनुष्ठान से निश्चित या गारंटीकृत व्यक्तिगत परिणाम का दावा नहीं किया जाता।",
  },
];

const quickPoints = [
  "पहले आपकी आवश्यकता को समझा जाता है",
  "उपलब्धता के अनुसार तारीख पर चर्चा होती है",
  "पूजा की प्रक्रिया पहले स्पष्ट की जाती है",
  "आवश्यक जानकारी और तैयारी के बारे में बताया जाता है",
];

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="relative overflow-hidden bg-[#FFF9EF] px-6 py-24 sm:px-10 lg:px-16 lg:py-36"
    >
      {/* Background decoration */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-32 h-[420px] w-[420px] rounded-full border border-[#C69A42]/15"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -left-40 h-[520px] w-[520px] rounded-full border border-[#7A1717]/[0.06]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[12%] top-[35%] h-40 w-40 rounded-full bg-[#C69A42]/[0.04] blur-3xl"
      />

      <div className="relative z-10 mx-auto max-w-[1320px]">
        {/* =================================================
            HEADER
        ================================================= */}

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:items-end"
        >
          {/* Small label */}
          <div>
            <div className="flex items-center gap-3">
              <span className="h-px w-9 bg-[#A52A16]" />

              <span className="text-[10px] font-medium tracking-[0.22em] text-[#A52A16]">
                सामान्य प्रश्न
              </span>
            </div>

            <div className="mt-8 flex h-16 w-16 items-center justify-center rounded-full border border-[#C69A42]/30 bg-white">
              <span className="font-serif text-3xl text-[#A52A16]">
                ?
              </span>
            </div>
          </div>

          {/* Main heading */}
          <div>
            <h2 className="max-w-5xl font-serif text-[clamp(3rem,6vw,6rem)] leading-[0.9] tracking-[-0.045em] text-[#18120F]">
              आपके सवाल,
              <br />
              <span className="text-[#A52A16]">
                सरल जवाब।
              </span>
            </h2>

            <p className="mt-7 max-w-2xl text-sm leading-7 text-[#18120F]/50 sm:text-base">
              पूजा, अनुष्ठान, कुंडली और ज्योतिषीय परामर्श से
              जुड़े सामान्य प्रश्नों के उत्तर यहां दिए गए हैं।
            </p>
          </div>
        </motion.div>

        {/* =================================================
            MAIN CONTENT
        ================================================= */}

        <div className="mt-16 grid gap-14 lg:grid-cols-[0.55fr_1.45fr] lg:gap-24">
          {/* LEFT INFORMATION */}
          <motion.aside
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{
              once: true,
              margin: "-80px",
            }}
            transition={{ duration: 0.7 }}
            className="lg:sticky lg:top-28 lg:self-start"
          >
            <p className="text-[9px] font-medium tracking-[0.25em] text-[#18120F]/30">
              पूजा से पहले
            </p>

            <div className="mt-7 space-y-5">
              {quickPoints.map((point) => (
                <div
                  key={point}
                  className="flex items-start gap-3"
                >
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#7A1717] text-[#FFF9EF]">
                    <Check
                      size={10}
                      strokeWidth={2.5}
                    />
                  </span>

                  <p className="text-sm leading-6 text-[#18120F]/55">
                    {point}
                  </p>
                </div>
              ))}
            </div>

            {/* Contact card */}
            <div className="mt-10 rounded-2xl border border-[#E8DCCB] bg-white p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FFF4E1] text-[#A52A16]">
                <MessageCircle
                  size={18}
                  strokeWidth={1.7}
                />
              </div>

              <h3 className="mt-5 font-serif text-xl text-[#18120F]">
                आपका प्रश्न अलग है?
              </h3>

              <p className="mt-2 text-sm leading-6 text-[#18120F]/45">
                अपनी आवश्यकता सीधे साझा करें। आपको उपलब्ध
                विकल्प और आगे की प्रक्रिया के बारे में जानकारी दी जाएगी।
              </p>

              <Link
                href="/contact"
                className="group mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#A52A16]"
              >
                सीधे संपर्क करें

                <ArrowUpRight
                  size={15}
                  strokeWidth={1.7}
                  className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </Link>
            </div>
          </motion.aside>

          {/* FAQ ACCORDION */}
          <div className="border-t border-[#18120F]/10">
            {faqs.map((faq, index) => {
              const isOpen = open === index;

              return (
                <motion.div
                  key={faq.q}
                  initial={{
                    opacity: 0,
                    y: 15,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                    margin: "-40px",
                  }}
                  transition={{
                    duration: 0.5,
                    delay: Math.min(index * 0.04, 0.2),
                  }}
                  className="border-b border-[#18120F]/10"
                >
                  <button
                    type="button"
                    onClick={() =>
                      setOpen(isOpen ? null : index)
                    }
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${index}`}
                    className="group flex w-full items-center gap-5 py-7 text-left sm:py-8"
                  >
                    {/* Number */}
                    <span className="w-7 shrink-0 font-mono text-[9px] tracking-[0.15em] text-[#A52A16]">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    {/* Question */}
                    <span
                      className={`flex-1 font-serif text-xl leading-tight transition-colors duration-300 sm:text-2xl ${
                        isOpen
                          ? "text-[#A52A16]"
                          : "text-[#18120F] group-hover:text-[#A52A16]"
                      }`}
                    >
                      {faq.q}
                    </span>

                    {/* Icon */}
                    <span
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                        isOpen
                          ? "rotate-180 border-[#7A1717] bg-[#7A1717] text-white"
                          : "border-[#18120F]/10 bg-white text-[#18120F]/40 group-hover:border-[#A52A16]/30 group-hover:text-[#A52A16]"
                      }`}
                    >
                      <ChevronDown
                        size={17}
                        strokeWidth={1.7}
                      />
                    </span>
                  </button>

                  {/* Answer */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`faq-answer-${index}`}
                        initial={{
                          height: 0,
                          opacity: 0,
                        }}
                        animate={{
                          height: "auto",
                          opacity: 1,
                        }}
                        exit={{
                          height: 0,
                          opacity: 0,
                        }}
                        transition={{
                          height: {
                            duration: 0.38,
                            ease: [
                              0.22,
                              1,
                              0.36,
                              1,
                            ],
                          },
                          opacity: {
                            duration: 0.2,
                          },
                        }}
                        className="overflow-hidden"
                      >
                        <div className="pb-8 pl-12 pr-8 sm:pr-14">
                          <p className="max-w-3xl text-sm leading-7 text-[#18120F]/50 sm:text-[15px]">
                            {faq.a}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

