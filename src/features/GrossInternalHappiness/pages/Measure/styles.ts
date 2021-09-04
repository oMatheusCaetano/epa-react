import styled, { css } from 'styled-components';
import { FaSadTear, FaSmileBeam, FaLaughBeam, FaAngry } from 'react-icons/fa';

import PageContainer from '~/core/view/components/misc/PageContainer';
import SectionContainer from '~/core/view/components/misc/SectionContainer';

export const Container = styled(PageContainer)`
  img {
    border-radius: 5px;
  }
`;

const iconsCss = css`
  fill: #999;
  cursor: pointer;
  transition: .2s;
  margin: 8px 5px;
`;

export const HappyIcon = styled(FaLaughBeam)`
  ${iconsCss};

  &:hover {
    fill: green;
  }
`;

export const NormalIcon = styled(FaSmileBeam)`
  ${iconsCss};

  &:hover {
    fill: blue;
  }
`;

export const SadIcon = styled(FaSadTear)`
  ${iconsCss};

  &:hover {
    fill: orange;
  }
`;

export const AngryIcon = styled(FaAngry)`
  ${iconsCss};

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
        max-height: 150px;
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

        footer {
          display: flex;
          align-items: center;
          margin-top: 5px;

          div {
            flex: 1;
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

export const UserHumorIdentification = styled.section`
  padding-top: 30px;

  span {
    font-weight: 500;
  }

  .user-other-humor {
    display: flex;
    flex-wrap: wrap;
    margin-top: 10px;

    div {
      background: ${({ theme }) => theme.colors.light};
      border-radius: ${({ theme }) => theme.radius.small};
      padding: 5px;
      display: flex;
      align-items: center;
      margin: 4px 5px 0 0;
      padding-left: 5px;
    }
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
  p {
    line-height: 20px;
  }
`;

export const UserGoal = styled(SectionContainer)`
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
`;

export const RightGoals = styled(SectionContainer)`
`;

export const RightAchievedGoals = styled(SectionContainer)`

`;
