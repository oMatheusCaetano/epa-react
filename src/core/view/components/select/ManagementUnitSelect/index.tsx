import React, { useState, useEffect } from 'react';

import { ManagementUnitHierarchy } from '~/features/ManagementUnits/domain/models';

import * as C from '~/core/view/components';
import { handleManagementUnitsHierarchy, ManagementUnitHierarchyType } from '~/features/ManagementUnits/domain/stores/management-unit';
import { useAppStore } from '~/core/view/hooks';

export interface ManagementUnitSelectProps extends C.SelectProps {
  unitType?: ManagementUnitHierarchyType;
}

const ManagementUnitSelect: React.FC<ManagementUnitSelectProps> = (props) => {
  const { store, dispatch } = useAppStore();
  const [managementUnits, setManagementUnits] = useState([] as C.SelectOption[]);

  useEffect(() => {
    switch (props.unitType) {
      case ManagementUnitHierarchyType.UEN:
        dispatch(handleManagementUnitsHierarchy(ManagementUnitHierarchyType.UEN));
        break;

      case ManagementUnitHierarchyType.STRATEGY:
        dispatch(handleManagementUnitsHierarchy(ManagementUnitHierarchyType.STRATEGY));
        break;

      case ManagementUnitHierarchyType.BELONGS:
        dispatch(handleManagementUnitsHierarchy(ManagementUnitHierarchyType.BELONGS));
        break;

      case ManagementUnitHierarchyType.COMMUNICATE:
        dispatch(handleManagementUnitsHierarchy(ManagementUnitHierarchyType.COMMUNICATE));
        break;

      case ManagementUnitHierarchyType.MANAGES:
        dispatch(handleManagementUnitsHierarchy(ManagementUnitHierarchyType.MANAGES));
        break;

      default:
        dispatch(handleManagementUnitsHierarchy(ManagementUnitHierarchyType.ALL));
    }
  }, []);

  useEffect(() => {
    switch (props.unitType) {
      case ManagementUnitHierarchyType.UEN:
        setManagementUnits(convertManagementUnitsHierarchyToSelectOptions(
          store.MANAGEMENT_UNIT.managementUnitsHierarchyUen,
        ));
        break;

      case ManagementUnitHierarchyType.STRATEGY:
        setManagementUnits(convertManagementUnitsHierarchyToSelectOptions(
          store.MANAGEMENT_UNIT.managementUnitsHierarchyStrategy,
        ));
        break;

      case ManagementUnitHierarchyType.BELONGS:
        setManagementUnits(convertManagementUnitsHierarchyToSelectOptions(
          store.MANAGEMENT_UNIT.managementUnitsHierarchyBelongs,
        ));
        break;

      case ManagementUnitHierarchyType.COMMUNICATE:
        setManagementUnits(convertManagementUnitsHierarchyToSelectOptions(
          store.MANAGEMENT_UNIT.managementUnitsHierarchyCommunicates,
        ));
        break;

      case ManagementUnitHierarchyType.MANAGES:
        setManagementUnits(convertManagementUnitsHierarchyToSelectOptions(
          store.MANAGEMENT_UNIT.managementUnitsHierarchyManages,
        ));
        break;

      default:
        setManagementUnits(convertManagementUnitsHierarchyToSelectOptions(
          store.MANAGEMENT_UNIT.managementUnitsHierarchy,
        ));
    }
  }, [
    store.MANAGEMENT_UNIT.managementUnitsHierarchy,
    store.MANAGEMENT_UNIT.managementUnitsHierarchyUen,
    store.MANAGEMENT_UNIT.managementUnitsHierarchyStrategy,
    store.MANAGEMENT_UNIT.managementUnitsHierarchyManages,
    store.MANAGEMENT_UNIT.managementUnitsHierarchyCommunicates,
    store.MANAGEMENT_UNIT.managementUnitsHierarchyBelongs,
  ]);

  function convertManagementUnitsHierarchyToSelectOptions(
    managementUnits: ManagementUnitHierarchy[],
  ) {
    const data: C.SelectOption[] = managementUnits.map((managementUnit) => ({
      label: managementUnit.descricao,
      value: managementUnit.codigo,
      bolded: !!managementUnit.uen,
      expanded: true,
      hide: false,
      children: convertManagementUnitsHierarchyToSelectOptions(managementUnit.filho ?? []),
    }));

    return data;
  }

  return (
    <C.Select
      {...props}
      label={props.label ?? props.multiple ? 'Unidades Gerenciais' : 'Unidade Gerencial'}
      options={props.options ?? managementUnits}
    />
  );
};

export default ManagementUnitSelect;
