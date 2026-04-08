import { useTranslations } from "next-intl";

const CartHeadRow = () => {
  const t = useTranslations("shop.cart.table");
  const headTitles = [t("product"), t("price"), t("quantity"), t("subtotal")];

  return (
    <>
      <tr className="border-b border-gray-200">
        {headTitles.map((i, index) => (
          <th key={index} className="p-4 text-left font-semibold">
            {i}
          </th>
        ))}
      </tr>
    </>
  );
};


export default CartHeadRow;
