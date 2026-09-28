"use client";

import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CalendarDays,
  Check,
  Clock3,
  MessageCircle,
  Phone,
  Sparkles,
  UserRound,
} from "lucide-react";

const WHATSAPP_NUMBER = "8871928175";

const consultationTypes = [
  {
    id: "jyotish",
    title: "ज्योतिष परामर्श",
    description: "कुंडली, ग्रह एवं जीवन से जुड़े प्रश्नों पर पारंपरिक मार्गदर्शन।",
  },
  {
    id: "puja",
    title: "पूजा एवं अनुष्ठान",
    description: "उचित पूजा, अनुष्ठान और धार्मिक प्रक्रिया के लिए मार्गदर्शन।",
  },
  {
    id: "dosha",
    title: "दोष निवारण",
    description: "मंगल दोष, काल सर्प दोष, पितृ दोष आदि से संबंधित चर्चा।",
  },
  {
    id: "general",
    title: "सामान्य मार्गदर्शन",
    description: "अपनी परिस्थिति और आवश्यकता के अनुसार प्रारंभिक चर्चा।",
  },
];

const timeSlots = [
  "सुबह 09:00 – 11:00",
  "दोपहर 12:00 – 02:00",
  "शाम 04:00 – 06:00",
  "शाम 06:00 – 08:00",
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

export default function BookConsultationPage() {
  const [consultationType, setConsultationType] = useState("jyotish");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const selectedType = useMemo(
    () =>
      consultationTypes.find((item) => item.id === consultationType) ??
      consultationTypes[0],
    [consultationType],
  );

  const today = new Date().toISOString().split("T")[0];

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const whatsappMessage = [
      "नमस्कार पंडित सुमित शर्मा जी,",
      "",
      "मैं परामर्श के लिए अनुरोध भेजना चाहता/चाहती हूँ।",
      "",
      `नाम: ${name}`,
      `मोबाइल: ${phone}`,
      `परामर्श: ${selectedType.title}`,
      `पसंदीदा तारीख: ${date || "कोई विशेष तारीख नहीं"}`,
      `पसंदीदा समय: ${time || "कोई विशेष समय नहीं"}`,
      `प्रश्न / आवश्यकता: ${message || "बात करके बताना चाहता/चाहती हूँ।"}`,
      "",
      "कृपया उपलब्धता की पुष्टि करें।",
    ].join("\n");

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      whatsappMessage,
    )}`;

    setSubmitted(true);

    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#fffaf3] text-[#211713]">
      {/* Ambient background */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-40 top-20 h-80 w-80 rounded-full bg-[#d85b16]/10 blur-3xl" />
        <div className="absolute -right-40 top-[35%] h-96 w-96 rounded-full bg-[#c69a42]/10 blur-3xl" />
        <div className="absolute bottom-0 left-[35%] h-72 w-72 rounded-full bg-[#7a1717]/5 blur-3xl" />
      </div>

      {/* Hero */}
      <section className="relative mx-auto max-w-7xl px-5 pb-12 pt-28 sm:px-8 lg:px-12 lg:pb-20 lg:pt-36">
        <div className="grid items-end gap-12 lg:grid-cols-[1.05fr_.95fr]">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="max-w-3xl"
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#c69a42]/30 bg-white/70 px-4 py-2 text-xs font-semibold tracking-[0.16em] text-[#7a1717] shadow-sm backdrop-blur"
            >
              <Sparkles className="h-3.5 w-3.5" />
              व्यक्तिगत मार्गदर्शन
            </div>

            <h1 className="font-serif text-5xl font-semibold leading-[1.04] tracking-[-0.04em] text-[#47120f] sm:text-6xl lg:text-7xl">
              अपनी बात साझा करें,
              <br />
              <span className="text-[#a52a16]">मार्गदर्शन पाएं।</span>
            </h1>

            <p className="mt-7 max-w-2xl text-base leading-8 text-[#6f5a50] sm:text-lg">
              कुंडली, पूजा, दोष निवारण या किसी धार्मिक विषय से जुड़े अपने
              प्रश्न साझा करें। आपकी आवश्यकता के अनुसार प्रारंभिक चर्चा और
              उपलब्धता की पुष्टि संपर्क के बाद की जाएगी।
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {[
                "व्यक्तिगत चर्चा",
                "पारंपरिक मार्गदर्शन",
                "उज्जैन से सेवा",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2 rounded-full border border-[#e5d6c4] bg-white/80 px-4 py-2.5 text-sm text-[#5d4940]"
                >
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#7a1717] text-white">
                    <Check className="h-3 w-3" />
                  </span>
                  {item}
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.75,
              delay: 0.15,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative"
          >
            <div className="absolute -inset-4 rounded-[2rem] bg-[#c69a42]/10 blur-2xl" />

            <div className="relative overflow-hidden rounded-[2rem] border border-[#eadbc9] bg-white p-7 shadow-[0_25px_80px_rgba(80,35,20,0.10)] sm:p-8">
              <div className="mb-7 flex items-start justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#b94716]">
                    Consultation
                  </p>
                  <h2 className="mt-2 font-serif text-2xl font-semibold text-[#47120f]">
                    अनुरोध कैसे आगे बढ़ेगा?
                  </h2>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#fff3e5] text-[#a52a16]">
                  <MessageCircle className="h-5 w-5" />
                </div>
              </div>

              <div className="space-y-5">
                {[
                  [
                    "01",
                    "अपनी आवश्यकता साझा करें",
                    "कुछ सामान्य जानकारी और अपने प्रश्न बताएं।",
                  ],
                  [
                    "02",
                    "संपर्क के माध्यम से चर्चा",
                    "आपकी जानकारी देखकर आगे की बातचीत होगी।",
                  ],
                  [
                    "03",
                    "समय की पुष्टि",
                    "उपलब्धता के अनुसार उपयुक्त समय निश्चित किया जाएगा।",
                  ],
                ].map(([number, title, description]) => (
                  <div key={number} className="flex gap-4">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#7a1717] text-xs font-bold text-white">
                      {number}
                    </div>

                    <div>
                      <h3 className="font-semibold text-[#3c241c]">{title}</h3>
                      <p className="mt-1 text-sm leading-6 text-[#806b61]">
                        {description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-7 border-t border-[#eee2d5] pt-6">
                <div className="flex items-center gap-3 text-sm text-[#705c52]">
                  <Clock3 className="h-4 w-4 text-[#b94716]" />
                  <span>समय केवल प्राथमिकता है, अंतिम पुष्टि संपर्क के बाद होगी।</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Form */}
      <section className="relative mx-auto max-w-7xl px-5 pb-24 sm:px-8 lg:px-12">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.12 }}
          variants={fadeUp}
          className="grid gap-8 lg:grid-cols-[1fr_360px]"
        >
          <div className="rounded-[2rem] border border-[#eadbc9] bg-white p-6 shadow-[0_20px_70px_rgba(80,35,20,0.08)] sm:p-9 lg:p-10">
            <div className="mb-9">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#b94716]">
                आपकी जानकारी
              </p>

              <h2 className="mt-2 font-serif text-3xl font-semibold text-[#47120f]">
                परामर्श अनुरोध
              </h2>

              <p className="mt-3 max-w-2xl text-sm leading-7 text-[#77635a]">
                केवल आवश्यक जानकारी साझा करें। जन्म विवरण तभी दें जब आपकी
                चर्चा के लिए उनकी आवश्यकता हो।
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-9">
              {/* Consultation type */}
              <div>
                <label className="mb-4 block text-sm font-semibold text-[#3d2921]">
                  आप किस विषय पर मार्गदर्शन चाहते हैं?
                </label>

                <div className="grid gap-3 sm:grid-cols-2">
                  {consultationTypes.map((item) => {
                    const active = consultationType === item.id;

                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setConsultationType(item.id)}
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
                                active ? "text-[#8d2114]" : "text-[#453029]"
                              }`}
                            >
                              {item.title}
                            </h3>

                            <p className="mt-2 text-sm leading-6 text-[#806b61]">
                              {item.description}
                            </p>
                          </div>

                          <span
                            className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition ${
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

              {/* Name + phone */}
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2.5 block text-sm font-semibold text-[#3d2921]"
                  >
                    आपका नाम
                  </label>

                  <div className="relative">
                    <UserRound className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#a78f82]" />

                    <input
                      id="name"
                      name="name"
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
                    htmlFor="phone"
                    className="mb-2.5 block text-sm font-semibold text-[#3d2921]"
                  >
                    मोबाइल नंबर
                  </label>

                  <div className="relative">
                    <Phone className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#a78f82]" />

                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      value={phone}
                      onChange={(event) => setPhone(event.target.value)}
                      placeholder="10 अंकों का मोबाइल नंबर"
                      className="h-13 w-full rounded-xl border border-[#e4d7cb] bg-[#fffdf9] pl-11 pr-4 text-sm text-[#33221c] outline-none transition placeholder:text-[#ae9d92] focus:border-[#a52a16] focus:ring-4 focus:ring-[#a52a16]/10"
                    />
                  </div>
                </div>
              </div>

              {/* Date + time */}
              <div>
                <label className="mb-4 block text-sm font-semibold text-[#3d2921]">
                  पसंदीदा समय
                  <span className="ml-2 font-normal text-[#9a887e]">
                    (वैकल्पिक)
                  </span>
                </label>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="relative">
                    <CalendarDays className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#a78f82]" />

                    <input
                      id="date"
                      name="date"
                      type="date"
                      min={today}
                      value={date}
                      onChange={(event) => setDate(event.target.value)}
                      className="h-13 w-full rounded-xl border border-[#e4d7cb] bg-[#fffdf9] pl-11 pr-4 text-sm text-[#33221c] outline-none transition focus:border-[#a52a16] focus:ring-4 focus:ring-[#a52a16]/10"
                    />
                  </div>

                  <div className="relative">
                    <Clock3 className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#a78f82]" />

                    <select
                      id="time"
                      name="time"
                      value={time}
                      onChange={(event) => setTime(event.target.value)}
                      className="h-13 w-full appearance-none rounded-xl border border-[#e4d7cb] bg-[#fffdf9] pl-11 pr-4 text-sm text-[#33221c] outline-none transition focus:border-[#a52a16] focus:ring-4 focus:ring-[#a52a16]/10"
                    >
                      <option value="">समय चुनें</option>
                      {timeSlots.map((slot) => (
                        <option key={slot} value={slot}>
                          {slot}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="mb-2.5 block text-sm font-semibold text-[#3d2921]"
                >
                  आपकी आवश्यकता / प्रश्न
                  <span className="ml-2 font-normal text-[#9a887e]">
                    (वैकल्पिक)
                  </span>
                </label>

                <textarea
                  id="message"
                  name="message"
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  rows={5}
                  placeholder="संक्षेप में बताएं कि आप किस विषय पर मार्गदर्शन चाहते हैं..."
                  className="w-full resize-none rounded-xl border border-[#e4d7cb] bg-[#fffdf9] px-4 py-3.5 text-sm leading-7 text-[#33221c] outline-none transition placeholder:text-[#ae9d92] focus:border-[#a52a16] focus:ring-4 focus:ring-[#a52a16]/10"
                />
              </div>

              {/* Submit */}
              <div className="border-t border-[#eee2d5] pt-7">
                <button
                  type="submit"
                  className="group flex w-full items-center justify-center gap-3 rounded-xl bg-[#7a1717] px-6 py-4 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(122,23,23,0.20)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#651111] hover:shadow-[0_16px_38px_rgba(122,23,23,0.26)]"
                >
                  <MessageCircle className="h-5 w-5" />

                  <span>
                    {submitted
                      ? "WhatsApp पर अनुरोध भेजा जा रहा है..."
                      : "WhatsApp पर अनुरोध भेजें"}
                  </span>

                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </button>

                <p className="mt-3 text-center text-xs leading-6 text-[#948178]">
                  बटन दबाने पर आपकी जानकारी WhatsApp संदेश के रूप में तैयार
                  होगी। अंतिम समय और उपलब्धता संपर्क के बाद सुनिश्चित होगी।
                </p>
              </div>
            </form>
          </div>

          {/* Side information */}
          <aside className="space-y-5">
            <div className="rounded-[2rem] border border-[#eadbc9] bg-[#47120f] p-7 text-white shadow-[0_20px_60px_rgba(71,18,15,0.18)]">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
                <Sparkles className="h-5 w-5 text-[#e5c37b]" />
              </div>

              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#e5c37b]">
                महत्वपूर्ण जानकारी
              </p>

              <h3 className="mt-3 font-serif text-2xl font-semibold">
                पहले चर्चा,
                <br />
                फिर पुष्टि।
              </h3>

              <p className="mt-4 text-sm leading-7 text-white/70">
                पसंदीदा तारीख और समय केवल आपकी प्राथमिकता है। वास्तविक
                उपलब्धता संपर्क के बाद ही निश्चित की जाएगी।
              </p>

              <div className="mt-7 space-y-4 border-t border-white/10 pt-6">
                {[
                  "जन्म विवरण वैकल्पिक हैं",
                  "व्यक्तिगत आवश्यकता के अनुसार चर्चा",
                  "समय की पुष्टि संपर्क के बाद",
                  "WhatsApp के माध्यम से आसान संपर्क",
                ].map((item) => (
                  <div key={item} className="flex gap-3">
                    <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#c69a42] text-[#47120f]">
                      <Check className="h-3 w-3" />
                    </div>
                    <p className="text-sm leading-6 text-white/80">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-[#eadbc9] bg-white p-7">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#b94716]">
                अन्य सेवाएँ
              </p>

              <h3 className="mt-2 font-serif text-2xl font-semibold text-[#47120f]">
                पूजा सेवाएँ भी देखें
              </h3>

              <p className="mt-3 text-sm leading-6 text-[#806b61]">
                यदि आपको सीधे किसी पूजा या अनुष्ठान की जानकारी चाहिए, तो
                हमारी पूजा सेवाएँ देखें।
              </p>

              <Link
                href="/puja-services"
                className="group mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#8d2114]"
              >
                पूजा सेवाएँ देखें
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            <div className="rounded-[2rem] border border-[#eadbc9] bg-[#fff7ec] p-7">
              <div className="flex gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-[#a52a16] shadow-sm">
                  <Phone className="h-4 w-4" />
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#a07863]">
                    संपर्क
                  </p>

                  <p className="mt-1 font-serif text-lg font-semibold text-[#47120f]">
                    उज्जैन, मध्य प्रदेश
                  </p>

                  <p className="mt-1 text-sm leading-6 text-[#806b61]">
                    उपलब्धता और माध्यम की जानकारी संपर्क के बाद साझा की जाएगी।
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </motion.div>
      </section>

      {/* Bottom CTA */}
      <section className="border-t border-[#eadbc9] bg-[#fff4e7]">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-12 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-12">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#b94716]">
              पूजा एवं अनुष्ठान
            </p>

            <h2 className="mt-2 font-serif text-2xl font-semibold text-[#47120f]">
              सीधे पूजा सेवा देखना चाहते हैं?
            </h2>
          </div>

          <Link
            href="/puja-services"
            className="group inline-flex items-center justify-center gap-2 rounded-xl border border-[#7a1717] bg-[#7a1717] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#651111]"
          >
            सभी पूजा सेवाएँ
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>
    </main>
  );
}

