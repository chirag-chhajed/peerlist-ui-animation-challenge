import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { motion, LayoutGroup } from "motion/react";

export const Route = createFileRoute("/day-4")({
  component: RouteComponent,
});

function RouteComponent() {
  const [activePricing, setActivePricing] = useState("Free");
  const [activePlan, setActivePlan] = useState("Monthly");
  const pricingContainerRef = useRef<HTMLDivElement>(null);
  const activePricingRef = useRef<HTMLLIElement>(null);
  const planContainerRef = useRef<HTMLDivElement>(null);
  const activePlanRef = useRef<HTMLSpanElement>(null);

  // Main tab clip-path
  console.log(activePlan, activePricing);
  useEffect(() => {
    const container = pricingContainerRef.current;
    const activeElement = activePricingRef.current;

    if (container && activeElement) {
      const { offsetLeft, offsetWidth } = activeElement;
      const clipLeft = offsetLeft;
      const clipRight = offsetLeft + offsetWidth;

      container.style.clipPath = `inset(0 ${Number(
        100 - (clipRight / container.offsetWidth) * 100
      ).toFixed()}% 0 ${Number(
        (clipLeft / container.offsetWidth) * 100
      ).toFixed()}% round 999px)`;
    }
  }, [activePricing]);

  // Nested tab clip-path
  useEffect(() => {
    if (activePricing !== "Premium") return;

    const container = planContainerRef.current;
    const activeElement = activePlanRef.current;

    if (container && activeElement) {
      const { offsetLeft, offsetWidth } = activeElement;
      const clipLeft = offsetLeft;
      const clipRight = offsetLeft + offsetWidth;

      container.style.clipPath = `inset(0 ${Number(
        100 - (clipRight / container.offsetWidth) * 100
      ).toFixed()}% 0 ${Number(
        (clipLeft / container.offsetWidth) * 100
      ).toFixed()}% round 999px)`;
    }
  }, [activePlan, activePricing]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-8">
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Sora:wght@100..800&display=swap"
        rel="stylesheet"
      />
      <div
        style={{
          fontFamily: "Sora, sans-serif",
        }}
        className="flex items-center justify-center p-1 shadow-md rounded-full"
      >
        <div className="rounded-full font-semibold relative">
          <ul className="flex gap-2 rounded-full">
            <li
              ref={activePricing === "Free" ? activePricingRef : null}
              className="w-52 h-15 py-2 flex items-center justify-center rounded-full cursor-pointer"
              onClick={() => setActivePricing("Free")}
            >
              <div>
                <p>Free</p>
              </div>
            </li>

            <li
              ref={activePricing === "Premium" ? activePricingRef : null}
              className="w-52 h-15 py-2 flex items-center justify-center rounded-full cursor-pointer"
              onClick={() => setActivePricing("Premium")}
            >
              {activePricing === "Free" ? (
                <div className="flex flex-col items-center justify-center">
                  <p>Premium</p>
                  <p className="text-sm font-medium flex items-center gap-1">
                    <motion.span layoutId="monthly">Monthly</motion.span>
                    <span>.</span>
                    <motion.span layoutId="annual">Annual</motion.span>
                  </p>
                </div>
              ) : null}
            </li>
          </ul>

          {/* Main black overlay */}
          <div
            ref={pricingContainerRef}
            className="w-full absolute overflow-hidden z-10 inset-0 transition-[clip-path] duration-300 ease-in-out bg-black"
          >
            <ul className="flex gap-2 rounded-full bg-black">
              <li className="w-52 h-15 py-2 flex items-center justify-center bg-black text-white rounded-full">
                <div>
                  <p>Free</p>
                </div>
              </li>
              {activePricing === "Premium" ? (
                <li className="w-52 h-15 flex items-center justify-center bg-black text-white rounded-full">
                  <div className="p-1 w-full h-full">
                    <div className="rounded-full relative font-semibold h-full">
                      <ul className="flex gap-1 h-full">
                        <li
                          ref={activePlan === "Monthly" ? activePlanRef : null}
                          onClick={(e) => {
                            setActivePlan("Monthly");
                          }}
                          className="flex-1 py-2 flex items-center justify-center rounded-full cursor-pointer bg-black text-white"
                        >
                          {activePlan === "Monthly" ? (
                            <motion.span layoutId="monthly">
                              Monthly
                            </motion.span>
                          ) : (
                            <span>Monthly</span>
                          )}
                        </li>
                        <li
                          ref={activePlan === "Annual" ? activePlanRef : null}
                          onClick={(e) => {
                            setActivePlan("Annual");
                          }}
                          className="flex-1  py-2 flex items-center justify-center rounded-full cursor-pointer bg-black text-white"
                        >
                          {activePlan === "Monthly" ? (
                            <motion.span layoutId="annual">Annual</motion.span>
                          ) : (
                            <span>Annual</span>
                          )}
                        </li>
                      </ul>
                      {/* Nested white overlay */}
                      <div
                        ref={planContainerRef}
                        className="absolute inset-0 bg-white rounded-full overflow-hidden transition-[clip-path] duration-300 ease-in-out "
                      >
                        <ul className="flex gap-1 h-full bg-white">
                          <li className="flex-1 py-2 flex items-center justify-center rounded-full cursor-pointer text-black">
                            {activePlan === "Monthly" ? (
                              <motion.span layoutId="monthly">
                                Monthly
                              </motion.span>
                            ) : (
                              <span>Monthly</span>
                            )}
                          </li>
                          <li className="flex-1 py-2 flex items-center justify-center rounded-full cursor-pointer text-black">
                            {activePlan === "Annual" ? (
                              <motion.span layoutId="annual">
                                Annual
                              </motion.span>
                            ) : (
                              <span>Annual</span>
                            )}
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </li>
              ) : null}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
