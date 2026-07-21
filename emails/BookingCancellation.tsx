import {
  Body, Container, Head, Heading, Hr, Html, Preview, Section, Text,
} from 'react-email'
import { BookingEmailData } from '@/services/email'

function formatDate(date: Date) {
  return new Intl.DateTimeFormat('en-GB', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  }).format(new Date(date))
}

export function BookingCancellationEmail(data: BookingEmailData) {
  const isAr = data.locale === 'ar'
  const roomName = isAr ? data.roomNameAr : data.roomNameEn
  const refCode = data.bookingId.slice(-6).toUpperCase()

  return (
    <Html lang={isAr ? 'ar' : 'en'} dir={isAr ? 'rtl' : 'ltr'}>
      <Head />
      <Preview>
        {isAr ? `تم إلغاء حجزك #${refCode}` : `Your booking has been cancelled #${refCode}`}
      </Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Heading style={headerTitle}>{isAr ? 'مساكن عرعر' : 'Arar Residency'}</Heading>
          </Section>

          <Section style={{ textAlign: 'center', padding: '24px 0 8px' }}>
            <Text style={cancelBadge}>
              {isAr ? '❌ تم إلغاء الحجز' : '❌ Booking Cancelled'}
            </Text>
          </Section>

          <Heading style={title}>
            {isAr ? `عزيزي ${data.guestName}،` : `Dear ${data.guestName},`}
          </Heading>
          <Text style={bodyText}>
            {isAr
              ? `نأسف لإبلاغك بأنه تم إلغاء حجزك رقم #${refCode} في مساكن عرعر.`
              : `We're sorry to inform you that your booking #${refCode} at Arar Residency has been cancelled.`}
          </Text>

          <Section style={detailsBox}>
            <Text style={detailRow}><strong>{isAr ? 'الغرفة:' : 'Room:'}</strong> {roomName}</Text>
            <Text style={detailRow}><strong>{isAr ? 'تاريخ الوصول:' : 'Check-In:'}</strong> {formatDate(data.checkIn)}</Text>
            <Text style={detailRow}><strong>{isAr ? 'تاريخ المغادرة:' : 'Check-Out:'}</strong> {formatDate(data.checkOut)}</Text>
          </Section>

          <Text style={bodyText}>
            {isAr
              ? 'إذا كنت تعتقد أن هذا خطأ أو تحتاج إلى مساعدة، يرجى التواصل معنا فوراً.'
              : 'If you believe this is an error or need assistance, please contact us immediately.'}
          </Text>

          <Hr style={divider} />
          <Text style={footer}>
            {isAr
              ? 'نأمل أن تتاح لنا فرصة خدمتك مجدداً في المستقبل.'
              : 'We hope to have the opportunity to serve you again in the future.'}
          </Text>
          <Text style={footerAddress}>Arar Residency — Arar, Saudi Arabia | info@ararresidency.com</Text>
        </Container>
      </Body>
    </Html>
  )
}

const main = { backgroundColor: '#f4f4f5', fontFamily: "'Segoe UI', Arial, sans-serif" }
const container = { maxWidth: '600px', margin: '0 auto', backgroundColor: '#ffffff', borderRadius: '16px', overflow: 'hidden' }
const header = { backgroundColor: '#1a1a2e', padding: '32px 40px', textAlign: 'center' as const }
const headerTitle = { color: '#c8a96e', fontSize: '26px', fontWeight: '700', margin: '0' }
const cancelBadge = { display: 'inline-block', backgroundColor: '#fee2e2', color: '#dc2626', borderRadius: '100px', padding: '6px 20px', fontSize: '14px', fontWeight: '600' }
const title = { fontSize: '22px', fontWeight: '700', color: '#111827', padding: '0 40px' }
const bodyText = { fontSize: '15px', color: '#4b5563', lineHeight: '1.6', padding: '0 40px' }
const detailsBox = { backgroundColor: '#fef2f2', borderRadius: '12px', margin: '16px 40px', padding: '16px 24px' }
const detailRow = { fontSize: '14px', color: '#374151', margin: '6px 0' }
const divider = { borderColor: '#e5e7eb', margin: '0 40px' }
const footer = { fontSize: '14px', color: '#6b7280', textAlign: 'center' as const, padding: '24px 40px 8px' }
const footerAddress = { fontSize: '12px', color: '#9ca3af', textAlign: 'center' as const, padding: '0 40px 32px' }
