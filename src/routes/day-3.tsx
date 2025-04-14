import { createFileRoute } from "@tanstack/react-router";
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
          "group cursor-pointer flex items-center gap-2.5 focus-visible:bg-gray-100 p-2 rounded-lg"
        }
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
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
            className="[stroke-dasharray:15px] [stroke-dashoffset:15px] group-selected:[stroke-dashoffset:0px] transition-all duration-500"
          />
        </svg>
        <span className="text-zinc-950 group-selected:line-through group-selected:text-zinc-400">
          Buy groceries
        </span>
      </Checkbox>
    </div>
  );
}
