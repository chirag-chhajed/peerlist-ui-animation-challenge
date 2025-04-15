import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import "./day-4.css";
export const Route = createFileRoute("/day-4")({
  component: RouteComponent,
});

function RouteComponent() {
  const [activeTab, setActiveTab] = useState(TABS[0].name);
  const containerRef = useRef<HTMLDivElement>(null);
  const activeTabElementRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const container = containerRef.current;

    if (activeTab && container) {
      const activeTabElement = activeTabElementRef.current;

      if (activeTabElement) {
        const { offsetLeft, offsetWidth } = activeTabElement;

        const clipLeft = offsetLeft;
        const clipRight = offsetLeft + offsetWidth;
        container.style.clipPath = `inset(0 ${Number(
          100 - (clipRight / container.offsetWidth) * 100
        ).toFixed()}% 0 ${Number(
          (clipLeft / container.offsetWidth) * 100
        ).toFixed()}% round 17px)`;
      }
    }
  }, [activeTab, activeTabElementRef, containerRef]);

  return (
    <div className="wrapper">
      <ul className="list">
        {TABS.map((tab) => (
          <li key={tab.name}>
            <button
              ref={activeTab === tab.name ? activeTabElementRef : null}
              data-tab={tab.name}
              onClick={() => {
                setActiveTab(tab.name);
              }}
              className="button"
            >
              {tab.name}
            </button>
          </li>
        ))}
      </ul>

      <div aria-hidden className="clip-path-container" ref={containerRef}>
        <ul className="list list-overlay">
          {TABS.map((tab) => (
            <li key={tab.name}>
              <button
                data-tab={tab.name}
                onClick={() => {
                  setActiveTab(tab.name);
                }}
                className="button-overlay button"
                tabIndex={-1}
              >
                {tab.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

const TABS = [
  {
    name: "Payments",
  },
  {
    name: "Balances",
  },
];
