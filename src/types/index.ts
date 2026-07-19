import { Database } from '@/types/supabase';

export type Profile = Database['public']['Tables']['profiles']['Row'];
export type Quote = Database['public']['Tables']['quotes']['Row'];
export type Order = Database['public']['Tables']['orders']['Row'];
export type TrackingUpdate = Database['public']['Tables']['tracking_updates']['Row'];
export type BlogPost = Database['public']['Tables']['blog_posts']['Row'];
export type Contact = Database['public']['Tables']['contacts']['Row'];
export type Notification = Database['public']['Tables']['notifications']['Row'];

export type ProductType = 'LNG' | 'CNG' | 'Diesel (AGO)' | 'Petrol (PMS)';
export type QuoteStatus = 'Quote Submitted' | 'Under Review' | 'Awaiting Payment' | 'Payment Confirmed' | 'Dispatch Scheduled' | 'In Transit' | 'Delivered' | 'Cancelled';
export type UserRole = 'customer' | 'admin';

export const products: { value: ProductType; label: string; description: string }[] = [
  { value: 'LNG', label: 'LNG (Liquefied Natural Gas)', description: 'Clean-burning natural gas for industrial and commercial use' },
  { value: 'CNG', label: 'CNG (Compressed Natural Gas)', description: 'Cost-effective fuel for transportation and power generation' },
  { value: 'Diesel (AGO)', label: 'Diesel (AGO)', description: 'Premium Automotive Gas Oil for generators and machinery' },
  { value: 'Petrol (PMS)', label: 'Petrol (PMS)', description: 'Premium Motor Spirit for vehicles and equipment' },
];

export const quoteStatuses: QuoteStatus[] = [
  'Quote Submitted',
  'Under Review',
  'Awaiting Payment',
  'Payment Confirmed',
  'Dispatch Scheduled',
  'In Transit',
  'Delivered',
  'Cancelled',
];
