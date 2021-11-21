interface ManagementUnitHierarchy {
  codigo: number,
  descricao: string,
  uen: boolean|number,
  filho: ManagementUnitHierarchy[],
}

export default ManagementUnitHierarchy;
