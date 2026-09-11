"use client";

import Link from "next/link";
import { useEffect } from "react";


export default function WelcomePage() {
  useEffect(() => {
    // Welcome remains accessible so users can switch accounts.
  }, []);

  return (
    <main className="min-h-screen bg-[#f7f7f5] text-zinc-950">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col px-6 py-8">
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-950 text-sm font-bold text-white">
              C
            </div>
            <div>
              <div className="font-semibold tracking-tight">CampusFlow</div>
              <div className="text-[10px] uppercase tracking-[0.18em] text-zinc-400">
                LPU campus commerce
              </div>
            </div>
          </div>

          <Link
            href="/about"
            className="rounded-full border border-zinc-200 bg-white px-4 py-2 text-xs font-medium hover:bg-zinc-100"
          >
            About
          </Link>
        </header>

        <section className="flex flex-1 items-center py-20">
          <div className="grid w-full gap-12 lg:grid-cols-[1.2fr_.8fr] lg:items-center">
            <div>
              <div className="mb-6 inline-flex rounded-full border border-zinc-200 bg-white px-4 py-2 text-xs font-medium text-zinc-500">
                Built for campus movement
              </div>

              <h1 className="max-w-4xl text-5xl font-semibold tracking-tight md:text-7xl">
                Everything you need.
                <br />
                <span className="text-zinc-400">Already on your route.</span>
              </h1>

              <p className="mt-7 max-w-2xl text-lg leading-8 text-zinc-500">
                CampusFlow connects students, campus merchants and student
                delivery partners into one campus-first marketplace.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/signup"
                  className="rounded-2xl bg-zinc-950 px-7 py-4 text-center text-sm font-semibold text-white transition hover:bg-zinc-700"
                >
                  Sign in to CampusFlow →
                </Link>

                <Link
                  href="/about"
                  className="rounded-2xl border border-zinc-200 bg-white px-7 py-4 text-center text-sm font-semibold hover:bg-zinc-100"
                >
                  See how it works
                </Link>
              </div>
            </div>

            <div className="rounded-[2.5rem] bg-zinc-950 p-7 text-white shadow-2xl shadow-zinc-300/50">
              <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                One campus · three flows
              </p>

              <div className="mt-8 space-y-3">
                {[
                  ["👤", "Student", "Order what you need."],
                  ["🏪", "Merchant", "Prepare what students order."],
                  ["🛵", "Partner", "Deliver along your existing route."],
                ].map(([icon, title, text]) => (
                  <div
                    key={title}
                    className="rounded-2xl bg-white/10 p-5"
                  >
                    <div className="flex items-center gap-4">
                      <div className="text-2xl">{icon}</div>
                      <div>
                        <div className="font-semibold">{title}</div>
                        <div className="mt-1 text-sm text-zinc-400">{text}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-5 rounded-2xl border border-white/10 p-5">
                <div className="text-xs text-zinc-500">The core idea</div>
                <p className="mt-2 text-sm leading-6 text-zinc-300">
                  Use journeys students are already making to move things
                  other students need.
                </p>
              </div>
            </div>
          </div>
        </section>

        <footer className="border-t border-zinc-200 pt-5 text-xs text-zinc-400">
          CampusFlow · CODE FLUX 2026 · Prototype
        </footer>
      </div>
    </main>
  );
}
