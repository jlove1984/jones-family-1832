/**
 * Zod schemas for API and form validation (TDD 4.3, 4.5).
 * Reuse in API routes and React Hook Form via @hookform/resolvers/zod.
 */

import { z } from 'zod'

// ---- Auth (TDD 4.5) ----
export const registerBodySchema = z.object({
  name: z.string().min(1, 'Name is required').max(255),
  email: z.string().email('Invalid email').max(255),
  password: z.string().min(8, 'Password must be at least 8 characters').max(255),
})

export const loginBodySchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(1, 'Password is required'),
})

export const forgotPasswordBodySchema = z.object({
  email: z.string().email('Invalid email'),
})

// ---- Directory PATCH (TDD 4.5) ----
export const directoryPatchBodySchema = z.object({
  branch: z.string().max(100).optional().nullable(),
  phone: z.string().max(20).optional().nullable(),
  city: z.string().max(100).optional().nullable(),
  state: z.string().max(50).optional().nullable(),
  householdSize: z.number().int().min(1).max(50).optional(),
  profilePhotoUrl: z.string().url().optional().nullable(),
  bio: z.string().max(5000).optional().nullable(),
  birthDate: z.string().optional().nullable(),
  birthYear: z.number().int().min(1900).max(2100).optional().nullable(),
  showBirthday: z.boolean().optional(),
  birthdayEmailNotifications: z.boolean().optional(),
  isVisible: z.boolean().optional(),
})

// ---- Achievements (TDD 4.5) ----
export const achievementCategorySchema = z.enum([
  'New Baby',
  'Graduation',
  'Wedding',
  'Promotion',
  'Military',
  'Memorial',
])

export const achievementPostBodySchema = z.object({
  title: z.string().min(1, 'Title is required').max(255),
  category: achievementCategorySchema,
  description: z.string().max(5000).optional().nullable(),
  achievementDate: z.string().min(1, 'Date is required'),
  photoUrl: z.string().url().optional().nullable(),
})

// ---- Contact (TDD 4.5) ----
export const contactCategorySchema = z.enum(['Directory', 'Reunion', 'Payments', 'Media'])

export const contactPostBodySchema = z.object({
  category: contactCategorySchema,
  senderName: z.string().max(255).optional().nullable(),
  senderEmail: z.string().email('Invalid email').max(255),
  subject: z.string().max(500).optional().nullable(),
  message: z.string().min(1, 'Message is required').max(10000),
})

// ---- Reunion RSVP (TDD 4.5) ----
export const reunionRsvpBodySchema = z.object({
  attending: z.boolean(),
  adultsCount: z.number().int().min(0).max(50),
  childrenCount: z.number().int().min(0).max(50),
  dietaryRestrictions: z.string().max(1000).optional().nullable(),
  lodgingNeeded: z.boolean(),
  specialRequests: z.string().max(2000).optional().nullable(),
})

// ---- Payments create-intent (TDD 4.5) ----
export const paymentTypeSchema = z.enum(['adult', 'youth', 'senior', 'donation'])

export const paymentsCreateIntentBodySchema = z.object({
  amount: z.number().positive('Amount must be positive'),
  paymentType: paymentTypeSchema,
  reunionYear: z.number().int().min(2020).max(2030).optional().nullable(),
})

// ---- Birthday wish (TDD 4.5) ----
export const birthdayWishBodySchema = z.object({
  message: z.string().min(1, 'Message is required').max(2000),
})

// ---- Gallery (TDD 4.5) ----
export const galleryAlbumPostBodySchema = z.object({
  title: z.string().min(1, 'Title is required').max(255),
  description: z.string().max(2000).optional().nullable(),
  year: z.number().int().min(1900).max(2100).optional().nullable(),
  category: z.string().max(50).optional().nullable(),
})

export const galleryAlbumPatchBodySchema = z.object({
  title: z.string().min(1).max(255).optional(),
  description: z.string().max(2000).optional().nullable(),
  year: z.number().int().min(1900).max(2100).optional().nullable(),
  category: z.string().max(50).optional().nullable(),
  coverPhotoUrl: z.string().url().optional().nullable(),
})

export const galleryMediaPostBodySchema = z.object({
  mediaUrl: z.string().url('Invalid URL'),
  mediaType: z.enum(['image', 'video']),
  caption: z.string().max(1000).optional().nullable(),
})

// ---- Reunion content (admin) ----
export const reunionContentPostBodySchema = z.object({
  contentKey: z.string().min(1).max(100),
  contentValue: z.string().optional().nullable(),
  contentType: z.string().max(50).optional(),
  sortOrder: z.number().int().optional(),
})

// ---- API error response (TDD 4.5) ----
export const apiErrorSchema = z.object({
  error: z.string(),
  code: z.string().optional(),
})

export type RegisterBody = z.infer<typeof registerBodySchema>
export type LoginBody = z.infer<typeof loginBodySchema>
export type ForgotPasswordBody = z.infer<typeof forgotPasswordBodySchema>
export type DirectoryPatchBody = z.infer<typeof directoryPatchBodySchema>
export type AchievementPostBody = z.infer<typeof achievementPostBodySchema>
export type ContactPostBody = z.infer<typeof contactPostBodySchema>
export type ReunionRsvpBody = z.infer<typeof reunionRsvpBodySchema>
export type PaymentsCreateIntentBody = z.infer<typeof paymentsCreateIntentBodySchema>
export type BirthdayWishBody = z.infer<typeof birthdayWishBodySchema>
export type GalleryAlbumPostBody = z.infer<typeof galleryAlbumPostBodySchema>
export type GalleryAlbumPatchBody = z.infer<typeof galleryAlbumPatchBodySchema>
export type GalleryMediaPostBody = z.infer<typeof galleryMediaPostBodySchema>
export type ReunionContentPostBody = z.infer<typeof reunionContentPostBodySchema>
