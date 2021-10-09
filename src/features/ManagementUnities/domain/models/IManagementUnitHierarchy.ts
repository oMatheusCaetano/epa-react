interface IManagementUnitHierarchy {
  id: number;
  name?: string;
  children?: IManagementUnitHierarchy[];
  uen?: number|boolean;
}

export default IManagementUnitHierarchy;
