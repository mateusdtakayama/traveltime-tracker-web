import {
  Tag,
  Users,
  Settings,
  Bookmark,
  SquarePen,
  LayoutGrid,
  LucideIcon,
} from 'lucide-react'

type Submenu = {
  href: string
  label: string
  active?: boolean
}

type Menu = {
  href: string
  label: string
  active: boolean
  icon: LucideIcon
  submenus?: Submenu[]
}

type Group = {
  groupLabel: string
  menus: Menu[]
}

export function getMenuList(pathname: string): Group[] {
  return [
    {
      groupLabel: '',
      menus: [
        {
          href: '/dashboard',
          label: 'Dashboard',
          active: pathname.includes('/dashboard'),
          icon: LayoutGrid,
          submenus: [],
        },
      ],
    },
    {
      groupLabel: 'Viagens',
      menus: [
        {
          href: '',
          label: 'Calculadoras',
          active: pathname.includes('/calculators'),
          icon: SquarePen,
          submenus: [
            {
              href: '/calculators/',
              label: 'Calculadora Estática',
            },
            {
              href: '/calculators/dinamic',
              label: 'Calculadora Dinâmica',
            },
          ],
        },
      ],
    },
  ]
}
