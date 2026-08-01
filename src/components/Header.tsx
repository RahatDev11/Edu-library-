import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import {
  Bell,
  Globe,
  Trash2,
  X,
  BookOpen,
  UserCheck,
  Check,
  ShieldAlert,
  User,
} from "lucide-react";

interface HeaderProps {
  onOpenAuthModal?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenAuthModal }) => {
  const {
    lang,
    setLanguage,
    theme,
    notifications,
    markNotificationRead,
    clearAllNotifications,
  } = useApp();

  const [showNotifDrawer, setShowNotifDrawer] = useState(false);

  const unreadNotifCount = notifications.filter((n) => !n.read).length;

  return (
    <header
      className={`sticky top-0 z-30 backdrop-blur-md border-b transition-colors duration-200 shadow-lg px-4 sm:px-6 py-3 ${
        theme === "dark"
          ? "bg-[#0d1424]/90 border-slate-800/90 text-white"
          : "bg-white/95 border-slate-200 text-slate-900"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Website Logo & Name */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-sky-500 to-blue-600 flex items-center justify-center text-white shadow-md shadow-sky-500/20 shrink-0">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h1
              className={`text-base sm:text-lg font-black tracking-tight flex items-center space-x-1.5 ${
                theme === "dark" ? "text-white" : "text-slate-900"
              }`}
            >
              <span>{lang === "bn" ? "এডু লাইব্রেরি" : "Edu Library"}</span>
            </h1>
            <p className="text-[10px] text-sky-500 dark:text-sky-400 font-semibold tracking-wider uppercase">
              {lang === "bn" ? "অফিশিয়াল সাজেশন পোর্টাল" : "Official Suggestion Portal"}
            </p>
          </div>
        </div>

        {/* Action Controls: Language Switcher, User Auth, Notification Bell */}
        <div className="flex items-center space-x-2.5">
          
          {/* Firebase Auth Account Button */}
          <button
            onClick={onOpenAuthModal}
            className={`p-2 rounded-xl transition border flex items-center space-x-1.5 ${
              theme === "dark"
                ? "bg-sky-500/15 hover:bg-sky-500/25 text-sky-400 border-sky-500/30"
                : "bg-sky-50 hover:bg-sky-100 text-sky-700 border-sky-200"
            }`}
            title="Account Login"
          >
            <User className="w-4 h-4" />
            <span className="hidden sm:inline text-xs font-bold">
              {lang === "bn" ? "অ্যাকাউন্ট" : "Account"}
            </span>
          </button>

          {/* Language Toggle Button */}
          <button
            onClick={() => setLanguage(lang === "bn" ? "en" : "bn")}
            className={`flex items-center space-x-1 px-3 py-2 rounded-xl text-xs font-bold transition border ${
              theme === "dark"
                ? "bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 border-slate-700/60"
                : "bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-200"
            }`}
            title="Switch Language"
          >
            <Globe className="w-3.5 h-3.5 text-sky-500" />
            <span>{lang === "bn" ? "English" : "বাংলা"}</span>
          </button>

          {/* Notifications Bell */}
          <div className="relative">
            <button
              onClick={() => setShowNotifDrawer(!showNotifDrawer)}
              className={`p-2 rounded-xl transition relative border ${
                theme === "dark"
                  ? "bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 border-slate-700/60"
                  : "bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-200"
              }`}
              title="Notifications"
            >
              <Bell className="w-4 h-4 text-sky-500" />
              {unreadNotifCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center ring-2 ring-[#0d1424]">
                  {unreadNotifCount}
                </span>
              )}
            </button>

            {/* Notification Drawer */}
            {showNotifDrawer && (
              <div
                className={`absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl shadow-2xl border z-50 p-4 ${
                  theme === "dark"
                    ? "bg-[#121a2d] border-slate-700 text-slate-100"
                    : "bg-white border-slate-200 text-slate-900"
                }`}
              >
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center space-x-2">
                    <Bell className="w-4 h-4 text-sky-400" />
                    <h3 className="font-bold text-sm text-white">
                      {lang === "bn" ? "বিজ্ঞপ্তি" : "Notifications"}
                    </h3>
                  </div>
                  <div className="flex items-center space-x-2">
                    {notifications.length > 0 && (
                      <button
                        onClick={clearAllNotifications}
                        className="text-[11px] text-rose-400 hover:underline flex items-center space-x-1"
                      >
                        <Trash2 className="w-3 h-3" />
                        <span>{lang === "bn" ? "সব মুছুন" : "Clear"}</span>
                      </button>
                    )}
                    <button
                      onClick={() => setShowNotifDrawer(false)}
                      className="p-1 text-slate-400 hover:text-white"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="mt-3 max-h-80 overflow-y-auto space-y-2 pr-1">
                  {notifications.length === 0 ? (
                    <div className="text-center py-8 text-slate-500 text-xs">
                      {lang === "bn" ? "কোনো নতুন বিজ্ঞপ্তি নেই।" : "No notifications yet."}
                    </div>
                  ) : (
                    notifications.map((n) => (
                      <div
                        key={n.id}
                        onClick={() => markNotificationRead(n.id)}
                        className={`p-3 rounded-xl border text-xs cursor-pointer transition ${
                          n.read
                            ? "bg-slate-800/40 border-slate-800 text-slate-400"
                            : "bg-sky-500/15 border-sky-500/40 text-sky-100 font-medium"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-bold text-white">{n.title}</span>
                          <span className="text-[10px] text-slate-400">{n.date}</span>
                        </div>
                        <p className="text-slate-300 leading-relaxed">{n.message}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </header>
  );
};


