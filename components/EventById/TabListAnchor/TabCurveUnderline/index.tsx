"use client";
import React from "react";

interface TabCurveUnderlineProps {
  width?: number;
  height?: number;
  strokeColor?: string;
  fillColor?: string;
  strokeWidth?: number;
  className?: string;
}

export default function TabCurveUnderline({
  width = 30,
  height = 12,
  strokeColor = "#5A7D5A",
  fillColor = "white",
  strokeWidth = 6,
  className = "",
}: TabCurveUnderlineProps) {
  const slopeWidth = width * 0.25;
  const curveRadiusX = width * 0.25;
  const curveRadiusY = height;

  return (
    <svg
      className={`pointer-events-none ${className}`}
      width={width}
      height={height}
      viewBox={`-5 -5 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* 底色填滿遮線 */}
      <path
        d={`
          M 0,${height}
          L ${slopeWidth},0
          A ${curveRadiusX},${curveRadiusY} 0 0 1 ${width - slopeWidth},0
          L ${width},${height}
          Z
        `}
        fill={fillColor}
      />
      {/* 粗框線條 */}
      <path
        d={`
          M 0,${height}
          L ${slopeWidth},0
          A ${curveRadiusX},${curveRadiusY} 0 0 1 ${width - slopeWidth},0
          L ${width},${height}
        `}
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}