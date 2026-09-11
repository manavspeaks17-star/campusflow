"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getDemoAccount } from "@/lib/demo-auth";
export default function PartnerDashboard(){
  const [ready, setReady] = useState(false);
  const [order, setOrder] = useState<any>(null);
  const [status, setStatus] = useState("Available");

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

    const rawOrder = localStorage.getItem("campusflow_order");
    if (rawOrder) {
      try {
        const saved = JSON.parse(rawOrder);
        setOrder(saved);
        setStatus(saved.status ?? "placed");
      } catch {
        localStorage.removeItem("campusflow_order");
      }
    }

    setReady(true);
  }, []);

  function updatePartnerStatus(nextStatus: string) {
    setStatus(nextStatus);

    const rawOrder = localStorage.getItem("campusflow_order");
    if (!rawOrder) return;

    try {
      const saved = JSON.parse(rawOrder);
      const updated = {
        ...saved,
        status: nextStatus.toLowerCase().replaceAll(" ", "_"),
        partnerAccepted: true,
      };
      localStorage.setItem("campusflow_order", JSON.stringify(updated));
      setOrder(updated);
    } catch {}
  }

  if (!ready) {
    return <main className="min-h-screen bg-zinc-50" />;
  }return <main className="min-h-screen bg-zinc-50 text-zinc-950"><div className="mx-auto max-w-6xl px-6 py-8"><header className="flex items-center justify-between"><Link href="/" className="text-xl font-semibold">CampusFlow</Link><nav className="flex gap-2 text-sm"><Link href="/" className="rounded-full px-4 py-2 hover:bg-zinc-200">Home</Link><Link href="/about" className="rounded-full px-4 py-2 hover:bg-zinc-200">About</Link></nav></header><section className="mt-12"><p className="text-sm font-medium text-zinc-500">Partner account · Altamas Raza</p><h1 className="mt-2 text-4xl font-semibold tracking-tight">Delivery Partner Dashboard</h1><p className="mt-3 max-w-2xl text-zinc-600">Turn journeys you already make across campus into flexible earning opportunities.</p></section><div className="mt-8 grid gap-4 sm:grid-cols-3">{[["₹19.50","Current reward"],["8","Deliveries completed"],["₹156","Earned today"]].map(([v,l])=><div key={l} className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm"><div className="text-3xl font-semibold">{v}</div><div className="mt-1 text-sm text-zinc-500">{l}</div></div>)}</div><section className="mt-8 rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
  <h2 className="text-xl font-semibold">Compatible journey</h2>
  <p className="mt-1 text-sm text-zinc-500">Students heading toward the same destination</p>

  <div className="mt-6 rounded-2xl bg-zinc-50 p-5">
    {order ? (
      <>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="text-lg font-medium">#2048 · {order.shop}</div>
            <div className="mt-1 text-sm text-zinc-500">
              {order.items?.map((item: any) => `${item.quantity} × ${item.product.name}`).join(" · ")}
            </div>
            <div className="mt-2 text-sm text-zinc-500">
              {order.destination}
            </div>
          </div>

          <div className="rounded-full bg-white px-4 py-2 text-sm font-semibold">
            {status}
          </div>
        </div>

        <p className="mt-4 text-sm text-zinc-500">
          You are already travelling toward {order.destination}.
        </p>

        <div className="mt-5 flex flex-wrap gap-3">
          <button
            onClick={() => updatePartnerStatus("Accepted")}
            className="rounded-full bg-zinc-950 px-5 py-2.5 text-sm font-semibold text-white"
          >
            Accept order · ₹19.50
          </button>

          <button
            onClick={() => updatePartnerStatus("Picked up")}
            className="rounded-full border border-zinc-300 bg-white px-5 py-2.5 text-sm font-semibold"
          >
            Mark picked up
          </button>

          <button
            onClick={() => updatePartnerStatus("Delivered")}
            className="rounded-full border border-zinc-300 bg-white px-5 py-2.5 text-sm font-semibold"
          >
            Mark delivered
          </button>
        </div>
      </>
    ) : (
      <div className="text-sm text-zinc-500">
        No compatible order yet. A student order will appear here when a matching journey is available.
      </div>
    )}
  </div>
</section><div className="mt-8 grid gap-4 md:grid-cols-2"><div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm"><h2 className="text-xl font-semibold">Reliability</h2><p className="mt-2 text-sm text-zinc-500">Successful handoffs, OTP verification and on-time delivery build trust.</p><div className="mt-5 text-3xl font-semibold">98%</div><div className="text-sm text-zinc-500">on-time completion</div></div><div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm"><h2 className="text-xl font-semibold">Smart matching</h2><p className="mt-2 text-sm leading-6 text-zinc-500">CampusFlow prioritizes verified students already heading toward the order destination instead of sending a separate courier.</p></div></div></div></main>}
