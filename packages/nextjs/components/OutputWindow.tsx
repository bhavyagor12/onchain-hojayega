import { useState } from "react";
import PlanOutput from "./PlanShowcase";
import Editor from "@monaco-editor/react";
import { Copy, Maximize2 } from "lucide-react";
import { Mermaid } from "mdx-mermaid/Mermaid";
import CopyToClipboard from "react-copy-to-clipboard";
import toast from "react-hot-toast";
import { useAgent } from "~~/providers/AgenticProvider";
import { Button } from "~~/shadcn/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~~/shadcn/components/ui/card";

const OutputWindow = () => {
  const { state, alteredMermaid, plan, codeSolidity, token } = useAgent();
  const [isStateOpen, setIsStateOpen] = useState(false);
  const [isAlteredOpen, setIsAlteredOpen] = useState(false);

  const renderMermaidModal = (
    diagram: string | undefined,
    isOpen: boolean,
    setIsOpen: (open: boolean) => void,
    title: string,
  ) => {
    if (!diagram) return null;

    return (
      <div className={`modal ${isOpen ? "modal-open" : ""}`} onClick={() => setIsOpen(false)}>
        <div className="modal-box w-full max-w-5xl max-h-[90vh] h-full bg-base-200" onClick={e => e.stopPropagation()}>
          <h3 className="font-bold text-lg mb-4">Enlarged Diagram - {title}</h3>
          <div className="w-full h-full overflow-auto">
            <Mermaid chart={diagram} />
          </div>
          <div className="modal-action">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Close
            </Button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Card
      className="h-[100vh] overflow-scroll"
      style={{
        backgroundImage: `url('/chatBg.svg')`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "right center", // Flip horizontally by adjusting position
      }}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle>Output Window</CardTitle>
      </CardHeader>
      <CardContent className="gap-4">
        <div>
          {token && (
            <div className="mb-6 space-y-4">
              <h3 className="text-lg font-semibold text-primary-700 border-b-2 border-primary-300 pb-2">Token</h3>
              <div className="p-6 bg-gradient-to-r from-gray-50 via-gray-100 to-gray-200 rounded-lg shadow-lg">
                <p className="text-gray-800 font-medium">{token.name}</p>
                <p className="text-gray-600 italic">{token.abbreviation}</p>
                <a
                  href={`https://sepolia.basescan.org/address/${token.contract}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <p className="text-gray-600">{token.contract}</p>
                </a>{" "}
              </div>
            </div>
          )}
          {codeSolidity && (
            <div className="h-[70vh] mb-[3rem]">
              <h3 className="font-semibold text-lg mb-2 flex items-center">
                Solidity Code
                <CopyToClipboard text={codeSolidity} onCopy={() => toast("Copied to clipboard")}>
                  <Button variant="outline" size="icon" className="btn-ghost">
                    <Copy className="h-4 w-4 ml-4" />
                  </Button>
                </CopyToClipboard>
              </h3>
              <Editor
                height="70vh"
                defaultLanguage="solidity"
                theme="vs-dark"
                defaultValue={codeSolidity}
                options={{
                  readOnly: true,
                  minimap: { enabled: false },
                  lineNumbers: "on",
                  fontSize: 12,
                  wordWrap: "on",
                }}
              />
            </div>
          )}
          {plan && <PlanOutput {...plan} />}
          {alteredMermaid && alteredMermaid !== state?.mermaid_diagram && (
            <>
              <div>
                <div className="divider my-4" />
                <div className="flex items-center gap-4">
                  <h3 className="font-semibold text-lg mb-2">After Alteration</h3>
                  <Button variant="outline" size="icon" onClick={() => setIsAlteredOpen(true)} className="btn-ghost">
                    <Maximize2 className="h-4 w-4" />
                  </Button>
                </div>
                <Mermaid chart={alteredMermaid} />
              </div>
            </>
          )}
          {state?.mermaid_diagram && (
            <div className="mb-4">
              <div className="divider my-4" />
              <div className="flex items-center gap-4">
                <h3 className="font-semibold text-lg mb-2">Before Alteration</h3>
                <Button variant="outline" size="icon" onClick={() => setIsStateOpen(true)} className="btn-ghost">
                  <Maximize2 className="h-4 w-4" />
                </Button>
              </div>
              <Mermaid chart={state.mermaid_diagram} />
            </div>
          )}
        </div>
      </CardContent>
      {renderMermaidModal(alteredMermaid, isAlteredOpen, setIsAlteredOpen, "After")}
      {renderMermaidModal(state?.mermaid_diagram, isStateOpen, setIsStateOpen, "Before")}
    </Card>
  );
};

export default OutputWindow;
