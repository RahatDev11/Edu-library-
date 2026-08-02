import React from "react";
import logoImg from "../assets/logo.jpg";

interface EduLogoProps {
  variant?: "full" | "icon" | "horizontal";
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  showSubtitle?: boolean;
}

export const EduLogo: React.FC<EduLogoProps> = ({
  variant = "horizontal",
  size = "md",
  className = "",
  showSubtitle = true,
}) => {
  // Size mapping
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-16 h-16",
    xl: "w-24 h-24",
  };

  const imgSizeClass = sizeClasses[size] || sizeClasses.md;

  const handleImgError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.currentTarget;
    if (target.src.includes("logo.png")) {
      target.src = "/logo.jpg";
    } else if (target.src.includes("logo.jpg")) {
      target.src = logoImg;
    }
  };

  if (variant === "icon") {
    return (
      <div className={`relative flex items-center justify-center shrink-0 ${className}`}>
        <img
          src="/logo.png"
          alt="Edu Library Logo"
          onError={handleImgError}
          className={`${imgSizeClass} object-cover rounded-xl shadow-md border border-slate-200/50 dark:border-slate-800/80 bg-white`}
        />
      </div>
    );
  }

  if (variant === "full") {
    return (
      <div className={`flex flex-col items-center text-center ${className}`}>
        <div className="relative mb-2">
          <img
            src="/logo.png"
            alt="Edu Library Logo"
            onError={handleImgError}
            className={`${sizeClasses.xl} object-cover rounded-2xl shadow-xl border border-slate-200/80 dark:border-slate-700/80 bg-white`}
          />
        </div>
        <h1 className="text-xl sm:text-2xl font-black tracking-tight">
          <span className="text-[#0d3b66] dark:text-sky-400">Edu </span>
          <span className="text-[#2e9e42] dark:text-emerald-400">Library</span>
        </h1>
        {showSubtitle && (
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-1 flex items-center space-x-1.5">
            <span>Learn</span>
            <span className="text-emerald-500 font-bold">•</span>
            <span>Share</span>
            <span className="text-emerald-500 font-bold">•</span>
            <span>Grow</span>
          </p>
        )}
      </div>
    );
  }

  // Horizontal variant (Ideal for Header)
  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      <div className="relative shrink-0">
        <img
          src="/logo.png"
          alt="Edu Library Logo"
          onError={handleImgError}
          className={`${imgSizeClass} object-cover rounded-xl shadow-md border border-slate-200/60 dark:border-slate-800 bg-white p-0.5`}
        />
      </div>
      <div>
        <div className="flex items-center space-x-1 text-base sm:text-lg font-black tracking-tight leading-none">
          <span className="text-[#0d3b66] dark:text-sky-400">Edu</span>
          <span className="text-[#2e9e42] dark:text-emerald-400">Library</span>
        </div>
        {showSubtitle && (
          <p className="text-[10px] text-slate-500 dark:text-sky-300/80 font-bold tracking-wider uppercase mt-1">
            Learn • Share • Grow
          </p>
        )}
      </div>
    </div>
  );
};

