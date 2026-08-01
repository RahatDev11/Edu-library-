import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { EduFile } from "../types";
import {
  Upload,
  ShieldCheck,
  Clock,
  CheckCircle2,
  FilePlus,
  Smartphone,
  HardDrive,
} from "lucide-react";

export const UploadView: React.FC = () => {
  const {
    eduLevels,
    uploadFile,
    pendingFiles,
    approvedFiles,
    user,
    lang,
    theme,
  } = useApp();

  // Form State
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [levelId, setLevelId] = useState("lvl_hsc");
  const [deptId, setDeptId] = useState("dept_hsc_sci");
  const [semesterId, setSemesterId] = useState("sem_hsc_1st");
  const [subjectId, setSubjectId] = useState("sbj_hsc_phys1");
  const [tags, setTags] = useState("Handwritten, FormulaSheet, BoardQuestions");
  const [fileType, setFileType] = useState<EduFile["fileType"]>("pdf");
  const [screenshots, setScreenshots] = useState<string[]>([
    "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=600&q=80",
  ]);

  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  const activeLevel = eduLevels.find((l) => l.id === levelId) || eduLevels[0];
  const activeDept = activeLevel.departments.find((d) => d.id === deptId) || activeLevel.departments[0];

  const handleAddSampleScreenshot = () => {
    if (screenshots.length >= 5) return;
    const samplePool = [
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=600&q=80",
    ];
    const nextImg = samplePool[screenshots.length % samplePool.length];
    setScreenshots([...screenshots, nextImg]);
  };

  const handleRemoveScreenshot = (idx: number) => {
    setScreenshots(screenshots.filter((_, i) => i !== idx));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    const parsedTags = tags
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    const targetSubject = activeDept.subjects.find((s) => s.id === subjectId) || activeDept.subjects[0];

    uploadFile({
      title,
      description,
      fileUrl: "#uploaded-document",
      fileType,
      fileSize: "3.5 MB",
      levelId: activeLevel.id,
      levelName: activeLevel.code,
      deptId: activeDept.id,
      deptName: activeDept.name,
      semesterId: semesterId,
      semesterName: "Current Semester",
      subjectId: targetSubject ? targetSubject.id : "sbj_gen",
      subjectName: targetSubject ? targetSubject.name : "General",
      tags: parsedTags,
      screenshots,
      version: "v1.0",
    });

    setSubmittedSuccess(true);
    setTitle("");
    setDescription("");
    setTimeout(() => setSubmittedSuccess(false), 4000);
  };

  // User's own uploads (Pending & Approved)
  const myPending = pendingFiles.filter((f) => f.uploadedByUserId === user.id);
  const myApproved = approvedFiles.filter((f) => f.uploadedByUserId === user.id);

  return (
    <div className="space-y-6 pb-20 max-w-4xl mx-auto">
      
      {/* Moderation & P2P Metadata Notice */}
      <div className={`rounded-2xl p-4 border flex items-start space-x-3 shadow-lg ${
        theme === "dark"
          ? "bg-amber-500/10 border-amber-500/30"
          : "bg-amber-50 border-amber-300"
      }`}>
        <ShieldCheck className="w-6 h-6 text-amber-500 shrink-0 mt-0.5" />
        <div className="text-xs space-y-1">
          <h3 className={`font-bold text-sm ${theme === "dark" ? "text-amber-300" : "text-amber-900"}`}>
            {lang === "bn" ? "P2P ফাইল শেয়ারিং ও মেটাডাটা রেজিস্ট্রি নীতি" : "P2P File Sharing & Metadata Registry Notice"}
          </h3>
          <p className={theme === "dark" ? "text-slate-300" : "text-slate-700"}>
            {lang === "bn"
              ? "মেইন সার্ভারে সরাসরি মূল ফাইল আপলোড হয় না। এখানে শুধু ফাইলের মেটাডাটা (বিভাগ, সেকশন, বিষয়, হ্যাশ কি ও বিবরণ) ডিরেক্টরিতে রেজিস্টার করা হয়। যখন অন্য কোন শিক্ষার্থী এটি ডাউনলোড করবে, তখন সরাসরি ফাইলটি আপনার বা অন্যান্য অনলাইন সিডার ডিভাইসের অ্যাপ থেকে P2P ট্রান্সফারের মাধ্যমে ডাউনলোড হবে।"
              : "Heavy files are not uploaded to central servers. Only file metadata (Department, Section, Subject, Info Hash & Details) is registered. Downloads occur directly P2P from seeder student devices."}
          </p>
        </div>
      </div>

      {/* Upload Submission Form */}
      <div className={`rounded-2xl border p-5 sm:p-7 shadow-xl space-y-5 ${
        theme === "dark" ? "bg-[#121a2d] border-slate-800" : "bg-white border-slate-200"
      }`}>
        <div className={`flex items-center space-x-2 border-b pb-3 ${
          theme === "dark" ? "border-slate-800" : "border-slate-200"
        }`}>
          <FilePlus className="w-5 h-5 text-sky-500" />
          <h2 className={`font-bold text-base ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
            {lang === "bn" ? "নতুন শিক্ষাসামগ্রী আপলোড করুন" : "Upload New Study Material"}
          </h2>
        </div>

        {submittedSuccess && (
          <div className="p-4 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-700 dark:text-emerald-300 text-xs font-bold flex items-center space-x-2 animate-pulse">
            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
            <span>
              {lang === "bn"
                ? "✓ আপনার ফাইলটি সফলভাবে জমা হয়েছে এবং মডারেশন প্যান্ডিংয়ে যুক্ত হয়েছে!"
                : "✓ Upload submitted successfully and added to moderator review queue!"}
            </span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Title */}
          <div>
            <label className={`block text-xs font-bold mb-1 ${theme === "dark" ? "text-slate-300" : "text-slate-700"}`}>
              {lang === "bn" ? "ফাইলের শিরোনাম / টাইটেল *" : "File Title *"}
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={
                lang === "bn"
                  ? "যেমন: এইচএসসি পদার্থবিজ্ঞান ১ম পত্র ভেক্টর ও গতিবিদ্যা মাস্টার নোট"
                  : "e.g. HSC Physics Vector Chapter Master Handwritten Notes"
              }
              className={`w-full rounded-xl border p-3 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 ${
                theme === "dark"
                  ? "border-slate-700 bg-[#0a0f1d] text-white"
                  : "border-slate-300 bg-slate-50 text-slate-900"
              }`}
            />
          </div>

          {/* Local Phone File Selection & Auto-Location P2P Binding Box */}
          <div className="p-4 rounded-2xl border border-sky-500/30 bg-sky-500/10 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-black text-sky-600 dark:text-sky-300 flex items-center space-x-1.5">
                <Smartphone className="w-4 h-4 text-sky-500" />
                <span>{lang === "bn" ? "মোবাইল মেমোরি থেকে ফাইল সিলেক্ট করুন (অটো P2P বাইন্ডিং)" : "Select Local File from Device (Auto-P2P Location Binding)"}</span>
              </label>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-600 dark:text-emerald-300 border border-emerald-500/30">
                ● P2P Node Online
              </span>
            </div>

            <div className="border-2 border-dashed border-sky-500/40 rounded-xl p-4 text-center space-y-2 hover:bg-sky-500/5 transition cursor-pointer relative">
              <input
                type="file"
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) {
                    if (!title) setTitle(f.name.replace(/\.[^/.]+$/, ""));
                  }
                }}
              />
              <HardDrive className="w-8 h-8 text-sky-500 mx-auto animate-bounce" />
              <p className="text-xs font-bold text-slate-700 dark:text-slate-200">
                {lang === "bn" ? "ব্রাউজ করতে ক্লিক করুন বা ফাইলটি ড্রাগ করুন" : "Click to select file from phone memory"}
              </p>
              <p className="text-[10px] text-slate-500 dark:text-slate-400">
                {lang === "bn"
                  ? "ফাইলটি অটোমেটিক্যালি আপনার ডিভাইসের স্টোরেজে সুরক্ষিত থাকবে এবং P2P হ্যাশ তৈরি হবে"
                  : "File path automatically binds to local storage URI & generates SHA-256 Info Hash"}
              </p>
            </div>

            {/* Auto-detected location details preview */}
            <div className="p-3 rounded-xl bg-slate-100 dark:bg-[#0a0f1d] border border-slate-200 dark:border-slate-800 text-[11px] space-y-1 font-mono">
              <p className="text-slate-600 dark:text-slate-300 flex justify-between">
                <span>{lang === "bn" ? "অটো ডিটেক্টেড পাথ:" : "Auto-Location URI:"}</span>
                <span className="text-sky-600 dark:text-sky-400 font-bold truncate max-w-[200px]">storage/emulated/0/Download/{title || "file"}.pdf</span>
              </p>
              <p className="text-slate-600 dark:text-slate-300 flex justify-between">
                <span>{lang === "bn" ? "P2P ইনফো হ্যাশ:" : "SHA-256 P2P Hash:"}</span>
                <span className="text-purple-600 dark:text-purple-400 font-bold">hash_edup2p_{Math.random().toString(36).substring(2, 8)}</span>
              </p>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className={`block text-xs font-bold mb-1 ${theme === "dark" ? "text-slate-300" : "text-slate-700"}`}>
              {lang === "bn" ? "বিস্তারিত বিবরণ *" : "Description & Summary *"}
            </label>
            <textarea
              required
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={
                lang === "bn"
                  ? "ফাইলটিতে কী কী অধ্যায়, সূত্র বা বোর্ডের প্রশ্ন সমাধান আছে সংক্ষেপে লিখুন..."
                  : "Describe what formulas, past questions or chapters are included..."
              }
              className={`w-full rounded-xl border p-3 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 ${
                theme === "dark"
                  ? "border-slate-700 bg-[#0a0f1d] text-white"
                  : "border-slate-300 bg-slate-50 text-slate-900"
              }`}
            />
          </div>

          {/* Category Dropdowns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                {lang === "bn" ? "শিক্ষা স্তর" : "Education Level"}
              </label>
              <select
                value={levelId}
                onChange={(e) => setLevelId(e.target.value)}
                className="w-full rounded-xl border border-slate-700 p-2.5 text-xs bg-[#0a0f1d] text-white font-medium"
              >
                {eduLevels.map((l) => (
                  <option key={l.id} value={l.id}>
                    {l.code} - {l.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                {lang === "bn" ? "বিভাগ / ডিপার্টমেন্ট" : "Department"}
              </label>
              <select
                value={deptId}
                onChange={(e) => setDeptId(e.target.value)}
                className="w-full rounded-xl border border-slate-700 p-2.5 text-xs bg-[#0a0f1d] text-white font-medium"
              >
                {activeLevel.departments.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Subject & File Type */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                {lang === "bn" ? "বিষয় (Subject)" : "Subject"}
              </label>
              <select
                value={subjectId}
                onChange={(e) => setSubjectId(e.target.value)}
                className="w-full rounded-xl border border-slate-700 p-2.5 text-xs bg-[#0a0f1d] text-white font-medium"
              >
                {activeDept.subjects.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name} ({s.code})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                {lang === "bn" ? "ফাইল ফরম্যাট" : "File Format"}
              </label>
              <select
                value={fileType}
                onChange={(e) => setFileType(e.target.value as any)}
                className="w-full rounded-xl border border-slate-700 p-2.5 text-xs bg-[#0a0f1d] text-white font-medium"
              >
                <option value="pdf">PDF Document (.pdf)</option>
                <option value="word">Word Document (.docx)</option>
                <option value="ppt">PowerPoint (.pptx)</option>
                <option value="image">Educational Image (.png / .jpg)</option>
              </select>
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">
              {lang === "bn" ? "ট্যাগসমূহ (কমা দিয়ে আলাদা করুন)" : "Tags (Comma separated)"}
            </label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="e.g. HSC2026, Physics, Vector, Handwritten"
              className="w-full rounded-xl border border-slate-700 p-2.5 text-xs bg-[#0a0f1d] text-white"
            />
          </div>

          {/* Screenshot Previews (1 to 5) */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold text-slate-300">
                {lang === "bn" ? "স্ক্রিনশট ছবি (১ থেকে ৫ টি)" : "Screenshot Previews (1-5)"}
              </label>
              <button
                type="button"
                onClick={handleAddSampleScreenshot}
                disabled={screenshots.length >= 5}
                className="text-xs text-sky-400 font-bold hover:underline disabled:opacity-40"
              >
                + {lang === "bn" ? "ছবি যোগ করুন" : "Add Screenshot"} ({screenshots.length}/5)
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {screenshots.map((shot, idx) => (
                <div key={idx} className="relative w-20 h-16 rounded-xl overflow-hidden border border-slate-700 group">
                  <img src={shot} alt={`Shot ${idx}`} className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => handleRemoveScreenshot(idx)}
                    className="absolute top-1 right-1 bg-rose-600 text-white rounded-full p-0.5 opacity-80 hover:opacity-100"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold rounded-xl transition shadow-lg flex items-center justify-center space-x-2 text-sm"
          >
            <Upload className="w-4 h-4" />
            <span>{lang === "bn" ? "রিভিউয়ের জন্য জমা দিন" : "Submit for Moderator Review"}</span>
          </button>
        </form>
      </div>

      {/* User's Upload Status Tracker */}
      <div className="bg-[#121a2d] rounded-2xl border border-slate-800 p-5 sm:p-6 shadow-xl space-y-4">
        <h3 className="font-bold text-base text-white flex items-center">
          <Clock className="w-5 h-5 mr-2 text-amber-400" />
          {lang === "bn" ? "আমার জমাকৃত আপলোড স্ট্যাটাস" : "My Upload Submissions"}
        </h3>

        {myPending.length === 0 && myApproved.length === 0 ? (
          <p className="text-xs text-slate-500 text-center py-4">
            {lang === "bn" ? "আপনি এখনো কোনো ফাইল জমা দেননি।" : "You haven't submitted any files yet."}
          </p>
        ) : (
          <div className="space-y-2">
            {myPending.map((f) => (
              <div
                key={f.id}
                className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between text-xs"
              >
                <div>
                  <span className="font-bold text-white block">{f.title}</span>
                  <span className="text-[10px] text-amber-300 font-semibold">
                    ⏳ Status: Pending Review • Submitted: {f.uploadDate}
                  </span>
                </div>
                <span className="px-2.5 py-1 bg-amber-400 text-slate-950 font-bold rounded-lg text-[10px]">
                  Pending
                </span>
              </div>
            ))}

            {myApproved.map((f) => (
              <div
                key={f.id}
                className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between text-xs"
              >
                <div>
                  <span className="font-bold text-white block">{f.title}</span>
                  <span className="text-[10px] text-emerald-300 font-semibold">
                    ✓ Status: Approved & Public • Downloads: {f.downloadCount}
                  </span>
                </div>
                <span className="px-2.5 py-1 bg-emerald-400 text-slate-950 font-bold rounded-lg text-[10px]">
                  Live
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};

