import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    title: string;
    font: string;
    radius: {
      default: string,
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
    }
  }
}
