import Link from 'next/link'
import { Calendar, Users, Trophy, Image as ImageIcon } from 'lucide-react'
import { FeatureCard } from '@/components/home/feature-card'

export default function HomePage() {
  // Calculate days until reunion (July 15, 2027)
  const reunionDate = new Date('2027-07-15')
  const today = new Date()
  const daysUntil = Math.ceil((reunionDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-heritage-green-DEFAULT to-heritage-green-light py-24 sm:py-32">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-display font-bold tracking-tight text-white sm:text-6xl mb-6">
              Welcome to the Jones Family Hub
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-white/90 mb-8">
              Connecting family since 1832. Preserving our heritage, celebrating our achievements, and building our future together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/reunion"
                className="inline-flex items-center justify-center rounded-lg bg-white px-6 py-3 text-base font-semibold text-heritage-green-DEFAULT shadow-lg hover:bg-off-white transition-colors"
              >
                Reunion 2027 Info
              </Link>
              <Link
                href="/directory"
                className="inline-flex items-center justify-center rounded-lg border-2 border-white px-6 py-3 text-base font-semibold text-white hover:bg-white/10 transition-colors"
              >
                View Directory
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Countdown Section */}
      <section className="py-12 bg-legacy-gold-DEFAULT text-white">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-display font-semibold mb-2">Reunion 2027 Countdown</h2>
          <p className="text-5xl font-display font-bold">{daysUntil} Days</p>
          <p className="text-lg mt-2">Until we gather together again!</p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <FeatureCard
              icon={<Users className="h-10 w-10" />}
              title="Family Directory"
              description="Connect with family members across all branches and generations."
              href="/directory"
            />
            <FeatureCard
              icon={<Trophy className="h-10 w-10" />}
              title="Achievements"
              description="Celebrate milestones, graduations, and family accomplishments."
              href="/achievements"
            />
            <FeatureCard
              icon={<ImageIcon className="h-10 w-10" />}
              title="Photo Gallery"
              description="Browse photos and videos from reunions and family history."
              href="/gallery"
            />
            <FeatureCard
              icon={<Calendar className="h-10 w-10" />}
              title="Birthdays"
              description="Never miss a family member's birthday celebration."
              href="/birthdays"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-cream dark:bg-dark-cream py-16">
        <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-display font-bold mb-4">
            Join Us for Reunion 2027
          </h2>
          <p className="text-lg text-slate-gray dark:text-muted-text mb-8">
            Mark your calendars for July 15-17, 2027. Three days of family fun, storytelling, and creating new memories together.
          </p>
          <Link
            href="/reunion"
            className="inline-flex items-center justify-center rounded-lg bg-heritage-green-DEFAULT px-8 py-4 text-lg font-semibold text-white shadow-button hover:bg-heritage-green-DEFAULT/90 transition-colors"
          >
            RSVP Now
          </Link>
        </div>
      </section>
    </div>
  )
}
