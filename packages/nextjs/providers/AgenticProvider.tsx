"use client";

import { PropsWithChildren, createContext, useContext, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { IPlanOutput } from "~~/components/PlanShowcase";
import { FASTAPI_URL } from "~~/constants";

interface IAgentContext {
  state: any;
  setState: (state: any) => void;
  threadId: string;
  setThreadId: (threadId: string) => void;
  messages: any[];
  setMessages: (messages: any[]) => void;
  initiateWorkflow: any;
  options: any;
  setOptions: (options: any) => void;
  alteredMermaid: any;
  setAlteredMermaid: (alteredMermaid: any) => void;
  outputToCoder: any;
  setOutputToCoder: (outputToCoder: any) => void;
  plan: IPlanOutput;
  setPlan: (plan: IPlanOutput | undefined) => void;
  codeSolidity: any;
  setCodeSolidity: (codeSolidity: any) => void;
  token: any;
  setToken: (token: any) => void;
}

const AgentContext = createContext<IAgentContext | null>(null);
const useAgentContext = () => {
  const [threadId, setThreadId] = useState("");
  const [messages, setMessages] = useState<any[]>([]);
  const [state, setState] = useState<any>({});
  const [options, setOptions] = useState<any>();
  const [alteredMermaid, setAlteredMermaid] = useState<any>();
  const [outputToCoder, setOutputToCoder] = useState<any>();
  const [plan, setPlan] = useState<IPlanOutput>();
  const [codeSolidity, setCodeSolidity] = useState<any>();
  const [token, setToken] = useState<any>();
  const initiateWorkflow = useMutation({
    mutationFn: async (workflowName: string) => {
      const response = await axios.post(`${FASTAPI_URL}/workflow/${workflowName}`);
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
    state,
    setState,
    threadId,
    setThreadId,
    messages,
    setMessages,
    initiateWorkflow,
    options,
    setOptions,
    alteredMermaid,
    setAlteredMermaid,
    outputToCoder,
    setOutputToCoder,
    plan,
    setPlan,
    codeSolidity,
    setCodeSolidity,
    token,
    setToken,
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
