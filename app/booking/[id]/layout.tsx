import { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: 'Booking Details',
  description: 'View your event booking details and status.',
  robots: {
    index: false,
    follow: false,
  },
}
 
export default function BookingIdLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
