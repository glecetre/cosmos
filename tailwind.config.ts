import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                grandis: {
                    '50': '#fff9ed',
                    '100': '#fff3d4',
                    '200': '#ffe3a9',
                    '300': '#ffd588',
                    '400': '#fead39',
                    '500': '#fc9213',
                    '600': '#ed7609',
                    '700': '#c55a09',
                    '800': '#9c4610',
                    '900': '#7e3b10',
                    '950': '#441c06',
                },
            },
            fontFamily: {
                sans: ['var(--font-sans)', 'sans-serif'],
            },
        },
    },
    plugins: [
        require('@tailwindcss/typography'),
        plugin(function ({ addVariant }) {
            addVariant('not-last', '&:not(:last-child)');
        }),
    ],
};
export default config;
