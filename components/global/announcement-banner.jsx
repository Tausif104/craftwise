"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ANNOUNCEMENT_COOKIE_PREFIX } from "@/lib/announcement-client";

function getCookieMaxAge(frequency) {
  if (frequency === "ONCE") return 60 * 60 * 24 * 365;
  return null;
}

async function track(id, type) {
  try {
    await fetch("/api/announcements/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, type }),
      keepalive: true,
    });
  } catch (error) {
    console.error("Announcement tracking failed:", error);
  }
}

export default function AnnouncementBanner({ announcement }) {
  const pathname = usePathname();
  const impressionLogged = useRef(false);
  const [headerHeight, setHeaderHeight] = useState(null);

  // Pin banner to the live header height so there's no gap on any screen.
  useEffect(() => {
    const header = document.querySelector("header");
    if (!header) return undefined;

    const update = () => setHeaderHeight(header.getBoundingClientRect().height);
    update();

    const observer = new ResizeObserver(update);
    observer.observe(header);
    window.addEventListener("resize", update);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  const impressionKey = useMemo(
    () => `cw-announcement-impression:${announcement.id}:${pathname}`,
    [announcement.id, pathname]
  );

  useEffect(() => {
    if (!announcement || impressionLogged.current) return;

    if (announcement.frequency !== "ALWAYS") {
      const cookieMaxAge = getCookieMaxAge(announcement.frequency);
      document.cookie = `${ANNOUNCEMENT_COOKIE_PREFIX}-${announcement.id}=1; path=/; SameSite=Lax${
        cookieMaxAge ? `; max-age=${cookieMaxAge}` : ""
      }`;
    }

    if (sessionStorage.getItem(impressionKey)) return;

    sessionStorage.setItem(impressionKey, "1");
    impressionLogged.current = true;
    track(announcement.id, "impression");
  }, [announcement, impressionKey]);

  const marqueeContent = (
    <div className="cw-announcement__viewport">
      <div className="cw-announcement__track">
        {[0, 1].map((groupIndex) => (
          <div
            key={`${announcement.id}-group-${groupIndex}`}
            className="cw-announcement__group"
            aria-hidden={groupIndex > 0}
          >
            {Array.from({ length: 3 }).map((_, index) => (
              <span
                key={`${announcement.id}-${groupIndex}-${index}`}
                className="cw-announcement__text"
              >
                {announcement.message}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <>
      <div
        aria-hidden="true"
        className="h-10 md:h-11"
      />
      {/* fallback offsets match the real header height per breakpoint
          (pt-3 + min-h-72 / min-h-84, pt-4 + min-h-84 on xl) so the bar sits
          flush under the header even before hydration measures it */}
      <div
        className="fixed left-0 right-0 z-40 top-[84px] md:top-[96px] xl:top-[100px]"
        style={headerHeight != null ? { top: headerHeight } : undefined}
      >
        <div className="cw-announcement bg-[#304C61] text-white shadow-[0px_10px_25px_rgba(10,27,40,0.14)]">
          {announcement.href ? (
            <Link
              href={announcement.href}
              target={announcement.openInNewTab ? "_blank" : undefined}
              rel={announcement.openInNewTab ? "noreferrer" : undefined}
              className="block cursor-pointer"
              onClick={() => track(announcement.id, "click")}
            >
              {marqueeContent}
            </Link>
          ) : (
            marqueeContent
          )}
        </div>
      </div>
    </>
  );
}
