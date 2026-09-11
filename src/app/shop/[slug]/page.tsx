"use client";

import Link from "next/link";
import { use, useMemo, useState } from "react";

const shops = [{"name": "Le Broc", "service": "convenience retail store", "sourceItems": "everyday items,quick meals,and emergency supplies", "items": ["Everyday Items", "Quick Meals", "And Emergency Supplies"]}, {"name": "CCD", "service": "Coffee outlet", "sourceItems": "all types of hot and cold coffees", "items": ["Hot Coffee", "Cold Coffee", "Cappuccino", "Iced Coffee"]}, {"name": "Pure Bites", "service": "Satvik Foods", "sourceItems": "pure,wholesome,and vegetarian food prepared acc to traditional yogic", "items": ["Veg Meal", "Paneer Wrap", "Masala Maggi", "Cold Drink"]}, {"name": "lovely sweets", "service": "food and beverages", "sourceItems": "sweets items and dish", "items": ["Gulab Jamun", "Kaju Katli", "Rasgulla", "Fresh Sweets"]}, {"name": "himalya wellness store", "service": "personal care store", "sourceItems": "medical items and care items", "items": ["Personal Care Kit", "Wellness Essentials", "First Aid Items", "Care Products"]}, {"name": "phone zone", "service": "mobiles,accessories and recharge", "sourceItems": "all phone accessories", "items": ["Phone Cases", "Chargers", "Earphones", "Screen Protectors"]}, {"name": "nivia", "service": "sports goods and apparels", "sourceItems": "all sports items", "items": ["Cricket Gear", "Football", "Sports Shoes", "Training Apparel"]}, {"name": "youth hub", "service": "clothing and accessories", "sourceItems": "clothes", "items": ["T-Shirts", "Hoodies", "Jeans", "Accessories"]}, {"name": "phone world", "service": "mobiles,accessories and recharge", "sourceItems": "all phone accessories", "items": ["Phone Cases", "Chargers", "Earphones", "Screen Protectors"]}, {"name": "the gift gallery", "service": "gifts gallery", "sourceItems": "all gift items and packing of it", "items": ["Gift Hamper", "Greeting Cards", "Wrapping Paper", "Personalized Gifts"]}, {"name": "AS phone house", "service": "mobiles,accessories and recharge", "sourceItems": "all phone accessories", "items": ["Phone Cases", "Chargers", "Earphones", "Screen Protectors"]}, {"name": "dominos pizza", "service": "italian cuisine", "sourceItems": "different types of pizzas", "items": ["Margherita Pizza", "Farmhouse Pizza", "Garlic Bread", "Pasta"]}, {"name": "blue dart", "service": "courier services", "sourceItems": "courier services", "items": ["Parcel Drop", "Document Delivery", "Courier Booking", "Packaging"]}, {"name": "sonu fashion", "service": "apparels", "sourceItems": "different types of cloths", "items": ["T-Shirts", "Hoodies", "Jeans", "Accessories"]}, {"name": "sachdeva luggage handloom", "service": "luggage and handloom", "sourceItems": "luggages and bags", "items": ["Backpacks", "Travel Bags", "Luggage", "Handloom Items"]}, {"name": "gourav book depot", "service": "book store", "sourceItems": "stationary", "items": ["Notebooks", "Pens", "Markers", "Study Supplies"]}, {"name": "study solutions", "service": "book store", "sourceItems": "stationary", "items": ["Notebooks", "Pens", "Markers", "Study Supplies"]}, {"name": "Snaryan services", "service": "internet café", "sourceItems": "café", "items": ["Printing", "Scanning", "Photocopy", "Internet Access"]}, {"name": "paul merchants", "service": "money transfer and ticket reservation", "sourceItems": "transfer of money", "items": ["Money Transfer", "Ticket Booking", "Reservation Service", "Payment Assistance"]}, {"name": "eyekart", "service": "eyezone", "sourceItems": "eyelens and specs of all types", "items": ["Eyeglasses", "Contact Lenses", "Frames", "Eye Accessories"]}, {"name": "touch automation", "service": "computer and accessories", "sourceItems": "computers gadgets", "items": ["Laptop Accessories", "Keyboard", "Mouse", "USB Drive"]}, {"name": "superdot computers(hp shop)", "service": "computer and accessories", "sourceItems": "computers gadgets", "items": ["Laptop Accessories", "Keyboard", "Mouse", "USB Drive"]}, {"name": "vn computers", "service": "computer and accessories", "sourceItems": "computers gadgets", "items": ["Laptop Accessories", "Keyboard", "Mouse", "USB Drive"]}, {"name": "fashion gallery", "service": "apparels and accessories", "sourceItems": "clothes", "items": ["T-Shirts", "Hoodies", "Jeans", "Accessories"]}, {"name": "jai jai computers", "service": "internet café", "sourceItems": "café", "items": ["Printing", "Scanning", "Photocopy", "Internet Access"]}, {"name": "suto cafe", "service": "birthday celebration zone", "sourceItems": "birthday items", "items": ["Birthday Decor", "Cake Accessories", "Party Supplies", "Celebration Kit"]}, {"name": "korean photo-booth", "service": "photo studio and korean accessories", "sourceItems": "frames and photography items", "items": ["Photo Prints", "Frames", "Studio Session", "Photo Accessories"]}, {"name": "serving you", "service": "boutique", "sourceItems": "hair dressing", "items": ["T-Shirts", "Hoodies", "Jeans", "Accessories"]}, {"name": "valour esports", "service": "gaming café", "sourceItems": "café", "items": ["Gaming Session", "PC Gaming", "Console Gaming", "Tournament Pass"]}, {"name": "myntra/flipkart", "service": "courier services", "sourceItems": "courier services", "items": ["Parcel Drop", "Document Delivery", "Courier Booking", "Packaging"]}, {"name": "bystbeez logistics", "service": "courier services", "sourceItems": "courier services", "items": ["Parcel Drop", "Document Delivery", "Courier Booking", "Packaging"]}, {"name": "acculogics", "service": "courier services", "sourceItems": "courier services", "items": ["Parcel Drop", "Document Delivery", "Courier Booking", "Packaging"]}, {"name": "meesho", "service": "courier services", "sourceItems": "courier services", "items": ["Parcel Drop", "Document Delivery", "Courier Booking", "Packaging"]}, {"name": "jeans camp", "service": "apparels", "sourceItems": "jeans and pants of all sizes", "items": ["T-Shirts", "Hoodies", "Jeans", "Accessories"]}, {"name": "mapple and burrito", "service": "food and beverages", "sourceItems": "food", "items": ["Veg Meal", "Paneer Wrap", "Masala Maggi", "Cold Drink"]}, {"name": "chicago delight", "service": "italian cuisine", "sourceItems": "italian food", "items": ["Margherita Pizza", "Farmhouse Pizza", "Garlic Bread", "Pasta"]}, {"name": "juice land", "service": "food and beverages", "sourceItems": "shakes and alll", "items": ["Veg Meal", "Paneer Wrap", "Masala Maggi", "Cold Drink"]}, {"name": "symposium", "service": "chinese cuisine", "sourceItems": "chinese items", "items": ["Veg Momos", "Paneer Momos", "Hakka Noodles", "Chilli Potato"]}, {"name": "schmitten chocolates", "service": "premium  chocolate store", "sourceItems": "chocolates", "items": ["Chocolates"]}, {"name": "wow momos", "service": "chinese cuisine", "sourceItems": "chinese items", "items": ["Veg Momos", "Paneer Momos", "Hakka Noodles", "Chilli Potato"]}, {"name": "chai vyanjan", "service": "food and beverages", "sourceItems": "food", "items": ["Veg Meal", "Paneer Wrap", "Masala Maggi", "Cold Drink"]}, {"name": "food bowl", "service": "south indian and continental cuisine", "sourceItems": "south indian items", "items": ["South Indian Items"]}, {"name": "protein o shake", "service": "food and beverages", "sourceItems": "shakes and all", "items": ["Veg Meal", "Paneer Wrap", "Masala Maggi", "Cold Drink"]}, {"name": "jacked up café", "service": "milk shakes and mocktails", "sourceItems": "shakes and all", "items": ["Shakes And All"]}, {"name": "ahuja shakes and refreshments", "service": "juice and shakes", "sourceItems": "shakes and all", "items": ["Shakes And All"]}, {"name": "moms kitchen", "service": "food and beverages", "sourceItems": "food", "items": ["Veg Meal", "Paneer Wrap", "Masala Maggi", "Cold Drink"]}, {"name": "toco town", "service": "food and beverages", "sourceItems": "food", "items": ["Veg Meal", "Paneer Wrap", "Masala Maggi", "Cold Drink"]}, {"name": "café 180", "service": "coffee shop and hangout place", "sourceItems": "shakes and all", "items": ["Hot Coffee", "Cold Coffee", "Cappuccino", "Iced Coffee"]}, {"name": "fitness edge", "service": "multi speciality gym", "sourceItems": "gym accessories", "items": ["USB Cable", "Power Adapter", "Gadgets", "Accessories"]}];
const slugify = (v: string) => v.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export default function ShopPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const shop = shops.find(s => slugify(s.name) === slug);
  const [cart, setCart] = useState<{ item: string; quantity: number }[]>([]);
  const [placed, setPlaced] = useState(false);

  if (!shop) return <main className="min-h-screen bg-[#f7f7f5] p-10"><Link href="/unimall" className="text-sm">← Back to UniMall</Link><h1 className="mt-10 text-3xl font-semibold">Shop not found</h1></main>;

  const prices = useMemo(() => Object.fromEntries(shop.items.map((item, i) => [item, 49 + i * 30 + (shop.name.length % 5) * 5])), [shop]);
  function getQuantity(item: string) {
    return cart.find((entry) => entry.item === item)?.quantity ?? 0;
  }

  function changeQuantity(item: string, delta: number) {
    setCart((current) =>
      current
        .map((entry) =>
          entry.item === item
            ? { ...entry, quantity: entry.quantity + delta }
            : entry
        )
        .filter((entry) => entry.quantity > 0)
    );
  }

  const total = cart.reduce((sum, entry) => sum + (prices[entry.item] as number) * entry.quantity, 0);

  return (
    <main className="min-h-screen bg-[#f7f7f5] text-zinc-900">
      <header className="sticky top-0 z-50 border-b border-zinc-200/70 bg-[#f7f7f5]/90 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-3"><div className="flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-900 text-sm font-bold text-white">C</div><span className="font-semibold">CampusFlow</span></Link>
          <div className="flex gap-2"><Link href="/food" className="rounded-full px-3 py-2 text-xs hover:bg-white">Food</Link><Link href="/essentials" className="rounded-full px-3 py-2 text-xs hover:bg-white">Essentials</Link><Link href="/unimall" className="rounded-full px-3 py-2 text-xs hover:bg-white">UniMall</Link></div>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-6 py-10">
        <Link href="/unimall" className="text-xs font-medium text-zinc-400 hover:text-zinc-900">← Back to UniMall</Link>
        <section className="mt-5 rounded-[2rem] bg-zinc-900 p-8 text-white md:p-10">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div><div className="mb-3 inline-flex rounded-full bg-white/10 px-3 py-1 text-xs text-zinc-300">Campus shop</div><h1 className="text-4xl font-semibold capitalize md:text-5xl">{shop.name}</h1><p className="mt-3 text-sm text-zinc-400">{shop.service}</p></div>
            <div className="rounded-2xl bg-white/10 px-4 py-3 text-xs text-zinc-300"><div className="text-zinc-500">Listed offering</div><div className="mt-1 max-w-xs">{shop.sourceItems}</div></div>
          </div>
        </section>

        <div className="mt-8 grid gap-5 md:grid-cols-[1fr_300px]">
          <section>
            <div className="mb-4"><p className="text-xs uppercase tracking-[0.18em] text-zinc-400">Shop menu</p><h2 className="mt-1 text-2xl font-semibold">Browse items</h2><p className="mt-1 text-xs text-zinc-400">Items are predicted from this shop's service type and uploaded offering description.</p></div>
            <div className="grid gap-4 sm:grid-cols-2">
              {shop.items.map(item => (
                <div key={item} className="group rounded-3xl border border-zinc-200 bg-white p-5 text-left transition hover:-translate-y-1 hover:shadow-lg">
                  <div className="flex h-16 items-center justify-center rounded-2xl bg-zinc-100 text-3xl">{["🛍️","📦","✨","🎯"][shop.items.indexOf(item)%4]}</div>
                  <div className="mt-4 flex items-center justify-between gap-3">
                    <h3 className="font-semibold">{item}</h3>
                    <span className="shrink-0 text-sm font-semibold">₹{prices[item] as number}</span>
                  </div>
                  <div className="mt-4 flex items-center justify-between gap-3">
                    <p className="text-xs text-zinc-400">{getQuantity(item) ? `${getQuantity(item)} in order` : "Tap to add"}</p>
                    {getQuantity(item) === 0 ? (
                      <button
                        onClick={() => setCart(c => {
                          const existing = c.find(x => x.item === item);
                          return existing
                            ? c.map(x => x.item === item ? { ...x, quantity: x.quantity + 1 } : x)
                            : [...c, { item, quantity: 1 }];
                        })}
                        className="rounded-full bg-zinc-900 px-4 py-2 text-xs font-semibold text-white transition hover:bg-zinc-700 active:scale-95"
                      >
                        Add
                      </button>
                    ) : (
                      <div className="flex items-center gap-1 rounded-full border border-zinc-900 bg-white px-1 py-1 text-zinc-900">
                        <button
                          onClick={() => changeQuantity(item, -1)}
                          aria-label={`Decrease ${item}`}
                          className="flex h-7 w-7 items-center justify-center rounded-full text-sm font-semibold transition hover:bg-zinc-100 active:scale-90"
                        >
                          −
                        </button>
                        <span className="min-w-[24px] text-center text-xs font-semibold">{getQuantity(item)}</span>
                        <button
                          onClick={() => changeQuantity(item, 1)}
                          aria-label={`Increase ${item}`}
                          className="flex h-7 w-7 items-center justify-center rounded-full text-sm font-semibold transition hover:bg-zinc-100 active:scale-90"
                        >
                          +
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <aside className="h-fit rounded-3xl border border-zinc-200 bg-white p-6 md:sticky md:top-24">
            <div className="text-xs uppercase tracking-[0.18em] text-zinc-400">Your order</div>
            <h3 className="mt-2 text-xl font-semibold">{cart.reduce((sum, entry) => sum + entry.quantity, 0)} item{cart.reduce((sum, entry) => sum + entry.quantity, 0) === 1 ? "" : "s"}</h3>
            <div className="mt-4 space-y-2">{cart.length ? cart.map((entry) => <div key={entry.item} className="flex justify-between text-sm"><span className="text-zinc-500">{entry.item} × {entry.quantity}</span><span>₹{(prices[entry.item] as number) * entry.quantity}</span></div>) : <p className="text-sm text-zinc-400">Add an item from this shop.</p>}</div>
            <div className="mt-5 border-t border-zinc-100 pt-4 flex justify-between font-semibold"><span>Total</span><span>₹{total}</span></div>
            <button disabled={!cart.length} onClick={() => setPlaced(true)} className="mt-4 w-full rounded-2xl bg-zinc-900 py-3.5 text-sm font-semibold text-white disabled:bg-zinc-200 disabled:text-zinc-400">Place shop order</button>
            {placed && <div className="mt-4 rounded-2xl bg-emerald-50 p-4 text-xs text-emerald-800"><b>Order placed.</b><br/>{shop.name} has received your order for preparation.</div>}
          </aside>
        </div>
      </div>
    </main>
  );
}
