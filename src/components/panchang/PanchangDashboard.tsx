"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import PanchangCalendar from "@/components/panchang/PanchangCalendar";
import PanchangDetails from "@/components/panchang/PanchangDetails";
import PanchangError from "@/components/panchang/PanchangError";
import PanchangSkeleton from "@/components/panchang/PanchangSkeleton";
import FestivalList from "@/components/panchang/FestivalList";
import LocationSelector from "@/components/panchang/LocationSelector";
import type { MonthlyOverview, PanchangApiResponse, PanchangData, PanchangLocation } from "@/lib/panchang/types";

const defaultLocation: PanchangLocation = { city: "उज्जैन", state: "मध्य प्रदेश", country: "भारत", latitude: 23.1765, longitude: 75.7885, timezone: "Asia/Kolkata" };
const dateExpression = /^\d{4}-\d{2}-\d{2}$/;
const weekday = new Intl.DateTimeFormat("hi-IN", { weekday: "long" });
const dateTitle = new Intl.DateTimeFormat("hi-IN", { day: "numeric", month: "long", year: "numeric" });
function dateFrom(value: string) { return new Date(`${value}T12:00:00`); }
function today() { return new Date().toISOString().slice(0, 10); }
function query(location: PanchangLocation) { return `lat=${encodeURIComponent(location.latitude)}&lon=${encodeURIComponent(location.longitude)}`; }

export default function PanchangDashboard() {
  const [mounted, setMounted] = useState(false);
  const [selectedDate, setSelectedDate] = useState(""); const [location, setLocation] = useState(defaultLocation);
  const [year, setYear] = useState(0); const [month, setMonth] = useState(0);
  const [details, setDetails] = useState<PanchangData>(); const [overview, setOverview] = useState<MonthlyOverview>(); const [detailsError, setDetailsError] = useState(false); const [monthError, setMonthError] = useState(false); const [loadingDetails, setLoadingDetails] = useState(true); const [loadingMonth, setLoadingMonth] = useState(true);
  const detailsRequest = useRef<AbortController | null>(null); const monthRequest = useRef<AbortController | null>(null);

  useEffect(() => {
    const urlDate = new URLSearchParams(window.location.search).get("date");
    const initialDate = urlDate?.match(dateExpression) ? urlDate : today();
    const d = dateFrom(initialDate);
    setSelectedDate(initialDate);
    setYear(d.getFullYear());
    setMonth(d.getMonth() + 1);
    setMounted(true);
  }, []);

  const loadDetails = useCallback(async () => {
    detailsRequest.current?.abort(); const controller = new AbortController(); detailsRequest.current = controller;
    setLoadingDetails(true); setDetailsError(false);
    try { const response = await fetch(`/api/panchang?view=details&date=${selectedDate}&${query(location)}`, { signal: controller.signal }); if (!response.ok) throw new Error("request failed"); const body = await response.json() as PanchangApiResponse; if (!body.details) throw new Error("missing details"); setDetails(body.details); }
    catch (error) { if ((error as Error).name !== "AbortError") { setDetails(undefined); setDetailsError(true); } }
    finally { if (!controller.signal.aborted) setLoadingDetails(false); }
  }, [location, selectedDate]);
  const loadMonth = useCallback(async () => {
    monthRequest.current?.abort(); const controller = new AbortController(); monthRequest.current = controller;
    setLoadingMonth(true); setMonthError(false);
    try { const response = await fetch(`/api/panchang?view=month&year=${year}&month=${month}&${query(location)}`, { signal: controller.signal }); if (!response.ok) throw new Error("request failed"); const body = await response.json() as PanchangApiResponse; if (!body.month) throw new Error("missing month"); setOverview(body.month); }
    catch (error) { if ((error as Error).name !== "AbortError") { setOverview(undefined); setMonthError(true); } }
    finally { if (!controller.signal.aborted) setLoadingMonth(false); }
  }, [location, month, year]);
  useEffect(() => { const timer = window.setTimeout(() => void loadDetails(), 180); return () => { window.clearTimeout(timer); detailsRequest.current?.abort(); }; }, [loadDetails]);
  useEffect(() => { const timer = window.setTimeout(() => void loadMonth(), 180); return () => { window.clearTimeout(timer); monthRequest.current?.abort(); }; }, [loadMonth]);
  useEffect(() => { if (!mounted) return; const url = new URL(window.location.href); url.searchParams.set("date", selectedDate); window.history.replaceState({}, "", url); }, [selectedDate, mounted]);

  const changeMonth = (delta: number) => { const next = new Date(year, month - 1 + delta, 1); setYear(next.getFullYear()); setMonth(next.getMonth() + 1); };
  const selectDate = (date: string) => { setSelectedDate(date); const selected = dateFrom(date); if (selected.getFullYear() !== year || selected.getMonth() + 1 !== month) { setYear(selected.getFullYear()); setMonth(selected.getMonth() + 1); } };
  const selectedFestivals = overview?.days.find((day) => day.date === selectedDate)?.markers ?? [];
  const share = async () => { const url = `${window.location.origin}/panchang?date=${selectedDate}`; const title = `पंचांग — ${dateTitle.format(dateFrom(selectedDate))}`; try { if (navigator.share) await navigator.share({ title, text: `${title}, ${location.city}`, url }); else await navigator.clipboard.writeText(url); } catch { /* The user can continue without sharing. */ } };

  if (!mounted) return <div className="bg-[#fff9f0] pb-16 lg:pb-24"><section className="border-b border-amber-100 bg-[radial-gradient(ellipse_at_top,#f6dfa9,transparent_70%)] px-5 py-12 sm:px-8 sm:py-16 lg:px-12"><div className="mx-auto max-w-7xl"><p className="text-sm font-bold tracking-[0.16em] text-[#a85e25]">वैदिक दिनचर्या</p><h1 className="mt-3 text-4xl font-bold tracking-tight text-[#51230f] sm:text-5xl">दैनिक पंचांग</h1><p className="mt-4 max-w-2xl text-lg leading-8 text-[#70401f]">आज का पंचांग, शुभ मुहूर्त, चौघड़िया और महत्वपूर्ण धार्मिक जानकारी</p></div></section><main className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:py-12"><PanchangSkeleton /></main></div>;

  const headingDate = dateFrom(selectedDate);

  return <div className="bg-[#fff9f0] pb-16 lg:pb-24"><section className="border-b border-amber-100 bg-[radial-gradient(ellipse_at_top,#f6dfa9,transparent_70%)] px-5 py-12 sm:px-8 sm:py-16 lg:px-12"><div className="mx-auto max-w-7xl"><p className="text-sm font-bold tracking-[0.16em] text-[#a85e25]">वैदिक दिनचर्या</p><h1 className="mt-3 text-4xl font-bold tracking-tight text-[#51230f] sm:text-5xl">दैनिक पंचांग</h1><p className="mt-4 max-w-2xl text-lg leading-8 text-[#70401f]">आज का पंचांग, शुभ मुहूर्त, चौघड़िया और महत्वपूर्ण धार्मिक जानकारी</p></div></section>
    <main className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:py-12"><section className="rounded-3xl border border-[#e3c697] bg-gradient-to-br from-[#8b3516] to-[#5c260e] p-6 text-amber-50 shadow-[0_18px_48px_rgba(94,45,14,0.24)] sm:p-8"><div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><p className="text-sm font-bold tracking-[0.16em] text-amber-200">आज का पंचांग</p><p className="mt-2 text-3xl font-bold sm:text-4xl">{dateTitle.format(headingDate)}</p><p className="mt-1 text-lg text-amber-100">{weekday.format(headingDate)}</p></div><div className="flex flex-wrap gap-2"><button type="button" onClick={() => selectDate(today())} className="min-h-10 rounded-xl bg-white/15 px-4 text-sm font-bold hover:bg-white/25">आज की तिथि</button><button type="button" onClick={() => void share()} className="min-h-10 rounded-xl border border-amber-100/50 px-4 text-sm font-bold hover:bg-white/10">पंचांग शेयर करें</button></div></div></section>
      <div className="mt-6"><LocationSelector location={location} onChange={setLocation} /></div>
      <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,0.86fr)_minmax(0,1.14fr)]"><div>{loadingMonth ? <PanchangSkeleton calendar /> : monthError ? <PanchangError onRetry={() => void loadMonth()} /> : <PanchangCalendar year={year} month={month} selectedDate={selectedDate} overview={overview} onMonthChange={changeMonth} onSelect={selectDate} />}<p className="mt-3 text-center text-xs text-[#85603c]">● व्रत, पर्व और उपलब्ध त्योहार के संकेत</p></div><div>{loadingDetails ? <PanchangSkeleton /> : detailsError || !details ? <PanchangError onRetry={() => void loadDetails()} /> : <PanchangDetails data={details} />}</div></div>
      <div className="mt-6">{!loadingMonth && !monthError && <FestivalList festivals={selectedFestivals} />}</div>
      <p className="mt-8 text-center text-xs text-[#85603c]">पंचांग जानकारी ShubhAI API से प्राप्त की जाती है। यह केवल सूचना हेतु है।</p>
    </main></div>;
}
