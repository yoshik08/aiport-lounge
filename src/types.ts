// src/types.ts
export interface User {
  name: string;
  email: string;
  picture?: string;
}

export interface Lounge {
  name: string;
  airport: string;
  rating: number;
  price: string;
  tags: string[];
  icon: string;
  bg: string;
}

export interface Booking {
  id: string;
  name: string;
  email: string;
  lounge: string;
  date: string;
  status: string;
  createdAt: string;
}

export interface Member {
  id: string;
  name: string;
  mobile: string;
  ticket: string;
  tier: string;
  visits: number;
}