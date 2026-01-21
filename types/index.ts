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

export interface Achievement {
  id: string
  memberId: string
  memberName: string
  category: 'newbaby' | 'graduation' | 'wedding' | 'promotion' | 'military' | 'memorial'
  title: string
  description: string
  date: Date
  photo?: string
  approved: boolean
  createdAt: Date
}

export interface Birthday {
  id: string
  memberId: string
  name: string
  birthdate: Date
  photo?: string
}

export interface RSVP {
  id: string
  memberId: string
  attending: boolean
  adults: number
  children: number
  specialNeeds?: string
  createdAt: Date
}

export interface Payment {
  id: string
  memberId: string
  amount: number
  type: 'adult' | 'youth' | 'senior' | 'donation'
  status: 'pending' | 'completed' | 'failed'
  stripePaymentId?: string
  createdAt: Date
}
