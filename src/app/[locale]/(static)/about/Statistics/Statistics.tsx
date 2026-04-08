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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
      {servicesData &&
        servicesData.map((card, index) => {
          return (
            <div 
              key={index} 
              className="group border border-slate-200 p-8 bg-white rounded-lg flex flex-col items-center justify-center gap-4 transition-all duration-300 hover:bg-primary-red hover:border-primary-red hover:shadow-2xl hover:-translate-y-2 cursor-default"
            >
              <div className="bg-slate-200 text-slate-900 group-hover:bg-white/20 group-hover:text-white p-3 rounded-full w-16 h-16 flex items-center justify-center transition-colors duration-300">
                <card.icon size={32} />
              </div>
              <div className="text-center group-hover:text-white transition-colors duration-300">
                <h3 className="text-3xl font-bold tracking-tight mb-1">{card.head}</h3>
                <p className="text-sm font-medium text-slate-600 group-hover:text-white/90">{card.para}</p>
              </div>
            </div>
          );
        })}
    </div>
  );
};


export default Statistics;
