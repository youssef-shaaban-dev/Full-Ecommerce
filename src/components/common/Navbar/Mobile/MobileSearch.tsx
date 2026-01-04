'use client'
import { useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import useDebounce from '@/hooks/useDebounce'
import useGetProducts from '@/hooks/Product/useGetProducts'
import { useLocale } from 'next-intl'

const MobileSearch = () => {

    const [searchQuery, setSearchQuery] = useState('');
    const debouncedSearchQuery = useDebounce(searchQuery, 500);
    const [showSearchResults, setShowSearchResults] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const { data: Products } = useGetProducts();
    const language = useLocale();
    const isRTL = language === 'ar';

    // Filter products based on search query
    const filteredProducts = debouncedSearchQuery.trim()
        ? Products?.filter(product =>
            product.name.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
            product.shortDescription.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
        ) || []
        : [];

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchQuery(value);
        setShowSearchResults(value.trim().length > 0);
    };

    // Close search results when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setShowSearchResults(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (

        <div className="px-4 pb-4 search-container max-w-7xl mx-auto" ref={dropdownRef}>
            <div className="relative">
                <Input
                    type="text"
                    placeholder={language === 'ar' ? 'ابحث عن المنتجات...' : 'Search for products...'}
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className={`${isRTL ? 'pr-12' : 'pl-4 pr-12'} h-10 border-2 border-gray-200 focus:border-red-600 rounded-full`}
                />
                <Button
                    size="sm"
                    className={`absolute ${isRTL ? 'left-2' : 'right-2'} top-1/2 transform -translate-y-1/2 h-8 w-8 bg-red-600 hover:bg-red-700 rounded-full p-0`}
                >
                    <Search className="h-4 w-4" />
                </Button>

                {/* Mobile Search Results */}
                {showSearchResults && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-xl max-h-80 overflow-auto z-50">
                        {filteredProducts.length > 0 ? (
                            filteredProducts.slice(0, 4).map((product) => (
                                <div key={product.productId} className="p-3 hover:bg-gray-50 cursor-pointer transition-colors border-b last:border-b-0">
                                    <div className="flex items-center space-x-3 rtl:space-x-reverse">
                                        <div className="relative w-12 h-12 flex-shrink-0">
                                            {/* @ts-ignore */}
                                            <img
                                                src={product.mainImageUrl}
                                                alt={product.name}
                                                className="rounded-md object-cover w-full h-full"
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-medium text-gray-900 text-sm">{product.name}</h4>
                                        </div>
                                        <span className="font-bold text-red-600 text-sm">
                                            {language === 'ar' ? `${product.price} ر.س` : `${product.price}`}
                                        </span>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="p-4 text-center text-gray-500 text-sm">
                                {language === 'ar' ? 'لا توجد نتائج' : 'No results found'}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}

export default MobileSearch;