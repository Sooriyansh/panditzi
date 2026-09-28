"use client";

import Link from "next/link";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { PanchangApiResponse, PanchangData } from "@/lib/panchang/types";

gsap.registerPlugin(ScrollTrigger);

const defaultQuery = "lat=23.1765&lon=75.7885";

const dateFormatter = new Intl.DateTimeFormat("hi-IN", {
  day: "numeric",
  month: "long",
  year: "numeric",
  weekday: "long",
});

function displayTime(value?: string) {
  if (!value) return "जानकारी उपलब्ध नहीं";

  const date = new Date(value);

  return Number.isNaN(date.getTime())
    ? value
    : new Intl.DateTimeFormat("hi-IN", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      }).format(date);
}

function Detail({
  label,
  value,
  index,
}: {
  label: string;
  value?: string;
  index: number;
}) {
  return (
    <div
      data-panchang-detail
      className="group relative overflow-hidden rounded-2xl border border-[#ead8b8] bg-[#fffdf9] px-4 py-4 transition-all duration-300 hover:-translate-y-1 hover:border-[#d6b26c] hover:shadow-[0_12px_28px_rgba(91,48,15,0.08)]"
    >
      {/* Number */}
      <span className="absolute right-3 top-3 text-[9px] font-bold tracking-[0.18em] text-[#c69a42]/50">
        {String(index + 1).padStart(2, "0")}
      </span>

      {/* Accent */}
      <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-[#c69a42] transition-all duration-300 group-hover:w-full" />

      <dt className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#a06a3b]">
        {label}
      </dt>

      <dd className="mt-2 pr-5 text-[15px] font-semibold leading-6 text-[#51230f]">
        {value ?? "जानकारी उपलब्ध नहीं"}
      </dd>
    </div>
  );
}

function PanchangSymbol() {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      aria-hidden="true"
      className="h-10 w-10"
    >
      <circle cx="24" cy="24" r="17" />
      <circle cx="24" cy="24" r="11" />
      <path d="M24 7v6M24 35v6M7 24h6M35 24h6" />
      <path d="M24 17v7l4 4" />
    </svg>
  );
}

export default function HomePanchang() {
  const [data, setData] = useState<PanchangData>();
  const [failed, setFailed] = useState(false);
  const [today, setToday] = useState("");

  const sectionRef = useRef<HTMLElement | null>(null);
  const shellRef = useRef<HTMLDivElement | null>(null);
  const introRef = useRef<HTMLDivElement | null>(null);
  const detailsRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    const todayStr = new Date().toISOString().slice(0, 10);
    setToday(todayStr);

    const controller = new AbortController();

    void fetch(
      `/api/panchang?view=details&date=${todayStr}&${defaultQuery}`,
      {
        signal: controller.signal,
      },
    )
      .then(async (response) => {
        if (!response.ok) {
          throw new Error("Panchang request failed");
        }

        const body = (await response.json()) as PanchangApiResponse;

        if (!body.details) {
          throw new Error("Panchang data missing");
        }

        setData(body.details);
      })
      .catch((error: unknown) => {
        if ((error as Error).name !== "AbortError") {
          setFailed(true);
        }
      });

    return () => controller.abort();
  }, []);

  /*
   * GSAP entrance animation
   */
  useLayoutEffect(() => {
    const section = sectionRef.current;
    const shell = shellRef.current;
    const intro = introRef.current;
    const details = detailsRef.current;
    const button = buttonRef.current;

    if (!section || !shell || !intro || !details || !button) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        shell,
        {
          opacity: 0,
          y: 45,
          scale: 0.985,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 82%",
            once: true,
          },
        },
      );

      gsap.fromTo(
        intro.children,
        {
          opacity: 0,
          y: 22,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          stagger: 0.1,
          delay: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 78%",
            once: true,
          },
        },
      );

      gsap.fromTo(
        details,
        {
          opacity: 0,
          x: 30,
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          delay: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 78%",
            once: true,
          },
        },
      );

      gsap.fromTo(
        button,
        {
          opacity: 0,
          y: 12,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.55,
          delay: 0.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 78%",
            once: true,
          },
        },
      );

      const enter = () => {
        gsap.to(button, {
          y: -3,
          duration: 0.3,
          ease: "power2.out",
        });
      };

      const leave = () => {
        gsap.to(button, {
          y: 0,
          duration: 0.35,
          ease: "power3.out",
        });
      };

      button.addEventListener("mouseenter", enter);
      button.addEventListener("mouseleave", leave);

      return () => {
        button.removeEventListener("mouseenter", enter);
        button.removeEventListener("mouseleave", leave);
      };
    }, section);

    return () => ctx.revert();
  }, []);

  /*
   * Animate detail cards whenever API data arrives
   */
  useLayoutEffect(() => {
    if (!detailsRef.current || !data) return;

    const cards = detailsRef.current.querySelectorAll(
      "[data-panchang-detail]",
    );

    gsap.fromTo(
      cards,
      {
        opacity: 0,
        y: 15,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.07,
        ease: "power2.out",
      },
    );
  }, [data]);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="home-panchang-title"
      className="relative overflow-hidden bg-[#fff4df] px-5 py-20 sm:px-8 sm:py-28 lg:px-12"
    >
      {/* Background atmosphere */}
      <div className="pointer-events-none absolute -left-40 top-20 h-[420px] w-[420px] rounded-full bg-[#c69a42]/[0.05] blur-3xl" />

      <div className="pointer-events-none absolute -right-32 bottom-0 h-[420px] w-[420px] rounded-full bg-[#8b3516]/[0.035] blur-3xl" />

      <div
        ref={shellRef}
        className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-[#dfc59a] bg-[#fffdf9] shadow-[0_24px_70px_rgba(91,48,15,0.11)]"
      >
        {/* Top accent */}
        <div className="h-1 w-full bg-gradient-to-r from-[#8b3516] via-[#c69a42] to-[#8b3516]" />

        <div className="grid lg:grid-cols-[0.78fr_1.22fr]">
          {/* =====================================================
              LEFT / INTRO
          ====================================================== */}
          <div
            ref={introRef}
            className="relative flex flex-col justify-center border-b border-[#ead9bc] px-6 py-9 sm:px-9 sm:py-11 lg:border-b-0 lg:border-r lg:px-11 lg:py-12"
          >
            {/* Small identity */}
            <div className="flex items-center gap-3">
              <span className="grid h-12 w-12 place-items-center rounded-2xl border border-[#ddc17d] bg-[#fff5da] text-[#9a5a24]">
                <PanchangSymbol />
              </span>

              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#a85e25]">
                  दैनिक वैदिक जानकारी
                </p>

                <p className="mt-0.5 text-xs font-semibold text-[#7a4b29]">
                  उज्जैन, मध्य प्रदेश
                </p>
              </div>
            </div>

            {/* Heading */}
            <h2
              id="home-panchang-title"
              className="mt-7 text-3xl font-semibold tracking-[-0.03em] text-[#51230f] sm:text-4xl lg:text-[3rem] lg:leading-[1.08]"
            >
              आज का
              <br />
              <span className="text-[#8b3516]">पंचांग</span>
            </h2>

            {/* Date */}
            <div className="mt-6 inline-flex w-fit items-center rounded-full border border-[#e5d1ad] bg-[#fff8e9] px-4 py-2">
              <span className="mr-2 h-1.5 w-1.5 rounded-full bg-[#b67a25]" />

              <p className="text-xs font-semibold text-[#70401f] sm:text-sm">
                {today ? dateFormatter.format(new Date(`${today}T12:00:00`)) : "\u00A0"}
              </p>
            </div>

            <p className="mt-6 max-w-md text-[15px] leading-7 text-[#75441f]">
              तिथि, नक्षत्र, योग, सूर्योदय, सूर्यास्त और राहु काल जैसी दैनिक
              वैदिक जानकारी उज्जैन के लिए देखें।
            </p>

            {/* CTA */}
            <Link
              ref={buttonRef}
              href="/panchang"
              className="group mt-7 inline-flex min-h-12 w-fit items-center gap-3 rounded-xl bg-[#8b3516] px-5 py-3 text-sm font-bold text-white shadow-[0_9px_22px_rgba(110,45,16,0.2)] transition-colors duration-300 hover:bg-[#a9481e] focus:outline-none focus:ring-2 focus:ring-[#b56a28] focus:ring-offset-2"
            >
              <span>पूरा पंचांग देखें</span>

              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>

            {/* Bottom detail */}
            <div className="mt-9 flex items-center gap-3 text-xs text-[#967053]">
              <span className="h-px w-8 bg-[#c69a42]" />

              <span>उज्जैन की दैनिक वैदिक गणना</span>
            </div>
          </div>

          {/* =====================================================
              RIGHT / DATA
          ====================================================== */}
          <div
            ref={detailsRef}
            className="relative p-6 sm:p-9 lg:p-11"
          >
            {/* Heading */}
            <div className="mb-6 flex items-end justify-between gap-4">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#a85e25]">
                  आज की जानकारी
                </p>

                <h3 className="mt-1.5 text-xl font-semibold text-[#51230f]">
                  पंचांग विवरण
                </h3>
              </div>

              <span className="hidden text-xs text-[#a07857] sm:block">
                उज्जैन
              </span>
            </div>

            {/* Loading */}
            {!data && !failed && (
              <div
                aria-label="पंचांग की जानकारी लोड हो रही है"
                className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3"
              >
                {Array.from({ length: 6 }, (_, index) => (
                  <div
                    key={index}
                    className="relative h-[82px] overflow-hidden rounded-2xl border border-[#eadcc4] bg-[#fffaf0]"
                  >
                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.6s_infinite] bg-gradient-to-r from-transparent via-white/70 to-transparent" />

                    <div className="p-4">
                      <div className="h-2.5 w-16 rounded bg-[#eadcc4]" />
                      <div className="mt-4 h-3 w-28 rounded bg-[#eadcc4]" />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Error */}
            {failed && (
              <div className="rounded-2xl border border-[#e8cfb7] bg-[#fff8ed] p-6">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#f7e8d2] text-[#9b5122]">
                  !
                </div>

                <p className="mt-4 font-semibold text-[#6b3215]">
                  पंचांग की जानकारी अभी उपलब्ध नहीं है।
                </p>

                <p className="mt-2 max-w-md text-sm leading-6 text-[#70401f]">
                  पूर्ण विवरण के लिए कुछ देर बाद पुनः प्रयास करें।
                </p>

                <Link
                  href="/panchang"
                  className="mt-5 inline-flex text-sm font-bold text-[#8b3516] underline underline-offset-4"
                >
                  पंचांग पेज खोलें →
                </Link>
              </div>
            )}

            {/* Data */}
            {data && (
              <dl className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                <Detail
                  index={0}
                  label="तिथि"
                  value={data.tithi?.name}
                />

                <Detail
                  index={1}
                  label="नक्षत्र"
                  value={data.nakshatra?.name}
                />

                <Detail
                  index={2}
                  label="योग"
                  value={data.yoga?.name}
                />

                <Detail
                  index={3}
                  label="सूर्योदय"
                  value={displayTime(data.sunrise)}
                />

                <Detail
                  index={4}
                  label="सूर्यास्त"
                  value={displayTime(data.sunset)}
                />

                <Detail
                  index={5}
                  label="राहु काल"
                  value={
                    data.dayPeriods.rahuKaal
                      ? `${displayTime(
                          data.dayPeriods.rahuKaal.start,
                        )} – ${displayTime(
                          data.dayPeriods.rahuKaal.end,
                        )}`
                      : undefined
                  }
                />
              </dl>
            )}

            {/* Bottom decorative line */}
            <div className="mt-7 flex items-center gap-3">
              <span className="h-px flex-1 bg-[#e8d8bc]" />
              <span className="text-xs text-[#c69a42]">✦</span>
              <span className="h-px flex-1 bg-[#e8d8bc]" />
            </div>
          </div>
        </div>
      </div>

      {/* Shimmer keyframe */}
      <style jsx>{`
        @keyframes shimmer {
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </section>
  );
}