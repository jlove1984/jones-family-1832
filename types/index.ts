/**
 * TypeScript types aligned with TDD Section 4.4 (Database Schema) and API contracts.
 * Use these for API request/response shapes and DB entities.
 */

/** TDD: users table */
export interface User {
  id: string
  email: string
  name: string
  role: 'member' | 'admin'
  createdAt: Date
  updatedAt: Date
}

/** TDD: family_members table (directory profile) */
export interface FamilyMember {
  id: string
  userId: string
  branch: string | null
  phone: string | null
  city: string | null
  state: string | null
  householdSize: number
  profilePhotoUrl: string | null
  bio: string | null
  birthDate: string | null
  birthYear: number | null
  showBirthday: boolean
  birthdayEmailNotifications: boolean
  isVisible: boolean
  createdAt: Date
  updatedAt: Date
}

/** TDD: achievements table; category values per TDD 3.2 */
export type AchievementCategory =
  | 'New Baby'
  | 'Graduation'
  | 'Wedding'
  | 'Promotion'
  | 'Military'
  | 'Memorial'

export interface Achievement {
  id: string
  familyMemberId: string | null
  title: string
  category: AchievementCategory
  description: string | null
  achievementDate: string
  photoUrl: string | null
  status: 'pending' | 'approved'
  submittedBy: string | null
  approvedBy: string | null
  approvedAt: Date | null
  createdAt: Date
  updatedAt: Date
}

/** TDD: gallery_albums */
export interface GalleryAlbum {
  id: string
  title: string
  description: string | null
  year: number | null
  category: string | null
  coverPhotoUrl: string | null
  createdBy: string | null
  createdAt: Date
  updatedAt: Date
}

/** TDD: gallery_media */
export interface GalleryMedia {
  id: string
  albumId: string
  mediaUrl: string
  mediaType: string
  caption: string | null
  uploadedBy: string | null
  fileSize: number | null
  width: number | null
  height: number | null
  createdAt: Date
}

/** TDD: birthday_wishes */
export interface BirthdayWish {
  id: string
  familyMemberId: string
  fromUserId: string
  message: string
  createdAt: Date
}

/** TDD: reunion_rsvps */
export interface ReunionRsvp {
  id: string
  userId: string
  reunionYear: number
  attending: boolean
  adultsCount: number
  childrenCount: number
  dietaryRestrictions: string | null
  lodgingNeeded: boolean
  specialRequests: string | null
  createdAt: Date
  updatedAt: Date
}

/** TDD: reunion_content (key-value for event details) */
export interface ReunionContent {
  id: string
  reunionYear: number
  contentKey: string
  contentValue: string | null
  contentType: string
  sortOrder: number
  updatedBy: string | null
  updatedAt: Date
}

/** TDD: contact_submissions */
export interface ContactSubmission {
  id: string
  category: string
  senderName: string | null
  senderEmail: string
  subject: string | null
  message: string
  createdAt: Date
}

/** TDD: payments (Phase 1 Stripe only) */
export type PaymentType = 'adult' | 'youth' | 'senior' | 'donation'

export interface Payment {
  id: string
  userId: string
  stripePaymentIntentId: string | null
  amount: number
  currency: string
  paymentType: PaymentType
  status: string
  reunionYear: number | null
  metadata: Record<string, unknown> | null
  createdAt: Date
  updatedAt: Date
}

/** TDD: audit_log (optional) */
export interface AuditLog {
  id: string
  actorId: string | null
  action: string
  resourceType: string
  resourceId: string | null
  details: Record<string, unknown> | null
  createdAt: Date
}

/** Convenience types for display (e.g. directory list with joined name from user) */
export interface Member {
  id: string
  name: string
  email: string
  phone?: string
  city?: string
  state?: string
  branch: string
  photo?: string
  householdMembers?: string[]
  birthdate?: string
  createdAt: Date
  updatedAt: Date
}

/** Upcoming birthday for homepage widget (public: name + age; auth: + profile photo) */
export interface Birthday {
  id: string
  memberId: string
  name: string
  birthdate: Date
  photo?: string
}

/** RSVP summary for forms/display */
export interface RSVP {
  id: string
  memberId: string
  attending: boolean
  adults: number
  children: number
  specialNeeds?: string
  createdAt: Date
}
