import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Book Your Event',
  description: 'Start your journey with LID EVENT & MORE. Fill out our booking form to get a personalized quote and professional event planning services.',
  alternates: {
    canonical: '/booking',
  },
}

export default function BookingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
