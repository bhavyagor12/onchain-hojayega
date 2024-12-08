"use client";

import { useState } from "react";
import { Mermaid } from "mdx-mermaid/Mermaid";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "~~/shadcn/components/ui/accordion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~~/shadcn/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~~/shadcn/components/ui/tabs";

interface Option {
  usecase: string;
  description: string;
  technology_name: string;
  department_it_will_improve: string;
  how_to_integrate: string;
  companies: string[];
  blobId?: string;
}

interface InnovationData {
  title: string;
  description: string;
  options: Option[];
  mermaid: string;
}

export default function BlockchainInnovations({ json }: { json: InnovationData[] }) {
  const [activeTab, setActiveTab] = useState(json[0].title);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Blockchain Innovations for Companies</h1>
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-1 md:grid-cols-3">
          {json.map(item => (
            <TabsTrigger key={item.title} value={item.title}>
              {item.title.split(":")[0]}
            </TabsTrigger>
          ))}
        </TabsList>
        {json.map(item => (
          <TabsContent key={item.title} value={item.title}>
            <Card>
              <CardHeader>
                <CardTitle>{item.title}</CardTitle>
                <CardDescription>{item.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <h3 className="text-xl font-semibold mb-4">Use Cases</h3>
                <Accordion type="single" collapsible className="mb-6">
                  {item.options.map((option, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger>{option.usecase}</AccordionTrigger>
                      <AccordionContent>
                        <div className="grid gap-2">
                          <p>
                            <strong>Description:</strong> {option.description}
                          </p>
                          <p>
                            <strong>Technology:</strong> {option.technology_name}
                          </p>
                          <p>
                            <strong>Department to Improve:</strong> {option.department_it_will_improve}
                          </p>
                          <p>
                            <strong>How to Integrate:</strong> {option.how_to_integrate}
                          </p>
                          <p>
                            <strong>Companies Using Similar Tech:</strong> {option.companies.join(", ")}
                          </p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
                <h3 className="text-xl font-semibold mb-4">Process Flow</h3>
                <Mermaid chart={item.mermaid} />
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
