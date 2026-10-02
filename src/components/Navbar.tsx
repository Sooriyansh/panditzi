"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { signOut, useSession } from "next-auth/react";

import {
  mainNavigation,
  mobilePrimaryNavigation,
  pujaServices,
  pujaServicesOverview,
  type NavigationItem,
} from "@/components/navigation";

type IconName = NavigationItem["icon"];

type Language = "hi" | "en";

function Icon({
  name,
  className = "",
}: {
  name: IconName;
  className?: string;
}) {
  const common = {
    className,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    "aria-hidden": true,
  };

  if (name === "home") {
    return (
      <svg {...common}>
        <path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1V10Z" />
      </svg>
    );
  }

  if (name === "chart") {
    return (
      <svg {...common}>
        <path d="M4 19V5m0 14h16M8 16l3-4 3 2 5-7" />
        <circle cx="8" cy="16" r="1" />
        <circle cx="11" cy="12" r="1" />
        <circle cx="14" cy="14" r="1" />
        <circle cx="19" cy="7" r="1" />
      </svg>
    );
  }

  if (name === "calendar") {
    return (
      <svg {...common}>
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M7 3v4m10-4v4M3 10h18m-5 4h.01m-4 0h.01m-4 0h.01m8 4h.01m-4 0h.01" />
      </svg>
    );
  }

  if (name === "user") {
    return (
      <svg {...common}>
        <circle cx="12" cy="8" r="3.5" />
        <path d="M4.5 21a7.5 7.5 0 0 1 15 0" />
      </svg>
    );
  }

  if (name === "phone") {
    return (
      <svg {...common}>
        <path d="M8 3H5.5A2.5 2.5 0 0 0 3 5.5C3 14.06 9.94 21 18.5 21a2.5 2.5 0 0 0 2.5-2.5V16l-4-1.2-1.2 2.2a13.7 13.7 0 0 1-8.8-8.8L8.2 6 8 3Z" />
      </svg>
    );
  }

  if (name === "clock") {
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3.5 2" />
      </svg>
    );
  }

  if (name === "book") {
    return (
      <svg {...common}>
        <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v17H6.5A2.5 2.5 0 0 0 4 22V5.5Zm0 0A2.5 2.5 0 0 1 6.5 8H20" />
      </svg>
    );
  }

  if (name === "menu") {
    return (
      <svg {...common}>
        <path d="M4 7h16M4 12h16M4 17h16" />
      </svg>
    );
  }

  return (
    <svg {...common}>
      <path d="M12 3 14 9l6 2-6 2-2 7-2-7-6-2 6-2 2-6Z" />
      <path d="m19 3 .7 2.3L22 6l-2.3.7L19 9l-.7-2.3L16 6l2.3-.7L19 3Z" />
    </svg>
  );
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className={`h-4 w-4 transition-transform duration-200 ${
        open ? "rotate-180" : ""
      }`}
      aria-hidden="true"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function isActive(pathname: string, href: string) {
  return href === "/"
    ? pathname === href
    : pathname === href || pathname.startsWith(`${href}/`);
}

const languageText = {
  hi: {
    consultation: "परामर्श बुक करें",
    account: "मेरा अकाउंट",
    logout: "लॉगआउट",
    login: "लॉगिन",
    signup: "साइन अप",
    puja: "पूजा सेवाएँ",
    more: "अधिक",
    menu: "मेनू",
    other: "अन्य विकल्प",
    specialPuja: "विशेष वैदिक अनुष्ठान",
    pujaTitle: "पूजा सेवाएँ",
    homeLabel: "होम",
    language: "भाषा",
  },

  en: {
    consultation: "Book Consultation",
    account: "My Account",
    logout: "Logout",
    login: "Login",
    signup: "Sign Up",
    puja: "Puja Services",
    more: "More",
    menu: "Menu",
    other: "Other Options",
    specialPuja: "Special Vedic Rituals",
    pujaTitle: "Puja Services",
    homeLabel: "Home",
    language: "Language",
  },
};

function LanguageSwitcher({
  language,
  onChange,
}: {
  language: Language;
  onChange: (language: Language) => void;
}) {
  return (
    <div
      className="
        flex
        items-center
        rounded-xl
        border
        border-[#ead8bc]
        bg-[#fffaf2]
        p-0.5
        shadow-sm
      "
      aria-label="भाषा बदलें"
    >
      <button
        type="button"
        onClick={() => onChange("hi")}
        aria-label="हिंदी चुनें"
        aria-pressed={language === "hi"}
        className={`
          rounded-[9px]
          px-2.5
          py-1.5
          text-[11px]
          font-semibold
          transition-all
          duration-200
          ${
            language === "hi"
              ? "bg-[#7e3214] text-white shadow-sm"
              : "text-[#70401f] hover:bg-amber-50"
          }
        `}
      >
        हिन्दी
      </button>

      <button
        type="button"
        onClick={() => onChange("en")}
        aria-label="English चुनें"
        aria-pressed={language === "en"}
        className={`
          rounded-[9px]
          px-2.5
          py-1.5
          text-[11px]
          font-semibold
          transition-all
          duration-200
          ${
            language === "en"
              ? "bg-[#7e3214] text-white shadow-sm"
              : "text-[#70401f] hover:bg-amber-50"
          }
        `}
      >
        English
      </button>
    </div>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const { data: session, status } = useSession();

  const [desktopPujaOpen, setDesktopPujaOpen] = useState(false);
  const [desktopMoreOpen, setDesktopMoreOpen] = useState(false);

  const [mobilePujaOpen, setMobilePujaOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [language, setLanguage] = useState<Language>("hi");

  const desktopPujaRef = useRef<HTMLDivElement>(null);
  const desktopMoreRef = useRef<HTMLDivElement>(null);

  const t = languageText[language];

  const pujaIsActive = isActive(pathname, "/puja-services");

  /*
   * ----------------------------------------------------------
   * LOAD SAVED LANGUAGE
   * ----------------------------------------------------------
   */

  useEffect(() => {
    try {
      const savedLanguage = localStorage.getItem(
        "panditiji-language",
      ) as Language | null;

      if (savedLanguage === "hi" || savedLanguage === "en") {
        setLanguage(savedLanguage);
      }
    } catch {
      // Ignore localStorage errors
    }
  }, []);

  /*
   * ----------------------------------------------------------
   * LANGUAGE CHANGE
   * ----------------------------------------------------------
   */

  const changeLanguage = (nextLanguage: Language) => {
    setLanguage(nextLanguage);

    try {
      localStorage.setItem("panditiji-language", nextLanguage);
      document.documentElement.lang =
        nextLanguage === "hi" ? "hi-IN" : "en-IN";

      window.dispatchEvent(
        new CustomEvent("panditiji-language-change", {
          detail: {
            language: nextLanguage,
          },
        }),
      );
    } catch {
      // Ignore storage/browser errors
    }
  };

  /*
   * ----------------------------------------------------------
   * CLOSE MOBILE PANELS
   * ----------------------------------------------------------
   */

  const closeMobilePanels = () => {
    setMobilePujaOpen(false);
    setMobileMenuOpen(false);
  };

  /*
   * ----------------------------------------------------------
   * OUTSIDE CLICK + ESCAPE
   * ----------------------------------------------------------
   */

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      if (
        desktopPujaRef.current &&
        !desktopPujaRef.current.contains(event.target as Node)
      ) {
        setDesktopPujaOpen(false);
      }

      if (
        desktopMoreRef.current &&
        !desktopMoreRef.current.contains(event.target as Node)
      ) {
        setDesktopMoreOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setDesktopPujaOpen(false);
        setDesktopMoreOpen(false);
        closeMobilePanels();
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <>
      {/* =====================================================
          DESKTOP NAVBAR
      ====================================================== */}

      <header className="fixed inset-x-0 top-4 z-40 hidden px-5 lg:block">
        <nav
          aria-label="मुख्य नेविगेशन"
          className="
            mx-auto
            flex
            h-[68px]
            max-w-[1320px]
            items-center
            gap-1
            rounded-2xl
            border
            border-amber-100/80
            bg-[#fffdf8]/90
            px-3
            shadow-[0_12px_40px_rgba(76,40,10,0.12)]
            backdrop-blur-xl
          "
        >
          {/* Logo */}

          <Link
            href="/"
            aria-label="सुमित शर्मा जी होम"
            className="
              mr-2
              flex
              shrink-0
              items-center
              gap-2
              rounded-xl
              px-2
              py-1
              text-[#592b10]
              transition-colors
              hover:bg-amber-50
            "
          >
            <span
              className="
                grid
                h-9
                w-9
                place-items-center
                rounded-full
                bg-gradient-to-br
                from-[#a84316]
                to-[#6c270f]
                text-lg
                text-amber-100
                shadow-sm
              "
            >
              ॐ
            </span>

            <span className="hidden leading-tight lg:block">
              <span className="block text-sm font-bold">
                सुमित शर्मा जी
              </span>

              <span className="block text-[10px] tracking-wide text-[#9c6a3d]">
                वैदिक सेवाएँ
              </span>
            </span>
          </Link>

          {/* Main Navigation */}

          <div className="flex min-w-0 flex-1 items-center justify-end gap-0.5">
            {mainNavigation.slice(0, 4).map((item) => (
              <DesktopLink
                key={item.href}
                item={item}
                pathname={pathname}
              />
            ))}

            {/* =================================================
                PUJA DROPDOWN
            ================================================== */}

            <div
              className="relative"
              ref={desktopPujaRef}
            >
              <button
                type="button"
                onClick={() =>
                  setDesktopPujaOpen((open) => !open)
                }
                aria-expanded={desktopPujaOpen}
                aria-haspopup="menu"
                className={`
                  flex
                  min-h-10
                  items-center
                  gap-1
                  rounded-xl
                  px-2.5
                  text-sm
                  font-medium
                  transition-colors
                  ${
                    pujaIsActive
                      ? "bg-[#7e3214] text-white"
                      : "text-[#673719] hover:bg-amber-50"
                  }
                `}
              >
                {t.puja}

                <Chevron open={desktopPujaOpen} />
              </button>

              {desktopPujaOpen && (
                <div
                  role="menu"
                  aria-label={t.puja}
                  className="
                    absolute
                    left-0
                    top-[calc(100%+12px)]
                    w-[340px]
                    rounded-2xl
                    border
                    border-amber-100
                    bg-[#fffdf9]
                    p-2
                    shadow-[0_16px_48px_rgba(76,40,10,0.18)]
                  "
                >
                  <p className="px-3 pb-2 pt-1 text-xs font-semibold tracking-wide text-[#a46c35]">
                    {t.specialPuja}
                  </p>

                  <div className="grid gap-1">
                    <ServiceLink
                      item={pujaServicesOverview}
                      pathname={pathname}
                      onClick={() =>
                        setDesktopPujaOpen(false)
                      }
                    />

                    {pujaServices.map((item) => (
                      <ServiceLink
                        key={item.href}
                        item={item}
                        pathname={pathname}
                        onClick={() =>
                          setDesktopPujaOpen(false)
                        }
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* =================================================
                MORE
            ================================================== */}

            <div
              className="relative"
              ref={desktopMoreRef}
            >
              <button
                type="button"
                onClick={() =>
                  setDesktopMoreOpen((open) => !open)
                }
                aria-expanded={desktopMoreOpen}
                aria-haspopup="menu"
                className="
                  flex
                  min-h-10
                  items-center
                  gap-1
                  rounded-xl
                  px-2.5
                  text-sm
                  font-medium
                  text-[#673719]
                  transition-colors
                  hover:bg-amber-50
                "
              >
                {t.more}

                <Chevron open={desktopMoreOpen} />
              </button>

              {desktopMoreOpen && (
                <div
                  role="menu"
                  aria-label={t.more}
                  className="
                    absolute
                    right-0
                    top-[calc(100%+12px)]
                    w-[260px]
                    rounded-2xl
                    border
                    border-amber-100
                    bg-[#fffdf9]
                    p-2
                    shadow-[0_16px_48px_rgba(76,40,10,0.18)]
                  "
                >
                  {mainNavigation.slice(4, 7).map((item) => (
                    <ServiceLink
                      key={item.href}
                      item={item}
                      pathname={pathname}
                      onClick={() =>
                        setDesktopMoreOpen(false)
                      }
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Consultation */}

            <Link
              href="/book-consultation"
              className={`
                ml-1
                rounded-xl
                px-3
                py-2
                text-sm
                font-semibold
                shadow-sm
                transition-transform
                hover:-translate-y-px
                ${
                  isActive(
                    pathname,
                    "/book-consultation",
                  )
                    ? "bg-[#5c260e] text-white"
                    : "bg-[#9b3d16] text-amber-50 hover:bg-[#812f10]"
                }
              `}
            >
              {t.consultation}
            </Link>

            {/* =================================================
                LANGUAGE SWITCHER
            ================================================== */}

            <div className="ml-1">
              <LanguageSwitcher
                language={language}
                onChange={changeLanguage}
              />
            </div>

            {/* =================================================
                AUTH
            ================================================== */}

            {status !== "loading" &&
              (session?.user ? (
                <div className="ml-1 flex items-center gap-1">
                  <Link
                    href="/account"
                    className="
                      rounded-xl
                      px-3
                      py-2
                      text-sm
                      font-semibold
                      text-[#673719]
                      hover:bg-amber-50
                    "
                  >
                    {t.account}
                  </Link>

                  <button
                    type="button"
                    onClick={() =>
                      void signOut({
                        callbackUrl: "/",
                      })
                    }
                    className="
                      rounded-xl
                      px-3
                      py-2
                      text-sm
                      font-semibold
                      text-[#673719]
                      hover:bg-amber-50
                    "
                  >
                    {t.logout}
                  </button>
                </div>
              ) : (
                <div className="ml-1 flex items-center gap-1">
                  <Link
                    href="/login"
                    className="
                      rounded-xl
                      px-3
                      py-2
                      text-sm
                      font-semibold
                      text-[#673719]
                      hover:bg-amber-50
                    "
                  >
                    {t.login}
                  </Link>

                  <Link
                    href="/signup"
                    className="
                      rounded-xl
                      border
                      border-[#d8b98b]
                      px-3
                      py-2
                      text-sm
                      font-semibold
                      text-[#673719]
                      hover:bg-amber-50
                    "
                  >
                    {t.signup}
                  </Link>
                </div>
              ))}
          </div>
        </nav>
      </header>

      {/* =====================================================
          MOBILE BOTTOM NAVIGATION
      ====================================================== */}

      <nav
        aria-label="मोबाइल नेविगेशन"
        className="
          fixed
          inset-x-0
          bottom-0
          z-50
          border-t
          border-amber-100
          bg-[#fffdf9]/95
          px-2
          pb-[max(0.55rem,env(safe-area-inset-bottom))]
          pt-2
          shadow-[0_-10px_32px_rgba(76,40,10,0.13)]
          backdrop-blur-xl
          lg:hidden
        "
      >
        <div className="mx-auto grid max-w-lg grid-cols-6 gap-1">
          {mobilePrimaryNavigation
            .slice(0, 4)
            .map((item) =>
              item.href === "/puja-services" ? (
                <button
                  key={item.href}
                  type="button"
                  onClick={() => {
                    setMobilePujaOpen((open) => !open);
                    setMobileMenuOpen(false);
                  }}
                  aria-expanded={mobilePujaOpen}
                  className={`
                    flex
                    min-h-12
                    flex-col
                    items-center
                    justify-center
                    gap-0.5
                    rounded-xl
                    px-1
                    text-[10px]
                    font-semibold
                    transition-colors
                    ${
                      pujaIsActive
                        ? "bg-[#7e3214] text-white"
                        : "text-[#70401f] hover:bg-amber-50"
                    }
                  `}
                >
                  <Icon
                    name={item.icon}
                    className="h-5 w-5"
                  />

                  <span className="truncate">
                    {language === "en"
                      ? getEnglishLabel(item.label)
                      : item.label}
                  </span>
                </button>
              ) : (
                <MobileLink
                  key={item.href}
                  item={item}
                  pathname={pathname}
                  onClick={closeMobilePanels}
                  language={language}
                />
              ),
            )}

          {/* Language */}

          <button
            type="button"
            onClick={() =>
              changeLanguage(
                language === "hi" ? "en" : "hi",
              )
            }
            aria-label={t.language}
            className="
              flex
              min-h-12
              flex-col
              items-center
              justify-center
              gap-0.5
              rounded-xl
              px-1
              text-[10px]
              font-semibold
              text-[#70401f]
              transition-colors
              hover:bg-amber-50
            "
          >
            <span
              className="
                flex
                h-5
                min-w-5
                items-center
                justify-center
                rounded-md
                border
                border-[#c69a42]/50
                text-[9px]
                font-bold
              "
            >
              {language === "hi" ? "EN" : "हिं"}
            </span>

            <span>
              {language === "hi"
                ? "English"
                : "हिंदी"}
            </span>
          </button>

          {/* Menu */}

          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen((open) => !open);
              setMobilePujaOpen(false);
            }}
            aria-expanded={mobileMenuOpen}
            className={`
              flex
              min-h-12
              flex-col
              items-center
              justify-center
              gap-0.5
              rounded-xl
              px-1
              text-[10px]
              font-semibold
              transition-colors
              ${
                mobileMenuOpen
                  ? "bg-[#7e3214] text-white"
                  : "text-[#70401f] hover:bg-amber-50"
              }
            `}
          >
            <Icon
              name="menu"
              className="h-5 w-5"
            />

            <span>{t.menu}</span>
          </button>
        </div>
      </nav>

      {/* =====================================================
          MOBILE PUJA PANEL
      ====================================================== */}

      {mobilePujaOpen && (
        <section
          aria-label={t.pujaTitle}
          className="
            fixed
            inset-x-3
            bottom-[80px]
            z-40
            rounded-2xl
            border
            border-amber-100
            bg-[#fffdf9]
            p-3
            shadow-[0_-12px_36px_rgba(76,40,10,0.16)]
            lg:hidden
          "
        >
          <div className="mb-2 flex items-center justify-between px-2">
            <p className="text-sm font-bold text-[#603014]">
              {t.pujaTitle}
            </p>

            <button
              type="button"
              onClick={() =>
                setMobilePujaOpen(false)
              }
              aria-label="पूजा सेवाएँ बंद करें"
              className="rounded-lg p-1 text-[#70401f]"
            >
              <Chevron open />
            </button>
          </div>

          <div className="grid max-h-[48vh] gap-1 overflow-y-auto">
            <ServiceLink
              item={pujaServicesOverview}
              pathname={pathname}
              onClick={closeMobilePanels}
              language={language}
            />

            {pujaServices.map((item) => (
              <ServiceLink
                key={item.href}
                item={item}
                pathname={pathname}
                onClick={closeMobilePanels}
                language={language}
              />
            ))}
          </div>
        </section>
      )}

      {/* =====================================================
          MOBILE MENU PANEL
      ====================================================== */}

      {mobileMenuOpen && (
        <section
          aria-label={t.more}
          className="
            fixed
            inset-x-3
            bottom-[80px]
            z-40
            rounded-2xl
            border
            border-amber-100
            bg-[#fffdf9]
            p-3
            shadow-[0_-12px_36px_rgba(76,40,10,0.16)]
            lg:hidden
          "
        >
          <div className="mb-2 flex items-center justify-between px-2">
            <p className="text-sm font-bold text-[#603014]">
              {t.other}
            </p>

            <button
              type="button"
              onClick={() =>
                setMobileMenuOpen(false)
              }
              aria-label="मेनू बंद करें"
              className="rounded-lg p-1 text-[#70401f]"
            >
              <Chevron open />
            </button>
          </div>

          <div className="grid gap-1">
            {[
              mainNavigation[1],
              mainNavigation[4],
              mainNavigation[5],
              mainNavigation[6],
              mainNavigation[7],
            ]
              .filter(Boolean)
              .map((item) => (
                <ServiceLink
                  key={item.href}
                  item={item}
                  pathname={pathname}
                  onClick={closeMobilePanels}
                  language={language}
                />
              ))}
          </div>
        </section>
      )}
    </>
  );
}

/* ============================================================
   DESKTOP LINK
============================================================ */

function DesktopLink({
  item,
  pathname,
}: {
  item: NavigationItem;
  pathname: string;
}) {
  const active = isActive(pathname, item.href);

  return (
    <Link
      href={item.href}
      className={`
        hidden
        min-h-10
        items-center
        rounded-xl
        px-2.5
        text-sm
        font-medium
        transition-colors
        lg:flex
        ${
          active
            ? "bg-[#7e3214] text-white"
            : "text-[#673719] hover:bg-amber-50"
        }
      `}
    >
      {item.label}
    </Link>
  );
}

/* ============================================================
   SERVICE LINK
============================================================ */

function ServiceLink({
  item,
  pathname,
  onClick,
  language = "hi",
}: {
  item: NavigationItem;
  pathname: string;
  onClick: () => void;
  language?: Language;
}) {
  const active = isActive(pathname, item.href);

  return (
    <Link
      href={item.href}
      role="menuitem"
      onClick={onClick}
      className={`
        flex
        min-h-11
        items-center
        gap-3
        rounded-xl
        px-3
        py-2
        text-sm
        transition-colors
        ${
          active
            ? "bg-[#7e3214] text-white"
            : "text-[#653719] hover:bg-amber-50"
        }
      `}
    >
      <Icon
        name={item.icon}
        className="h-4 w-4 shrink-0"
      />

      <span>
        {language === "en"
          ? getEnglishLabel(item.label)
          : item.label}
      </span>
    </Link>
  );
}

/* ============================================================
   MOBILE LINK
============================================================ */

function MobileLink({
  item,
  pathname,
  onClick,
  language,
}: {
  item: NavigationItem;
  pathname: string;
  onClick: () => void;
  language: Language;
}) {
  const active = isActive(pathname, item.href);

  return (
    <Link
      href={item.href}
      onClick={onClick}
      className={`
        flex
        min-h-12
        flex-col
        items-center
        justify-center
        gap-0.5
        rounded-xl
        px-1
        text-[10px]
        font-semibold
        transition-colors
        ${
          active
            ? "bg-[#7e3214] text-white"
            : "text-[#70401f] hover:bg-amber-50"
        }
      `}
    >
      <Icon
        name={item.icon}
        className="h-5 w-5"
      />

      <span className="truncate">
        {language === "en"
          ? getEnglishLabel(item.label)
          : item.label}
      </span>
    </Link>
  );
}

/* ============================================================
   BASIC NAVIGATION TRANSLATIONS
============================================================ */

function getEnglishLabel(label: string) {
  const translations: Record<string, string> = {
    होम: "Home",
    ज्योतिष: "Astrology",
    कुंडली: "Kundli",
    "बुकिंग": "Booking",
    "संपर्क करें": "Contact",
    "हमारे बारे में": "About",
    गैलरी: "Gallery",
    FAQs: "FAQs",
    सेवाएँ: "Services",
    "दोष विश्लेषक": "Dosha Analyzer",
    "पूजा सेवाएँ": "Puja Services",
    "परामर्श": "Consultation",
  };

  return translations[label] ?? label;
}