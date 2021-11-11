import React, { useEffect } from 'react';

import { useAppStore } from '~/core/view/hooks';
import { getAuthenticatedUser } from '~/features/Auth/domain/stores/auth';

const Global: React.FC = () => {
  const { dispatch } = useAppStore();

  useEffect(() => {
    dispatch(getAuthenticatedUser({
      query: {
        with: ['cliente'],
      },
    }));
  }, []);

  return <></>;
};

export default Global;
