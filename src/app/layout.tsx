import type { Metadata } from 'next';
import { Space_Grotesk } from 'next/font/google';
import { Header } from '@/components/Header';
import './globals.css';

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Cosmos',
    description: 'A collection of cosmogonies from your own worlds.',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="en"
            className={`min-h-full bg-[#E8E6DD] ${spaceGrotesk.className}`}
        >
            <body className="h-full">
                <div className="mx-auto max-w-[80ch]">
                    <Header />
                </div>
                <div className="mb-20 border-b border-t border-black/20">
                    <div className="mx-auto box-content max-w-[80ch] border-e border-s border-black/20 p-20">
                        {children}
                    </div>
                </div>
            </body>
        </html>
    );
}
