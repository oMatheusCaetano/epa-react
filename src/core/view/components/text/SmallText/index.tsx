import React from 'react';

import * as Styled from './styles';

export interface ISmallTextProps {
  message?: string;
  error?: string;
  className?: string;
}

const SmallText: React.FC<ISmallTextProps> = ({ message, error, className }) => (
  <div>
    {error && (
      <>
        <Styled.Error className={className}>{error}</Styled.Error>
        <br />
      </>
    )}

    {message && <Styled.Message className={className}>{message}</Styled.Message>}
  </div>
);

export default SmallText;
