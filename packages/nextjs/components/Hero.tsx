"use client";

import { useRouter } from "next/navigation";
import { Button } from "~~/shadcn/components/ui/button";

export default function Hero() {
  const { push } = useRouter();
  return (
    <section className="px-6 text-center bg-gradient-to-b from-background to-muted">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
          Bridge Your Web2 Apps to Web3 with <span className="text-primary">AI Agents</span>
        </h1>
        <Button className="text-primary bg-secondary p-4" onClick={() => push("/onboard")}>
          Get Started
        </Button>
      </div>
    </section>
  );
}
