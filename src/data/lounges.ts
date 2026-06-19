// src/data/lounges.ts
import { Lounge } from '../types';

export const LOUNGES_DATA: Lounge[] = [
  { name: "The Altitude Club", airport: "DEL · Terminal 3 · International", rating: 4.9, price: "₹1,800", tags: ["Wi-Fi", "Dining", "Shower", "Spa"], icon: "✈", bg: "var(--bg2)" },
  { name: "Horizon Business Lounge", airport: "BOM · Terminal 2 · Domestic", rating: 4.7, price: "₹1,200", tags: ["Wi-Fi", "Bar", "Workstations"], icon: "🌐", bg: "linear-gradient(135deg,#e8eef5,#d0dae8)" },
  { name: "Serenity Premium Lounge", airport: "BLR · Terminal 1 · International", rating: 4.8, price: "₹2,200", tags: ["Wi-Fi", "Nap pods", "Dining", "Shower"], icon: "🛋", bg: "linear-gradient(135deg,#f0ebe8,#e8ddd8)" },
  { name: "SkyTeam Exclusive", airport: "HYD · International", rating: 4.6, price: "₹1,500", tags: ["Wi-Fi", "Dining", "Quiet Zone"], icon: "☁", bg: "linear-gradient(135deg,#eef2f3,#8e9eab)" },
  { name: "Oasis Executive", airport: "MAA · Terminal 4 · Domestic", rating: 4.5, price: "₹1,100", tags: ["Wi-Fi", "Snacks", "Newspapers"], icon: "🌴", bg: "linear-gradient(135deg,#e6dada,#274046)" },
  { name: "Plaza Premium", airport: "CCU · Terminal 2", rating: 4.7, price: "₹1,600", tags: ["Wi-Fi", "Bar", "Shower", "Massage"], icon: "⭐", bg: "linear-gradient(135deg,#fdfbfb,#ebedee)" }
];