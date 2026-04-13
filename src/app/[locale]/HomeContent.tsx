"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ServicesSection, ResultsSection, ApproachSection, WhoSection, VisionSection, AssessmentCTA } from "@/components/home";
import HeroSection from "@/components/home/HeroSection";
import ProofBar from "@/components/home/ProofBar";
import ToolBar from "@/components/ToolBar";
import FAQ from "@/components/FAQ";

export default function HomeContent() {
  return (
    <>
      <Header />

      <main className="flex-1">
        <HeroSection />
        <ProofBar />

        <ServicesSection />
        <ResultsSection />
        <ApproachSection />
        <ToolBar />
        <WhoSection />
        <VisionSection />
        <FAQ />
        <AssessmentCTA />
      </main>

      <Footer />
    </>
  );
}
