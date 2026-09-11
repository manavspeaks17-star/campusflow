"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getDemoAccount } from "@/lib/demo-auth";
export default function MerchantDashboard(){
  const [ready, setReady] = useState(false);
  const [order, setOrder] = useState<any>(null);
  const [status, setStatus] = useState("New");

  useEffect(() => {
    const account = getDemoAccount();

    if (!account) {
      window.location.href = "/welcome";
      return;
    }

    if (account.role !== "Merchant") {
      window.location.href =
        account.role === "Student"
          ? "/"
          : account.role === "Partner"
          ? "/partner"
          : "/dev";
      return;
    }

    const rawOrder = localStorage.getItem("campusflow_order");
    if (rawOrder) {
      try {
        const saved = JSON.parse(rawOrder);
        setOrder(saved);
        setStatus(saved.status === "placed" ? "New" : saved.status ?? "New");
      } catch {
        localStorage.removeItem("campusflow_order");
      }
    }

    setReady(true);
  }, []);

  function updateOrderStatus(nextStatus: string) {
    setStatus(nextStatus);

    const rawOrder = localStorage.getItem("campusflow_order");
    if (!rawOrder) return;

    try {
      const saved = JSON.parse(rawOrder);
      const updated = { ...saved, status: nextStatus.toLowerCase().replaceAll(" ", "_") };
      localStorage.setItem("campusflow_order", JSON.stringify(updated));
      setOrder(updated);
    } catch {}
  }

  if (!ready) {
    return <main className="min-h-screen bg-zinc-50" />;
  }return <main className="min-h-screen bg-zinc-50 text-zinc-950"><div className="mx-auto max-w-6xl px-6 py-8"><header className="flex items-center justify-between"><Link href="/" className="text-xl font-semibold">CampusFlow</Link><nav className="flex gap-2 text-sm"><Link href="/" className="rounded-full px-4 py-2 hover:bg-zinc-200">Home</Link><Link href="/about" className="rounded-full px-4 py-2 hover:bg-zinc-200">About</Link></nav></header><section className="mt-12"><p className="text-sm font-medium text-zinc-500">Merchant account · Ridhima Sharma</p><h1 className="mt-2 text-4xl font-semibold tracking-tight">Merchant Dashboard</h1><p className="mt-3 max-w-2xl text-zinc-600">Manage your campus shop, incoming orders and preparation queue from one place.</p></section><div className="mt-8 grid gap-4 sm:grid-cols-3">{[["12","Orders today"],["4","Preparing"],["₹8,460","Today’s sales"]].map(([v,l])=><div key={l} className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm"><div className="text-3xl font-semibold">{v}</div><div className="mt-1 text-sm text-zinc-500">{l}</div></div>)}</div><section className="mt-8 rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
  <h2 className="text-xl font-semibold">Live order queue</h2>
  <p className="mt-1 text-sm text-zinc-500">The Food Court · verified merchant</p>

  <div className="mt-6 rounded-2xl bg-zinc-50 p-5">
    {order ? (
      <>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="font-medium">#2048 · {order.shop}</div>
            <div className="mt-1 text-sm text-zinc-500">
              Deliver to {order.destination} · ₹{order.total}
            </div>
          </div>
          <div className="rounded-full bg-white px-4 py-2 text-sm font-semibold">
            {status}
          </div>
        </div>

        <div className="mt-4 text-sm text-zinc-600">
          {order.items?.map((item: any) => (
            <div key={item.product.id}>
              {item.quantity} × {item.product.name}
            </div>
          ))}
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          <button
            onClick={() => updateOrderStatus("Accepted")}
            className="rounded-full bg-zinc-950 px-4 py-2 text-sm font-semibold text-white"
          >
            Accept order
          </button>
          <button
            onClick={() => updateOrderStatus("Preparing")}
            className="rounded-full border border-zinc-300 bg-white px-4 py-2 text-sm font-semibold"
          >
            Mark preparing
          </button>
          <button
            onClick={() => updateOrderStatus("Ready")}
            className="rounded-full border border-zinc-300 bg-white px-4 py-2 text-sm font-semibold"
          >
            Mark ready
          </button>
        </div>
      </>
    ) : (
      <div className="text-sm text-zinc-500">
        No live student order yet. Place an order from the Student dashboard to see it here.
      </div>
    )}
  </div>
</section><div className="mt-8 grid gap-4 md:grid-cols-2"><div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm"><h2 className="text-xl font-semibold">Shop management</h2><p className="mt-2 text-sm text-zinc-500">Add products, change prices, pause items and control what students can order.</p><div className="mt-5 flex gap-2"><button className="rounded-full bg-zinc-950 px-4 py-2 text-sm text-white">Add product</button><button className="rounded-full border border-zinc-300 px-4 py-2 text-sm">Edit catalogue</button></div></div><div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm"><h2 className="text-xl font-semibold">Pre-orders</h2><p className="mt-2 text-sm text-zinc-500">See ready-by times so orders can be prepared before pickup.</p><div className="mt-5 rounded-2xl bg-zinc-50 p-4 text-sm"><b>⚡ 3 pre-orders</b> · next ready by 1:15 PM</div></div></div></div></main>}
