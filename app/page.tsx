import Link from "next/link";
import { FileSearch, Mic, Users, BarChart2 } from "lucide-react";
import alumniData from "@/data/alumni.json";

export default function HomePage() {
  const quotes = alumniData.slice(0, 3);
  while (quotes.length < 3) {
    quotes.push(quotes[0] || { tip: "Practice makes perfect.", initials: "AA", company: "TCS", role: "SDE", year: 2024, rounds: 3, topics: [], resources: "", verified: true });
  }

  return (
    <div className="font-sans text-[#111827] bg-[#F7F8FA] min-h-full">
      <div className="max-w-5xl mx-auto space-y-16 pb-12">
        {/* 1. Hero Section */}
        <section className="text-center pt-20">
          <div className="inline-flex items-center bg-[#EEF2FF] text-[#4F46E5] text-xs font-semibold px-4 py-1.5 rounded-full mb-6">
            ✦ Built for Campus Placement Season
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold leading-tight mb-4">
            Welcome to PrepSync AI
          </h1>
          <p className="text-lg text-[#6B7280] max-w-2xl mx-auto">
            Your personal placement intelligence platform — analyze, prepare, and get placed smarter.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
            <Link href="/analyze" className="bg-[#4F46E5] hover:bg-[#4338CA] text-white px-6 py-3 rounded-xl font-medium transition-colors w-full sm:w-auto flex items-center justify-center">
              Analyze My Resume →
            </Link>
            <Link href="/intel" className="bg-white border border-[#4F46E5] text-[#4F46E5] hover:bg-[#EEF2FF] px-6 py-3 rounded-xl font-medium transition-colors w-full sm:w-auto flex items-center justify-center">
              Explore Company Intel
            </Link>
          </div>
          <p className="text-[13px] text-[#6B7280] mt-6">
            Used by students preparing for TCS, Amazon, Deloitte & more
          </p>
        </section>

        {/* 2. Stats Bar */}
        <section className="bg-white border-y border-[#E4E7EC] py-5">
          <div className="flex flex-col sm:flex-row justify-around items-center text-center divide-y sm:divide-y-0 sm:divide-x divide-[#E4E7EC]">
            <div className="flex-1 w-full py-4 sm:py-0">
              <div className="text-2xl font-bold text-[#111827]">1,200+</div>
              <div className="text-sm text-[#6B7280] mt-1">Students Helped</div>
            </div>
            <div className="flex-1 w-full py-4 sm:py-0">
              <div className="text-2xl font-bold text-[#111827]">{alumniData.length}</div>
              <div className="text-sm text-[#6B7280] mt-1">Alumni Logs</div>
            </div>
            <div className="flex-1 w-full py-4 sm:py-0">
              <div className="text-2xl font-bold text-[#111827]">8</div>
              <div className="text-sm text-[#6B7280] mt-1">Companies Tracked</div>
            </div>
            <div className="flex-1 w-full py-4 sm:py-0">
              <div className="text-2xl font-bold text-[#111827]">73%</div>
              <div className="text-sm text-[#6B7280] mt-1">Avg. Match Score</div>
            </div>
          </div>
        </section>

        {/* 3. Features Section */}
        <section>
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-[#111827] mb-2">Everything you need to get placed</h2>
            <p className="text-[#6B7280] max-w-xl mx-auto">
              Four tools. One platform. Built around how campus placements actually work.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1 */}
            <div className="bg-white border border-[#E4E7EC] rounded-xl p-6 flex flex-col hover:border-[#CBD5E1] transition-colors" style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
              <div className="w-10 h-10 bg-[#4F46E5] rounded-lg flex items-center justify-center shrink-0 mb-4">
                <FileSearch className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-base font-semibold text-[#111827] mb-2">Resume Analyzer</h3>
              <p className="text-sm text-[#6B7280] mb-4 flex-1 line-clamp-2">
                Upload your resume, paste a JD, and get an instant alignment score with skill gap breakdown.
              </p>
              <Link href="/analyze" className="text-sm text-[#4F46E5] font-medium hover:underline inline-flex items-center">
                Open →
              </Link>
            </div>

            {/* Card 2 */}
            <div className="bg-white border border-[#E4E7EC] rounded-xl p-6 flex flex-col hover:border-[#CBD5E1] transition-colors" style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
              <div className="w-10 h-10 bg-[#4F46E5] rounded-lg flex items-center justify-center shrink-0 mb-4">
                <Mic className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-base font-semibold text-[#111827] mb-2">Mock Interview</h3>
              <p className="text-sm text-[#6B7280] mb-4 flex-1 line-clamp-2">
                AI-generated interview questions targeting your exact skill gaps. Practice with instant feedback.
              </p>
              <Link href="/interview" className="text-sm text-[#4F46E5] font-medium hover:underline inline-flex items-center">
                Open →
              </Link>
            </div>

            {/* Card 3 */}
            <div className="bg-white border border-[#E4E7EC] rounded-xl p-6 flex flex-col hover:border-[#CBD5E1] transition-colors" style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
              <div className="w-10 h-10 bg-[#4F46E5] rounded-lg flex items-center justify-center shrink-0 mb-4">
                <Users className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-base font-semibold text-[#111827] mb-2">Alumni Placement Log</h3>
              <p className="text-sm text-[#6B7280] mb-4 flex-1 line-clamp-2">
                Real placement journeys from your seniors — rounds, resources, and tips that actually worked.
              </p>
              <Link href="/alumni" className="text-sm text-[#4F46E5] font-medium hover:underline inline-flex items-center">
                Open →
              </Link>
            </div>

            {/* Card 4 */}
            <div className="bg-white border border-[#E4E7EC] rounded-xl p-6 flex flex-col hover:border-[#CBD5E1] transition-colors" style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
              <div className="w-10 h-10 bg-[#4F46E5] rounded-lg flex items-center justify-center shrink-0 mb-4">
                <BarChart2 className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-base font-semibold text-[#111827] mb-2">Company Intel</h3>
              <p className="text-sm text-[#6B7280] mb-4 flex-1 line-clamp-2">
                Topic weightage charts, hiring timelines, and alumni insights for 8+ top companies.
              </p>
              <Link href="/intel" className="text-sm text-[#4F46E5] font-medium hover:underline inline-flex items-center">
                Open →
              </Link>
            </div>
          </div>
        </section>

        {/* 4. Social Proof / Alumni Highlight Strip */}
        <section className="bg-[#EEF2FF] py-10 px-6 rounded-2xl mx-auto">
          <div className="text-center mb-8">
            <span className="text-xs uppercase tracking-widest text-[#4F46E5] font-semibold">FROM OUR ALUMNI</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {quotes.map((quote, idx) => (
              <div key={idx} className="bg-white border border-[#E4E7EC] rounded-xl p-6 flex flex-col" style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
                <div className="w-10 h-10 bg-[#4F46E5] text-white rounded-full flex items-center justify-center text-sm font-bold mb-4 shrink-0">
                  {quote.initials}
                </div>
                <p className="text-[#6B7280] italic text-sm mb-6 flex-1">&quot;{quote.tip}&quot;</p>
                <div className="text-xs font-semibold text-[#111827]">
                  {quote.initials} · {quote.company} · {quote.role} · {quote.year}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 5. Footer */}
        <footer className="border-t border-[#E4E7EC] pt-6 pb-2 text-center">
          <p className="text-sm text-[#6B7280]">
            PrepSync AI · Built for campus placement season 2025
          </p>
        </footer>
      </div>
    </div>
  );
}
