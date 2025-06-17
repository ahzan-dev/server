import { BrandCategory, Weekday } from '@prisma/client';

export interface ContactDetails {
  phoneNumber?: string;
  website?: string;
  whatsapp?: string;
  email?: string;
}

export interface DayHours {
  id: string;
  weekday: Weekday;
  isClosed: boolean;
  openingTime?: string;
  closingTime?: string;
}

export interface OpeningHours {
  id: string;
  isSameAllDays: boolean;
  openingTime?: string;
  closingTime?: string;
  weeklyHours?: DayHours[];
}

export interface Branch {
  id: string;
  name: string;
  address: string;
  distance?: string;
  imageUrl?: string;
  mapLink?: string;
  openingHours?: OpeningHours;
}

export interface Menu {
  id: string;
  menuName: string;
  validUntil?: Date;
  imageUrl?: string;
}

export interface PopularDeal {
  id: string;
  dealName: string;
  endsIn?: string;
  price: string;
  imageUrl?: string;
  likes: number;
}

export interface Brand {
  id: string;
  name: string;
  logoUrl: string;
  coverPhotosUrls: string[];
  isVerified: boolean;
  category: BrandCategory;
  tag?: string;
  canFollow: boolean;
  followerCount: number;
  branchCount: number;
  brandUrlSlug: string;
  about: string;
  joinedDate: Date;
  contactDetails: ContactDetails;
  openingHours?: OpeningHours;
  branches: Branch[];
  menus: Menu[];
  popularDeals: PopularDeal[];
  createdAt: Date;
  updatedAt: Date;
}
