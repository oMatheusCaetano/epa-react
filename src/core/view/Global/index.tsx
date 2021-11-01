import React, { useEffect } from 'react';

import { useAppStore } from '~/core/hooks';
import { getAuthenticatedUser } from '~/features/Auth/domain/store/auth';
import { getSystemInfo } from '~/features/System/domain/store/system';

const Global: React.FC = () => {
  const { dispatch } = useAppStore();

  useEffect(() => { dispatch(getAuthenticatedUser()); }, []);
  useEffect(() => { dispatch(getSystemInfo()); }, []);

  return <></>;
};

export default Global;
