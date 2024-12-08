"use client";

import { useRouter } from "next/navigation";
import { Button } from "~~/shadcn/components/ui/button";

export default function Hero() {
  const { push } = useRouter();
  return (
    <section className="card px-6 text-center bg-gradient-to-b from-background to-muted">
      <div className="container mx-auto max-w-4xl flex flex-col items-center gap-2">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
          Bridge Your Web2 Apps to Web3 with <span className="text-[#662d91]">AI Agents</span>
        </h1>
        <div className="text-sm tracking-tight sm:text-xs md:text-sm text-muted font-regular">
          Enhance your user experience with AI-powered agents that can automate tasks, provide support, and more.
        </div>
        <Button className="text-white bg-[#662d91] p-4 mt-20" onClick={() => push("/onboard")}>
          Get Started
        </Button>
      </div>
    </section>
  );
}
