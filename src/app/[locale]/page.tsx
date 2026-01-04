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
    // Swiper component for the home page
    <div className="w-full container mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16">
      <div className="home-section">
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
