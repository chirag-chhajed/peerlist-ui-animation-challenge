import { createFileRoute } from "@tanstack/react-router";
import {
  CheckCircle,
  CheckCircle2,
  LoaderCircle,
  TriangleAlertIcon,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { Button } from "react-aria-components";

export const Route = createFileRoute("/day-2")({
  component: RouteComponent,
});

function RouteComponent() {
  const [mode, setMode] = useState<"loading" | "safe" | "warning">("loading");

  return (
    <div className="h-screen p-8">
      <div className="flex gap-4 justify-between items-center">
        <Button
          onPress={() => {
            setMode("loading");

            setTimeout(() => {
              setMode("safe");
            }, 1750);

            setTimeout(() => {
              setMode("loading");
            }, 3500);

            setTimeout(() => {
              setMode("warning");
            }, 5250);
          }}
          type="button"
          className={"overflow-hidden"}
        >
          <AnimatePresence mode="popLayout">
            {mode === "loading" ? (
              <motion.span className="inline-flex items-center gap-2 px-4 py-2 bg-sky-100 font-medium rounded-full text-sky-500">
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{
                    repeatType: "loop",
                    repeat: Number.POSITIVE_INFINITY,
                    duration: 1,
                  }}
                >
                  <LoaderCircle className="size-4" />
                </motion.span>
                <motion.span>Analyzing Transaction</motion.span>
              </motion.span>
            ) : mode === "safe" ? (
              <motion.span className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 font-medium rounded-full text-green-500">
                <motion.span>
                  <CheckCircle2 className="size-4" />
                </motion.span>
                <motion.span
                  initial={{
                    x: "100%",
                  }}
                  animate={{
                    x: 0,
                  }}
                >
                  Transaction Safe
                </motion.span>
              </motion.span>
            ) : mode === "warning" ? (
              <motion.span className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 font-medium rounded-full text-red-500">
                <motion.span>
                  <TriangleAlertIcon className="size-4" />
                </motion.span>
                <motion.span
                  initial={{
                    x: "100%",
                  }}
                  animate={{
                    x: 0,
                  }}
                >
                  Transaction Warning
                </motion.span>
              </motion.span>
            ) : null}
          </AnimatePresence>
        </Button>
      </div>
    </div>
  );
}
