import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '@/context/AuthContext'
import TopNav from '@/components/TopNav'
import { ThemeProvider } from '@/components/ThemeProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Inventra IMS',
    description: 'Inventory Management System',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={inter.className}>
                <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
                    <AuthProvider>
                        <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
                            <TopNav />
                            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                                {children}
                            </main>
                        </div>
                    </AuthProvider>
                </ThemeProvider>
            </body>
        </html>
    )
}
