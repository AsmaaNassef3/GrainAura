import { motion as Motion } from "framer-motion";
import { useEffect, useState } from "react";

const AuthSidePanel = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 15,
        y: (e.clientY / window.innerHeight) * 15,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      className="relative w-full h-full overflow-hidden"
      style={{
        background:
          "linear-gradient(160deg, #0a2418 0%, #0d3320 35%, #0f3d28 60%, #0a2e1e 100%)",
      }}
    >
      {/* Subtle noise texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Deep radial glow — top left */}
      <Motion.div
        className="absolute -top-20 -left-20 w-96 h-96 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(16,185,100,0.18) 0%, transparent 70%)",
          x: mousePosition.x * 0.4,
          y: mousePosition.y * 0.4,
        }}
      />

      {/* Deep radial glow — bottom right */}
      <Motion.div
        className="absolute -bottom-32 -right-20 w-125 h-125 rounded-full"
        animate={{ scale: [1, 1.08, 1], opacity: [0.6, 0.9, 0.6] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        style={{
          background:
            "radial-gradient(circle, rgba(5,150,80,0.14) 0%, transparent 65%)",
          x: mousePosition.x * -0.3,
          y: mousePosition.y * -0.3,
        }}
      />

      {/* Large ghost "AURA" text in background */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        style={{ zIndex: 1 }}
      >
        <span
          className="font-black uppercase tracking-[0.3em] text-white"
          style={{
            fontSize: "clamp(80px, 14vw, 160px)",
            opacity: 0.04,
            letterSpacing: "0.25em",
          }}
        >
          AURA
        </span>
      </div>

      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-[0.06]" style={{ zIndex: 1 }}>
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="grid2"
              width="48"
              height="48"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 48 0 L 0 0 0 48"
                fill="none"
                stroke="white"
                strokeWidth="0.8"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid2)" />
        </svg>
      </div>

      {/* Decorative circle shapes — bottom right */}
      <div
        className="absolute bottom-16 right-8 opacity-10"
        style={{ zIndex: 1 }}
      >
        <svg width="200" height="200" viewBox="0 0 200 200" fill="none">
          <circle cx="100" cy="100" r="80" stroke="white" strokeWidth="1" />
          <circle cx="100" cy="100" r="55" stroke="white" strokeWidth="0.8" />
          <circle cx="100" cy="100" r="30" stroke="white" strokeWidth="0.6" />
        </svg>
      </div>
      <div
        className="absolute top-24 right-4 opacity-[0.07]"
        style={{ zIndex: 1 }}
      >
        <svg width="130" height="130" viewBox="0 0 130 130" fill="none">
          <circle cx="65" cy="65" r="55" stroke="white" strokeWidth="0.8" />
          <circle cx="65" cy="65" r="35" stroke="white" strokeWidth="0.6" />
        </svg>
      </div>

      {/* ── Main Content ───────────────────────────────────────────────── */}
      <div
        className="relative flex flex-col h-full px-10 py-12"
        style={{ zIndex: 2 }}
      >
        {/* Top brand bar */}
        <Motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="flex items-center gap-3"
        >
          <div
            className="w-11 h-11 rounded-2xl flex items-center justify-center shadow-lg"
            style={{
              background: "linear-gradient(135deg, #1a7a50 0%, #0e5c3a 100%)",
              border: "1px solid rgba(255,255,255,0.15)",
            }}
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2L3 7L12 12L21 7L12 2Z"
                stroke="white"
                strokeWidth="1.8"
                strokeLinejoin="round"
              />
              <path
                d="M3 12L12 17L21 12"
                stroke="white"
                strokeWidth="1.8"
                strokeLinejoin="round"
              />
              <path
                d="M3 17L12 22L21 17"
                stroke="white"
                strokeWidth="1.8"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div>
            <p className="text-white font-bold text-lg tracking-wide leading-none">
              Aura
            </p>
            <p className="text-emerald-400/70 text-[10px] tracking-[0.25em] uppercase mt-0.5">
              Elevate Your Connection
            </p>
          </div>
        </Motion.div>

        {/* Main headline */}
        <div className="mt-auto mb-auto pt-16">
          <Motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
          >
            <h1
              className="font-black text-white leading-[0.95] tracking-tight"
              style={{ fontSize: "clamp(52px, 6vw, 80px)" }}
            >
              Stay
              <br />
              Connected.
            </h1>
            <h2
              className="font-black leading-[0.95] tracking-tight mt-1"
              style={{
                fontSize: "clamp(52px, 6vw, 80px)",
                color: "rgba(255,255,255,0.18)",
              }}
            >
              Stay You.
            </h2>
          </Motion.div>

          {/* Divider line */}
          <Motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-8 mb-6 h-px w-16 origin-left"
            style={{ background: "rgba(52,211,153,0.6)" }}
          />

          {/* Description */}
          <Motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55 }}
            className="text-base leading-relaxed max-w-sm"
            style={{
              color: "rgba(255,255,255,0.5)",
              borderLeft: "2px solid rgba(52,211,153,0.4)",
              paddingLeft: "16px",
            }}
          >
            Experience the definitive standard in premium communication.
            Seamless, secure, and designed for those who value clarity.
          </Motion.p>

          {/* Feature pills */}
          <Motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.75 }}
            className="flex flex-wrap gap-2 mt-8"
          >
            {[
              { label: "🔒 Secure", delay: 0.8 },
              { label: "⚡ Fast", delay: 0.9 },
              { label: "✨ Modern", delay: 1.0 },
            ].map(({ label, delay }) => (
              <Motion.span
                key={label}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay }}
                className="px-4 py-1.5 text-xs font-semibold rounded-full"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "rgba(255,255,255,0.65)",
                  backdropFilter: "blur(8px)",
                }}
              >
                {label}
              </Motion.span>
            ))}
          </Motion.div>
        </div>

        {/* Bottom — dots + year */}
        <Motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="flex items-center justify-between"
        >
          <div className="flex gap-2">
            {[0, 1, 2].map((i) => (
              <Motion.div
                key={i}
                className="rounded-full"
                style={{
                  width: i === 0 ? "28px" : "8px",
                  height: "8px",
                  background:
                    i === 0 ? "rgba(52,211,153,0.8)" : "rgba(255,255,255,0.25)",
                }}
                animate={i !== 0 ? { opacity: [0.3, 0.7, 0.3] } : {}}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
              />
            ))}
          </div>
          <span className="text-xs" style={{ color: "rgba(255,255,255,0.2)" }}>
            © 2026
          </span>
        </Motion.div>
      </div>
    </div>
  );
};

export default AuthSidePanel;
