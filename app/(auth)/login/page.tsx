import Link from 'next/link'
import { LoginForm } from '@/components/auth/login-form'

export const metadata = {
  title: 'Log in',
  description: 'Log in to Jones Family Hub',
}

export default function LoginPage() {
  return (
    <div className="container mx-auto max-w-md px-4 py-16">
      <div className="rounded-card border border-light-gray dark:border-medium-gray bg-white dark:bg-dark-gray p-8 shadow-card dark:shadow-card-dark">
        <h1 className="text-2xl font-display font-semibold mb-6">Log in</h1>
        <LoginForm />
        <p className="mt-4 text-center text-sm text-slate-gray dark:text-muted-text">
          <Link href="/forgot-password" className="text-heritage-green-DEFAULT dark:text-heritage-green-light hover:underline">
            Forgot password?
          </Link>
        </p>
      </div>
    </div>
  )
}
