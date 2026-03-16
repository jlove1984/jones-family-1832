/**
 * Email sending for auth (magic link, email OTP). Uses Resend when RESEND_API_KEY is set.
 */

import { Resend } from 'resend'

const resend =
  process.env.RESEND_API_KEY && new Resend(process.env.RESEND_API_KEY)
const from = process.env.EMAIL_FROM ?? 'Jones Family Hub <onboarding@resend.dev>'

export async function sendEmail(options: {
  to: string
  subject: string
  text: string
  html?: string
}): Promise<void> {
  if (resend) {
    void resend.emails
      .send({
        from,
        to: options.to,
        subject: options.subject,
        text: options.text,
        html: options.html ?? options.text.replace(/\n/g, '<br>'),
      })
      .catch((err) => console.error('[sendEmail]', err))
    return
  }
  if (process.env.NODE_ENV === 'development') {
    console.log('[sendEmail] (no RESEND_API_KEY)', options.subject, '→', options.to)
    console.log(options.text)
  }
}
