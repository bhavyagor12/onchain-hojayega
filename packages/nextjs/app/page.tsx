"use client";

import type { NextPage } from "next";
import AgentCard from "~~/components/Agent";
import Hero from "~~/components/Hero";
import { ProblemInput } from "~~/components/ProblemInput";

const agents = [
  {
    name: "Sofia",
    role: "Research Analyst",
    image: "/sofia.png",
    prompt: "I am Sofia, focusing on helping you with your research needs.",
    skills: [
      { name: "NFTs", color: "blue" },
      { name: "Tokenization", color: "purple" },
      { name: "UI/UX", color: "pink" },
      { name: "Marketing", color: "green" },
    ],
  },
  {
    name: "Logan",
    role: "System Architect",
    image: "/logan.png",
    prompt: "I am Logan, focusing on helping you with your system architecture needs.",
    skills: [
      { name: "Frontend", color: "blue" },
      { name: "Backend", color: "purple" },
      { name: "Database", color: "pink" },
      { name: "DevOps", color: "green" },
    ],
  },
  {
    name: "Rhea",
    role: "Smart Contract Developer",
    image: "/rhea.png",
    prompt: "I am Rhea, focusing on helping you with your smart contract needs.",
    skills: [
      { name: "Solidity", color: "blue" },
      { name: "Web3", color: "purple" },
      { name: "Ethereum", color: "pink" },
      { name: "DeFi", color: "green" },
    ],
  },
];

const Home: NextPage = () => {
  return (
    <div className="snap-y snap-mandatory overflow-y-scroll h-screen">
      {/* Hero Section */}
      <section className="snap-start w-full h-screen bg-blue-50 flex flex-col items-center justify-center text-center">
        <Hero />
        <div className="mt-6">
          <ProblemInput />
        </div>
      </section>

      {/* Meet Your Heroes Section */}
      <section className="snap-start w-full h-screen flex flex-col items-center justify-center px-6 bg-gradient-to-b from-background to-muted">
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-8">Your Onchain Team</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {agents.map(agent => (
            <AgentCard key={agent.name} {...agent} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
