import { createGlobalStyle } from 'styled-components';
import { shade, tint } from 'polished';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
    font: ${({ theme }) => theme.font};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  #root {
    min-height: 100vh;
  }

  h1, h2, h3, h4, h5, h6 {
    margin: 0;
  }

  a {
    text-decoration: none;
    cursor: pointer;
  }

  ul {
    list-style: none;
  }

  .font-weight-medium {
    font-weight: 500 !important;
  }

  .flex {
    display: flex;
  }

  .flex-around {
    display: flex;
    justify-content: space-around;
  }

  .flex-between-center {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .items-center {
    display: flex;
    align-items: center;
  }

  /*
  |--------------------------------------------------------------------------------------------------------------------
  | BOOTSTRAP OVERRIDE                                                                                                |
  |--------------------------------------------------------------------------------------------------------------------
  */
  .bg-light {
    background: ${({ theme }) => theme.colors.light};
  }

  .bg-primary {
    background: ${({ theme }) => theme.colors.primary} !important;
  }

  .rounded {
    border-radius: ${({ theme }) => theme.radius.default};
  }

  .form-control {
    background: ${({ theme }) => theme.colors.light};
    border: 1px solid transparent;
    border-radius: ${({ theme }) => theme.radius.default};
    font: ${({ theme }) => theme.radius.default};
    transition: .3s;

    &:not(:placeholder-shown), &:hover, &:focus {
      background: white;
      border-color: rgba(0, 0, 0, 0.1);
    }

    &:hover, &:focus {
      box-shadow: 0 0 0 0.25rem ${({ theme }) => theme.colors.primary}18;
    }

    &:focus {
      border: 1px solid ${({ theme }) => theme.colors.primary}60;
    }

    &:disabled {
      border-color: transparent;
      background: rgba(0, 0, 0, 0.1);

      &:hover {
        box-shadow: none;
      }
    }
  }

  .btn {
    font-weight: 500;
    font-size: 14px;
    /* height: 40px; */
    /* line-height: 20px; */
    border-radius: 10px;
    /* padding: 10px 25px; */
    border: 0;
    box-shadow: 0;
    transition: .3s;

    &-primary {
      background: ${({ theme }) => theme.colors.primary};

      &:hover {
        background: ${({ theme }) => shade(0.25, theme.colors.primary)};
      }

      &:active, &:focus {
        box-shadow: none;
        background: ${({ theme }) => tint(0.40, theme.colors.primary)};
      }

      &:disabled {
        background: ${({ theme }) => tint(0.50, theme.colors.primary)};
      }
    }
  }
`;
