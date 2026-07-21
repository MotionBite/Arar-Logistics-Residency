import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Preview,
  Row,
  Column,
  Section,
  Text,
} from 'react-email'
import { BookingEmailData } from '@/services/email'

function formatDate(date: Date) {
  return new Intl.DateTimeFormat('en-GB', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  }).format(new Date(date))
}

function formatSAR(amount: number) {
  return new Intl.NumberFormat('en-SA', {
    style: 'currency', currency: 'SAR', minimumFractionDigits: 0,
  }).format(amount)
}

export function BookingConfirmationEmail(data: BookingEmailData) {
  const isAr = data.locale === 'ar'
  const roomName = isAr ? data.roomNameAr : data.roomNameEn
  const refCode = data.bookingId.slice(-6).toUpperCase()

  return (
    <Html lang={isAr ? 'ar' : 'en'} dir={isAr ? 'rtl' : 'ltr'}>
      <Head />
      <Preview>
        {isAr ? `تم تأكيد حجزك #${refCode}` : `Your booking is confirmed #${refCode}`}
      </Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Heading style={headerTitle}>
              {isAr ? 'مساكن عرعر' : 'Arar Residency'}
            </Heading>
            <Text style={headerSubtitle}>
              {isAr ? 'عرعر، المملكة العربية السعودية' : 'Arar, Saudi Arabia'}
            </Text>
          </Section>

          {/* Badge */}
          <Section style={{ textAlign: 'center', padding: '24px 0 8px' }}>
            <Text style={successBadge}>
              {isAr ? '✅ تم تأكيد الحجز' : '✅ Booking Confirmed'}
            </Text>
          </Section>

          <Heading style={title}>
            {isAr ? `مرحباً، ${data.guestName}` : `Hello, ${data.guestName}!`}
          </Heading>
          <Text style={bodyText}>
            {isAr
              ? `يسعدنا إبلاغك بأن حجزك في مساكن عرعر قد تم تأكيده بنجاح. فيما يلي تفاصيل إقامتك:`
              : `We're delighted to confirm your reservation at Arar Residency. Here are your stay details:`}
          </Text>

          {/* Booking Details */}
          <Section style={detailsBox}>
            <Row>
              <Column style={detailLabel}>{isAr ? 'رقم الحجز' : 'Booking Ref'}</Column>
              <Column style={detailValue}>#{refCode}</Column>
            </Row>
            <Hr style={detailDivider} />
            <Row>
              <Column style={detailLabel}>{isAr ? 'الغرفة' : 'Room'}</Column>
              <Column style={detailValue}>{roomName}</Column>
            </Row>
            <Hr style={detailDivider} />
            <Row>
              <Column style={detailLabel}>{isAr ? 'تاريخ الوصول' : 'Check-In'}</Column>
              <Column style={detailValue}>{formatDate(data.checkIn)}</Column>
            </Row>
            <Hr style={detailDivider} />
            <Row>
              <Column style={detailLabel}>{isAr ? 'تاريخ المغادرة' : 'Check-Out'}</Column>
              <Column style={detailValue}>{formatDate(data.checkOut)}</Column>
            </Row>
            <Hr style={detailDivider} />
            <Row>
              <Column style={detailLabel}>{isAr ? 'عدد الضيوف' : 'Guests'}</Column>
              <Column style={detailValue}>{data.guests}</Column>
            </Row>
            <Hr style={detailDivider} />
            <Row>
              <Column style={detailLabel}>{isAr ? 'نوع الحجز' : 'Booking Type'}</Column>
              <Column style={detailValue}>{data.bookingType}</Column>
            </Row>
            <Hr style={detailDivider} />
            <Row>
              <Column style={detailLabel}>{isAr ? 'المبلغ الإجمالي' : 'Total Price'}</Column>
              <Column style={{ ...detailValue, color: '#c8a96e', fontWeight: '700', fontSize: '18px' }}>
                {formatSAR(data.totalPrice)}
              </Column>
            </Row>
          </Section>

          {/* Info Note */}
          <Section style={infoBox}>
            <Text style={infoText}>
              {isAr
                ? '🕐 وقت تسجيل الوصول: 2:00 م | وقت تسجيل المغادرة: 12:00 م'
                : '🕐 Check-in: 2:00 PM | Check-out: 12:00 PM'}
            </Text>
            <Text style={infoText}>
              {isAr
                ? '📞 للاستفسار أو المساعدة، يرجى التواصل معنا عبر واتساب أو الهاتف.'
                : '📞 For any questions, please contact us via WhatsApp or phone.'}
            </Text>
          </Section>

          <Hr style={divider} />

          {/* Footer */}
          <Text style={footer}>
            {isAr
              ? 'شكراً لاختيارك مساكن عرعر. نتطلع إلى استقبالك!'
              : 'Thank you for choosing Arar Residency. We look forward to welcoming you!'}
          </Text>
          <Text style={footerAddress}>
            Arar Residency — Arar, Saudi Arabia | info@ararresidency.com
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

// ─── Styles ───────────────────────────────────

const main = { backgroundColor: '#f4f4f5', fontFamily: "'Segoe UI', Arial, sans-serif" }
const container = { maxWidth: '600px', margin: '0 auto', backgroundColor: '#ffffff', borderRadius: '16px', overflow: 'hidden' }
const header = { backgroundColor: '#1a1a2e', padding: '32px 40px', textAlign: 'center' as const }
const headerTitle = { color: '#c8a96e', fontSize: '26px', fontWeight: '700', margin: '0' }
const headerSubtitle = { color: '#94a3b8', fontSize: '13px', margin: '4px 0 0' }
const successBadge = { display: 'inline-block', backgroundColor: '#dcfce7', color: '#16a34a', borderRadius: '100px', padding: '6px 20px', fontSize: '14px', fontWeight: '600' }
const title = { fontSize: '22px', fontWeight: '700', color: '#111827', padding: '0 40px' }
const bodyText = { fontSize: '15px', color: '#4b5563', lineHeight: '1.6', padding: '0 40px' }
const detailsBox = { backgroundColor: '#f9fafb', borderRadius: '12px', margin: '24px 40px', padding: '8px 24px' }
const detailLabel = { fontSize: '13px', color: '#6b7280', width: '40%', padding: '12px 0' }
const detailValue = { fontSize: '14px', color: '#111827', fontWeight: '600', padding: '12px 0' }
const detailDivider = { borderColor: '#e5e7eb', margin: '0' }
const infoBox = { backgroundColor: '#fffbeb', borderRadius: '12px', margin: '0 40px 24px', padding: '16px 24px' }
const infoText = { fontSize: '13px', color: '#92400e', margin: '4px 0', lineHeight: '1.6' }
const divider = { borderColor: '#e5e7eb', margin: '0 40px' }
const footer = { fontSize: '15px', color: '#374151', textAlign: 'center' as const, padding: '24px 40px 8px' }
const footerAddress = { fontSize: '12px', color: '#9ca3af', textAlign: 'center' as const, padding: '0 40px 32px' }
