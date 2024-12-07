"use client";

import * as React from "react";
import { Paperclip, Send } from "lucide-react";
import { Button } from "~~/shadcn/components/ui/button";
import { Textarea } from "~~/shadcn/components/ui/textarea";
import { cn } from "~~/shadcn/lib/utils";

interface ChatInputProps extends React.ComponentPropsWithoutRef<"div"> {
  placeholder?: string;
  onSubmit?: (value: string, files?: FileList | null) => void;
  disabled?: boolean;
}

export function ChatInput({
  placeholder = "Message ChatGPT",
  onSubmit,
  disabled = false,
  className,
  ...props
}: ChatInputProps) {
  const [value, setValue] = React.useState("");
  const [files, setFiles] = React.useState<FileList | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if ((value.trim() || files) && onSubmit) {
      onSubmit(value, files);
      setValue("");
      setFiles(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className={cn("relative flex w-full max-w-[600px] flex-col items-end", className)} {...props}>
      <form onSubmit={handleSubmit} className="relative flex w-full items-end">
        <Textarea
          value={value}
          onChange={e => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="min-h-[60px] p-2 resize-none"
          disabled={disabled}
        />
        <div className="absolute right-2 bottom-2 flex">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full"
            onClick={() => fileInputRef.current?.click()}
            disabled={disabled}
          >
            <Paperclip className="h-4 w-4" />
            <span className="sr-only">Attach file</span>
          </Button>
          <input type="file" ref={fileInputRef} className="hidden" onChange={e => setFiles(e.target.files)} multiple />
          <Button
            type="submit"
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full"
            disabled={disabled || (!value.trim() && !files)}
          >
            <Send className="h-4 w-4" />
            <span className="sr-only">Send message</span>
          </Button>
        </div>
      </form>
      {files && files.length > 0 && (
        <div className="mt-2 text-sm text-muted-foreground">
          {Array.from(files).map((file, index) => (
            <div key={index}>{file.name}</div>
          ))}
        </div>
      )}
    </div>
  );
}
