import React from 'react';

import * as C from '~/core/view/components';

const Submit: React.FC<C.ButtonProps> = (props) => (
  <C.Button type="submit" styleAs={C.ButtonStyle.SAVE} {...props} />
);

export default Submit;
