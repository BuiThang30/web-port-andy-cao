"use client";

import { useEffect, useRef, useState } from "react";
import type { MouseEvent } from "react";
import styles from "./page.module.css";

type Item = { id: string; title: string };

export default function Toc({ items }: { items: Item[] }) {
  const [active, setActive] = useState(items[0]?.id);
  // khoá scroll-spy trong lúc trang đang cuộn mượt sau khi bấm
  const locked = useRef(false);
  const timer = useRef<number | null>(null);

  // Scroll-spy: tự đổi mục đang sáng theo vị trí cuộn
  useEffect(() => {
    const update = () => {
      if (locked.current) return;

      const line = window.innerHeight * 0.3;
      let current = items[0]?.id;

      for (const { id } of items) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top - line <= 0) current = id;
      }

      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2;
      if (atBottom) current = items[items.length - 1]?.id;

      setActive(current);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, [items]);

  // Bấm tab: cuộn mượt tới phần tương ứng
  const handleClick = (e: MouseEvent<HTMLAnchorElement>, id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    e.preventDefault();

    setActive(id);
    locked.current = true;
    if (timer.current) window.clearTimeout(timer.current);

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    history.replaceState(null, "", `#${id}`);

    timer.current = window.setTimeout(() => {
      locked.current = false;
    }, 900);
  };

  return (
    <ol className={styles.toc}>
      {items.map((item, i) => (
        <li key={item.id}>
          <a
            href={`#${item.id}`}
            onClick={(e) => handleClick(e, item.id)}
            className={`${styles.tocItem} ${
              active === item.id ? styles.tocActive : ""
            }`}
            aria-current={active === item.id ? "true" : undefined}
          >
            <span className={styles.tocNum}>{i + 1}.</span>
            <span>{item.title}</span>
          </a>
        </li>
      ))}
    </ol>
  );
}