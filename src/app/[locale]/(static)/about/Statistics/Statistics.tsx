"use client";
import { ServiceCard } from "@/components/pages/Home/Services/ServiceCard";
import { CiShop } from "react-icons/ci";
import { HiOutlineCurrencyDollar } from "react-icons/hi2";
import { MdShoppingBag } from "react-icons/md";
import { TbMoneybag } from "react-icons/tb";

interface prarTypes {
  head: string;
  para: string;
  icon?: React.ElementType;
}
const servicesData: prarTypes[] = [
  {
    icon: CiShop,
    head: "10.5K",
    para: "Sallers active our site",
  },
  {
    icon: HiOutlineCurrencyDollar,
    head: "33K",
    para: "Mopnthly Produduct Sale",
  },
  {
    icon: MdShoppingBag,
    head: "45.5K",
    para: "Customer active in our site",
  },
  {
    icon: TbMoneybag,
    head: "25K",
    para: "Anual gross sale in our site",
  },
];
const Statistics = () => {
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
