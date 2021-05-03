module.exports = {
    purge: [
      './public/index.html',
      './src/**/*.{js,ts,jsx,tsx}',
      '../components/**/*.{js,ts,jsx,tsx}',
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

    ],
}
