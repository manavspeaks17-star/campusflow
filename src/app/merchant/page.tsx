"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { clearDemoAccount, getDemoAccount } from "@/lib/demo-auth";

type OrderStatus =
  | "placed"
  | "partner_matched"
  | "preparing"
  | "ready"
  | "picked_up"
  | "delivered";

type OrderItem = {
  product: {
    id: number;
    name: string;
    price: number;
    shop: string;
  };
  quantity: number;
};

type Order = {
  id: number;
  shop: string;
  destination: string;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  partnerAccepted?: boolean;
  partnerName?: string;
  otp?: string;
  createdAt?: string;
};

const labels: Record<OrderStatus, string> = {
  placed: "New order",
  partner_matched: "Partner accepted",
  preparing: "Preparing",
  ready: "Ready for pickup",
  picked_up: "Picked up",
  delivered: "Delivered",
};

function readOrder(): Order | null {
  try {
    const raw = localStorage.getItem("campusflow_order");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export default function MerchantDashboard() {
  const [ready, setReady] = useState(false);
  const [order, setOrder] = useState<Order | null>(null);

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

    setOrder(readOrder());
    setReady(true);

    const refresh = () => setOrder(readOrder());
    window.addEventListener("focus", refresh);
    const timer = window.setInterval(refresh, 1000);

    return () => {
      window.removeEventListener("focus", refresh);
      window.clearInterval(timer);
    };
  }, []);

  function updateStatus(nextStatus: OrderStatus) {
    const current = readOrder();
    if (!current) return;

    const updated = { ...current, status: nextStatus };
    localStorage.setItem("campusflow_order", JSON.stringify(updated));
    setOrder(updated);
  }

  function signOut() {
    clearDemoAccount();
    window.location.href = "/welcome";
  }

  if (!ready) {
    return <main className="min-h-screen bg-zinc-50" />;
  }

  return (
    <main className="min-h-screen bg-zinc-50 text-zinc-950">
      <div className="mx-auto max-w-6xl px-6 py-8">
        <header className="flex items-center justify-between">
          <Link href="/" className="text-xl font-semibold">
            CampusFlow
          </Link>

          <div className="flex gap-2">
            <Link
              href="/about"
              className="rounded-full px-4 py-2 text-sm hover:bg-zinc-200"
            >
              About
            </Link>
            <button
              onClick={signOut}
              className="rounded-full bg-zinc-950 px-4 py-2 text-sm font-semibold text-white"
            >
              Sign out
            </button>
          </div>
        </header>

        <section className="mt-12">
          <p className="text-sm font-medium text-zinc-500">
            Merchant account · Ridhima Sharma
          </p>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight">
            Merchant Dashboard
          </h1>
          <p className="mt-3 max-w-2xl text-zinc-600">
            Manage incoming orders, partner handoffs and preparation status.
          </p>
        </section>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {[
            ["12", "Orders today"],
            ["4", "Preparing"],
            ["₹8,460", "Today’s sales"],
          ].map(([value, label]) => (
            <div
              key={label}
              className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm"
            >
              <div className="text-3xl font-semibold">{value}</div>
              <div className="mt-1 text-sm text-zinc-500">{label}</div>
            </div>
          ))}
        </div>

        <section className="mt-8 rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold">Live order queue</h2>
              <p className="mt-1 text-sm text-zinc-500">
                The Food Court · verified merchant
              </p>
            </div>

            {order && (
              <div className="rounded-full bg-zinc-100 px-4 py-2 text-xs font-semibold">
                {labels[order.status]}
              </div>
            )}
          </div>

          <div className="mt-6">
            {!order ? (
              <div className="rounded-2xl bg-zinc-50 p-5 text-sm text-zinc-500">
                No student order yet. Place an order from the Student account.
              </div>
            ) : (
              <div className="rounded-2xl bg-zinc-50 p-5">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <div className="text-lg font-semibold">
                      #{order.id} · {order.shop}
                    </div>
                    <div className="mt-1 text-sm text-zinc-500">
                      Deliver to {order.destination} · ₹{order.total}
                    </div>
                    <div className="mt-2 text-sm text-zinc-500">
                      {order.items
                        .map(
                          (item) =>
                            `${item.quantity} × ${item.product.name}`
                        )
                        .join(" · ")}
                    </div>
                  </div>

                  <div className="rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-right">
                    <div className="text-[10px] uppercase tracking-wider text-zinc-400">
                      Partner
                    </div>
                    <div className="mt-1 text-sm font-semibold">
                      {order.partnerAccepted
                        ? order.partnerName ?? "Altamas Raza"
                        : "Waiting for partner"}
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <div className="text-xs font-medium uppercase tracking-wider text-zinc-400">
                    Order status
                  </div>

                  <div className="mt-3 flex flex-wrap gap-2">
                    <button
                      onClick={() => updateStatus("preparing")}
                      disabled={
                        !order.partnerAccepted ||
                        !["partner_matched", "preparing"].includes(order.status)
                      }
                      className="rounded-full border border-zinc-300 bg-white px-4 py-2 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      Mark preparing
                    </button>

                    <button
                      onClick={() => updateStatus("ready")}
                      disabled={!["preparing", "ready"].includes(order.status)}
                      className="rounded-full bg-zinc-950 px-4 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      Mark ready
                    </button>
                  </div>

                  <div className="mt-5 grid gap-2 sm:grid-cols-6">
                    {(
                      [
                        ["placed", "New"],
                        ["partner_matched", "Partner"],
                        ["preparing", "Preparing"],
                        ["ready", "Ready"],
                        ["picked_up", "Picked up"],
                        ["delivered", "Delivered"],
                      ] as [OrderStatus, string][]
                    ).map(([value, label]) => (
                      <button
                        key={value}
                        onClick={() => updateStatus(value)}
                        className={`rounded-xl px-3 py-2 text-xs font-semibold ${
                          order.status === value
                            ? "bg-zinc-950 text-white"
                            : "bg-white text-zinc-600 ring-1 ring-zinc-200"
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>

                {order.status === "delivered" && (
                  <div className="mt-5 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800">
                    ✓ Delivery completed with OTP verification.
                  </div>
                )}
              </div>
            )}
          </div>
        </section>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold">Shop management</h2>
            <p className="mt-2 text-sm text-zinc-500">
              Add products, change prices, pause items and control what
              students can order.
            </p>
            <div className="mt-5 flex gap-2">
              <button
                onClick={() => alert("Add product flow ready for integration.")}
                className="rounded-full bg-zinc-950 px-4 py-2 text-sm text-white"
              >
                Add product
              </button>
              <button
                onClick={() => alert("Catalogue editor ready for integration.")}
                className="rounded-full border border-zinc-300 px-4 py-2 text-sm"
              >
                Edit catalogue
              </button>
            </div>
          </div>

          <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold">Pre-orders</h2>
            <p className="mt-2 text-sm text-zinc-500">
              See ready-by times so orders can be prepared before pickup.
            </p>
            <div className="mt-5 rounded-2xl bg-zinc-50 p-4 text-sm">
              <b>⚡ 3 pre-orders</b> · next ready by 1:15 PM
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
