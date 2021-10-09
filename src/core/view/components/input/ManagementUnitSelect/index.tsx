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

export enum ManagementUnitSelectTypes {
  ALL = 'ALL',
  MANAGES = 'MANAGES',
  COMMUNICATES = 'COMMUNICATES',
  STRATEGY = 'STRATEGY',
  UEN = 'UEN',
}

export interface IProps extends ISelectProps {
  type: string | ManagementUnitSelectTypes;
}

const ManagementUnitSelect: React.FC<IProps> = (props) => {
  const { store, dispatch } = useAppStore();
  const [managementUnities, setManagementUnities] = useState([] as ISelectOption[]);

  useEffect(() => {
    switch (props.type.toUpperCase()) {
      case ManagementUnitSelectTypes.UEN:
        dispatch(getManagementUnitiesHierarchyUen());
        break;

      case ManagementUnitSelectTypes.MANAGES:
        dispatch(getManagementUnitiesHierarchyManages());
        break;

      case ManagementUnitSelectTypes.COMMUNICATES:
        dispatch(getManagementUnitiesHierarchyStrategy());
        break;

      case ManagementUnitSelectTypes.STRATEGY:
        dispatch(getManagementUnitiesHierarchyCommunicates());
        break;

      default:
        dispatch(getManagementUnitiesHierarchy());
    }
  }, []);

  useEffect(() => {
    if (ManagementUnitSelectTypes.ALL) {
      setManagementUnities(convertManagementUnitiesHierarchyToSelectOptions(
        store.MANAGEMENT_UNIT.managementUnitiesHierarchy,
      ));
    }
  }, [store.MANAGEMENT_UNIT.managementUnitiesHierarchy]);

  useEffect(() => {
    if (ManagementUnitSelectTypes.UEN) {
      setManagementUnities(convertManagementUnitiesHierarchyToSelectOptions(
        store.MANAGEMENT_UNIT.managementUnitiesHierarchyUen,
      ));
    }
  }, [store.MANAGEMENT_UNIT.managementUnitiesHierarchyUen]);

  useEffect(() => {
    if (ManagementUnitSelectTypes.MANAGES) {
      setManagementUnities(convertManagementUnitiesHierarchyToSelectOptions(
        store.MANAGEMENT_UNIT.managementUnitiesHierarchyManages,
      ));
    }
  }, [store.MANAGEMENT_UNIT.managementUnitiesHierarchyManages]);

  useEffect(() => {
    if (ManagementUnitSelectTypes.STRATEGY) {
      setManagementUnities(convertManagementUnitiesHierarchyToSelectOptions(
        store.MANAGEMENT_UNIT.managementUnitiesHierarchyStrategy,
      ));
    }
  }, [store.MANAGEMENT_UNIT.managementUnitiesHierarchyStrategy]);

  useEffect(() => {
    if (ManagementUnitSelectTypes.COMMUNICATES) {
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
