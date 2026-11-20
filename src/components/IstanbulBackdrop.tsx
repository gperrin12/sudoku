interface TurkishFlagProps {
  className?: string;
  flip?: boolean;
}

/** A small waving Turkish flag (red field, white crescent + star). */
function TurkishFlag({ className, flip }: TurkishFlagProps) {
  return (
    <svg
      viewBox="0 0 30 20"
      className={className}
      style={flip ? { transform: "scaleX(-1)" } : undefined}
    >
      <path d="M0,0 H22 C18,5 26,8 22,13 C18,18 26,15 22,20 H0 Z" fill="#d94c38" />
      <circle cx="10" cy="10" r="5.2" fill="#fdf8ec" />
      <circle cx="11.6" cy="10" r="4.2" fill="#d94c38" />
      <path
        d="M17.2 10l2.6-0.85-1.6 2.2 1.6 2.2-2.6-0.85-1.6 2.2 0-2.3-2.47-0.8 2.47-0.8 0-2.3z"
        fill="#fdf8ec"
      />
    </svg>
  );
}

const BUNTING_POINTS: [number, number][] = [
  [-20, 30],
  [40, 52],
  [100, 26],
  [160, 54],
  [220, 24],
  [280, 54],
  [340, 26],
  [400, 52],
  [460, 28],
  [500, 48],
];

function BuntingString() {
  const linePath = `M${BUNTING_POINTS.map(([x, y]) => `${x},${y}`).join(" L")}`;

  return (
    <svg
      className="absolute top-2 left-0 h-20 w-full sm:top-3"
      viewBox="0 0 480 90"
      preserveAspectRatio="none"
    >
      <path d={linePath} fill="none" stroke="#5c3f26" strokeWidth="1" opacity="0.5" />
      {BUNTING_POINTS.slice(0, -1).map(([x, y], i) => {
        const color = i % 2 === 0 ? "#d94c38" : "#fdf8ec";
        return (
          <path
            key={i}
            d={`M${x - 10},${y} L${x + 10},${y} L${x},${y + 20} Z`}
            fill={color}
            opacity="0.9"
          />
        );
      })}
    </svg>
  );
}

export function IstanbulBackdrop() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      {/* Dusk sky -> Bosphorus -> tiled waterfront gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, #241b3a 0%, #3c2a56 10%, #7a3e68 24%, #c2616a 36%, #e4935f 48%, #156587 58%, #0f4a5c 65%, #5c3f26 65%, #4a3420 100%)",
        }}
      />

      {/* Stars */}
      <div className="absolute top-6 left-[18%] h-1 w-1 rounded-full bg-white/80" />
      <div className="absolute top-10 left-[30%] h-1 w-1 rounded-full bg-white/60" />
      <div className="absolute top-16 left-[42%] h-1 w-1 rounded-full bg-white/70" />
      <div className="absolute top-8 left-[62%] h-1 w-1 rounded-full bg-white/50" />

      {/* Crescent moon + star */}
      <div className="absolute top-10 right-10 sm:top-14 sm:right-16">
        <svg viewBox="0 0 24 24" className="h-14 w-14 sm:h-20 sm:w-20">
          <path d="M15 3a9 9 0 1 0 0 18 7 7 0 1 1 0-18z" fill="#f7e3a1" />
        </svg>
        <svg viewBox="0 0 24 24" className="absolute top-1 -right-1 h-4 w-4 sm:h-5 sm:w-5">
          <path d="M12 2l1.8 4.6L18 8l-4.2 1.4L12 14l-1.8-4.6L6 8l4.2-1.4L12 2z" fill="#f7e3a1" />
        </svg>
      </div>

      {/* Festive bunting of Turkish flag colors across the top */}
      <BuntingString />

      {/* Minaret + dome skyline silhouette */}
      <svg
        className="absolute top-[50%] left-0 h-[22%] w-full sm:top-[52%]"
        viewBox="0 0 480 140"
        preserveAspectRatio="none"
      >
        <rect x="0" y="90" width="480" height="50" fill="#16222e" />
        <rect x="20" y="75" width="30" height="15" fill="#16222e" />
        <rect x="70" y="80" width="24" height="10" fill="#16222e" />
        <rect x="340" y="78" width="28" height="12" fill="#16222e" />
        <rect x="400" y="82" width="22" height="8" fill="#16222e" />

        {/* Large central dome (Hagia Sophia-like) */}
        <path d="M150,90 a35,35 0 0 1 70,0 Z" fill="#16222e" />
        <rect x="165" y="82" width="40" height="10" fill="#16222e" />
        <rect x="183.5" y="48" width="3" height="12" fill="#16222e" />
        <circle cx="185" cy="46" r="2.5" fill="#16222e" />

        {/* Minarets flanking the dome */}
        <rect x="120" y="38" width="7" height="52" fill="#16222e" />
        <path d="M116,38 L123.5,20 L131,38 Z" fill="#16222e" />
        <rect x="233" y="32" width="7" height="58" fill="#16222e" />
        <path d="M229,32 L236.5,12 L244,32 Z" fill="#16222e" />

        {/* Smaller dome cluster (Blue Mosque-like) */}
        <path d="M390,90 a22,22 0 0 1 44,0 Z" fill="#16222e" />
        <rect x="400" y="84" width="24" height="8" fill="#16222e" />
        <rect x="368" y="46" width="6" height="44" fill="#16222e" />
        <path d="M365,46 L371,30 L377,46 Z" fill="#16222e" />
        <rect x="438" y="50" width="6" height="40" fill="#16222e" />
        <path d="M435,50 L441,34 L447,50 Z" fill="#16222e" />
      </svg>

      {/* Turkish flag flying in the clear sky, top-left */}
      <div className="absolute top-20 left-5 h-14 w-0.5 bg-[#4a3420] sm:top-24 sm:left-8 sm:h-16" />
      <TurkishFlag className="absolute top-20 left-5 h-9 w-14 -rotate-2 drop-shadow-sm sm:top-24 sm:left-8 sm:h-10 sm:w-16" />

      {/* Ferry on the Bosphorus */}
      <svg className="absolute top-[60%] left-[16%] h-6 w-14 opacity-80 sm:top-[62%]" viewBox="0 0 56 24">
        <path d="M4,16 H52 L46,22 H10 Z" fill="#16222e" />
        <rect x="16" y="6" width="22" height="10" fill="#16222e" />
        <rect x="24" y="2" width="4" height="6" fill="#16222e" />
      </svg>

      {/* Waves on the water */}
      <svg
        className="absolute top-[68%] left-0 w-[200%] sm:top-[70%]"
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
      >
        <path
          d="M0,30 C240,60 480,10 720,30 C960,50 1200,10 1440,35 L1440,80 L0,80 Z"
          fill="rgba(255,255,255,0.18)"
        />
      </svg>

      {/* Iznik tile motif band along the waterfront */}
      <svg className="absolute inset-x-0 bottom-0 h-[26%] w-full" preserveAspectRatio="none" viewBox="0 0 160 60">
        <defs>
          <pattern id="iznik-tile" width="20" height="20" patternUnits="userSpaceOnUse">
            <rect width="20" height="20" fill="none" />
            <path
              d="M10 2 L18 10 L10 18 L2 10 Z"
              fill="none"
              stroke="#eaf6fb"
              strokeWidth="0.8"
              opacity="0.3"
            />
            <circle cx="10" cy="10" r="2" fill="#d94c38" opacity="0.35" />
          </pattern>
        </defs>
        <rect width="160" height="60" fill="url(#iznik-tile)" />
      </svg>

      {/* Tulips scattered in the foreground */}
      <svg className="absolute bottom-[8%] left-[12%] h-8 w-8 opacity-70" viewBox="0 0 24 24">
        <path d="M12 3c-3 1-4 4-3 7 .6 1.8 2 2.6 3 2.6s2.4-.8 3-2.6c1-3 0-6-3-7z" fill="#d94c38" />
        <path d="M12 12.6V21" stroke="#1e6272" strokeWidth="1.2" fill="none" />
      </svg>
      <svg className="absolute right-[32%] bottom-[12%] h-6 w-6 opacity-60" viewBox="0 0 24 24">
        <path d="M12 3c-3 1-4 4-3 7 .6 1.8 2 2.6 3 2.6s2.4-.8 3-2.6c1-3 0-6-3-7z" fill="#f0cf6e" />
        <path d="M12 12.6V21" stroke="#1e6272" strokeWidth="1.2" fill="none" />
      </svg>

      {/* A second Turkish flag planted in the foreground, near the tile band */}
      <div className="absolute right-[10%] bottom-[4%] h-12 w-0.5 bg-[#4a3420] sm:h-14" />
      <TurkishFlag flip className="absolute right-[10%] bottom-[11%] h-8 w-14 rotate-2 drop-shadow-sm sm:h-9" />
    </div>
  );
}
