"use client";

import { Check } from "lucide-react";

function PhoneFrame({ children, className = "" }) {
  return (
    <div
      className={`relative bg-[#1a1a1a] rounded-[28px] sm:rounded-[36px] lg:rounded-[44px] shadow-[0_25px_60px_rgba(0,0,0,0.18)] overflow-hidden ${className}`}
    >
      {/* Bezel padding */}
      <div className="absolute inset-[2px] sm:inset-[3px] rounded-[26px] sm:rounded-[33px] lg:rounded-[41px] overflow-hidden bg-white">
        {/* Dynamic Island */}
        <div className="absolute top-[6px] sm:top-[8px] left-1/2 -translate-x-1/2 w-[50px] sm:w-[70px] lg:w-[84px] h-[14px] sm:h-[18px] lg:h-[22px] bg-black rounded-full z-20" />
        {/* Screen */}
        <div className="w-full h-full bg-[#F5F6F8]">{children}</div>
      </div>
    </div>
  );
}

function CalendarScreen() {
  const days = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];
  return (
    <div className="w-full h-full flex flex-col text-[3px] sm:text-[4px] lg:text-[5px]">
      {/* Header */}
      <div className="bg-white pt-[22px] sm:pt-[28px] lg:pt-[36px] px-[6px] sm:px-[8px] lg:px-[10px] pb-[4px] sm:pb-[6px]">
        <div className="flex items-center justify-between mb-[4px] sm:mb-[6px]">
          <span className="text-[5px] sm:text-[7px] lg:text-[9px] font-bold text-[#0A1B28]">
            Calendar
          </span>
          <div className="flex gap-[2px] sm:gap-[3px]">
            <div className="w-[8px] h-[8px] sm:w-[12px] sm:h-[12px] lg:w-[14px] lg:h-[14px] rounded-full bg-primary/10 flex items-center justify-center">
              <div className="w-[3px] h-[3px] sm:w-[5px] sm:h-[5px] rounded-sm bg-primary/40" />
            </div>
            <div className="w-[8px] h-[8px] sm:w-[12px] sm:h-[12px] lg:w-[14px] lg:h-[14px] rounded-full bg-primary/10 flex items-center justify-center">
              <div className="w-[3px] h-[3px] sm:w-[5px] sm:h-[5px] rounded-sm bg-primary/40" />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-[2px] mb-[4px] sm:mb-[6px]">
          <span className="text-[4px] sm:text-[6px] lg:text-[7px] font-semibold text-[#0A1B28]">
            January 2026
          </span>
          <svg width="4" height="4" viewBox="0 0 6 6" className="text-[#393E41] sm:w-[6px] sm:h-[6px]">
            <path d="M1.5 2L3 4L4.5 2" fill="currentColor" />
          </svg>
        </div>
        {/* Day headers */}
        <div className="grid grid-cols-7 gap-[1px] mb-[2px]">
          {days.map((d) => (
            <div key={d} className="text-center font-medium text-[#393E41]/50 py-[1px]">
              {d}
            </div>
          ))}
        </div>
        {/* Date grid */}
        <div className="grid grid-cols-7 gap-[1px]">
          {[
            [1, 2, 3, 4, 5, 6, 7],
            [8, 9, 10, 11, 12, 13, 14],
            [15, 16, 17, 18, 19, 20, 21],
            [22, 23, 24, 25, 26, 27, 28],
            [29, 30, 31, null, null, null, null],
          ]
            .flat()
            .map((d, i) => (
              <div
                key={i}
                className={`text-center py-[2px] sm:py-[3px] rounded-[2px] sm:rounded-[3px] font-medium ${
                  d === 15
                    ? "bg-primary text-white"
                    : d === 8 || d === 22
                      ? "bg-secondary text-white"
                      : d === 5
                        ? "bg-[#34A853] text-white"
                        : d
                          ? "text-[#0A1B28]"
                          : ""
                }`}
              >
                {d || ""}
              </div>
            ))}
        </div>
      </div>
      {/* Events */}
      <div className="flex-1 px-[6px] sm:px-[8px] lg:px-[10px] pt-[4px] sm:pt-[6px] space-y-[3px] sm:space-y-[4px]">
        {[
          { title: "Kitchen Renovation", time: "09:00 – 12:00 · Team A", color: "border-primary" },
          { title: "Roof Inspection", time: "13:00 – 15:30 · M. Weber", color: "border-secondary" },
          { title: "Client Meeting", time: "16:00 – 17:00 · Office", color: "border-[#34A853]" },
        ].map((ev) => (
          <div
            key={ev.title}
            className={`bg-white rounded-[3px] sm:rounded-[4px] lg:rounded-[6px] p-[3px] sm:p-[4px] lg:p-[6px] border-l-[2px] sm:border-l-[3px] ${ev.color} shadow-[0_1px_2px_rgba(0,0,0,0.04)]`}
          >
            <div className="text-[4px] sm:text-[5px] lg:text-[6px] font-semibold text-[#0A1B28]">
              {ev.title}
            </div>
            <div className="text-[3px] sm:text-[4px] lg:text-[5px] text-[#393E41] mt-[1px]">
              {ev.time}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function DashboardScreen() {
  const avatars = [
    { bg: "bg-primary", initials: "FS" },
    { bg: "bg-secondary", initials: "MW" },
    { bg: "bg-[#34A853]", initials: "AK" },
    { bg: "bg-[#E8912D]", initials: "LB" },
    { bg: "bg-[#7C3AED]", initials: "TH" },
  ];
  return (
    <div className="w-full h-full flex flex-col text-[3px] sm:text-[4px] lg:text-[5px]">
      {/* Dark header */}
      <div className="bg-secondary pt-[22px] sm:pt-[28px] lg:pt-[36px] px-[6px] sm:px-[8px] lg:px-[10px] pb-[6px] sm:pb-[8px] lg:pb-[10px] text-white">
        <div className="text-[3px] sm:text-[4px] lg:text-[5px] opacity-70">Good morning,</div>
        <div className="text-[5px] sm:text-[7px] lg:text-[9px] font-bold mt-[1px]">
          Felix S. 👋
        </div>
        {/* Avatar row */}
        <div className="flex items-center mt-[4px] sm:mt-[6px] gap-[2px]">
          {avatars.map((a, i) => (
            <div
              key={i}
              className={`w-[10px] h-[10px] sm:w-[14px] sm:h-[14px] lg:w-[18px] lg:h-[18px] rounded-full ${a.bg} flex items-center justify-center border border-white/30`}
            >
              <span className="text-[3px] sm:text-[4px] lg:text-[5px] font-bold text-white">
                {a.initials}
              </span>
            </div>
          ))}
          <div className="w-[10px] h-[10px] sm:w-[14px] sm:h-[14px] lg:w-[18px] lg:h-[18px] rounded-full bg-white/20 flex items-center justify-center">
            <span className="text-[3px] sm:text-[4px] lg:text-[5px] text-white/80">+3</span>
          </div>
        </div>
        {/* Stats */}
        <div className="flex gap-[3px] sm:gap-[4px] mt-[4px] sm:mt-[6px]">
          <div className="flex-1 bg-white/10 rounded-[3px] sm:rounded-[5px] p-[3px] sm:p-[4px] lg:p-[5px]">
            <div className="text-[3px] sm:text-[4px] opacity-70">Active Jobs</div>
            <div className="text-[6px] sm:text-[8px] lg:text-[10px] font-bold">12</div>
          </div>
          <div className="flex-1 bg-white/10 rounded-[3px] sm:rounded-[5px] p-[3px] sm:p-[4px] lg:p-[5px]">
            <div className="text-[3px] sm:text-[4px] opacity-70">Revenue</div>
            <div className="text-[6px] sm:text-[8px] lg:text-[10px] font-bold">€4,280</div>
          </div>
        </div>
      </div>
      {/* Appointments */}
      <div className="flex-1 px-[6px] sm:px-[8px] lg:px-[10px] pt-[4px] sm:pt-[6px]">
        <div className="text-[4px] sm:text-[5px] lg:text-[7px] font-bold text-[#0A1B28] mb-[3px] sm:mb-[4px]">
          Upcoming Appointments
        </div>
        <div className="space-y-[3px] sm:space-y-[4px]">
          {[
            { name: "Müller Residence", time: "09:00 – 10:30", dot: "bg-primary" },
            { name: "Schmidt Office", time: "11:00 – 12:30", dot: "bg-secondary" },
            { name: "Fischer Bathroom", time: "14:00 – 16:00", dot: "bg-[#34A853]" },
          ].map((a) => (
            <div
              key={a.name}
              className="bg-white rounded-[3px] sm:rounded-[4px] lg:rounded-[6px] p-[3px] sm:p-[4px] lg:p-[5px] flex items-center gap-[3px] sm:gap-[4px] shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
            >
              <div className={`w-[3px] sm:w-[4px] h-[12px] sm:h-[16px] lg:h-[20px] rounded-full ${a.dot}`} />
              <div className="flex-1">
                <div className="text-[4px] sm:text-[5px] lg:text-[6px] font-semibold text-[#0A1B28]">
                  {a.name}
                </div>
                <div className="text-[3px] sm:text-[4px] lg:text-[5px] text-[#393E41]">
                  {a.time}
                </div>
              </div>
              <svg width="4" height="6" viewBox="0 0 4 6" className="text-[#393E41]/30 sm:w-[5px] sm:h-[8px]">
                <path d="M1 1L3 3L1 5" stroke="currentColor" strokeWidth="0.8" fill="none" />
              </svg>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function RenovationsScreen() {
  return (
    <div className="w-full h-full flex flex-col text-[3px] sm:text-[4px] lg:text-[5px]">
      <div className="bg-white pt-[22px] sm:pt-[28px] lg:pt-[36px] px-[6px] sm:px-[8px] lg:px-[10px] pb-[4px] sm:pb-[6px]">
        <div className="text-[5px] sm:text-[7px] lg:text-[9px] font-bold text-[#0A1B28]">
          Upcoming Renovations
        </div>
        <div className="text-[3px] sm:text-[4px] lg:text-[5px] text-[#393E41] mt-[1px]">
          4 projects this week
        </div>
      </div>
      <div className="flex-1 px-[6px] sm:px-[8px] lg:px-[10px] pt-[3px] sm:pt-[4px] space-y-[3px] sm:space-y-[4px]">
        {[
          { title: "Bathroom Remodel", addr: "Berliner Str. 42", status: "In Progress", statusColor: "bg-primary/15 text-primary", avatar: "bg-primary", initials: "BR" },
          { title: "Window Install", addr: "Hauptstr. 15", status: "Scheduled", statusColor: "bg-secondary/15 text-secondary", avatar: "bg-secondary", initials: "WI" },
          { title: "Floor Tiling", addr: "Gartenweg 8", status: "In Progress", statusColor: "bg-[#34A853]/15 text-[#34A853]", avatar: "bg-[#34A853]", initials: "FT" },
          { title: "Electrical Work", addr: "Am Markt 3", status: "Pending", statusColor: "bg-[#E8912D]/15 text-[#E8912D]", avatar: "bg-[#E8912D]", initials: "EW" },
        ].map((p) => (
          <div
            key={p.title}
            className="bg-white rounded-[3px] sm:rounded-[4px] lg:rounded-[6px] p-[3px] sm:p-[4px] lg:p-[6px] flex items-center gap-[3px] sm:gap-[4px] shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
          >
            <div
              className={`w-[12px] h-[12px] sm:w-[16px] sm:h-[16px] lg:w-[20px] lg:h-[20px] rounded-[2px] sm:rounded-[3px] lg:rounded-[4px] ${p.avatar} flex items-center justify-center shrink-0`}
            >
              <span className="text-[3px] sm:text-[4px] lg:text-[5px] font-bold text-white">
                {p.initials}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[4px] sm:text-[5px] lg:text-[6px] font-semibold text-[#0A1B28] truncate">
                {p.title}
              </div>
              <div className="text-[3px] sm:text-[4px] lg:text-[5px] text-[#393E41]">
                {p.addr}
              </div>
            </div>
            <div
              className={`px-[3px] sm:px-[4px] py-[1px] sm:py-[2px] rounded-full ${p.statusColor} text-[2.5px] sm:text-[3px] lg:text-[4px] font-semibold whitespace-nowrap`}
            >
              {p.status}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TimeTrackingScreen() {
  return (
    <div className="w-full h-full flex flex-col text-[3px] sm:text-[4px] lg:text-[5px]">
      <div className="bg-white pt-[22px] sm:pt-[28px] lg:pt-[36px] px-[6px] sm:px-[8px] lg:px-[10px] pb-[4px] sm:pb-[6px]">
        <div className="text-[5px] sm:text-[7px] lg:text-[9px] font-bold text-[#0A1B28]">
          Time Tracking
        </div>
        <div className="text-[3px] sm:text-[4px] lg:text-[5px] text-[#393E41] mt-[1px]">
          Today · 6h 45min logged
        </div>
      </div>
      <div className="flex-1 px-[6px] sm:px-[8px] lg:px-[10px] pt-[3px] sm:pt-[4px] space-y-[3px] sm:space-y-[4px]">
        {/* Progress ring placeholder */}
        <div className="flex items-center justify-center py-[4px] sm:py-[6px]">
          <div className="w-[30px] h-[30px] sm:w-[40px] sm:h-[40px] lg:w-[50px] lg:h-[50px] rounded-full border-[3px] sm:border-[4px] border-primary/20 relative">
            <div
              className="absolute inset-0 rounded-full border-[3px] sm:border-[4px] border-primary"
              style={{ clipPath: "polygon(0 0, 100% 0, 100% 85%, 0 85%)" }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-[5px] sm:text-[7px] lg:text-[9px] font-bold text-[#0A1B28]">
                84%
              </span>
            </div>
          </div>
        </div>
        {[
          { task: "Kitchen Renovation", hrs: "3h 15min", color: "bg-primary" },
          { task: "Roof Inspection", hrs: "2h 00min", color: "bg-secondary" },
          { task: "Documentation", hrs: "1h 30min", color: "bg-[#34A853]" },
        ].map((t) => (
          <div
            key={t.task}
            className="bg-white rounded-[3px] sm:rounded-[4px] lg:rounded-[6px] p-[3px] sm:p-[4px] lg:p-[5px] flex items-center gap-[3px] shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
          >
            <div className={`w-[3px] sm:w-[4px] h-[10px] sm:h-[14px] lg:h-[16px] rounded-full ${t.color}`} />
            <div className="flex-1">
              <div className="text-[4px] sm:text-[5px] lg:text-[6px] font-semibold text-[#0A1B28]">
                {t.task}
              </div>
            </div>
            <span className="text-[3px] sm:text-[4px] lg:text-[5px] font-medium text-[#393E41]">
              {t.hrs}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function WorkerCharacter() {
  return (
    <svg
      viewBox="0 0 140 320"
      className="w-full h-full drop-shadow-[0_8px_16px_rgba(0,0,0,0.1)]"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Hard hat */}
      <path d="M46 38C46 22 58 10 70 10C82 10 94 22 94 38" fill="#CC8640" />
      <ellipse cx="70" cy="40" rx="32" ry="8" fill="#E8A050" />
      <rect x="40" y="36" width="60" height="5" rx="2.5" fill="#CC8640" />
      <rect x="42" y="34" width="56" height="3" rx="1.5" fill="#E8A050" />

      {/* Hair sides */}
      <path d="M44 42C42 42 40 48 42 55L48 50V42H44Z" fill="#5C3A1E" />
      <path d="M96 42C98 42 100 48 98 55L92 50V42H96Z" fill="#5C3A1E" />

      {/* Face */}
      <ellipse cx="70" cy="58" rx="22" ry="20" fill="#F5D0A9" />

      {/* Eyes */}
      <ellipse cx="61" cy="55" rx="2.5" ry="3" fill="#2D3436" />
      <ellipse cx="79" cy="55" rx="2.5" ry="3" fill="#2D3436" />
      <circle cx="60" cy="53.5" r="1" fill="white" />
      <circle cx="78" cy="53.5" r="1" fill="white" />

      {/* Eyebrows */}
      <path d="M56 49Q61 46 66 49" stroke="#5C3A1E" strokeWidth="1.8" strokeLinecap="round" fill="none" />
      <path d="M74 49Q79 46 84 49" stroke="#5C3A1E" strokeWidth="1.8" strokeLinecap="round" fill="none" />

      {/* Nose */}
      <path d="M68 60Q70 64 72 60" stroke="#D4A980" strokeWidth="1.2" strokeLinecap="round" fill="none" />

      {/* Smile */}
      <path d="M62 67Q70 74 78 67" stroke="#2D3436" strokeWidth="1.8" strokeLinecap="round" fill="none" />

      {/* Ears */}
      <ellipse cx="47" cy="58" rx="4" ry="6" fill="#F5D0A9" />
      <ellipse cx="93" cy="58" rx="4" ry="6" fill="#F5D0A9" />

      {/* Neck */}
      <rect x="60" y="76" width="20" height="12" rx="4" fill="#F5D0A9" />

      {/* T-shirt (orange/amber) */}
      <path d="M40 88L60 86H80L100 88V130C100 130 90 132 70 132C50 132 40 130 40 130V88Z" fill="#CC8640" />
      {/* T-shirt collar */}
      <path d="M58 86Q70 94 82 86" stroke="#B87530" strokeWidth="1.5" fill="none" />
      {/* T-shirt sleeves */}
      <path d="M40 88L26 100L30 108L46 98" fill="#CC8640" />
      <path d="M100 88L114 100L110 108L94 98" fill="#CC8640" />

      {/* Overalls */}
      <path d="M42 120H98V220C98 226 94 230 88 230H52C46 230 42 226 42 220V120Z" fill="#304C61" />
      {/* Overalls bib */}
      <rect x="52" y="110" width="36" height="28" rx="4" fill="#304C61" />
      {/* Straps */}
      <path d="M52 110L48 94" stroke="#3A5A73" strokeWidth="6" strokeLinecap="round" />
      <path d="M88 110L92 94" stroke="#3A5A73" strokeWidth="6" strokeLinecap="round" />
      {/* Strap buttons */}
      <circle cx="52" cy="112" r="3" fill="#E8A050" />
      <circle cx="88" cy="112" r="3" fill="#E8A050" />
      {/* Bib pocket */}
      <rect x="60" y="116" width="20" height="12" rx="3" fill="#3A5A73" />
      <path d="M63 119H77" stroke="#4A6A83" strokeWidth="1.2" strokeLinecap="round" />
      {/* Side pockets */}
      <path d="M42 170H58V190H42V170Z" fill="#3A5A73" />
      <path d="M82 170H98V190H82V170Z" fill="#3A5A73" />
      {/* Stitch lines */}
      <path d="M70 138V220" stroke="#3A5A73" strokeWidth="1" strokeDasharray="3 2" />

      {/* Left arm — bent, hand on hip */}
      <path d="M40 92C30 100 24 112 28 122C30 128 36 130 40 126L46 108" fill="#F5D0A9" />
      <path d="M40 92L46 108" stroke="#CC8640" strokeWidth="0.5" fill="none" />

      {/* Right arm — holding phone */}
      <path d="M100 92C108 100 114 108 112 122C110 126 108 130 104 128" fill="#F5D0A9" />
      {/* Right hand */}
      <circle cx="112" cy="120" r="7" fill="#F5D0A9" />

      {/* Phone in right hand */}
      <rect x="104" y="106" width="16" height="28" rx="3" fill="#1A1A1A" />
      <rect x="106" y="109" width="12" height="22" rx="1.5" fill="#4A9EFF" />
      <rect x="108" y="112" width="8" height="2" rx="1" fill="white" opacity="0.6" />
      <rect x="108" y="116" width="6" height="2" rx="1" fill="white" opacity="0.4" />
      <rect x="108" y="120" width="8" height="2" rx="1" fill="white" opacity="0.3" />

      {/* Legs */}
      <rect x="48" y="228" width="18" height="52" rx="5" fill="#304C61" />
      <rect x="74" y="228" width="18" height="52" rx="5" fill="#304C61" />

      {/* Boots */}
      <path d="M46 274H68C70 274 72 276 72 278V286C72 290 70 292 66 292H42C39 292 37 290 37 287V280C37 276 40 274 46 274Z" fill="#5C4033" />
      <path d="M72 274H94C96 274 98 276 98 278V286C98 290 96 292 92 292H68C65 292 63 290 63 287V280C63 276 66 274 72 274Z" fill="#5C4033" />
      {/* Boot soles */}
      <rect x="37" y="288" width="35" height="4" rx="2" fill="#3D2A1E" />
      <rect x="63" y="288" width="35" height="4" rx="2" fill="#3D2A1E" />
      {/* Boot straps */}
      <rect x="42" y="276" width="26" height="3" rx="1.5" fill="#7A5A45" />
      <rect x="68" y="276" width="26" height="3" rx="1.5" fill="#7A5A45" />
    </svg>
  );
}

export default function PhoneMockups() {
  return (
    <div className="relative w-full h-[340px] sm:h-[400px] lg:h-[480px] xl:h-[520px]">
      {/* Subtle glow behind phones */}
      <div
        className="absolute top-[10%] left-[5%] w-[90%] h-[80%] bg-gradient-to-br from-primary/15 via-primary/5 to-transparent blur-[60px] rounded-full pointer-events-none"
        aria-hidden
      />

      {/* Phone 1 — Time Tracking (far left, behind) */}
      <PhoneFrame className="absolute w-[90px] sm:w-[110px] lg:w-[140px] xl:w-[155px] h-[180px] sm:h-[220px] lg:h-[280px] xl:h-[310px] left-0 top-[14%] z-[5] -rotate-[4deg] opacity-90">
        <TimeTrackingScreen />
      </PhoneFrame>

      {/* Phone 2 — Calendar (center-left, prominent) */}
      <PhoneFrame className="absolute w-[110px] sm:w-[135px] lg:w-[170px] xl:w-[190px] h-[220px] sm:h-[270px] lg:h-[340px] xl:h-[380px] left-[14%] sm:left-[15%] lg:left-[14%] top-[2%] z-[20] -rotate-[1deg]">
        <CalendarScreen />
      </PhoneFrame>

      {/* Phone 3 — Dashboard (center-right) */}
      <PhoneFrame className="absolute w-[105px] sm:w-[128px] lg:w-[160px] xl:w-[178px] h-[210px] sm:h-[256px] lg:h-[320px] xl:h-[356px] right-[20%] sm:right-[18%] lg:right-[18%] top-[5%] z-[15] rotate-[2deg]">
        <DashboardScreen />
      </PhoneFrame>

      {/* Phone 4 — Renovations (far right, behind) */}
      <PhoneFrame className="absolute w-[85px] sm:w-[105px] lg:w-[132px] xl:w-[148px] h-[170px] sm:h-[210px] lg:h-[264px] xl:h-[296px] right-[2%] sm:right-[1%] lg:right-[1%] top-[12%] z-[10] rotate-[4deg] opacity-90">
        <RenovationsScreen />
      </PhoneFrame>

      {/* Worker character */}
      <div className="absolute right-[6%] sm:right-[4%] lg:right-[3%] bottom-0 w-[52px] sm:w-[62px] lg:w-[78px] xl:w-[88px] h-[145px] sm:h-[172px] lg:h-[216px] xl:h-[244px] z-[25]">
        <WorkerCharacter />
      </div>

      {/* Floating notification */}
      <div className="hidden sm:flex absolute right-[1%] lg:right-[4%] top-[2%] z-[30] items-center gap-1.5 sm:gap-2 bg-white rounded-xl sm:rounded-2xl shadow-[0_12px_32px_rgba(1,46,51,0.14)] px-2.5 sm:px-3 py-1.5 sm:py-2 animate-[float_3s_ease-in-out_infinite]">
        <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-[#34A853]/15 flex items-center justify-center">
          <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#34A853]" />
        </div>
        <div>
          <p className="text-[9px] sm:text-[10px] font-semibold text-[#0A1B28]">
            Time entry created
          </p>
          <p className="text-[7px] sm:text-[8px] text-[#393E41]">
            01:30 · 10:30 – 12:00
          </p>
        </div>
      </div>
    </div>
  );
}
