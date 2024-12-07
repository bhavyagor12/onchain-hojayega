import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "~~/shadcn/components/ui/card";
import { ScrollArea } from "~~/shadcn/components/ui/scroll-area";

const OutputWindow = () => {
  return (
    <Card className="flex-1">
      <CardHeader>
        <CardTitle>Output Window</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[calc(50vh-8rem)] rounded-md border bg-black p-4">
          <div className="space-y-2"></div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default OutputWindow;
