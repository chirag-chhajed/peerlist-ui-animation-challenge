import { createFileRoute } from "@tanstack/react-router";
import { LineChart } from "lucide-react";
import { motion } from "motion/react";
import { Checkbox } from "react-aria-components";

export const Route = createFileRoute("/day-3")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="h-screen p-8 flex flex-col items-center justify-center">
      <Checkbox
        defaultSelected
        className={
          "group cursor-pointer flex items-center gap-2.5 focus:bg-gray-100 hover:bg-gray-100 p-2 rounded-lg"
        }
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          className=""
        >
          <motion.rect
            x="0.75"
            y="0.75"
            width="16.5"
            height="16.5"
            rx="3.25"
            stroke="#D1D5DB"
            strokeWidth="1.5"
            className="group-selected:[stroke-dasharray:60px] group-selected:[stroke-dashoffset:60px] [stroke-dashoffset:0px] [stroke-dasharray:60px] transition-all duration-500 rotate-180 origin-center group-selected:fill-blue-500"
          />
          <motion.path
            d="M5 9L8 12L13 6"
            stroke="#fff"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="[stroke-dasharray:15px] group-selected:[stroke-dashoffset:0px] [stroke-dashoffset:15px] transition-all duration-500"
          />
        </svg>

        <div className="relative">
          <span className="text-zinc-950 group-selected:text-zinc-400">
            Contenmplate Existence
          </span>
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 100 20"
            preserveAspectRatio="none"
          >
            <motion.path
              d="M0,10 L100,10"
              stroke="#9f9fa9"
              strokeWidth="1"
              strokeLinecap="round"
              fill="none"
              className="[stroke-dasharray:100] [stroke-dashoffset:100] group-selected:[stroke-dashoffset:0] transition-all duration-500"
            />
          </svg>
        </div>
      </Checkbox>
    </div>
  );
}

// When the checkbox is selected:
// 1. the checkbox rect path becomes invisible
// 2. the bg blue pops up or scales up to 1
// 3. the checkmark path becomes visible and line through becomes visible and the text color changes

// When the checkbox is unselected:
// 1. The line through becomes invisible and the text color becomes original
// 2. The checkmark path becomes invisible
// 3. The bg blue scales down to 0
// 4. The checkbox rect path becomes visible again
