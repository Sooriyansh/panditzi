"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { getPujaService, pujaServicePath, type PujaService } from "@/data/puja-services";

function Reveal({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const element = ref.current;
    if (!element || !window.IntersectionObserver) {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.08 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={`${className} motion-reduce:translate-y-0 motion-reduce:opacity-100 ${visible ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"} transition-[transform,opacity] duration-700`}
    >
      {children}
    </div>
  );
}

const headingClass =
  "text-3xl font-bold tracking-tight text-[#51230f] sm:text-4xl";

export default function PujaServicePage({ service }: { service: PujaService }) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const related = service.related
    .map(getPujaService)
    .filter((item): item is PujaService => Boolean(item));
  return (
    <div className="overflow-hidden bg-[#fff9f0] pb-16 lg:pb-24">
      <section className="relative isolate overflow-hidden bg-[#4b2413] px-5 pb-16 pt-10 text-[#fff9ec] sm:px-8 sm:pb-20 sm:pt-14 lg:px-12 lg:pb-24 lg:pt-20">
        <Image
          src={service.image}
          alt=""
          fill
          priority
          sizes="100vw"
          className="-z-20 object-cover opacity-25"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(53,23,11,0.96),rgba(71,29,12,0.88),rgba(75,36,19,0.75))]"
        />
        <div className="mx-auto max-w-7xl">
          <nav
            aria-label="ब्रेडक्रंब"
            className="flex flex-wrap gap-2 text-sm text-amber-100/85"
          >
            <Link href="/" className="hover:text-white">
              होम
            </Link>
            <span aria-hidden="true">›</span>
            <Link href="/puja-services" className="hover:text-white">
              पूजा सेवाएँ
            </Link>
            <span aria-hidden="true">›</span>
            <span aria-current="page">{service.title}</span>
          </nav>
          <div className="mt-10 max-w-3xl">
            <span className="inline-grid h-14 w-14 place-items-center rounded-2xl border border-amber-100/30 bg-white/10 text-2xl backdrop-blur">
              {service.icon}
            </span>
            <p className="mt-6 inline-flex rounded-full border border-amber-100/30 bg-amber-100/10 px-3 py-1.5 text-sm font-semibold text-amber-100">
              उज्जैन, मध्य प्रदेश
            </p>
            <h1 className="mt-4 text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
              {service.title}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-amber-50/90">
              {service.subtitle}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href={`/online-puja?puja=${service.id}`}
                className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[#e2a142] px-6 font-bold text-[#4d230e] transition hover:bg-[#f3c36d] focus:outline-none focus:ring-2 focus:ring-amber-100 focus:ring-offset-2 focus:ring-offset-[#4b2413]"
              >
                पूजा बुक करें
              </Link>
              <Link
                href="/book-consultation"
                className="inline-flex min-h-12 items-center justify-center rounded-xl border border-amber-100/50 bg-white/10 px-6 font-bold text-white transition hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-amber-100 focus:ring-offset-2 focus:ring-offset-[#4b2413]"
              >
                परामर्श प्राप्त करें
              </Link>
            </div>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <Reveal className="grid gap-10 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-start lg:py-24">
          <section>
            <p className="text-sm font-bold tracking-[0.14em] text-[#a85e25]">
              परंपरा और संदर्भ
            </p>
            <h2 className={`mt-3 ${headingClass}`}>पूजा के बारे में</h2>
            <p className="mt-6 text-lg leading-8 text-[#70401f]">
              {service.overview}
            </p>
            <p className="mt-4 leading-8 text-[#70401f]">{service.context}</p>
          </section>
          <aside className="rounded-3xl border border-[#ead6b9] bg-[#fffdf9] p-6 shadow-[0_14px_36px_rgba(94,52,18,0.09)] sm:p-8">
            <h2 className="text-xl font-bold text-[#51230f]">
              पूजा क्यों की जाती है?
            </h2>
            <ul className="mt-5 grid gap-4">
              {service.reasons.map((reason) => (
                <li
                  key={reason}
                  className="flex gap-3 leading-7 text-[#70401f]"
                >
                  <span className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#f6e1ba] text-xs text-[#8b3516]">
                    ✓
                  </span>
                  {reason}
                </li>
              ))}
            </ul>
          </aside>
        </Reveal>

        <Reveal className="border-y border-[#eadbc7] py-16 lg:py-20">
          <p className="text-sm font-bold tracking-[0.14em] text-[#a85e25]">
            संकल्प के अनुसार
          </p>
          <h2 className={`mt-3 ${headingClass}`}>पूजा के उद्देश्य</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {service.objectives.map((objective, index) => (
              <article
                key={objective}
                className="rounded-2xl border border-[#ecd8b6] bg-[#fffdf9] p-5 shadow-sm"
              >
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#fff0ce] text-sm font-bold text-[#a35420]">
                  ०{index + 1}
                </span>
                <h3 className="mt-4 font-bold leading-6 text-[#603014]">
                  {objective}
                </h3>
              </article>
            ))}
          </div>
        </Reveal>

        <Reveal className="grid gap-10 py-16 lg:grid-cols-2 lg:py-24">
          <section>
            <p className="text-sm font-bold tracking-[0.14em] text-[#a85e25]">
              पारंपरिक विधि
            </p>
            <h2 className={`mt-3 ${headingClass}`}>
              पूजा में शामिल गतिविधियाँ
            </h2>
            <ol className="mt-8 border-l-2 border-[#e4bb79] pl-6">
              {service.activities.map((activity, index) => (
                <li key={activity} className="relative pb-7 last:pb-0">
                  <span className="absolute -left-[2.17rem] grid h-7 w-7 place-items-center rounded-full bg-[#8b3516] text-sm font-bold text-white">
                    {index + 1}
                  </span>
                  <h3 className="font-bold text-[#603014]">{activity}</h3>
                  <p className="mt-1 leading-7 text-[#70401f]">
                    विधि, अवधि, सामग्री और संकल्प स्थान, परंपरा तथा व्यक्तिगत
                    आवश्यकता के अनुसार तय किए जाते हैं।
                  </p>
                </li>
              ))}
            </ol>
          </section>
          <section className="rounded-3xl bg-[#f8ead2] p-7 sm:p-9">
            <h2 className="text-2xl font-bold text-[#51230f]">
              यह पूजा किसके लिए हो सकती है?
            </h2>
            <p className="mt-5 leading-8 text-[#70401f]">{service.audience}</p>
            <h3 className="mt-7 text-lg font-bold text-[#603014]">
              आवश्यक जानकारी
            </h3>
            <ul className="mt-4 grid gap-3">
              {service.information.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 text-sm leading-6 text-[#70401f]"
                >
                  <span aria-hidden="true" className="text-[#a35420]">
                    ✦
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </section>
        </Reveal>

        <Reveal className="rounded-3xl bg-[#643018] px-6 py-10 text-[#fff8e9] sm:px-10 sm:py-12">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-sm font-bold tracking-[0.14em] text-amber-200">
                बुकिंग एवं उपलब्धता
              </p>
              <h2 className="mt-3 text-3xl font-bold">
                उज्जैन से पूजा अनुरोध भेजें
              </h2>
              <p className="mt-4 max-w-2xl leading-8 text-amber-50/90">
                अपनी पसंदीदा तिथि, स्थान और आवश्यकता साझा करें। पूजा की उपलब्धता
                तथा उचित प्रक्रिया की पुष्टि संपर्क के बाद की जाएगी।
              </p>
            </div>
            <Link
              href={`/online-puja?puja=${service.id}`}
              className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[#f3c66f] px-6 font-bold text-[#52220d] transition hover:bg-[#ffe0a0] focus:outline-none focus:ring-2 focus:ring-amber-100 focus:ring-offset-2 focus:ring-offset-[#643018]"
            >
              पूजा बुक करें
            </Link>
          </div>
        </Reveal>

        <Reveal className="py-16 lg:py-24">
          <div className="max-w-3xl">
            <p className="text-sm font-bold tracking-[0.14em] text-[#a85e25]">
              सामान्य प्रश्न
            </p>
            <h2 className={`mt-3 ${headingClass}`}>
              अक्सर पूछे जाने वाले प्रश्न
            </h2>
          </div>
          <div className="mt-8 grid gap-3">
            {service.faqs.map((faq, index) => (
              <div
                key={faq.question}
                className="rounded-2xl border border-[#ead6b9] bg-[#fffdf9]"
              >
                <h3>
                  <button
                    type="button"
                    onClick={() =>
                      setOpenFaq((current) =>
                        current === index ? null : index,
                      )
                    }
                    aria-expanded={openFaq === index}
                    className="flex min-h-14 w-full items-center justify-between gap-4 px-5 py-4 text-left font-bold text-[#542710] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#a35420]"
                  >
                    <span>{faq.question}</span>
                    <span aria-hidden="true" className="text-xl">
                      {openFaq === index ? "−" : "+"}
                    </span>
                  </button>
                </h3>
                {openFaq === index && (
                  <div className="border-t border-[#efdfc7] px-5 py-4 leading-7 text-[#70401f]">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal className="border-t border-[#eadbc7] py-16 lg:py-20">
          <p className="text-sm font-bold tracking-[0.14em] text-[#a85e25]">
            अन्य सेवाएँ
          </p>
          <h2 className={`mt-3 ${headingClass}`}>संबंधित पूजा सेवाएँ</h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => (
              <Link
                key={item.id}
                href={pujaServicePath(item)}
                className="group rounded-2xl border border-[#ead6b9] bg-[#fffdf9] p-6 shadow-sm transition hover:-translate-y-1 hover:border-[#d6a55d] hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#a35420]"
              >
                <span className="text-2xl">{item.icon}</span>
                <h3 className="mt-4 text-lg font-bold text-[#51230f]">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-[#70401f]">
                  {item.subtitle}
                </p>
                <span className="mt-5 inline-block text-sm font-bold text-[#8b3516]">
                  विवरण देखें →
                </span>
              </Link>
            ))}
          </div>
        </Reveal>
      </main>
      <section className="bg-[#f6e1ba] px-5 py-14 text-center sm:px-8">
        <h2 className="text-3xl font-bold text-[#51230f]">
          अपनी आवश्यकता के अनुसार पूजा एवं ज्योतिषीय मार्गदर्शन के लिए संपर्क
          करें।
        </h2>
        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href={`/online-puja?puja=${service.id}`}
            className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[#8b3516] px-6 font-bold text-white hover:bg-[#72260d]"
          >
            पूजा बुक करें
          </Link>
          <Link
            href="/book-consultation"
            className="inline-flex min-h-12 items-center justify-center rounded-xl border border-[#9a5628] px-6 font-bold text-[#673016] hover:bg-[#ffeecb]"
          >
            परामर्श बुक करें
          </Link>
        </div>
      </section>
    </div>
  );
}
