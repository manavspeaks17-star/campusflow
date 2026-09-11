"use client";

import Link from "next/link";
import { useState } from "react";
import { DEMO_ACCOUNTS, saveDemoAccount } from "@/lib/demo-auth";

export default function SignupPage() {
  const [selected, setSelected] = useState("Student");

  const account = DEMO_ACCOUNTS.find((a) => a.role === selected)!;

  function createAccount() {
    saveDemoAccount(account);

    if (account.role === "Merchant") {
      window.location.href = "/merchant";
    } else if (account.role === "Partner") {
      window.location.href = "/partner";
    } else if (account.role === "Developer") {
      window.location.href = "/dev";
    } else {
      window.location.href = "/";
    }
  }

  return (
    <main className="min-h-screen bg-[#f7f7f5] text-zinc-950">
      <div className="mx-auto max-w-4xl px-6 py-8">
        <header className="flex items-center justify-between">
          <Link href="/welcome" className="text-xl font-semibold tracking-tight">
            CampusFlow
          </Link>
          <span className="rounded-full border border-zinc-200 bg-white px-4 py-2 text-xs text-zinc-500">
            CODE FLUX 2026 · Demo
          </span>
        </header>

        <section className="mt-20">
          <p className="text-sm font-medium text-zinc-500">Welcome to CampusFlow</p>
          <h1 className="mt-3 max-w-3xl text-5xl font-semibold tracking-tight md:text-6xl">
            Choose your workspace.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-zinc-500">
            CampusFlow gives every participant a different experience based on
            what they do on campus.
          </p>
        </section>

        <section className="mt-10 grid gap-4 md:grid-cols-2">
          {DEMO_ACCOUNTS.map((a) => (
            <button
              key={a.role}
              onClick={() => setSelected(a.role)}
              className={`rounded-[2rem] border p-6 text-left transition hover:-translate-y-0.5 ${
                selected === a.role
                  ? "border-zinc-950 bg-white shadow-xl shadow-zinc-200/50"
                  : "border-zinc-200 bg-white/70 hover:bg-white"
              }`}
            >
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-zinc-100 text-2xl">
                  {a.icon}
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between gap-3">
                    <h2 className="font-semibold">{a.role}</h2>
                    <div
                      className={`h-5 w-5 rounded-full border ${
                        selected === a.role
                          ? "border-zinc-950 bg-zinc-950"
                          : "border-zinc-300"
                      }`}
                    />
                  </div>

                  <p className="mt-1 text-lg font-medium">{a.name}</p>
                  <p className="mt-1 text-sm text-zinc-400">{a.email}</p>

                  <p className="mt-4 text-sm leading-6 text-zinc-500">
                    {a.role === "Student" &&
                      "Browse campus shops, order food and essentials, and receive peer deliveries."}
                    {a.role === "Merchant" &&
                      "Manage your shop, accept orders and prepare student purchases."}
                    {a.role === "Partner" &&
                      "Accept delivery journeys that match routes you already travel."}
                    {a.role === "Developer" &&
                      "Access the complete prototype and all demo experiences."}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </section>

        <button
          onClick={createAccount}
          className="mt-6 w-full rounded-2xl bg-zinc-950 px-6 py-4 text-sm font-semibold text-white transition hover:bg-zinc-700 active:scale-[0.99]"
        >
          Continue as {account.name} · {account.role}
        </button>

        <p className="mt-4 text-center text-xs text-zinc-400">
          Prototype accounts · No real credentials are created.
        </p>
      </div>
    </main>
  );
}
