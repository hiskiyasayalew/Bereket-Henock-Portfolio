"use client";

import React, { useState } from "react";
import Preloader from "./components/Preloader";
import Hero from "./components/Hero";
import Footer from "./components/Footer";

export default function Home() {
  const [loadingFinished, setLoadingFinished] = useState(false);

  return (
    <>
    <main className="relative min-h-screen bg-[#030306]">
      {/* 1. Preloader stays for 3s then fades away */}
      {!loadingFinished && (
        <Preloader onLoaded={() => setLoadingFinished(true)} />
      )}

      {/* 2. Hero page renders behind and is revealed */}
      <Hero
        portraitSrc="/BereketDesktop (1).webp" // Put your cutout PNG in public/portrait.png
        name="Bereket Henock"
        tagline="Creative Developer & Visual Designer"
      />
    </main>
    <Footer/>
    </>
  );
}