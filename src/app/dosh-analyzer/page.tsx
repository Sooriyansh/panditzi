"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CalendarDays,
  Check,
  CircleHelp,
  Info,
  MessageCircle,
  Sparkles,
  UserRound,
} from "lucide-react";

const doshas = [
  {
    id: "mangal",
    title: "मंगल दोष",
    subtitle: "Manglik / Mangal Dosha",
    description:
      "कुंडली में मंगल की स्थिति से जुड़ी पारंपरिक ज्योतिषीय अवधारणा।",
  },
  {
    id: "kaal-sarp",
    title: "काल सर्प दोष",
    subtitle: "Kaal Sarp Dosha",
    description:
      "राहु और केतु के संदर्भ में बताई जाने वाली पारंपरिक ज्योतिषीय अवधारणा।",
  },
  {
    id: "pitru",
    title: "पितृ दोष",
    subtitle: "Pitru Dosha",
    description:
      "पितृ एवं पूर्वजों से संबंधित पारंपरिक ज्योतिषीय मान्यताओं का संदर्भ।",
  },
  {
    id: "navgraha",
    title: "ग्रह संबंधी प्रश्न",
    subtitle: "Navgraha Guidance",
    description:
      "ग्रहों की स्थिति और उनसे जुड़े पारंपरिक उपायों को समझने के लिए।",
  },
];

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

export default function DoshAnalyzerPage() {
  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [birthTime, setBirthTime] = useState("");
  const [birthPlace, setBirthPlace] = useState("");
  const [selectedDosh, setSelectedDosh] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setSubmitted(true);

    window.setTimeout(() => {
      const params = new URLSearchParams({
        subject: "दोष विश्लेषण हेतु परामर्श",
        name,
        birthDate,
        birthTime,
        birthPlace,
        dosh: selectedDosh || "सामान्य ज्योतिषीय मार्गदर्शन",
      });

      window.location.href = `/book-consultation?${params.toString()}`;
    }, 350);
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#fffaf3] text-[#211713]">
      {/* Ambient background */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-40 top-24 h-96 w-96 rounded-full bg-[#d85b16]/10 blur-3xl" />
        <div className="absolute -right-48 top-[35%] h-[28rem] w-[28rem] rounded-full bg-[#c69a42]/10 blur-3xl" />
        <div className="absolute bottom-0 left-[30%] h-80 w-80 rounded-full bg-[#7a1717]/5 blur-3xl" />
      </div>

      {/* Hero */}
      <section className="relative mx-auto max-w-7xl px-5 pb-14 pt-28 sm:px-8 lg:px-12 lg:pb-20 lg:pt-36">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_.95fr]">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="max-w-3xl"
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#c69a42]/30 bg-white/75 px-4 py-2 text-xs font-bold tracking-[0.16em] text-[#7a1717] shadow-sm backdrop-blur">
              <Sparkles className="h-3.5 w-3.5" />
              पारंपरिक ज्योतिषीय मार्गदर्शन
            </div>

            <h1 className="font-serif text-5xl font-semibold leading-[1.04] tracking-[-0.04em] text-[#47120f] sm:text-6xl lg:text-7xl">
              कुंडली को समझें,
              <br />
              <span className="text-[#a52a16]">प्रश्नों पर चर्चा करें।</span>
            </h1>

            <p className="mt-7 max-w-2xl text-base leading-8 text-[#6f5a50] sm:text-lg">
              दोष विश्लेषक आपको मंगल दोष, काल सर्प दोष, पितृ दोष और अन्य
              पारंपरिक ज्योतिषीय अवधारणाओं से जुड़े प्रश्नों को व्यवस्थित
              तरीके से साझा करने में मदद करता है।
            </p>

            <div className="mt-8 grid max-w-2xl gap-3 sm:grid-cols-2">
              {[
                "कुंडली आधारित चर्चा",
                "पारंपरिक संदर्भ",
                "व्यक्तिगत मार्गदर्शन",
                "उपायों पर बातचीत",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-xl border border-[#e7d9cc] bg-white/75 px-4 py-3.5 backdrop-blur"
                >
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#7a1717] text-white">
                    <Check className="h-3.5 w-3.5" />
                  </span>

                  <span className="text-sm font-medium text-[#5e4940]">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Hero information card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.75,
              delay: 0.12,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative"
          >
            <div className="absolute -inset-5 rounded-[2rem] bg-[#c69a42]/10 blur-3xl" />

            <div className="relative overflow-hidden rounded-[2rem] border border-[#eadbc9] bg-white p-7 shadow-[0_25px_80px_rgba(80,35,20,0.10)] sm:p-8">
              <div className="absolute right-0 top-0 h-40 w-40 translate-x-1/3 -translate-y-1/3 rounded-full bg-[#c69a42]/10 blur-2xl" />

              <div className="relative">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#fff2e4] text-[#a52a16]">
                  <CircleHelp className="h-6 w-6" />
                </div>

                <h2 className="mt-6 font-serif text-3xl font-semibold text-[#47120f]">
                  दोष का अर्थ क्या है?
                </h2>

                <p className="mt-4 text-sm leading-7 text-[#806b61]">
                  ज्योतिष में अलग-अलग ग्रह स्थितियों और योगों को पारंपरिक
                  संदर्भ में विभिन्न नामों से समझाया जाता है। किसी भी
                  निष्कर्ष के लिए पूरी जन्मकुंडली और संदर्भ को देखना आवश्यक
                  माना जाता है।
                </p>

                <div className="mt-7 rounded-2xl border border-[#eadfd4] bg-[#fffaf4] p-5">
                  <div className="flex gap-3">
                    <Info className="mt-0.5 h-5 w-5 shrink-0 text-[#b94716]" />

                    <p className="text-sm leading-6 text-[#705b51]">
                      केवल किसी एक ग्रह या एक योग के आधार पर निश्चित निष्कर्ष
                      निकालना उचित नहीं माना जाना चाहिए।
                    </p>
                  </div>
                </div>

                <div className="mt-7 flex items-center gap-3 border-t border-[#eee2d5] pt-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#7a1717] text-white">
                    <Sparkles className="h-4 w-4" />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-[#493129]">
                      व्यक्तिगत चर्चा
                    </p>
                    <p className="text-xs text-[#8b786d]">
                      आवश्यकता के अनुसार आगे मार्गदर्शन
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Analyzer */}
      <section className="mx-auto max-w-7xl px-5 pb-24 sm:px-8 lg:px-12">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeUp}
          className="grid gap-8 lg:grid-cols-[1fr_350px]"
        >
          {/* Form */}
          <div className="rounded-[2rem] border border-[#eadbc9] bg-white p-6 shadow-[0_20px_70px_rgba(80,35,20,0.08)] sm:p-9 lg:p-10">
            <div className="mb-9">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#b94716]">
                जन्म विवरण
              </p>

              <h2 className="mt-2 font-serif text-3xl font-semibold text-[#47120f]">
                अपनी जानकारी साझा करें
              </h2>

              <p className="mt-3 max-w-2xl text-sm leading-7 text-[#77635a]">
                ये विवरण केवल प्रारंभिक परामर्श अनुरोध तैयार करने के लिए हैं।
                किसी भी निश्चित ज्योतिषीय निष्कर्ष के रूप में इन्हें न लें।
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-9">
              {/* Dosha selection */}
              <div>
                <label className="mb-4 block text-sm font-semibold text-[#3d2921]">
                  आपका मुख्य प्रश्न किस विषय से जुड़ा है?
                </label>

                <div className="grid gap-3 sm:grid-cols-2">
                  {doshas.map((dosh) => {
                    const active = selectedDosh === dosh.id;

                    return (
                      <button
                        key={dosh.id}
                        type="button"
                        onClick={() => setSelectedDosh(dosh.id)}
                        className={`group rounded-2xl border p-5 text-left transition-all duration-300 ${
                          active
                            ? "border-[#a52a16] bg-[#fff5ed] shadow-[0_8px_30px_rgba(165,42,22,0.08)]"
                            : "border-[#eadfd4] bg-[#fffdf9] hover:border-[#c69a42]/60 hover:bg-[#fffaf5]"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h3
                              className={`font-semibold ${
                                active
                                  ? "text-[#8d2114]"
                                  : "text-[#453029]"
                              }`}
                            >
                              {dosh.title}
                            </h3>

                            <p className="mt-1 text-xs font-medium text-[#a78f82]">
                              {dosh.subtitle}
                            </p>

                            <p className="mt-3 text-sm leading-6 text-[#806b61]">
                              {dosh.description}
                            </p>
                          </div>

                          <span
                            className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border ${
                              active
                                ? "border-[#a52a16] bg-[#a52a16] text-white"
                                : "border-[#d8c9bc] text-transparent"
                            }`}
                          >
                            <Check className="h-3.5 w-3.5" />
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Basic information */}
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2.5 block text-sm font-semibold text-[#3d2921]"
                  >
                    नाम
                  </label>

                  <div className="relative">
                    <UserRound className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#a78f82]" />

                    <input
                      id="name"
                      type="text"
                      required
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      placeholder="अपना नाम लिखें"
                      className="h-13 w-full rounded-xl border border-[#e4d7cb] bg-[#fffdf9] pl-11 pr-4 text-sm text-[#33221c] outline-none transition placeholder:text-[#ae9d92] focus:border-[#a52a16] focus:ring-4 focus:ring-[#a52a16]/10"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="birthPlace"
                    className="mb-2.5 block text-sm font-semibold text-[#3d2921]"
                  >
                    जन्म स्थान
                  </label>

                  <input
                    id="birthPlace"
                    type="text"
                    value={birthPlace}
                    onChange={(event) => setBirthPlace(event.target.value)}
                    placeholder="जन्म स्थान"
                    className="h-13 w-full rounded-xl border border-[#e4d7cb] bg-[#fffdf9] px-4 text-sm text-[#33221c] outline-none transition placeholder:text-[#ae9d92] focus:border-[#a52a16] focus:ring-4 focus:ring-[#a52a16]/10"
                  />
                </div>
              </div>

              {/* Birth date/time */}
              <div>
                <label className="mb-4 block text-sm font-semibold text-[#3d2921]">
                  जन्म विवरण
                  <span className="ml-2 font-normal text-[#9a887e]">
                    (वैकल्पिक)
                  </span>
                </label>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="relative">
                    <CalendarDays className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#a78f82]" />

                    <input
                      id="birthDate"
                      type="date"
                      value={birthDate}
                      onChange={(event) => setBirthDate(event.target.value)}
                      className="h-13 w-full rounded-xl border border-[#e4d7cb] bg-[#fffdf9] pl-11 pr-4 text-sm text-[#33221c] outline-none transition focus:border-[#a52a16] focus:ring-4 focus:ring-[#a52a16]/10"
                    />
                  </div>

                  <input
                    id="birthTime"
                    type="time"
                    value={birthTime}
                    onChange={(event) => setBirthTime(event.target.value)}
                    className="h-13 w-full rounded-xl border border-[#e4d7cb] bg-[#fffdf9] px-4 text-sm text-[#33221c] outline-none transition focus:border-[#a52a16] focus:ring-4 focus:ring-[#a52a16]/10"
                  />
                </div>
              </div>

              {/* Submit */}
              <div className="border-t border-[#eee2d5] pt-7">
                <button
                  type="submit"
                  className="group flex w-full items-center justify-center gap-3 rounded-xl bg-[#7a1717] px-6 py-4 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(122,23,23,0.20)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#651111]"
                >
                  {submitted ? (
                    <>
                      <Check className="h-5 w-5" />
                      जानकारी तैयार की जा रही है...
                    </>
                  ) : (
                    <>
                      <MessageCircle className="h-5 w-5" />
                      परामर्श के लिए आगे बढ़ें
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </button>

                <p className="mt-3 text-center text-xs leading-6 text-[#948178]">
                  आपकी जानकारी के आधार पर आपको परामर्श अनुरोध पेज पर ले जाया
                  जाएगा। कोई backend calculation नहीं किया जा रहा है।
                </p>
              </div>
            </form>
          </div>

          {/* Right column */}
          <aside className="space-y-5">
            <div className="rounded-[2rem] border border-[#eadbc9] bg-[#47120f] p-7 text-white shadow-[0_20px_60px_rgba(71,18,15,0.18)]">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
                <Sparkles className="h-5 w-5 text-[#e5c37b]" />
              </div>

              <p className="mt-6 text-xs font-bold uppercase tracking-[0.18em] text-[#e5c37b]">
                महत्वपूर्ण
              </p>

              <h3 className="mt-3 font-serif text-2xl font-semibold">
                यह एक प्रारंभिक
                <br />
                मार्गदर्शन है।
              </h3>

              <p className="mt-4 text-sm leading-7 text-white/70">
                यह टूल किसी दोष की पुष्टि या भविष्यवाणी नहीं करता। अंतिम
                चर्चा पारंपरिक ज्योतिषीय संदर्भ में की जाएगी।
              </p>

              <div className="mt-7 space-y-4 border-t border-white/10 pt-6">
                {[
                  "एक से अधिक ग्रहों की स्थिति देखी जा सकती है",
                  "पूरी कुंडली का संदर्भ महत्वपूर्ण है",
                  "उपाय व्यक्ति और परिस्थिति के अनुसार अलग हो सकते हैं",
                ].map((item) => (
                  <div key={item} className="flex gap-3">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#c69a42] text-[#47120f]">
                      <Check className="h-3 w-3" />
                    </span>

                    <p className="text-sm leading-6 text-white/80">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-[#eadbc9] bg-white p-7">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#b94716]">
                आगे क्या?
              </p>

              <h3 className="mt-2 font-serif text-2xl font-semibold text-[#47120f]">
                व्यक्तिगत परामर्श
              </h3>

              <p className="mt-3 text-sm leading-7 text-[#806b61]">
                यदि आप अपनी कुंडली से जुड़े प्रश्न पर सीधे चर्चा करना चाहते
                हैं, तो परामर्श अनुरोध भेज सकते हैं।
              </p>

              <Link
                href="/book-consultation"
                className="group mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#8d2114]"
              >
                परामर्श बुक करें
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            <div className="rounded-[2rem] border border-[#eadbc9] bg-[#fff7ec] p-7">
              <div className="flex gap-3">
                <Info className="mt-0.5 h-5 w-5 shrink-0 text-[#b94716]" />

                <p className="text-xs leading-6 text-[#705b51]">
                  ज्योतिषीय व्याख्याएँ पारंपरिक मान्यताओं पर आधारित हैं। इन्हें
                  निश्चित भविष्यवाणी, चिकित्सा सलाह या किसी परिणाम की गारंटी
                  नहीं माना जाना चाहिए।
                </p>
              </div>
            </div>
          </aside>
        </motion.div>
      </section>

      {/* Services CTA */}
      <section className="border-t border-[#eadbc9] bg-[#fff4e7]">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-12 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-12">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#b94716]">
              पूजा एवं अनुष्ठान
            </p>

            <h2 className="mt-2 font-serif text-2xl font-semibold text-[#47120f]">
              संबंधित पूजा सेवाएँ देखें
            </h2>

            <p className="mt-1 text-sm text-[#806b61]">
              दोष निवारण और अन्य पारंपरिक पूजा सेवाओं की जानकारी प्राप्त करें।
            </p>
          </div>

          <Link
            href="/puja-services"
            className="group inline-flex items-center justify-center gap-2 rounded-xl bg-[#7a1717] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#651111]"
          >
            पूजा सेवाएँ देखें
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>
    </main>
  );
}

