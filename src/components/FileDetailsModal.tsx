import React, { useState } from "react";
import { EduFile } from "../types";
import { useApp } from "../context/AppContext";
import {
  X,
  Download,
  Flag,
  FileText,
  UserCheck,
  Calendar,
  Eye,
  BookOpen,
  AlertTriangle,
} from "lucide-react";

interface FileDetailsModalProps {
  file: EduFile | null;
  onClose: () => void;
  onOpenPdfReader: (file: EduFile) => void;
}

export const FileDetailsModal: React.FC<FileDetailsModalProps> = ({
  file,
  onClose,
  onOpenPdfReader,
}) => {
  const { downloadFile, reportFile, lang } = useApp();

  const [activeScreenshot, setActiveScreenshot] = useState<number>(0);
  const [showReportForm, setShowReportForm] = useState<boolean>(false);
  const [reportType, setReportType] = useState<"copyright" | "inappropriate" | "broken" | "wrong_category" | "other">("copyright");
  const [reportMsg, setReportMsg] = useState<string>("");
  const [reportSubmitted, setReportSubmitted] = useState<boolean>(false);

  if (!file) return null;

  const handleDownload = () => {
    downloadFile(file);
  };

  const handleSendReport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reportMsg) return;
    reportFile(file.id, reportType, reportMsg);
    setReportSubmitted(true);
    setTimeout(() => {
      setShowReportForm(false);
      setReportSubmitted(false);
      setReportMsg("");
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-auto max-h-[90vh] flex flex-col">
        
        {/* Modal Header */}
        <div className="bg-emerald-800 text-white p-4 sm:p-5 flex items-start justify-between">
          <div>
            <div className="text-xs font-semibold text-emerald-200 flex items-center space-x-1 mb-1">
              <span>{file.levelName}</span>
              <span>•</span>
              <span>{file.deptName}</span>
              <span>•</span>
              <span>{file.subjectName}</span>
            </div>
            <h2 className="text-base sm:text-lg font-bold pr-6 line-clamp-2">
              {file.title}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-emerald-700/80 hover:bg-emerald-600 text-white shrink-0 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content Scrollable Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1">
          
          {/* Screenshot Gallery */}
          {file.screenshots && file.screenshots.length > 0 && (
            <div className="space-y-3">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center">
                <Eye className="w-4 h-4 mr-1 text-emerald-700" />
                {lang === "bn" ? "ফাইলের স্ক্রিনশট প্রিভিউ (১–৫ টি)" : "Screenshot Previews"}
              </p>
              
              {/* Main Active Screenshot */}
              <div className="bg-slate-900 rounded-2xl overflow-hidden aspect-video relative flex items-center justify-center border border-slate-200">
                <img
                  src={file.screenshots[activeScreenshot]}
                  alt="Screenshot Preview"
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Thumbnails list */}
              {file.screenshots.length > 1 && (
                <div className="flex space-x-2 overflow-x-auto pb-1">
                  {file.screenshots.map((shot, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveScreenshot(idx)}
                      className={`w-16 h-12 rounded-lg overflow-hidden border-2 shrink-0 transition ${
                        activeScreenshot === idx
                          ? "border-emerald-600 ring-2 ring-emerald-600/30"
                          : "border-slate-200 opacity-60 hover:opacity-100"
                      }`}
                    >
                      <img
                        src={shot}
                        alt={`Thumb ${idx}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Description & Summary */}
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 flex items-center">
                <FileText className="w-4 h-4 mr-1.5 text-emerald-700" />
                {lang === "bn" ? "ফাইলের বিস্তারিত বিবরণ" : "Description & Summary"}
              </h3>
            </div>

            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line">
              {file.description}
            </p>

            {/* Meta statistics & P2P Seeder Network info */}
            <div className="pt-3 border-t border-slate-200/60 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-slate-600">
              <div>
                <span className="text-slate-400 block text-[10px]">
                  {lang === "bn" ? "আপলোড করেছেন" : "Uploaded By"}
                </span>
                <span className="font-semibold text-slate-900 flex items-center">
                  <UserCheck className="w-3.5 h-3.5 mr-1 text-emerald-600" />
                  {file.uploadedByUserName}
                </span>
              </div>

              <div>
                <span className="text-slate-400 block text-[10px]">
                  {lang === "bn" ? "তারিখ" : "Upload Date"}
                </span>
                <span className="font-semibold text-slate-900 flex items-center">
                  <Calendar className="w-3.5 h-3.5 mr-1 text-slate-500" />
                  {file.uploadDate}
                </span>
              </div>

              <div>
                <span className="text-slate-400 block text-[10px]">
                  {lang === "bn" ? "ফাইল সাইজ" : "File Size"}
                </span>
                <span className="font-semibold text-slate-900">{file.fileSize}</span>
              </div>

              <div>
                <span className="text-slate-400 block text-[10px]">
                  {lang === "bn" ? "P2P সিডার (অনলাইন শিক্ষার্থী)" : "P2P Student Seeders"}
                </span>
                <span className="font-bold text-emerald-700 flex items-center">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 mr-1.5 animate-pulse"></span>
                  {lang === "bn" ? "৪ জন অনলাইন সিডার" : "4 Active Student Seeders"}
                </span>
              </div>
            </div>
          </div>

          {/* Report Modal Section */}
          {showReportForm && (
            <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4 text-xs space-y-3">
              <div className="flex items-center justify-between text-rose-900 font-bold">
                <span className="flex items-center">
                  <AlertTriangle className="w-4 h-4 mr-1 text-rose-600" />
                  {lang === "bn" ? "ফাইলটি রিপোর্ট করুন" : "Report Inappropriate File"}
                </span>
                <button
                  onClick={() => setShowReportForm(false)}
                  className="text-rose-600 hover:underline"
                >
                  {lang === "bn" ? "বাতিল" : "Cancel"}
                </button>
              </div>

              {reportSubmitted ? (
                <p className="text-emerald-700 font-bold py-2">
                  ✓ {lang === "bn" ? "আপনার রিপোর্ট জমা হয়েছে। মডারেটর খতিয়ে দেখবে।" : "Report submitted to moderators."}
                </p>
              ) : (
                <form onSubmit={handleSendReport} className="space-y-3">
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">
                      {lang === "bn" ? "রিপোর্টের কারণ" : "Reason"}
                    </label>
                    <select
                      value={reportType}
                      onChange={(e) => setReportType(e.target.value as any)}
                      className="w-full rounded-xl border border-rose-300 p-2 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-rose-400"
                    >
                      <option value="copyright">Copyright Issue / Piracy</option>
                      <option value="inappropriate">Inappropriate / Non-Educational Content</option>
                      <option value="broken">Corrupted / Unreadable PDF</option>
                      <option value="wrong_category">Wrong Category / Subject</option>
                      <option value="other">Other Reason</option>
                    </select>
                  </div>

                  <div>
                    <textarea
                      value={reportMsg}
                      onChange={(e) => setReportMsg(e.target.value)}
                      placeholder={
                        lang === "bn"
                          ? "বিস্তারিত লিখুন কীভাবে ফাইলটি অসামঞ্জস্যপূর্ণ..."
                          : "Describe the issue..."
                      }
                      rows={2}
                      className="w-full rounded-xl border border-rose-300 p-2 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-rose-400"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl transition"
                  >
                    {lang === "bn" ? "রিপোর্ট জমা দিন" : "Submit Report"}
                  </button>
                </form>
              )}
            </div>
          )}

        </div>

        {/* Modal Footer Controls */}
        <div className="p-4 bg-slate-100 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
          
          <button
            onClick={() => setShowReportForm(!showReportForm)}
            className="flex items-center space-x-1 px-3 py-2 rounded-xl bg-white hover:bg-rose-50 text-rose-600 border border-rose-200 text-xs font-semibold transition"
          >
            <Flag className="w-3.5 h-3.5" />
            <span>{lang === "bn" ? "রিপোর্ট করুন" : "Report File"}</span>
          </button>

          <div className="flex items-center space-x-2">
            
            {/* Open Reader Simulation Button */}
            <button
              onClick={() => {
                onClose();
                onOpenPdfReader(file);
              }}
              className="flex items-center space-x-1 px-4 py-2.5 rounded-xl bg-emerald-100 hover:bg-emerald-200 text-emerald-900 text-xs font-bold transition"
            >
              <BookOpen className="w-4 h-4 text-emerald-800" />
              <span>{lang === "bn" ? "সরাসরি পড়ুন" : "Open Reader"}</span>
            </button>

            {/* Direct Download Button */}
            <button
              onClick={handleDownload}
              className="flex items-center space-x-1.5 px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition shadow"
            >
              <Download className="w-4 h-4" />
              <span>{lang === "bn" ? "ফাইল ডাউনলোড করুন" : "Download File"}</span>
            </button>

          </div>
        </div>

      </div>
    </div>
  );
};
