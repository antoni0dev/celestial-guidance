import { Resend } from 'resend'
import { env } from '@/lib/env'

type SendReadingEmailInput = {
  to: string
  name: string
  plan: string
  reading: string
  spiritualProfile: {
    zodiacSign: string
    moonSign: string
    lifePathNumber: number
    tarotCards: readonly string[]
  }
}

const buildEmailHtml = ({
  name,
  plan,
  reading,
  spiritualProfile,
}: Omit<SendReadingEmailInput, 'to'>): string => {
  const readingHtml = reading
    .replace(/\n/g, '<br />')
    .replace(
      /## (.+)/g,
      '<h2 style="color: #831843; font-size: 20px; margin-top: 24px; margin-bottom: 12px;">$1</h2>'
    )
    .replace(
      /# (.+)/g,
      '<h1 style="color: #831843; font-size: 24px; margin-top: 24px; margin-bottom: 12px;">$1</h1>'
    )
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
</head>
<body style="margin: 0; padding: 0; background-color: #fdf2f8; font-family: 'Georgia', serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #fdf2f8; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(236, 72, 153, 0.1);">

          <tr>
            <td style="background: linear-gradient(135deg, #ec4899, #f43f5e); padding: 40px 40px 30px; text-align: center;">
              <h1 style="color: #ffffff; font-size: 28px; margin: 0 0 8px;">Celestial Guidance</h1>
              <p style="color: rgba(255,255,255,0.9); font-size: 14px; margin: 0; letter-spacing: 2px; text-transform: uppercase;">Your Spiritual Reading</p>
            </td>
          </tr>

          <tr>
            <td style="padding: 40px;">
              <p style="color: #5a4a5a; font-size: 16px; line-height: 1.6; margin: 0 0 24px;">
                Dear ${name},
              </p>
              <p style="color: #5a4a5a; font-size: 16px; line-height: 1.6; margin: 0 0 24px;">
                Your ${plan} reading is ready. The stars have spoken, and we are honored to share their wisdom with you.
              </p>

              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #fdf2f8; border-radius: 12px; margin-bottom: 32px;">
                <tr>
                  <td style="padding: 24px;">
                    <h2 style="color: #831843; font-size: 18px; margin: 0 0 16px;">Your Spiritual Profile</h2>
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="color: #5a4a5a; font-size: 14px; padding: 4px 0;">Zodiac Sign</td>
                        <td style="color: #831843; font-size: 14px; font-weight: bold; text-align: right; padding: 4px 0;">${spiritualProfile.zodiacSign}</td>
                      </tr>
                      <tr>
                        <td style="color: #5a4a5a; font-size: 14px; padding: 4px 0;">Moon Sign</td>
                        <td style="color: #831843; font-size: 14px; font-weight: bold; text-align: right; padding: 4px 0;">${spiritualProfile.moonSign}</td>
                      </tr>
                      <tr>
                        <td style="color: #5a4a5a; font-size: 14px; padding: 4px 0;">Life Path Number</td>
                        <td style="color: #831843; font-size: 14px; font-weight: bold; text-align: right; padding: 4px 0;">${spiritualProfile.lifePathNumber}</td>
                      </tr>
                      <tr>
                        <td style="color: #5a4a5a; font-size: 14px; padding: 4px 0;">Tarot Cards</td>
                        <td style="color: #831843; font-size: 14px; font-weight: bold; text-align: right; padding: 4px 0;">${spiritualProfile.tarotCards.join(', ')}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <div style="color: #5a4a5a; font-size: 15px; line-height: 1.8;">
                ${readingHtml}
              </div>
            </td>
          </tr>

          <tr>
            <td style="background-color: #fdf2f8; padding: 30px 40px; text-align: center; border-top: 1px solid rgba(236, 72, 153, 0.1);">
              <p style="color: #ec4899; font-size: 16px; font-weight: bold; margin: 0 0 8px;">Celestial Guidance</p>
              <p style="color: #9ca3af; font-size: 12px; margin: 0;">AI-powered spiritual readings combining astrology, numerology, and tarot</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}

export const sendReadingEmail = async (
  input: SendReadingEmailInput
): Promise<{ success: boolean; error?: string }> => {
  const { resendApiKey, fromEmail } = env()
  const resend = new Resend(resendApiKey)

  const { data, error } = await resend.emails.send({
    from: `Celestial Guidance <${fromEmail}>`,
    to: input.to,
    subject: 'Your Celestial Guidance Reading is Ready',
    html: buildEmailHtml(input),
  })

  if (error) {
    return { success: false, error: error.message }
  }

  return { success: Boolean(data) }
}
