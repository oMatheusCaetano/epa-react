import React, { useEffect } from 'react';

import { useAppStore } from '~/core/hooks';
import { getAuthenticatedUser } from '~/features/Auth/domain/store/auth';
import { getSystemInfo } from '~/features/System/domain/store/system';

const Global: React.FC = () => {
  const { store, dispatch } = useAppStore();

  useEffect(() => { dispatch(getAuthenticatedUser()); }, [store.AUTH.authUser]);
  useEffect(() => { dispatch(getSystemInfo()); }, [store.SYSTEM.systemInfo]);

  return <></>;
};

export default Global;
