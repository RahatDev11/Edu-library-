import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import {
  Bell,
  Trash2,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Info,
  Megaphone,
  Pin,
  Calendar,
  UserCheck,
  ShieldAlert,
} from "lucide-react";

export const NotificationsView: React.FC = () => {
  const {
    notifications,
    notices,
    markNotificationRead,
    clearAllNotifications,
    lang,
    theme,
  } = useApp();

  const [activeSubTab, setActiveSubTab] = useState<"notices" | "notifications">("notices");

  const isDark = theme === "dark";

  return (
    <div className="space-y-5 pb-20 max-w-3xl mx-auto">
      {/* Header & Sub-tab Switcher */}
      <div
        className={`rounded-2xl border p-4 sm:p-5 shadow-xl transition-colors duration-200 ${
          isDark
            ? "bg-[#121a2d] border-slate-800 text-white"
            : "bg-white border-slate-200 text-slate-900"
        }`}
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg sm:text-xl font-black flex items-center space-x-2">
              <Megaphone className="w-5 h-5 text-amber-500 animate-pulse" />
              <span>
                {lang === "bn" ? "নোটিশ বোর্ড ও নোটিফিকেশন" : "Notice Board & Notifications"}
              </span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {lang === "bn"
                ? "অফিসিয়াল নোটিশ ও আপনার অ্যাকাউন্টের গুরুত্বপূর্ণ আপডেট"
                : "Official notices and account moderation updates"}
            </p>
          </div>

          {activeSubTab === "notifications" && notifications.length > 0 && (
            <button
              onClick={clearAllNotifications}
              className="px-3 py-1.5 rounded-xl bg-rose-500/15 hover:bg-rose-500/25 text-rose-600 dark:text-rose-300 text-xs font-bold transition flex items-center space-x-1 border border-rose-500/30 shrink-0"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>{lang === "bn" ? "সব মুছুন" : "Clear All"}</span>
            </button>
          )}
        </div>

        {/* Sub-tab Pills */}
        <div className="flex items-center space-x-2 p-1 bg-slate-100 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-bold">
          <button
            onClick={() => setActiveSubTab("notices")}
            className={`flex-1 py-2 px-3 rounded-lg flex items-center justify-center space-x-2 transition ${
              activeSubTab === "notices"
                ? "bg-amber-500 text-slate-950 font-black shadow-md"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <Megaphone className="w-4 h-4" />
            <span>{lang === "bn" ? "অফিসিয়াল নোটিশ বোর্ড" : "Notice Board"}</span>
            <span
              className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                activeSubTab === "notices"
                  ? "bg-slate-950 text-amber-300"
                  : "bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
              }`}
            >
              {notices.length}
            </span>
          </button>

          <button
            onClick={() => setActiveSubTab("notifications")}
            className={`flex-1 py-2 px-3 rounded-lg flex items-center justify-center space-x-2 transition ${
              activeSubTab === "notifications"
                ? "bg-sky-500 text-white font-black shadow-md"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <Bell className="w-4 h-4" />
            <span>{lang === "bn" ? "ব্যক্তিগত নোটিফিকেশন" : "Notifications"}</span>
            {notifications.filter((n) => !n.read).length > 0 && (
              <span className="px-2 py-0.5 rounded-full text-[10px] bg-rose-500 text-white font-black animate-bounce">
                {notifications.filter((n) => !n.read).length}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* SUB TAB 1: OFFICIAL NOTICE BOARD */}
      {activeSubTab === "notices" && (
        <div className="space-y-3.5">
          {notices.length === 0 ? (
            <div
              className={`rounded-2xl border p-10 text-center space-y-3 shadow-xl ${
                isDark ? "bg-[#121a2d] border-slate-800" : "bg-white border-slate-200"
              }`}
            >
              <Megaphone className="w-12 h-12 text-slate-400 dark:text-slate-600 mx-auto" />
              <h3 className="font-bold text-base text-slate-800 dark:text-white">
                {lang === "bn" ? "কোনো নোটিশ প্রকাশ করা হয়নি" : "No Notices Available"}
              </h3>
            </div>
          ) : (
            notices.map((notice) => {
              const title = lang === "bn" ? notice.titleBn || notice.title : notice.title;
              const desc = lang === "bn" ? notice.descriptionBn || notice.description : notice.description;

              return (
                <div
                  key={notice.id}
                  className={`rounded-2xl border p-4 sm:p-5 shadow-lg transition duration-200 relative overflow-hidden ${
                    notice.pinned
                      ? isDark
                        ? "bg-[#162238] border-amber-500/50"
                        : "bg-amber-50/80 border-amber-300"
                      : isDark
                      ? "bg-[#121a2d] border-slate-800"
                      : "bg-white border-slate-200"
                  }`}
                >
                  {/* Decorative top accent for pinned */}
                  {notice.pinned && (
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-400" />
                  )}

                  <div className="flex items-start justify-between gap-3 mb-2.5">
                    <div className="flex items-center space-x-2 flex-wrap gap-y-1">
                      {notice.pinned && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs bg-amber-500 text-slate-950 font-black shadow-sm">
                          <Pin className="w-3.5 h-3.5 mr-1" />
                          {lang === "bn" ? "পিন করা নোটিশ" : "Pinned Notice"}
                        </span>
                      )}

                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${
                          notice.priority === "high"
                            ? "bg-rose-500/20 text-rose-600 dark:text-rose-300 border border-rose-500/30"
                            : "bg-sky-500/20 text-sky-600 dark:text-sky-300 border border-sky-500/30"
                        }`}
                      >
                        <ShieldAlert className="w-3 h-3 mr-1" />
                        {notice.priority === "high"
                          ? lang === "bn"
                            ? "জরুরি"
                            : "High Priority"
                          : lang === "bn"
                          ? "সাধারণ"
                          : "General"}
                      </span>
                    </div>

                    <div className="flex items-center space-x-1 text-xs text-slate-500 dark:text-slate-400 font-mono shrink-0">
                      <Calendar className="w-3.5 h-3.5 text-amber-500" />
                      <span>{notice.publishDate}</span>
                    </div>
                  </div>

                  <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white mb-2 leading-snug">
                    {title}
                  </h3>

                  <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line bg-slate-50/60 dark:bg-slate-900/40 p-3 rounded-xl border border-slate-200/60 dark:border-slate-800/60">
                    {desc}
                  </div>

                  <div className="mt-3 pt-2 border-t border-slate-200/50 dark:border-slate-800/50 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                    <span className="flex items-center space-x-1">
                      <UserCheck className="w-3.5 h-3.5 text-emerald-500" />
                      <span>
                        {lang === "bn"
                          ? `প্রকাশক: ${notice.createdBy}`
                          : `Published by: ${notice.createdBy}`}
                      </span>
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}

      {/* SUB TAB 2: PERSONAL NOTIFICATIONS */}
      {activeSubTab === "notifications" && (
        <div>
          {notifications.length === 0 ? (
            <div
              className={`rounded-2xl border p-10 text-center space-y-3 shadow-xl ${
                isDark ? "bg-[#121a2d] border-slate-800" : "bg-white border-slate-200"
              }`}
            >
              <Bell className="w-12 h-12 text-slate-400 dark:text-slate-600 mx-auto" />
              <h3 className="font-bold text-slate-800 dark:text-white text-base">
                {lang === "bn" ? "কোনো নতুন বিজ্ঞপ্তি নেই" : "No Notifications Found"}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {lang === "bn"
                  ? "মডারেশন আপডেট বা সিস্টেম নোটিশ আসলে এখানে দেখতে পাবেন।"
                  : "Updates regarding your account will appear here."}
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {notifications.map((n) => {
                const getIcon = () => {
                  if (n.type === "approval") return <CheckCircle2 className="w-5 h-5 text-emerald-500" />;
                  if (n.type === "rejection") return <XCircle className="w-5 h-5 text-rose-500" />;
                  if (n.type === "warning") return <AlertTriangle className="w-5 h-5 text-amber-500" />;
                  return <Info className="w-5 h-5 text-sky-500" />;
                };

                return (
                  <div
                    key={n.id}
                    onClick={() => markNotificationRead(n.id)}
                    className={`rounded-2xl border p-4 shadow-lg transition flex items-start space-x-3 cursor-pointer ${
                      n.read
                        ? isDark
                          ? "bg-[#121a2d] border-slate-800 text-slate-300"
                          : "bg-white border-slate-200 text-slate-700"
                        : isDark
                        ? "bg-[#16213a] border-sky-500/40 text-white font-medium"
                        : "bg-sky-50/80 border-sky-300 text-slate-900 font-medium"
                    }`}
                  >
                    <div className="shrink-0 mt-0.5">{getIcon()}</div>
                    <div className="flex-1 min-w-0 text-xs sm:text-sm">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-slate-900 dark:text-white">{n.title}</span>
                        <span className="text-[10px] text-slate-500 dark:text-slate-400">{n.date}</span>
                      </div>
                      <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{n.message}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

