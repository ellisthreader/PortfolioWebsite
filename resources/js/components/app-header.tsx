import { Link, usePage } from '@inertiajs/react';

import AppLogo from '@/components/app-logo';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { useCurrentUrl } from '@/hooks/use-current-url';
import { useInitials } from '@/hooks/use-initials';
import { dashboard } from '@/routes';
import type { BreadcrumbItem } from '@/types';

import { AppHeaderDesktopNav } from './app-header/app-header-desktop-nav';
import { AppHeaderMobileNav } from './app-header/app-header-mobile-nav';
import { AppHeaderUserMenu } from './app-header/app-header-user-menu';
import { mainNavItems, rightNavItems } from './app-header/navigation-items';

type Props = {
    breadcrumbs?: BreadcrumbItem[];
};

export function AppHeader({ breadcrumbs = [] }: Props) {
    const page = usePage();
    const { auth } = page.props;
    const getInitials = useInitials();
    const { isCurrentUrl, whenCurrentUrl } = useCurrentUrl();

    return (
        <>
            <div className="border-b border-sidebar-border/80">
                <div className="mx-auto flex h-16 items-center px-4 md:max-w-7xl">
                    <AppHeaderMobileNav
                        mainNavItems={mainNavItems}
                        rightNavItems={rightNavItems}
                    />
                    <Link
                        href={dashboard()}
                        prefetch
                        className="flex items-center space-x-2"
                    >
                        <AppLogo />
                    </Link>
                    <AppHeaderDesktopNav
                        isCurrentUrl={isCurrentUrl}
                        items={mainNavItems}
                        whenCurrentUrl={whenCurrentUrl}
                    />
                    <AppHeaderUserMenu
                        auth={auth}
                        getInitials={getInitials}
                        rightNavItems={rightNavItems}
                    />
                </div>
            </div>
            {breadcrumbs.length > 1 && (
                <div className="flex w-full border-b border-sidebar-border/70">
                    <div className="mx-auto flex h-12 w-full items-center justify-start px-4 text-neutral-500 md:max-w-7xl">
                        <Breadcrumbs breadcrumbs={breadcrumbs} />
                    </div>
                </div>
            )}
        </>
    );
}
