export function BeachBackdrop() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      {/* Sky + ocean + sand gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, #bfeaf5 0%, #9adcec 12%, #5cc4dd 26%, #2ea6c2 40%, #1f96a9 63%, #ffe9b8 63%, #ffdd9c 78%, #f6c877 100%)",
        }}
      />

      {/* Sun */}
      <div
        className="absolute top-8 right-8 h-24 w-24 rounded-full sm:top-12 sm:right-16 sm:h-32 sm:w-32"
        style={{
          background: "radial-gradient(circle, #fff6d6 0%, #ffe58a 45%, #ffd35c 75%, rgba(255,211,92,0) 100%)",
          boxShadow: "0 0 60px 20px rgba(255, 213, 110, 0.45)",
        }}
      />

      {/* Clouds */}
      <div className="absolute top-14 left-[8%] h-8 w-24 rounded-full bg-white/70 blur-[1px] sm:top-16 sm:h-10 sm:w-32" />
      <div className="absolute top-20 left-[14%] h-6 w-16 rounded-full bg-white/60 blur-[1px] sm:top-24 sm:h-8 sm:w-20" />
      <div className="absolute top-24 right-[28%] h-6 w-20 rounded-full bg-white/50 blur-[1px] sm:top-28 sm:h-7 sm:w-24" />

      {/* Waves near the shoreline */}
      <svg
        className="absolute top-[57%] left-0 w-[200%] sm:top-[59%]"
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
      >
        <path
          d="M0,40 C240,90 480,0 720,40 C960,80 1200,10 1440,50 L1440,120 L0,120 Z"
          fill="rgba(255,255,255,0.35)"
        />
      </svg>
      <svg
        className="absolute top-[61%] left-0 w-[200%] sm:top-[63%]"
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
      >
        <path
          d="M0,60 C240,10 480,100 720,60 C960,20 1200,90 1440,40 L1440,120 L0,120 Z"
          fill="rgba(255,255,255,0.5)"
        />
      </svg>

      {/* Shells & starfish scattered in the sand */}
      <svg className="absolute bottom-[10%] left-[10%] h-8 w-8 opacity-50 sm:h-10 sm:w-10" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 2c4 3 8 6 8 12a8 8 0 0 1-16 0c0-6 4-9 8-12z"
          fill="#e2b45c"
          stroke="#b47c30"
          strokeWidth="1"
        />
        <path d="M12 6v14M8 9l2 11M16 9l-2 11" stroke="#b47c30" strokeWidth="0.75" />
      </svg>
      <svg className="absolute right-[14%] bottom-[6%] h-6 w-6 rotate-12 opacity-40 sm:h-8 sm:w-8" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 2l2.2 6.8H21l-5.6 4.1 2.2 6.9L12 15.7 6.4 19.8l2.2-6.9L3 8.8h6.8L12 2z"
          fill="#ff8a6b"
        />
      </svg>
      <svg className="absolute bottom-[16%] left-[34%] h-5 w-5 opacity-40" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 2l2.2 6.8H21l-5.6 4.1 2.2 6.9L12 15.7 6.4 19.8l2.2-6.9L3 8.8h6.8L12 2z"
          fill="#1f96a9"
        />
      </svg>
    </div>
  );
}
