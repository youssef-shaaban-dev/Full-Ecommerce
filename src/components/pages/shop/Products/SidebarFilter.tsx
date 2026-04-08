import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

interface SidebarFilterProps {
  isSidebarOpen: boolean;
  categories: { categoryId: string; categoryName: string }[];
  onCategoryChange?: (categoryId: string | undefined) => void;
  onSortChange?: (sort: string) => void;
  onReset?: () => void;
}

const SidebarFilter = ({
  isSidebarOpen,
  categories,
  onCategoryChange,
  onSortChange,
  onReset,
}: SidebarFilterProps) => {
  const t = useTranslations("shop.products.filter");

  return (
    <aside
      className={`lg:w-1/4 w-full h-3/4 bg-white border rounded-2xl p-6 shadow-xl transition-all duration-300 ${
        isSidebarOpen ? "block" : "hidden lg:block"
      }`}
    >
      <div className="flex justify-between items-center mb-6 gap-2">
        <h2 className="text-2xl font-bold text-gray-800">{t("title")}</h2>
        <Button
          className="text-sm text-white font-medium transition-colors"
          onClick={onReset}
        >
          {t("reset")}
        </Button>
      </div>

      {/* category */}
      <div className="mb-8">
        <label className="block mb-3 font-semibold text-gray-700">{t("category")}</label>
        <select
          className="w-full border rounded-lg ps-4 pe-8 py-2 bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-black transition-colors"
          onChange={(e) =>
            onCategoryChange?.(e.target.value === "all" ? undefined : e.target.value)
          }
        >
          <option value="all">{t("all_categories")}</option>
          {categories.map((cat) => (
            <option key={cat.categoryId} value={cat.categoryId}>
              {cat.categoryName}
            </option>
          ))}
        </select>
      </div>

      {/* sort */}
      <div className="mb-8">
        <label className="block mb-3 font-semibold text-gray-700">{t("sort.label")}</label>
        <select
          className="w-full border rounded-lg ps-4 pe-8 py-2 bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-black transition-colors"
          onChange={(e) => onSortChange?.(e.target.value)}
        >
          <option value="default">{t("sort.default")}</option>
          <option value="price-asc">{t("sort.price_asc")}</option>
          <option value="price-desc">{t("sort.price_desc")}</option>
          <option value="newest">{t("sort.newest")}</option>
        </select>
      </div>
    </aside>
  );
};

export default SidebarFilter;
