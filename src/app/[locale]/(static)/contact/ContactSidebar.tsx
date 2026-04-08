import React from "react";
import { IoCallOutline } from "react-icons/io5";
import { MdOutlineMailOutline } from "react-icons/md";
import { useTranslations } from "next-intl";

const ContactSidebar = () => {
  const t = useTranslations("contact.sidebar");

  return (
    <div className="flex flex-col gap-8 w-full lg:w-[330px] py-10 px-8 bg-slate-50 shadow-lg rounded-sm">
      <div className="flex flex-col gap-6 border-b border-gray-300 pb-10">
        <div className="flex items-center gap-5">
          <div className="bg-primary-red text-white text-xl rounded-full p-2 w-10 h-10 flex items-center justify-center">
            <IoCallOutline />
          </div>
          <p className="text-base font-medium">{t("call.title")}</p>
        </div>
        <p className="text-sm font-normal leading-6">
          {t("call.desc")}
        </p>
        <p className="text-sm font-normal">{t("call.phone")}</p>
      </div>
      <div className="flex flex-col gap-6 pb-10">
        <div className="flex items-center gap-5">
          <div className="bg-primary-red text-white text-xl rounded-full p-2 w-10 h-10 flex items-center justify-center">
            <MdOutlineMailOutline />
          </div>
          <p className="text-base font-medium">{t("write.title")}</p>
        </div>
        <p className="text-sm font-normal leading-6">
          {t("write.desc")}
        </p>
        <p className="text-sm font-normal">{t("write.email1")}</p>
        <p className="text-sm font-normal">{t("write.email2")}</p>
      </div>
    </div>
  );
};

export default ContactSidebar;
