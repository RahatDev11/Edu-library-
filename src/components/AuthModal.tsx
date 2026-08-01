import React, { useState } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth, googleProvider, db } from "../lib/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { X, Mail, Lock, User, LogIn, UserPlus, LogOut, ShieldCheck, Sparkles } from "lucide-react";
import { useApp } from "../context/AppContext";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const { user, lang, theme } = useApp();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isSignUp) {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        // Create user document in Firestore
        await setDoc(doc(db, "users", res.user.uid), {
          uid: res.user.uid,
          email: res.user.email,
          fullName: fullName || "Student User",
          role: "user",
          createdAt: new Date().toISOString(),
        });
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      onClose();
    } catch (err: any) {
      setError(err.message || "Authentication failed. Please check credentials.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    setError("");
    setLoading(true);
    try {
      const res = await signInWithPopup(auth, googleProvider);
      const userRef = doc(db, "users", res.user.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        await setDoc(userRef, {
          uid: res.user.uid,
          email: res.user.email,
          fullName: res.user.displayName || "Student User",
          role: "user",
          createdAt: new Date().toISOString(),
        });
      }
      onClose();
    } catch (err: any) {
      setError(err.message || "Google sign-in failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      onClose();
    } catch (err: any) {
      setError("Sign out failed.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4 animate-fadeIn">
      <div
        className={`w-full max-w-md rounded-2xl border p-6 shadow-2xl relative ${
          theme === "dark"
            ? "bg-[#121a2d] border-slate-800 text-white"
            : "bg-white border-slate-200 text-slate-900"
        }`}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-white transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center space-y-2 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-sky-500/15 text-sky-500 border border-sky-500/30 flex items-center justify-center mx-auto">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-black">
            {auth.currentUser
              ? lang === "bn"
                ? "ফায়ারবেস অ্যাকাউন্ট তথ্য"
                : "Firebase Account Details"
              : isSignUp
              ? lang === "bn"
                ? "নতুন অ্যাকাউন্ট তৈরি করুন"
                : "Create Student Account"
              : lang === "bn"
              ? "লগইন করুন"
              : "Sign In to Edu Library"}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {lang === "bn"
              ? "ফায়ারবেস অটোেনটিকেশন ও ফায়ারস্টোর ক্লাউড সিঙ্ক"
              : "Firebase Auth & Cloud Firestore Integration"}
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-600 dark:text-rose-300 text-xs font-semibold">
            {error}
          </div>
        )}

        {auth.currentUser ? (
          <div className="space-y-4 text-center">
            <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60 text-xs space-y-1">
              <p className="font-bold text-sky-600 dark:text-sky-400">{auth.currentUser.displayName || user.fullName}</p>
              <p className="text-slate-500 dark:text-slate-400">{auth.currentUser.email}</p>
              <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold pt-1">
                ✓ Firebase Authentication Active
              </p>
            </div>

            <button
              onClick={handleSignOut}
              className="w-full py-2.5 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs transition flex items-center justify-center space-x-2"
            >
              <LogOut className="w-4 h-4" />
              <span>{lang === "bn" ? "লগআউট করুন" : "Sign Out"}</span>
            </button>
          </div>
        ) : (
          <form onSubmit={handleEmailAuth} className="space-y-4">
            {isSignUp && (
              <div>
                <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1">
                  {lang === "bn" ? "পূর্ণ নাম *" : "Full Name *"}
                </label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Md. Tanvir Ahmed"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1">
                {lang === "bn" ? "ইমেইল *" : "Email Address *"}
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="student@gmail.com"
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1">
                {lang === "bn" ? "পাসওয়ার্ড *" : "Password *"}
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white font-bold text-xs sm:text-sm transition shadow-lg flex items-center justify-center space-x-2"
            >
              {isSignUp ? <UserPlus className="w-4 h-4" /> : <LogIn className="w-4 h-4" />}
              <span>
                {loading
                  ? "Processing..."
                  : isSignUp
                  ? lang === "bn"
                    ? "অ্যাকাউন্ট তৈরি করুন"
                    : "Register Account"
                  : lang === "bn"
                  ? "সাইন ইন করুন"
                  : "Sign In"}
              </span>
            </button>

            <div className="relative my-4 text-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200 dark:border-slate-800"></div>
              </div>
              <span className="relative px-3 bg-white dark:bg-[#121a2d] text-[11px] text-slate-400 font-semibold">
                OR
              </span>
            </div>

            <button
              type="button"
              onClick={handleGoogleAuth}
              disabled={loading}
              className="w-full py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-xs font-bold transition flex items-center justify-center space-x-2"
            >
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>{lang === "bn" ? "گوগলের মাধ্যমে প্রবেশ করুন" : "Continue with Google"}</span>
            </button>

            <div className="text-center pt-2">
              <button
                type="button"
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-xs text-sky-600 dark:text-sky-400 font-bold hover:underline"
              >
                {isSignUp
                  ? lang === "bn"
                    ? "ইতিমধ্যেই অ্যাকাউন্ট আছে? লগইন করুন"
                    : "Already have an account? Sign In"
                  : lang === "bn"
                  ? "নতুন ইউজার? অ্যাকাউন্ট রেজিস্ট্রেশন করুন"
                  : "Don't have an account? Register"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
