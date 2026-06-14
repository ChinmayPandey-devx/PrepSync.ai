"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Quote, BarChart3, PieChart as PieChartIcon } from "lucide-react";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from "recharts";
import companiesData from "@/data/companies.json";

const COLORS = ['#4f46e5', '#8b5cf6', '#10b981', '#f59e0b'];

export default function IntelPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCompany, setSelectedCompany] = useState<typeof companiesData[0] | null>(null);

  const filteredCompanies = companiesData.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.topTopics.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12 relative">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Company Intel Dashboard</h1>
          <p className="text-slate-500 mt-1">Data-driven insights to ace your target companies.</p>
        </div>
        <div className="relative w-full md:w-72">
          <input
            type="text"
            placeholder="Search companies or topics..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
          />
          <Search className="w-5 h-5 text-slate-400 absolute left-3 top-2.5" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredCompanies.map(company => (
          <div key={company.id} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col transition-all hover:shadow-md hover:border-slate-300">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-600 font-bold text-xl border border-indigo-100">
                {company.name[0]}
              </div>
              <div>
                <h3 className="font-bold text-slate-900">{company.name}</h3>
                <p className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded inline-block mt-1">
                  Avg. CTC: {company.avgCtc}
                </p>
              </div>
            </div>

            <div className="space-y-3 flex-1 mb-6">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Top Topics</p>
              <div className="flex flex-wrap gap-1.5">
                {company.topTopics.map(topic => (
                  <span key={topic} className="px-2 py-1 bg-slate-100 text-slate-600 text-[11px] font-medium rounded">
                    {topic}
                  </span>
                ))}
              </div>
            </div>

            <button
              onClick={() => setSelectedCompany(company)}
              className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white text-sm font-medium rounded-lg transition-colors"
            >
              View Blueprint
            </button>
          </div>
        ))}
      </div>

      {filteredCompanies.length === 0 && (
        <div className="text-center py-12 text-slate-500">
          No companies found matching &quot;{searchTerm}&quot;.
        </div>
      )}

      {/* Blueprint Side Drawer */}
      <AnimatePresence>
        {selectedCompany && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCompany(null)}
              className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-xl bg-white shadow-2xl border-l border-slate-200 z-50 flex flex-col"
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50/50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-700 font-bold border border-indigo-200">
                    {selectedCompany.name[0]}
                  </div>
                  <div>
                    <h2 className="font-bold text-slate-900 text-lg">{selectedCompany.name} Blueprint</h2>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedCompany(null)}
                  className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-8">
                {/* Charts Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Topics Donut Chart */}
                  <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
                    <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2 mb-4">
                      <PieChartIcon className="w-4 h-4 text-indigo-500" />
                      Topic Weightage
                    </h3>
                    <div className="h-48 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={selectedCompany.chartData.topics}
                            innerRadius={50}
                            outerRadius={70}
                            paddingAngle={5}
                            dataKey="value"
                          >
                            {selectedCompany.chartData.topics.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip 
                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="flex flex-wrap gap-2 justify-center mt-2">
                      {selectedCompany.chartData.topics.map((t, i) => (
                        <div key={t.name} className="flex items-center gap-1.5 text-xs text-slate-600">
                          <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                          {t.name}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Hiring Trend Bar Chart */}
                  <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
                    <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2 mb-4">
                      <BarChart3 className="w-4 h-4 text-indigo-500" />
                      Hiring Trends
                    </h3>
                    <div className="h-48 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={selectedCompany.chartData.hiring}>
                          <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
                          <Tooltip 
                            cursor={{ fill: '#f1f5f9' }}
                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                          />
                          <Bar dataKey="hires" fill="#4f46e5" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>

                {/* Alumni Quotes */}
                <div>
                  <h3 className="text-sm font-bold text-slate-800 mb-4 px-1">Inside Scoop</h3>
                  <div className="space-y-4">
                    {selectedCompany.quotes.map((quote, idx) => (
                      <div key={idx} className="bg-indigo-50/50 border border-indigo-100 rounded-xl p-5 flex gap-4">
                        <Quote className="w-8 h-8 text-indigo-200 shrink-0 rotate-180" />
                        <div>
                          <p className="text-slate-700 leading-relaxed italic">&quot;{quote.text}&quot;</p>
                          <p className="text-xs font-bold text-indigo-600 mt-2">— {quote.author}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
