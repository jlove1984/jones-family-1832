import Link from 'next/link'

/**
 * Feature card component for showcasing features with icon, title, and description
 */
export interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
  href: string
}

export function FeatureCard({
  icon,
  title,
  description,
  href,
}: FeatureCardProps) {
  return (
    <Link
      href={href}
      className="group relative rounded-xl border border-light-gray dark:border-medium-gray bg-white dark:bg-dark-gray p-8 shadow-card hover:shadow-card-hover dark:shadow-card-dark dark:hover:shadow-card-hover-dark transition-all"
    >
      <div className="mb-4 text-heritage-green-DEFAULT dark:text-heritage-green-light">
        {icon}
      </div>
      <h3 className="text-xl font-display font-semibold mb-2">{title}</h3>
      <p className="text-slate-gray dark:text-muted-text">{description}</p>
    </Link>
  )
}
