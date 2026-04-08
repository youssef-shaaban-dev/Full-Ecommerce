import React from "react";
import { IoCallOutline } from "react-icons/io5";
import { MdOutlineMailOutline } from "react-icons/md";
import "@/styles/contact/contact.scss";
import { useTranslations } from "next-intl";

const ContactSidebar = () => {
  const t = useTranslations("contact.sidebar");

  return (
    <div className="flex flex-col gap-8 w-[330px] py-10 px-8 bg-slate-50 border-inline-end-4 shadow-lg sideBar ">
      <div className="flex flex-col gap-6 border-b border-black pb-10 max-w-fit">
        <div className="flex items-center gap-5">
          <div className="bg-red-600 text-white text-1xl rounded-full p-2">
            <IoCallOutline />
          </div>
          <p className="text-base font-medium">{t("call.title")}</p>
        </div>
        <p className="text-sm font-normal">
          {t("call.desc")}
        </p>
        <p className="text-sm font-normal">{t("call.phone")}</p>
      </div>
      <div className="flex flex-col gap-6  pb-10 ">
        <div className="flex items-center gap-5">
          <div className="bg-red-600 text-white text-1xl rounded-full p-2">
            <MdOutlineMailOutline />
          </div>
          <p className="text-base font-medium">{t("write.title")}</p>
        </div>
        <p className="text-sm font-normal">
          {t("write.desc")}
        </p>
        <p className="text-sm font-normal">{t("write.email1")}</p>
        <p className="text-sm font-normal">{t("write.email2")}</p>
      </div>
    </div>
  );
};


export default ContactSidebar;
