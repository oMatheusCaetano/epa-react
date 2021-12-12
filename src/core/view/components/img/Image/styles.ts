import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
`;

export const Overlay = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  background: transparent;
  border-radius: ${({ theme }) => theme.radius.small};
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  transition: .3s;

  &:hover {
    background: #00000080;

    p {
      opacity: 1;
    }
  }

  p {
    color: white;
    opacity: 0;
    font-weight: 500;
    transition: .3s;
  }
`;

export const Image = styled.img`
  border-radius: ${({ theme }) => theme.radius?.small};
`;
