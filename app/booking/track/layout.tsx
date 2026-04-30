import { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: 'Track Your Booking',
  description: 'Check the real-time status of your event booking with LID EVENT. Enter your unique ID to see updates and details.',
  alternates: {
    canonical: '/booking/track',
  },
}
 
export default function TrackLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
