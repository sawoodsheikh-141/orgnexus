"use client";

import { useState, useTransition } from "react";
import { Pin, Plus, Trash2, Megaphone, X } from "lucide-react";
import type { Department, Notice } from "@/lib/types/entities";
import { createNoticeAction, deleteNoticeAction } from "@/app/actions/notices";

interface NoticeBoardProps {
  notices: Notice[];
  departments: Department[];
  currentUserId: string;
  canCreate: boolean;
  postableDepartmentIds: string[];
  canPostCampusWide: boolean;
}

export default function NoticeBoard({
  notices,
  departments,
  currentUserId,
  canCreate,
  postableDepartmentIds,
  canPostCampusWide,
}: NoticeBoardProps) {
  const [composerOpen, setComposerOpen] = useState(false);

  const deptNameById = new Map(departments.map((d) => [d.id, d.name]));

  return (
    <main className="min-h-full bg-[#090a0c]">
      <div className="mx-auto w-full max-w-[1000px] p-5 lg:p-7">
        <div className="mb-7 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <div className="mb-2 flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-white/30">
              <Megaphone size={12} />
              Notice board
            </div>
            <h1 className="text-2xl font-medium tracking-tight text-white">
              Notices & Notes
            </h1>
            <p className="mt-1 text-xs text-white/35">
              One place for what used to live in a WhatsApp group nobody checks anymore.
            </p>
          </div>

          {canCreate && (
            <button
              onClick={() => setComposerOpen(true)}
              className="flex h-9 items-center justify-center gap-2 rounded-lg bg-white px-4 text-xs font-medium text-black transition hover:bg-white/90"
            >
              <Plus size={14} />
              Post notice
            </button>
          )}
        </div>

        {composerOpen && (
          <Composer
            departments={departments}
            postableDepartmentIds={postableDepartmentIds}
            canPostCampusWide={canPostCampusWide}
            onClose={() => setComposerOpen(false)}
          />
        )}

        <div className="space-y-3">
          {notices.length === 0 && (
            <div className="rounded-xl border border-white/[0.07] bg-white/[0.025] p-8 text-center">
              <p className="text-xs text-white/35">No notices yet.</p>
            </div>
          )}

          {notices.map((notice) => (
            <NoticeCard
              key={notice.id}
              notice={notice}
              scopeLabel={
                notice.departmentId
                  ? deptNameById.get(notice.departmentId) ?? "Department"
                  : "Campus-wide"
              }
              canDelete={notice.authorId === currentUserId || canCreate}
            />
          ))}
        </div>
      </div>
    </main>
  );
}

function NoticeCard({
  notice,
  scopeLabel,
  canDelete,
}: {
  notice: Notice;
  scopeLabel: string;
  canDelete: boolean;
}) {
  const [isPending, startTransition] = useTransition();

  return (
    <div className="rounded-xl border border-white/[0.07] bg-white/[0.025] p-5">
      <div className="mb-2 flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          {notice.pinned && <Pin size={12} className="text-white/50" />}
          <h3 className="text-sm font-medium text-white">{notice.title}</h3>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <span className="rounded-full border border-white/10 px-2 py-0.5 text-[9px] uppercase tracking-wider text-white/35">
            {scopeLabel}
          </span>

          {canDelete && (
            <button
              disabled={isPending}
              onClick={() =>
                startTransition(() => {
                  deleteNoticeAction(notice.id);
                })
              }
              className="text-white/20 transition hover:text-red-400/80 disabled:opacity-40"
              title="Delete notice"
            >
              <Trash2 size={13} />
            </button>
          )}
        </div>
      </div>

      <p className="whitespace-pre-wrap text-[12px] leading-relaxed text-white/55">
        {notice.body}
      </p>

      <p className="mt-3 text-[10px] text-white/25">
        {new Date(notice.createdAt).toLocaleDateString(undefined, {
          day: "numeric",
          month: "short",
          year: "numeric",
        })}
      </p>
    </div>
  );
}

function Composer({
  departments,
  postableDepartmentIds,
  canPostCampusWide,
  onClose,
}: {
  departments: Department[];
  postableDepartmentIds: string[];
  canPostCampusWide: boolean;
  onClose: () => void;
}) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [departmentId, setDepartmentId] = useState<string>(
    canPostCampusWide ? "" : postableDepartmentIds[0] ?? "",
  );
  const [pinned, setPinned] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const postableDepartments = departments.filter((d) =>
    postableDepartmentIds.includes(d.id),
  );

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    startTransition(async () => {
      try {
        await createNoticeAction({
          title,
          body,
          departmentId: departmentId || null,
          pinned,
        });
        onClose();
      } catch {
        setError("Couldn't post that notice. Check the fields and try again.");
      }
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-4 rounded-xl border border-white/[0.09] bg-white/[0.03] p-5"
    >
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-xs font-medium text-white">New notice</h3>
        <button
          type="button"
          onClick={onClose}
          className="text-white/30 hover:text-white"
        >
          <X size={14} />
        </button>
      </div>

      <div className="flex flex-col gap-3">
        <input
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder='Title (e.g. "Mid-sem exam notes uploaded")'
          className="w-full rounded-lg border border-white/[0.08] bg-white/[0.025] px-3.5 py-2.5 text-[13px] text-white outline-none focus:border-white/20"
        />

        <textarea
          required
          rows={4}
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Details..."
          className="w-full resize-none rounded-lg border border-white/[0.08] bg-white/[0.025] px-3.5 py-2.5 text-[13px] text-white outline-none focus:border-white/20"
        />

        <div className="flex flex-wrap items-center gap-3">
          <select
            value={departmentId}
            onChange={(e) => setDepartmentId(e.target.value)}
            className="rounded-lg border border-white/[0.08] bg-white/[0.025] px-3 py-2 text-[12px] text-white outline-none focus:border-white/20"
          >
            {canPostCampusWide && <option value="">Campus-wide</option>}
            {postableDepartments.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name}
              </option>
            ))}
          </select>

          <label className="flex items-center gap-2 text-[11px] text-white/50">
            <input
              type="checkbox"
              checked={pinned}
              onChange={(e) => setPinned(e.target.checked)}
              className="accent-white"
            />
            Pin to top
          </label>

          <button
            type="submit"
            disabled={isPending}
            className="ml-auto flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-[11px] font-semibold text-black transition hover:bg-white/90 disabled:opacity-50"
          >
            {isPending ? "Posting..." : "Post notice"}
          </button>
        </div>

        {error && <p className="text-[11px] text-red-400/80">{error}</p>}
      </div>
    </form>
  );
}
