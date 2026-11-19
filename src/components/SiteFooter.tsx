import Link from "next/link";
import { siteConfig } from "@/lib/seo";

const quickLinks = [
  {
    label: "पूजा सेवाएँ",
    href: "/puja-services",
  },
  {
    label: "ऑनलाइन पूजा बुकिंग",
    href: "/online-puja",
  },
  {
    label: "पंडित जी के बारे में",
    href: "/about",
  },
  {
    label: "संपर्क करें",
    href: "/contact",
  },
];

export default function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-[#4B2413] text-[#FFF8EC]">
      {/* Decorative background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-32 -top-32 h-80 w-80 rounded-full bg-[#C69A42]/8 blur-3xl" />
        <div className="absolute -bottom-40 left-1/4 h-96 w-96 rounded-full bg-[#7A1717]/20 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        {/* Main footer */}
        <div className="grid gap-12 py-16 sm:py-20 lg:grid-cols-[1.4fr_0.8fr_0.8fr] lg:gap-20">
          {/* Brand */}
          <section aria-labelledby="footer-brand">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#C69A42]/50 bg-[#FFF8EC]/5">
                <span className="font-serif text-2xl text-[#C69A42]">ॐ</span>
              </div>

              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#D9B56A]">
                  वैदिक परंपरा
                </p>

                <h2
                  id="footer-brand"
                  className="mt-1 text-xl font-semibold tracking-tight sm:text-2xl"
                >
                  {siteConfig.hindiName}
                </h2>
              </div>
            </div>

            <p className="mt-7 max-w-md text-[15px] leading-7 text-[#F5DEC3]/75">
              उज्जैन की पावन भूमि से वैदिक पूजा, अनुष्ठान और पारंपरिक
              ज्योतिषीय मार्गदर्शन — श्रद्धा, विधि-विधान और संकल्प के साथ।
            </p>

            {/* Gold line */}
            <div className="mt-8 flex items-center gap-3">
              <span className="h-px w-16 bg-[#C69A42]" />
              <span className="text-[10px] tracking-[0.25em] text-[#C69A42]">
                श्रद्धा • संकल्प • साधना
              </span>
            </div>
          </section>

          {/* Contact */}
          <section aria-labelledby="footer-contact">
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#D9B56A]">
              संपर्क
            </p>

            <h2
              id="footer-contact"
              className="mt-3 text-lg font-semibold text-[#FFF8EC]"
            >
              सीधे जुड़ें
            </h2>

            <address className="mt-5 not-italic text-sm leading-7 text-[#F5DEC3]/75">
              <p>Char Dham Mandir, Jaysignh Nagar, Ujjain, Madhya Pradesh, India</p>

              <a
                className="mt-2 block w-fit transition-colors duration-200 hover:text-[#D9B56A]"
                href={`tel:${siteConfig.phone}`}
              >
                {siteConfig.phoneDisplay}
              </a>

              <a
                className="mt-1 block max-w-full break-all transition-colors duration-200 hover:text-[#D9B56A]"
                href={`mailto:${siteConfig.email}`}
              >
                {siteConfig.email}
              </a>

              <a
                className="mt-3 inline-flex items-center gap-2 text-[#FFF8EC] transition-colors duration-200 hover:text-[#D9B56A]"
                href={siteConfig.instagram}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>Instagram</span>
                <span className="text-[#C69A42]">↗</span>
              </a>
            </address>
          </section>

          {/* Navigation */}
          <nav aria-label="फुटर नेविगेशन">
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#D9B56A]">
              नेविगेशन
            </p>

            <h2 className="mt-3 text-lg font-semibold text-[#FFF8EC]">
              त्वरित लिंक
            </h2>

            <ul className="mt-5 space-y-3">
              {quickLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="group inline-flex items-center gap-2 text-sm text-[#F5DEC3]/75 transition-all duration-200 hover:translate-x-1 hover:text-[#FFF8EC]"
                  >
                    <span>{item.label}</span>

                    <span className="translate-x-0 opacity-0 transition-all duration-200 group-hover:translate-x-1 group-hover:opacity-100">
                      →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Divider */}
        <div className="h-px bg-[#D9B56A]/20" />

        {/* Bottom bar */}
        <div className="flex flex-col gap-5 py-6 text-xs text-[#F5DEC3]/55 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {siteConfig.hindiName}. सर्वाधिकार
            सुरक्षित।
          </p>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <Link
              href="/privacy"
              className="transition-colors hover:text-[#FFF8EC]"
            >
              गोपनीयता नीति
            </Link>

            <span className="h-1 w-1 rounded-full bg-[#C69A42]/60" />

            <Link
              href="/terms"
              className="transition-colors hover:text-[#FFF8EC]"
            >
              नियम एवं शर्तें
            </Link>

            <span className="h-1 w-1 rounded-full bg-[#C69A42]/60" />

            <Link
              href="/disclaimer"
              className="transition-colors hover:text-[#FFF8EC]"
            >
              अस्वीकरण
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
