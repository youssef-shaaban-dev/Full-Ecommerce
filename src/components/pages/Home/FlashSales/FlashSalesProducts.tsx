'use client';
import ProductCard from "@/components/common/products/ProductCard";
import useGetProducts from "@/hooks/Product/useGetProducts";
import ProductSkeleton from "@/components/common/products/ProductSkeleton";
import { Button } from "@/components/ui/button";
import FlashSlider from "./FlashSlider";

import { useTranslations } from "next-intl";

const FlashSalesProducts = () => {
    const t = useTranslations("home");
    const { data: products, isLoading } = useGetProducts();
    if (isLoading) {
        return (
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-3 lg:grid-cols-4">
                {Array.from({ length: 4 }).map((_, i) => (
                    <ProductSkeleton key={i} />
                ))}
            </div>
        );
    }

    return (
        <>
            <FlashSlider spaceBetween={20}>
                {products?.map((product) => (
                    <ProductCard product={product} key={product.productId} />
                ))}
            </FlashSlider>

            {/* View All Button */}
            <div className="flex justify-center mt-16">
                <Button variant='secondary' className="px-8 py-3 rounded transition-colors">
                    {t("view_all")}
                </Button>
            </div>
        </>
    );
};


export default FlashSalesProducts;
