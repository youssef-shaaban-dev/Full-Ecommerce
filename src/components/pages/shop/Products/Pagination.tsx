import { useTranslations } from "next-intl";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  const t = useTranslations("shop.products.pagination");

  return (
    <div className="flex justify-center items-center my-5 gap-4 flex-wrap">
      {/* previous */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-5 py-2 bg-black text-white rounded-lg hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
      >
        {t("prev")}
      </button>

      {/* page info */}
      <span className="text-sm font-medium text-gray-700">
        {t("page_info", { current: currentPage, total: totalPages })}
      </span>

      {/* next */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-5 py-2 bg-black text-white rounded-lg hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
      >
        {t("next")}
      </button>
    </div>
  );
};

export default Pagination;
