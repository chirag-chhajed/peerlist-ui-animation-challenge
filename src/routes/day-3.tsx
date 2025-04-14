import { createFileRoute } from "@tanstack/react-router";
import { motion, useAnimation } from "motion/react";
import { Checkbox, CheckboxGroup, Label } from "react-aria-components";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/day-3")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="h-screen p-8 flex flex-col items-center justify-center">
      <CheckboxGroup className={"space-y-3"}>
        <Label className="sr-only">What do you want to do today?</Label>
        <SingleCheckboxWithLabel label="Buy groceries" />
        <SingleCheckboxWithLabel label="Contemplate existance" />
        <SingleCheckboxWithLabel label="Learn SwiftUI" />
      </CheckboxGroup>
    </div>
  );
}

const SingleCheckboxWithLabel = ({ label }: { label: string }) => {
  const [selected, setSelected] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    if (selected) {
      // Selected animation sequence
      async function animate() {
        await controls.start("rectInvisible");
        await controls.start("bgVisible");
        await controls.start("checkVisible");
        await controls.start("lineVisible");
      }
      animate();
    } else {
      // Unselected animation sequence
      async function animate() {
        await controls.start("lineInvisible");
        await controls.start("checkInvisible");
        await controls.start("bgInvisible");
        await controls.start("rectVisible");
      }
      animate();
    }
  }, [selected, controls]);

  // Faster duration for other animations
  const fastTransition = {
    duration: 0.25,
  };

  const variants = {
    rectInvisible: {
      strokeDashoffset: 60,
      transition: fastTransition,
    },
    bgVisible: {
      scale: 1,
      transition: fastTransition,
      // transition: springTransition,
    },
    checkVisible: {
      strokeDashoffset: 0,
      transition: fastTransition,
    },
    lineVisible: {
      strokeDashoffset: 0,
      transition: {
        duration: 0.35,
      },
    },
    textSelected: {
      color: "#a1a1aa",
      transition: fastTransition,
    },
    lineInvisible: {
      strokeDashoffset: 100,
      transition: {
        duration: 0.35,
      },
    },
    textNormal: {
      color: "#18181b",
      transition: fastTransition,
    },
    checkInvisible: {
      strokeDashoffset: 15,
      // transition: {
      //   duration: 0.3,
      // },
    },
    bgInvisible: {
      scale: 0,
      transition: fastTransition,
    },
    rectVisible: {
      strokeDashoffset: 0,
      transition: fastTransition,
    },
  };

  return (
    <Checkbox
      isSelected={selected}
      onChange={setSelected}
      className={
        "group cursor-pointer flex items-center gap-2.5 focus:bg-gray-100 hover:bg-gray-100 p-2 rounded-lg"
      }
      value={label}
    >
      <div className="relative w-[18px] h-[18px]">
        {/* Background blue circle */}
        <motion.div
          className="absolute inset-0 bg-blue-500 rounded"
          initial={{ scale: 0 }}
          animate={controls}
          variants={{
            bgVisible: variants.bgVisible,
            bgInvisible: variants.bgInvisible,
          }}
        />

        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          className="absolute inset-0"
        >
          <motion.rect
            x="0.75"
            y="0.75"
            width="16.5"
            height="16.5"
            rx="3.25"
            stroke="#D1D5DB"
            strokeWidth="1.5"
            className="[stroke-dasharray:60px] rotate-180 origin-center"
            initial={{ strokeDashoffset: 0 }}
            animate={controls}
            variants={{
              rectInvisible: variants.rectInvisible,
              rectVisible: variants.rectVisible,
            }}
          />
          <motion.path
            d="M5 9L8 12L13 6"
            stroke="#fff"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="[stroke-dasharray:15px]"
            initial={{ strokeDashoffset: 15 }}
            animate={controls}
            variants={{
              checkVisible: variants.checkVisible,
              checkInvisible: variants.checkInvisible,
            }}
          />
        </svg>
      </div>

      <div className="relative">
        <motion.span
          className="text-zinc-950"
          animate={controls}
          variants={{
            lineVisible: variants.textSelected,
            lineInvisible: variants.textNormal,
          }}
        >
          {label}
        </motion.span>
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
            className="[stroke-dasharray:100]"
            initial={{ strokeDashoffset: 100 }}
            animate={controls}
            variants={{
              lineVisible: variants.lineVisible,
              lineInvisible: variants.lineInvisible,
            }}
          />
        </svg>
      </div>
    </Checkbox>
  );
};
// When the checkbox is selected:
// 1. the checkbox rect path becomes invisible
// 2. the bg blue pops up or scales up to 1
// 3. the checkmark path becomes visible and line through becomes visible and the text color changes

// When the checkbox is unselected:
// 1. The line through becomes invisible and the text color becomes original
// 2. The checkmark path becomes invisible
// 3. The bg blue scales down to 0
// 4. The checkbox rect path becomes visible again
