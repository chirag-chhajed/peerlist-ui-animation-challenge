import { createFileRoute } from "@tanstack/react-router";
import { Button, Menu, MenuItem as MenuItemBase } from "react-aria-components";
import {
  HomeIcon,
  MailIcon,
  MenuIcon,
  Settings,
  User,
  XIcon,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";

export const Route = createFileRoute("/")({
  component: App,
});

const MenuItem = motion(MenuItemBase);

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const menuItems = [
    {
      icon: HomeIcon,
    },
    {
      icon: MailIcon,
    },
    {
      icon: User,
    },
    {
      icon: Settings,
    },
  ];
  return (
    <div className="h-screen p-8">
      <div
        style={{ filter: "url(#gooey-filter-menu)" }}
        className="flex flex-col   "
      >
        <svg
          aria-label="Gooey filter"
          width="0"
          height="0"
          style={{ position: "absolute" }}
        >
          <defs>
            <filter id="gooey-filter-menu">
              <feGaussianBlur
                in="SourceGraphic"
                stdDeviation="5"
                result="blur"
              />
              <feColorMatrix
                in="blur"
                type="matrix"
                values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 18 -7"
                result="goo"
              />
              <feComposite in="SourceGraphic" in2="goo" operator="atop" />
            </filter>
          </defs>
        </svg>

        <Button
          className="bg-neutral-100 inline-flex items-center justify-center size-12 rounded-full z-10"
          aria-label="Menu"
          key={`state-${isOpen}`}
          onPress={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <motion.div
              initial={{ filter: "blur(5px)" }}
              animate={{ filter: "blur(0px)" }}
            >
              <XIcon size={24} className="text-zinc-950" />
            </motion.div>
          ) : (
            <motion.div
              initial={{ filter: "blur(5px)" }}
              animate={{ filter: "blur(0px)" }}
            >
              <MenuIcon size={24} className="text-zinc-950" />
            </motion.div>
          )}
        </Button>

        {isOpen ? (
          <Menu className={" flex flex-col"}>
            {menuItems.map((item, index) => (
              <MenuItem
                className={
                  "bg-neutral-100 inline-flex items-center justify-center size-12 rounded-full text-zinc-500 hover:text-zinc-950 hover:cursor-pointer"
                }
                initial={{ y: -48 * index }}
                animate={{ y: 0 }}
                exit={{ y: -48 * index }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                }}
                id={`menu-item-${index}-${isOpen}`}
                key={`menu-item-${index}-${isOpen}`}
              >
                <item.icon size={24} />
              </MenuItem>
            ))}
          </Menu>
        ) : null}
      </div>
    </div>
  );
}
