import styled, { css } from 'styled-components';
import { FaSadTear, FaSmileBeam, FaLaughBeam, FaAngry } from 'react-icons/fa';
import { Form } from '@unform/web';

import PageContainer from '~/core/view/components/misc/PageContainer';
import SectionContainer from '~/core/view/components/misc/SectionContainer';

export interface IUserHumor {
  humor: number;
}

export const Container = styled(PageContainer)`
  p {
    line-height: 20px;
  }

  table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0 5px;
  }

  tr {
    th {
      border-top: 1px solid lightgrey;
      border-bottom: 1px solid lightgrey;
      font-weight: bold;
    }

    th:first-of-type {
      border-left: 1px solid lightgrey;
    }

    th:last-of-type {
      border-right: 1px solid lightgrey;
    }

    td:last-of-type {
      display: flex;
      align-items: center;
      justify-content: space-evenly;
    }

    th, td {
      padding: 5px 10px;
      background: ${({ theme }) => theme.colors.light};
    }

    th:first-of-type, 
    td:first-of-type {
      width: 60%;
      border-top-left-radius: ${({ theme }) => theme.radius.default};
      border-bottom-left-radius: ${({ theme }) => theme.radius.default};
    }

    th:last-of-type, 
    td:last-of-type {
      border-top-right-radius: ${({ theme }) => theme.radius.default};
      border-bottom-right-radius: ${({ theme }) => theme.radius.default};
      text-align: center;
    }
  }
`;

const iconsCss = css`
  fill: #999;
  cursor: pointer;
  transition: .2s;
  margin: 8px 5px;
`;

export const HappyIcon = styled(FaLaughBeam)<IUserHumor>`
  ${iconsCss};
  fill: ${(props) => (props.humor === 1 ? 'green' : '#999')};


  &:hover {
    fill: green;
  }
`;

export const NormalIcon = styled(FaSmileBeam)<IUserHumor>`
  ${iconsCss};
  fill: ${(props) => (props.humor === 2 ? 'blue' : '#999')};

  &:hover {
    fill: blue;
  }
`;

export const SadIcon = styled(FaSadTear)<IUserHumor>`
  ${iconsCss};
  fill: ${(props) => (props.humor === 3 ? 'orange' : '#999')};

  &:hover {
    fill: orange;
  }
`;

export const AngryIcon = styled(FaAngry)<IUserHumor>`
  ${iconsCss};
  fill: ${(props) => (props.humor === 4 ? 'red' : '#999')};

  &:hover {
    fill: red;
  }
`;

export const Header = styled.header`
`;

export const Main = styled.main`
  @media(min-width: ${({ theme }) => theme.breakpoints.large.min}) {
    display: flex;
  }
`;

export const Left = styled.aside`
  @media(min-width: ${({ theme }) => theme.breakpoints.large.min}) {
    flex: 1.3;
    margin-right: 25px;
  }
`;

export const LeftHeader = styled(SectionContainer)`
  @media(min-width: ${({ theme }) => theme.breakpoints.medium.min}) {
    main {
      display: flex;
    }
  }

  @media(min-width: ${({ theme }) => theme.breakpoints.large.min}) {
    
    main {
      display: block;
    }
  }
`;

export const UserHumor = styled.section`
  .user-humor__main {
    .user-humor__image {
      text-align: center;

      img {
        max-height: 200px;
      }
    }

    .user-humor__measure-humor {
      text-align: center;
      margin: 10px;
      width: 100%;
      
      &__name {
        color: ${({ theme }) => theme.colors.primary};
        font-weight: 500;
      }

      &__selector {
        margin-top: 10px;
        padding: 8px 10px;
        border-radius: ${({ theme }) => theme.radius.default};
        background: ${({ theme }) => theme.colors.light};
        box-shadow: 1px 1px 10px ${({ theme }) => theme.colors.light};

        span {
          font-weight: 600;
        }

        &__humors {
          margin: 10px 0;
        }

        footer {
          display: flex;
          align-items: center;
          
          div {
            flex: 1;
          }

          label {
            margin-right: 10px;
          }
        }
      }
    }
  }

  @media(min-width: ${({ theme }) => theme.breakpoints.medium.min}) {
    flex: 1;
  }

  @media(min-width: ${({ theme }) => theme.breakpoints.large.min}) {
    .user-humor__main {
      display: flex;
    }
  }
`;

export const UserHumorIdentification = styled(Form)`
  padding-top: 30px;

  span {
    font-weight: 500;
  }

  .user-other-humor {
    display: flex;
    flex-wrap: wrap;
    margin-top: 15px;
  }

  button {
    display: block;
    margin: 25px 0 5px auto;
  }

  @media(min-width: ${({ theme }) => theme.breakpoints.medium.min}) {
    flex: 1.3;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-left: 50px;

    .user-other-humor {
      flex: 1;
    }
  }

  @media(min-width: ${({ theme }) => theme.breakpoints.large.min}) {
    padding-left: 0px;
  }
`;

export const UserSpace = styled(SectionContainer)`
  text-align: center;
`;

export const UserGoal = styled(SectionContainer)`
  margin-bottom: 10px;

  footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 10px;

    .goal-footer__right {
      button:first-of-type {
        margin-right: 10px;
      }
    }
  }
`;

export const Right = styled.main`
  @media(min-width: ${({ theme }) => theme.breakpoints.large.min}) {
    flex: 2;
  }
`;

export const RightFib = styled(SectionContainer)`
  img {
    max-width: 100%;
    margin-bottom: 10px;
  }

  text-align: center;
`;

export const RightGoals = styled(SectionContainer)`
  td:first-of-type {
    width: 89% !important;
  }
`;

export const RightAchievedGoals = styled(SectionContainer)`
`;
