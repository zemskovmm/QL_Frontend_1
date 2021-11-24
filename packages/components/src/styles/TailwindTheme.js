const TailwindTheme = {
    darkMode: false, // or 'media' or 'class'
    theme: {
        boxShadow: {
            DEFAULT: '0 5px 10px rgba(0, 78, 255, 0.05), 0 10px 30px rgba(0, 78, 255, 0.03);',
            'left-navigation': '8px 0px 10px rgba(172, 192, 236, 0.3);'
        },
        extend: {
            screens: {
                'tablet': '767px',// => @media (min-width: 767px) { ... }
                'laptop': '1024px',// => @media (min-width: 1024px) { ... }
                'desktop': '1280px',// => @media (min-width: 1280px) { ... }
            },
            maxWidth: {
                9:	'2.25rem',	//36px
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
                300: '75rem', //1200px
                320: '80rem', //1280px
            },
            spacing: {
                112: '28rem', //448px
                128: '32rem', //512px
                160: '40rem', //640px
                208: '52rem', //832px
                256: '64rem', //1024px
                300: '75rem', //1200px
                320: '80rem', //1280px
            },
            colors: {
                primary: 'var(--color-primary)',
                secondary: 'var(--color-secondary)',
                third: 'var(--color-third)',
                bgprimary: 'var(--color-bg-primary)',
                bgsecondary: 'var(--color-bg-secondary)',
                bdprimary: 'var(--color-bd-primary)',
                bdsecondary: '#D7D7D7',
                hover: 'var(--color-hover)',
                'help': '#A8B5CC',
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
            },
            borderRadius: {
                primary: '0.1875rem'
            },
        },
    },
    variants: {
        extend: {},
    },
}

module.exports = {
  TailwindTheme,
};
