import './globals.css'

export const metadata = {
  title: 'Scroll-Driven Hero Section',
  description: 'Welcome Itzfizz - Scroll Animation Assignment',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}