"use client";

import React, { useState } from "react";
import { Button } from "~~/shadcn/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "~~/shadcn/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~~/shadcn/components/ui/dialog";

type Option = {
  usecase: string;
  description: string;
  technology_name: string;
  department_it_will_improve: string;
  how_to_integrate: string;
  companies: string[];
};

export function Options({ options }: { options: Option[] }) {
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);

  const handleCardClick = (option: Option) => {
    setSelectedOption(option);
  };

  const handleCloseModal = () => {
    setSelectedOption(null);
  };

  const handleProceed = () => {
    console.log("Proceeding with:", selectedOption?.usecase);
    handleCloseModal();
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Ride Share Innovation Options</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {options.map((option, index) => (
          <Card
            key={index}
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => handleCardClick(option)}
          >
            <CardHeader>
              <CardTitle>{option.usecase}</CardTitle>
              <CardDescription>{option.technology_name}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>

      <Dialog open={!!selectedOption} onOpenChange={handleCloseModal}>
        {selectedOption && (
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{selectedOption.usecase}</DialogTitle>
              <DialogDescription>{selectedOption.description}</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div>
                <h4 className="font-medium mb-2">Technology:</h4>
                <p>{selectedOption.technology_name}</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Department to Improve:</h4>
                <p>{selectedOption.department_it_will_improve}</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">How to Integrate:</h4>
                <p>{selectedOption.how_to_integrate}</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Companies Using Similar Approach:</h4>
                <p>{selectedOption.companies.join(", ")}</p>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={handleCloseModal}>
                Exit
              </Button>
              <Button onClick={handleProceed}>Proceed</Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}
