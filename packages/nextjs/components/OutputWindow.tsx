import { useState } from "react";
import { Maximize2 } from "lucide-react";
import { Mermaid } from "mdx-mermaid/Mermaid";
import { useAgent } from "~~/providers/AgenticProvider";
import { Button } from "~~/shadcn/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~~/shadcn/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "~~/shadcn/components/ui/dialog";

const OutputWindow = () => {
  const { state } = useAgent();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Card className="flex-1">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle>Output Window</CardTitle>
        {state?.mermaid_diagram && (
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="icon">
                <Maximize2 className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-[90vw] w-full max-h-[90vh] h-full">
              <DialogHeader>
                <DialogTitle>Enlarged Diagram</DialogTitle>
              </DialogHeader>
              <div className="w-full h-full overflow-auto">
                <Mermaid chart={state.mermaid_diagram} />
              </div>
            </DialogContent>
          </Dialog>
        )}
      </CardHeader>
      <CardContent>{state?.mermaid_diagram && <Mermaid chart={state.mermaid_diagram} />}</CardContent>
    </Card>
  );
};

export default OutputWindow;
