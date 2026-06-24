import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import QueryProvider from '@/context/query-context';
import { Toaster } from 'sonner';
import { WorkspaceProvider } from '@/context/workspace-context';
import { AuthProvider } from '@/context/auth-context';

// Premium high-legibility interface font
const interSans = Inter({
  variable: '--font-sans',
  subsets: ['latin'],
});

// Clean developer terminal font matching your "Orchestrate" matrix theme
const jetbrainsMono = JetBrains_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'NEURA AI',
  description: 'Orchestrate generation streams seamlessly.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${interSans.variable} ${jetbrainsMono.variable} h-full bg-[#0B0F19] antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-[#0B0F19] text-slate-200">
        <QueryProvider>
          <AuthProvider>
            <WorkspaceProvider>{children}</WorkspaceProvider>
          </AuthProvider>
          <Toaster
            theme="dark"
            position="top-right"
            richColors
            closeButton
            toastOptions={{
              style: {
                background: '#0c0c0e',
                border: '1px solid rgba(63, 63, 70, 0.4)', // zinc-800/40
                color: '#f4f4f5', // zinc-100
                fontFamily: 'var(--font-sans)',
              },
            }}
          />
        </QueryProvider>
      </body>
    </html>
  );
}
