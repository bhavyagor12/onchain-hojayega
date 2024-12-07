import { PropsWithChildren, createContext, useContext } from "react";

interface IAgentContext {}

const AgentContext = createContext<IAgentContext | null>(null);

const useAgentContext = () => {
  return {};
};

export function ProvideAgent({ children }: PropsWithChildren<any>) {
  const value = useAgentContext();
  // @ts-ignore
  return <AgentContext.Provider value={value}> {children}</AgentContext.Provider>;
}

export const useAgent = () => {
  const context = useContext(AgentContext);
  if (context == null) {
    throw "Ensure that the component is wrapped inside ProductJourneyProvider";
  }
  return context;
};
