import ProductCard from "@/components/common/products/ProductCard";
import { Badge } from "@/components/ui/badge";
import useGetProducts from "@/hooks/Product/useGetProducts";
import Loading from "@/loading/Loading";
import styles from "@/styles/cart/Cart.module.scss";
import { useTranslations } from "next-intl";

const SuggestionProducts = () => {
  const { data: products, isLoading } = useGetProducts();
  const t = useTranslations("shop.wishlist");

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="mt-10 ">
      <div className="flex justify-between">
        <div className="title-head w-[115px] h-10 grid grid-cols-3 items-center">
          <Badge variant='secondary'></Badge>
          <p className="text-base leading-5 span-2 w-24 text-black font-semibold">
            {t("just_for_you")}
          </p>
        </div>
        <button className={styles.cartBtn}>{t("see_all")}</button>
      </div>

      <div className="flex gap-4 mt-2 custom-mid:grid custom-mid:grid-cols-2 custom-handling:grid-cols-1 custom-handling:place-items-center ">
        {products &&
          products.slice(0, 4).map((product, index) => {
            return <ProductCard key={index} product={product} />;
          })}
      </div>
    </div>
  );
};

export default SuggestionProducts;
