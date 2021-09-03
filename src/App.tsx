import React from 'react';

import EpaThemeProvider from '~/core/view/components/misc/EpaThemeProvider';
import { PostsProvider } from '~/features/CorporateWall/domain/stores/posts.store';

import Posts from '~/features/CorporateWall/view/pages/Posts';

const App: React.FC = () => (
  <EpaThemeProvider>
    <PostsProvider>
      <Posts />
    </PostsProvider>
  </EpaThemeProvider>
);

export default App;
