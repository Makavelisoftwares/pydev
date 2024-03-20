"use client";

import { Button } from "@/components/ui/button";

import axios from "axios";
import Editor, { Monaco } from "@monaco-editor/react";
import { useState } from "react";
import { Loader, Play } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export default function Editor() {
  const [code, setcode] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const [output, setoutput] = useState("");

  function handleEditorChange(value, event) {
    setcode(value);
  }

  const handleRun = async () => {
    try {
      setisLoading(true);
      const program = {
        script: code,
        language: "python3",
        versionIndex: "0",
        clientId: "4a76a71b0b16b60c38118711d669f8b7",
        clientSecret:
          "50a405bac73a6cad4533b88435daabf357c11ea7b5833ef63896ec202e58f710",
      };

      if (!code) {
        toast.error("kindly provide a code snippet");
      }

      const resp = await axios.post("/api/compiler", {
        program,
      });
      setoutput(resp.data);
      console.log(resp.data);
    } catch (error) {
      console.log(error);
    } finally {
      setisLoading(false);
    }
  };

  return (
    <div>
      <div className="my-3 flex justify-end">
        <Button
          className="bg-emerald-500 flex items-center space-x-2 hover:bg-emerald-500"
          size="sm"
          onClick={handleRun}
        >
          <Play />
          <div>Run</div>
        </Button>
      </div>

      <div className="grid grid-cols-5 gap-2">
        <div className="col-span-3">
          <Editor
            height="80vh"
            defaultLanguage="python"
            defaultValue="// some comment"
            theme="vs-dark"
            onChange={handleEditorChange}
            className="text-blue-600"
          />
        </div>

        <Card className="col-span-2">
          <CardHeader className="border-b border-zinc-200/50">
            <CardTitle>Code Output</CardTitle>
            <CardDescription>
              This is where your output result will be displayed
            </CardDescription>
          </CardHeader>

          <CardContent>
            {isLoading ? (
              <div className="flex items-center justify-center h-[50vh]">
                <div>
                  <Loader className="animate-spin" />
                </div>
              </div>
            ) : (
              <pre
                className={cn(
                  "bg-gray-500 rounded-sm p-2 text-white",
                  output.includes("SyntaxError") &&
                    "text-rose-700 font-bold bg-white",
                  output.includes("Traceback") &&
                    "text-rose-700 font-bold bg-white"
                )}
              >
                <code className="font-bold">{`>> ${output}`}</code>
              </pre>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
