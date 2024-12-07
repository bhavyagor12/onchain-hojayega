"use client";

import { useRef, useState } from "react";
import { SendIcon } from "lucide-react";
import { Avatar, AvatarFallback } from "~~/shadcn/components/ui/avatar";
import { Button } from "~~/shadcn/components/ui/button";
import { Card, CardContent } from "~~/shadcn/components/ui/card";
import { Input } from "~~/shadcn/components/ui/input";
import { ScrollArea } from "~~/shadcn/components/ui/scroll-area";

export default function ChatInterface() {
  const [input, setInput] = useState("");
  const messages: {
    id: number;
    role: "user" | "assistant";
    name: string;
    content: string;
    experimental_attachments?: any[];
  }[] = [
    { id: 1, role: "user", name: "user", content: "Hello!", experimental_attachments: [{ name: "file1.txt" }] },
    {
      id: 2,
      role: "assistant",
      name: "rishie",
      content: "Hi there!",
      experimental_attachments: [{ name: "file2.txt" }],
    },
  ];
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFiles([]); // Clear files after sending
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Reset file input
    }
  };

  return (
    <div className="container mx-auto max-w-4xl">
      <Card className="h-full flex flex-col">
        <ScrollArea className="flex-grow p-4">
          {messages.map(message => (
            <div key={message.id} className={`flex items-start mb-4 ${message.role === "user" ? "justify-end" : ""}`}>
              <div className={`flex gap-2 ${message.role === "user" ? "flex-row-reverse" : "flex-row"} items-start`}>
                <Avatar className="w-8 h-8 mr-2 bg-[#565656] text-white">
                  <AvatarFallback>{message.name.at(0)}</AvatarFallback>
                </Avatar>
                <div
                  className={`rounded-lg min-w-[400px] p-4 ${message.role === "user" ? "bg-blue-100" : "bg-gray-100"}`}
                >
                  <p>{message.content}</p>
                  {message.experimental_attachments?.map((attachment, index) => (
                    <p key={index} className="text-sm text-gray-500">
                      Attachment: {attachment.name}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </ScrollArea>
        <CardContent>
          <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
            <Input
              type="file"
              onChange={handleFileChange}
              ref={fileInputRef}
              className="hidden "
              id="file-upload"
              multiple
            />
            <Button
              type="button"
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              className="shrink-0 p-2"
            >
              Attach Files
            </Button>
            <Input
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-grow p-2"
            />
            <Button className="p-2" type="submit">
              <SendIcon size={24} />
            </Button>
          </form>
          {files.length > 0 && (
            <div className="mt-2">
              <p className="text-sm text-gray-500">Attached files:</p>
              <ul className="list-disc list-inside">
                {files.map((file, index) => (
                  <li key={index} className="text-sm">
                    {file.name}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
