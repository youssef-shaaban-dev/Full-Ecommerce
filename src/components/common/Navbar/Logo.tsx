import { Button } from '@/components/ui/button'
import { Link } from '@/i18n/routing'
import { ShoppingBag } from 'lucide-react'
import { useLocale } from 'next-intl'
import React from 'react'

export const Logo = () => {
    const locale = useLocale();
    return (
        <div className="flex-shrink-0">
            <Button variant="ghost" className="p-0 hover:bg-transparent" asChild>
                <Link href="/" className="flex items-center gap-2">
                    <div className="bg-red-600 p-2 rounded-lg text-white shadow-md hover:bg-red-700 transition-colors">
                        <ShoppingBag size={24} />
                    </div>
                    <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-red-800 hidden sm:block">
                        {locale === 'ar' ? 'متجرى' : 'ShopZone'}
                    </span>
                </Link>
            </Button>
        </div>
    )
}

