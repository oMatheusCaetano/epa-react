interface IMenuItem {
  label: string,
  children?: IMenuItem[],
}

export default IMenuItem;
