"use client";

import Link from "next/link";
import { useEffect, useState, type FormEvent } from "react";

type Place = {
  name: string;
  state: string;
  country: string;
  lat: number;
  lng: number;
  timezone: string;
  label: string;
};

type Planet = {
  name: string;
  sign: string;
  house: number | null;
  degree: number | null;
  nakshatra: string;
  pada: number | null;
  retrograde: boolean | null;
};

type Chart = {
  ascendant: {
    sign: string;
    degree: number | null;
    nakshatra: string;
    pada: number | null;
  };
  planets: Planet[];
  houses: Array<{ house: number; sign: string }>;
  sadeSati: {
    active: boolean | null;
    phase: string | null;
    description: string;
  } | null;
  metadata: {
    ayanamsha?: string;
    houseSystem?: string;
    timezone?: string;
  };
};

type Analysis = Record<string, unknown> & {
  summary: string;
};

type Result = {
  profile: {
    fullName: string;
    birthDate: string;
    birthTime: string;
    place: string;
  };
  chart: Chart;
  chartToken: string;
  analysis: Analysis | null;
  analysisEnglish: Analysis | null;
  interpretationUnavailable: boolean;
};

const areas: Array<[string, string]> = [
  ["career", "💼 करियर एवं नौकरी"],
  ["marriage", "💍 विवाह"],
  ["relationship", "❤️ प्रेम एवं संबंध"],
  ["finance", "💰 वित्त"],
  ["education", "📚 शिक्षा"],
  ["family", "🏠 परिवार"],
  ["travel", "✈️ यात्रा एवं विदेश"],
  ["spirituality", "🧘 आध्यात्मिकता"],
];

const areaLabels = [
  "💼 करियर एवं नौकरी",
  "💍 विवाह",
  "❤️ प्रेम एवं संबंध",
  "💰 वित्त",
  "📚 शिक्षा",
  "🏠 परिवार",
  "✈️ यात्रा एवं विदेश",
  "🧘 आध्यात्मिकता",
];

function text(value: unknown) {
  return typeof value === "string" ? value : "";
}

function pretty(value: string) {
  return value.replace(/([A-Z])/g, " $1");
}

/* =========================================================
   ICONS — UI ONLY
========================================================= */

function OmIcon({ className = "" }: { className?: string }) {
  return <span className={className}>ॐ</span>;
}

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <path d="M4 10h11" />
      <path d="m11 6 4 4-4 4" />
    </svg>
  );
}

function SparkleIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path d="M12 2.5l1.45 5.05L18.5 9l-5.05 1.45L12 15.5l-1.45-5.05L5.5 9l5.05-1.45L12 2.5Z" />
      <path d="M19 14l.8 2.7L22.5 17.5l-2.7.8L19 21l-.8-2.7-2.7-.8 2.7-.8L19 14Z" />
    </svg>
  );
}

function LotusIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path d="M12 20c-4.8 0-8-2.7-9-6 2.2.2 4 .7 5.3 1.6C7.5 12.2 8.4 8.3 12 4c3.6 4.3 4.5 8.2 3.7 11.6 1.3-.9 3.1-1.4 5.3-1.6-1 3.3-4.2 6-9 6Z" />
      <path d="M12 7v13M7 18.5c2.1-.3 3.7-1.1 5-2.5 1.3 1.4 2.9 2.2 5 2.5" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <rect x="3" y="5" width="18" height="16" rx="3" />
      <path d="M16 3v4M8 3v4M3 10h18" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path d="M20 10.5c0 5.5-8 10.5-8 10.5S4 16 4 10.5a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10.5" r="2.5" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 21c.7-4 3-6 7-6s6.3 2 7 6" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <rect x="3" y="5" width="18" height="14" rx="3" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  );
}

function ChevronIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <path d="m6 8 4 4 4-4" />
    </svg>
  );
}

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function KundaliAnalysis() {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [query, setQuery] = useState("");
  const [place, setPlace] = useState<Place | null>(null);
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [places, setPlaces] = useState<Place[]>([]);
  const [searchError, setSearchError] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<Result | null>(null);
  const [question, setQuestion] = useState("");
  const [chatBusy, setChatBusy] = useState(false);
  const [chat, setChat] = useState<Array<{ q: string; a: string }>>([]);
  const [todayDate, setTodayDate] = useState("");

  useEffect(() => {
    setTodayDate(new Date().toISOString().slice(0, 10));
  }, []);

  useEffect(() => {
    if (query.trim().length < 2 || place?.label === query) return;

    const controller = new AbortController();

    const timer = setTimeout(async () => {
      try {
        const response = await fetch(
          `/api/kundali/locations?q=${encodeURIComponent(query.trim())}`,
          { signal: controller.signal },
        );

        const body = await response.json();

        if (!response.ok) throw new Error(body.message);

        setPlaces(body.results ?? []);
        setSearchError("");
      } catch (e) {
        if (!controller.signal.aborted) {
          setPlaces([]);
          setSearchError(
            e instanceof Error ? e.message : "स्थान खोज नहीं पाए।",
          );
        }
      }
    }, 350);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [query, place]);

  async function submit(event: FormEvent) {
    event.preventDefault();

    setError("");

    if (!place) {
      setError("कृपया खोज सूची से अपना जन्म स्थान चुनें।");
      return;
    }

    setLoading(true);
    setResult(null);
    setChat([]);

    try {
      const response = await fetch("/api/kundali/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: name,
          birthDate: date,
          birthTime: time,
          email,
          gender,
          place,
        }),
      });

      const body = await response.json();

      if (!response.ok)
        throw new Error(body.message ?? "विश्लेषण प्राप्त नहीं हो पाया।");

      setResult(body);
    } catch (e) {
      setError(
        e instanceof Error ? e.message : "कृपया कुछ समय बाद फिर प्रयास करें।",
      );
    } finally {
      setLoading(false);
    }
  }

  async function ask(event: FormEvent) {
    event.preventDefault();

    if (!result || !question.trim()) return;

    const q = question.trim();

    setChatBusy(true);
    setQuestion("");

    try {
      const response = await fetch("/api/kundali/followup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chart: result.chart,
          chartToken: result.chartToken,
          question: q,
        }),
      });

      const body = await response.json();

      setChat((current) => [
        ...current,
        { q, a: response.ok ? body.answer : body.message },
      ]);
    } catch {
      setChat((current) => [
        ...current,
        {
          q,
          a: "अभी उत्तर उपलब्ध नहीं है। कृपया कुछ समय बाद प्रयास करें।",
        },
      ]);
    } finally {
      setChatBusy(false);
    }
  }

  const visiblePlaces =
    query.trim().length >= 2 && place?.label !== query ? places : [];

  const displayAnalysis = result?.analysis;

  return (
    <main
      lang="hi"
      className="min-h-screen overflow-hidden bg-[#fbf4e8] text-[#51230f]"
    >
      {/* =========================================================
          DECORATIVE BACKGROUND
      ========================================================= */}

      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[-15%] top-[-10%] h-[420px] w-[420px] rounded-full bg-[#e6b45b]/10 blur-[100px]" />
        <div className="absolute right-[-15%] top-[20%] h-[500px] w-[500px] rounded-full bg-[#a85e25]/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[20%] h-[450px] w-[450px] rounded-full bg-[#d59a3b]/10 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">

        {/* =========================================================
            TOP BRAND
        ========================================================= */}

        <header className="mx-auto max-w-4xl text-center">

          <div className="inline-flex items-center gap-3 rounded-full border border-[#d9bd8d] bg-[#fffaf1]/80 px-4 py-2 text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#9b5a20] shadow-sm backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-[#bd7b29]" />
            Ujjain • Mahakal Ki Nagari
            <span className="h-1.5 w-1.5 rounded-full bg-[#bd7b29]" />
          </div>

          <div className="mx-auto mt-8 grid h-16 w-16 place-items-center rounded-full border border-[#d5b06c]/50 bg-[#fffaf1] text-3xl text-[#a45b24] shadow-[0_12px_40px_rgba(105,55,17,0.10)]">
            <OmIcon />
          </div>

          <p className="mt-7 text-xs font-black uppercase tracking-[0.25em] text-[#a45b24]">
            ✦ वैदिक ज्योतिषीय मार्गदर्शन ✦
          </p>

          <h1 className="mt-4 text-4xl font-black leading-[1.08] tracking-tight text-[#4d200d] sm:text-5xl lg:text-6xl">
            अपनी जन्म कुंडली
            <span className="block text-[#a45b24]">
              का विश्लेषण करें
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-[#70401f] sm:text-base">
            जन्म तिथि, सही जन्म समय और जन्म स्थान के आधार पर अपनी कुंडली के
            विभिन्न जीवन क्षेत्रों के बारे में पारंपरिक वैदिक ज्योतिषीय
            विश्लेषण प्राप्त करें।
          </p>

        </header>

        {/* =========================================================
            FORM
        ========================================================= */}

        {!result && (
          <form
            onSubmit={submit}
            className="mx-auto mt-10 max-w-4xl overflow-hidden rounded-[2rem] border border-[#dfc7a0] bg-[#fffdf9] shadow-[0_25px_80px_rgba(75,39,12,0.11)]"
          >

            {/* FORM HEADER */}

            <div className="border-b border-[#eadbc4] bg-[#fff9ee] px-6 py-6 sm:px-9">
              <div className="flex items-start gap-4">

                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[#51230f] text-xl text-[#f2ce87] shadow-lg">
                  <LotusIcon />
                </div>

                <div>
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-[#a45b24]">
                    जन्म विवरण
                  </p>

                  <h2 className="mt-1 text-xl font-black text-[#51230f] sm:text-2xl">
                    अपनी जन्म जानकारी दर्ज करें
                  </h2>

                  <p className="mt-1 text-sm text-[#87684b]">
                    सटीक जन्म जानकारी बेहतर गणना में सहायता करती है।
                  </p>
                </div>

              </div>
            </div>

            <div className="p-5 sm:p-9">

              <div className="grid gap-5 sm:grid-cols-2">

                {/* NAME */}

                <label className="grid gap-2 sm:col-span-2">
                  <span className="flex items-center gap-2 text-sm font-extrabold text-[#51230f]">
                    <UserIcon />
                    पूरा नाम
                  </span>

                  <input
                    required
                    minLength={2}
                    maxLength={100}
                    autoComplete="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="min-h-14 rounded-2xl border border-[#dfc6a4] bg-[#fffaf3] px-4 text-[15px] text-[#51230f] outline-none transition placeholder:text-[#b39a7d] focus:border-[#a85e25] focus:bg-white focus:ring-4 focus:ring-[#a85e25]/10"
                    placeholder="अपना पूरा नाम लिखें"
                  />
                </label>

                {/* DATE */}

                <label className="grid gap-2">
                  <span className="flex items-center gap-2 text-sm font-extrabold text-[#51230f]">
                    <CalendarIcon />
                    जन्म तारीख
                  </span>

                  <input
                    required
                    type="date"
                    max={todayDate || undefined}
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="min-h-14 rounded-2xl border border-[#dfc6a4] bg-[#fffaf3] px-4 text-[15px] text-[#51230f] outline-none transition focus:border-[#a85e25] focus:bg-white focus:ring-4 focus:ring-[#a85e25]/10"
                  />
                </label>

                {/* TIME */}

                <label className="grid gap-2">
                  <span className="flex items-center gap-2 text-sm font-extrabold text-[#51230f]">
                    <ClockIcon />
                    जन्म समय
                  </span>

                  <input
                    required
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="min-h-14 rounded-2xl border border-[#dfc6a4] bg-[#fffaf3] px-4 text-[15px] text-[#51230f] outline-none transition focus:border-[#a85e25] focus:bg-white focus:ring-4 focus:ring-[#a85e25]/10"
                  />

                  <span className="text-xs font-normal text-[#87684b]">
                    सही समय से लग्न गणना अधिक सटीक होती है।
                  </span>
                </label>

                {/* PLACE */}

                <div className="relative grid gap-2 sm:col-span-2">

                  <label
                    htmlFor="birth-place"
                    className="flex items-center gap-2 text-sm font-extrabold text-[#51230f]"
                  >
                    <LocationIcon />
                    जन्म स्थान
                  </label>

                  <input
                    id="birth-place"
                    role="combobox"
                    aria-autocomplete="list"
                    required
                    autoComplete="off"
                    value={query}
                    onChange={(e) => {
                      setQuery(e.target.value);
                      setPlace(null);
                    }}
                    className="min-h-14 rounded-2xl border border-[#dfc6a4] bg-[#fffaf3] px-4 text-[15px] text-[#51230f] outline-none transition placeholder:text-[#b39a7d] focus:border-[#a85e25] focus:bg-white focus:ring-4 focus:ring-[#a85e25]/10"
                    placeholder="उज्जैन, मध्य प्रदेश, भारत"
                    aria-expanded={visiblePlaces.length > 0}
                    aria-controls="place-results"
                  />

                  {visiblePlaces.length > 0 && (
                    <ul
                      id="place-results"
                      className="absolute left-0 right-0 top-full z-30 mt-2 max-h-72 overflow-auto rounded-2xl border border-[#ead6b9] bg-white p-2 shadow-[0_20px_60px_rgba(50,25,8,0.18)]"
                    >
                      {visiblePlaces.map((option, i) => (
                        <li key={`${option.label}-${i}`}>
                          <button
                            type="button"
                            onClick={() => {
                              setPlace(option);
                              setQuery(option.label);
                              setPlaces([]);
                            }}
                            className="group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition hover:bg-[#fff7e8]"
                          >
                            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#fff1d4] text-[#a45b24]">
                              <LocationIcon />
                            </span>

                            <span className="min-w-0">
                              <span className="block truncate text-sm font-bold text-[#51230f]">
                                {option.label}
                              </span>

                              <span className="mt-1 block text-xs font-normal text-[#87684b]">
                                {option.timezone}
                              </span>
                            </span>

                            <span className="ml-auto text-[#c28b3c] opacity-0 transition group-hover:opacity-100">
                              <ArrowIcon />
                            </span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}

                  {searchError && (
                    <p
                      className="rounded-xl bg-red-50 px-3 py-2 text-sm text-red-700"
                      role="status"
                    >
                      {searchError}
                    </p>
                  )}

                  {place && (
                    <div className="flex items-center gap-2 rounded-xl border border-green-200 bg-green-50 px-3 py-2 text-xs font-semibold text-green-800">
                      <span className="grid h-5 w-5 place-items-center rounded-full bg-green-600 text-white">
                        ✓
                      </span>
                      स्थान चयनित · {place.timezone}
                    </div>
                  )}

                </div>

                {/* GENDER */}

                <label className="grid gap-2">
                  <span className="text-sm font-extrabold text-[#51230f]">
                    लिंग{" "}
                    <span className="font-normal text-[#98785b]">
                      (वैकल्पिक)
                    </span>
                  </span>

                  <div className="relative">
                    <select
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                      className="min-h-14 w-full appearance-none rounded-2xl border border-[#dfc6a4] bg-[#fffaf3] px-4 pr-10 text-[15px] text-[#51230f] outline-none transition focus:border-[#a85e25] focus:bg-white focus:ring-4 focus:ring-[#a85e25]/10"
                    >
                      <option value="">न बताना चाहें</option>
                      <option value="महिला">महिला</option>
                      <option value="पुरुष">पुरुष</option>
                      <option value="अन्य">अन्य</option>
                    </select>

                    <ChevronIcon />
                  </div>
                </label>

                {/* EMAIL */}

                <label className="grid gap-2">
                  <span className="flex items-center gap-2 text-sm font-extrabold text-[#51230f]">
                    <MailIcon />
                    ईमेल{" "}
                    <span className="font-normal text-[#98785b]">
                      (वैकल्पिक)
                    </span>
                  </span>

                  <input
                    type="email"
                    maxLength={180}
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="min-h-14 rounded-2xl border border-[#dfc6a4] bg-[#fffaf3] px-4 text-[15px] text-[#51230f] outline-none transition placeholder:text-[#b39a7d] focus:border-[#a85e25] focus:bg-white focus:ring-4 focus:ring-[#a85e25]/10"
                    placeholder="name@example.com"
                  />
                </label>

              </div>

              {/* PRIVACY */}

              <div className="mt-6 flex gap-3 rounded-2xl border border-[#eadbc4] bg-[#fff8eb] p-4">

                <div className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#f2e0bd] text-[#9b5a20]">
                  ✓
                </div>

                <p className="text-xs leading-6 text-[#87684b]">
                  आपकी जन्म जानकारी केवल इस अनुरोध की गणना और व्याख्या के लिए
                  उपयोग होगी। इसे इस पेज पर सेव नहीं किया जाता।
                </p>

              </div>

              {/* ERROR */}

              {error && (
                <p
                  role="alert"
                  className="mt-4 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-medium leading-6 text-red-800"
                >
                  {error}
                </p>
              )}

              {/* SUBMIT */}

              <button
                disabled={loading}
                className="group mt-6 flex min-h-14 w-full items-center justify-center gap-3 rounded-2xl bg-[#8b3516] px-6 font-extrabold text-white shadow-[0_14px_35px_rgba(139,53,22,0.22)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#70280f] hover:shadow-[0_18px_40px_rgba(139,53,22,0.28)] disabled:cursor-wait disabled:opacity-70"
              >
                {loading ? (
                  <>
                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    आपकी जन्म कुंडली तैयार की जा रही है…
                  </>
                ) : (
                  <>
                    <SparkleIcon />
                    कुंडली विश्लेषण करें
                    <ArrowIcon />
                  </>
                )}
              </button>

            </div>
          </form>
        )}

        {/* =========================================================
            RESULT
        ========================================================= */}

        {result && (
          <section className="mt-10">

            {/* PROFILE HEADER */}

            <div className="relative overflow-hidden rounded-[2rem] bg-[#51230f] p-6 text-amber-50 shadow-[0_25px_70px_rgba(75,35,10,0.18)] sm:p-9">

              <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[#d79b3e]/20 blur-3xl" />

              <div className="pointer-events-none absolute -bottom-24 -left-20 h-64 w-64 rounded-full bg-[#a85e25]/20 blur-3xl" />

              <div className="relative flex flex-col gap-7 sm:flex-row sm:items-center sm:justify-between">

                <div className="flex items-start gap-4">

                  <div className="hidden h-16 w-16 shrink-0 place-items-center rounded-2xl border border-[#e7c777]/30 bg-white/10 text-3xl text-[#f3d48e] sm:grid">
                    ॐ
                  </div>

                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#e9c777]">
                      जन्म कुंडली विश्लेषण
                    </p>

                    <h2 className="mt-2 text-3xl font-black sm:text-4xl">
                      {result.profile.fullName}
                    </h2>

                    <p className="mt-3 text-sm leading-6 text-amber-100/75">
                      {result.profile.birthDate} ·{" "}
                      {result.profile.birthTime} ·{" "}
                      {result.profile.place}
                    </p>
                  </div>

                </div>

                <button
                  onClick={() => setResult(null)}
                  className="min-h-11 rounded-xl border border-amber-100/30 px-5 text-sm font-bold transition hover:bg-white/10"
                >
                  नई कुंडली
                </button>

              </div>
            </div>

            {/* CORE DETAILS */}

            <div className="mt-5 grid gap-4 sm:grid-cols-3">

              <Info
                title="लग्न"
                main={result.chart.ascendant.sign || "उपलब्ध नहीं"}
                sub={result.chart.ascendant.nakshatra}
                icon="लग्न"
              />

              <Info
                title="चंद्र राशि"
                main={
                  result.chart.planets.find(
                    (p) => p.name.toLowerCase() === "moon",
                  )?.sign || "उपलब्ध नहीं"
                }
                sub={
                  result.chart.planets.find(
                    (p) => p.name.toLowerCase() === "moon",
                  )?.nakshatra || ""
                }
                icon="चंद्र"
              />

              <Info
                title="सूर्य राशि"
                main={
                  result.chart.planets.find(
                    (p) => p.name.toLowerCase() === "sun",
                  )?.sign || "उपलब्ध नहीं"
                }
                sub="साइडेरियल गणना"
                icon="सूर्य"
              />

            </div>

            {/* NOTICE */}

            {result.interpretationUnavailable && (
              <div className="mt-5 flex gap-3 rounded-2xl border border-[#e8c982] bg-[#fff6dc] p-5 text-sm leading-7 text-[#70401f]">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#f0d59d] text-[#8f591c]">
                  !
                </span>

                <p>
                  यह शुरुआती विश्लेषण आपकी गणना की गई ग्रह और भाव स्थितियों से
                  तैयार किया गया है। AI व्याख्या के बिना भी करियर और संबंधों के
                  संकेत नीचे उपलब्ध हैं।
                </p>
              </div>
            )}

            {/* =====================================================
                ANALYSIS
            ===================================================== */}

            {displayAnalysis ? (
              <>
                <div className="mt-5 overflow-hidden rounded-[2rem] border border-[#ead6b9] bg-white shadow-[0_15px_45px_rgba(80,42,12,0.06)]">

                  <div className="border-b border-[#f0e5d6] bg-[#fffaf1] p-6 sm:p-7">
                    <div className="flex items-center gap-3">
                      <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#51230f] text-[#f0cc83]">
                        <SparkleIcon />
                      </div>

                      <div>
                        <p className="text-xs font-black uppercase tracking-[0.16em] text-[#a45b24]">
                          Overall Reading
                        </p>

                        <h3 className="mt-1 text-xl font-extrabold text-[#51230f] sm:text-2xl">
                          समग्र दृष्टि
                        </h3>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 sm:p-7">
                    <p className="leading-8 text-[#70401f]">
                      {displayAnalysis.summary}
                    </p>
                  </div>

                </div>

                {/* AREA CARDS */}

                <div className="mt-5 grid gap-4 md:grid-cols-2">

                  {areas.map(([key], index) => {
                    const section = displayAnalysis?.[key];

                    if (!section || typeof section !== "object") return null;

                    return (
                      <article
                        key={key}
                        className="group rounded-[1.5rem] border border-[#ead6b9] bg-white p-5 shadow-[0_10px_35px_rgba(80,42,12,0.05)] transition duration-300 hover:-translate-y-1 hover:border-[#d2aa67] hover:shadow-[0_18px_45px_rgba(80,42,12,0.09)] sm:p-6"
                      >

                        <div className="flex items-center gap-4">

                          <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[#fff1d4] text-lg">
                            {areaLabels[index].split(" ")[0]}
                          </div>

                          <div>
                            <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#b17a35]">
                              Life Area
                            </p>

                            <h3 className="mt-1 text-lg font-extrabold text-[#51230f]">
                              {areaLabels[index].substring(
                                areaLabels[index].indexOf(" ") + 1,
                              )}
                            </h3>
                          </div>

                        </div>

                        <div className="mt-5 space-y-3">

                          {Object.entries(section).map(
                            ([field, value]) =>
                              typeof value === "string" &&
                              value && (
                                <div
                                  key={field}
                                  className="rounded-xl bg-[#fffaf2] p-3.5"
                                >
                                  <p className="text-xs font-extrabold text-[#9a5b21]">
                                    {{
                                      interpretation: "विश्लेषण",
                                      timing: "समय",
                                      guidance: "मार्गदर्शन",
                                      marriageType: "विवाह का स्वरूप",
                                    }[field] ?? pretty(field)}
                                  </p>

                                  <p className="mt-1 text-sm leading-7 text-[#70401f]">
                                    {value}
                                  </p>
                                </div>
                              ),
                          )}

                        </div>

                      </article>
                    );
                  })}

                </div>

                {/* DOSHA */}

                {Array.isArray(displayAnalysis.dosha) &&
                  displayAnalysis.dosha.length > 0 && (
                    <article className="mt-5 overflow-hidden rounded-[1.5rem] border border-[#ead6b9] bg-white shadow-sm">

                      <div className="border-b border-[#f0e5d6] bg-[#fff8ec] p-5">
                        <div className="flex items-center gap-3">

                          <div className="grid h-11 w-11 place-items-center rounded-xl bg-[#f5dfb5] text-[#9b5a20]">
                            ॐ
                          </div>

                          <div>
                            <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#a45b24]">
                              Traditional Indicators
                            </p>

                            <h3 className="mt-1 font-extrabold text-[#51230f]">
                              पारंपरिक योग / दोष संकेत
                            </h3>
                          </div>

                        </div>
                      </div>

                      <ul className="space-y-2 p-5 text-sm leading-7 text-[#70401f] sm:p-6">
                        {displayAnalysis.dosha.map((d, i) => (
                          <li
                            key={i}
                            className="flex gap-3 rounded-xl bg-[#fffaf2] p-3"
                          >
                            <span className="mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#f2dfb9] text-xs font-black text-[#98591f]">
                              {i + 1}
                            </span>

                            <span>{String(d)}</span>
                          </li>
                        ))}
                      </ul>

                    </article>
                  )}
              </>
            ) : (
              <div className="mt-5 rounded-2xl border border-amber-300 bg-amber-50 p-5 leading-7 text-[#70401f]">
                कुंडली गणना हुई, लेकिन व्याख्या उपलब्ध नहीं है। ग्रह स्थिति नीचे
                देख सकते हैं।
              </div>
            )}

            {/* =====================================================
                PLANETS
            ===================================================== */}

            <article className="mt-5 overflow-hidden rounded-[2rem] border border-[#ead6b9] bg-white shadow-[0_12px_40px_rgba(80,42,12,0.06)]">

              <div className="border-b border-[#f0e5d6] bg-[#fffaf1] p-5 sm:p-6">

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

                  <div className="flex items-center gap-3">

                    <div className="grid h-11 w-11 place-items-center rounded-xl bg-[#51230f] text-[#f2cd86]">
                      ✦
                    </div>

                    <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#a45b24]">
                        Planetary Positions
                      </p>

                      <h3 className="text-xl font-extrabold text-[#51230f]">
                        ग्रह स्थिति
                      </h3>
                    </div>

                  </div>

                  <p className="text-xs text-[#87684b]">
                    गणना: {result.chart.metadata.ayanamsha || "Lahiri"} ·{" "}
                    {result.chart.metadata.houseSystem || "Whole sign"} भाव
                  </p>

                </div>

              </div>

              <div className="overflow-x-auto">

                <table className="w-full min-w-[700px] text-left text-sm">

                  <thead className="bg-[#fff8ec] text-[#70401f]">
                    <tr>
                      {[
                        "ग्रह",
                        "राशि",
                        "भाव",
                        "नक्षत्र",
                        "अंश",
                        "स्थिति",
                      ].map((h) => (
                        <th
                          key={h}
                          className="px-4 py-4 text-xs font-black uppercase tracking-wide"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>

                  <tbody>

                    {result.chart.planets.map((p) => (
                      <tr
                        key={p.name}
                        className="border-t border-[#f0e5d6] transition hover:bg-[#fffaf2]"
                      >

                        <td className="px-4 py-4 font-extrabold text-[#51230f]">
                          {p.name}
                        </td>

                        <td className="px-4 py-4 text-[#70401f]">
                          {p.sign || "—"}
                        </td>

                        <td className="px-4 py-4 text-[#70401f]">
                          {p.house ?? "—"}
                        </td>

                        <td className="px-4 py-4 text-[#70401f]">
                          {p.nakshatra || "—"}
                        </td>

                        <td className="px-4 py-4 text-[#70401f]">
                          {p.degree?.toFixed(2) ?? "—"}°
                        </td>

                        <td className="px-4 py-4">

                          <span
                            className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${
                              p.retrograde
                                ? "bg-amber-100 text-amber-800"
                                : "bg-green-100 text-green-800"
                            }`}
                          >
                            {p.retrograde ? "वक्री" : "सीधी"}
                          </span>

                        </td>

                      </tr>
                    ))}

                  </tbody>

                </table>

              </div>
            </article>

            {/* =====================================================
                FOLLOW UP
            ===================================================== */}

            <section className="mt-6 overflow-hidden rounded-[2rem] border border-[#ead6b9] bg-white shadow-[0_12px_40px_rgba(80,42,12,0.06)]">

              <div className="border-b border-[#f0e5d6] bg-[#fffaf1] p-5 sm:p-7">

                <div className="flex items-start gap-4">

                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[#51230f] text-[#f2cd86]">
                    ✦
                  </div>

                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#a45b24]">
                      Ask About Your Chart
                    </p>

                    <h3 className="mt-1 text-xl font-extrabold text-[#51230f] sm:text-2xl">
                      अपनी कुंडली के बारे में और पूछें
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-[#87684b]">
                      उपलब्ध ग्रह स्थिति के आधार पर अपना सवाल पूछें।
                    </p>
                  </div>

                </div>

              </div>

              <div className="p-5 sm:p-7">

                <div className="flex flex-wrap gap-2">

                  {[
                    "मेरा career किस field में बेहतर हो सकता है?",
                    "मेरी relationship के संकेत बताइए",
                    "मेरी शादी के संकेत बताइए",
                    "विदेश जाने के योग हैं?",
                  ].map((q) => (
                    <button
                      key={q}
                      onClick={() => setQuestion(q)}
                      className="rounded-full border border-[#e6cfad] bg-[#fffaf2] px-4 py-2.5 text-left text-xs font-semibold text-[#70401f] transition hover:border-[#c9943d] hover:bg-[#fff3d9]"
                    >
                      {q}
                    </button>
                  ))}

                </div>

                <div className="mt-5 space-y-3">

                  {chat.map((entry, i) => (
                    <div
                      key={i}
                      className="rounded-2xl border border-[#eadbc4] bg-[#fff8ec] p-4"
                    >
                      <div className="flex gap-3">

                        <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#51230f] text-sm text-[#f1cd85]">
                          आप
                        </div>

                        <div>
                          <p className="font-bold text-[#51230f]">
                            {entry.q}
                          </p>

                          <p className="mt-2 leading-7 text-[#70401f]">
                            {entry.a}
                          </p>
                        </div>

                      </div>
                    </div>
                  ))}

                </div>

                <form
                  onSubmit={ask}
                  className="mt-5 flex flex-col gap-2 sm:flex-row"
                >
                  <input
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    maxLength={1000}
                    placeholder="उदाहरण: मेरी नौकरी के लिए कौन सा समय बेहतर है?"
                    className="min-h-14 flex-1 rounded-2xl border border-[#dfc6a4] bg-[#fffaf3] px-4 text-sm outline-none transition placeholder:text-[#b39a7d] focus:border-[#a85e25] focus:bg-white focus:ring-4 focus:ring-[#a85e25]/10"
                  />

                  <button
                    disabled={chatBusy}
                    className="min-h-14 rounded-2xl bg-[#8b3516] px-7 font-bold text-white transition hover:bg-[#70280f] disabled:opacity-60"
                  >
                    {chatBusy ? "उत्तर तैयार हो रहा है…" : "पूछें"}
                  </button>
                </form>

                <p className="mt-3 text-xs leading-5 text-[#87684b]">
                  जवाब उपलब्ध ग्रह स्थिति पर आधारित पारंपरिक व्याख्या है,
                  निश्चित भविष्यवाणी नहीं।
                </p>

              </div>
            </section>

            {/* =====================================================
                DISCLAIMER
            ===================================================== */}

            <p className="mt-5 rounded-2xl border border-[#e5d3b5] bg-[#f3e7d4] p-4 text-xs leading-6 text-[#70401f]">
              {text(result.analysis?.disclaimer) ||
                "यह पारंपरिक ज्योतिषीय व्याख्या है, निश्चित भविष्यवाणी नहीं। जन्म समय या उपलब्ध गणना डेटा की सीमाओं के कारण परिणाम बदल सकते हैं।"}{" "}
              इस मूल चार्ट गणना में दशा और गोचर शामिल नहीं हैं, इसलिए समय-खिड़की
              या दोष संबंधी निष्कर्ष नहीं दिए गए हैं।
            </p>

            {/* =====================================================
                CONSULTATION CTA
            ===================================================== */}

            <div className="relative mt-6 overflow-hidden rounded-[2rem] bg-[#51230f] p-7 text-center shadow-[0_25px_60px_rgba(80,42,12,0.15)] sm:p-10">

              <div className="pointer-events-none absolute -left-20 -top-20 h-60 w-60 rounded-full bg-[#d89a3d]/20 blur-3xl" />

              <div className="pointer-events-none absolute -bottom-20 -right-20 h-60 w-60 rounded-full bg-[#a85e25]/25 blur-3xl" />

              <div className="relative">

                <div className="mx-auto grid h-14 w-14 place-items-center rounded-full border border-[#e7c777]/40 bg-white/10 text-2xl text-[#f2ce87]">
                  ॐ
                </div>

                <p className="mt-5 text-[10px] font-black uppercase tracking-[0.22em] text-[#e7bd6d]">
                  Personal Guidance • Ujjain
                </p>

                <h3 className="mt-3 text-2xl font-black text-white sm:text-3xl">
                  क्या आप अपनी कुंडली पर
                  <span className="block text-[#f1cb7d]">
                    व्यक्तिगत परामर्श चाहते हैं?
                  </span>
                </h3>

                <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-[#f5dfbd]">
                  पंडित जी से सीधे व्यक्तिगत मार्गदर्शन प्राप्त करें।
                </p>

                <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">

                  <Link
                    href="/book-consultation"
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#f4cc7b] px-6 font-bold text-[#51230f] transition hover:-translate-y-0.5 hover:bg-[#ffdf9c]"
                  >
                    पंडित जी से परामर्श लें
                    <ArrowIcon />
                  </Link>

                  <Link
                    href="/puja-services"
                    className="inline-flex min-h-12 items-center justify-center rounded-xl border border-[#f4d38f]/40 px-6 font-bold text-white transition hover:bg-white/10"
                  >
                    पूजा सेवाएँ देखें
                  </Link>

                </div>

              </div>
            </div>

          </section>
        )}

        {/* =========================================================
            FOOT NOTE
        ========================================================= */}

        <p className="mx-auto mt-7 max-w-3xl text-center text-xs leading-5 text-[#87684b]">
          यह ज्योतिषीय और सांस्कृतिक दृष्टिकोण से दी गई जानकारी है, इसे जीवन के
          महत्वपूर्ण निर्णयों का एकमात्र आधार न मानें।
        </p>

      </div>
    </main>
  );
}

/* =========================================================
   INFO CARD — UI ONLY
========================================================= */

function Info({
  title,
  main,
  sub,
  icon,
}: {
  title: string;
  main: string;
  sub: string;
  icon: string;
}) {
  return (
    <div className="group relative overflow-hidden rounded-[1.5rem] border border-[#ead6b9] bg-white p-5 shadow-[0_10px_35px_rgba(80,42,12,0.05)] transition duration-300 hover:-translate-y-1 hover:border-[#d2aa67] hover:shadow-[0_18px_45px_rgba(80,42,12,0.09)]">

      <div className="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-[#f2d59d]/20 blur-2xl" />

      <div className="relative flex items-start justify-between">

        <div>
          <p className="text-xs font-black uppercase tracking-[0.15em] text-[#a45b24]">
            {title}
          </p>

          <p className="mt-2 text-2xl font-black text-[#51230f]">
            {main}
          </p>

          {sub && (
            <p className="mt-1 text-sm text-[#87684b]">
              {sub}
            </p>
          )}
        </div>

        <div className="grid h-11 w-11 place-items-center rounded-xl bg-[#fff1d4] text-xs font-black text-[#9b5a20]">
          {icon}
        </div>

      </div>
    </div>
  );
}