import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { UserMenuContent } from '@/components/user-menu-content';
import { toUrl } from '@/lib/utils';
import type { NavItem } from '@/types';
import type { Auth } from '@/types/auth';

export function AppHeaderUserMenu({
    auth,
    getInitials,
    rightNavItems,
}: {
    auth: Auth;
    getInitials: (value: string) => string;
    rightNavItems: NavItem[];
}) {
    return (
        <div className="ml-auto flex items-center space-x-2">
            <div className="relative flex items-center space-x-1">
                <Button variant="ghost" className="h-9 px-3">
                    Search
                </Button>
                <div className="ml-1 hidden gap-1 lg:flex">
                    {rightNavItems.map((item) => (
                        <a
                            key={item.title}
                            href={toUrl(item.href)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex h-9 items-center justify-center rounded-md px-3 text-sm font-medium text-accent-foreground ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
                        >
                            {item.title}
                        </a>
                    ))}
                </div>
            </div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghost"
                        className="size-10 rounded-full p-1"
                    >
                        <Avatar className="size-8 overflow-hidden rounded-full">
                            <AvatarImage
                                src={auth.user?.avatar}
                                alt={auth.user?.name}
                            />
                            <AvatarFallback className="rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
                                {getInitials(auth.user?.name ?? '')}
                            </AvatarFallback>
                        </Avatar>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end">
                    {auth.user && <UserMenuContent user={auth.user} />}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}
