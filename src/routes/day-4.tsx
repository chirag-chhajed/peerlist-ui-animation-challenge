import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
export const Route = createFileRoute("/day-4")({
  component: RouteComponent,
});

function RouteComponent() {
  const [activePricing, setActivePricing] = useState("Free");
  const pricingContainerRef = useRef<HTMLDivElement>(null);
  const activePricingRef = useRef<HTMLLIElement>(null);

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

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-8">
      <div className="flex items-center justify-center p-1 shadow-md rounded-full">
        <div className="rounded-full font-semibold relative">
          <ul className="flex gap-2 rounded-full">
            <li
              ref={activePricing === "Free" ? activePricingRef : null}
              className="w-52 py-2 flex items-center justify-center rounded-full cursor-pointer"
              onClick={() => setActivePricing("Free")}
            >
              <div>
                <p>Free</p>
              </div>
            </li>
            <li
              ref={activePricing === "Premium" ? activePricingRef : null}
              className="w-52 py-2 flex items-center justify-center rounded-full cursor-pointer"
              onClick={() => setActivePricing("Premium")}
            >
              <div className="flex flex-col items-center justify-center">
                <p>Premium</p>
                <p className="text-sm font-medium flex items-center gap-1">
                  <span>Monthly</span>
                  <span>.</span>
                  <span>Annual</span>
                </p>
              </div>
            </li>
          </ul>
          <div
            ref={pricingContainerRef}
            className="w-full absolute overflow-hidden z-10 inset-0 transition-[clip-path] duration-300 ease-in-out bg-black"
          >
            <ul className="flex gap-2 rounded-full bg-black">
              <li className="w-52 py-2 flex items-center justify-center bg-black text-white rounded-full">
                <div>
                  <p>Free</p>
                </div>
              </li>
              <li className="w-52 py-2 flex items-center justify-center bg-black text-white rounded-full">
                <div className="flex flex-col items-center justify-center">
                  <p>Premium</p>
                  <p className="text-sm font-medium flex items-center gap-1">
                    <span>Monthly</span>
                    <span>.</span>
                    <span>Annual</span>
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
