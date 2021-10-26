import styled from 'styled-components';

export const Button = styled.button`
  height: 38px;
  padding: 10px 16px;
  transition: .2s;
  border: none;
  border-radius: ${({ theme }) => theme.radius.default};
  outline: none;
  font-weight: 500;
  cursor: pointer;
  color: #fff;

  &:hover {
    opacity: 0.8;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  & .button-icon {
    margin-right: 10px;
    margin-bottom: 1px;
  }
`;
