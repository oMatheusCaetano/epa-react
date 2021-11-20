import styled from 'styled-components';
import RadioGroup from '../RadioGroup';
import RadioGroupItem from '../RadioGroupItem';

export const Container = styled(RadioGroup)`
`;

export const Item = styled(RadioGroupItem)`
  background: #009900;
  color: white;
  transition: .3s;

  &:hover {
    background: #006600;
  }

  &:last-of-type {
    background: #DD0000;

    &:hover {
      background: #AA0000;
    }
  }
`;
