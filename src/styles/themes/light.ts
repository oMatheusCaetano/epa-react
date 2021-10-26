import { DefaultTheme } from 'styled-components';

const theme: DefaultTheme = {
  title: 'light',
  font: '400 14px Roboto, Poppins, sans-serif',

  radius: {
    default: '8px',
    small: '5px',
  },

  colors: {
    primary: '#2BB6EE',
    secondary: '#888',
    success: '#2DA770',
    warning: '#C9970F',
    danger: '#ff1111DD',
    light: '#F3F3F4',
    dark: '#444',
    text: '#333',
    textInPrimary: '#FFF',
    textInSecondary: '#FFF',
    textInSuccess: '#FFF',
    textInWarning: '#FFF',
    textInDanger: '#FFF',
    textInLight: '#333',
    textInDark: '#FFF',
  },

  breakpoints: {
    xSmall: {
      min: '0px',
      max: '575px',
    },
    small: {
      min: '576px',
      max: '767px',
    },
    medium: {
      min: '768px',
      max: '991px',
    },
    large: {
      min: '992px',
      max: '1199px',
    },
    xLarge: {
      min: '1200px',
      max: '1399px',
    },
    xxLarge: {
      min: '1400px',
      max: '',
    },
  },
};

export default theme;
