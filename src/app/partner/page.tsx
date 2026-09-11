"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getDemoAccount } from "@/lib/demo-auth";
export default function PartnerDashboard(){
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const account = getDemoAccount();

    if (!account) {
      window.location.href = "/welcome";
      return;
    }

    if (account.role !== "Partner") {
      window.location.href =
        account.role === "Student"
          ? "/"
          : account.role === "Merchant"
          ? "/merchant"
          : "/dev";
      return;
    }

    setReady(true);
  }, []);

  if (!ready) {
    return <main className="min-h-screen bg-zinc-50" />;
  }return <main className="min-h-screen bg-zinc-50 text-zinc-950"><div className="mx-auto max-w-6xl px-6 py-8"><header className="flex items-center justify-between"><Link href="/" className="text-xl font-semibold">CampusFlow</Link><nav className="flex gap-2 text-sm"><Link href="/" className="rounded-full px-4 py-2 hover:bg-zinc-200">Home</Link><Link href="/about" className="rounded-full px-4 py-2 hover:bg-zinc-200">About</Link></nav></header><section className="mt-12"><p className="text-sm font-medium text-zinc-500">Partner account · Altamas Raza</p><h1 className="mt-2 text-4xl font-semibold tracking-tight">Delivery Partner Dashboard</h1><p className="mt-3 max-w-2xl text-zinc-600">Turn journeys you already make across campus into flexible earning opportunities.</p></section><div className="mt-8 grid gap-4 sm:grid-cols-3">{[["₹19.50","Current reward"],["8","Deliveries completed"],["₹156","Earned today"]].map(([v,l])=><div key={l} className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm"><div className="text-3xl font-semibold">{v}</div><div className="mt-1 text-sm text-zinc-500">{l}</div></div>)}</div><section className="mt-8 rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm"><h2 className="text-xl font-semibold">Compatible journey</h2><p className="mt-1 text-sm text-zinc-500">The Food Court → Hostel 1</p><div className="mt-6 rounded-2xl bg-zinc-50 p-5"><div className="text-lg font-medium">#2048 · Chicken Burger + Fries</div><div className="mt-2 text-sm text-zinc-500">You are already travelling toward Hostel 1.</div><div className="mt-5 flex gap-3"><button className="rounded-full bg-zinc-950 px-5 py-2.5 text-sm text-white">Accept · ₹19.50</button><button className="rounded-full border border-zinc-300 px-5 py-2.5 text-sm">View route</button></div></div></section><div className="mt-8 grid gap-4 md:grid-cols-2"><div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm"><h2 className="text-xl font-semibold">Reliability</h2><p className="mt-2 text-sm text-zinc-500">Successful handoffs, OTP verification and on-time delivery build trust.</p><div className="mt-5 text-3xl font-semibold">98%</div><div className="text-sm text-zinc-500">on-time completion</div></div><div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm"><h2 className="text-xl font-semibold">Smart matching</h2><p className="mt-2 text-sm leading-6 text-zinc-500">CampusFlow prioritizes verified students already heading toward the order destination instead of sending a separate courier.</p></div></div></div></main>}
