"use client";

import {
  Bell,
  Building2,
  ChevronRight,
  Globe2,
  Lock,
  Palette,
  Save,
  ShieldCheck,
  UserRound,
} from "lucide-react";

const sections = [
  {
    icon: Building2,
    title: "Organisation",
    description: "Manage your organisation profile and workspace details.",
  },
  {
    icon: UserRound,
    title: "Account",
    description: "Personal information and administrator preferences.",
  },
  {
    icon: Bell,
    title: "Notifications",
    description: "Control alerts, reminders and workflow notifications.",
  },
  {
    icon: ShieldCheck,
    title: "Security & Access",
    description: "Authentication, sessions and access policies.",
  },
];

export default function SettingsOverview() {
  return (
    <div className="grid gap-3 xl:grid-cols-[0.72fr_1.28fr]">
      <section className="rounded-2xl border border-white/[0.07] bg-[#101113] p-5">
        <div>
          <p className="text-xs font-medium text-white/70">
            Settings
          </p>

          <p className="mt-1 text-[9px] text-white/25">
            Configure your OrgNexus workspace
          </p>
        </div>

        <div className="mt-5 space-y-1">
          {sections.map((section, index) => {
            const Icon = section.icon;

            return (
              <button
                key={section.title}
                className={`group flex w-full items-center gap-3 rounded-xl p-3 text-left transition hover:bg-white/[0.035] ${
                  index === 0 ? "bg-white/[0.04]" : ""
                }`}
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/[0.05] bg-white/[0.02]">
                  <Icon className="h-3.5 w-3.5 text-white/30 group-hover:text-white/55" />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-[9px] font-medium text-white/55">
                    {section.title}
                  </p>

                  <p className="mt-0.5 text-[7px] leading-4 text-white/20">
                    {section.description}
                  </p>
                </div>

                <ChevronRight className="h-3 w-3 text-white/15" />
              </button>
            );
          })}
        </div>
      </section>

      <div className="space-y-3">
        <section className="rounded-2xl border border-white/[0.07] bg-[#101113]">
          <div className="border-b border-white/[0.06] p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/[0.04]">
                <Building2 className="h-4 w-4 text-white/35" />
              </div>

              <div>
                <p className="text-xs font-medium text-white/70">
                  Organisation profile
                </p>

                <p className="mt-1 text-[9px] text-white/25">
                  Basic workspace information
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-4 p-5 md:grid-cols-2">
            <Field label="Organisation name" value="Acme Corporation" />
            <Field label="Workspace ID" value="ACME-ORG-001" />
            <Field label="Administrator" value="Admin" />
            <Field label="Timezone" value="Asia/Kolkata" />
          </div>

          <div className="flex justify-end border-t border-white/[0.05] p-4">
            <button className="flex items-center gap-1.5 rounded-lg bg-white px-3 py-2 text-[8px] font-medium text-black transition hover:bg-white/85">
              <Save className="h-3 w-3" />
              Save changes
            </button>
          </div>
        </section>

        <section className="rounded-2xl border border-white/[0.07] bg-[#101113]">
          <div className="border-b border-white/[0.06] p-5">
            <p className="text-xs font-medium text-white/70">
              Preferences
            </p>

            <p className="mt-1 text-[9px] text-white/25">
              Control your workspace behaviour
            </p>
          </div>

          <div className="divide-y divide-white/[0.05]">
            <ToggleRow
              icon={Bell}
              title="Email notifications"
              description="Receive important organisation alerts by email."
              enabled
            />

            <ToggleRow
              icon={Globe2}
              title="Automatic timezone"
              description="Use your browser timezone for date and time displays."
              enabled
            />

            <ToggleRow
              icon={Palette}
              title="Compact interface"
              description="Reduce spacing across tables and operational views."
              enabled={false}
            />

            <ToggleRow
              icon={Lock}
              title="Session protection"
              description="Require re-authentication for sensitive actions."
              enabled
            />
          </div>
        </section>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-[8px] uppercase tracking-[0.12em] text-white/20">
        {label}
      </label>

      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] px-3 py-2.5 text-[9px] text-white/45">
        {value}
      </div>
    </div>
  );
}

function ToggleRow({
  icon: Icon,
  title,
  description,
  enabled,
}: {
  icon: typeof Bell;
  title: string;
  description: string;
  enabled: boolean;
}) {
  return (
    <div className="flex items-center gap-3 p-4">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/[0.025]">
        <Icon className="h-3.5 w-3.5 text-white/25" />
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-[9px] font-medium text-white/50">
          {title}
        </p>

        <p className="mt-0.5 text-[7px] leading-4 text-white/20">
          {description}
        </p>
      </div>

      <div
        className={`relative h-5 w-9 shrink-0 rounded-full border transition ${
          enabled
            ? "border-white/20 bg-white/15"
            : "border-white/[0.07] bg-white/[0.025]"
        }`}
      >
        <span
          className={`absolute top-1 h-3 w-3 rounded-full transition ${
            enabled
              ? "left-5 bg-white"
              : "left-1 bg-white/25"
          }`}
        />
      </div>
    </div>
  );
}