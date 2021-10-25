import styled from 'styled-components';

export const Container = styled.div`
  opacity: 0;
  height: 0px;
  transition: .2s;

  &.active {
    height: auto;
    opacity: 1;
  }
`;
