import { z } from 'zod';

export const quoteRequestSchema = z.object({
  companyName: z.string().min(2, 'Company name must be at least 2 characters'),
  contactPerson: z.string().min(2, 'Contact person must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().regex(/^[+]?[0-9]{10,15}$/, 'Please enter a valid phone number'),
  product: z.enum(['LNG', 'CNG', 'Diesel (AGO)', 'Petrol (PMS)'], {
    required_error: 'Please select a product',
  }),
  quantity: z.coerce.number().min(5000, 'Minimum order is 5,000 litres'),
  location: z.string().min(2, 'Please enter a delivery location'),
  dateNeeded: z.string().optional(),
  notes: z.string().max(1000, 'Notes cannot exceed 1000 characters').optional(),
});

export const contactSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().regex(/^[+]?[0-9]{10,15}$/, 'Please enter a valid phone number').optional(),
  subject: z.string().min(2, 'Subject must be at least 2 characters').optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

export const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const registerSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().regex(/^[+]?[0-9]{10,15}$/, 'Please enter a valid phone number').optional(),
  companyName: z.string().optional(),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

export const trackingSchema = z.object({
  referenceNumber: z.string().min(5, 'Please enter a valid reference number'),
});

export const blogPostSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  slug: z.string().min(3, 'Slug must be at least 3 characters'),
  excerpt: z.string().max(300, 'Excerpt cannot exceed 300 characters').optional(),
  content: z.string().min(50, 'Content must be at least 50 characters'),
  category: z.string().optional(),
  tags: z.array(z.string()).optional(),
  featuredImage: z.string().url('Please enter a valid URL').optional().or(z.literal('')),
  published: z.boolean().default(false),
});

export type QuoteRequestFormData = z.infer<typeof quoteRequestSchema>;
export type ContactFormData = z.infer<typeof contactSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type TrackingFormData = z.infer<typeof trackingSchema>;
export type BlogPostFormData = z.infer<typeof blogPostSchema>;
