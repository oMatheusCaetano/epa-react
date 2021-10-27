/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';

import { useAppStore } from '~/core/hooks';

import Select, { IFormSelectProps, ISelectOption } from '../Select';
import IManagementUnitHierarchy from '~/features/ManagementUnits/domain/models/IManagementUnitHierarchy';
import {
  getManagementUnitsHierarchy,
  getManagementUnitsHierarchyUen,
  getManagementUnitsHierarchyManages,
  getManagementUnitsHierarchyStrategy,
  getManagementUnitsHierarchyCommunicates,
  getManagementUnitsHierarchyBelongs,
} from '~/features/ManagementUnits/domain/store';

export enum ManagementUnitSelectTypes {
  ALL = 'ALL',
  MANAGES = 'MANAGES',
  COMMUNICATES = 'COMMUNICATES',
  STRATEGY = 'STRATEGY',
  UEN = 'UEN',
  BELONGS = 'BELONGS',
}

export interface IFormManagementUnitProps extends IFormSelectProps {
  type: string | ManagementUnitSelectTypes;
}

const ManagementUnitSelect: React.FC<IFormManagementUnitProps> = (props) => {
  const { store, dispatch } = useAppStore();
  const [managementUnits, setManagementUnits] = useState([] as ISelectOption[]);

  useEffect(() => {
    switch (props.type.toUpperCase()) {
      case ManagementUnitSelectTypes.UEN:
        dispatch(getManagementUnitsHierarchyUen());
        break;

      case ManagementUnitSelectTypes.MANAGES:
        dispatch(getManagementUnitsHierarchyManages());
        break;

      case ManagementUnitSelectTypes.COMMUNICATES:
        dispatch(getManagementUnitsHierarchyCommunicates());
        break;

      case ManagementUnitSelectTypes.STRATEGY:
        dispatch(getManagementUnitsHierarchyStrategy());
        break;

      case ManagementUnitSelectTypes.BELONGS:
        dispatch(getManagementUnitsHierarchyBelongs());
        break;

      default:
        dispatch(getManagementUnitsHierarchy());
    }
  }, []);

  useEffect(() => {
    if (ManagementUnitSelectTypes.ALL) {
      setManagementUnits(convertManagementUnitsHierarchyToSelectOptions(
        store.MANAGEMENT_UNIT.managementUnitsHierarchy,
      ));
    }
  }, [store.MANAGEMENT_UNIT.managementUnitsHierarchy]);

  useEffect(() => {
    if (ManagementUnitSelectTypes.UEN) {
      setManagementUnits(convertManagementUnitsHierarchyToSelectOptions(
        store.MANAGEMENT_UNIT.managementUnitsHierarchyUen,
      ));
    }
  }, [store.MANAGEMENT_UNIT.managementUnitsHierarchyUen]);

  useEffect(() => {
    if (ManagementUnitSelectTypes.MANAGES) {
      setManagementUnits(convertManagementUnitsHierarchyToSelectOptions(
        store.MANAGEMENT_UNIT.managementUnitsHierarchyManages,
      ));
    }
  }, [store.MANAGEMENT_UNIT.managementUnitsHierarchyManages]);

  useEffect(() => {
    if (ManagementUnitSelectTypes.STRATEGY) {
      setManagementUnits(convertManagementUnitsHierarchyToSelectOptions(
        store.MANAGEMENT_UNIT.managementUnitsHierarchyStrategy,
      ));
    }
  }, [store.MANAGEMENT_UNIT.managementUnitsHierarchyStrategy]);

  useEffect(() => {
    if (ManagementUnitSelectTypes.COMMUNICATES) {
      setManagementUnits(convertManagementUnitsHierarchyToSelectOptions(
        store.MANAGEMENT_UNIT.managementUnitsHierarchyCommunicates,
      ));
    }
  }, [store.MANAGEMENT_UNIT.managementUnitsHierarchyCommunicates]);

  useEffect(() => {
    if (ManagementUnitSelectTypes.BELONGS) {
      setManagementUnits(convertManagementUnitsHierarchyToSelectOptions(
        store.MANAGEMENT_UNIT.managementUnitsHierarchyBelongs,
      ));
    }
  }, [store.MANAGEMENT_UNIT.managementUnitsHierarchyBelongs]);

  const convertManagementUnitsHierarchyToSelectOptions = (
    items: IManagementUnitHierarchy[],
  ) => {
    const data = [] as ISelectOption[];

    items?.forEach((unit) => {
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
