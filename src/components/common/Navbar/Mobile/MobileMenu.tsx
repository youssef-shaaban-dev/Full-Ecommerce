"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from "@/components/ui/navigation-menu";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { PageLinks } from "@/constant/enum";
import { Link } from "@/i18n/routing";
import { useAuthStore } from "@/stores/auth/useAuthStore";
import { useCartStore } from "@/stores/cart/cartStore";
import { useWishListStore } from "@/stores/wishlist/WishListStore";
import { Globe, Heart, Home, Info, Mail, Menu, Search, ShoppingBasket, ShoppingCart, X } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { useState } from "react";
import { getNavLinks } from "../navigationData";
const MobileMenu = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const language = useLocale();
    const isRTL = language === 'ar';
    const cartCount = useCartStore((state) => state.cart?.length);
    const wishlistCount = useWishListStore((state) => state.wishList?.length);
    const { user, logout } = useAuthStore((state) => state)
    const isLoggedIn = !!user;

    const t = useTranslations("navbar");

    // Use centralized navigation data
    const navLinks = getNavLinks(t);



    return (
        <>

            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                <SheetTrigger asChild>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="text-gray-700 hover:text-red-600 hover:bg-red-50 transition-all duration-300 hover:scale-110 relative overflow-hidden group"
                        onClick={() => setIsMenuOpen(true)}
                    >
                        <div className="relative z-10">
                            <Menu className={`h-6 w-6 transform transition-all duration-300 ${isMenuOpen ? 'rotate-90 scale-0' : 'rotate-0 scale-100'}`} />
                            <X className={`h-6 w-6 absolute top-0 left-0 transform transition-all duration-300 ${isMenuOpen ? 'rotate-0 scale-100' : '-rotate-90 scale-0'}`} />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-lg"></div>
                    </Button>
                </SheetTrigger>
                <SheetContent
                    side={isRTL ? "right" : "left"}
                    className="w-80 p-0 bg-gradient-to-b from-white via-red-50/30 to-white backdrop-blur-sm border-r-4 border-red-600 shadow-2xl"
                >
                    {/* Enhanced Menu Header */}
                    <div className="bg-gradient-to-r from-red-600 to-red-700 p-6 text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
                        <div className="absolute bottom-0 left-0 w-20 h-20 bg-white/5 rounded-full translate-y-10 -translate-x-10"></div>
                        <div className="relative z-10">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-2xl backdrop-blur-sm border border-white/20">
                                        🛍️
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-bold">
                                            {language === 'ar' ? 'متجري' : 'ShopZone'}
                                        </h2>
                                        <p className="text-white/80 text-sm">
                                            {language === 'ar' ? 'تسوق بسهولة' : 'Shop with ease'}
                                        </p>
                                    </div>
                                </div>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => setIsMenuOpen(false)}
                                    className="text-white hover:bg-white/20 hover:scale-110 transition-all duration-300"
                                >
                                    <X className="h-6 w-6" />
                                </Button>
                            </div>

                            {/* User Section */}
                            {isLoggedIn ? (
                                <div className="flex items-center space-x-3 rtl:space-x-reverse bg-white/10 rounded-lg p-3 backdrop-blur-sm border border-white/20">
                                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-lg">
                                        {/* {user.avatar} */}
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-medium text-sm">{user?.name}</p>
                                        <p className="text-white/70 text-xs truncate">{user?.email}</p>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex space-x-2 rtl:space-x-reverse">
                                    <Button
                                        asChild
                                        variant="ghost"
                                        size="sm"
                                        className="flex-1 bg-white/10 text-white hover:bg-white/20 border border-white/20 backdrop-blur-sm transition-all duration-300 hover:scale-105"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        <Link href="/login">
                                            {language === 'ar' ? 'تسجيل الدخول' : 'Sign In'}
                                        </Link>
                                    </Button>
                                    <Button
                                        asChild
                                        size="sm"
                                        className="flex-1 bg-white text-red-600 hover:bg-gray-100 font-medium transition-all duration-300 hover:scale-105 shadow-lg"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        <Link href="/signup">
                                            {language === 'ar' ? 'حساب جديد' : 'Sign Up'}
                                        </Link>
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Menu Content */}
                    <div className="flex flex-col h-full">



                        {/* Navigation Links with Animation */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-2">
                            {navLinks.map((link) => (
                                <NavigationMenu key={link.id}>
                                    <NavigationMenuList className="space-x-1 rtl:space-x-reverse">
                                        <NavigationMenuItem >
                                            <Button
                                                variant="ghost"
                                                className="text-gray-700 hover:text-white hover:bg-red-600 transition-all duration-300 font-medium"
                                                asChild
                                                onClick={() => setIsMenuOpen(false)}
                                            >
                                                <Link href={link.href}>{link.name}</Link>
                                            </Button>
                                        </NavigationMenuItem>
                                    </NavigationMenuList>
                                </NavigationMenu>
                            ))}

                            <Separator className="my-4" />


                        </div>

                        {/* Footer */}
                        <div className="p-4 border-t border-gray-200 bg-gray-50/50">
                            <div className="flex items-center justify-between mb-3">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    // onClick={toggleLanguage}
                                    className="flex items-center space-x-2 rtl:space-x-reverse border-red-200 text-red-600 hover:bg-red-50 transition-all duration-300"
                                >
                                    <Globe className="h-4 w-4" />
                                    <span>{language === 'ar' ? 'English' : 'عربي'}</span>
                                </Button>

                                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                                    <Button variant="ghost" size="icon" className="relative text-gray-600 hover:text-red-600">
                                        <Heart className="h-5 w-5" />
                                        {wishlistCount > 0 && (
                                            <Badge variant="destructive" className="absolute -top-1 -right-1 h-4 w-4 text-xs p-0 flex items-center justify-center">
                                                {wishlistCount}
                                            </Badge>
                                        )}
                                    </Button>
                                    <Button variant="ghost" size="icon" className="relative text-gray-600 hover:text-red-600">
                                        <ShoppingCart className="h-5 w-5" />
                                        {cartCount > 0 && (
                                            <Badge variant="destructive" className="absolute -top-1 -right-1 h-4 w-4 text-xs p-0 flex items-center justify-center">
                                                {cartCount}
                                            </Badge>
                                        )}
                                    </Button>
                                </div>
                            </div>

                            {isLoggedIn && <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                    logout();
                                    setIsMenuOpen(false);
                                }}
                                className="w-full text-red-600 border-red-200 hover:bg-red-50 transition-all duration-300"
                            >
                                {language === 'ar' ? 'تسجيل الخروج' : 'Sign Out'}
                            </Button>
                            }
                        </div>
                    </div>
                </SheetContent>
            </Sheet>

        </>
    )
}

export default MobileMenu