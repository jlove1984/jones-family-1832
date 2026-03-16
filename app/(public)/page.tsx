import Link from 'next/link'
import { Users, Trophy, Image as ImageIcon, CreditCard, PartyPopper } from 'lucide-react'
import { FeatureCard } from '@/components/home/feature-card'
import { CountdownTimer } from '@/components/home/countdown-timer'

/**
 * Homepage layout aligned with WordPress default theme (Twenty Twenty-Four) standards:
 * - Content width 620px for readable text blocks; wide 1280px for sections
 * - Consistent section padding (min(4rem, 5vw) / min(6.5rem, 8vw))
 * - Block gap 1.2rem; typography scale and line-height 1.55
 */
export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero: centered content width, WP-style spacing */}
      <section className="relative bg-gradient-to-br from-heritage-green-DEFAULT to-heritage-green-light wp-section-padding-lg">
        <div className="mx-auto w-full max-w-wide px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-content text-center">
            <h1 className="text-3xl font-display font-bold tracking-tight text-white sm:text-5xl sm:leading-[1.15] mb-6">
              Welcome to the Jones Family Hub
            </h1>
            <p className="text-base sm:text-lg text-white/90 mb-8 leading-[1.55]">
              Connecting family since 1832. Preserving our heritage, celebrating our achievements, and building our future together.
            </p>
            <div className="flex flex-col sm:flex-row wp-block-gap justify-center sm:gap-5">
              <Link
                href="/reunion"
                className="inline-flex items-center justify-center rounded-[0.33rem] bg-white px-6 py-2.5 text-sm font-medium text-heritage-green-DEFAULT shadow-lg hover:bg-off-white transition-colors"
              >
                Reunion 2027 Info
              </Link>
              <Link
                href="/directory"
                className="inline-flex items-center justify-center rounded-[0.33rem] border-2 border-white px-6 py-2.5 text-sm font-medium text-white hover:bg-white/10 transition-colors"
              >
                View Directory
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Countdown: WP-style section padding and block gap */}
      <section className="wp-section-padding border-y-4 border-terracotta-DEFAULT bg-terracotta-DEFAULT/90 dark:bg-terracotta-soft/20 dark:border-terracotta-soft text-white">
        <div className="mx-auto w-full max-w-wide px-4 sm:px-6 lg:px-8 text-center">
          <div className="mx-auto max-w-content">
            <h2 className="text-xl sm:text-2xl font-display font-semibold mb-6 leading-tight">
              Reunion 2027 Countdown
            </h2>
            <CountdownTimer />
            <p className="text-sm text-white/90 mt-6 leading-[1.55]">
              Until we gather together again!
            </p>
          </div>
        </div>
      </section>

      {/* Latest achievements: wide grid, content-width heading + intro */}
      <section className="wp-section-padding-lg bg-white dark:bg-rich-black">
        <div className="mx-auto w-full max-w-wide px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-content mb-10">
            <h2 className="text-xl sm:text-2xl font-display font-semibold mb-2 leading-tight">
              Latest Achievements
            </h2>
            <p className="text-sm text-slate-gray dark:text-muted-text leading-[1.55]">
              Recent milestones from the family.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <article
                key={i}
                className="rounded-[min(1.5rem,2vw)] border border-light-gray dark:border-medium-gray bg-cream dark:bg-dark-cream p-6 shadow-card dark:shadow-card-dark"
              >
                <div className="h-24 rounded-[0.33rem] bg-light-gray/50 dark:bg-medium-gray/50 mb-4" />
                <div className="h-4 w-3/4 rounded bg-charcoal/10 dark:bg-light-text/10 mb-2" />
                <div className="h-3 w-full rounded bg-slate-gray/20 dark:bg-muted-text/20" />
                <p className="text-sm text-slate-gray dark:text-muted-text mt-2 leading-[1.55]">
                  Coming soon
                </p>
              </article>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/achievements"
              className="inline-flex items-center justify-center rounded-[0.33rem] border-2 border-heritage-green-DEFAULT dark:border-heritage-green-light px-6 py-2.5 text-sm font-medium text-heritage-green-DEFAULT dark:text-heritage-green-light hover:bg-heritage-green-DEFAULT/10 transition-colors"
            >
              View all achievements
            </Link>
          </div>
        </div>
      </section>

      {/* Upcoming birthdays: content-width block */}
      <section className="wp-section-padding-lg bg-cream dark:bg-dark-cream">
        <div className="mx-auto w-full max-w-wide px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-content">
            <h2 className="text-xl sm:text-2xl font-display font-semibold mb-2 flex items-center gap-2 leading-tight">
              <span role="img" aria-hidden>🎂</span>
              Upcoming Birthdays
            </h2>
            <p className="text-slate-gray dark:text-muted-text text-sm mb-6 leading-[1.55]">
              Today and the next 7 days — names and ages when not logged in.
            </p>
            <div className="rounded-[min(1.5rem,2vw)] border border-light-gray dark:border-medium-gray bg-white dark:bg-dark-gray p-6 shadow-card dark:shadow-card-dark">
              <div className="flex flex-col gap-3">
                {[1, 2].map((i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 rounded-[0.33rem] border border-light-gray/50 dark:border-medium-gray/50 p-3"
                  >
                    <div className="h-12 w-12 rounded-full bg-legacy-gold-DEFAULT/20 dark:bg-legacy-gold-bright/20 flex-shrink-0" />
                    <div>
                      <div className="h-4 w-32 rounded bg-charcoal/20 dark:bg-light-text/20 mb-2" />
                      <div className="h-3 w-20 rounded bg-slate-gray/20" />
                    </div>
                  </div>
                ))}
              </div>
              <Link
                href="/birthdays"
                className="mt-4 inline-flex text-sm font-medium text-heritage-green-DEFAULT dark:text-heritage-green-light hover:underline"
              >
                View all birthdays →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quick navigation: wide grid, WP block gap */}
      <section className="wp-section-padding-lg bg-white dark:bg-rich-black">
        <div className="mx-auto w-full max-w-wide px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-content mb-10">
            <h2 className="text-xl sm:text-2xl font-display font-semibold mb-2 leading-tight">
              Explore
            </h2>
            <p className="text-slate-gray dark:text-muted-text text-sm leading-[1.55]">
              Reunion, directory, achievements, gallery, and more.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
            <FeatureCard
              icon={<PartyPopper className="h-10 w-10" />}
              title="Reunion 2027"
              description="Event details, RSVP, and reunion information."
              href="/reunion"
            />
            <FeatureCard
              icon={<CreditCard className="h-10 w-10" />}
              title="Payments"
              description="Reunion dues and optional donations."
              href="/payments"
            />
            <FeatureCard
              icon={<Trophy className="h-10 w-10" />}
              title="Achievements"
              description="Celebrate milestones and family accomplishments."
              href="/achievements"
            />
            <FeatureCard
              icon={<Users className="h-10 w-10" />}
              title="Family Directory"
              description="Connect with family across branches and generations."
              href="/directory"
            />
            <FeatureCard
              icon={<ImageIcon className="h-10 w-10" />}
              title="Photo Gallery"
              description="Browse photos and videos from reunions and family history."
              href="/gallery"
            />
          </div>
        </div>
      </section>

      {/* CTA: content width, centered, WP-style button */}
      <section className="wp-section-padding-lg bg-cream dark:bg-dark-cream">
        <div className="mx-auto w-full max-w-content px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-display font-bold mb-4 leading-tight">
            Join Us for Reunion 2027
          </h2>
          <p className="text-base sm:text-lg text-slate-gray dark:text-muted-text mb-8 leading-[1.55]">
            Mark your calendars for July 15–17, 2027. Three days of family fun, storytelling, and creating new memories together.
          </p>
          <Link
            href="/reunion"
            className="inline-flex items-center justify-center rounded-[0.33rem] bg-heritage-green-DEFAULT px-8 py-3 text-sm font-medium text-white shadow-button hover:bg-heritage-green-DEFAULT/90 transition-colors"
          >
            RSVP Now
          </Link>
        </div>
      </section>
    </div>
  )
}
