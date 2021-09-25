/* eslint-disable no-restricted-syntax */
import React, { useEffect } from 'react';

import { useAppStore } from '~/core/hooks';
import { getManagementUnities } from '~/core/domain/store/global';
import { Select } from '~/core/view/components';

import IManagementUnit from '~/features/ManagementUnities/domain/models/IManagementUnit';

import * as Styled from './styles';

const ManagementUnitSelect: React.FC = () => {
  const { store, dispatch } = useAppStore();

  useEffect(() => { dispatch(getManagementUnities()); }, []);

  function renderOptions(managementUnities: IManagementUnit[], tabSpace = 1) {
    let options: JSX.IntrinsicElements['option'][] = [];

    managementUnities.forEach((managementUnit) => {
      options.push(
        <Styled.Option key={managementUnit.id} tabSpace={tabSpace}>
          {managementUnit.name}
        </Styled.Option>,
      );

      if (managementUnit.children?.length) {
        options = options.concat(renderOptions(managementUnit.children, ++tabSpace));
      }
    });

    return options;
  }

  return (
    <Select multiple liveSearch withActions>
      {renderOptions(store.GLOBAL.managementUnities).map((option) => option)}
    </Select>
  );
};

export default ManagementUnitSelect;
