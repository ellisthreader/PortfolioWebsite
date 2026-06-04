import { dashboard } from '@/routes';
import type { NavItem } from '@/types';

export const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
        icon: null,
    },
];

export const rightNavItems: NavItem[] = [
    {
        title: 'Repository',
        href: 'https://github.com/ellisthreader/PortfolioWebsite',
        icon: null,
    },
    {
        title: 'Live Site',
        href: 'https://ellisthreader.com',
        icon: null,
    },
];
