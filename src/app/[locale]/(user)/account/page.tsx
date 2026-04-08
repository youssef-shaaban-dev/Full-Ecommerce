import PathLinks from "@/components/common/PathLinks";
import SideBarUl from "./SideBarUl";
import AccountBody from "./AccountBody";
import { useTranslations } from "next-intl";

const AccountPage = () => {
  const t = useTranslations("user");

  const uls = [
    {
      title: t("sidebar.manage"),
      lis: [t("sidebar.profile"), t("sidebar.addresses"), t("sidebar.reviews")],
    },
    {
      title: t("sidebar.orders"),
      lis: [t("sidebar.orders")],
    },
    {
      title: t("sidebar.wishlist"),
    },
  ];

  return (
    <div className="my-28 mx-auto w-[90%]">
      <div className=" flex justify-between ">
        <PathLinks titles={[t("title")]} />
        <h5 className="text-xs font-extralight">
          {t("welcome")} <span className="text-red-600">Joo</span>
        </h5>
      </div>
      <div className="my-12 flex gap-10 custom-handling:flex-col">
        <div className="sidebar flex flex-col gap-4">
          {uls.map((i, index) => (
            <SideBarUl key={index} title={i.title} theLink={i.lis} />
          ))}
        </div>
        <div className="w-[60%] mx-auto custom-handling:!w-[100%]">
          <AccountBody />
        </div>
      </div>
    </div>
  );
};


export default AccountPage;
