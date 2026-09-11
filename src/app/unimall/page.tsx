"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

const shops = [{"name": "Le Broc", "service": "convenience retail store", "sourceItems": "everyday items,quick meals,and emergency supplies", "items": ["Everyday Items", "Quick Meals", "And Emergency Supplies"]}, {"name": "CCD", "service": "Coffee outlet", "sourceItems": "all types of hot and cold coffees", "items": ["Hot Coffee", "Cold Coffee", "Cappuccino", "Iced Coffee"]}, {"name": "Pure Bites", "service": "Satvik Foods", "sourceItems": "pure,wholesome,and vegetarian food prepared acc to traditional yogic", "items": ["Veg Meal", "Paneer Wrap", "Masala Maggi", "Cold Drink"]}, {"name": "lovely sweets", "service": "food and beverages", "sourceItems": "sweets items and dish", "items": ["Gulab Jamun", "Kaju Katli", "Rasgulla", "Fresh Sweets"]}, {"name": "himalya wellness store", "service": "personal care store", "sourceItems": "medical items and care items", "items": ["Personal Care Kit", "Wellness Essentials", "First Aid Items", "Care Products"]}, {"name": "phone zone", "service": "mobiles,accessories and recharge", "sourceItems": "all phone accessories", "items": ["Phone Cases", "Chargers", "Earphones", "Screen Protectors"]}, {"name": "nivia", "service": "sports goods and apparels", "sourceItems": "all sports items", "items": ["Cricket Gear", "Football", "Sports Shoes", "Training Apparel"]}, {"name": "youth hub", "service": "clothing and accessories", "sourceItems": "clothes", "items": ["T-Shirts", "Hoodies", "Jeans", "Accessories"]}, {"name": "phone world", "service": "mobiles,accessories and recharge", "sourceItems": "all phone accessories", "items": ["Phone Cases", "Chargers", "Earphones", "Screen Protectors"]}, {"name": "the gift gallery", "service": "gifts gallery", "sourceItems": "all gift items and packing of it", "items": ["Gift Hamper", "Greeting Cards", "Wrapping Paper", "Personalized Gifts"]}, {"name": "AS phone house", "service": "mobiles,accessories and recharge", "sourceItems": "all phone accessories", "items": ["Phone Cases", "Chargers", "Earphones", "Screen Protectors"]}, {"name": "dominos pizza", "service": "italian cuisine", "sourceItems": "different types of pizzas", "items": ["Margherita Pizza", "Farmhouse Pizza", "Garlic Bread", "Pasta"]}, {"name": "blue dart", "service": "courier services", "sourceItems": "courier services", "items": ["Parcel Drop", "Document Delivery", "Courier Booking", "Packaging"]}, {"name": "sonu fashion", "service": "apparels", "sourceItems": "different types of cloths", "items": ["T-Shirts", "Hoodies", "Jeans", "Accessories"]}, {"name": "sachdeva luggage handloom", "service": "luggage and handloom", "sourceItems": "luggages and bags", "items": ["Backpacks", "Travel Bags", "Luggage", "Handloom Items"]}, {"name": "gourav book depot", "service": "book store", "sourceItems": "stationary", "items": ["Notebooks", "Pens", "Markers", "Study Supplies"]}, {"name": "study solutions", "service": "book store", "sourceItems": "stationary", "items": ["Notebooks", "Pens", "Markers", "Study Supplies"]}, {"name": "Snaryan services", "service": "internet café", "sourceItems": "café", "items": ["Printing", "Scanning", "Photocopy", "Internet Access"]}, {"name": "paul merchants", "service": "money transfer and ticket reservation", "sourceItems": "transfer of money", "items": ["Money Transfer", "Ticket Booking", "Reservation Service", "Payment Assistance"]}, {"name": "eyekart", "service": "eyezone", "sourceItems": "eyelens and specs of all types", "items": ["Eyeglasses", "Contact Lenses", "Frames", "Eye Accessories"]}, {"name": "touch automation", "service": "computer and accessories", "sourceItems": "computers gadgets", "items": ["Laptop Accessories", "Keyboard", "Mouse", "USB Drive"]}, {"name": "superdot computers(hp shop)", "service": "computer and accessories", "sourceItems": "computers gadgets", "items": ["Laptop Accessories", "Keyboard", "Mouse", "USB Drive"]}, {"name": "vn computers", "service": "computer and accessories", "sourceItems": "computers gadgets", "items": ["Laptop Accessories", "Keyboard", "Mouse", "USB Drive"]}, {"name": "fashion gallery", "service": "apparels and accessories", "sourceItems": "clothes", "items": ["T-Shirts", "Hoodies", "Jeans", "Accessories"]}, {"name": "jai jai computers", "service": "internet café", "sourceItems": "café", "items": ["Printing", "Scanning", "Photocopy", "Internet Access"]}, {"name": "suto cafe", "service": "birthday celebration zone", "sourceItems": "birthday items", "items": ["Birthday Decor", "Cake Accessories", "Party Supplies", "Celebration Kit"]}, {"name": "korean photo-booth", "service": "photo studio and korean accessories", "sourceItems": "frames and photography items", "items": ["Photo Prints", "Frames", "Studio Session", "Photo Accessories"]}, {"name": "serving you", "service": "boutique", "sourceItems": "hair dressing", "items": ["T-Shirts", "Hoodies", "Jeans", "Accessories"]}, {"name": "valour esports", "service": "gaming café", "sourceItems": "café", "items": ["Gaming Session", "PC Gaming", "Console Gaming", "Tournament Pass"]}, {"name": "myntra/flipkart", "service": "courier services", "sourceItems": "courier services", "items": ["Parcel Drop", "Document Delivery", "Courier Booking", "Packaging"]}, {"name": "bystbeez logistics", "service": "courier services", "sourceItems": "courier services", "items": ["Parcel Drop", "Document Delivery", "Courier Booking", "Packaging"]}, {"name": "acculogics", "service": "courier services", "sourceItems": "courier services", "items": ["Parcel Drop", "Document Delivery", "Courier Booking", "Packaging"]}, {"name": "meesho", "service": "courier services", "sourceItems": "courier services", "items": ["Parcel Drop", "Document Delivery", "Courier Booking", "Packaging"]}, {"name": "jeans camp", "service": "apparels", "sourceItems": "jeans and pants of all sizes", "items": ["T-Shirts", "Hoodies", "Jeans", "Accessories"]}, {"name": "mapple and burrito", "service": "food and beverages", "sourceItems": "food", "items": ["Veg Meal", "Paneer Wrap", "Masala Maggi", "Cold Drink"]}, {"name": "chicago delight", "service": "italian cuisine", "sourceItems": "italian food", "items": ["Margherita Pizza", "Farmhouse Pizza", "Garlic Bread", "Pasta"]}, {"name": "juice land", "service": "food and beverages", "sourceItems": "shakes and alll", "items": ["Veg Meal", "Paneer Wrap", "Masala Maggi", "Cold Drink"]}, {"name": "symposium", "service": "chinese cuisine", "sourceItems": "chinese items", "items": ["Veg Momos", "Paneer Momos", "Hakka Noodles", "Chilli Potato"]}, {"name": "schmitten chocolates", "service": "premium  chocolate store", "sourceItems": "chocolates", "items": ["Chocolates"]}, {"name": "wow momos", "service": "chinese cuisine", "sourceItems": "chinese items", "items": ["Veg Momos", "Paneer Momos", "Hakka Noodles", "Chilli Potato"]}, {"name": "chai vyanjan", "service": "food and beverages", "sourceItems": "food", "items": ["Veg Meal", "Paneer Wrap", "Masala Maggi", "Cold Drink"]}, {"name": "food bowl", "service": "south indian and continental cuisine", "sourceItems": "south indian items", "items": ["South Indian Items"]}, {"name": "protein o shake", "service": "food and beverages", "sourceItems": "shakes and all", "items": ["Veg Meal", "Paneer Wrap", "Masala Maggi", "Cold Drink"]}, {"name": "jacked up café", "service": "milk shakes and mocktails", "sourceItems": "shakes and all", "items": ["Shakes And All"]}, {"name": "ahuja shakes and refreshments", "service": "juice and shakes", "sourceItems": "shakes and all", "items": ["Shakes And All"]}, {"name": "moms kitchen", "service": "food and beverages", "sourceItems": "food", "items": ["Veg Meal", "Paneer Wrap", "Masala Maggi", "Cold Drink"]}, {"name": "toco town", "service": "food and beverages", "sourceItems": "food", "items": ["Veg Meal", "Paneer Wrap", "Masala Maggi", "Cold Drink"]}, {"name": "café 180", "service": "coffee shop and hangout place", "sourceItems": "shakes and all", "items": ["Hot Coffee", "Cold Coffee", "Cappuccino", "Iced Coffee"]}, {"name": "fitness edge", "service": "multi speciality gym", "sourceItems": "gym accessories", "items": ["USB Cable", "Power Adapter", "Gadgets", "Accessories"]}];
const slugify = (v: string) => v.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export default function Page() {
  const [query, setQuery] = useState("");
  const [service, setService] = useState("All");
  const services = ["All", ...Array.from(new Set(shops.map(s => s.service)))];
  const filtered = useMemo(() => shops.filter(s =>
    (service === "All" || s.service === service) &&
    (s.name.toLowerCase().includes(query.toLowerCase()) || s.service.toLowerCase().includes(query.toLowerCase()) || s.sourceItems.toLowerCase().includes(query.toLowerCase()))
  ), [query, service]);

  return (
    <main className="min-h-screen bg-[#f7f7f5] text-zinc-900">
      <header className="sticky top-0 z-50 border-b border-zinc-200/70 bg-[#f7f7f5]/90 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-900 text-sm font-bold text-white">C</div>
            <div><div className="font-semibold tracking-tight">CampusFlow</div><div className="text-[10px] uppercase tracking-[0.18em] text-zinc-400">LPU campus commerce</div></div>
          </Link>
          <nav className="flex items-center gap-1">
            <Link href="/food" className="rounded-full px-3 py-2 text-xs font-medium hover:bg-white">Food</Link>
            <Link href="/essentials" className="rounded-full px-3 py-2 text-xs font-medium hover:bg-white">Essentials</Link>
            <Link href="/unimall" className="rounded-full bg-white px-3 py-2 text-xs font-semibold ring-1 ring-zinc-200">UniMall</Link>
            <Link href="/signup" className="ml-1 rounded-full bg-zinc-900 px-4 py-2 text-xs font-semibold text-white">Sign up</Link>
          </nav>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-10">
        <section className="rounded-[2rem] bg-zinc-900 p-8 text-white md:p-12">
          <div className="mb-4 inline-flex rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs text-zinc-300">🏪 UniMall · LPU shop directory</div>
          <h1 className="text-4xl font-semibold tracking-tight md:text-6xl">Everything around UniMall.</h1>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-zinc-400">Explore the shops in your uploaded campus directory. We infer a browsable product menu from each shop's service type and listed offerings for this prototype.</p>
          <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search 49 shops, services or items..." className="mt-7 w-full max-w-2xl rounded-2xl bg-white/10 px-4 py-3 text-sm text-white outline-none placeholder:text-zinc-500"/>
        </section>

        <div className="mt-6 flex gap-2 overflow-x-auto pb-2">
          {services.map(s => <button key={s} onClick={() => setService(s)} className={`whitespace-nowrap rounded-full border px-4 py-2 text-xs ${service === s ? "border-zinc-900 bg-zinc-900 text-white" : "border-zinc-200 bg-white text-zinc-500"}`}>{s}</button>)}
        </div>

        <div className="mt-6 flex items-center justify-between">
          <h2 className="text-2xl font-semibold">{filtered.length} shops</h2>
          <span className="text-xs text-zinc-400">Every shop is clickable</span>
        </div>

        <section className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map(shop => (
            <Link key={shop.name} href={`/shop/${slugify(shop.name)}`} className="group rounded-3xl border border-zinc-200 bg-white p-5 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-zinc-200/50">
              <div className="flex items-start justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-zinc-100">🏪</div>
                <span className="text-zinc-300 group-hover:text-zinc-900">↗</span>
              </div>
              <h3 className="mt-5 text-lg font-semibold capitalize">{shop.name}</h3>
              <p className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-zinc-400">{shop.service}</p>
              <p className="mt-3 line-clamp-2 text-sm text-zinc-500">{shop.sourceItems}</p>
              <div className="mt-5 flex items-center justify-between">
                <span className="text-xs font-semibold">Browse items</span>
                <span className="text-xs text-zinc-400">{shop.items.length} predicted items</span>
              </div>
            </Link>
          ))}
        </section>
      </div>
    </main>
  );
}
