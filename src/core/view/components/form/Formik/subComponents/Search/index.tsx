import React from 'react';

import * as C from '~/core/view/components';

const Search: React.FC<C.ButtonProps> = (props) => (
  <C.Button type="submit" styleAs={C.ButtonStyle.SEARCH} {...props} />
);

export default Search;
