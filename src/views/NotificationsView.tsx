import React from "react";
import { useApp } from "../context/AppContext";
import {
  Bell,
  Trash2,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Info,
} from "lucide-react";

export const NotificationsView: React.FC = () => {
  const { notifications, markNotificationRead, clearAllNotifications, lang } = useApp();

  return (
    <div className="space-y-6 pb-20 max-w-3xl mx-auto">
      
      <div className="bg-[#121a2d] rounded-2xl border border-slate-800 p-5 shadow-xl flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center">
            <Bell className="w-5 h-5 mr-2 text-sky-400" />
            {lang === "bn" ? "নোটিফিকেশন সেন্টার" : "Notifications Center"}
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            {lang === "bn"
              ? "আপলোড অনুমোদন, রিজেকশন ও সিস্টেম বার্তা"
              : "Updates regarding your uploads and announcements"}
          </p>
        </div>

        {notifications.length > 0 && (
          <button
            onClick={clearAllNotifications}
            className="px-3 py-1.5 rounded-xl bg-rose-500/15 hover:bg-rose-500/25 text-rose-300 text-xs font-bold transition flex items-center space-x-1 border border-rose-500/30"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>{lang === "bn" ? "সব মুছুন" : "Clear All"}</span>
          </button>
        )}
      </div>

      {notifications.length === 0 ? (
        <div className="bg-[#121a2d] rounded-2xl border border-slate-800 p-10 text-center space-y-3 shadow-xl">
          <Bell className="w-12 h-12 text-slate-600 mx-auto" />
          <h3 className="font-bold text-white text-base">
            {lang === "bn" ? "কোনো নতুন বিজ্ঞপ্তি নেই" : "No Notifications Found"}
          </h3>
          <p className="text-xs text-slate-400">
            {lang === "bn"
              ? "মডারেশন আপডেট বা সিস্টেম নোটিশ আসলে এখানে দেখতে পাবেন।"
              : "Updates regarding your account will appear here."}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {notifications.map((n) => {
            const getIcon = () => {
              if (n.type === "approval") return <CheckCircle2 className="w-5 h-5 text-emerald-400" />;
              if (n.type === "rejection") return <XCircle className="w-5 h-5 text-rose-400" />;
              if (n.type === "warning") return <AlertTriangle className="w-5 h-5 text-amber-400" />;
              return <Info className="w-5 h-5 text-sky-400" />;
            };

            return (
              <div
                key={n.id}
                onClick={() => markNotificationRead(n.id)}
                className={`rounded-2xl border p-4 shadow-lg transition flex items-start space-x-3 cursor-pointer ${
                  n.read
                    ? "bg-[#121a2d] border-slate-800 text-slate-300"
                    : "bg-[#16213a] border-sky-500/40 text-white font-medium"
                }`}
              >
                <div className="shrink-0 mt-0.5">{getIcon()}</div>
                <div className="flex-1 min-w-0 text-xs sm:text-sm">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-white">{n.title}</span>
                    <span className="text-[10px] text-slate-400">{n.date}</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed">{n.message}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};

