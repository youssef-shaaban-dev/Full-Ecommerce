import useGetProducts from '@/hooks/Product/useGetProducts';
import { Badge } from "@/components/ui/badge";
import ProductCard from '@/components/common/products/ProductCard';
import ProductSkeleton from '@/components/common/products/ProductSkeleton';
import { useState } from 'react';
import Pagination from '@/components/pages/shop/Products/Pagination';
import { useTranslations } from 'next-intl';

const RelatedItemsSection = () => {
    const t = useTranslations("product.details");
    // ✅ Pagination state
    const [pageNumber, setPageNumber] = useState(1);
    const pageSize = 6;

    const { data: products, isLoading } = useGetProducts({
        pageSize: 4,
        pageNumber,
    });

    return (
        <div className="mt-16">
            <div className="flex items-center gap-5 mb-6">
                <Badge variant="secondary"></Badge>
                <p className="text-md font-bold align-middle">{t("related")}</p>
            </div>

            {/* Products List */}
            {isLoading ? (
                <div className="container mx-auto mt-12 px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {Array.from({ length: pageSize }).map((_, i) => (
                            <ProductSkeleton key={i} />
                        ))}
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {products?.map((product) => (
                        <ProductCard key={product.productId} product={product} />
                    ))}
                </div>
            )}
            <Pagination
                currentPage={pageNumber}
                totalPages={products?.length || 1}
                onPageChange={setPageNumber}
            />
        </div>
    )
}

export default RelatedItemsSection