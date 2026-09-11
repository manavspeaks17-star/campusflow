"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, useMemo } from "react";

type Section = "Food" | "Essentials" | "Nearby Shops";
type Role = "Customer" | "Merchant" | "Partner";

type Product = {
  id: number;
  name: string;
  shop: string;
  section: Section;
  category: string;
  price: number;
  prep: number;
  emoji: string;
};

const products: Product[] = [
  { id: 1, name: "Classic Chicken Burger", shop: "The Food Court", section: "Food", category: "Burgers", price: 115, prep: 12, emoji: "🍔" },
  { id: 2, name: "Masala Fries", shop: "The Food Court", section: "Food", category: "Sides", price: 60, prep: 8, emoji: "🍟" },
  { id: 3, name: "Cold Coffee", shop: "Campus Cafe", section: "Food", category: "Drinks", price: 80, prep: 5, emoji: "🥤" },
  { id: 4, name: "Veggie Wrap", shop: "Campus Cafe", section: "Food", category: "Wraps", price: 95, prep: 10, emoji: "🌯" },
  { id: 5, name: "Maggi Masala", shop: "Campus Cafe", section: "Food", category: "Quick Bites", price: 55, prep: 7, emoji: "🍜" },
  { id: 6, name: "Mineral Water", shop: "Campus Mart", section: "Essentials", category: "Drinks", price: 20, prep: 2, emoji: "💧" },
  { id: 7, name: "Chocolate Bar", shop: "Campus Mart", section: "Essentials", category: "Snacks", price: 40, prep: 2, emoji: "🍫" },
  { id: 8, name: "Notebook", shop: "Campus Mart", section: "Essentials", category: "Stationery", price: 65, prep: 2, emoji: "📓" },
  { id: 9, name: "Blue Pen Pack", shop: "Campus Mart", section: "Essentials", category: "Stationery", price: 35, prep: 2, emoji: "🖊️" },
  { id: 10, name: "Phone Charger", shop: "Campus Store", section: "Nearby Shops", category: "Electronics", price: 299, prep: 5, emoji: "🔌" },
  { id: 11, name: "Earphones", shop: "Campus Store", section: "Nearby Shops", category: "Electronics", price: 399, prep: 5, emoji: "🎧" },
  { id: 12, name: "Toiletry Kit", shop: "Campus Store", section: "Nearby Shops", category: "Daily Use", price: 149, prep: 4, emoji: "🧴" },
];

const destinations = [
  "Hostel 1",
  "Hostel 4",
  "Block 34",
  "Uni Mall",
  "Central Library",
];

export default function Home() {
  const [role, setRole] = useState<Role>("Customer");
  const [section, setSection] = useState<Section>("Food");
  const [cart, setCart] = useState<{ product: Product; quantity: number }[]>([]);
  const [destination, setDestination] = useState("Hostel 1");
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderStatus, setOrderStatus] = useState("placed");
  const [merchantStatus, setMerchantStatus] = useState("New");
  const [partnerStatus, setPartnerStatus] = useState("Available");
  const [otpInput, setOtpInput] = useState("");
  const [otpError, setOtpError] = useState(false);
  const [search, setSearch] = useState("");
  const [orderMode, setOrderMode] = useState<"Now" | "Pre-order">("Now");

  const visibleProducts = useMemo(
    () =>
      products.filter(
        (p) =>
          p.section === section &&
          p.name.toLowerCase().includes(search.toLowerCase())
      ),
    [section, search]
  );

  const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const partnerReward = cart.length ? 19.5 : 0;
  const platformRevenue = cart.length ? 10.5 : 0;

  function addToCart(product: Product) {
    setCart((current) => {
      const existing = current.find((item) => item.product.id === product.id);
      if (existing) {
        return current.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...current, { product, quantity: 1 }];
    });
  }

  function changeQuantity(productId: number, delta: number) {
    setCart((current) =>
      current
        .map((item) =>
          item.product.id === productId
            ? { ...item, quantity: item.quantity + delta }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  function getQuantity(productId: number) {
    return cart.find((item) => item.product.id === productId)?.quantity ?? 0;
  }

  function placeOrder() {
    if (!cart.length) return;
    setOrderPlaced(true);
    setOrderStatus("placed");
    setMerchantStatus("New");
  }

  function merchantAdvance() {
    const next =
      merchantStatus === "New"
        ? "Accepted"
        : merchantStatus === "Accepted"
        ? "Preparing"
        : "Ready";

    setMerchantStatus(next);

    if (next === "Accepted") setOrderStatus("accepted");
    if (next === "Preparing") setOrderStatus("preparing");
    if (next === "Ready") setOrderStatus("ready");
  }

  function partnerAdvance() {
    if (partnerStatus === "Available") {
      setPartnerStatus("Accepted");
      setOrderStatus("partner_matched");
    } else if (partnerStatus === "Accepted") {
      setPartnerStatus("Picked up");
      setOrderStatus("picked_up");
    } else if (partnerStatus === "Picked up") {
      if (otpInput !== "4827") {
        setOtpError(true);
        return;
      }
      setOtpError(false);
      setPartnerStatus("Delivered");
      setOrderStatus("delivered");
    }
  }

  const statusLabel: Record<string, string> = {
    placed: "Order placed",
    accepted: "Merchant accepted",
    preparing: "Being prepared",
    ready: "Ready for pickup",
    partner_matched: "Student partner matched",
    picked_up: "Picked up",
    delivered: "Delivered",
  };

  return (
    <main className="min-h-screen bg-[#f7f7f5] text-zinc-900">
      <header className="sticky top-0 z-50 border-b border-zinc-200/70 bg-[#f7f7f5]/90 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-900 text-sm font-bold text-white">C</div>
            <div>
              <div className="font-semibold tracking-tight">CampusFlow</div>
              <div className="text-[10px] uppercase tracking-[0.18em] text-zinc-400">LPU campus commerce</div>
            </div>
          </Link>

          <div className="hidden items-center gap-2 rounded-full border border-zinc-200 bg-white p-1 md:flex">
            {(["Customer", "Merchant", "Partner"] as Role[]).map((item) => (
              <button
                key={item}
                onClick={() => setRole(item)}
                className={`rounded-full px-4 py-2 text-xs font-medium transition ${
                  role === item
                    ? "bg-zinc-900 text-white"
                    : "text-zinc-500 hover:text-zinc-900"
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          <nav className="hidden items-center gap-1 lg:flex">
            <Link href="/" className="rounded-full px-3 py-2 text-xs font-medium text-zinc-500 hover:bg-white hover:text-zinc-900">Home</Link>
            <Link href="/food" className="rounded-full px-3 py-2 text-xs font-medium text-zinc-500 hover:bg-white hover:text-zinc-900">Food</Link>
            <Link href="/essentials" className="rounded-full px-3 py-2 text-xs font-medium text-zinc-500 hover:bg-white hover:text-zinc-900">Essentials</Link>
            <Link href="/unimall" className="rounded-full px-3 py-2 text-xs font-medium text-zinc-500 hover:bg-white hover:text-zinc-900">UniMall</Link>
            <Link href="/signup" className="rounded-full bg-zinc-900 px-3 py-2 text-xs font-semibold text-white hover:bg-zinc-700">Sign up</Link>
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden text-right sm:block">
              <div className="text-xs font-medium">Manav</div>
              <div className="text-[10px] text-zinc-400">Verified student</div>
            </div>
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-200 text-xs font-semibold">
              M
            </div>
          </div>
        </div>
      </header>

      {role === "Customer" && (
        <div className="mx-auto max-w-7xl px-6 py-10">
          <section className="mb-10 rounded-[2rem] bg-zinc-900 p-8 text-white md:p-12">
            <div className="max-w-3xl">
              <div className="mb-4 inline-flex rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs text-zinc-300">
                ● Built for campus movement
              </div>
              <h1 className="text-4xl font-semibold tracking-tight md:text-6xl">
                Get what you need.
                <br />
                <span className="text-zinc-500">Without crossing campus.</span>
              </h1>
              <p className="mt-5 max-w-xl text-sm leading-6 text-zinc-400 md:text-base">
                CampusFlow connects you to local merchants and students
                already moving toward your destination.
              </p>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <div className="flex items-center gap-3 rounded-2xl bg-white/10 px-4 py-3">
                <span>📍</span>
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-zinc-500">
                    Deliver to
                  </div>
                  <select
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="bg-transparent text-sm font-medium outline-none"
                  >
                    {destinations.map((d) => (
                      <option className="text-zinc-900" key={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex flex-1 items-center rounded-2xl bg-white/10 px-4">
                <span className="mr-3">⌕</span>
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search food, essentials, shops..."
                  className="w-full bg-transparent py-3 text-sm outline-none placeholder:text-zinc-500"
                />
              </div>
            </div>
          </section>

          <div className="mb-8 flex items-end justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-zinc-400">
                Explore
              </p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight">
                Everything around you
              </h2>
            </div>
            <div className="hidden rounded-full bg-emerald-50 px-4 py-2 text-xs font-medium text-emerald-700 sm:block">
              No delivery fee
            </div>
          </div>

          <div className="mb-8 grid grid-cols-3 gap-3">
            {(
              [
                ["Food", "🍔", "Meals & drinks"],
                ["Essentials", "🛒", "Daily essentials"],
                ["Nearby Shops", "🏪", "Campus retail"],
              ] as [Section, string, string][]
            ).map(([name, icon, subtitle]) => (
              <Link
                key={name}
                href={name === "Food" ? "/food" : name === "Essentials" ? "/essentials" : "/unimall"}
                className={`rounded-3xl border p-5 text-left transition hover:-translate-y-1 hover:shadow-lg ${
                  section === name ? "border-zinc-900 bg-white shadow-sm" : "border-zinc-200 bg-white/60 hover:bg-white"
                }`}
              >
                <div className="mb-6 text-2xl">{icon}</div>
                <div className="font-semibold">{name}</div>
                <div className="mt-1 text-xs text-zinc-400">{subtitle}</div>
                <div className="mt-4 text-xs font-semibold">Explore →</div>
              </Link>
            ))}
          </div>

          <details className="mb-8 overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm">
            <summary className="flex cursor-pointer list-none items-center justify-between px-5 py-4 font-semibold">
              <span className="text-sm">How CampusFlow earns</span>
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-zinc-100 text-lg">+</span>
            </summary>
            <div className="border-t border-zinc-100">
            <div className="grid gap-px bg-zinc-100 md:grid-cols-4">
              <div className="bg-white p-5 md:p-6">
                <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-zinc-400">
                  Reference price
                </div>
                <div className="mt-2 text-2xl font-semibold">₹100</div>
                <p className="mt-1 text-xs text-zinc-400">Starting value of the item</p>
              </div>
              <div className="bg-white p-5 md:p-6">
                <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-zinc-400">
                  Seller receives
                </div>
                <div className="mt-2 text-2xl font-semibold">₹85</div>
                <p className="mt-1 text-xs text-zinc-400">15% below reference price</p>
              </div>
              <div className="bg-white p-5 md:p-6">
                <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-zinc-400">
                  Customer pays
                </div>
                <div className="mt-2 text-2xl font-semibold">₹115</div>
                <p className="mt-1 text-xs text-zinc-400">15% above reference price</p>
              </div>
              <div className="bg-zinc-900 p-5 text-white md:p-6">
                <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-zinc-500">
                  ₹30 delivery pool
                </div>
                <div className="mt-2 text-2xl font-semibold">65 / 35</div>
                <p className="mt-1 text-xs text-zinc-400">₹19.50 student · ₹10.50 CampusFlow</p>
              </div>
            </div>
            <div className="flex flex-col gap-2 border-t border-zinc-100 px-5 py-4 md:flex-row md:items-center md:justify-between md:px-6">
              <div>
                <div className="text-sm font-semibold">One order. Everyone benefits.</div>
                <div className="mt-1 text-xs text-zinc-400">15% seller discount + 15% customer premium funds the peer-delivery pool.</div>
              </div>
              <div className="text-xs font-medium text-emerald-600">No delivery fee · Peer-powered</div>
            </div>
            </div>
          </details>


          {orderPlaced && (
            <section className="mb-8 rounded-3xl border border-emerald-200 bg-emerald-50 p-6">
              <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-emerald-700">
                    Live order
                  </div>
                  <h3 className="mt-1 text-xl font-semibold">
                    Order #{String(2048).slice(-4)}
                  </h3>
                  <p className="mt-1 text-sm text-emerald-800/70">
                    {statusLabel[orderStatus]} · {destination}
                  </p>
                  {orderMode === "Pre-order" && (
                    <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-amber-100 px-3 py-1.5 text-xs font-semibold text-amber-800">
                      ⚡ Skip the queue · Ready by 1:15 PM
                    </div>
                  )}
                  {orderStatus !== "delivered" && (
                    <div className="mt-4 inline-flex items-center gap-3 rounded-xl bg-white px-4 py-2 ring-1 ring-emerald-200">
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400">
                        Delivery OTP
                      </span>
                      <span className="font-mono text-lg font-bold tracking-[0.25em]">
                        4827
                      </span>
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {["placed", "preparing", "partner_matched", "delivered"].map(
                    (s, i) => (
                      <div key={s} className="flex items-center gap-2">
                        <div
                          className={`h-2.5 w-2.5 rounded-full ${
                            ["placed", "preparing", "partner_matched", "delivered"].indexOf(
                              orderStatus
                            ) >= i
                              ? "bg-emerald-600"
                              : "bg-emerald-200"
                          }`}
                        />
                        {i < 3 && (
                          <div className="hidden h-px w-6 bg-emerald-200 sm:block" />
                        )}
                      </div>
                    )
                  )}
                </div>
              </div>
            </section>
          )}

          <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {visibleProducts.map((product) => (
              <article
                key={product.id}
                className="group overflow-hidden rounded-3xl border border-zinc-200 bg-white transition hover:-translate-y-1 hover:shadow-xl hover:shadow-zinc-200/50"
              >
                <div className="flex h-44 items-center justify-center bg-zinc-100 text-7xl transition group-hover:scale-[1.02]">
                  {product.emoji}
                </div>
                <div className="p-5">
                  <div className="mb-2 flex items-center justify-between">
                    <Link href={`/shop/${product.shop.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`} className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400 hover:text-zinc-900">
                      {product.shop}
                    </Link>
                    <span className="text-[10px] text-zinc-400">
                      {product.prep} min
                    </span>
                  </div>
                  <h3 className="font-semibold">{product.name}</h3>
                  <p className="mt-1 text-xs text-zinc-400">{product.category}</p>
                  <div className="mt-5 flex items-center justify-between">
                    <span className="text-lg font-semibold">₹{product.price}</span>
                    {getQuantity(product.id) === 0 ? (
                      <button
                        onClick={() => addToCart(product)}
                        className="rounded-full bg-zinc-900 px-4 py-2 text-xs font-semibold text-white transition hover:bg-zinc-700 active:scale-95"
                      >
                        Add
                      </button>
                    ) : (
                      <div className="flex items-center gap-1 rounded-full border border-zinc-900 bg-white px-1 py-1 text-zinc-900">
                        <button
                          onClick={() => changeQuantity(product.id, -1)}
                          aria-label={`Decrease ${product.name}`}
                          className="flex h-7 w-7 items-center justify-center rounded-full text-sm font-semibold transition hover:bg-zinc-100 active:scale-90"
                        >
                          −
                        </button>
                        <span className="min-w-[24px] text-center text-xs font-semibold">
                          {getQuantity(product.id)}
                        </span>
                        <button
                          onClick={() => changeQuantity(product.id, 1)}
                          aria-label={`Increase ${product.name}`}
                          className="flex h-7 w-7 items-center justify-center rounded-full text-sm font-semibold transition hover:bg-zinc-100 active:scale-90"
                        >
                          +
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </section>

          {cart.length > 0 && (
            <section className="mt-8 rounded-3xl bg-white p-6 shadow-xl shadow-zinc-200/40 ring-1 ring-zinc-200">
              <div className="flex flex-col justify-between gap-6 md:flex-row">
                <div>
                  <div className="text-xs uppercase tracking-wider text-zinc-400">
                    Your order
                  </div>
                  <h3 className="mt-1 text-2xl font-semibold">
                    {cart.reduce((sum, item) => sum + item.quantity, 0)} item{cart.reduce((sum, item) => sum + item.quantity, 0) > 1 ? "s" : ""}
                  </h3>
                  <div className="mt-3 space-y-1">
                    {cart.map((item) => (
                      <div key={item.product.id} className="text-sm text-zinc-500">
                        {item.product.name} · {item.quantity} × ₹{item.product.price}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="min-w-64">
                  <div className="mb-4 grid grid-cols-2 gap-2 rounded-2xl bg-zinc-100 p-1">
                    <button
                      onClick={() => setOrderMode("Now")}
                      className={`rounded-xl px-3 py-2 text-xs font-semibold transition ${
                        orderMode === "Now"
                          ? "bg-white text-zinc-900 shadow-sm"
                          : "text-zinc-500"
                      }`}
                    >
                      Order now
                    </button>
                    <button
                      onClick={() => setOrderMode("Pre-order")}
                      className={`rounded-xl px-3 py-2 text-xs font-semibold transition ${
                        orderMode === "Pre-order"
                          ? "bg-zinc-900 text-white shadow-sm"
                          : "text-zinc-500"
                      }`}
                    >
                      ⚡ Skip the queue
                    </button>
                  </div>

                  {orderMode === "Pre-order" && (
                    <div className="mb-4 rounded-2xl border border-amber-200 bg-amber-50 p-4">
                      <div className="text-xs font-semibold uppercase tracking-wider text-amber-700">
                        Pre-order
                      </div>
                      <div className="mt-1 text-sm font-semibold text-zinc-900">
                        Ready by 1:15 PM
                      </div>
                      <p className="mt-1 text-xs leading-5 text-amber-800/70">
                        Order before leaving class. Your merchant prepares it ahead of time.
                      </p>
                    </div>
                  )}

                  <div className="space-y-2 border-b border-zinc-100 pb-4 text-sm">
                    <div className="flex justify-between">
                      <span className="text-zinc-500">Order value</span>
                      <span>₹{total}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-500">Delivery</span>
                      <span className="font-medium text-emerald-600">Free</span>
                    </div>
                  </div>
                  <div className="flex justify-between py-4 font-semibold">
                    <span>Total</span>
                    <span>₹{total}</span>
                  </div>
                  <button
                    onClick={placeOrder}
                    className="w-full rounded-2xl bg-zinc-900 py-3.5 text-sm font-semibold text-white hover:bg-zinc-700"
                  >
                    {orderMode === "Pre-order" ? "Pre-order · ready 1:15 PM" : "Place order"} · {destination}
                  </button>
                </div>
              </div>
            </section>
          )}
        </div>
      )}

      {role === "Merchant" && (
        <div className="mx-auto max-w-7xl px-6 py-10">
          <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-zinc-400">
                Merchant workspace
              </p>
              <h1 className="mt-2 text-4xl font-semibold tracking-tight">
                The Food Court
              </h1>
              <p className="mt-2 text-sm text-zinc-500">
                Order queue · Today
              </p>
            </div>
            <div className="rounded-full bg-emerald-50 px-4 py-2 text-xs font-medium text-emerald-700">
              ● Shop online
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {[
              ["New orders", merchantStatus === "New" ? "01" : "00"],
              ["Preparing", merchantStatus === "Preparing" ? "01" : "00"],
              ["Ready", merchantStatus === "Ready" ? "01" : "00"],
            ].map(([label, value]) => (
              <div key={label} className="rounded-3xl border border-zinc-200 bg-white p-6">
                <div className="text-xs text-zinc-400">{label}</div>
                <div className="mt-3 text-4xl font-semibold">{value}</div>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-3xl border border-zinc-200 bg-white p-7">
            <div className="flex flex-col justify-between gap-6 md:flex-row">
              <div>
                <div className="flex items-center gap-3">
                  <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700">
                    {merchantStatus}
                  </span>
                  <span className="text-xs text-zinc-400">Order #2048</span>
                  {orderMode === "Pre-order" && (
                    <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700">
                      Pre-order · 1:15 PM
                    </span>
                  )}
                </div>
                <h2 className="mt-4 text-xl font-semibold">Classic Chicken Burger</h2>
                <p className="mt-1 text-sm text-zinc-500">
                  1 × Burger · Delivery to {destination}
                </p>
                <div className="mt-5 text-2xl font-semibold">₹115</div>
              </div>

              <div className="flex items-end">
                <button
                  onClick={merchantAdvance}
                  disabled={merchantStatus === "Ready"}
                  className="rounded-2xl bg-zinc-900 px-6 py-3 text-sm font-semibold text-white disabled:bg-zinc-200 disabled:text-zinc-400"
                >
                  {merchantStatus === "New"
                    ? "Accept order"
                    : merchantStatus === "Accepted"
                    ? "Start preparing"
                    : merchantStatus === "Preparing"
                    ? "Mark ready"
                    : "Ready for pickup"}
                </button>
              </div>
            </div>

            <div className="mt-8 border-t border-zinc-100 pt-6">
              <div className="mb-3 flex justify-between text-xs text-zinc-400">
                <span>Preparation progress</span>
                <span>{merchantStatus}</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-zinc-100">
                <div
                  className="h-full rounded-full bg-zinc-900 transition-all"
                  style={{
                    width:
                      merchantStatus === "New"
                        ? "15%"
                        : merchantStatus === "Accepted"
                        ? "40%"
                        : merchantStatus === "Preparing"
                        ? "75%"
                        : "100%",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {role === "Partner" && (
        <div className="mx-auto max-w-5xl px-6 py-10">
          <div className="rounded-[2rem] bg-zinc-900 p-8 text-white md:p-12">
            <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">
              Partner mode
            </p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight">
              Earn while you're already moving.
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-6 text-zinc-400">
              CampusFlow finds orders heading toward places you're already
              travelling to.
            </p>

            <div className="mt-10 rounded-3xl bg-white/10 p-6">
              <div className="flex flex-col justify-between gap-6 md:flex-row">
                <div>
                  <div className="text-xs text-zinc-500">Compatible request</div>
                  <h2 className="mt-2 text-2xl font-semibold">Hostel 1</h2>
                  <p className="mt-1 text-sm text-zinc-400">
                    From The Food Court · 1 order · ~8 min
                  </p>
                </div>
                <div className="text-left md:text-right">
                  <div className="text-xs text-zinc-500">You earn</div>
                  <div className="mt-1 text-3xl font-semibold">₹19.50</div>
                </div>
              </div>

              {partnerStatus === "Picked up" && (
                <div className="mt-6 rounded-2xl bg-white/10 p-4">
                  <div className="text-xs text-zinc-400">
                    Customer OTP
                  </div>
                  <div className="mt-3 flex gap-3">
                    <input
                      value={otpInput}
                      onChange={(e) => {
                        setOtpInput(e.target.value.replace(/\\D/g, "").slice(0, 4));
                        setOtpError(false);
                      }}
                      inputMode="numeric"
                      maxLength={4}
                      placeholder="••••"
                      className="w-full rounded-xl bg-white px-4 py-3 text-center text-lg font-semibold tracking-[0.4em] text-zinc-900 outline-none"
                    />
                  </div>
                  {otpError && (
                    <p className="mt-2 text-xs text-red-300">
                      Incorrect OTP. Ask the customer to confirm their code.
                    </p>
                  )}
                </div>
              )}

              <button
                onClick={partnerAdvance}
                disabled={partnerStatus === "Delivered"}
                className="mt-6 w-full rounded-2xl bg-white py-3.5 text-sm font-semibold text-zinc-900 disabled:bg-white/10 disabled:text-zinc-500"
              >
                {partnerStatus === "Available"
                  ? "Accept delivery"
                  : partnerStatus === "Accepted"
                  ? "Confirm pickup"
                  : partnerStatus === "Picked up"
                  ? "Verify OTP & complete"
                  : "Delivery completed"}
              </button>
            </div>
          </div>

          <div className="mt-6 grid gap-5 md:grid-cols-3">
            <div className="rounded-3xl border border-zinc-200 bg-white p-6">
              <div className="text-xs text-zinc-400">Status</div>
              <div className="mt-2 text-xl font-semibold">{partnerStatus}</div>
            </div>
            <div className="rounded-3xl border border-zinc-200 bg-white p-6">
              <div className="text-xs text-zinc-400">Today's earnings</div>
              <div className="mt-2 text-xl font-semibold">
                {partnerStatus === "Delivered" ? "₹19.50" : "₹0"}
              </div>
            </div>
            <div className="rounded-3xl border border-zinc-200 bg-white p-6">
              <div className="text-xs text-zinc-400">Reputation</div>
              <div className="mt-2 text-xl font-semibold">4.9 ★</div>
            </div>
          </div>

          {partnerStatus === "Delivered" && (
            <div className="mt-6 rounded-3xl border border-emerald-200 bg-emerald-50 p-6">
              <div className="text-xs font-semibold uppercase tracking-wider text-emerald-700">
                OTP verified
              </div>
              <div className="mt-2 text-2xl font-semibold text-zinc-900">
                Delivery complete
              </div>
              <p className="mt-1 text-sm text-emerald-800/70">
                Handoff verified securely at {destination}.
              </p>
            </div>
          )}
        </div>
      )}

      <footer className="mx-auto max-w-7xl px-6 pb-10 pt-6 text-xs text-zinc-400">
        CampusFlow · CODE FLUX 2026 · Prototype
      </footer>

      <div className="fixed bottom-5 left-1/2 z-50 flex -translate-x-1/2 items-center gap-1 rounded-full border border-zinc-200 bg-white p-1 shadow-2xl md:hidden">
        {(["Customer", "Merchant", "Partner"] as Role[]).map((item) => (
          <button
            key={item}
            onClick={() => setRole(item)}
            className={`rounded-full px-3 py-2 text-[10px] font-medium ${
              role === item ? "bg-zinc-900 text-white" : "text-zinc-500"
            }`}
          >
            {item}
          </button>
        ))}
      </div>
    </main>
  );
}
