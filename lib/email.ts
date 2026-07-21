import { Resend } from 'resend';

// Initialize Resend with an empty string or dummy key if not provided in env for now,
// this allows the build to succeed without a real API key.
const resendApiKey = process.env.RESEND_API_KEY || 're_dummy_key_123456789';
const resend = new Resend(resendApiKey);

export const sendEmail = async ({
  to,
  subject,
  react,
}: {
  to: string;
  subject: string;
  react: React.ReactElement;
}) => {
  if (process.env.NODE_ENV === 'development') {
    console.log('Sending email to:', to);
    console.log('Subject:', subject);
    // In dev, we can just log that we "sent" it if there is no real key
    if (resendApiKey.startsWith('re_dummy')) {
      console.log('Dummy key detected, skipping real email send.');
      return { success: true, dummy: true };
    }
  }

  try {
    const data = await resend.emails.send({
      from: 'Arar Residency <noreply@arar-residency.com>',
      to,
      subject,
      react,
    });
    return { success: true, data };
  } catch (error) {
    console.error('Failed to send email:', error);
    return { success: false, error };
  }
};
