"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./page.module.css";

type Pic = { src: string; alt: string };

/* Chuyển qua lại giữa các ảnh theo thời gian (mờ dần). Rê chuột vào thì tạm dừng. */
export default function Fader({
  pics,
  interval = 3500, // thời gian mỗi ảnh hiển thị (ms)
}: {
  pics: Pic[];
  interval?: number;
}) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || pics.length < 2) return;
    // người dùng bật "giảm chuyển động" thì không tự chuyển ảnh
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % pics.length);
    }, interval);
    return () => window.clearInterval(id);
  }, [paused, interval, pics.length]);

  return (
    <div
      className={styles.fade}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {pics.map((pic, i) => (
        <Image
          key={pic.src}
          src={pic.src}
          alt={pic.alt}
          fill
          sizes="(max-width: 1024px) 90vw, 40vw"
          quality={100}
          className={`${styles.shotImg} ${styles.fadeImg} ${
            i === index ? styles.fadeOn : ""
          }`}
        />
      ))}
    </div>
  );
}