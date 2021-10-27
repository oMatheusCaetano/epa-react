/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';

import { useAppStore } from '~/core/hooks';

import Select, { IProps as ISelectProps, ISelectOption } from '~/core/view/components/input/Select';
import IManagementUnitHierarchy from '~/features/ManagementUnits/domain/models/IManagementUnitHierarchy';
import {
  getManagementUnitsHierarchy,
  getManagementUnitsHierarchyUen,
  getManagementUnitsHierarchyManages,
  getManagementUnitsHierarchyStrategy,
  getManagementUnitsHierarchyCommunicates,

} from '~/features/ManagementUnits/domain/store';

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
  const [managementUnits, setManagementUnits] = useState([] as ISelectOption[]);

  useEffect(() => {
    switch (props.type.toUpperCase()) {
      case ManagementUnitSelectType.UEN:
        dispatch(getManagementUnitsHierarchyUen());
        break;

      case ManagementUnitSelectType.MANAGES:
        dispatch(getManagementUnitsHierarchyManages());
        break;

      case ManagementUnitSelectType.COMMUNICATES:
        dispatch(getManagementUnitsHierarchyStrategy());
        break;

      case ManagementUnitSelectType.STRATEGY:
        dispatch(getManagementUnitsHierarchyCommunicates());
        break;

      default:
        dispatch(getManagementUnitsHierarchy());
    }
  }, []);

  useEffect(() => {
    if (ManagementUnitSelectType.ALL) {
      setManagementUnits(convertManagementUnitsHierarchyToSelectOptions(
        store.MANAGEMENT_UNIT.managementUnitsHierarchy,
      ));
    }
  }, [store.MANAGEMENT_UNIT.managementUnitsHierarchy]);

  useEffect(() => {
    if (ManagementUnitSelectType.UEN) {
      setManagementUnits(convertManagementUnitsHierarchyToSelectOptions(
        store.MANAGEMENT_UNIT.managementUnitsHierarchyUen,
      ));
    }
  }, [store.MANAGEMENT_UNIT.managementUnitsHierarchyUen]);

  useEffect(() => {
    if (ManagementUnitSelectType.MANAGES) {
      setManagementUnits(convertManagementUnitsHierarchyToSelectOptions(
        store.MANAGEMENT_UNIT.managementUnitsHierarchyManages,
      ));
    }
  }, [store.MANAGEMENT_UNIT.managementUnitsHierarchyManages]);

  useEffect(() => {
    if (ManagementUnitSelectType.STRATEGY) {
      setManagementUnits(convertManagementUnitsHierarchyToSelectOptions(
        store.MANAGEMENT_UNIT.managementUnitsHierarchyStrategy,
      ));
    }
  }, [store.MANAGEMENT_UNIT.managementUnitsHierarchyStrategy]);

  useEffect(() => {
    if (ManagementUnitSelectType.COMMUNICATES) {
      setManagementUnits(convertManagementUnitsHierarchyToSelectOptions(
        store.MANAGEMENT_UNIT.managementUnitsHierarchyCommunicates,
      ));
    }
  }, [store.MANAGEMENT_UNIT.managementUnitsHierarchyCommunicates]);

  const convertManagementUnitsHierarchyToSelectOptions = (
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
        item.children = convertManagementUnitsHierarchyToSelectOptions(unit.children);
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
      options={props.options ?? managementUnits}
      {...props}
    />
  );
};

export default ManagementUnitSelect;
