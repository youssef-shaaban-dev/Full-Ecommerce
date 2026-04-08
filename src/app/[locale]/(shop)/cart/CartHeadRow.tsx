import styles from "@/styles/cart/Cart.module.scss";
import { useTranslations } from "next-intl";

const CartHeadRow = () => {
  const t = useTranslations("shop.cart.table");
  const headTitles = [t("product"), t("price"), t("quantity"), t("subtotal")];

  return (
    <>
      <tr className={styles.tableRow}>
        {headTitles.map((i, index) => (
          <th key={index} className={`${styles.headColumns} ${styles.columns}`}>
            {i}
          </th>
        ))}
      </tr>
    </>
  );
};


export default CartHeadRow;
