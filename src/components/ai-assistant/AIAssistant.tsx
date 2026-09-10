"use client";

import {
  ArrowUp,
  BarChart3,
  Bot,
  ChevronRight,
  Clock3,
  FileText,
  Lightbulb,
  Sparkles,
  Users,
} from "lucide-react";
import { useState } from "react";

const suggestions = [
  {
    icon: Users,
    title: "Workforce overview",
    prompt: "Give me a summary of today's workforce status.",
  },
  {
    icon: Clock3,
    title: "Attendance anomalies",
    prompt: "Which departments have unusual attendance today?",
  },
  {
    icon: BarChart3,
    title: "Performance insights",
    prompt: "What are the biggest operational trends this week?",
  },
  {
    icon: FileText,
    title: "Pending requests",
    prompt: "Summarize the requests that need immediate attention.",
  },
];

const messages = [
  {
    role: "assistant",
    text: "Good afternoon, Admin. I’m connected to your organisation workspace. I can help you understand workforce activity, attendance, transport, requests and operational performance.",
  },
];

export default function AIAssistant() {
  const [input, setInput] = useState("");
  const [chat, setChat] = useState(messages);

  function sendMessage(text?: string) {
    const value = (text ?? input).trim();

    if (!value) return;

    setChat((current) => [
      ...current,
      {
        role: "user",
        text: value,
      },
      {
        role: "assistant",
        text: "I’ve noted that request. Once the OrgNexus backend is connected, I’ll be able to analyse your live organisation data and return a contextual answer here.",
      },
    ]);

    setInput("");
  }

  return (
    <div className="grid min-h-[calc(100vh-180px)] gap-3 xl:grid-cols-[0.72fr_1.28fr]">
      <section className="relative overflow-hidden rounded-2xl border border-white/[0.07] bg-[#101113] p-6">
        <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-white/[0.025] blur-3xl" />

        <div className="relative">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/[0.08] bg-white/[0.04]">
            <Sparkles className="h-5 w-5 text-white/60" />
          </div>

          <p className="mt-7 text-[9px] font-semibold uppercase tracking-[0.2em] text-white/25">
            OrgNexus Intelligence
          </p>

          <h2 className="mt-2 max-w-md text-3xl font-semibold tracking-[-0.05em] text-white">
            Your organisation,
            <br />
            understood.
          </h2>

          <p className="mt-4 max-w-md text-[11px] leading-6 text-white/30">
            Ask questions about your workforce, operations and organisational
            data. The assistant will surface patterns, summaries and actionable
            insights.
          </p>

          <div className="mt-8 space-y-2">
            {suggestions.map((item) => {
              const Icon = item.icon;

              return (
                <button
                  key={item.title}
                  onClick={() => sendMessage(item.prompt)}
                  className="group flex w-full items-center gap-3 rounded-xl border border-white/[0.05] bg-white/[0.018] p-3 text-left transition hover:border-white/[0.1] hover:bg-white/[0.04]"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/[0.035]">
                    <Icon className="h-3.5 w-3.5 text-white/30 transition group-hover:text-white/60" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-[9px] font-medium text-white/55">
                      {item.title}
                    </p>

                    <p className="mt-0.5 truncate text-[8px] text-white/20">
                      {item.prompt}
                    </p>
                  </div>

                  <ChevronRight className="h-3.5 w-3.5 text-white/15 transition group-hover:translate-x-0.5 group-hover:text-white/40" />
                </button>
              );
            })}
          </div>

          <div className="mt-8 rounded-xl border border-white/[0.05] bg-white/[0.018] p-4">
            <div className="flex items-center gap-2">
              <Lightbulb className="h-3.5 w-3.5 text-white/30" />

              <span className="text-[8px] font-medium uppercase tracking-[0.15em] text-white/30">
                Available context
              </span>
            </div>

            <div className="mt-4 flex flex-wrap gap-1.5">
              {[
                "Employees",
                "Departments",
                "Attendance",
                "Transport",
                "Tasks",
                "Requests",
                "Reports",
              ].map((item) => (
                <span
                  key={item}
                  className="rounded-md border border-white/[0.05] bg-white/[0.025] px-2 py-1 text-[7px] text-white/25"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="flex min-h-[600px] flex-col overflow-hidden rounded-2xl border border-white/[0.07] bg-[#101113]">
        <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="relative flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.07] bg-white/[0.03]">
              <Bot className="h-4 w-4 text-white/45" />

              <span className="absolute -right-0.5 -top-0.5 h-1.5 w-1.5 rounded-full bg-white/70" />
            </div>

            <div>
              <p className="text-[10px] font-medium text-white/65">
                OrgNexus AI
              </p>

              <p className="mt-0.5 text-[7px] text-white/20">
                Organisation intelligence
              </p>
            </div>
          </div>

          <span className="rounded-md border border-white/[0.06] bg-white/[0.02] px-2 py-1 text-[7px] text-white/25">
            PREVIEW
          </span>
        </div>

        <div className="flex-1 space-y-5 overflow-y-auto p-5">
          {chat.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.role === "user"
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
              {message.role === "assistant" && (
                <div className="mr-3 mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-white/[0.04]">
                  <Sparkles className="h-3 w-3 text-white/40" />
                </div>
              )}

              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                  message.role === "user"
                    ? "bg-white text-black"
                    : "border border-white/[0.05] bg-white/[0.025] text-white/45"
                }`}
              >
                <p className="text-[10px] leading-5">
                  {message.text}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-white/[0.06] p-4">
          <div className="flex items-center gap-2 rounded-xl border border-white/[0.07] bg-white/[0.025] p-1.5 focus-within:border-white/[0.14]">
            <input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  sendMessage();
                }
              }}
              placeholder="Ask anything about your organisation..."
              className="min-w-0 flex-1 bg-transparent px-3 py-2 text-[10px] text-white outline-none placeholder:text-white/20"
            />

            <button
              onClick={() => sendMessage()}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-black transition hover:bg-white/85"
            >
              <ArrowUp className="h-3.5 w-3.5" />
            </button>
          </div>

          <p className="mt-2 text-center text-[7px] text-white/15">
            AI responses will use live organisation data once the backend is
            connected.
          </p>
        </div>
      </section>
    </div>
  );
}