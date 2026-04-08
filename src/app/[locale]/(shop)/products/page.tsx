"use client";
import ProductCard from "@/components/common/products/ProductCard";
import ProductSkeleton from "@/components/common/products/ProductSkeleton";
import Pagination from "@/components/pages/shop/Products/Pagination";
import SidebarFilter from "@/components/pages/shop/Products/SidebarFilter";
import { Button } from "@/components/ui/button";
import useGetCategory from "@/hooks/Product/useGetCategories";
import useGetProducts from "@/hooks/Product/useGetProducts";
import { useState } from "react";
import { useTranslations } from "next-intl";

const ProductsPage = () => {
  const t = useTranslations("shop.products.filter");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // ✅ Pagination state
  const [pageNumber, setPageNumber] = useState(1);
  const pageSize = 6;

  // ✅ Filters state
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("default");

  // ✅ API calls
  const { data: products, isLoading: ProductsLoading } = useGetProducts({
    pageNumber,
    pageSize,
    categoryId: selectedCategory,
    searchQuery,
    orderBy: sortOrder !== "default" ? sortOrder : undefined,
  });

  const { data: categories, isLoading: categoriesLoading } = useGetCategory();

  if (ProductsLoading || categoriesLoading) {
    return (
      <div className="container mx-auto mt-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: pageSize }).map((_, i) => (
            <ProductSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-12 px-4 sm:px-6 lg:px-8">
      {/* button */}
      <Button
        className="lg:hidden mb-6 px-5 py-3 bg-gradient-to-r from-black to-gray-800 text-white rounded-lg hover:from-gray-800 hover:to-black transition-all duration-300 shadow-md"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? t("close") : t("open")}
      </Button>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <SidebarFilter
          isSidebarOpen={isSidebarOpen}
          categories={categories || []}
          onCategoryChange={(catId) => {
            setSelectedCategory(catId);
            setPageNumber(1);
          }}
          onSortChange={(sort) => {
            setSortOrder(sort);
            setPageNumber(1);
          }}
          onReset={() => {
            setSelectedCategory(undefined);
            setSortOrder("default");
            setSearchQuery("");
            setPageNumber(1);
          }}
        />

        {/* Products Section */}
        <section className="lg:w-3/4 w-full flex flex-col gap-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products?.map((product) => (
              <ProductCard key={product.productId} product={product} />
            ))}
          </div>

          {/* Pagination */}
          <Pagination
            currentPage={pageNumber}
            totalPages={products?.length || 1}
            onPageChange={setPageNumber}
          />
        </section>
      </div>
    </div>
  );
};

export default ProductsPage;
