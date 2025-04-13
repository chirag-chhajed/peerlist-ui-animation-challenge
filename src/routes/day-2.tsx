import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2, LoaderCircle, TriangleAlert } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { Button } from "react-aria-components";

export const Route = createFileRoute("/day-2")({
  component: RouteComponent,
});

function RouteComponent() {
  const [mode, setMode] = useState<"loading" | "safe" | "warning">("loading");

  const cycleStates = () => {
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
  };

  return (
    <div className="h-screen p-8 flex flex-col items-center justify-center">
      <Button
        onPress={cycleStates}
        type="button"
        className={"relative overflow-hidden rounded-full"}
      >
        <AnimatePresence mode="wait" initial={false}>
          {mode === "loading" && (
            <motion.div
              key="loading"
              className="flex items-center gap-2 px-4 py-2 bg-sky-100 font-semibold rounded-full text-sky-500"
              transition={{
                opacity: { duration: 0.2 },
                y: { type: "spring", stiffness: 300, damping: 25 },
              }}
            >
              <motion.span className="animate-spin ease-in-out">
                <LoaderCircle className="size-4" />
              </motion.span>
              <motion.span
                initial={{ x: -10 }}
                animate={{ x: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 25,
                }}
              >
                Analyzing Transaction
              </motion.span>
            </motion.div>
          )}

          {mode === "safe" && (
            <motion.div
              key="safe"
              className="flex items-center gap-2 px-4 py-2 bg-green-100 font-semibold rounded-full text-green-500"
              transition={{
                opacity: { duration: 0.2 },
                y: { type: "spring", stiffness: 300, damping: 25 },
              }}
            >
              <motion.span
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 500,
                  damping: 15,
                }}
              >
                <CheckCircle2 className="size-4" />
              </motion.span>
              <motion.span
                initial={{ x: 20 }}
                animate={{ x: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 25,
                }}
              >
                Transaction Safe
              </motion.span>
            </motion.div>
          )}

          {mode === "warning" && (
            <motion.div
              key="warning"
              className="flex items-center gap-2 px-4 py-2 bg-red-100 font-semibold rounded-full text-red-500"
              transition={{
                opacity: { duration: 0.2 },
                y: { type: "spring", stiffness: 300, damping: 25 },
              }}
            >
              <motion.span
                animate={{
                  x: [0, -1, 1, -1, 1, -0.5, 0.5, -0.25, 0.25, 0],
                }}
                transition={{
                  duration: 0.4,
                  repeat: 2,
                  repeatType: "mirror",
                  delay: 0.8,
                }}
              >
                <TriangleAlert className="size-4" />
              </motion.span>
              <motion.span
                initial={{ x: 20 }}
                animate={{ x: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 25,
                }}
              >
                Transaction Warning
              </motion.span>
            </motion.div>
          )}
        </AnimatePresence>
      </Button>
      <p className="mt-4 text-sm text-muted-foreground">Tap to see the magic</p>
    </div>
  );
}
