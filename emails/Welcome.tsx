import {
  Body, Container, Head, Heading, Hr, Html, Preview, Section, Text,
} from 'react-email'
import { WelcomeEmailData } from '@/services/email'

export function WelcomeEmail({ name, email }: WelcomeEmailData) {
  return (
    <Html lang="en">
      <Head />
      <Preview>Welcome to Arar Residency — مرحباً بك في مساكن عرعر</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Heading style={headerTitle}>Arar Residency | مساكن عرعر</Heading>
            <Text style={headerSubtitle}>Arar, Saudi Arabia</Text>
          </Section>

          <Heading style={title}>Welcome, {name}! 👋</Heading>

          <Text style={bodyText}>
            Thank you for creating an account with <strong>Arar Residency</strong>. We're thrilled to have you with us.
          </Text>
          <Text style={bodyText}>
            You can now explore our rooms, make reservations, and manage your bookings all from one place.
          </Text>

          <Section style={ctaSection}>
            <a href={`${process.env.NEXT_PUBLIC_SITE_URL}/rooms`} style={ctaButton}>
              Explore Rooms →
            </a>
          </Section>

          <Section style={featureGrid}>
            <Text style={featureItem}>🛏️ Nightly, weekly & monthly stays</Text>
            <Text style={featureItem}>🏆 Premium rooms in Arar</Text>
            <Text style={featureItem}>📱 WhatsApp support 24/7</Text>
            <Text style={featureItem}>🎫 Exclusive promo codes</Text>
          </Section>

          <Hr style={divider} />

          <Text style={arabicNote}>
            أهلاً وسهلاً، {name}! شكراً لانضمامك إلى مساكن عرعر. نتطلع إلى خدمتك وتقديم أفضل تجربة إقامة لك.
          </Text>

          <Text style={footer}>
            If you have any questions, contact us at info@ararresidency.com
          </Text>
          <Text style={footerAddress}>
            Arar Residency — Arar, Saudi Arabia
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

const main = { backgroundColor: '#f4f4f5', fontFamily: "'Segoe UI', Arial, sans-serif" }
const container = { maxWidth: '600px', margin: '0 auto', backgroundColor: '#ffffff', borderRadius: '16px', overflow: 'hidden' }
const header = { backgroundColor: '#1a1a2e', padding: '32px 40px', textAlign: 'center' as const }
const headerTitle = { color: '#c8a96e', fontSize: '24px', fontWeight: '700', margin: '0' }
const headerSubtitle = { color: '#94a3b8', fontSize: '13px', margin: '4px 0 0' }
const title = { fontSize: '24px', fontWeight: '700', color: '#111827', padding: '32px 40px 0' }
const bodyText = { fontSize: '15px', color: '#4b5563', lineHeight: '1.6', padding: '0 40px 12px' }
const ctaSection = { textAlign: 'center' as const, padding: '16px 40px 24px' }
const ctaButton = {
  backgroundColor: '#c8a96e', color: '#ffffff', padding: '14px 36px',
  borderRadius: '10px', fontWeight: '700', fontSize: '15px',
  textDecoration: 'none', display: 'inline-block',
}
const featureGrid = { backgroundColor: '#f9fafb', borderRadius: '12px', margin: '0 40px 24px', padding: '16px 24px' }
const featureItem = { fontSize: '14px', color: '#374151', margin: '6px 0', lineHeight: '1.5' }
const arabicNote = { fontSize: '14px', color: '#6b7280', lineHeight: '1.8', padding: '16px 40px 0', direction: 'rtl' as const, textAlign: 'right' as const }
const divider = { borderColor: '#e5e7eb', margin: '0 40px' }
const footer = { fontSize: '13px', color: '#9ca3af', textAlign: 'center' as const, padding: '20px 40px 4px' }
const footerAddress = { fontSize: '12px', color: '#d1d5db', textAlign: 'center' as const, padding: '0 40px 32px' }
