"use client";
import React, { useRef, useState } from "react";
import { motion, type TargetAndTransition } from "framer-motion";
import { useRouter, usePathname } from "next/navigation";

interface NavItem {
  label: string;
  path: string;
}

interface Position {
  left: number;
  width: number;
  opacity: number;
}

interface TabProps {
  index: number;
  path: string;
  children: React.ReactNode;
  setPosition: React.Dispatch<React.SetStateAction<Position>>;
  setActiveTab: React.Dispatch<React.SetStateAction<number | null>>;
  activeTab: number | null;
  router: ReturnType<typeof useRouter>;
}

interface CursorProps {
  position: Position;
}

const navigationItems: NavItem[] = [
  { label: "⚡️Pulse", path: "/" },
  { label: "Send", path: "/send" },
  { label: "Receive", path: "/receive" },
  { label: "Provider", path: "/provider" },
];

const Tab: React.FC<TabProps> = ({
  index,
  path,
  children,
  setPosition,
  setActiveTab,
  activeTab,
  router,
}) => {
  const ref = useRef<HTMLLIElement | null>(null);

  const handleMouseEnter = () => {
    if (!ref.current) return;

    const { width } = ref.current.getBoundingClientRect();
    setPosition({
      left: ref.current.offsetLeft,
      width,
      opacity: 1,
    });
    setActiveTab(index);
  };

  const handleClick = () => {
    router.push(path);
  };

  return (
    <li
      id={`tab-${index}`}
      ref={ref}
      onMouseEnter={handleMouseEnter}
      onClick={handleClick}
      className={`relative z-10 block cursor-pointer px-4 py-2 transition-colors duration-200 ${
        activeTab === index 
          ? "text-white" 
          : "text-gray-400 hover:text-gray-300"
      }`}
      role="tab"
      aria-selected={activeTab === index}
      tabIndex={0}
      onKeyPress={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleClick();
        }
      }}
    >
      {children}
    </li>
  );
};

const Cursor: React.FC<CursorProps> = ({ position }) => {
  const animationProps: TargetAndTransition = {
    x: position.left,
    width: position.width,
    opacity: position.opacity,
  };

  return (
    <motion.li
      animate={animationProps}
      initial={false}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30
      }}
      className="absolute z-0 h-10 rounded-xl bg-gradient-to-br from-[#272A48] to-[#0F0E26]"
    />
  );
};

export const Navbar: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  
  const [position, setPosition] = useState<Position>({
    left: 0,
    width: 0,
    opacity: 0,
  });

  const [activeTab, setActiveTab] = useState<number | null>(() => {
    const currentIndex = navigationItems.findIndex(item => item.path === pathname);
    return currentIndex !== -1 ? currentIndex : null;
  });

  const handleMouseLeave = () => {
    setPosition(prev => ({
      ...prev,
      opacity: 0,
    }));
    setActiveTab(null);
  };

  return (
    <nav 
      aria-label="Main navigation"
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50"
    >
      <ul
        onMouseLeave={handleMouseLeave}
        className="relative mx-auto flex w-fit rounded-xl bg-gradient-to-br from-[#272A48]/30 to-[#0F0E26]/30 backdrop-blur-xl p-1 border border-gray-800"
      >
        {navigationItems.map((item, index) => (
          <Tab
            key={item.path}
            index={index}
            path={item.path}
            setPosition={setPosition}
            setActiveTab={setActiveTab}
            activeTab={activeTab}
            router={router}
          >
            {item.label}
          </Tab>
        ))}
        <Cursor position={position} />
      </ul>
    </nav>
  );
};

export default Navbar;