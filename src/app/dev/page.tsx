"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getDemoAccount } from "@/lib/demo-auth";

export default function DevPage() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const account = getDemoAccount();

    if (!account) {
      window.location.href = "/welcome";
      return;
    }

    if (account.role !== "Developer") {
      window.location.href =
        account.role === "Student"
          ? "/"
          : account.role === "Merchant"
          ? "/merchant"
          : "/partner";
      return;
    }

    setReady(true);
  }, []);

  if (!ready) {
    return <main className="min-h-screen bg-zinc-50" />;
  }
  return (
    <main className="min-h-screen bg-zinc-50 text-zinc-950">
      <div className="mx-auto max-w-7xl px-6 py-8">
        <header className="flex items-center justify-between">
          <Link href="/" className="text-xl font-semibold tracking-tight">CampusFlow</Link>
          <nav className="flex flex-wrap gap-2 text-sm">
            <Link href="/" className="rounded-full border border-zinc-200 bg-white px-4 py-2">Student</Link>
            <Link href="/merchant" className="rounded-full border border-zinc-200 bg-white px-4 py-2">Merchant</Link>
            <Link href="/partner" className="rounded-full border border-zinc-200 bg-white px-4 py-2">Partner</Link>
            <Link href="/about" className="rounded-full bg-zinc-950 px-4 py-2 text-white">About</Link>
          </nav>
        </header>

        <section className="mt-12">
          <p className="text-sm font-medium text-zinc-500">Developer account · Manav</p>
          <h1 className="mt-2 text-5xl font-semibold tracking-tight">Dev Control Center</h1>
          <p className="mt-3 max-w-3xl text-zinc-600">Private developer view for the CampusFlow prototype. Every major experience is accessible from here.</p>
        </section>

        <div className="mt-10 grid gap-4 sm:grid-cols-4">
          {[
            ["49", "UniMall shops"],
            ["12", "Demo products"],
            ["3", "User roles"],
            ["₹10.50", "Platform example"],
          ].map(([value, label]) => (
            <div key={label} className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
              <div className="text-3xl font-semibold">{value}</div>
              <div className="mt-1 text-sm text-zinc-500">{label}</div>
            </div>
          ))}
        </div>

        <section className="mt-8 grid gap-4 md:grid-cols-3">
          <Link href="/" className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm hover:-translate-y-0.5">
            <div className="text-2xl">👤</div>
            <h2 className="mt-5 text-xl font-semibold">Student</h2>
            <p className="mt-2 text-sm leading-6 text-zinc-500">Food, Essentials, UniMall, ordering, pre-order and OTP delivery flow.</p>
            <span className="mt-5 inline-block text-sm font-medium">Open →</span>
          </Link>
          <Link href="/merchant" className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm hover:-translate-y-0.5">
            <div className="text-2xl">🏪</div>
            <h2 className="mt-5 text-xl font-semibold">Ridhima Sharma · Merchant</h2>
            <p className="mt-2 text-sm leading-6 text-zinc-500">Orders, preparation queue, catalogue and pre-orders.</p>
            <span className="mt-5 inline-block text-sm font-medium">Open →</span>
          </Link>
          <Link href="/partner" className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm hover:-translate-y-0.5">
            <div className="text-2xl">🛵</div>
            <h2 className="mt-5 text-xl font-semibold">Altamas Raza · Partner</h2>
            <p className="mt-2 text-sm leading-6 text-zinc-500">Compatible journeys, rewards, reliability and delivery.</p>
            <span className="mt-5 inline-block text-sm font-medium">Open →</span>
          </Link>
        </section>

        <section className="mt-8 rounded-3xl border border-zinc-200 bg-white p-7 shadow-sm">
          <h2 className="text-2xl font-semibold">Everything else</h2>
          <div className="mt-5 flex flex-wrap gap-2">
            <Link href="/food" className="rounded-full border border-zinc-300 px-4 py-2 text-sm">Food</Link>
            <Link href="/essentials" className="rounded-full border border-zinc-300 px-4 py-2 text-sm">Essentials</Link>
            <Link href="/unimall" className="rounded-full border border-zinc-300 px-4 py-2 text-sm">UniMall</Link>
            <Link href="/about" className="rounded-full border border-zinc-300 px-4 py-2 text-sm">About</Link>
            <Link href="/signup" className="rounded-full border border-zinc-300 px-4 py-2 text-sm">Accounts</Link>
          </div>
        </section>
      </div>
    </main>
  );
}
