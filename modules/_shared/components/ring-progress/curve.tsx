import React from "react";
import { getCurveProps } from "./get-curves-props";
interface CurveProps {
  value?: number;
  size: number;
  offset: number;
  sum: number;
  thickness: number;
  lineRoundCaps: boolean;
  root?: boolean;
  curveHasBackground?: boolean;
  color?: string;
}

const _COLORS = {
  pink: "#ec4899",
  yellow: "#f59e0b",
  indigo: "#6366f1",
  gray: "#64748b",
  blue: "#3b81f6",
  green: "#11b981",
};

export function Curve({
  size,
  value,
  offset,
  sum,
  thickness,
  root,
  color,
  lineRoundCaps,
  curveHasBackground,
}: CurveProps) {
  return (
    <circle
      fill="none"
      strokeLinecap={lineRoundCaps ? "round" : "butt"}
      stroke={root || curveHasBackground ? color : _COLORS[color]}
      className={`${curveHasBackground && root ? "opacity-25" : ""}`}
      {...getCurveProps({ sum, size, thickness, value, offset, root })}
    />
  );
}
