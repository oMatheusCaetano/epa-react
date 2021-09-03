import styled from 'styled-components';

import PageContainer from '~/core/view/components/misc/PageContainer';

export const Container = styled(PageContainer)`
  background: red;
`;

export const Header = styled.header`
  background: yellow;
`;

export const Main = styled.main`
  background: grey;

  @media(min-width: ${({ theme }) => theme.breakpoints.large.min}) {
    display: flex;
  }
`;

export const Left = styled.aside`
  background: blue;

  @media(min-width: ${({ theme }) => theme.breakpoints.large.min}) {
    flex: 1;
  }
`;

export const LeftHeader = styled.header`
  background: orange;

  @media(min-width: ${({ theme }) => theme.breakpoints.medium.min}) {
    display: flex;
  }

  @media(min-width: ${({ theme }) => theme.breakpoints.large.min}) {
    display: block;
  }
`;

export const Right = styled.aside`
  background: green;

  @media(min-width: ${({ theme }) => theme.breakpoints.large.min}) {
    flex: 2;
  }
`;

export const UserHumor = styled.section`
  background: purple;

  @media(min-width: ${({ theme }) => theme.breakpoints.medium.min}) {
    flex: 1;
  }
`;

export const UserHumorIdentification = styled.section`
  background: cyan;

  @media(min-width: ${({ theme }) => theme.breakpoints.medium.min}) {
    flex: 1.3;
  }
`;

export const UserSpace = styled.section`
  background: black;
`;

export const UserGoal = styled.section`
  background: pink;
`;
