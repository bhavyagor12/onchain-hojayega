"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Options } from "./Options";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Bot, Paperclip, PenTool, SendHorizonalIcon } from "lucide-react";
import { FASTAPI_URL } from "~~/constants";
import { useAgent } from "~~/providers/AgenticProvider";
import { Avatar, AvatarFallback } from "~~/shadcn/components/ui/avatar";
import { Button } from "~~/shadcn/components/ui/button";
import { Card, CardContent } from "~~/shadcn/components/ui/card";
import { Input } from "~~/shadcn/components/ui/input";
import { ScrollArea } from "~~/shadcn/components/ui/scroll-area";

const mergeUniqueMessages = (existingMessages: any[], newMessages: any[]) => {
  const messageSet = new Set(existingMessages.map(msg => JSON.stringify(msg))); // Serialize for comparison
  newMessages.forEach(msg => messageSet.add(JSON.stringify(msg)));
  return Array.from(messageSet).map(msg => JSON.parse(msg)); // Deserialize back
};
const MessageRenderer = ({ message }: { message: any }) => {
  const { messages, setMessages, threadId, setThreadId, state, setOptions, options } = useAgent();
  const initiateWorkflow = useMutation({
    mutationFn: async (workflowName: string) => {
      const response = await axios.post(`${FASTAPI_URL}/workflow/${workflowName}`);
      return response.data;
    },
    onSuccess: data => {
      if (!data) return;
      setThreadId(data.threadId);
      setMessages(mergeUniqueMessages(messages, data.state.messages));
    },
    onError: e => {
      console.error(e);
    },
  });
  const chatWorkflow = useMutation({
    mutationFn: async ({
      message,
      file,
      workflow,
      threadId,
    }: {
      message: any;
      file?: File;
      workflow: string;
      threadId: string;
    }) => {
      const formData = new FormData();
      formData.append("message", JSON.stringify(message));
      if (file) formData.append("file", file);
      const response = await axios.post(`${FASTAPI_URL}/workflow/${workflow}/${threadId}`, formData);
      return response.data;
    },
  });
  const messageTypeRenderer = (message: any) => {
    switch (message.type) {
      case "text":
        return <p className="text-foreground">{message.content}</p>;
      case "tool":
        return (
          <div className="flex items-center gap-2 text-yellow-600 dark:text-yellow-400">
            <PenTool className="h-4 w-4" />
            <p>{message.content}</p>
          </div>
        );
      case "button":
        return (
          <div className="flex flex-col gap-2">
            <p className="text-foreground">{message.content}</p>
          </div>
        );
      case "moveToResearcher":
        return (
          <div className="flex flex-col gap-2">
            <p className="text-foreground">{message.content}</p>
          </div>
        );
      default:
        return null;
    }
  };

  const getMessageBackground = (type: string) => {
    switch (type) {
      case "text":
        return "bg-primary/10 dark:bg-primary/20";
      case "tool":
        return "bg-yellow-100 dark:bg-yellow-900";
      case "button":
        return "bg-green-100 dark:bg-green-900";
      default:
        return "bg-primary/10 dark:bg-primary/20";
    }
  };

  const getAvatarContent = (role: string) => {
    if (role === "user") {
      return <Image src="/logan.png" alt="User" width={32} height={32} className="rounded-full" />;
    } else {
      return <Bot className="h-5 w-5" />;
    }
  };
  if (message.type === "default") {
    return null;
  }
  return (
    <div key={message.id} className={`flex flex-col mb-6 ${message.role === "user" ? "items-end" : "items-start"}`}>
      <div className={`flex gap-3 items-start max-w-[80%]`}>
        <Avatar className="w-8 h-8">
          <AvatarFallback className="bg-primary text-primary-foreground">
            {getAvatarContent(message.role)}
          </AvatarFallback>
        </Avatar>
        <div className={`rounded-lg p-4 ${getMessageBackground(message.type)}`}>
          {messageTypeRenderer(message)}
          {message.experimental_attachments?.map((attachment: any, index: number) => (
            <div key={index} className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
              <Paperclip className="h-4 w-4" />
              <p>{attachment.name}</p>
            </div>
          ))}
        </div>
      </div>
      {message.type === "moveToResearcher" && (
        <div className="flex gap-2 mt-2">
          <Button
            variant="default"
            className="w-[100px]"
            onClick={() => {
              chatWorkflow.mutate(
                {
                  message: JSON.stringify({ role: "user", content: "Yes", type: "text" }),
                  workflow: "analyst",
                  threadId,
                },
                {
                  onSuccess: data => {
                    setMessages(mergeUniqueMessages(messages, data.state.messages));
                    initiateWorkflow.mutate("researcher", {
                      onSuccess: data => {
                        chatWorkflow.mutate(
                          {
                            message: JSON.stringify({ role: "user", content: state?.mermaid_diagram, type: "default" }),
                            workflow: "researcher",
                            threadId: data.threadId,
                          },
                          {
                            onSuccess: data => {
                              setMessages(mergeUniqueMessages(messages, data.state.messages));
                              setOptions(data.state.options);
                            },
                          },
                        );
                      },
                      onError: error => {
                        console.error("Mutation failed:", error);
                      },
                    });
                  },
                  onError: error => {
                    console.error("Mutation failed:", error);
                  },
                },
              );
            }}
          >
            Yes
          </Button>
          <Button
            variant="destructive"
            className="w-[100px]"
            onClick={() => {
              chatWorkflow.mutate(
                {
                  message: JSON.stringify({ role: "user", content: "No", type: "text" }),
                  workflow: "analyst",
                  threadId,
                },
                {
                  onSuccess: data => {
                    setMessages(mergeUniqueMessages(messages, data.state.messages));
                  },
                },
              );
            }}
          >
            No
          </Button>
        </div>
      )}
      {message.type === "moveToCoder" && (
        <div className="flex gap-2 mt-2">
          <Button
            variant="default"
            className="w-[100px]"
            onClick={() => {
              chatWorkflow.mutate(
                {
                  message: JSON.stringify({ role: "user", content: "Yes", type: "text" }),
                  workflow: "researcher",
                  threadId,
                },
                {
                  onSuccess: data => {
                    console.log(data);
                    initiateWorkflow.mutate("researcher", {
                      onSuccess: data => {
                        chatWorkflow.mutate({
                          message: JSON.stringify({ role: "user", content: state?.mermaid_diagram, type: "text" }),
                          workflow: "coder",
                          threadId: data.threadId,
                        });
                      },
                      onError: error => {
                        console.error("Mutation failed:", error);
                      },
                    });
                  },
                  onError: error => {
                    console.error("Mutation failed:", error);
                  },
                },
              );
            }}
          >
            Yes
          </Button>
          <Button
            variant="destructive"
            className="w-[100px]"
            onClick={() => {
              chatWorkflow.mutate({
                message: JSON.stringify({ role: "user", content: "No", type: "text" }),
                workflow: "researcher",
                threadId,
              });
            }}
          >
            No
          </Button>
        </div>
      )}
      {options && (
        <div className="flex flex-col gap-2 mt-2">
          <Options options={options} />
        </div>
      )}
    </div>
  );
};

export default function ChatInterface() {
  const { messages, setMessages, threadId, setThreadId, setState } = useAgent();
  const [input, setInput] = useState("");

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
    chatWorkflow.mutate({
      message: JSON.stringify({ role: "user", content: input, type: "text" }),
      file: files[0],
      workflow: "analyst",
      threadId,
    });
  };

  const initiateWorkflow = useMutation({
    mutationFn: async (workflowName: string) => {
      const response = await axios.post(`${FASTAPI_URL}/workflow/${workflowName}`);
      return response.data;
    },
  });
  const chatWorkflow = useMutation({
    mutationFn: async ({
      message,
      file,
      workflow,
      threadId,
    }: {
      message: any;
      file?: File;
      workflow: string;
      threadId: string;
    }) => {
      const formData = new FormData();
      formData.append("message", JSON.stringify(message));
      if (file) formData.append("file", file);
      const response = await axios.post(`${FASTAPI_URL}/workflow/${workflow}/${threadId}`, formData);
      return response.data;
    },
    onSuccess: data => {
      if (!data) return;
      console.log(data);
      setState(data.state);
      if (data.state.messages && data.state.messages.length > 0) {
        setMessages(mergeUniqueMessages(messages, data.state.messages));
      }
    },
    onError: e => {
      console.error(e);
    },
  });

  const handleFirstLoad = async () => {
    const data = await initiateWorkflow.mutateAsync("analyst");
    if (!data) return;
    setThreadId(data.threadId);
    setMessages([...data.state.messages]);
  };

  useEffect(() => {
    handleFirstLoad();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container mx-auto max-w-4xl">
      <Card className="h-full flex flex-col">
        <ScrollArea className="h-[90vh] p-4 overflow-scroll">
          {messages.map((message, index) => (
            <MessageRenderer key={index} message={message} />
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
              <SendHorizonalIcon size={24} />
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
