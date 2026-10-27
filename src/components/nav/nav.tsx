"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import styles from "./nav.module.css";

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Economics", href: "/economics" },
  { label: "Urban Design", href: "/urban-design" },
  { label: "Culture & Community", href: "/culture-community" },
];

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  const isHome = pathname === "/";
  const isCulture = pathname.startsWith("/culture-community");

  const variant = isHome
    ? styles.home
    : `${styles.inner} ${isCulture ? styles.culture : ""}`;

  // Khi menu đang mở: bấm ra ngoài / nhấn Esc / phóng to màn hình thì đóng lại
  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onPointer = (e: PointerEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const mq = window.matchMedia("(min-width: 1025px)");
    const onMq = () => {
      if (mq.matches) setOpen(false);
    };

    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    mq.addEventListener("change", onMq);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
      mq.removeEventListener("change", onMq);
    };
  }, [open]);

  return (
    <nav
      ref={navRef}
      className={`${styles.nav} ${variant} ${open ? styles.open : ""}`}
      aria-label="Main"
    >
      {/* Nút toggle: chỉ hiện ở tablet / mobile */}
      <button
        type="button"
        className={styles.toggle}
        aria-expanded={open}
        aria-controls="nav-menu"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((v) => !v)}
      >
        <span className={styles.bar} />
        <span className={styles.bar} />
        <span className={styles.bar} />
      </button>

      <ul id="nav-menu" className={styles.list}>
        {NAV_ITEMS.map(({ label, href }) => {
          const isActive =
            href === "/" ? pathname === "/" : pathname.startsWith(href);

          return (
            <li key={href}>
              <Link
                href={href}
                className={`${styles.link} ${isActive ? styles.active : ""}`}
                aria-current={isActive ? "page" : undefined}
                onClick={() => setOpen(false)}
              >
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}