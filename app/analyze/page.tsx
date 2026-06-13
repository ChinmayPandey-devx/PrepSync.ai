"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Loader2, Sparkles, CheckCircle2, XCircle } from "lucide-react";
import { clsx } from "clsx";

export default function AnalyzePage() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowResults(true);
    }, 2500);
  };

  const results = {
    score: 73,
    matched_skills: ["Python", "SQL", "Data Analysis", "Communication", "Problem Solving"],
    gap_skills: ["Machine Learning", "Tableau", "AWS"],
    summary: "Strong analytical foundation detected. Focus on cloud tools and ML frameworks to close the gap for this role."
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">CV-JD Matching Engine</h1>
          <p className="text-slate-500 mt-1">Paste your resume and job description to see how well you align.</p>
        </div>
        <button
          onClick={handleAnalyze}
          disabled={isAnalyzing || showResults}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-lg font-medium flex items-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isAnalyzing ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Sparkles className="w-5 h-5" />
          )}
          {isAnalyzing ? "Analyzing Alignment..." : "Analyze Alignment"}
        </button>
      </div>

      {!showResults && !isAnalyzing && (
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
            <div className="bg-slate-50 px-4 py-3 border-b border-slate-200">
              <h3 className="font-semibold text-slate-800">Your Resume</h3>
            </div>
            <textarea
              className="w-full h-96 p-4 resize-none focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              placeholder="Paste your resume content here..."
              defaultValue="Experienced Data Analyst with 3 years of experience. Proficient in Python, SQL, and Data Analysis. Known for excellent communication and problem solving skills..."
            />
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
            <div className="bg-slate-50 px-4 py-3 border-b border-slate-200">
              <h3 className="font-semibold text-slate-800">Job Description</h3>
            </div>
            <textarea
              className="w-full h-96 p-4 resize-none focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              placeholder="Paste the job description here..."
              defaultValue="Looking for a Data Scientist. Must have strong Python, SQL, and Data Analysis skills. Experience with Machine Learning, Tableau, and AWS is highly preferred. Must have good communication and problem solving skills."
            />
          </div>
        </div>
      )}

      {isAnalyzing && (
        <div className="h-96 flex flex-col items-center justify-center space-y-4">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          >
            <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full" />
          </motion.div>
          <p className="text-slate-500 font-medium animate-pulse">Running NLP models across 1,200+ data points...</p>
        </div>
      )}

      {showResults && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-3 gap-6"
        >
          {/* Score Card */}
          <div className="col-span-1 bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col items-center justify-center text-center space-y-4">
            <h3 className="font-semibold text-slate-800">Match Score</h3>
            <div className="relative w-40 h-40">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  className="text-slate-100"
                  strokeWidth="8"
                  stroke="currentColor"
                  fill="transparent"
                  r="40"
                  cx="50"
                  cy="50"
                />
                <motion.circle
                  className="text-indigo-600"
                  strokeWidth="8"
                  strokeDasharray="251.2"
                  initial={{ strokeDashoffset: 251.2 }}
                  animate={{ strokeDashoffset: 251.2 - (251.2 * results.score) / 100 }}
                  transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="transparent"
                  r="40"
                  cx="50"
                  cy="50"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center flex-col">
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="text-4xl font-bold text-slate-900"
                >
                  {results.score}%
                </motion.span>
              </div>
            </div>
            <p className="text-sm text-slate-500 font-medium bg-slate-100 px-3 py-1 rounded-full">Solid Candidate</p>
          </div>

          {/* Details Card */}
          <div className="col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h3 className="font-semibold text-slate-800 flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-indigo-500" />
                AI Summary
              </h3>
              <p className="text-slate-600 leading-relaxed text-lg">{results.summary}</p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <h3 className="font-semibold text-slate-800 flex items-center gap-2 mb-4">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  Matched Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {results.matched_skills.map((skill) => (
                    <span key={skill} className="px-3 py-1.5 bg-emerald-50 text-emerald-700 text-sm font-medium rounded-lg border border-emerald-200">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <h3 className="font-semibold text-slate-800 flex items-center gap-2 mb-4">
                  <XCircle className="w-5 h-5 text-rose-500" />
                  Gap Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {results.gap_skills.map((skill) => (
                    <span key={skill} className="px-3 py-1.5 bg-rose-50 text-rose-700 text-sm font-medium rounded-lg border border-rose-200">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
