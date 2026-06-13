"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { FileText, Briefcase, UploadCloud, CheckCircle2, X, Sparkles, Loader2 } from "lucide-react";


export default function AnalyzePage() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [jdText, setJdText] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAnalyze = () => {
    if (!fileName || !jdText.trim()) return;
    setIsAnalyzing(true);
    setShowResults(false);
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowResults(true);
    }, 2500);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFileName(e.target.files[0].name);
    }
  };

  const results = {
    score: 73,
    matched_skills: ["Python", "SQL", "Data Analysis", "Communication", "Problem Solving"],
    gap_skills: ["Machine Learning", "Tableau", "AWS"],
    summary: "Strong analytical foundation detected. Focus on cloud tools and ML frameworks to close the gap for this role."
  };

  return (
    <div className="max-w-[1200px] mx-auto space-y-8 pb-12 font-sans" style={{ backgroundColor: "#F7F8FA", minHeight: "100%", margin: "-24px", padding: "24px" }}>
      
      {/* Top Section */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-[22px] font-semibold text-[#111827]">Resume Analyzer</h1>
          <p className="text-[14px] text-[#6B7280] mt-1">
            Upload your resume and paste a job description to get your alignment score instantly.
          </p>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#F3F4F6] border border-[#E4E7EC] rounded-full">
          <Sparkles className="w-4 h-4 text-[#4F46E5]" />
          <span className="text-[12px] font-semibold text-[#111827]">AI-Powered Analysis</span>
        </div>
      </div>

      {/* Main Content - 60/40 Split */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        
        {/* Left Column (Inputs) - 60% */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* Card 1: Resume Upload */}
          <div className="bg-[#FFFFFF] border border-[#E4E7EC] rounded-xl p-6" style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
            <h2 className="text-[16px] font-semibold text-[#111827] flex items-center gap-2 mb-4">
              <FileText className="w-5 h-5 text-[#6B7280]" />
              Your Resume
            </h2>

            {!fileName ? (
              <div 
                className="border-2 border-dashed border-[#CBD5E1] rounded-xl p-8 flex flex-col items-center justify-center text-center hover:bg-[#F8FAFC] transition-colors cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
              >
                <input 
                  type="file" 
                  className="hidden" 
                  ref={fileInputRef} 
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx"
                />
                <div className="w-12 h-12 bg-[#EEF2FF] rounded-full flex items-center justify-center mb-3">
                  <UploadCloud className="w-6 h-6 text-[#4F46E5]" />
                </div>
                <p className="text-[15px] font-medium text-[#111827]">Drag & drop your resume here</p>
                <p className="text-[13px] text-[#6B7280] mt-1">Supports PDF, DOC, DOCX · Max 5MB</p>
                
                <div className="flex items-center w-full max-w-[200px] my-4">
                  <div className="h-px bg-[#E4E7EC] flex-1"></div>
                  <span className="px-3 text-[12px] text-[#6B7280] font-medium uppercase">or</span>
                  <div className="h-px bg-[#E4E7EC] flex-1"></div>
                </div>

                <button className="px-5 py-2 rounded-lg border border-[#4F46E5] text-[#4F46E5] text-[14px] font-medium hover:bg-[#EEF2FF] transition-colors">
                  Browse File
                </button>
              </div>
            ) : (
              <div className="border border-[#16A34A] bg-[#F0FDF4] rounded-xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#16A34A] rounded-full flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-[14px] font-medium text-[#111827] truncate max-w-[200px]">{fileName}</p>
                    <p className="text-[12px] text-[#16A34A] font-medium">Upload complete</p>
                  </div>
                </div>
                <button 
                  onClick={() => setFileName(null)}
                  className="text-[13px] font-medium text-[#DC2626] hover:underline"
                >
                  Remove
                </button>
              </div>
            )}
          </div>

          {/* Card 2: Job Description */}
          <div className="bg-[#FFFFFF] border border-[#E4E7EC] rounded-xl p-6 flex flex-col" style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.06)", minHeight: "320px" }}>
            <h2 className="text-[16px] font-semibold text-[#111827] flex items-center gap-2 mb-4">
              <Briefcase className="w-5 h-5 text-[#6B7280]" />
              Job Description
            </h2>
            <textarea
              className="flex-1 w-full text-[14px] text-[#111827] placeholder-[#9CA3AF] resize-none focus:outline-none bg-transparent"
              placeholder="Paste the job description here (responsibilities, requirements, skills)..."
              value={jdText}
              onChange={(e) => setJdText(e.target.value)}
            />
          </div>

          <button
            onClick={handleAnalyze}
            disabled={!fileName || !jdText.trim() || isAnalyzing}
            className="w-full bg-[#4F46E5] hover:bg-[#4338CA] text-white py-3.5 rounded-xl font-medium text-[15px] flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}
          >
            {isAnalyzing ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Sparkles className="w-5 h-5" />
            )}
            {isAnalyzing ? "Analyzing Alignment..." : "Analyze Alignment"}
          </button>
        </div>

        {/* Right Column (Results) - 40% */}
        <div className="lg:col-span-2">
          {!showResults && !isAnalyzing && (
            <div className="h-full bg-[#FFFFFF] border border-[#E4E7EC] rounded-xl p-8 flex flex-col items-center justify-center text-center" style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.06)", minHeight: "500px" }}>
              <div className="w-16 h-16 bg-[#F3F4F6] rounded-full flex items-center justify-center mb-4">
                <FileText className="w-8 h-8 text-[#9CA3AF]" />
              </div>
              <h3 className="text-[16px] font-medium text-[#111827]">No analysis yet</h3>
              <p className="text-[14px] text-[#6B7280] mt-2 max-w-[250px]">
                Upload your resume and paste a job description to see your alignment score and missing skills.
              </p>
            </div>
          )}

          {isAnalyzing && (
            <div className="h-full bg-[#FFFFFF] border border-[#E4E7EC] rounded-xl p-8 flex flex-col items-center justify-center text-center" style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.06)", minHeight: "500px" }}>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                className="mb-6"
              >
                <div className="w-14 h-14 border-4 border-[#EEF2FF] border-t-[#4F46E5] rounded-full" />
              </motion.div>
              <h3 className="text-[16px] font-medium text-[#111827] animate-pulse">Running NLP Models</h3>
              <p className="text-[14px] text-[#6B7280] mt-1">Cross-referencing 1,200+ data points...</p>
            </div>
          )}

          {showResults && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* Score Card */}
              <div className="bg-[#FFFFFF] border border-[#E4E7EC] rounded-xl p-8 flex flex-col items-center justify-center text-center" style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
                <h3 className="text-[15px] font-semibold text-[#6B7280] mb-6 uppercase tracking-wider">Alignment Score</h3>
                <div className="relative w-44 h-44">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle
                      className="text-[#F3F4F6]"
                      strokeWidth="8"
                      stroke="currentColor"
                      fill="transparent"
                      r="40"
                      cx="50"
                      cy="50"
                    />
                    <motion.circle
                      className="text-[#0EA5E9]"
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
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1 }}
                      className="text-[42px] font-bold text-[#111827]"
                    >
                      {results.score}<span className="text-[20px] text-[#6B7280]">%</span>
                    </motion.span>
                  </div>
                </div>
              </div>

              {/* Skills Card */}
              <div className="bg-[#FFFFFF] border border-[#E4E7EC] rounded-xl p-6 space-y-6" style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
                <div>
                  <h3 className="text-[14px] font-semibold text-[#111827] flex items-center gap-2 mb-3">
                    <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
                    Matched Skills
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {results.matched_skills.map((skill) => (
                      <span key={skill} className="px-2.5 py-1 bg-[#F0FDF4] text-[#16A34A] border border-[#BBF7D0] text-[13px] font-medium rounded-md">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-[14px] font-semibold text-[#111827] flex items-center gap-2 mb-3">
                    <X className="w-4 h-4 text-[#DC2626]" />
                    Missing Skills
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {results.gap_skills.map((skill) => (
                      <span key={skill} className="px-2.5 py-1 bg-[#FEF2F2] text-[#DC2626] border border-[#FECDD3] text-[13px] font-medium rounded-md">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* AI Summary Card */}
              <div className="bg-[#EEF2FF] border border-[#E0E7FF] rounded-xl p-6" style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
                <h3 className="text-[14px] font-semibold text-[#4F46E5] flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4" />
                  AI Recommendation
                </h3>
                <p className="text-[#111827] text-[14px] leading-relaxed">
                  {results.summary}
                </p>
              </div>

            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
