"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, ChevronRight, ChevronLeft, Upload, ShieldCheck } from "lucide-react";
import { clsx } from "clsx";
import confetti from "canvas-confetti";
import alumniData from "@/data/alumni.json";

const COMPANIES = ["TCS", "Infosys", "Google", "Amazon", "Flipkart", "Deloitte", "Wipro", "Microsoft"];
const TOPICS = ["DSA", "HR", "System Design", "Aptitude", "Case Study", "Technical", "Guesstimates"];

export default function AlumniPage() {
  const [step, setStep] = useState(1);
  const [feed, setFeed] = useState(alumniData);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    company: "",
    ctc: "",
    year: "2024",
    rounds: 3,
    topics: [] as string[],
    resources: "",
    tip: "",
    anonymous: false
  });

  const handleTopicToggle = (topic: string) => {
    setFormData(prev => ({
      ...prev,
      topics: prev.topics.includes(topic)
        ? prev.topics.filter(t => t !== topic)
        : [...prev.topics, topic]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#4f46e5', '#8b5cf6', '#10b981']
    });

    const newEntry = {
      initials: formData.anonymous ? "AN" : "ME",
      company: formData.company || "TCS",
      role: "SDE", // Default for demo
      ctc: formData.ctc + " LPA",
      year: parseInt(formData.year),
      rounds: formData.rounds,
      topics: formData.topics,
      resources: formData.resources,
      tip: formData.tip || "Be confident and practice well.",
      verified: true
    };

    setFeed([newEntry, ...feed]);
    setIsSubmitted(true);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-12 pb-12">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Alumni Placement Log</h1>
          <p className="text-slate-500 mt-1">Share your interview experience or learn from others.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Form Section */}
        <div className="lg:col-span-5">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="bg-indigo-600 px-6 py-8 text-white relative overflow-hidden">
              <div className="relative z-10">
                <h2 className="text-xl font-bold mb-2">Share Your Journey</h2>
                <p className="text-indigo-100 text-sm">Help 1,200+ students prepare smarter.</p>
              </div>
              <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 rounded-full bg-white opacity-10 blur-2xl"></div>
            </div>

            <div className="p-6">
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 flex flex-col items-center justify-center text-center space-y-4"
                >
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mb-2">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">Experience Logged!</h3>
                  <p className="text-slate-500 text-sm max-w-xs mx-auto">
                    Your experience helps 1,200+ students prepare smarter. ✓
                  </p>
                  <button
                    onClick={() => { setStep(1); setIsSubmitted(false); }}
                    className="mt-6 text-indigo-600 font-medium text-sm hover:underline"
                  >
                    Submit another response
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={step === 3 ? handleSubmit : (e) => { e.preventDefault(); setStep(step + 1); }} className="space-y-6">
                  {/* Step Progress */}
                  <div className="flex items-center justify-between mb-8">
                    {[1, 2, 3].map((s) => (
                      <div key={s} className="flex items-center flex-1 last:flex-none">
                        <div className={clsx(
                          "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-colors",
                          step >= s ? "bg-indigo-600 border-indigo-600 text-white" : "border-slate-200 text-slate-400"
                        )}>
                          {s}
                        </div>
                        {s !== 3 && (
                          <div className={clsx(
                            "flex-1 h-0.5 mx-2 transition-colors",
                            step > s ? "bg-indigo-600" : "bg-slate-200"
                          )} />
                        )}
                      </div>
                    ))}
                  </div>

                  <AnimatePresence mode="wait">
                    {step === 1 && (
                      <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">Company</label>
                          <select
                            value={formData.company}
                            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none bg-white"
                            required
                          >
                            <option value="">Select a company</option>
                            {COMPANIES.map(c => <option key={c} value={c}>{c}</option>)}
                          </select>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">CTC (LPA)</label>
                            <input
                              type="number"
                              value={formData.ctc}
                              onChange={(e) => setFormData({ ...formData, ctc: e.target.value })}
                              placeholder="e.g. 12"
                              className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Offer Year</label>
                            <select
                              value={formData.year}
                              onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                              className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none bg-white"
                            >
                              {[2024, 2023, 2022, 2021].map(y => <option key={y} value={y}>{y}</option>)}
                            </select>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {step === 2 && (
                      <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">Interview Rounds: {formData.rounds}</label>
                          <input
                            type="range"
                            min="1" max="7"
                            value={formData.rounds}
                            onChange={(e) => setFormData({ ...formData, rounds: parseInt(e.target.value) })}
                            className="w-full accent-indigo-600"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">Topics Covered</label>
                          <div className="flex flex-wrap gap-2">
                            {TOPICS.map(topic => (
                              <button
                                type="button"
                                key={topic}
                                onClick={() => handleTopicToggle(topic)}
                                className={clsx(
                                  "px-3 py-1.5 rounded-full text-xs font-medium border transition-colors",
                                  formData.topics.includes(topic)
                                    ? "bg-indigo-50 border-indigo-200 text-indigo-700"
                                    : "bg-white border-slate-200 text-slate-600 hover:border-slate-300"
                                )}
                              >
                                {topic}
                              </button>
                            ))}
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">Preparation Resources</label>
                          <textarea
                            value={formData.resources}
                            onChange={(e) => setFormData({ ...formData, resources: e.target.value })}
                            placeholder="e.g. LeetCode, IndiaBix..."
                            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none h-20 resize-none"
                            required
                          />
                        </div>
                      </motion.div>
                    )}

                    {step === 3 && (
                      <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">One Tip for Juniors</label>
                          <textarea
                            value={formData.tip}
                            onChange={(e) => setFormData({ ...formData, tip: e.target.value })}
                            placeholder="What helped you crack it?"
                            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none h-20 resize-none"
                            required
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">Verify (Optional)</label>
                          <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-slate-50 transition-colors">
                            <Upload className="w-6 h-6 text-slate-400 mb-2" />
                            <p className="text-sm font-medium text-slate-700">Upload Offer Letter / Resume</p>
                            <p className="text-xs text-slate-500 mt-1">UI only, no actual upload</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            id="anonymous"
                            checked={formData.anonymous}
                            onChange={(e) => setFormData({ ...formData, anonymous: e.target.checked })}
                            className="w-4 h-4 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500"
                          />
                          <label htmlFor="anonymous" className="text-sm text-slate-600">Post anonymously</label>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="pt-4 flex justify-between">
                    {step > 1 ? (
                      <button
                        type="button"
                        onClick={() => setStep(step - 1)}
                        className="px-4 py-2 text-slate-600 font-medium hover:bg-slate-100 rounded-lg flex items-center gap-1"
                      >
                        <ChevronLeft className="w-4 h-4" /> Back
                      </button>
                    ) : <div></div>}
                    <button
                      type="submit"
                      className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-medium flex items-center gap-1 transition-colors"
                    >
                      {step === 3 ? "Submit Entry" : "Next"} {step !== 3 && <ChevronRight className="w-4 h-4" />}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Feed Section */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4 flex items-center gap-4 text-indigo-900">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm shrink-0">
              <ShieldCheck className="w-5 h-5 text-indigo-600" />
            </div>
            <div>
              <p className="font-medium">{feed.length} alumni have shared their journey — be the next one.</p>
            </div>
          </div>

          <h3 className="font-semibold text-slate-900 text-lg">Recent Contributions</h3>

          <div className="space-y-4">
            <AnimatePresence>
              {feed.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  layout
                  className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex gap-4"
                >
                  <div className="shrink-0 w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-bold border border-slate-200">
                    {item.initials}
                  </div>
                  <div className="flex-1 space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-slate-900">{item.company}</h4>
                          <span className="text-slate-400 text-sm">•</span>
                          <span className="text-slate-600 text-sm">{item.role}</span>
                        </div>
                        <p className="text-sm text-slate-500 mt-0.5">
                          {item.ctc} • {item.year} • {item.rounds} Rounds
                        </p>
                      </div>
                      {item.verified && (
                        <div className="flex items-center gap-1 text-xs font-medium text-emerald-700 bg-emerald-50 px-2 py-1 rounded-md border border-emerald-200">
                          <ShieldCheck className="w-3 h-3" />
                          Verified
                        </div>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {item.topics.map(topic => (
                        <span key={topic} className="px-2.5 py-1 bg-slate-100 text-slate-600 text-xs font-medium rounded-md">
                          {topic}
                        </span>
                      ))}
                    </div>

                    <p className="text-sm text-slate-700">
                      <span className="font-semibold text-slate-900">Resources: </span>
                      {item.resources}
                    </p>

                    <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 text-sm italic text-slate-600">
                      "{item.tip}"
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
