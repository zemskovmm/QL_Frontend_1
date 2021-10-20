const TailwindTheme = {
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            screens: {
                'tablet': '640px',// => @media (min-width: 640px) { ... }
                'laptop': '1024px',// => @media (min-width: 1024px) { ... }
                'desktop': '1280px',// => @media (min-width: 1280px) { ... }
            },
            maxWidth: {
                28:	'7rem', //112px	
                32:	'8rem', //128px	
                36:	'9rem', //144px	
                40:	'10rem', //160px	
                44:	'11rem', //176px	
                48:	'12rem', //192px	
                52:	'13rem', //208px	
                56:	'14rem', //224px	
                60:	'15rem', //240px	
                64: '16rem', //256px
                72: '18rem', //288px
                80: '20rem', //320px
                96: '24rem', //384px
                112: '28rem', //448px
                128: '32rem', //512px
                160: '40rem', //640px
                208: '52rem', //832px
                256: '64rem', //1024px
                320: '80rem', //1280px
            },
            spacing: {
                112: '28rem', //448px
                128: '32rem', //512px
                160: '40rem', //640px
                208: '52rem', //832px
                256: '64rem', //1024px
                320: '80rem', //1280px
            },
            colors: {
                'help': '#A8B5CC',
                'primary': '#373737',
                'error': '#e3342f',
        
                'button': '#ff6768',
                'button-text': '#fff',
                'button-secondary': '#ECEFF5',
                'button-secondary-text': '#222A37',
            },
            fontSize: {
                'title-large': ['2.25rem', '2.5rem'],
                'title-medium': ['1.875rem', '2.25rem'],
                'title-small': ['1.5rem', '2rem'],
                'large': ['1.125rem', '1.75rem'],
                'medium': ['1rem', '1.5rem'],
                'small': ['0.875rem', '1.25rem'],
                'caption': ['0.75rem', '1rem'],
            }
        },
    },
    variants: {
        extend: {},
    },
}

module.exports = {
    TailwindTheme,
}

