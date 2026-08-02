import React from "react";
import { useApp } from "../context/AppContext";
import { FileCard } from "../components/FileCard";
import { EduFile } from "../types";
import {
  Search,
  BookOpen,
  ChevronRight,
  ChevronLeft,
  GraduationCap,
  Award,
  Briefcase,
  FileText,
  Folder,
  ArrowRight,
  RotateCcw,
  Sparkles,
  Layers,
  Building2,
} from "lucide-react";

interface HomeViewProps {
  onSelectFile: (file: EduFile) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onSelectFile }) => {
  const {
    eduLevels,
    approvedFiles,
    selectedLevelId,
    setSelectedLevelId,
    selectedDeptId,
    setSelectedDeptId,
    selectedSemesterId,
    setSelectedSemesterId,
    selectedSubjectId,
    setSelectedSubjectId,
    lang,
    theme,
  } = useApp();

  const activeLevel = eduLevels.find((l) => l.id === selectedLevelId);
  const activeDept = activeLevel?.departments.find((d) => d.id === selectedDeptId);
  const activeSubject =
    selectedSubjectId && selectedSubjectId !== "ALL"
      ? activeDept?.subjects.find((s) => s.id === selectedSubjectId)
      : null;

  // Filter approved files based on selections
  const filteredFiles = approvedFiles.filter((file) => {
    if (selectedLevelId && file.levelId !== selectedLevelId) return false;
    if (selectedDeptId && file.deptId !== selectedDeptId) return false;
    if (selectedSemesterId && selectedSemesterId !== "ALL" && file.semesterId !== selectedSemesterId) return false;
    if (selectedSubjectId && selectedSubjectId !== "ALL" && file.subjectId !== selectedSubjectId) return false;
    return true;
  });

  const resetFilters = () => {
    setSelectedLevelId(null);
    setSelectedDeptId(null);
    setSelectedSemesterId(null);
    setSelectedSubjectId(null);
  };

  // Helper for level icons
  const getLevelIcon = (code: string) => {
    switch (code) {
      case "SSC":
        return <GraduationCap className="w-6 h-6 text-emerald-400" />;
      case "HSC":
        return <BookOpen className="w-6 h-6 text-sky-400" />;
      case "HON":
        return <Award className="w-6 h-6 text-amber-400" />;
      case "DEG":
        return <Sparkles className="w-6 h-6 text-purple-400" />;
      default:
        return <Briefcase className="w-6 h-6 text-rose-400" />;
    }
  };

  // Helper for level gradient colors
  const getLevelGradient = (code: string) => {
    if (theme === "light") {
      switch (code) {
        case "SSC":
          return "from-emerald-50 via-white to-emerald-50/50 border-emerald-200 hover:border-emerald-400";
        case "HSC":
          return "from-sky-50 via-white to-sky-50/50 border-sky-200 hover:border-sky-400";
        case "HON":
          return "from-amber-50 via-white to-amber-50/50 border-amber-200 hover:border-amber-400";
        case "DEG":
          return "from-purple-50 via-white to-purple-50/50 border-purple-200 hover:border-purple-400";
        default:
          return "from-rose-50 via-white to-rose-50/50 border-rose-200 hover:border-rose-400";
      }
    }
    switch (code) {
      case "SSC":
        return "from-emerald-950/90 via-[#121a2d] to-[#0d1424] border-emerald-500/30 hover:border-emerald-400/60";
      case "HSC":
        return "from-sky-950/90 via-[#121a2d] to-[#0d1424] border-sky-500/30 hover:border-sky-400/60";
      case "HON":
        return "from-amber-950/90 via-[#121a2d] to-[#0d1424] border-amber-500/30 hover:border-amber-400/60";
      case "DEG":
        return "from-purple-950/90 via-[#121a2d] to-[#0d1424] border-purple-500/30 hover:border-purple-400/60";
      default:
        return "from-rose-950/90 via-[#121a2d] to-[#0d1424] border-rose-500/30 hover:border-rose-400/60";
    }
  };

  return (
    <div className="space-y-4 pb-20">

      {/* Breadcrumb & Navigation Bar */}
      {(selectedLevelId || selectedDeptId || selectedSemesterId || selectedSubjectId) && (
        <div className="flex items-center justify-between p-3 rounded-2xl border shadow-md bg-white border-slate-200 text-slate-800 dark:bg-[#121a2d] dark:border-slate-800 dark:text-slate-300">
          <div className="flex items-center space-x-2 text-xs font-bold overflow-x-auto scrollbar-none py-1">
            <button
              onClick={resetFilters}
              className="hover:text-sky-500 flex items-center space-x-1 shrink-0"
            >
              <span>{lang === "bn" ? "হোম" : "Home"}</span>
            </button>

            {activeLevel && (
              <>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 shrink-0" />
                <button
                  onClick={() => {
                    setSelectedDeptId(null);
                    setSelectedSemesterId(null);
                    setSelectedSubjectId(null);
                  }}
                  className={`shrink-0 hover:text-sky-500 ${
                    !selectedDeptId ? "text-sky-500 font-extrabold" : ""
                  }`}
                >
                  {lang === "bn" ? activeLevel.nameBn : activeLevel.name}
                </button>
              </>
            )}

            {activeDept && (
              <>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 shrink-0" />
                <button
                  onClick={() => {
                    setSelectedSemesterId(null);
                    setSelectedSubjectId(null);
                  }}
                  className={`shrink-0 hover:text-sky-500 ${
                    !selectedSemesterId ? "text-sky-500 font-extrabold" : ""
                  }`}
                >
                  {lang === "bn" ? activeDept.nameBn : activeDept.name}
                </button>
              </>
            )}

            {selectedSemesterId && activeDept && (
              <>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 shrink-0" />
                <button
                  onClick={() => setSelectedSubjectId(null)}
                  className={`shrink-0 hover:text-sky-500 ${
                    !selectedSubjectId ? "text-sky-500 font-extrabold" : ""
                  }`}
                >
                  {selectedSemesterId === "ALL"
                    ? lang === "bn"
                      ? "সকল বর্ষ"
                      : "All Years"
                    : activeDept.semesters?.find((s) => s.id === selectedSemesterId)
                    ? lang === "bn"
                      ? activeDept.semesters.find((s) => s.id === selectedSemesterId)?.nameBn
                      : activeDept.semesters.find((s) => s.id === selectedSemesterId)?.name
                    : selectedSemesterId}
                </button>
              </>
            )}

            {activeSubject && (
              <>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 shrink-0" />
                <span className="text-sky-600 dark:text-sky-300 font-extrabold truncate max-w-[150px]">
                  {lang === "bn" ? activeSubject.nameBn : activeSubject.name}
                </span>
              </>
            )}
          </div>

          <button
            onClick={resetFilters}
            className="p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-rose-500 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-rose-400 transition ml-2 shrink-0 border border-slate-200 dark:border-slate-700"
            title="Reset All Filters"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* STEP-BY-STEP DRILLDOWN FLOW */}
      <div>
        {/* STEP 1: SELECT LEVEL (If no level selected) */}
        {!selectedLevelId && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white flex items-center space-x-2">
                  <Layers className="w-5 h-5 text-sky-500 dark:text-sky-400" />
                  <span>{lang === "bn" ? "কিসের সাজেশন দেখতে চান?" : "Select Level / Course"}</span>
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  {lang === "bn" ? "আপনার ক্যাটাগরি বা লেভেলে ক্লিক করুন" : "Tap on a level to view departments"}
                </p>
              </div>
            </div>

            {/* Grid of Education Levels */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {eduLevels.map((level) => {
                const gradient = getLevelGradient(level.code);
                return (
                  <div
                    key={level.id}
                    onClick={() => {
                      setSelectedLevelId(level.id);
                      setSelectedDeptId(null);
                      setSelectedSemesterId(null);
                      setSelectedSubjectId(null);
                    }}
                    className={`p-4 rounded-2xl bg-gradient-to-br ${gradient} border shadow-md hover:shadow-lg cursor-pointer hover:scale-[1.02] transition duration-200 flex items-center justify-between group relative overflow-hidden`}
                  >
                    <div className="flex items-center space-x-3.5">
                      <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700/60 shrink-0 shadow-inner">
                        {getLevelIcon(level.code)}
                      </div>
                      <div>
                        <h3 className="font-extrabold text-base text-slate-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-300 transition">
                          {lang === "bn" ? level.nameBn : level.name}
                        </h3>
                        <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                          {level.departments.length} {lang === "bn" ? "টি বিভাগ / গ্রুপ" : "Departments"}
                        </span>
                      </div>
                    </div>

                    <div className="w-8 h-8 rounded-full bg-slate-200/80 dark:bg-slate-800/90 group-hover:bg-sky-500 group-hover:text-white flex items-center justify-center text-slate-600 dark:text-slate-300 transition shrink-0">
                      <ChevronRight className="w-5 h-5" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 2: SELECT DEPARTMENT (If Level is selected, but Department is not) */}
        {selectedLevelId && !selectedDeptId && activeLevel && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white flex items-center space-x-2">
                  <Building2 className="w-5 h-5 text-sky-500 dark:text-sky-400" />
                  <span>
                    {lang === "bn"
                      ? `${activeLevel.nameBn} - বিভাগ নির্বাচন করুন`
                      : `${activeLevel.name} - Select Department`}
                  </span>
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  {lang === "bn" ? "আপনার কাঙ্ক্ষিত বিভাগে ক্লিক করুন" : "Tap department to select year"}
                </p>
              </div>

              <button
                onClick={() => setSelectedLevelId(null)}
                className="px-3 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-300 rounded-xl text-xs font-bold transition flex items-center space-x-1"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>{lang === "bn" ? "পিছনে" : "Back"}</span>
              </button>
            </div>

            {/* Grid of Departments */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {activeLevel.departments.map((dept) => (
                <div
                  key={dept.id}
                  onClick={() => {
                    setSelectedDeptId(dept.id);
                    setSelectedSemesterId(null);
                    setSelectedSubjectId(null);
                  }}
                  className="p-4 rounded-2xl bg-white dark:bg-[#121a2d] border border-slate-200 dark:border-slate-800 hover:border-sky-400 dark:hover:border-sky-500/50 shadow-md hover:shadow-lg cursor-pointer hover:scale-[1.01] transition duration-200 flex items-center justify-between group"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-sky-500/15 border border-sky-500/30 flex items-center justify-center text-sky-500 dark:text-sky-400 font-bold shrink-0">
                      <Folder className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-300 transition">
                        {lang === "bn" ? dept.nameBn : dept.name}
                      </h4>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400">
                        {dept.subjects.length} {lang === "bn" ? "টি বিষয়" : "Subjects"}
                      </span>
                    </div>
                  </div>

                  <div className="w-7 h-7 rounded-full bg-slate-100 dark:bg-slate-800 group-hover:bg-sky-500 group-hover:text-white flex items-center justify-center text-slate-500 dark:text-slate-400 transition">
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STEP 3: SELECT ACADEMIC YEAR / SEMESTER (If Department is selected, but Year is not) */}
        {selectedLevelId && selectedDeptId && !selectedSemesterId && activeDept && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white flex items-center space-x-2">
                  <GraduationCap className="w-5 h-5 text-sky-500 dark:text-sky-400" />
                  <span>
                    {lang === "bn"
                      ? `${activeDept.nameBn} - শিক্ষাবর্ষ / বর্ষ নির্বাচন করুন`
                      : `${activeDept.name} - Select Academic Year`}
                  </span>
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  {lang === "bn"
                    ? "আপনি কোন বর্ষে পড়েন? নিচে আপনার বর্ষ নির্বাচন করুন"
                    : "Which year/semester are you in? Select your academic year below"}
                </p>
              </div>

              <button
                onClick={() => setSelectedDeptId(null)}
                className="px-3 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-300 rounded-xl text-xs font-bold transition flex items-center space-x-1"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>{lang === "bn" ? "বিভাগসমূহ" : "Departments"}</span>
              </button>
            </div>

            {/* Grid of Year Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {/* Option 0: All Years Card */}
              <div
                onClick={() => {
                  setSelectedSemesterId("ALL");
                  setSelectedSubjectId(null);
                }}
                className="p-4 rounded-2xl bg-gradient-to-br from-sky-500/15 via-blue-500/5 to-transparent border border-sky-500/40 hover:border-sky-400 dark:bg-[#121a2d] shadow-md hover:shadow-lg cursor-pointer hover:scale-[1.01] transition duration-200 flex items-center justify-between group"
              >
                <div className="flex items-center space-x-3.5">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-sky-500 to-blue-600 flex items-center justify-center text-white font-black text-base shrink-0 shadow-md">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-base text-slate-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-300 transition">
                      {lang === "bn" ? "সকল বর্ষ (All Years)" : "All Years"}
                    </h4>
                    <span className="text-[11px] text-sky-600 dark:text-sky-400 font-bold">
                      {activeDept.subjects.length} {lang === "bn" ? "টি বিষয় একনজরে" : "Subjects total"}
                    </span>
                  </div>
                </div>

                <div className="w-8 h-8 rounded-full bg-sky-500 text-white flex items-center justify-center transition">
                  <ChevronRight className="w-5 h-5" />
                </div>
              </div>

              {/* Specific Year Cards */}
              {activeDept.semesters && activeDept.semesters.length > 0 ? (
                activeDept.semesters.map((sem, idx) => {
                  const semSubjectCount = activeDept.subjects.filter(
                    (s) => s.semesterId === sem.id
                  ).length;

                  return (
                    <div
                      key={sem.id}
                      onClick={() => {
                        setSelectedSemesterId(sem.id);
                        setSelectedSubjectId(null);
                      }}
                      className="p-4 rounded-2xl bg-white dark:bg-[#121a2d] border border-slate-200 dark:border-slate-800 hover:border-sky-400 dark:hover:border-sky-500/60 shadow-md hover:shadow-lg cursor-pointer hover:scale-[1.01] transition duration-200 flex items-center justify-between group"
                    >
                      <div className="flex items-center space-x-3.5">
                        <div className="w-11 h-11 rounded-xl bg-sky-500/15 border border-sky-500/30 flex items-center justify-center text-sky-600 dark:text-sky-400 font-black text-sm shrink-0">
                          {idx + 1}
                        </div>
                        <div>
                          <h4 className="font-extrabold text-base text-slate-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-300 transition">
                            {lang === "bn" ? sem.nameBn : sem.name}
                          </h4>
                          <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                            {semSubjectCount > 0
                              ? `${semSubjectCount} ${lang === "bn" ? "টি বিষয় ও নোট" : "Subjects"}`
                              : lang === "bn"
                              ? "বর্ষের সাবজেক্টসমূহ দেখুন"
                              : "View Subjects"}
                          </span>
                        </div>
                      </div>

                      <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 group-hover:bg-sky-500 group-hover:text-white flex items-center justify-center text-slate-500 dark:text-slate-400 transition">
                        <ChevronRight className="w-5 h-5" />
                      </div>
                    </div>
                  );
                })
              ) : (
                /* Fallback if no semesters defined */
                <div
                  onClick={() => {
                    setSelectedSemesterId("ALL");
                    setSelectedSubjectId(null);
                  }}
                  className="p-4 rounded-2xl bg-white dark:bg-[#121a2d] border border-slate-200 dark:border-slate-800 cursor-pointer"
                >
                  <p className="text-xs text-slate-500">
                    {lang === "bn" ? "সকল বর্ষের বিষয় দেখতে ক্লিক করুন" : "Click to view all subjects"}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* STEP 4: SELECT SUBJECT (If Year is selected, but Subject is not) */}
        {selectedLevelId && selectedDeptId && selectedSemesterId && !selectedSubjectId && activeDept && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white flex items-center space-x-2">
                  <BookOpen className="w-5 h-5 text-sky-500 dark:text-sky-400" />
                  <span>
                    {lang === "bn"
                      ? `${activeDept.nameBn} - বিষয় নির্বাচন করুন`
                      : `${activeDept.name} - Select Subject`}
                  </span>
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  {lang === "bn"
                    ? "আপনার বিষয়ে ক্লিক করে নোট, সাজেশন ও প্রশ্ন ব্যাংক দেখুন"
                    : "Tap a subject to view notes, suggestions & question bank"}
                </p>
              </div>

              <button
                onClick={() => setSelectedSemesterId(null)}
                className="px-3 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-300 rounded-xl text-xs font-bold transition flex items-center space-x-1"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>{lang === "bn" ? "বর্ষসমূহ" : "Years"}</span>
              </button>
            </div>

            {/* Grid of Subject Cards filtered by selected Year */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {/* Option 0: All Subjects in this Year */}
              <div
                onClick={() => setSelectedSubjectId("ALL")}
                className="p-4 rounded-2xl bg-gradient-to-br from-sky-500/10 via-blue-500/5 to-transparent border border-sky-500/30 hover:border-sky-400 dark:bg-[#121a2d] shadow-md hover:shadow-lg cursor-pointer hover:scale-[1.01] transition duration-200 flex items-center justify-between group"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-500 to-blue-600 flex items-center justify-center text-white font-bold shrink-0 shadow-md">
                    <Layers className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-300 transition">
                      {lang === "bn" ? "সকল বিষয় (All Subjects)" : "All Subjects"}
                    </h4>
                    <span className="text-[11px] text-sky-600 dark:text-sky-400 font-bold">
                      {
                        approvedFiles.filter(
                          (f) =>
                            f.levelId === selectedLevelId &&
                            f.deptId === selectedDeptId &&
                            (selectedSemesterId === "ALL" || f.semesterId === selectedSemesterId)
                        ).length
                      }{" "}
                      {lang === "bn" ? "টি ফাইল ও নোট" : "Total Files"}
                    </span>
                  </div>
                </div>

                <div className="w-7 h-7 rounded-full bg-sky-500 text-white flex items-center justify-center transition">
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>

              {/* Individual Subject Cards for the chosen Year */}
              {activeDept.subjects
                .filter(
                  (sbj) =>
                    selectedSemesterId === "ALL" ||
                    !sbj.semesterId ||
                    sbj.semesterId === selectedSemesterId
                )
                .map((sbj) => {
                  const sbjFilesCount = approvedFiles.filter(
                    (f) =>
                      f.levelId === selectedLevelId &&
                      f.deptId === selectedDeptId &&
                      f.subjectId === sbj.id
                  ).length;

                  return (
                    <div
                      key={sbj.id}
                      onClick={() => setSelectedSubjectId(sbj.id)}
                      className="p-4 rounded-2xl bg-white dark:bg-[#121a2d] border border-slate-200 dark:border-slate-800 hover:border-sky-400 dark:hover:border-sky-500/50 shadow-md hover:shadow-lg cursor-pointer hover:scale-[1.01] transition duration-200 flex items-center justify-between group"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-xl bg-sky-500/15 border border-sky-500/30 flex items-center justify-center text-sky-500 dark:text-sky-400 font-bold shrink-0">
                          <Folder className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-300 transition">
                            {lang === "bn" ? sbj.nameBn : sbj.name}
                          </h4>
                          <span className="text-[11px] text-slate-500 dark:text-slate-400">
                            {sbjFilesCount} {lang === "bn" ? "টি ফাইল ও নোট" : "Files"}
                          </span>
                        </div>
                      </div>

                      <div className="w-7 h-7 rounded-full bg-slate-100 dark:bg-slate-800 group-hover:bg-sky-500 group-hover:text-white flex items-center justify-center text-slate-500 dark:text-slate-400 transition">
                        <ChevronRight className="w-4 h-4" />
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        )}

        {/* STEP 5: NOTES & SUGGESTION FILES (When Subject is selected) */}
        {selectedLevelId && selectedDeptId && selectedSemesterId && selectedSubjectId && activeDept && (
          <div className="space-y-5">
            
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white flex items-center space-x-2">
                  <FileText className="w-5 h-5 text-sky-500 dark:text-sky-400" />
                  <span>
                    {activeSubject
                      ? lang === "bn"
                        ? `${activeSubject.nameBn} - নোট ও সাজেশন`
                        : `${activeSubject.name} - Notes & Suggestions`
                      : lang === "bn"
                      ? `${activeDept.nameBn} - সকল বিষয়ের নোট ও সাজেশন`
                      : `${activeDept.name} - All Subjects Notes`}
                  </span>
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  {lang === "bn"
                    ? "প্রয়োজনীয় ফাইল নির্বাচন করে বিস্তারিত দেখুন, পড়তে ক্লিক করুন বা ডাউনলোড করুন"
                    : "Select a file to view details, read or download"}
                </p>
              </div>

              <button
                onClick={() => setSelectedSubjectId(null)}
                className="px-3 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-300 rounded-xl text-xs font-bold transition flex items-center space-x-1"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>{lang === "bn" ? "বিষয়সমূহ" : "Subjects"}</span>
              </button>
            </div>

            {/* Files Grid */}
            <div className="space-y-3 pt-1">
              <div className="flex items-center justify-between">
                <h3 className="font-extrabold text-xs sm:text-sm text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center space-x-1.5">
                  <FileText className="w-4 h-4 text-sky-500 dark:text-sky-400" />
                  <span>
                    {activeSubject
                      ? lang === "bn"
                        ? `${activeSubject.nameBn} এর ফাইলসমূহ`
                        : `${activeSubject.name} Files`
                      : lang === "bn"
                      ? "উপলব্ধ সকল ফাইল ও সাজেশন"
                      : "Available Files & Suggestions"}
                  </span>
                </h3>
                <span className="text-xs text-sky-600 dark:text-sky-400 font-bold">
                  {filteredFiles.length} {lang === "bn" ? "টি ফাইল" : "files"}
                </span>
              </div>

              {filteredFiles.length === 0 ? (
                <div className="bg-white dark:bg-[#121a2d] rounded-2xl border border-slate-200 dark:border-slate-800 p-8 text-center space-y-2">
                  <FileText className="w-10 h-10 text-slate-400 dark:text-slate-600 mx-auto" />
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                    {lang === "bn"
                      ? "এই বিষয়ে এখনো কোনো ফাইল বা সাজেশন আপলোড করা হয়নি।"
                      : "No files uploaded for this subject yet."}
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredFiles.map((file) => (
                    <FileCard key={file.id} file={file} onSelect={onSelectFile} />
                  ))}
                </div>
              )}
            </div>

          </div>
        )}

      </div>

    </div>
  );
};
