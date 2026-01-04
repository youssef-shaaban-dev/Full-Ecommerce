import React from "react";
import { IoCallOutline } from "react-icons/io5";
import { MdOutlineMailOutline } from "react-icons/md";
import "@/styles/contact/contact.scss";
const ContactSidebar = () => {
  return (
    <div className="flex flex-col gap-8 w-[330px] py-10 px-8 bg-slate-50 border-r-4 shadow-lg sideBar ">
      <div className="flex flex-col gap-6 border-b border-black pb-10 max-w-fit">
        <div className="flex items-center gap-5">
          <div className="bg-red-600 text-white text-1xl rounded-full p-2">
            <IoCallOutline />
          </div>
          <p className="text-base font-medium">Call To Us</p>
        </div>
        <p className="text-sm font-normal">
          We are available 24/7, 7 days a week.
        </p>
        <p className="text-sm font-normal">Phone: +8801611112222</p>
      </div>
      <div className="flex flex-col gap-6  pb-10 ">
        <div className="flex items-center gap-5">
          <div className="bg-red-600 text-white text-1xl rounded-full p-2">
            <MdOutlineMailOutline />
          </div>
          <p className="text-base font-medium">Write To Us</p>
        </div>
        <p className="text-sm font-normal">
          Fill out our form and we will contact you within 24 hours.
        </p>
        <p className="text-sm font-normal">Emails: customer@exclusive.com</p>
        <p className="text-sm font-normal">Emails: support@exclusive.com</p>
      </div>
    </div>
  );
};

export default ContactSidebar;
