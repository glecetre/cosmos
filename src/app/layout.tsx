import type { Metadata } from 'next';
import { Space_Grotesk } from 'next/font/google';
import { Header } from '@/components/Header';
import './globals.css';

const spaceGrotesk = Space_Grotesk({
    subsets: ['latin'],
    variable: '--font-sans',
});

export const metadata: Metadata = {
    title: '✦ Cosmos',
    description: 'A collection of cosmogonies from your own worlds.',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={`bg-sand h-full ${spaceGrotesk.variable}`}>
            <body className="flex min-h-full flex-col">
                <div className="mx-auto w-full max-w-[90ch]">
                    <Header />
                </div>
                <div className="mb-20 flex flex-grow border-b border-t border-black/20">
                    <div className="mx-auto max-w-[90ch] flex-grow border-e border-s border-black/20">
                        {children}
                    </div>
                </div>
            </body>
        </html>
    );
}
