"use client";

import type { NextPage } from "next";
import AgentPlayground from "~~/components/AgentPlayground";
import ChatInterface from "~~/components/ChatInterface";
import OutputWindow from "~~/components/OutputWindow";

const AgentInterface: NextPage = () => {
  return (
    <div className="flex h-screen w-full gap-4 p-4 bg-slate-50">
      <ChatInterface />
      <div className="flex flex-col gap-4 w-4/5">
        <AgentPlayground />
        <OutputWindow />
      </div>
    </div>
  );
};

export default AgentInterface;
