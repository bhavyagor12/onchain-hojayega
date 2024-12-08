"use client";

import React, { useState } from "react";
import { mergeUniqueMessages } from "./ChatInterface";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { FASTAPI_URL } from "~~/constants";
import { useAgent } from "~~/providers/AgenticProvider";

type Option = {
  usecase: string;
  description: string;
  technology_name: string;
  department_it_will_improve: string;
  how_to_integrate: string;
  companies: string[];
};

export function Options({ options }: { options: Option[] }) {
  const { threadId, messages, setMessages, setAlteredMermaid, setOutputToCoder } = useAgent();
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const handleCardClick = (option: Option, index: number) => {
    setSelectedOption(option);
    setSelectedIndex(index);
  };

  const handleCloseModal = () => {
    setSelectedOption(null);
  };

  const handleProceed = async () => {
    if (!selectedOption) return;
    chatWorkflow.mutate(
      {
        message: JSON.stringify({ role: "user", content: selectedIndex?.toString(), type: "text" }),
        workflow: "researcher",
        threadId,
      },
      {
        onSuccess: data => {
          setMessages(mergeUniqueMessages(messages, data.state.messages));
          setAlteredMermaid(data.state.altered_mermaid);
          setOutputToCoder(data.state.output);
          handleCloseModal();
        },
        onError: e => {
          console.error(e);
        },
      },
    );
  };
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
  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-2 gap-4 items-center">
        {options.map((option, index) => (
          <div
            key={index}
            className="card p-2 bg-base-100 shadow-md hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => handleCardClick(option, index)}
          >
            <div className="card-body p-1 gap-0">
              <h2 className="text-xs font-semibold">{option.usecase}</h2>
              <p className="text-xs text-gray-500">{option.technology_name}</p>
            </div>
          </div>
        ))}
      </div>
      {selectedOption && (
        <div className={`modal modal-open`} onClick={handleCloseModal}>
          <div className="modal-box max-w-xs bg-base-200 p-4 rounded-md shadow-lg" onClick={e => e.stopPropagation()}>
            <h3 className="font-bold text-base mb-2">{selectedOption.usecase}</h3>
            <p className="text-sm text-gray-400 mb-4">{selectedOption.description}</p>

            <div className="space-y-2 text-sm">
              <div>
                <h4 className="font-semibold">Technology:</h4>
                <p>{selectedOption.technology_name}</p>
              </div>
              <div>
                <h4 className="font-semibold">Department to Improve:</h4>
                <p>{selectedOption.department_it_will_improve}</p>
              </div>
              <div>
                <h4 className="font-semibold">How to Integrate:</h4>
                <p>{selectedOption.how_to_integrate}</p>
              </div>
              <div>
                <h4 className="font-semibold">Companies Using Similar Approach:</h4>
                <p>{selectedOption.companies.join(", ")}</p>
              </div>
            </div>

            <div className="modal-action mt-4">
              <button className="btn btn-sm btn-outline" onClick={handleCloseModal}>
                Exit
              </button>
              <button
                className="btn btn-sm btn-primary text-white"
                onClick={handleProceed}
                disabled={chatWorkflow.isPending}
              >
                {chatWorkflow.isPending ? <>Loading</> : <>Proceed</>}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
