interface IManagementUnit {
  id: number;
  name?: string;
  children?: IManagementUnit[];
  uen?: number|boolean;
}

export default IManagementUnit;
