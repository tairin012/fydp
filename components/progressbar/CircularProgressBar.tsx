'use client';
import React from 'react';

interface CircularProgressBarProps {
  progress: number; // value from 0 to 100
  size?: number;
  strokeWidth?: number;
  color?: string;
  trackColor?: string;
  showText?: boolean;
}

const CircularProgressBar: React.FC<CircularProgressBarProps> = ({
  progress,
  size = 140,
  strokeWidth = 12,
  color = '#1F5A75',
  trackColor = '#e6e6e6',
  showText = true,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg
        width={size}
        height={size}
        className="transform -rotate-90 drop-shadow-md"
      >
        {/* Track circle */}
        <circle
          stroke={trackColor}
          fill="transparent"
          strokeWidth={strokeWidth}
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        {/* Progress circle */}
        <circle
          stroke={color}
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          r={radius}
          cx={size / 2}
          cy={size / 2}
          className="transition-all duration-700 ease-out"
          style={{
            filter: 'drop-shadow(0 0 6px rgba(31, 90, 117, 0.5))',
          }}
        />
      </svg>

      {showText && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xl font-bold text-gray-800">{progress}%</span>
        </div>
      )}
    </div>
  );
};

export default CircularProgressBar;
