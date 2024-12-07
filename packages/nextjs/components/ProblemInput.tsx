"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Bot, Paperclip, SendHorizontal } from "lucide-react";
import { useAgent } from "~~/providers/AgenticProvider";
import { Button } from "~~/shadcn/components/ui/button";
import { Card, CardContent } from "~~/shadcn/components/ui/card";
import { Textarea } from "~~/shadcn/components/ui/textarea";

export function ProblemInput() {
  const { initiateWorkflow } = useAgent();
  const { push } = useRouter();
  const [input, setInput] = useState("");
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    onSendClick();
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate upload
        console.log("File uploaded:", file);
      } finally {
      }
    }
  };

  const onSendClick = async () => {
    await initiateWorkflow.mutateAsync("analyst");
    push("/onboard");
  };

  return (
    <Card className="w-full max-w-3xl mx-auto bg-muted backdrop-blur-sm border-0 shadow-lg">
      <CardContent className="p-4 space-y-2">
        <div className="space-y-4 flex flex-col items-center text-center">
          <Bot className="h-16 w-16 text-primary animate-pulse" />
          <h2 className="text-lg font-semibold">
            Prompt us with your existing application context / problem statement
          </h2>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Textarea
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Type your problem or upload a document or image"
              className="min-h-[120px] pr-12 resize-none bg-white/80 border-none focus:ring-0 on-focus:ring-0"
              disabled={initiateWorkflow.isPending}
            />
            <Button
              type="submit"
              size="icon"
              className="absolute right-3 top-3 text-purple-600 hover:text-purple-700 bg-transparent hover:bg-transparent"
              disabled={initiateWorkflow.isPending}
            >
              <SendHorizontal className="h-5 w-5" />
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <label
              htmlFor="file-upload"
              className={`flex items-center gap-2 text-sm text-purple-600 hover:text-purple-700 cursor-pointer 
              ${initiateWorkflow.isPending ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              <Paperclip className="h-4 w-4" />
              Upload PRD
            </label>
            <input
              id="file-upload"
              type="file"
              className="hidden"
              onChange={handleFileUpload}
              disabled={initiateWorkflow.isPending}
            />
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
