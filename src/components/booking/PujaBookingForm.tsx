"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";

import Link from "next/link";

import { signIn, useSession } from "next-auth/react";

import BookingSuccess from "@/components/booking/BookingSuccess";

import { getPujaService, pujaServices } from "@/data/puja-services";

type FormValues = {
  fullName: string;
  phone: string;
  email: string;
  city: string;
  pujaService: string;
  preferredDate: string;
  preferredTime: string;
  locationType: string;
  otherLocation: string;
  purpose: string;
  additionalInfo: string;
  birthDate: string;
  birthTime: string;
  birthPlace: string;
};

type FieldName = keyof FormValues;

type Errors = Partial<Record<FieldName, string>>;

const initialValues: FormValues = {
  fullName: "",
  phone: "",
  email: "",
  city: "",
  pujaService: "",
  preferredDate: "",
  preferredTime: "",
  locationType: "",
  otherLocation: "",
  purpose: "",
  additionalInfo: "",
  birthDate: "",
  birthTime: "",
  birthPlace: "",
};

const inputClass =
  "mt-2 block min-h-12 w-full rounded-2xl border bg-white px-4 text-[15px] text-[#3f210f] outline-none transition-all duration-200 placeholder:text-[#a48d78] hover:border-[#c99b63] focus:border-[#9b421b] focus:ring-4 focus:ring-[#f3dfc3]";

function today() {
  const now = new Date();
  const offset = now.getTimezoneOffset();

  return new Date(now.getTime() - offset * 60_000)
    .toISOString()
    .slice(0, 10);
}

function FieldError({ id, error }: { id: string; error?: string }) {
  return error ? (
    <p
      id={id}
      role="alert"
      className="mt-1.5 text-sm font-medium text-red-700"
    >
      {error}
    </p>
  ) : null;
}

export default function PujaBookingForm({
  initialPujaService = "",
}: {
  initialPujaService?: string;
}) {
  const { data: session } = useSession();

  const [values, setValues] = useState<FormValues>({
    ...initialValues,
    pujaService: getPujaService(initialPujaService)?.id ?? "",
  });

  const [errors, setErrors] = useState<Errors>({});

  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "serverUnavailable"
  >("idle");

  const [formMessage, setFormMessage] = useState("");

  const [loginRequired, setLoginRequired] = useState(false);

  const [todayStr, setTodayStr] = useState("");

  useEffect(() => {
    setTodayStr(today());
  }, []);

  const selectedService = useMemo(
    () => getPujaService(values.pujaService),
    [values.pujaService],
  );

  const needsOtherLocation = values.locationType === "other";

  useEffect(() => {
    let timer: number | undefined;

    try {
      const saved = sessionStorage.getItem("panditji-booking-draft");

      if (saved) {
        const draft = JSON.parse(saved) as Partial<FormValues>;

        timer = window.setTimeout(
          () => setValues((current) => ({ ...current, ...draft })),
          0,
        );
      }
    } catch {
      /* An unavailable or invalid browser draft can be ignored. */
    }

    return () => {
      if (timer !== undefined) window.clearTimeout(timer);
    };
  }, []);

  const update = (field: FieldName, value: string) => {
    setValues((current) => {
      const next = { ...current, [field]: value };

      try {
        sessionStorage.setItem(
          "panditji-booking-draft",
          JSON.stringify(next),
        );
      } catch {
        /* Storage can be unavailable in private contexts. */
      }

      return next;
    });

    if (errors[field]) {
      setErrors((current) => ({ ...current, [field]: undefined }));
    }

    if (status === "serverUnavailable") {
      setStatus("idle");
      setFormMessage("");
    }
  };

  const validate = () => {
    const next: Errors = {};

    if (!values.fullName.trim()) {
      next.fullName = "कृपया अपना नाम दर्ज करें।";
    }

    if (!/^[6-9]\d{9}$/.test(values.phone.replace(/[\s-]/g, ""))) {
      next.phone = "कृपया सही 10 अंकों का मोबाइल नंबर दर्ज करें।";
    }

    if (
      values.email &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)
    ) {
      next.email = "कृपया सही ईमेल पता दर्ज करें।";
    }

    if (!values.city.trim()) {
      next.city = "कृपया अपना शहर या स्थान दर्ज करें।";
    }

    if (!getPujaService(values.pujaService)) {
      next.pujaService = "कृपया पूजा का चयन करें।";
    }

    if (!values.preferredDate) {
      next.preferredDate = "कृपया पूजा की तिथि चुनें।";
    } else if (values.preferredDate < today()) {
      next.preferredDate = "कृपया आज या भविष्य की तिथि चुनें।";
    }

    if (!values.preferredTime) {
      next.preferredTime = "कृपया पसंदीदा समय चुनें।";
    }

    if (!values.locationType) {
      next.locationType = "कृपया पूजा का स्थान चुनें।";
    }

    if (needsOtherLocation && !values.otherLocation.trim()) {
      next.otherLocation = "कृपया पूजा का स्थान दर्ज करें।";
    }

    if (values.purpose.trim().length < 10) {
      next.purpose =
        "कृपया अपनी आवश्यकता के बारे में थोड़ा विस्तार से लिखें।";
    }

    setErrors(next);

    return Object.keys(next).length === 0;
  };

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (status === "submitting" || !validate()) return;

    if (!session?.user) {
      try {
        sessionStorage.setItem(
          "panditji-booking-draft",
          JSON.stringify(values),
        );
      } catch {
        /* Storage can be unavailable in private contexts. */
      }

      setLoginRequired(true);
      return;
    }

    setStatus("submitting");
    setFormMessage("");

    try {
      const response = await fetch("/api/puja-bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const result: { success?: boolean; message?: string } =
        await response.json();

      if (!response.ok || !result.success) {
        setStatus("serverUnavailable");

        setFormMessage(
          result.message ??
            "अनुरोध अभी भेजा नहीं जा सका। कृपया बाद में पुनः प्रयास करें। ",
        );

        return;
      }

      setStatus("success");

      try {
        sessionStorage.removeItem("panditji-booking-draft");
      } catch {
        /* Storage can be unavailable in private contexts. */
      }
    } catch {
      setStatus("serverUnavailable");

      setFormMessage(
        "अनुरोध अभी भेजा नहीं जा सका। कृपया अपना इंटरनेट कनेक्शन जाँचकर पुनः प्रयास करें।",
      );
    }
  }

  if (status === "success") {
    return (
      <BookingSuccess
        onNewBooking={() => {
          setValues({ ...initialValues });
          setStatus("idle");
        }}
      />
    );
  }

  return (
    <>
      <form
        noValidate
        onSubmit={handleSubmit}
        className="relative overflow-hidden rounded-[32px] border border-[#ead8bc] bg-[#fffdfa] shadow-[0_30px_90px_rgba(83,42,15,0.12)]"
        aria-describedby="privacy-note"
      >
        {/* Decorative top line */}
        <div className="h-1.5 w-full bg-[#963a16]" />

        <div className="p-5 sm:p-8 lg:p-10">
          {/* Header */}
          <div className="mb-9 rounded-[26px] border border-[#eadbc5] bg-[#fff8ec] p-5 sm:p-6">
            <div className="flex items-start gap-4">
              <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl border border-[#dfc28e] bg-[#f8e9cf] text-2xl text-[#873514] shadow-sm">
                ॐ
              </div>

              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#a66b36]">
                  Puja Booking
                </p>

                <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-[#51230f] sm:text-3xl">
                  पूजा बुकिंग अनुरोध
                </h1>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-[#80654d]">
                  अपनी आवश्यकतानुसार पूजा एवं अनुष्ठान की जानकारी साझा करें।
                  संपर्क के बाद आपकी तिथि और समय की पुष्टि की जाएगी।
                </p>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              <TrustBadge text="विधिवत अनुष्ठान" />
              <TrustBadge text="व्यक्तिगत मार्गदर्शन" />
              <TrustBadge text="उज्जैन से सेवा" />
            </div>
          </div>

          {/* Personal Information */}
          <SectionTitle number="१" title="व्यक्तिगत जानकारी" />

          <div className="grid gap-5 sm:grid-cols-2">
            <Field
              label="पूरा नाम"
              name="fullName"
              required
              value={values.fullName}
              onChange={update}
              error={errors.fullName}
              placeholder="अपना पूरा नाम दर्ज करें"
            />

            <Field
              label="मोबाइल नंबर"
              name="phone"
              required
              type="tel"
              inputMode="numeric"
              value={values.phone}
              onChange={update}
              error={errors.phone}
              placeholder="10 अंकों का मोबाइल नंबर"
            />

            <Field
              label="ईमेल पता"
              name="email"
              type="email"
              value={values.email}
              onChange={update}
              error={errors.email}
              placeholder="अपना ईमेल दर्ज करें"
              optional
            />

            <Field
              label="शहर / स्थान"
              name="city"
              required
              value={values.city}
              onChange={update}
              error={errors.city}
              placeholder="अपना शहर दर्ज करें"
            />
          </div>

          <Divider />

          {/* Puja Selection */}
          <SectionTitle number="२" title="पूजा का चयन" />

          <div className="rounded-2xl border border-[#eadbc5] bg-[#fffaf3] p-4 sm:p-5">
            <label
              htmlFor="pujaService"
              className="text-sm font-bold text-[#542710]"
            >
              पूजा का चयन करें{" "}
              <span aria-hidden="true" className="text-[#af3d20]">
                *
              </span>
            </label>

            <select
              id="pujaService"
              name="pujaService"
              value={values.pujaService}
              onChange={(e) => update("pujaService", e.target.value)}
              aria-describedby={
                errors.pujaService ? "pujaService-error" : undefined
              }
              aria-invalid={Boolean(errors.pujaService)}
              className={`${inputClass} ${
                errors.pujaService
                  ? "border-red-500"
                  : "border-[#d8b98b]"
              }`}
            >
              <option value="">पूजा चुनें</option>

              {pujaServices.map((service) => (
                <option key={service.id} value={service.id}>
                  {service.title}
                </option>
              ))}
            </select>

            <FieldError
              id="pujaService-error"
              error={errors.pujaService}
            />

            {selectedService && (
              <div className="mt-4 flex items-center gap-3 rounded-xl border border-[#ead8bc] bg-white px-4 py-3">
                <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#f8e9cf] text-sm text-[#963a16]">
                  ॐ
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#a66b36]">
                    Selected Service
                  </p>

                  <p className="mt-0.5 text-sm font-bold text-[#542710]">
                    {selectedService.title}
                  </p>
                </div>
              </div>
            )}
          </div>

          <Divider />

          {/* Booking Details */}
          <SectionTitle number="३" title="बुकिंग विवरण" />

          <div className="grid gap-5 sm:grid-cols-2">
            <Field
              label="पूजा की पसंदीदा तिथि"
              name="preferredDate"
              required
              type="date"
              min={today()}
              value={values.preferredDate}
              onChange={update}
              error={errors.preferredDate}
            />

            <SelectField
              label="पसंदीदा समय"
              name="preferredTime"
              required
              value={values.preferredTime}
              onChange={update}
              error={errors.preferredTime}
              options={[
                ["morning", "सुबह"],
                ["afternoon", "दोपहर"],
                ["evening", "शाम"],
                ["discuss", "समय पंडित जी से तय करें"],
              ]}
            />

            <div className="sm:col-span-2">
              <SelectField
                label="पूजा का स्थान"
                name="locationType"
                required
                value={values.locationType}
                onChange={update}
                error={errors.locationType}
                options={[
                  ["ujjain", "उज्जैन में पूजा"],
                  ["online", "ऑनलाइन मार्गदर्शन"],
                  ["other", "अन्य स्थान"],
                  ["discuss", "पंडित जी से चर्चा करें"],
                ]}
              />
            </div>

            {needsOtherLocation && (
              <div className="sm:col-span-2">
                <Field
                  label="पूजा का विस्तृत स्थान"
                  name="otherLocation"
                  required
                  value={values.otherLocation}
                  onChange={update}
                  error={errors.otherLocation}
                  placeholder="शहर और क्षेत्र दर्ज करें"
                />
              </div>
            )}
          </div>

          <div className="mt-4 flex gap-3 rounded-2xl border border-[#eadbc5] bg-[#fffaf3] px-4 py-3.5">
            <span className="mt-0.5 text-[#a66b36]">ⓘ</span>

            <p className="text-sm leading-6 text-[#80654d]">
              आपका चुना हुआ समय केवल प्राथमिकता है; उपलब्धता की पुष्टि संपर्क
              के बाद की जाएगी।
            </p>
          </div>

          <Divider />

          {/* Additional Information */}
          <SectionTitle number="४" title="अतिरिक्त जानकारी" />

          <div className="grid gap-5">
            <TextArea
              label="पूजा का उद्देश्य / आपकी आवश्यकता"
              name="purpose"
              required
              value={values.purpose}
              onChange={update}
              error={errors.purpose}
              placeholder="अपनी आवश्यकता या पूजा के उद्देश्य के बारे में लिखें..."
            />

            <TextArea
              label="अतिरिक्त जानकारी"
              name="additionalInfo"
              value={values.additionalInfo}
              onChange={update}
              error={errors.additionalInfo}
              optional
              placeholder="यदि कोई अन्य जानकारी साझा करना चाहते हैं..."
            />
          </div>

          {/* Astrology Information */}
          {selectedService?.isAstrologyService && (
            <fieldset className="mt-7 overflow-hidden rounded-2xl border border-[#e5d0ae] bg-[#fff9ee]">
              <div className="border-b border-[#eadbc5] bg-[#fff4df] px-5 py-4">
                <legend className="text-sm font-extrabold text-[#542710]">
                  जन्म संबंधी जानकारी
                  <span className="ml-2 font-normal text-[#80654d]">
                    (वैकल्पिक)
                  </span>
                </legend>

                <p className="mt-1 text-sm text-[#80654d]">
                  यह जानकारी केवल चुनी हुई ज्योतिष सेवा के लिए साझा करें।
                </p>
              </div>

              <div className="grid gap-5 p-5 sm:grid-cols-3">
                <Field
                  label="जन्म तिथि"
                  name="birthDate"
                  type="date"
                  value={values.birthDate}
                  onChange={update}
                  error={errors.birthDate}
                />

                <Field
                  label="जन्म समय"
                  name="birthTime"
                  type="time"
                  value={values.birthTime}
                  onChange={update}
                  error={errors.birthTime}
                />

                <Field
                  label="जन्म स्थान"
                  name="birthPlace"
                  value={values.birthPlace}
                  onChange={update}
                  error={errors.birthPlace}
                  placeholder="जन्म स्थान"
                />
              </div>
            </fieldset>
          )}

          {/* Server Error */}
          {status === "serverUnavailable" && (
            <div
              role="alert"
              className="mt-7 rounded-2xl border border-amber-300 bg-amber-50 px-5 py-4 text-sm font-medium leading-6 text-[#70401f]"
            >
              <div className="flex gap-3">
                <span className="mt-0.5">⚠</span>
                <span>{formMessage}</span>
              </div>
            </div>
          )}

          {/* Privacy */}
          <div className="mt-8 flex gap-3 rounded-2xl border border-[#eadbc5] bg-[#fffbf5] p-4">
            <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#f7e5c7] text-[#873514]">
              ✓
            </div>

            <p
              id="privacy-note"
              className="text-sm leading-6 text-[#80654d]"
            >
              आपकी दी गई जानकारी का उपयोग पूजा बुकिंग अनुरोध और संपर्क के लिए
              किया जाएगा।
            </p>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={status === "submitting"}
            className="group mt-6 inline-flex min-h-14 w-full items-center justify-center gap-3 rounded-2xl bg-[#963a16] px-6 py-3 font-extrabold text-white shadow-[0_14px_30px_rgba(120,46,15,0.22)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#7b2d10] hover:shadow-[0_18px_36px_rgba(120,46,15,0.27)] disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0 focus:outline-none focus:ring-2 focus:ring-[#963a16] focus:ring-offset-2"
          >
            {status === "submitting" ? (
              <>
                <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                अनुरोध भेजा जा रहा है…
              </>
            ) : (
              <>
                <span>बुकिंग अनुरोध भेजें</span>
                <span className="text-lg transition-transform duration-200 group-hover:translate-x-1">
                  →
                </span>
              </>
            )}
          </button>

          <p className="mt-3 text-center text-xs text-[#9a806c]">
            आपकी बुकिंग की अंतिम पुष्टि संपर्क के बाद की जाएगी।
          </p>
        </div>
      </form>

      {loginRequired && (
        <BookingAuthDialog onClose={() => setLoginRequired(false)} />
      )}
    </>
  );
}

function BookingAuthDialog({ onClose }: { onClose: () => void }) {
  const callbackUrl =
    typeof window === "undefined" ? "/online-puja" : window.location.pathname;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-login-title"
      className="fixed inset-0 z-[70] grid place-items-center bg-[#2b1608]/65 p-4 backdrop-blur-sm"
    >
      <div className="relative w-full max-w-md overflow-hidden rounded-[30px] border border-[#ead8bc] bg-[#fffdf9] shadow-[0_30px_100px_rgba(38,17,5,0.3)]">
        <div className="h-1.5 bg-[#963a16]" />

        <div className="p-6 sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="grid h-14 w-14 place-items-center rounded-2xl border border-[#dfc28e] bg-[#f7e5c7] text-2xl text-[#873514]">
                ॐ
              </div>

              <p className="mt-5 text-[11px] font-bold uppercase tracking-[0.2em] text-[#a66b36]">
                Secure Booking
              </p>

              <h2
                id="booking-login-title"
                className="mt-1 text-2xl font-extrabold text-[#51230f]"
              >
                पहले लॉगिन करें
              </h2>
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="डायलॉग बंद करें"
              className="grid h-10 w-10 place-items-center rounded-xl text-2xl text-[#6d371b] transition hover:bg-[#fff4df]"
            >
              ×
            </button>
          </div>

          <p className="mt-4 text-sm leading-6 text-[#795a41]">
            बुकिंग पूरी करने के लिए कृपया पहले लॉगिन करें। आपका भरा हुआ फॉर्म
            इसी ब्राउज़र में सुरक्षित रखा गया है।
          </p>

          <div className="mt-7 grid gap-3">
            <Link
              href={`/login?callbackUrl=${encodeURIComponent(callbackUrl)}`}
              className="rounded-2xl bg-[#963a16] px-5 py-3.5 text-center font-extrabold text-white shadow-[0_10px_24px_rgba(120,46,15,0.18)] transition hover:bg-[#7b2d10]"
            >
              लॉगिन करें
            </Link>

            <Link
              href={`/signup?callbackUrl=${encodeURIComponent(callbackUrl)}`}
              className="rounded-2xl border border-[#d8b98b] bg-white px-5 py-3.5 text-center font-bold text-[#542710] transition hover:bg-[#fff7e9]"
            >
              नया अकाउंट बनाएं
            </Link>

            <button
              type="button"
              onClick={() => void signIn("google", { callbackUrl })}
              className="rounded-2xl border border-[#d8b98b] bg-white px-5 py-3.5 font-bold text-[#542710] transition hover:bg-[#fff7e9]"
            >
              <span className="mr-2">G</span>
              Google से जारी रखें
            </button>
          </div>

          <div className="mt-6 flex items-center justify-center gap-2 text-xs text-[#9a806c]">
            <span>🔒</span>
            आपका बुकिंग डेटा सुरक्षित रखा जाता है
          </div>
        </div>
      </div>
    </div>
  );
}

function SectionTitle({
  number,
  title,
}: {
  number: string;
  title: string;
}) {
  return (
    <h2 className="mb-5 flex items-center gap-3 text-lg font-extrabold text-[#51230f]">
      <span className="grid h-8 w-8 place-items-center rounded-full border border-[#dfc28e] bg-[#f7e5c7] text-sm text-[#8b3516]">
        {number}
      </span>

      <span>{title}</span>

      <span className="h-px flex-1 bg-[#eadfcf]" />
    </h2>
  );
}

function Divider() {
  return (
    <div className="my-9 flex items-center gap-4">
      <div className="h-px flex-1 bg-[#eadfcf]" />

      <span className="text-xs text-[#c29457]">✦</span>

      <div className="h-px flex-1 bg-[#eadfcf]" />
    </div>
  );
}

function TrustBadge({ text }: { text: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-[#e5d1af] bg-white px-3 py-1.5 text-xs font-semibold text-[#795033]">
      <span className="text-[#b47736]">✓</span>
      {text}
    </span>
  );
}

type CommonProps = {
  label: string;
  name: FieldName;
  value: string;
  onChange: (name: FieldName, value: string) => void;
  error?: string;
  required?: boolean;
  optional?: boolean;
  placeholder?: string;
  type?: string;
  inputMode?: "numeric";
  min?: string;
};

function Field({
  label,
  name,
  value,
  onChange,
  error,
  required,
  optional,
  placeholder,
  type = "text",
  inputMode,
  min,
}: CommonProps) {
  const id = String(name);

  return (
    <div>
      <label
        htmlFor={id}
        className="text-sm font-bold text-[#542710]"
      >
        {label}{" "}

        {required && (
          <span aria-hidden="true" className="text-[#af3d20]">
            *
          </span>
        )}

        {optional && (
          <span className="font-normal text-[#80654d]">
            {" "}
            (वैकल्पिक)
          </span>
        )}
      </label>

      <input
        id={id}
        name={id}
        type={type}
        value={value}
        min={min}
        inputMode={inputMode}
        onChange={(e) => onChange(name, e.target.value)}
        placeholder={placeholder}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`${inputClass} ${
          error ? "border-red-500" : "border-[#d8b98b]"
        }`}
      />

      <FieldError id={`${id}-error`} error={error} />
    </div>
  );
}

function TextArea({
  label,
  name,
  value,
  onChange,
  error,
  required,
  optional,
  placeholder,
}: CommonProps) {
  const id = String(name);

  return (
    <div>
      <label
        htmlFor={id}
        className="text-sm font-bold text-[#542710]"
      >
        {label}{" "}

        {required && (
          <span aria-hidden="true" className="text-[#af3d20]">
            *
          </span>
        )}

        {optional && (
          <span className="font-normal text-[#80654d]">
            {" "}
            (वैकल्पिक)
          </span>
        )}
      </label>

      <textarea
        id={id}
        name={id}
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
        placeholder={placeholder}
        rows={4}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`${inputClass} min-h-28 resize-y py-3 ${
          error ? "border-red-500" : "border-[#d8b98b]"
        }`}
      />

      <FieldError id={`${id}-error`} error={error} />
    </div>
  );
}

function SelectField({
  label,
  name,
  value,
  onChange,
  error,
  required,
  options,
}: CommonProps & { options: [string, string][] }) {
  const id = String(name);

  return (
    <div>
      <label
        htmlFor={id}
        className="text-sm font-bold text-[#542710]"
      >
        {label}{" "}

        {required && (
          <span aria-hidden="true" className="text-[#af3d20]">
            *
          </span>
        )}
      </label>

      <select
        id={id}
        name={id}
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`${inputClass} ${
          error ? "border-red-500" : "border-[#d8b98b]"
        }`}
      >
        <option value="">चुनें</option>

        {options.map(([optionValue, optionLabel]) => (
          <option key={optionValue} value={optionValue}>
            {optionLabel}
          </option>
        ))}
      </select>

      <FieldError id={`${id}-error`} error={error} />
    </div>
  );
}