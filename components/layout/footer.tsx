import Link from 'next/link'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-light-gray dark:border-medium-gray bg-white dark:bg-rich-black">
      <div className="container mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-lg font-display font-semibold text-heritage-green-DEFAULT dark:text-heritage-green-light mb-4">
              Jones Family Hub
            </h3>
            <p className="text-sm text-slate-gray dark:text-muted-text max-w-md">
              Connecting family since 1832. Preserving our heritage, celebrating our achievements, and building our future together.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-slate-gray dark:text-muted-text">
              <li>
                <Link href="/history" className="hover:text-heritage-green-DEFAULT dark:hover:text-heritage-green-light transition-colors">
                  Family History
                </Link>
              </li>
              <li>
                <Link href="/reunion" className="hover:text-heritage-green-DEFAULT dark:hover:text-heritage-green-light transition-colors">
                  Reunion 2027
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-heritage-green-DEFAULT dark:hover:text-heritage-green-light transition-colors">
                  Photo Gallery
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-heritage-green-DEFAULT dark:hover:text-heritage-green-light transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4">Members</h4>
            <ul className="space-y-2 text-sm text-slate-gray dark:text-muted-text">
              <li>
                <Link href="/directory" className="hover:text-heritage-green-DEFAULT dark:hover:text-heritage-green-light transition-colors">
                  Family Directory
                </Link>
              </li>
              <li>
                <Link href="/achievements" className="hover:text-heritage-green-DEFAULT dark:hover:text-heritage-green-light transition-colors">
                  Achievements
                </Link>
              </li>
              <li>
                <Link href="/birthdays" className="hover:text-heritage-green-DEFAULT dark:hover:text-heritage-green-light transition-colors">
                  Birthdays
                </Link>
              </li>
              <li>
                <Link href="/payments" className="hover:text-heritage-green-DEFAULT dark:hover:text-heritage-green-light transition-colors">
                  Payments
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-light-gray dark:border-medium-gray pt-8">
          <p className="text-center text-sm text-slate-gray dark:text-muted-text">
            © {currentYear} Jones Family. All rights reserved. | Est. 1832
          </p>
        </div>
      </div>
    </footer>
  )
}
