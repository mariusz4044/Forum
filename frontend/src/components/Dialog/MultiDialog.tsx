"use client";

import React, { useEffect, useRef, useState } from "react";
import Window from "@/components/Utils/Universal/Window";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

interface MultiDialogProps {
  view: React.ComponentType;
  header: string;
  name: string;
  default?: boolean;
}

type MultiDialogButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
};

function MultiDialogButton({ children, ...props }: MultiDialogButtonProps) {
  return (
    <button
      {...props}
      className="text-md flex size-full cursor-pointer items-center justify-center p-3 rouned-lg z-10"
    >
      {children}
    </button>
  );
}

function MultiDialogBackground({ width, x }: { width: number; x: number }) {
  return (
    <div
      className="absolute left-0 rounded-lg top-[4px] h-[calc(100%-8px)] transform rounded-8 bg-[#262643e6] transition-all duration-200"
      style={{
        width: `${width}px`,
        transform: `translateX(${x}px)`,
      }}
    ></div>
  );
}

function MultiDialogHeader({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-row justify-between">{children}</div>;
}

function MultiDialogVariations({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative inline-flex gap-4 rounded-lg bg-black/20 mt-5 p-1 w-full text-sm">
      {children}
    </div>
  );
}

function MultiDialogView({ children }: { children: React.ReactNode }) {
  return <motion.div className="mt-6 w-full">{children}</motion.div>;
}

export default function ({ views }: { views: MultiDialogProps[] }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [currentView, setCurrentView] = useState<MultiDialogProps>(views[0]);
  const [backgroundPos, setBackgroundPos] = useState({ x: 0, width: 0 });
  const CurrentViewComponent = currentView.view;

  function changeView(view: MultiDialogProps) {
    setCurrentView(view);

    const button = containerRef.current?.querySelector<HTMLButtonElement>(
      `[data-name="${view.name}"]`,
    );

    if (!button) return;

    setBackgroundPos({
      x: button.offsetLeft + 4,
      width: button.offsetWidth,
    });
  }

  useEffect(() => {
    const isDefaultViewExist = views.find((el) => el.default);
    if (isDefaultViewExist) setCurrentView(isDefaultViewExist);
    changeView(isDefaultViewExist || currentView);
  }, []);

  return (
    <Window>
      {currentView.header && (
        <MultiDialogHeader>
          <h1>{currentView.header}</h1>
          <X />
        </MultiDialogHeader>
      )}
      <MultiDialogVariations>
        <MultiDialogBackground
          width={backgroundPos.width}
          x={backgroundPos.x}
        />
        <div ref={containerRef} className="relative inline-flex gap-4 w-full">
          {views.map((view) => (
            <MultiDialogButton
              key={view.name}
              data-name={view.name}
              onClick={() => changeView(view)}
            >
              {view.name}
            </MultiDialogButton>
          ))}
        </div>
      </MultiDialogVariations>
      <MultiDialogView>
        <CurrentViewComponent />
      </MultiDialogView>
    </Window>
  );
}
