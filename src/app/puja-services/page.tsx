import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { pujaServicePath, pujaServices } from "@/data/puja-services";
import { generatePageMetadata } from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata({
  title: "पूजा एवं अनुष्ठान | उज्जैन",
  description:
    "उज्जैन से पारंपरिक पूजा, अनुष्ठान और ज्योतिषीय मार्गदर्शन की सेवाएँ, सामान्य प्रक्रिया तथा बुकिंग की जानकारी देखें।",
  path: "/puja-services",
  image: "/images/services/shiv-puja.png",
});

export default function PujaServicesPage() {
  return (
    <div className="min-h-screen bg-[#fff9f0] text-[#24150e]">

      {/* ===================================================== */}
      {/* HERO */}
      {/* ===================================================== */}

      <section className="relative overflow-hidden bg-[#35170d] px-5 py-24 text-[#fff9ec] sm:px-8 sm:py-28 lg:px-12 lg:py-36">

        {/* Decorative background */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#c69a42]/10 blur-[120px]"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "radial-gradient(circle at center, #e8c46c 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        <div className="relative mx-auto max-w-5xl text-center">

          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-[#c69a42]" />

            <span className="text-[10px] font-medium tracking-[0.2em] text-[#e8c46c]">
              उज्जैन • वैदिक परंपरा
            </span>

            <span className="h-px w-10 bg-[#c69a42]" />
          </div>

          <div className="mx-auto mt-8 flex h-16 w-16 items-center justify-center rounded-full border border-[#e8c46c]/30 bg-white/[0.04] text-3xl text-[#e8c46c]">
            ॐ
          </div>

          <h1 className="mt-8 font-serif text-5xl font-semibold tracking-[-0.04em] sm:text-6xl lg:text-7xl">
            पूजा एवं
            <span className="text-[#e8c46c]"> अनुष्ठान</span>
          </h1>

          <p className="mx-auto mt-7 max-w-2xl text-sm leading-7 text-[#fff9ec]/65 sm:text-base sm:leading-8">
            उज्जैन की पावन भूमि से पारंपरिक पूजा, वैदिक अनुष्ठान और
            दोष निवारण से जुड़ी सेवाओं की विस्तृत जानकारी।
          </p>

          <div className="mt-10 flex items-center justify-center gap-3 text-[10px] tracking-[0.16em] text-[#fff9ec]/40">
            <span>पूजा</span>
            <span className="h-1 w-1 rounded-full bg-[#c69a42]" />
            <span>अनुष्ठान</span>
            <span className="h-1 w-1 rounded-full bg-[#c69a42]" />
            <span>संकल्प</span>
          </div>
        </div>
      </section>

      {/* ===================================================== */}
      {/* SERVICES */}
      {/* ===================================================== */}

      <main className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-32">

        {/* Section heading */}

        <div className="mb-14 flex flex-col gap-8 lg:mb-20 lg:flex-row lg:items-end lg:justify-between">

          <div>
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-[#c69a42]" />

              <span className="text-[10px] font-semibold tracking-[0.2em] text-[#9b681f]">
                ०१ / पूजा सेवाएँ
              </span>
            </div>

            <h2 className="mt-6 max-w-3xl font-serif text-4xl font-semibold leading-[1.05] tracking-[-0.03em] text-[#2a160d] sm:text-5xl lg:text-6xl">
              आपकी आवश्यकता के अनुसार
              <br />
              <span className="text-[#8b3516]">
                वैदिक अनुष्ठान।
              </span>
            </h2>
          </div>

          <p className="max-w-md text-sm leading-7 text-[#704f3c] sm:text-base">
            प्रत्येक पूजा अपनी अलग विधि, संकल्प और उद्देश्य रखती है।
            संबंधित पूजा की जानकारी पढ़ने के लिए सेवा चुनें।
          </p>
        </div>

        {/* ================================================= */}
        {/* INFORMATION CARDS */}
        {/* ================================================= */}

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">

          {pujaServices.map((service, index) => (
            <Link
              key={service.id}
              href={pujaServicePath(service)}
              className="
                group
                relative
                flex
                min-h-[390px]
                flex-col
                overflow-hidden
                rounded-[30px]
                border
                border-[#ead6b9]
                bg-[#fffdf9]
                p-7
                shadow-[0_12px_40px_rgba(94,52,18,0.06)]
                transition-all
                duration-500
                hover:-translate-y-2
                hover:border-[#c69a42]/60
                hover:bg-[#fffaf1]
                hover:shadow-[0_25px_65px_rgba(94,52,18,0.13)]
                focus:outline-none
                focus:ring-2
                focus:ring-[#a35420]
                focus:ring-offset-2
                sm:p-8
              "
            >

              {/* Top row */}

              <div className="flex items-start justify-between">

                <span className="font-mono text-xs tracking-[0.18em] text-[#a58268]">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div
                  className="
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-[#ead6b9]
                    bg-[#fff8eb]
                    text-2xl
                    transition-all
                    duration-500
                    group-hover:border-[#c69a42]
                    group-hover:bg-[#e8c46c]
                    group-hover:scale-105
                  "
                >
                  {service.icon}
                </div>
              </div>

              {/* Small label */}

              <div className="mt-10">

                <span className="text-[10px] font-semibold tracking-[0.2em] text-[#a06b24]">
                  वैदिक सेवा
                </span>

                {/* BIG TITLE */}

                <h3
                  className="
                    mt-4
                    font-serif
                    text-3xl
                    font-semibold
                    leading-[1.08]
                    tracking-[-0.035em]
                    text-[#32170d]
                    transition-colors
                    duration-300
                    group-hover:text-[#8b3516]
                    sm:text-4xl
                  "
                >
                  {service.title}
                </h3>

              </div>

              {/* Divider */}

              <div className="mt-7 h-px w-full bg-[#eadbc8] transition-colors duration-500 group-hover:bg-[#c69a42]/40" />

              {/* Information */}

              <div className="mt-6 flex-1">

                <p className="text-base font-medium leading-8 text-[#70401f] sm:text-[17px]">
                  {service.subtitle}
                </p>

              </div>

              {/* Bottom */}

              <div className="mt-8 flex items-center justify-between">

                <span className="text-[10px] font-semibold tracking-[0.16em] text-[#a58a76]">
                  पूजा की जानकारी
                </span>

                <span
                  className="
                    flex
                    h-11
                    w-11
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-[#ead6b9]
                    text-[#8b3516]
                    transition-all
                    duration-500
                    group-hover:border-[#e8c46c]
                    group-hover:bg-[#e8c46c]
                    group-hover:text-[#35170d]
                  "
                >
                  <ArrowUpRight
                    size={17}
                    strokeWidth={1.5}
                    className="
                      transition-transform
                      duration-300
                      group-hover:-translate-y-0.5
                      group-hover:translate-x-0.5
                    "
                  />
                </span>

              </div>

            </Link>
          ))}

        </div>

        {/* ================================================= */}
        {/* BOTTOM CTA */}
        {/* ================================================= */}

        <section className="relative mt-24 overflow-hidden rounded-[32px] bg-[#35170d] px-6 py-14 text-center text-[#fff9ec] sm:px-10 sm:py-16 lg:mt-32">

          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              -left-20
              top-1/2
              h-64
              w-64
              -translate-y-1/2
              rounded-full
              bg-[#c69a42]/10
              blur-3xl
            "
          />

          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              -right-20
              top-1/2
              h-64
              w-64
              -translate-y-1/2
              rounded-full
              bg-[#7a1717]/30
              blur-3xl
            "
          />

          <div className="relative mx-auto max-w-2xl">

            <span className="text-3xl text-[#e8c46c]">
              ॐ
            </span>

            <h2 className="mt-5 font-serif text-3xl font-semibold sm:text-4xl">
              अपनी पूजा के लिए
              <span className="text-[#e8c46c]">
                {" "}मार्गदर्शन लें।
              </span>
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-white/55 sm:text-base">
              अपनी आवश्यकता के अनुसार पूजा या अनुष्ठान के बारे में
              जानकारी प्राप्त करें और आगे की प्रक्रिया समझें।
            </p>

            <Link
              href="/book-consultation"
              className="
                group
                mt-8
                inline-flex
                items-center
                gap-3
                rounded-full
                bg-[#e8c46c]
                px-6
                py-3.5
                text-sm
                font-semibold
                text-[#35170d]
                transition-all
                duration-300
                hover:bg-[#fff1c7]
                hover:shadow-[0_15px_40px_rgba(232,196,108,0.18)]
              "
            >
              परामर्श बुक करें

              <ArrowUpRight
                size={16}
                strokeWidth={1.5}
                className="
                  transition-transform
                  duration-300
                  group-hover:-translate-y-0.5
                  group-hover:translate-x-0.5
                "
              />
            </Link>

          </div>
        </section>

        {/* Bottom detail */}

        <div className="mt-10 flex items-center justify-center gap-3 text-[9px] font-medium tracking-[0.18em] text-[#9a806e]">
          <span className="h-px w-8 bg-[#c69a42]/40" />
          <span>श्रद्धा • संकल्प • साधना</span>
          <span className="h-px w-8 bg-[#c69a42]/40" />
        </div>

      </main>
    </div>
  );
}