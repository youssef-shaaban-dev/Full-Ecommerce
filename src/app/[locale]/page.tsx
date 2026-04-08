"use client";
import Services from "@/components/pages/Home/Services/Services";
import UpBtn from "@/components/common/UpBtn";
import HomeSwiper from "@/components/pages/Home/homeSlider/HomeSlider";
import FeaturesSection from "@/components/pages/Home/Features/Features";
import FlashSales from "@/components/pages/Home/FlashSales/FlashSales";
import CategorySection from "@/components/pages/Home/category/CategorySection";
import BestSellingSection from "@/components/pages/Home/BestSelling/BestSellingSection";
import MusicSection from "@/components/pages/Home/musicAdvertise/MusicSection";



const HomePage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center h-fit py-12">
        <HomeSwiper />
      </div>

      <FlashSales />

      <CategorySection />

      <BestSellingSection />

      <MusicSection />

      <FeaturesSection />

      <Services />

      <UpBtn />
    </div>
  );
};

export default HomePage;
