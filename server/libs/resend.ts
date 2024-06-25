import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY)
const senderEmail = 'developer@cal-cal.com' // 'c3@kmutt.ac.th'

export default async function sendEmail (to: string, subject: string, html: string) {
    return resend.emails.send({
        from: `C3 KMUTT ${senderEmail}`,
        to,
        subject,
        html
    })
}