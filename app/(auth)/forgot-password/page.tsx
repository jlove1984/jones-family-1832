import Link from 'next/link'

export const metadata = {
  title: 'Forgot password',
  description: 'Reset your Jones Family Hub password',
}

export default function ForgotPasswordPage() {
  return (
    <div className="container mx-auto max-w-md px-4 py-16">
      <div className="rounded-card border border-light-gray dark:border-medium-gray bg-white dark:bg-dark-gray p-8 shadow-card dark:shadow-card-dark">
        <h1 className="text-2xl font-display font-semibold mb-6">Forgot password</h1>
        <p className="text-slate-gray dark:text-muted-text mb-6">
          Password reset via email will be wired to Better Auth in a follow-up. Use the links below.
        </p>
        <div className="flex flex-col gap-3">
          <Link
            href="/login"
            className="inline-flex justify-center rounded-lg bg-heritage-green-DEFAULT dark:bg-heritage-green-light px-4 py-2 text-center font-semibold text-white dark:text-rich-black hover:opacity-90"
          >
            Back to log in
          </Link>
          <Link href="/" className="text-center text-sm text-slate-gray dark:text-muted-text hover:underline">
            Back to home
          </Link>
        </div>
      </div>
    </div>
  )
}
