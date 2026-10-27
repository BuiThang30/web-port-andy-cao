"use client";

import Image from "next/image";
import { useState } from "react";
import type { CSSProperties } from "react";
import styles from "./page.module.css";

export type CarouselImage = {
  src: string;
  alt: string;
  w: number; // kích thước trong Figma (px)
  h: number;
};

export type CarouselSlide = {
  gap: number; // khoảng cách giữa các ảnh (px Figma)
  items: CarouselImage[];
};

function ArrowIcon({ direction }: { direction: "next" | "prev" }) {
  return (
    <svg viewBox="0 0 48 48" width="100%" height="100%" fill="none" aria-hidden="true">
      <circle cx="24" cy="24" r="24" fill="#F7BF18" />
      <path
        className={styles.icon}
        d={direction === "next" ? "M12 24h24M27 15l9 9-9 9" : "M36 24H12M21 15l-9 9 9 9"}
        stroke="#fff"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Carousel({
  slides,
  mt,
  ml,
}: {
  slides: CarouselSlide[];
  mt: number; // khoảng cách phía trên (px Figma)
  ml: number; // lệch trái (px Figma)
}) {
  const [index, setIndex] = useState(0);
  const last = slides.length - 1;
  const atStart = index === 0;
  const atEnd = index === last;

  return (
    <div
      className={styles.galleryWrap}
      style={{ "--mt": mt, "--ml": ml } as CSSProperties}
      aria-roledescription="carousel"
    >
      <div className={styles.viewport}>
        <div className={styles.track} style={{ "--i": index } as CSSProperties}>
          {slides.map((slide, si) => (
            <ul
              key={si}
              className={styles.slide}
              style={{ "--gap": slide.gap } as CSSProperties}
            >
              {slide.items.map((img) => (
                <li
                  key={img.src}
                  className={styles.shot}
                  style={{ "--w": img.w, "--h": img.h } as CSSProperties}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(max-width: 1024px) 60vw, 25vw"
                    quality={100}
                    className={styles.shotImg}
                  />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>

      {/* Mũi tên sang phải: hiện ở slide đầu */}
      <button
        type="button"
        className={`${styles.arrow} ${styles.arrowNext} ${atEnd ? styles.arrowHidden : ""}`}
        aria-label="Show next images"
        tabIndex={atEnd ? -1 : 0}
        onClick={() => setIndex((i) => Math.min(i + 1, last))}
      >
        <ArrowIcon direction="next" />
      </button>

      {/* Mũi tên quay lại: hiện ở slide sau */}
      <button
        type="button"
        className={`${styles.arrow} ${styles.arrowPrev} ${atStart ? styles.arrowHidden : ""}`}
        aria-label="Show previous images"
        tabIndex={atStart ? -1 : 0}
        onClick={() => setIndex((i) => Math.max(i - 1, 0))}
      >
        <ArrowIcon direction="prev" />
      </button>
    </div>
  );
}