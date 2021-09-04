import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    title: string;
    font: string;
    radius: {
      default: string;
      small: string;
    },
    colors: {
      primary: string;
      secondary: string;
      success: string;
      warning: string;
      danger: string;
      light: string;
      dark: string;
      text: string;
    },
    breakpoints: {
      xSmall: {
        min: string;
        max: string;
      },
      small: {
        min: string;
        max: string;
      },
      medium: {
        min: string;
        max: string;
      },
      large: {
        min: string;
        max: string;
      },
      xLarge: {
        min: string;
        max: string;
      },
      xxLarge: {
        min: string;
        max: string;
      },
    }
  }
}
