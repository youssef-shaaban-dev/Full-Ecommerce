import ProductCard from "@/components/common/products/ProductCard";
import { Badge } from "@/components/ui/badge";
import useGetProducts from "@/hooks/Product/useGetProducts";
import Loading from "@/loading/Loading";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";

const SuggestionProducts = () => {
  const { data: products, isLoading } = useGetProducts();
  const t = useTranslations("shop.wishlist");

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="mt-10 ">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Badge variant='secondary' className="w-5 h-10 rounded-sm"></Badge>
          <p className="text-xl text-black font-semibold">
            {t("just_for_you")}
          </p>
        </div>
        <Button variant="outline" className="px-10 h-10">
          {t("see_all")}
        </Button>
      </div>

      <div className="flex gap-4 mt-8 custom-mid:grid custom-mid:grid-cols-2 custom-handling:grid-cols-1 custom-handling:place-items-center">
        {products &&
          products.slice(0, 4).map((product, index) => {
            return <ProductCard key={index} product={product} />;
          })}
      </div>
    </div>
  );
};

export default SuggestionProducts;
