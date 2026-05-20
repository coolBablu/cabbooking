"use client";

import { useEffect, useRef, useState } from "react";
import { Modal } from "./Modal";

type Source = { type: "youtube"; id: string } | { type: "mp4"; url: string };

const DEFAULT_SOURCE: Source = { type: "youtube", id: "dQw4w9WgXcQ" };

export function VideoModal({
  open,
  onClose,
  source = DEFAULT_SOURCE,
  title = "Welcome to SwiftCab",
  subtitle = "60 seconds inside the joyful side of urban mobility.",
}: {
  open: boolean;
  onClose: () => void;
  source?: Source;
  title?: string;
  subtitle?: string;
}) {
  const [mounted, setMounted] = useState(false);

  // Defer iframe / <video> mount until the modal is fully visible
  // so the embed only requests after opening (cheaper).
  useEffect(() => {
    if (open) {
      const t = setTimeout(() => setMounted(true), 80);
      return () => clearTimeout(t);
    }
    setMounted(false);
  }, [open]);

  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <Modal
      open={open}
      onClose={onClose}
      size="xl"
      panelClassName="bg-black"
      title={title}
      subtitle={subtitle}
    >
      <div className="relative aspect-video w-full bg-black">
        {mounted ? (
          source.type === "youtube" ? (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${source.id}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
              title={title}
              className="absolute inset-0 h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
            />
          ) : (
            <video
              ref={videoRef}
              src={source.url}
              autoPlay
              controls
              playsInline
              className="absolute inset-0 h-full w-full bg-black"
            />
          )
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex items-center gap-2 text-sm text-white/60">
              <span className="h-2 w-2 animate-pulse rounded-full bg-sunny-400" />
              Loading video…
            </div>
          </div>
        )}

        {/* Decorative corners */}
        <span className="pointer-events-none absolute left-3 top-3 h-5 w-5 rounded-tl-md border-l-2 border-t-2 border-sunny-400/60" />
        <span className="pointer-events-none absolute right-3 top-3 h-5 w-5 rounded-tr-md border-r-2 border-t-2 border-sunny-400/60" />
        <span className="pointer-events-none absolute bottom-3 left-3 h-5 w-5 rounded-bl-md border-b-2 border-l-2 border-sunny-400/60" />
        <span className="pointer-events-none absolute bottom-3 right-3 h-5 w-5 rounded-br-md border-b-2 border-r-2 border-sunny-400/60" />
      </div>
    </Modal>
  );
}
