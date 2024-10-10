import React from "react";
import { Curve } from "./curve";
import { getCurves } from "./get-curves";

export interface RingProgressProps {
  /** Label displayed in the center of the ring */
  label?: string;
  labelFontSize?: string;
  rootColor?: string;

  /** Ring thickness */
  thickness?: number;

  /** Width and height of the progress ring in px */
  size?: number;

  /** Sets whether the edges of the progress circle are rounded */
  roundCaps?: boolean;
  curveHasBackground?: boolean;

  /** Ring sections */
  sections: { value: number; color: string }[];
}

export default function RingProgress({
  size = 120,
  thickness = 12,
  roundCaps = false,
  sections,
  label,
  curveHasBackground = false,
  rootColor,
  labelFontSize,
}: RingProgressProps) {
  const curves = getCurves({
    size,
    thickness,
    sections,
    renderRoundedLineCaps: roundCaps,
    rootColor,
  }).map((curve, index) => (
    <Curve
      key={index}
      value={curve.data?.value}
      size={size}
      thickness={thickness}
      sum={curve.sum}
      offset={curve.offset}
      color={curve.data?.color}
      curveHasBackground={curveHasBackground}
      root={curve.root}
      lineRoundCaps={curve.lineRoundCaps}
    />
  ));

  return (
    <div
      className="relative flex items-center justify-center"
      style={{
        width: size,
        height: size,
      }}
    >
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        {curves}
      </svg>
      <div
        className="absolute flex justify-center font-medium"
        style={{
          right: thickness * 2,
          left: thickness * 2,
          color: !curveHasBackground ? "#2563eb" : "",
          fontSize: labelFontSize,
        }}
      >
        {label}
      </div>
    </div>
  );
}
