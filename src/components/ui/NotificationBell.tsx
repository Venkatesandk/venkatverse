"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bell, Mail, MessageSquare, Download, X, ChevronDown, ChevronUp } from "lucide-react";

interface SiteNotification {
  id: string;
  type: "contact" | "feedback" | "resume" | "visit";
  title: string;
  body: string;
  time: string;
  href?: string;
}

const ICONS = {
  contact: Mail,
  feedback: MessageSquare,
  resume: Download,
  visit: Bell,
};

const PREVIEW_LIMIT = 5;

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short" });
}

function NotificationItem({ n, index }: { n: SiteNotification; index: number }) {
  const Icon = ICONS[n.type] ?? Bell;
  return (
    <motion.li
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.04 }}
      className="flex gap-3 rounded-xl p-3 transition-colors hover:bg-surface-2"
    >
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
        <Icon size={15} />
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-xs font-semibold">{n.title}</p>
        <p className="line-clamp-2 font-mono text-[10px] tracking-wide text-muted">{n.body}</p>
        <p className="mt-1 text-[10px] text-muted">{timeAgo(n.time)}</p>
      </div>
    </motion.li>
  );
}

export function NotificationBell() {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<SiteNotification[]>([]);
  const [loading, setLoading] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/notifications");
      const data = await res.json();
      setItems(Array.isArray(data.notifications) ? data.notifications : []);
    } catch {
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
    const events = ["feedback-submitted", "contact-submitted", "resume-downloaded"];
    const handler = () => load();
    events.forEach((e) => window.addEventListener(e, handler));
    const interval = setInterval(load, 60000);
    return () => {
      events.forEach((e) => window.removeEventListener(e, handler));
      clearInterval(interval);
    };
  }, [load]);

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    if (open) {
      document.addEventListener("mousedown", close);
      load();
    } else {
      setShowAll(false);
    }
    return () => document.removeEventListener("mousedown", close);
  }, [open, load]);

  const unread = items.length;
  const visible = showAll ? items : items.slice(0, PREVIEW_LIMIT);
  const hasMore = items.length > PREVIEW_LIMIT;

  return (
    <div className="relative" ref={ref}>
      <motion.button
        type="button"
        onClick={() => setOpen(!open)}
        className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-border hover:bg-surface-2"
        aria-label="Notifications"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Bell size={17} />
        {unread > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[9px] font-bold text-white"
          >
            {unread > 9 ? "9+" : unread}
          </motion.span>
        )}
      </motion.button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] bg-black/20 sm:hidden"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.96 }}
              transition={{ type: "spring", stiffness: 420, damping: 28 }}
              className="fixed inset-x-3 top-[calc(var(--header-height)+0.5rem)] z-[70] flex max-h-[min(70dvh,24rem)] flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-xl sm:absolute sm:inset-x-auto sm:right-0 sm:top-full sm:mt-2 sm:w-80"
            >
              <div className="flex items-center justify-between border-b border-border px-4 py-3">
                <div>
                  <p className="text-sm font-bold">Notifications</p>
                  <p className="text-[10px] text-muted">Private activity · masked for visitors</p>
                </div>
                <button type="button" onClick={() => setOpen(false)} className="rounded-lg p-1 hover:bg-surface-2" aria-label="Close">
                  <X size={16} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto overscroll-contain p-2">
                {loading && items.length === 0 ? (
                  <div className="space-y-2 p-2">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="h-14 animate-pulse rounded-xl bg-surface-2" />
                    ))}
                  </div>
                ) : items.length === 0 ? (
                  <p className="p-6 text-center text-xs text-muted">No activity yet.</p>
                ) : (
                  <ul className="space-y-1">
                    {visible.map((n, i) => (
                      <NotificationItem key={n.id} n={n} index={i} />
                    ))}
                  </ul>
                )}
              </div>

              <div className="space-y-1 border-t border-border p-2">
                {hasMore && (
                  <button
                    type="button"
                    onClick={() => setShowAll(!showAll)}
                    className="flex w-full items-center justify-center gap-1 rounded-lg py-2 text-xs font-semibold text-primary hover:bg-primary/5"
                  >
                    {showAll ? (
                      <>
                        <ChevronUp size={14} />
                        Show less
                      </>
                    ) : (
                      <>
                        <ChevronDown size={14} />
                        View more ({items.length - PREVIEW_LIMIT})
                      </>
                    )}
                  </button>
                )}
                <button
                  type="button"
                  onClick={load}
                  className="w-full rounded-lg py-2 text-xs font-medium text-muted hover:bg-surface-2"
                >
                  Refresh
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
