"use client";

import { useState } from "react";
import { Bot, Paperclip, SendHorizontal } from "lucide-react";
import { Button } from "~~/shadcn/components/ui/button";
import { Card, CardContent } from "~~/shadcn/components/ui/card";
import { Textarea } from "~~/shadcn/components/ui/textarea";

export function ProblemInput() {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      console.log("Submitted:", input);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsLoading(true);
      try {
        // Handle file upload logic here
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate upload
        console.log("File uploaded:", file);
      } finally {
        setIsLoading(false);
      }
    }
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
              disabled={isLoading}
            />
            <Button
              type="submit"
              size="icon"
              className="absolute right-3 top-3 text-purple-600 hover:text-purple-700 bg-transparent hover:bg-transparent"
              disabled={isLoading || !input.trim()}
            >
              <SendHorizontal className="h-5 w-5" />
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <label
              htmlFor="file-upload"
              className={`flex items-center gap-2 text-sm text-purple-600 hover:text-purple-700 cursor-pointer 
              ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              <Paperclip className="h-4 w-4" />
              Upload PRD
            </label>
            <input id="file-upload" type="file" className="hidden" onChange={handleFileUpload} disabled={isLoading} />
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
