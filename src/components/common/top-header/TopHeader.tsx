import React from "react";
import { Link } from "@/i18n/routing";

const TopHeader = () => {
  return (
    <div className="bg-black text-white py-3 px-4 flex flex-col sm:flex-row justify-center items-center gap-2 text-sm text-center">
      <div>
        <p>
          Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!
        </p>
      </div>
      <div>
        <Link href="/" className="font-bold underline hover:text-gray-300 transition-colors">
          shop now
        </Link>
      </div>
    </div>
  );
};

export default TopHeader;
