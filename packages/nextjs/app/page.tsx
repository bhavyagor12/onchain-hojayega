"use client";

import type { NextPage } from "next";
import AgentCard from "~~/components/Agent";
import Hero from "~~/components/Hero";

const agents = [
  {
    name: "Logan",
    role: "System Architect",
    image: "/logan.png",
    prompt:
      "I am a experienced system architect that has designed many systems. I am Logan, focusing on helping you with your system architecture needs.",
    skills: [
      { name: "Frontend", color: "blue" },
      { name: "Backend", color: "purple" },
      { name: "Database", color: "pink" },
      { name: "DevOps", color: "green" },
    ],
  },
  {
    name: "Rhea",
    role: "Research Analyst",
    image: "/rhea.png",
    prompt:
      "I am as nerdy as it gets, I can research anything and everything. I am Rhea, focusing on helping you with your research needs.",
    skills: [
      { name: "NFTs", color: "blue" },
      { name: "Tokenization", color: "purple" },
      { name: "UI/UX", color: "pink" },
      { name: "Marketing", color: "green" },
    ],
  },
  {
    name: "Kanye",
    role: "Smart Contract Developer",
    image: "/kanye.png",
    prompt:
      "I am a cracked smart contract developer that can work 24/7. Yo call me Kanye, Ill focusing on helping you with your smart contract needs.",
    skills: [
      { name: "Tokenization", color: "blue" },
      { name: "NFTs", color: "purple" },
      { name: "Bridges", color: "pink" },
      { name: "DeFi", color: "green" },
    ],
  },
];

const Home: NextPage = () => {
  return (
    <div className="snap-y snap-mandatory overflow-y-scroll h-screen">
      <section className="snap-start w-full h-screen bg-gradient-to-b from-background to-muted flex flex-col items-center justify-center text-center">
        <Hero />
      </section>
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
