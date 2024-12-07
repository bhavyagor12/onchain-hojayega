"use client";

import { PropsWithChildren, createContext, useContext, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { FASTAPI_URL } from "~~/constants";

interface IAgentContext {
  threadId: string;
  setThreadId: (threadId: string) => void;
  messages: any[];
  setMessages: (messages: any[]) => void;
  initiateWorkflow: any;
}

const AgentContext = createContext<IAgentContext | null>(null);

const useAgentContext = () => {
  const [threadId, setThreadId] = useState("");
  const [messages, setMessages] = useState<any[]>([]);

  const initiateWorkflow = useMutation({
    mutationFn: async (workflowName: string) => {
      const response = await axios.post(`${FASTAPI_URL}/${workflowName}`);
      return response.data;
    },
    onSuccess: data => {
      if (!data) return;
      setThreadId(data.threadId);
      setMessages([...messages, data.state.messages]);
    },
    onError: e => {
      console.error(e);
    },
  });

  return {
    threadId,
    setThreadId,
    messages,
    setMessages,
    initiateWorkflow,
  };
};

export function ProvideAgent({ children }: PropsWithChildren<any>) {
  const value = useAgentContext();
  // @ts-ignore
  return <AgentContext.Provider value={value}> {children}</AgentContext.Provider>;
}

export const useAgent = () => {
  const context = useContext(AgentContext);
  if (context == null) {
    throw "Ensure that the component is wrapped inside a <ProvideAgent> component";
  }
  return context;
};