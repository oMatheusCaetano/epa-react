/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';

import { useAppStore } from '~/core/hooks';

import Select, { IProps as ISelectProps, ISelectOption } from '~/core/view/components/input/Select';
import IManagementUnitHierarchy from '~/features/ManagementUnities/domain/models/IManagementUnitHierarchy';
import {
  getManagementUnitiesHierarchy,
  getManagementUnitiesHierarchyUen,
  getManagementUnitiesHierarchyManages,
  getManagementUnitiesHierarchyStrategy,
  getManagementUnitiesHierarchyCommunicates,

} from '~/features/ManagementUnities/domain/store';

export enum ManagementUnitSelectType {
  ALL = 'ALL',
  MANAGES = 'MANAGES',
  COMMUNICATES = 'COMMUNICATES',
  STRATEGY = 'STRATEGY',
  UEN = 'UEN',
}

export interface IManagementUnitSelectProps extends ISelectProps {
  type: string | ManagementUnitSelectType;
}

const ManagementUnitSelect: React.FC<IManagementUnitSelectProps> = (props) => {
  const { store, dispatch } = useAppStore();
  const [managementUnities, setManagementUnities] = useState([] as ISelectOption[]);

  useEffect(() => {
    switch (props.type.toUpperCase()) {
      case ManagementUnitSelectType.UEN:
        dispatch(getManagementUnitiesHierarchyUen());
        break;

      case ManagementUnitSelectType.MANAGES:
        dispatch(getManagementUnitiesHierarchyManages());
        break;

      case ManagementUnitSelectType.COMMUNICATES:
        dispatch(getManagementUnitiesHierarchyStrategy());
        break;

      case ManagementUnitSelectType.STRATEGY:
        dispatch(getManagementUnitiesHierarchyCommunicates());
        break;

      default:
        dispatch(getManagementUnitiesHierarchy());
    }
  }, []);

  useEffect(() => {
    if (ManagementUnitSelectType.ALL) {
      setManagementUnities(convertManagementUnitiesHierarchyToSelectOptions(
        store.MANAGEMENT_UNIT.managementUnitiesHierarchy,
      ));
    }
  }, [store.MANAGEMENT_UNIT.managementUnitiesHierarchy]);

  useEffect(() => {
    if (ManagementUnitSelectType.UEN) {
      setManagementUnities(convertManagementUnitiesHierarchyToSelectOptions(
        store.MANAGEMENT_UNIT.managementUnitiesHierarchyUen,
      ));
    }
  }, [store.MANAGEMENT_UNIT.managementUnitiesHierarchyUen]);

  useEffect(() => {
    if (ManagementUnitSelectType.MANAGES) {
      setManagementUnities(convertManagementUnitiesHierarchyToSelectOptions(
        store.MANAGEMENT_UNIT.managementUnitiesHierarchyManages,
      ));
    }
  }, [store.MANAGEMENT_UNIT.managementUnitiesHierarchyManages]);

  useEffect(() => {
    if (ManagementUnitSelectType.STRATEGY) {
      setManagementUnities(convertManagementUnitiesHierarchyToSelectOptions(
        store.MANAGEMENT_UNIT.managementUnitiesHierarchyStrategy,
      ));
    }
  }, [store.MANAGEMENT_UNIT.managementUnitiesHierarchyStrategy]);

  useEffect(() => {
    if (ManagementUnitSelectType.COMMUNICATES) {
      setManagementUnities(convertManagementUnitiesHierarchyToSelectOptions(
        store.MANAGEMENT_UNIT.managementUnitiesHierarchyCommunicates,
      ));
    }
  }, [store.MANAGEMENT_UNIT.managementUnitiesHierarchyCommunicates]);

  const convertManagementUnitiesHierarchyToSelectOptions = (
    items: IManagementUnitHierarchy[],
  ) => {
    const data = [] as ISelectOption[];

    items.forEach((unit) => {
      const item = {
        value: unit.id,
        label: unit.name,
        bolded: unit.uen,
      } as ISelectOption;

      if (unit.children?.length) {
        item.children = convertManagementUnitiesHierarchyToSelectOptions(unit.children);
      }

      data.push(item);
    });

    return data;
  };

  return (
    <Select
      label={props.label === undefined
        ? (props.multiple ? 'Unidades Gerenciais' : 'Unidade Gerencial')
        : props.label}
      options={props.options ?? managementUnities}
      {...props}
    />
  );
};

export default ManagementUnitSelect;
