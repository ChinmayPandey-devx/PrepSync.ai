"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, MessageSquare, Target, Send, CheckCircle2 } from "lucide-react";
import { clsx } from "clsx";

const MOCK_QUESTIONS = [
  {
    id: 1,
    text: "Explain the difference between supervised and unsupervised learning with a real-world example.",
    difficulty: "Hard",
    difficultyColor: "text-rose-700 bg-rose-50 border-rose-200"
  },
  {
    id: 2,
    text: "How would you build a Tableau dashboard to track placement KPIs for a college?",
    difficulty: "Medium",
    difficultyColor: "text-amber-700 bg-amber-50 border-amber-200"
  },
  {
    id: 3,
    text: "Walk me through deploying a simple web app on AWS EC2.",
    difficulty: "Medium",
    difficultyColor: "text-amber-700 bg-amber-50 border-amber-200"
  },
  {
    id: 4,
    text: "What is overfitting in ML and how do you prevent it?",
    difficulty: "Hard",
    difficultyColor: "text-rose-700 bg-rose-50 border-rose-200"
  },
  {
    id: 5,
    text: "Describe a time you used data to influence a decision.",
    difficulty: "Easy",
    difficultyColor: "text-emerald-700 bg-emerald-50 border-emerald-200"
  }
];

export default function InterviewPage() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [showQuestions, setShowQuestions] = useState(false);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [submitting, setSubmitting] = useState<Record<number, boolean>>({});
  const [feedback, setFeedback] = useState<Record<number, boolean>>({});

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setShowQuestions(true);
    }, 2000);
  };

  const handleSubmit = (id: number) => {
    if (!answers[id]?.trim()) return;
    
    setSubmitting((prev) => ({ ...prev, [id]: true }));
    setTimeout(() => {
      setSubmitting((prev) => ({ ...prev, [id]: false }));
      setFeedback((prev) => ({ ...prev, [id]: true }));
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Mock Interview Console</h1>
          <p className="text-slate-500 mt-1">Practice answering questions tailored to your resume gaps.</p>
        </div>
        <button
          onClick={handleGenerate}
          disabled={isGenerating || showQuestions}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-lg font-medium flex items-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isGenerating ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Target className="w-5 h-5" />
          )}
          {isGenerating ? "Generating..." : "Generate Interview Questions"}
        </button>
      </div>

      {!showQuestions && !isGenerating && (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-12 text-center flex flex-col items-center justify-center space-y-4">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center">
            <MessageSquare className="w-8 h-8 text-slate-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-800">Ready to practice?</h3>
            <p className="text-slate-500 mt-1 max-w-md mx-auto">
              We&apos;ll generate 5 personalized interview questions targeting the gap skills (Machine Learning, Tableau, AWS) identified in your resume analysis.
            </p>
          </div>
        </div>
      )}

      {isGenerating && (
        <div className="h-64 flex flex-col items-center justify-center space-y-4">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          >
            <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full" />
          </motion.div>
          <p className="text-slate-500 font-medium animate-pulse">Curating questions from recent interviews...</p>
        </div>
      )}

      {showQuestions && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6"
        >
          {MOCK_QUESTIONS.map((q, index) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              key={q.id}
              className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden"
            >
              <div className="p-6 border-b border-slate-100 bg-slate-50/50">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-lg font-semibold text-slate-800 leading-snug">
                    <span className="text-indigo-600 mr-2">Q{index + 1}.</span>
                    {q.text}
                  </h3>
                  <span className={clsx("px-2.5 py-1 rounded-md text-xs font-semibold border whitespace-nowrap", q.difficultyColor)}>
                    {q.difficulty}
                  </span>
                </div>
              </div>
              
              <div className="p-6 space-y-4">
                <AnimatePresence mode="wait">
                  {!feedback[q.id] ? (
                    <motion.div
                      key="input"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-4"
                    >
                      <textarea
                        value={answers[q.id] || ""}
                        onChange={(e) => setAnswers({ ...answers, [q.id]: e.target.value })}
                        placeholder="Type your answer here..."
                        className="w-full min-h-[120px] p-4 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-y"
                      />
                      <div className="flex justify-end">
                        <button
                          onClick={() => handleSubmit(q.id)}
                          disabled={submitting[q.id] || !answers[q.id]?.trim()}
                          className="bg-slate-900 hover:bg-slate-800 text-white px-5 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {submitting[q.id] ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <Send className="w-4 h-4" />
                          )}
                          Submit Answer
                        </button>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="feedback"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="bg-indigo-50 border border-indigo-100 rounded-lg p-5 flex gap-4"
                    >
                      <div className="shrink-0 mt-0.5">
                        <CheckCircle2 className="w-5 h-5 text-indigo-600" />
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-indigo-900 mb-1">AI Feedback</h4>
                        <p className="text-indigo-800 text-sm leading-relaxed">
                          Good structure! Consider adding a specific metric or example to strengthen this. Your explanation touches on the right concepts but could benefit from a bit more real-world context.
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
