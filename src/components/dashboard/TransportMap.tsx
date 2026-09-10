import { ArrowUpRight, Bus, MapPin, Plus } from "lucide-react";

export default function TransportMap() {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/[0.07] bg-[#101113]">
      <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-[12px] font-semibold">Live transport</h2>

            <span className="flex items-center gap-1.5 rounded-full border border-white/[0.07] bg-white/[0.025] px-2 py-1 text-[8px] text-white/40">
              <span className="live-dot h-1.5 w-1.5 rounded-full bg-white" />
              LIVE
            </span>
          </div>

          <p className="mt-1 text-[9px] text-white/30">
            8 active routes · 23 buses currently operating
          </p>
        </div>

        <button className="flex items-center gap-1.5 rounded-lg border border-white/[0.07] px-2.5 py-2 text-[9px] text-white/40 transition hover:bg-white/[0.04] hover:text-white/70">
          View all
          <ArrowUpRight className="h-3 w-3" />
        </button>
      </div>

      <div className="relative h-[390px] overflow-hidden bg-[#111417]">
        <div className="map-grid absolute inset-0 opacity-50" />

        {/* Fake roads */}
        <div className="absolute left-[-10%] top-[49%] h-[7px] w-[125%] rotate-[-12deg] bg-white/[0.035]" />

        <div className="absolute left-[18%] top-[-20%] h-[130%] w-[6px] rotate-[19deg] bg-white/[0.03]" />

        <div className="absolute left-[-10%] top-[72%] h-[5px] w-[120%] rotate-[18deg] bg-white/[0.025]" />

        <div className="absolute left-[67%] top-[-10%] h-[120%] w-[4px] rotate-[-28deg] bg-white/[0.025]" />

        {/* Route */}
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 1000 500"
          preserveAspectRatio="none"
        >
          <path
            d="M 80 390 C 210 360, 180 250, 320 280 S 520 420, 640 290 S 790 120, 930 145"
            fill="none"
            stroke="rgba(255,255,255,0.7)"
            strokeWidth="3"
            strokeDasharray="9 8"
          />

          <path
            d="M 80 390 C 210 360, 180 250, 320 280 S 520 420, 640 290 S 790 120, 930 145"
            fill="none"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="12"
          />
        </svg>

        <MapLocation
          label="Main Campus"
          sub="Central Gate"
          x="67%"
          y="58%"
          main
        />

        <MapLocation
          label="Hostel Block"
          sub="Pickup point"
          x="28%"
          y="32%"
        />

        <MapLocation
          label="Engineering"
          sub="Block A"
          x="78%"
          y="25%"
        />

        <BusMarker x="48%" y="63%" route="B-04" />
        <BusMarker x="75%" y="32%" route="B-07" />
        <BusMarker x="21%" y="72%" route="B-02" />

        {/* Map controls */}
        <div className="absolute bottom-4 right-4 flex flex-col overflow-hidden rounded-lg border border-white/[0.08] bg-[#111214]/90 backdrop-blur">
          <button className="flex h-8 w-8 items-center justify-center text-white/45 transition hover:bg-white/[0.06] hover:text-white">
            <Plus className="h-3.5 w-3.5" />
          </button>

          <div className="h-px bg-white/[0.07]" />

          <button className="flex h-8 w-8 items-center justify-center text-white/45 transition hover:bg-white/[0.06] hover:text-white">
            <span className="text-sm">−</span>
          </button>
        </div>

        <div className="absolute left-4 top-4 rounded-lg border border-white/[0.07] bg-[#111214]/90 px-3 py-2 backdrop-blur">
          <div className="flex items-center gap-2">
            <MapPin className="h-3.5 w-3.5 text-white/45" />

            <span className="text-[9px] text-white/55">
              Campus transport network
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function MapLocation({
  label,
  sub,
  x,
  y,
  main = false,
}: {
  label: string;
  sub: string;
  x: string;
  y: string;
  main?: boolean;
}) {
  return (
    <div
      className="absolute -translate-x-1/2 -translate-y-1/2"
      style={{ left: x, top: y }}
    >
      <div className="flex flex-col items-center">
        <div
          className={`flex h-7 w-7 items-center justify-center rounded-full border ${
            main
              ? "border-white/40 bg-white text-black"
              : "border-white/15 bg-[#191b1e] text-white/45"
          }`}
        >
          <MapPin className="h-3.5 w-3.5" strokeWidth={1.8} />
        </div>

        <div className="mt-1.5 rounded-md border border-white/[0.06] bg-[#101214]/90 px-2 py-1 text-center backdrop-blur">
          <p className="whitespace-nowrap text-[8px] font-medium text-white/65">
            {label}
          </p>

          <p className="whitespace-nowrap text-[7px] text-white/25">
            {sub}
          </p>
        </div>
      </div>
    </div>
  );
}

function BusMarker({
  x,
  y,
  route,
}: {
  x: string;
  y: string;
  route: string;
}) {
  return (
    <div
      className="absolute -translate-x-1/2 -translate-y-1/2"
      style={{ left: x, top: y }}
    >
      <div className="relative flex h-8 w-8 items-center justify-center rounded-full border border-white/30 bg-[#17191b] shadow-lg shadow-black/30">
        <Bus
          className="h-3.5 w-3.5 text-white/80"
          strokeWidth={1.8}
        />

        <span className="absolute -right-8 -top-2 rounded bg-white px-1.5 py-0.5 text-[7px] font-bold text-black">
          {route}
        </span>
      </div>

      <span className="live-dot absolute -right-0.5 -top-0.5 h-1.5 w-1.5 rounded-full bg-white" />
    </div>
  );
}