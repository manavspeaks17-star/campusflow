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
  placed: "Awaiting partner",
  partner_matched: "Accepted",
  preparing: "Merchant preparing",
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

export default function PartnerDashboard() {
  const [ready, setReady] = useState(false);
  const [order, setOrder] = useState<Order | null>(null);
  const [otpInput, setOtpInput] = useState("");
  const [otpError, setOtpError] = useState(false);

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

  function acceptOrder() {
    const current = readOrder();
    if (!current) return;

    const updated = {
      ...current,
      status: "partner_matched" as OrderStatus,
      partnerAccepted: true,
      partnerName: "Altamas Raza",
      otp: current.otp ?? "4827",
    };

    localStorage.setItem("campusflow_order", JSON.stringify(updated));
    setOrder(updated);
  }

  function updateStatus(nextStatus: OrderStatus) {
    const current = readOrder();
    if (!current) return;

    const updated = { ...current, status: nextStatus };
    localStorage.setItem("campusflow_order", JSON.stringify(updated));
    setOrder(updated);
  }

  function verifyAndDeliver() {
    const current = readOrder();
    if (!current) return;

    if (otpInput !== (current.otp ?? "4827")) {
      setOtpError(true);
      return;
    }

    setOtpError(false);

    const updated = {
      ...current,
      status: "delivered" as OrderStatus,
    };

    localStorage.setItem("campusflow_order", JSON.stringify(updated));
    setOrder(updated);
    setOtpInput("");
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
            Partner account · Altamas Raza
          </p>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight">
            Delivery Partner Dashboard
          </h1>
          <p className="mt-3 max-w-2xl text-zinc-600">
            Accept compatible campus journeys and complete verified handoffs.
          </p>
        </section>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {[
            ["₹19.50", "Current reward"],
            ["8", "Deliveries completed"],
            ["₹156", "Earned today"],
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
          <h2 className="text-xl font-semibold">Compatible journey</h2>
          <p className="mt-1 text-sm text-zinc-500">
            Matching students with journeys already on their route
          </p>

          <div className="mt-6">
            {!order ? (
              <div className="rounded-2xl bg-zinc-50 p-5 text-sm text-zinc-500">
                No order available yet. Place an order from the Student account.
              </div>
            ) : (
              <div className="rounded-2xl bg-zinc-50 p-5">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <div className="text-lg font-semibold">
                      #{order.id} · {order.shop}
                    </div>
                    <div className="mt-2 text-sm text-zinc-500">
                      {order.items
                        .map(
                          (item) =>
                            `${item.quantity} × ${item.product.name}`
                        )
                        .join(" · ")}
                    </div>
                    <div className="mt-2 text-sm text-zinc-500">
                      Destination · {order.destination}
                    </div>
                  </div>

                  <div className="rounded-full bg-white px-4 py-2 text-sm font-semibold">
                    {labels[order.status]}
                  </div>
                </div>

                {!order.partnerAccepted && order.status === "placed" && (
                  <div className="mt-6">
                    <button
                      onClick={acceptOrder}
                      className="rounded-full bg-zinc-950 px-5 py-2.5 text-sm font-semibold text-white"
                    >
                      Accept order · ₹19.50
                    </button>
                  </div>
                )}

                {order.partnerAccepted && (
                  <>
                    <div className="mt-6 flex flex-wrap gap-2">
                      <button
                        onClick={() => updateStatus("picked_up")}
                        disabled={!["ready", "picked_up"].includes(order.status)}
                        className="rounded-full border border-zinc-300 bg-white px-4 py-2 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        Mark picked up
                      </button>
                    </div>

                    <div className="mt-6 rounded-2xl border border-zinc-200 bg-white p-5">
                      <div className="text-sm font-semibold">
                        OTP verification
                      </div>
                      <p className="mt-1 text-xs text-zinc-500">
                        Enter the customer handoff OTP to complete delivery.
                      </p>

                      <div className="mt-4 flex flex-wrap gap-2">
                        <input
                          value={otpInput}
                          onChange={(e) => {
                            setOtpInput(e.target.value);
                            setOtpError(false);
                          }}
                          inputMode="numeric"
                          maxLength={4}
                          placeholder="4-digit OTP"
                          className="w-36 rounded-xl border border-zinc-300 px-4 py-2.5 text-sm outline-none focus:border-zinc-900"
                        />
                        <button
                          onClick={verifyAndDeliver}
                          disabled={order.status !== "picked_up"}
                          className="rounded-xl bg-zinc-950 px-4 py-2.5 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-40"
                        >
                          Verify & deliver
                        </button>
                      </div>

                      {otpError && (
                        <div className="mt-3 text-xs font-medium text-red-600">
                          Incorrect OTP. Use the customer's demo OTP: 4827.
                        </div>
                      )}

                      {order.status === "delivered" && (
                        <div className="mt-4 rounded-xl bg-emerald-50 p-3 text-sm font-semibold text-emerald-700">
                          ✓ OTP verified · Order delivered · ₹19.50 earned
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </section>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold">Reliability</h2>
            <p className="mt-2 text-sm text-zinc-500">
              Successful handoffs, OTP verification and on-time delivery build
              trust.
            </p>
            <div className="mt-5 text-3xl font-semibold">98%</div>
            <div className="text-sm text-zinc-500">on-time completion</div>
          </div>

          <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold">Smart matching</h2>
            <p className="mt-2 text-sm leading-6 text-zinc-500">
              CampusFlow prioritizes verified students already heading toward
              the order destination instead of sending a separate courier.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
