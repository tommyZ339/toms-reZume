import LandingHeader from "@/components/home/LandingHeader";
import HeroSection from "@/components/home/HeroSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import CTASection from "@/components/home/CTASection";
import Footer from "@/components/home/Footer";
import NewsAlert from "@/components/home/NewsAlert";
import FAQSection from "@/components/home/FAQSection";
import IntroductionSection from "@/components/home/IntroductionSection";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#f8f9fb] to-red dark:from-gray-900 dark:to-gray-800">
      <LandingHeader />
      <div className="absolute top-24 left-1/2 -translate-x-1/2 z-10">
        <NewsAlert />
      </div>
      <IntroductionSection />
      <HeroSection />
      <FeaturesSection />
      <FAQSection />
      <CTASection />
      <Footer />
    </div>
  );
}
