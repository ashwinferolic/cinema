const theme = {
  colors: {
    main: '#37474f',
    dark: '#263238',
    light: '#546e7a',
    lighter: '#b0bec5',
    text: '#fafafa',
    link: '#444444',
  },
  size: {
    smallest: '25em',
    smaller: '31.25em',
    small: '37.5em',
    medium: '56.25em',
    large: '80em',
    larger: '90em',
    largest: '97em',
  },
  mediaQueries: {
    smallest: `only screen and (max-width: 25em)`, // 250px
    smaller: 'only screen and (max-width: 31.25em)', // 314.5px
    small: 'only screen and (max-width: 37.5em)', // 375px
    medium: 'only screen and (max-width: 56.25em)', // 562.5px
    large: 'only screen and (max-width: 80em)', // 800px
    larger: 'only screen and (max-width: 90em)', // 900px
    largest: 'only screen and (max-width: 97em)', // 970px
  },
};

export default theme;
