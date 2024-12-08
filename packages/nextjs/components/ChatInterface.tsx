"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Options } from "./Options";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Bot, GlobeIcon, LoaderIcon, Paperclip, SendHorizonalIcon, User } from "lucide-react";
import ReactLoading from "react-loading";
import { FASTAPI_URL } from "~~/constants";
import { useAgent } from "~~/providers/AgenticProvider";
import { Avatar, AvatarFallback } from "~~/shadcn/components/ui/avatar";
import { Button } from "~~/shadcn/components/ui/button";
import { Card, CardContent } from "~~/shadcn/components/ui/card";
import { Input } from "~~/shadcn/components/ui/input";
import { ScrollArea } from "~~/shadcn/components/ui/scroll-area";

export const mergeUniqueMessages = (existingMessages: any[], newMessages: any[]) => {
  const serializeWithoutId = (msg: any) => {
    const { id, ...rest } = msg; // Exclude the `id` property
    return JSON.stringify(rest);
  };

  const messageSet = new Set(existingMessages.map(serializeWithoutId));
  newMessages.forEach(msg => messageSet.add(serializeWithoutId(msg)));

  return Array.from(messageSet).map(serialized => {
    const parsed = JSON.parse(serialized);
    const match = [...existingMessages, ...newMessages].find(msg => serializeWithoutId(msg) === serialized);
    return { ...parsed, id: match?.id }; // Optionally restore the `id`
  });
};

const MessageRenderer = ({ message }: { message: any }) => {
  const { messages, setMessages, threadId, setThreadId, state, setOptions, options, outputToCoder, setPlan } =
    useAgent();
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
          <div className="flex items-center gap-2">
            <GlobeIcon className="h-4 w-4" />
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
      case "moveToCoder":
        return (
          <div className="flex flex-col gap-2">
            <p className="text-foreground">{message.content}</p>
          </div>
        );
      case "options":
        return (
          <div className="flex flex-col gap-2">
            <p className="text-foreground">{message.content}</p>
          </div>
        );
      case "loading":
        return <ReactLoading type={"bars"} height={"100%"} width={"100%"} />;
      default:
        return null;
    }
  };

  const getMessageBackground = (type: string) => {
    switch (type) {
      case "text":
        return "bg-primary/10 dark:bg-primary/20";
      case "tool":
        return "bg-primary/50 text-white";
      case "button":
        return "bg-green-100 dark:bg-green-900";
      default:
        return "bg-primary/10 dark:bg-primary/20";
    }
  };

  const getAvatarContent = (role: string, name: string) => {
    if (role === "user") {
      return <User className="h-5 w-5 text-white" />;
    } else {
      if (name === "Logan") {
        return <Image src="/logan.png" alt="logan" width={200} height={200} className="rounded-[50%]" />;
      }
      if (name === "Rhea") {
        return <Image src="/rhea.png" alt="ava" width={200} height={200} className="rounded-[50%]" />;
      }
      if (name === "Kanye") {
        return <Image src="/kanye.png" alt="ava" width={200} height={200} className="rounded-[50%]" />;
      }
    }
  };
  if (message.type === "default") {
    return null;
  }
  return (
    <div key={message.id} className={`flex flex-col mb-6 ${message.role === "user" ? "items-end" : "items-start"}`}>
      <div className={`flex gap-3 items-center max-w-[80%] ${message.role === "user" ? "flex-row-reverse" : ""}`}>
        <Avatar className="w-8 h-8">
          <AvatarFallback className="bg-primary text-primary-foreground">
            {getAvatarContent(message.role, message.name)}
          </AvatarFallback>
        </Avatar>
        <div className={`rounded-3xl px-2 min-w-[40px] ${getMessageBackground(message.type)}`}>
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
        <div className="flex flex-row-reverse items-end gap-2 mt-2 ml-12">
          <Button
            variant="default"
            className="w-[100px] bg-success text-white p-2"
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
            className="w-[100px] bg-error text-white p-2"
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
        <div className="flex flex-row-reverse gap-2 p-4 ml-8">
          <Button
            variant="default"
            className="w-[100px] bg-success text-white p-2"
            onClick={() => {
              chatWorkflow.mutate(
                {
                  message: JSON.stringify({
                    role: "user",
                    content: "Yes",
                    type: "text",
                    additional_kwargs: {},
                    response_metadata: {},
                    name: null,
                    file: "",
                  }),
                  workflow: "researcher",
                  threadId,
                },
                {
                  onSuccess: data => {
                    initiateWorkflow.mutate("coder", {
                      onSuccess: data => {
                        chatWorkflow.mutate(
                          {
                            message: JSON.stringify({
                              role: "user",
                              content: JSON.stringify(outputToCoder),
                              type: "default",
                            }),
                            workflow: "coder",
                            threadId: data.threadId,
                          },
                          {
                            onSuccess: data => {
                              console.log(data, "plan");
                              setMessages(mergeUniqueMessages(messages, data.state.messages));
                              setPlan(data.state.plan);
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
            className="w-[100px] bg-error text-white p-2"
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
      {message.type === "options" && (
        <div className="flex ml-8 mt-2 p-2">
          <Options options={options} />
        </div>
      )}
    </div>
  );
};

export default function ChatInterface() {
  const {
    messages,
    setMessages,
    threadId,
    setThreadId,
    setState,
    plan,
    codeSolidity,
    setCodeSolidity,
    setPlan,
    setAlteredMermaid,
    setToken,
  } = useAgent();
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
    if (codeSolidity) {
      if (input === "continue") {
        chatWorkflow.mutate(
          {
            message: JSON.stringify({ role: "user", content: input, type: "text" }),
            workflow: "coder",
            threadId,
          },
          {
            onSuccess: data => {
              setMessages(mergeUniqueMessages(messages, data.state.messages));
              setToken({
                name: data.state.token_name,
                abbreviation: data.state.token_abbreviation,
                contract: data.state.contract_address,
              });
            },
          },
        );
        return;
      }
    }
    if (plan && plan?.goal !== "") {
      if (input === "continue") {
        chatWorkflow.mutate(
          {
            message: JSON.stringify({ role: "user", content: input, type: "text" }),
            workflow: "coder",
            threadId,
          },
          {
            onSuccess: data => {
              setMessages(mergeUniqueMessages(messages, data.state.messages));
              setCodeSolidity(data.state.generated_code);
            },
          },
        );
      } else {
        setMessages(
          mergeUniqueMessages(messages, [
            {
              content: input,
              additional_kwargs: {},
              response_metadata: {},
              type: "text",
              name: null,
              role: "user",
              file: "",
            },
          ]),
        );
        chatWorkflow.mutate(
          {
            message: JSON.stringify({
              content: input,
              additional_kwargs: {},
              response_metadata: {},
              type: "text",
              name: null,
              role: "user",
              file: "",
            }),
            workflow: "coder",
            threadId,
          },
          {
            onSuccess: data => {
              setMessages(mergeUniqueMessages(messages, data.state.messages));
              setPlan(data.state.plan);
            },
          },
        );
      }
      return;
    }
    setMessages(
      mergeUniqueMessages(messages, [
        {
          content: input,
          additional_kwargs: {},
          response_metadata: {},
          type: "text",
          name: null,
          role: "user",
          file: "",
        },
      ]),
    );
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
    setPlan(undefined);
    setCodeSolidity(undefined);
    setState(undefined);
    setAlteredMermaid(undefined);
  };

  useEffect(() => {
    handleFirstLoad();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const isPending = chatWorkflow.isPending || initiateWorkflow.isPending;
  return (
    <div
      className="container mx-auto max-w-4xl"
      style={{
        backgroundImage: `url('/chatBg.svg')`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Card className="h-full flex flex-col">
        <ScrollArea className="h-[90vh] p-4 overflow-scroll">
          {messages.map((message, index) => (
            <MessageRenderer key={index} message={message} />
          ))}
          {isPending && (
            <MessageRenderer key="loading" message={{ type: "loading", content: "Loading...", role: "bot" }} />
          )}
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
              disabled={chatWorkflow.isPending}
              onChange={e => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-grow p-2"
            />
            <Button className="p-2 text-white" type="submit" disabled={chatWorkflow.isPending}>
              {chatWorkflow.isPending ? <LoaderIcon size={24} /> : <SendHorizonalIcon size={24} />}
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
