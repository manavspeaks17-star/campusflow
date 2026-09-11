"use client";

const accentEmoji = "🛒";

import Link from "next/link";
import { useState } from "react";

const shops = [{"name": "Le Broc", "service": "convenience retail store", "sourceItems": "everyday items,quick meals,and emergency supplies", "items": ["Everyday Items", "Quick Meals", "And Emergency Supplies"]}, {"name": "himalya wellness store", "service": "personal care store", "sourceItems": "medical items and care items", "items": ["Personal Care Kit", "Wellness Essentials", "First Aid Items", "Care Products"]}, {"name": "nivia", "service": "sports goods and apparels", "sourceItems": "all sports items", "items": ["Cricket Gear", "Football", "Sports Shoes", "Training Apparel"]}, {"name": "youth hub", "service": "clothing and accessories", "sourceItems": "clothes", "items": ["T-Shirts", "Hoodies", "Jeans", "Accessories"]}, {"name": "the gift gallery", "service": "gifts gallery", "sourceItems": "all gift items and packing of it", "items": ["Gift Hamper", "Greeting Cards", "Wrapping Paper", "Personalized Gifts"]}, {"name": "sonu fashion", "service": "apparels", "sourceItems": "different types of cloths", "items": ["T-Shirts", "Hoodies", "Jeans", "Accessories"]}, {"name": "sachdeva luggage handloom", "service": "luggage and handloom", "sourceItems": "luggages and bags", "items": ["Backpacks", "Travel Bags", "Luggage", "Handloom Items"]}, {"name": "gourav book depot", "service": "book store", "sourceItems": "stationary", "items": ["Notebooks", "Pens", "Markers", "Study Supplies"]}, {"name": "study solutions", "service": "book store", "sourceItems": "stationary", "items": ["Notebooks", "Pens", "Markers", "Study Supplies"]}, {"name": "fashion gallery", "service": "apparels and accessories", "sourceItems": "clothes", "items": ["T-Shirts", "Hoodies", "Jeans", "Accessories"]}, {"name": "jeans camp", "service": "apparels", "sourceItems": "jeans and pants of all sizes", "items": ["T-Shirts", "Hoodies", "Jeans", "Accessories"]}];

const slugify = (v: string) => v.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export default function Page() {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<string | null>(null);
  const filtered = shops.filter(s => s.name.toLowerCase().includes(query.toLowerCase()) || s.service.toLowerCase().includes(query.toLowerCase()));

  return (
    <main className="min-h-screen bg-[#f7f7f5] text-zinc-900">
      <header className="sticky top-0 z-50 border-b border-zinc-200/70 bg-[#f7f7f5]/90 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-900 text-sm font-bold text-white">C</div>
            <div><div className="font-semibold tracking-tight">CampusFlow</div><div className="text-[10px] uppercase tracking-[0.18em] text-zinc-400">LPU campus commerce</div></div>
          </Link>
          <nav className="flex items-center gap-1">
            <Link href="/food" className="rounded-full px-3 py-2 text-xs font-medium hover:bg-white">Food</Link>
            <Link href="/essentials" className="rounded-full px-3 py-2 text-xs font-medium hover:bg-white">Essentials</Link>
            <Link href="/unimall" className="rounded-full px-3 py-2 text-xs font-medium hover:bg-white">UniMall</Link>
            <Link href="/signup" className="ml-1 rounded-full bg-zinc-900 px-4 py-2 text-xs font-semibold text-white">Sign up</Link>
          </nav>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-10">
        <section className="rounded-[2rem] bg-zinc-900 p-8 text-white md:p-12">
          <div className="mb-4 inline-flex rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs text-zinc-300">🛒 CampusFlow directory</div>
          <h1 className="text-4xl font-semibold tracking-tight md:text-6xl">Essentials, when you need them.</h1>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-zinc-400">Browse campus retail, personal care, books, fashion and everyday essentials without crossing the campus.</p>
          <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search shops or services..." className="mt-7 w-full max-w-xl rounded-2xl bg-white/10 px-4 py-3 text-sm text-white outline-none placeholder:text-zinc-500"/>
        </section>

        <div className="mt-8 flex items-end justify-between">
          <div><p className="text-xs uppercase tracking-[0.18em] text-zinc-400">Shops</p><h2 className="mt-2 text-2xl font-semibold">{filtered.length} places to explore</h2></div>
          <span className="rounded-full bg-white px-4 py-2 text-xs text-zinc-500 ring-1 ring-zinc-200">Tap a shop to browse</span>
        </div>

        <section className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map(shop => (
            <Link key={shop.name} href={`/shop/${slugify(shop.name)}`} onClick={() => setSelected(shop.name)} className="group rounded-3xl border border-zinc-200 bg-white p-6 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-zinc-200/50">
              <div className="flex items-start justify-between gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-100 text-xl">{accentEmoji}</div>
                <span className="text-zinc-300 transition group-hover:text-zinc-900">↗</span>
              </div>
              <h3 className="mt-6 text-lg font-semibold capitalize">{shop.name}</h3>
              <p className="mt-1 text-xs font-medium uppercase tracking-wider text-zinc-400">{shop.service}</p>
              <p className="mt-4 line-clamp-2 text-sm text-zinc-500">{shop.sourceItems}</p>
              <div className="mt-5 text-xs font-semibold">Browse shop →</div>
            </Link>
          ))}
        </section>

        {selected && <div className="fixed bottom-5 left-1/2 z-50 -translate-x-1/2 rounded-full bg-zinc-900 px-5 py-3 text-xs font-medium text-white shadow-2xl">Opening {selected}…</div>}
      </div>
    </main>
  );
}
