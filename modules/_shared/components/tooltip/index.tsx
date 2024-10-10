import { clsx } from "@mantine/core";
import ReactTooltip, { TooltipProps } from "react-tooltip";

interface TooltipI extends TooltipProps {
  text?: string;
}

export default function Tooltip({
  text = "",
  children = null,
  className = "",
  ...TooltipProps
}: TooltipI) {
  return (
    <ReactTooltip
      className={clsx("!py-0.5 !px-2.5 !rounded-md shared-react-tooltip", className)}
      effect="solid"
      type="dark"
      arrowColor="transparent"
      {...TooltipProps}
    >
      {children || <span className="text-xs">{text || "--"}</span>}
    </ReactTooltip>
  );
}
