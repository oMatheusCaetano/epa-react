import styled, { css } from 'styled-components';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';

export const Container = styled.div`

`;

export const Th = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const iconsStyles = css`
  fill: grey;
`;

export const AngleUpIcon = styled(FaAngleUp)`
  ${iconsStyles}
`;

export const AngleDownIcon = styled(FaAngleDown)`
  ${iconsStyles}
`;
