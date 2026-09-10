"use client";

import {
  Bus,
  CircleDot,
  Clock3,
  MapPin,
  Navigation,
  Users,
} from "lucide-react";

const buses = [
  { id: "B-04", route: "North Campus → Main Campus", status: "En route", eta: "08 min", passengers: 42, speed: "34 km/h" },
  { id: "B-07", route: "Hostel Block → Main Campus", status: "En route", eta: "14 min", passengers: 31, speed: "28 km/h" },
  { id: "B-02", route: "East Gate → Engineering", status: "Arriving", eta: "03 min", passengers: 38, speed: "21 km/h" },
  { id: "B-11", route: "South Block → Main Campus", status: "Idle", eta: "—", passengers: 0, speed: "0 km/h" },
];

export default function TransportOverview() {
  return (
    <div className="space-y-3">
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        <Metric icon={Bus} label="Active vehicles" value="18" />
        <Metric icon={Navigation} label="On route" value="14" />
        <Metric icon={Users} label="Passengers today" value="384" />
        <Metric icon={Clock3} label="Avg. delay" value="04 min" />
      </div>

      <div className="grid gap-3 xl:grid-cols-[1.45fr_0.55fr]">
        <section className="overflow-hidden rounded-2xl border border-white/[0.07] bg-[#101113]">
          <div className="flex items-center justify-between border-b border-white/[0.06] p-5">
            <div>
              <p className="text-xs font-medium text-white/70">Live fleet</p>
              <p className="mt-1 text-[9px] text-white/25">
                Real-time transport overview
              </p>
            </div>

            <div className="flex items-center gap-2 text-[8px] text-white/30">
              <span className="live-dot h-1.5 w-1.5 rounded-full bg-white" />
              LIVE
            </div>
          </div>

          <div className="map-grid relative h-[390px] overflow-hidden bg-[#0c0d0f]">
            <div className="absolute left-[8%] top-[18%] h-[2px] w-[84%] rotate-[8deg] bg-white/[0.05]" />
            <div className="absolute left-[18%] top-[48%] h-[2px] w-[70%] -rotate-[16deg] bg-white/[0.05]" />
            <div className="absolute left-[42%] top-[5%] h-[88%] w-[2px] rotate-[18deg] bg-white/[0.05]" />
            <div className="absolute left-[15%] top-[73%] h-[2px] w-[75%] rotate-[4deg] bg-white/[0.05]" />

            <div className="absolute left-[18%] top-[30%] flex flex-col items-center">
              <MapPin className="h-5 w-5 fill-white text-white" />
              <span className="mt-1 rounded bg-[#0c0d0f]/90 px-2 py-1 text-[8px] text-white/45">
                North Campus
              </span>
            </div>

            <div className="absolute left-[51%] top-[52%] flex flex-col items-center">
              <MapPin className="h-5 w-5 fill-white text-white" />
              <span className="mt-1 rounded bg-[#0c0d0f]/90 px-2 py-1 text-[8px] text-white/45">
                Main Campus
              </span>
            </div>

            <div className="absolute right-[17%] top-[26%] flex flex-col items-center">
              <MapPin className="h-5 w-5 fill-white text-white" />
              <span className="mt-1 rounded bg-[#0c0d0f]/90 px-2 py-1 text-[8px] text-white/45">
                Hostel Block
              </span>
            </div>

            <div className="absolute left-[31%] top-[43%]">
              <BusMarker id="B-04" />
            </div>

            <div className="absolute right-[28%] top-[38%]">
              <BusMarker id="B-07" />
            </div>

            <div className="absolute left-[63%] top-[62%]">
              <BusMarker id="B-02" />
            </div>

            <div className="absolute bottom-4 left-4 rounded-xl border border-white/[0.07] bg-[#101113]/90 px-3 py-2 backdrop-blur-md">
              <p className="text-[8px] uppercase tracking-[0.15em] text-white/25">
                Network status
              </p>
              <p className="mt-1 text-[10px] text-white/60">
                All routes operational
              </p>
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-white/[0.07] bg-[#101113]">
          <div className="border-b border-white/[0.06] p-5">
            <p className="text-xs font-medium text-white/70">Fleet status</p>
            <p className="mt-1 text-[9px] text-white/25">
              Current vehicle activity
            </p>
          </div>

          <div className="divide-y divide-white/[0.05]">
            {buses.map((bus) => (
              <div key={bus.id} className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.05]">
                      <Bus className="h-4 w-4 text-white/40" />
                    </div>

                    <div>
                      <p className="text-[10px] font-semibold">{bus.id}</p>
                      <p className="mt-0.5 text-[8px] text-white/25">
                        {bus.status}
                      </p>
                    </div>
                  </div>

                  <span className="text-xs font-semibold">{bus.eta}</span>
                </div>

                <p className="mt-3 truncate text-[9px] text-white/35">
                  {bus.route}
                </p>

                <div className="mt-3 flex gap-4 text-[8px] text-white/25">
                  <span>{bus.passengers} passengers</span>
                  <span>{bus.speed}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function BusMarker({ id }: { id: string }) {
  return (
    <div className="flex items-center gap-1.5 rounded-lg border border-white/[0.1] bg-[#151619] px-2 py-1.5 shadow-xl">
      <CircleDot className="h-3 w-3 text-white/60" />
      <span className="text-[8px] font-semibold">{id}</span>
    </div>
  );
}

function Metric({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Bus;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-white/[0.07] bg-[#101113] p-4">
      <Icon className="h-4 w-4 text-white/30" />
      <p className="mt-5 text-[9px] text-white/30">{label}</p>
      <p className="mt-1 text-2xl font-semibold tracking-[-0.05em]">
        {value}
      </p>
    </div>
  );
}
