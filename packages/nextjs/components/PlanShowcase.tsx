import React from "react";
import { AlertTriangle, Check } from "lucide-react";
import { Badge } from "~~/shadcn/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~~/shadcn/components/ui/card";

export interface IPlanOutput {
  goal: string;
  main_features: string[];
  target_users: string[];
  important_info: string[];
  actions: string[];
  logs: string[];
  safety: string[];
}

export default function PlanOutput({
  goal,
  main_features,
  target_users,
  important_info,
  actions,
  logs,
  safety,
}: IPlanOutput) {
  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="gap-2">
        <CardTitle className="text-2xl font-bold">Onchain plan</CardTitle>
        <CardDescription>{goal}</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <section>
          <h3 className="text-lg font-semibold mb-2">Main Features</h3>
          <div className="grid grid-cols-2 gap-2">
            {main_features.map((feature, index) => (
              <Badge key={index} variant="outline" className="justify-start p-2">
                {feature}
              </Badge>
            ))}
          </div>
        </section>

        <section>
          <h3 className="text-lg font-semibold mb-2">Target Users</h3>
          <div className="flex flex-wrap gap-2">
            {target_users.map((user, index) => (
              <Badge key={index} className="p-2 text-white">
                {user}
              </Badge>
            ))}
          </div>
        </section>

        <section>
          <h3 className="text-lg font-semibold mb-2">Important Information</h3>
          <ul className="list-disc pl-5 space-y-1">
            {important_info.map((info, index) => (
              <li key={index}>{info}</li>
            ))}
          </ul>
        </section>

        <section>
          <h3 className="text-lg font-semibold mb-2">Actions</h3>
          <div className="grid grid-cols-2 gap-2">
            {actions.map((action, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Check className="h-5 w-5 text-green-500" />
                <span>{action}</span>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h3 className="text-lg font-semibold mb-2">Logs</h3>
          <div className="grid grid-cols-2 gap-2">
            {logs.map((log, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Badge variant="outline" className="text-primary border-primary p-2">
                  {log}
                </Badge>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h3 className="text-lg font-semibold mb-2">Safety Measures</h3>
          <div className="space-y-2">
            {safety.map((measure, index) => (
              <div key={index} className="flex items-start space-x-2">
                <AlertTriangle className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                <span>{measure}</span>
              </div>
            ))}
          </div>
        </section>
      </CardContent>
    </Card>
  );
}
