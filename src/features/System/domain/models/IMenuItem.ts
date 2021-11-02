interface IMenuItem {
  label: string;
  link?: string;
  children?: IMenuItem[];
}

export default IMenuItem;
