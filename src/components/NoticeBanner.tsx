import React from "react";
import { useApp } from "../context/AppContext";
import { Megaphone, Pin } from "lucide-react";

export const NoticeBanner: React.FC = () => {
  const { notices, lang, theme } = useApp();

  const activeNotice = notices.find((n) => n.pinned) || notices[0];

  if (!activeNotice) return null;

  const noticeTitle = lang === "bn" ? activeNotice.titleBn || activeNotice.title : activeNotice.title;
  const noticeDesc = lang === "bn" ? activeNotice.descriptionBn || activeNotice.description : activeNotice.description;

  return (
    <div
      className={`border rounded-2xl p-3 sm:p-4 shadow-lg flex items-center space-x-3 overflow-hidden my-1.5 transition-colors duration-200 ${
        theme === "dark"
          ? "bg-[#121a2d] border-amber-500/40 text-amber-200"
          : "bg-amber-500/15 border-amber-300 text-amber-950"
      }`}
    >
      {/* Fixed Notice Label Badge */}
      <div className="flex items-center space-x-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black text-xs sm:text-sm shrink-0 shadow-md">
        <Megaphone className="w-4 h-4 sm:w-5 sm:h-5 animate-bounce" />
        <span>{lang === "bn" ? "নোটিশ" : "Notice"}</span>
      </div>

      {/* Marquee Ticker Container */}
      <div className="relative flex-1 overflow-hidden whitespace-nowrap mask-linear-fade">
        <div className="inline-block animate-marquee hover:[animation-play-state:paused] whitespace-nowrap">
          <span
            className={`inline-flex items-center space-x-3 text-sm sm:text-base md:text-lg font-bold pr-14 ${
              theme === "dark" ? "text-amber-200" : "text-amber-950"
            }`}
          >
            {activeNotice.pinned && (
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-amber-500 text-slate-950 font-black">
                <Pin className="w-3.5 h-3.5 mr-1" />
                {lang === "bn" ? "পিন করা" : "Pinned"}
              </span>
            )}
            <span className={`font-black ${theme === "dark" ? "text-amber-300" : "text-amber-700"}`}>[{activeNotice.publishDate}]</span>
            <span className={`font-black ${theme === "dark" ? "text-white" : "text-slate-900"}`}>{noticeTitle}:</span>
            <span className={theme === "dark" ? "text-amber-100" : "text-slate-900"}>{noticeDesc}</span>
          </span>

          {/* Repeat for continuous loop effect */}
          <span
            className={`inline-flex items-center space-x-3 text-sm sm:text-base md:text-lg font-bold pr-14 ${
              theme === "dark" ? "text-amber-200" : "text-amber-950"
            }`}
          >
            {activeNotice.pinned && (
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-amber-500 text-slate-950 font-black">
                <Pin className="w-3.5 h-3.5 mr-1" />
                {lang === "bn" ? "পিন করা" : "Pinned"}
              </span>
            )}
            <span className={`font-black ${theme === "dark" ? "text-amber-300" : "text-amber-700"}`}>[{activeNotice.publishDate}]</span>
            <span className={`font-black ${theme === "dark" ? "text-white" : "text-slate-900"}`}>{noticeTitle}:</span>
            <span className={theme === "dark" ? "text-amber-100" : "text-slate-900"}>{noticeDesc}</span>
          </span>
        </div>
      </div>
    </div>
  );
};

