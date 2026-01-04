"use client"
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { Link } from "@/i18n/routing";
import { useAuthStore } from "@/stores/auth/useAuthStore";
import { ChevronDown, ShoppingCart, User } from "lucide-react";
import { useLocale } from "next-intl";

const AuthButtons = () => {
    const { user, logout } = useAuthStore();
    const locale = useLocale();
    // const t = useTranslations("authBtn");
    const isLoggedIn = !!user;

    return (
        <>
            {isLoggedIn ? (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="flex items-center space-x-2 rtl:space-x-reverse text-gray-700 hover:text-red-600 hover:bg-red-50 transition-all duration-300 px-2">
                            <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center text-red-600 font-semibold">
                                {user.name.charAt(0).toUpperCase()}
                            </div>
                            <div className="hidden lg:flex flex-col items-start rtl:items-end">
                                <span className="text-xs text-gray-500 leading-none">
                                    مرحبا
                                </span>
                                <span className="text-sm font-medium leading-none max-w-20 truncate">
                                    {user.name}
                                </span>
                            </div>
                            <ChevronDown className="h-3 w-3" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align={locale ? "end" : "start"} className="w-56">
                        <div className="flex items-center space-x-2 rtl:space-x-reverse p-2">
                            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center text-red-600 font-semibold text-lg">
                                {user.name.charAt(0).toUpperCase()}
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-medium text-gray-900">{user.name}</p>
                                <p className="text-xs text-gray-500 truncate">{user.email}</p>
                            </div>
                        </div>
                        <Separator />
                        <DropdownMenuItem asChild className="hover:bg-red-50 focus:bg-red-50 cursor-pointer">
                            <Link href='/account'>
                                <User className="h-4 w-4 mr-2 rtl:mr-0 rtl:ml-2" />
                                {locale === 'ar' ? 'الملف الشخصي' : 'Profile'}
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild className="hover:bg-red-50 focus:bg-red-50 cursor-pointer">
                            <Link href='/orders'>
                                <ShoppingCart className="h-4 w-4 mr-2 rtl:mr-0 rtl:ml-2" />
                                {locale === 'ar' ? 'طلباتي' : 'My Orders'}
                            </Link>
                        </DropdownMenuItem>

                        <DropdownMenuItem className="hover:bg-red-50 focus:bg-red-50 cursor-pointer">
                            <svg className="h-4 w-4 mr-2 rtl:mr-0 rtl:ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            {locale === 'ar' ? 'الإعدادات' : 'Settings'}
                        </DropdownMenuItem>
                        <Separator />
                        <DropdownMenuItem
                            className="hover:bg-red-50 focus:bg-red-50 cursor-pointer text-red-600"
                            onClick={logout}
                        >
                            <svg className="h-4 w-4 mr-2 rtl:mr-0 rtl:ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                            {locale === 'ar' ? 'تسجيل الخروج' : 'Sign Out'}
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            ) : (
                <>
                    {/* Desktop: Full Buttons */}
                    <div className="hidden lg:flex items-center space-x-2 rtl:space-x-reverse">
                        <Link href={"/login"} className="flex items-center">
                            <Button
                                variant="ghost"
                                size="sm"
                                className="text-gray-700 hover:text-red-600 hover:bg-red-50 transition-all duration-300 font-medium"
                            >
                                {locale === 'ar' ? 'تسجيل الدخول' : 'Sign In'}
                            </Button>
                        </Link>
                        <Link href={"/signup"} className="flex items-center">
                            <Button
                                size="sm"
                                className="bg-red-600 hover:bg-red-700 text-white transition-all duration-300 hover:scale-105 shadow-sm"
                            >
                                {locale === 'ar' ? 'إنشاء حساب' : 'Sign Up'}
                            </Button>
                        </Link>
                    </div>

                    {/* Mobile: User Icon only */}
                    <div className="lg:hidden">
                        <Link href={"/login"}>
                            <Button variant="ghost" size="icon" className="text-gray-700 hover:text-red-600">
                                <User className="h-6 w-6" />
                            </Button>
                        </Link>
                    </div>
                </>
            )
            }
        </>
    )
}

export default AuthButtons