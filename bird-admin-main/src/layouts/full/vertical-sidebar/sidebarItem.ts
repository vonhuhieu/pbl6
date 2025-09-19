import {
  DashboardIcon,
  RecycleIcon,
  BrandTwitterIcon,
  SearchIcon
} from 'vue-tabler-icons';

export interface menu {
  header?: string;
  title?: string;
  icon?: object;
  to?: string;
  divider?: boolean;
  chip?: string;
  chipColor?: string;
  chipVariant?: string;
  chipIcon?: string;
  children?: menu[];
  disabled?: boolean;
  type?: string;
  subCaption?: string;
}

const sidebarItem: menu[] = [
  { header: 'Dashboard' },
  {
    title: 'Default',
    icon: DashboardIcon,
    to: '/dashboard/default'
  },
  { divider: true },
  { header: 'Pages' },
  {
    title: 'Bird orders',
    icon: BrandTwitterIcon,
    to: '/pages/birdorders'
  },
  {
    title: 'Recycle Bin',
    icon: RecycleIcon,
    to: '/pages/recycle'
  },
  {
    title: 'Search',
    icon: SearchIcon,
    to: '/pages/search'
  },
  { divider: true },
];

export default sidebarItem;
