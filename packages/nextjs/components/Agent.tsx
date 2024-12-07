import Image from "next/image";
import { Card } from "~~/shadcn/components/ui/card";

interface Skill {
  name: string;
  color: string;
}

interface AgentCardProps {
  name: string;
  role: string;
  image: string;
  prompt: string;
  skills: Skill[];
}

export default function AgentCard({ name, role, image, prompt, skills }: AgentCardProps) {
  const getSkillColor = (color: string) => {
    const colors: Record<string, string> = {
      blue: "bg-blue-500 text-white",
      purple: "bg-purple-500 text-white",
      pink: "bg-pink-500 text-white",
      green: "bg-green-500 text-white",
      red: "bg-red-500 text-white",
      twitter: "bg-[#1DA1F2] text-white",
    };
    return colors[color] || "bg-gray-500 text-white";
  };

  return (
    <Card className="w-full max-w-md p-6 space-y-6">
      <h2 className="text-2xl font-bold text-indigo-900">
        {name} - {role}
      </h2>
      <div className="bg-muted rounded-lg p-2 flex flex-col items-center">
        <div className="bg-white p-4 rounded-lg mb-4">
          <Image src={image} alt={name} width={200} height={200} className="pixel-art" />
        </div>
      </div>

      <div className="space-y-1">
        <h3 className="text-xl font-bold text-indigo-900">Agent Introduction</h3>
        <div className="p-4 bg-gray-100 rounded-lg">
          <p className="text-gray-600">{prompt}</p>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-xl font-bold text-indigo-900">Skills</h3>
        <p className="text-gray-600">These are my specialized skills</p>
        <div className="flex flex-wrap gap-2">
          {skills.map(skill => (
            <span key={skill.name} className={`px-4 py-1 rounded-full text-sm ${getSkillColor(skill.color)}`}>
              {skill.name}
            </span>
          ))}
        </div>
      </div>
    </Card>
  );
}
