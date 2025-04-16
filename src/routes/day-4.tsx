import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { useTabList, useTab } from "react-aria";
import { useTabListState } from "react-stately";

export const Route = createFileRoute("/day-4")({
  component: RouteComponent,
});

function RouteComponent() {
  const [activePricing, setActivePricing] = useState("Free");
  const [activePlan, setActivePlan] = useState("Monthly");
  const pricingContainerRef = useRef<HTMLUListElement>(null);
  const planContainerRef = useRef<HTMLUListElement>(null);

  // For clip-path animation
  const pricingOverlayRef = useRef<HTMLDivElement>(null);
  const planOverlayRef = useRef<HTMLDivElement>(null);

  // React Aria tab list state
  const pricingState = useTabListState({
    selectedKey: activePricing,
    onSelectionChange: (key) => setActivePricing(key as string),
  });

  const planState = useTabListState({
    selectedKey: activePlan,
    onSelectionChange: (key) => setActivePlan(key as string),
  });

  // React Aria tab list props
  const { tabListProps: pricingTabListProps } = useTabList(
    {
      "aria-label": "Pricing options",
      orientation: "horizontal",
    },
    pricingState,
    pricingContainerRef
  );

  const { tabListProps: planTabListProps } = useTabList(
    {
      "aria-label": "Subscription period",
      orientation: "horizontal",
    },
    planState,
    planContainerRef
  );

  // React Aria tab props for each tab
  const freeTabRef = useRef<HTMLLIElement>(null);
  const premiumTabRef = useRef<HTMLLIElement>(null);
  const monthlyTabRef = useRef<HTMLLIElement>(null);
  const annualTabRef = useRef<HTMLLIElement>(null);

  const { tabProps: freeTabProps } = useTab(
    { key: "Free" },
    pricingState,
    freeTabRef
  );

  const { tabProps: premiumTabProps } = useTab(
    { key: "Premium" },
    pricingState,
    premiumTabRef
  );

  const { tabProps: monthlyTabProps } = useTab(
    { key: "Monthly" },
    planState,
    monthlyTabRef
  );

  const { tabProps: annualTabProps } = useTab(
    { key: "Annual" },
    planState,
    annualTabRef
  );

  useEffect(() => {
    const container = pricingOverlayRef.current;
    const activeElement =
      activePricing === "Free" ? freeTabRef.current : premiumTabRef.current;

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

    const container = planOverlayRef.current;
    const activeElement =
      activePlan === "Monthly" ? monthlyTabRef.current : annualTabRef.current;

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
          <ul
            className="flex gap-2 rounded-full"
            {...pricingTabListProps}
            ref={pricingContainerRef}
          >
            <li
              ref={freeTabRef}
              className="w-52 h-15 py-2 flex items-center justify-center rounded-full cursor-pointer"
              {...freeTabProps}
              onClick={() => setActivePricing("Free")}
            >
              <div>
                <p>Free</p>
              </div>
            </li>

            <li
              ref={premiumTabRef}
              className="w-52 h-15 py-2 flex items-center justify-center rounded-full cursor-pointer"
              {...premiumTabProps}
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
            ref={pricingOverlayRef}
            className="w-full absolute overflow-hidden z-10 inset-0 transition-[clip-path] duration-300 ease-in-out bg-black"
            aria-hidden="true"
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
                      <ul
                        className="flex gap-1 h-full"
                        {...planTabListProps}
                        ref={planContainerRef}
                      >
                        <li
                          ref={monthlyTabRef}
                          className="flex-1 py-2 flex items-center justify-center rounded-full cursor-pointer bg-black text-white"
                          {...monthlyTabProps}
                          onClick={() => setActivePlan("Monthly")}
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
                          ref={annualTabRef}
                          className="flex-1  py-2 flex items-center justify-center rounded-full cursor-pointer bg-black text-white"
                          {...annualTabProps}
                          onClick={() => setActivePlan("Annual")}
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
                        ref={planOverlayRef}
                        className="absolute inset-0 bg-white rounded-full overflow-hidden transition-[clip-path] duration-300 ease-in-out"
                        aria-hidden="true"
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
