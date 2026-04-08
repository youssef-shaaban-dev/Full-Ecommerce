"use client";
import { FaArrowUpLong } from "react-icons/fa6";

const UpBtn = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Smooth scrolling
    });
  };
  return (
    <div
      onClick={scrollToTop}
      className="fixed bottom-10 end-10 w-11 h-11 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-800 hover:bg-gray-800 hover:text-white transition-all duration-300 cursor-pointer z-50"
    >
      <FaArrowUpLong />
    </div>
  );
};

export default UpBtn;
