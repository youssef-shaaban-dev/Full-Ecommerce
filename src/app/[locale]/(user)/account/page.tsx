"use client";
import PathLinks from "@/components/common/PathLinks";
import SideBarUl from "./SideBarUl";
import AccountBody from "./AccountBody";

interface MenuItem {
  title: string;
  lis?: string[];
}

const uls: MenuItem[] = [
  {
    title: "Manage My Account",
    lis: ["My Profile", "Addresses", "reviews"],
  },
  {
    title: "My Orders",
    lis: ["orders"],
  },
  {
    title: "My WishList",
  },
];
const AccountPage = () => {
  return (
    <div className="my-28 mx-auto w-[90%]">
      <div className=" flex justify-between ">
        <PathLinks titles={["My Account"]} />
        <h5 className="text-xs font-extralight">
          Welcome! <span className="text-red-600">Joo</span>
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
