interface MenuItem {
  path?: string;
  menu: string;
  link?: string;
  children: MenuItem[];
}

export default MenuItem;
