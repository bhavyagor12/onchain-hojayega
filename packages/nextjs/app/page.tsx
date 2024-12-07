"use client";

import type { NextPage } from "next";
import ExcalidrawWrapper from "~~/components/ExcaliDraw";
import Hero from "~~/components/Hero";
import { ProblemInput } from "~~/components/ProblemInput";

const Home: NextPage = () => {
  return (
    <div className="flex flex-col gap-6 items-center justify-center h-screen bg-cover bg-center bg-no-repeat">
      <Hero />
      <ProblemInput />
      <ExcalidrawWrapper />
    </div>
  );
};

export default Home;
