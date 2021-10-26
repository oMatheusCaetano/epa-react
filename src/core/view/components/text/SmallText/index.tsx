import React from 'react';

import * as Styled from './styles';

export interface ISmallTextProps {
  message?: string;
  error?: string;
}

const SmallText: React.FC<ISmallTextProps> = ({ message, error }) => (
  <div>
    {error && (
      <>
        <Styled.Error>{error}</Styled.Error>
        <br />
      </>
    )}

    {message && <Styled.Message>{message}</Styled.Message>}
  </div>
);

export default SmallText;
