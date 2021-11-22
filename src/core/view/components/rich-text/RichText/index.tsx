import React, { memo } from 'react';
import JoditEditor from 'jodit-react';

import * as C from '~/core/view/components';

export interface RichTextProps {
  label?: string;
  error?: string;
  value?: string;
  onChange?: (value: string) => void;
  onBlur?: (value: string) => void;
}

/**
 * @link Documentação - https://github.com/jodit/jodit-react
 */
const RichText: React.FC<RichTextProps> = (props) => (
  <div>
    <C.Label {...props} />
    <JoditEditor {...props} value={props.value || ''} />
    <C.SmallText error={props.error} />
  </div>
);

export default memo(RichText);
