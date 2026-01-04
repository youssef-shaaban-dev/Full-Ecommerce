'use client'
import { Button } from '@/components/ui/button';
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuList,
} from '@/components/ui/navigation-menu';
import { Link } from '@/i18n/routing';
import { MoreHorizontal } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { getNavLinks } from './navigationData';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const DesktopNavigation = () => {
    const t = useTranslations("navbar");
    const locale = useLocale();

    // Use centralized navigation data
    const allNavLinks = getNavLinks(t);

    // Determines how many items to show before the "More" dropdown
    // This could be dynamic based on screen width, but a fixed number is safer for SSR
    const VISIBLE_COUNT = 6;

    const visibleLinks = allNavLinks.slice(0, VISIBLE_COUNT);
    const hiddenLinks = allNavLinks.slice(VISIBLE_COUNT);

    return (
        <div className="hidden lg:flex items-center space-x-1 rtl:space-x-reverse flex-1 ml-8 rtl:ml-0 rtl:mr-8" dir={locale === 'ar' ? 'rtl' : 'ltr'} >
            <NavigationMenu>
                <NavigationMenuList dir={locale === 'ar' ? 'rtl' : 'ltr'} className="space-x-1 rtl:space-x-reverse">
                    {visibleLinks.map((link) => (
                        <NavigationMenuItem key={link.id}>
                            <Button
                                variant="ghost"
                                className="text-gray-700 hover:text-white hover:bg-red-600 transition-all duration-300 font-medium"
                                asChild
                            >
                                <Link href={link.href}>{link.name}</Link>
                            </Button>
                        </NavigationMenuItem>
                    ))}

                    {hiddenLinks.length > 0 && (
                        <NavigationMenuItem>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        className="text-gray-700 hover:text-white hover:bg-red-600 transition-all duration-300 font-medium space-x-1 rtl:space-x-reverse"
                                    >
                                        <span className="text-sm font-medium">{t('more') || 'More'}</span>
                                        <MoreHorizontal size={16} />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-48 bg-white border-red-100">
                                    {hiddenLinks.map((link) => (
                                        <DropdownMenuItem key={link.id} asChild className="cursor-pointer hover:bg-red-50 focus:bg-red-50 text-gray-700 focus:text-red-700">
                                            <Link href={link.href} className="flex items-center w-full px-2 py-2">
                                                {link.icon && <span className="mr-2 rtl:mr-0 rtl:ml-2 text-gray-500">{link.icon}</span>}
                                                <span>{link.name}</span>
                                            </Link>
                                        </DropdownMenuItem>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </NavigationMenuItem>
                    )}

                </NavigationMenuList>
            </NavigationMenu>
        </div>
    )
}

export default DesktopNavigation
