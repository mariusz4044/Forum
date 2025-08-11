import { ComponentType } from "react";
import clsx from "clsx";
import { Tooltip } from "react-tooltip";

export type BadgeColors = "orange" | "gray" | "red" | "green";

interface BadgeProps {
  color: BadgeColors;
  text: string;
  tooltip?: string;
  Icon: ComponentType<{ size?: number }>;
}

const colors = {
  gray: "bg-[#6f6f6f]/[0.5] text-[#bbbbbb]",
  orange: "bg-[#dfa63a]/[0.5] text-[#ffcc6b]",
  red: "bg-[#cb1919]/[0.5] text-[#ff7676]",
  green: "bg-[#239723]/[0.5] text-[#8bff8b]",
};

export default function Badge(props: BadgeProps) {
  const { text, color, Icon, tooltip } = props;

  return (
    <>
      <div
        className={clsx(
          `font-bold flex flex-row items-center rounded p-1 gap-1 w-full `,
          colors[color],
        )}
        data-tooltip-id="badge-tooltip"
        data-tooltip-content={tooltip}
      >
        {Icon && <Icon size={12} />}
        <span className="text-[11px]">{text}</span>
      </div>
      {tooltip && <Tooltip id="badge-tooltip" />}
    </>
  );
}
