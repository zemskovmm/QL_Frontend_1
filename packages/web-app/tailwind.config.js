module.exports = {
    purge: [
        './src/pages/**/*.{js,ts,jsx,tsx}',
        './src/components/**/*.{js,ts,jsx,tsx}',
    ],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            spacing: {
                128: '32rem',
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [
/*        require('tailwind-bootstrap-grid')({
            containerMaxWidths: { sm: '540px', md: '720px', lg: '960px', xl: '1140px' },
        }),*/
    ],
}
