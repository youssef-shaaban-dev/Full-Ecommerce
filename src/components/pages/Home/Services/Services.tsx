import { TbTruckDelivery } from "react-icons/tb";
import { FaHeadphones } from "react-icons/fa6";
import { BsShieldCheck } from "react-icons/bs";
import { ServiceCard } from "./ServiceCard";

import { useTranslations } from "next-intl";

const Services = () => {
  const t = useTranslations("home.services");

  return (
    <section className="flex justify-around gap-4 sm:gap-6 md:gap-8 lg:flex-row flex-col items-center px-4 my-10">
      <ServiceCard
        head={t("delivery.head")}
        para={t("delivery.para")}
        icon={TbTruckDelivery}
      />
      <ServiceCard
        head={t("customer_service.head")}
        para={t("customer_service.para")}
        icon={FaHeadphones}
      />
      <ServiceCard
        head={t("guarantee.head")}
        para={t("guarantee.para")}
        icon={BsShieldCheck}
      />
    </section>
  );
};


// Enhanced ServiceCard Component


export default Services;