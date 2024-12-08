"use client";

import { json } from "./constants";
import { useQuery } from "@tanstack/react-query";
import BlockchainInnovations from "~~/components/BlockchainInnovations";
import { ScrollArea } from "~~/shadcn/components/ui/scroll-area";

interface BlogPost {
  title: string;
  description: string;
  options: {
    usecase: string;
    description: string;
    technology_name: string;
    department_it_will_improve: string;
    how_to_integrate: string;
    companies: string[];
  }[];
  mermaid: string;
}

export default function BlogsPage() {
  const blogsQuery = useQuery<BlogPost[]>({
    queryKey: ["blogs"],
    queryFn: async () => {
      const response = await fetch(
        "https://aggregator.walrus-testnet.walrus.space/v1/j2m302GRHedLfGd6e5EOJYmMzsETRUC71tx8dQ9G5EQ",
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const responseBody = await response.text();
      const decoded = decodeURIComponent(responseBody);
      const cleanedString = decoded.replace(/\\n/g, "").replace(/\\t/g, "").replace(/\\\"/g, '"').replace(/=/g, "");
      const json = JSON.parse(JSON.stringify(cleanedString));
      return json;
    },
  });

  return (
    <ScrollArea className="h-screen">
      <BlockchainInnovations json={json} />
    </ScrollArea>
  );
}
