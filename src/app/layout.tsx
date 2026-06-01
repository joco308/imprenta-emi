import type { Metadata } from 'next';
import './globals.css';
import ToasterWrapper from '@/components/ToasterWrapper';
import SupportChat from '@/components/SupportChat';

export const metadata: Metadata = {
  title: 'Web para CopyCampus',
  description:
    'Streamlines university photocopying with user-friendly order management, priority queues, and office supplies sales for students, faculty, and admins.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="antialiased">
        {children}
        <ToasterWrapper />
        <SupportChat />
      </body>
    </html>
  );
}
