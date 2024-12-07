import React from "react";
import { Terminal } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "~~/shadcn/components/ui/card";
import { ScrollArea } from "~~/shadcn/components/ui/scroll-area";

const AgentPlayground = () => {
  return (
    <Card className="flex-1">
      <CardHeader className="flex flex-row items-center space-x-2">
        <Terminal className="h-6 w-6" />
        <CardTitle>Agent Playground</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[calc(50vh-10rem)] rounded-md border bg-muted/30 p-4">
          <div className="space-y-2">
            <div className="text-sm text-muted-foreground">Agent workspace and visualization area</div>
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default AgentPlayground;
