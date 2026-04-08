import { ServiceCard } from "@/components/pages/Home/Services/ServiceCard";
import { CiShop } from "react-icons/ci";
import { HiOutlineCurrencyDollar } from "react-icons/hi2";
import { MdShoppingBag } from "react-icons/md";
import { TbMoneybag } from "react-icons/tb";
import { useTranslations } from "next-intl";

const Statistics = () => {
  const t = useTranslations("about.stats");

  const servicesData = [
    {
      icon: CiShop,
      head: "10.5K",
      para: t("sellers"),
    },
    {
      icon: HiOutlineCurrencyDollar,
      head: "33K",
      para: t("sales"),
    },
    {
      icon: MdShoppingBag,
      head: "45.5K",
      para: t("customers"),
    },
    {
      icon: TbMoneybag,
      head: "25K",
      para: t("gross_sales"),
    },
  ];

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 ">
      {servicesData &&
        servicesData.map((card, index) => {
          return (
            <div key={index} className="border py-4 bg-white">
              <ServiceCard icon={card.icon} head={card.head} para={card.para} />
            </div>
          );
        })}
    </div>
  );
};


export default Statistics;
