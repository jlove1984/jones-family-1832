import { RegisterForm } from '@/components/auth/register-form'

export const metadata = {
  title: 'Create account',
  description: 'Register for Jones Family Hub',
}

export default function RegisterPage() {
  return (
    <div className="w-full max-w-[400px]">
      <div className="rounded-card border border-light-gray dark:border-medium-gray bg-white dark:bg-dark-gray p-8 shadow-card dark:shadow-card-dark">
        <h1 className="text-2xl font-display font-semibold mb-6">Create account</h1>
        <RegisterForm />
      </div>
    </div>
  )
}
