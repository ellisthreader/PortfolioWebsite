import { Link } from '@inertiajs/react';

import AppLogo from '@/components/app-logo';
import { Button } from '@/components/ui/button';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';
import { toUrl } from '@/lib/utils';
import type { NavItem } from '@/types';

export function AppHeaderMobileNav({
    mainNavItems,
    rightNavItems,
}: {
    mainNavItems: NavItem[];
    rightNavItems: NavItem[];
}) {
    return (
        <div className="lg:hidden">
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="ghost" className="mr-2 h-[34px] px-3">
                        Menu
                    </Button>
                </SheetTrigger>
                <SheetContent
                    side="left"
                    className="flex h-full w-64 flex-col items-stretch justify-between bg-sidebar"
                >
                    <SheetTitle className="sr-only">Navigation menu</SheetTitle>
                    <SheetHeader className="flex justify-start text-left">
                        <AppLogo />
                    </SheetHeader>
                    <div className="flex h-full flex-1 flex-col space-y-4 p-4">
                        <div className="flex h-full flex-col justify-between text-sm">
                            <div className="flex flex-col space-y-4">
                                {mainNavItems.map((item) => (
                                    <Link
                                        key={item.title}
                                        href={item.href}
                                        className="font-medium"
                                    >
                                        <span>{item.title}</span>
                                    </Link>
                                ))}
                            </div>

                            <div className="flex flex-col space-y-4">
                                {rightNavItems.map((item) => (
                                    <a
                                        key={item.title}
                                        href={toUrl(item.href)}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="font-medium"
                                    >
                                        <span>{item.title}</span>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    );
}
