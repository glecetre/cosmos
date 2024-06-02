import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    plugins: [
        require('@tailwindcss/typography'),
        plugin(function ({addVariant}) {
            addVariant("not-last", '&:not(:last-child)')
        })
    ],
};
export default config;
