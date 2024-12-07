"use client";

import type { NextPage } from "next";
import ChatInterface from "~~/components/ChatInterface";
import { Header } from "~~/components/Header";
import OutputWindow from "~~/components/OutputWindow";

const AgentInterface: NextPage = () => {
  return (
    <div className="flex flex-col bg-white">
      <Header />
      <div className="flex h-[calc(100vh-64px)] w-full gap-4 p-4 bg-slate-50">
        <ChatInterface />
        <div className="flex flex-col gap-4 w-4/5">
          <OutputWindow />
        </div>
      </div>
    </div>
  );
};

export default AgentInterface;
