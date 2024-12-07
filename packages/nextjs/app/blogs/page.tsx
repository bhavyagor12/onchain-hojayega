"use client";

import type { NextPage } from "next";
import Hero from "~~/components/Hero";

const Blogs: NextPage = () => {
  return (
    <div className="snap-y snap-mandatory overflow-y-scroll h-screen">
      <section className="snap-start w-full h-screen bg-gradient-to-b from-background to-muted flex flex-col items-center justify-center text-center">
        <Hero />
      </section>
      <section className="snap-start w-full h-screen flex flex-col items-center justify-center px-6 bg-gradient-to-b from-background to-muted">
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-8">Your Onchain Team</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"></div>
      </section>
    </div>
  );
};

export default Blogs;
