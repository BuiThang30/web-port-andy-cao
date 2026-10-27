import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import styles from "./page.module.css";
import Toc from "./toc";

const IMG_DIR = "/images/economics";

const PLATETALE_IMAGES = [
  { src: `${IMG_DIR}/platetale-1.png`, alt: "PlateTale: Finding your best match", w: 351, h: 634, t: 0 },
  { src: `${IMG_DIR}/platetale-2.png`, alt: "PlateTale: What should we find you?", w: 341, h: 635, t: 0 },
  { src: `${IMG_DIR}/platetale-3.png`, alt: "PlateTale: Ways PlateTale learns you", w: 340, h: 631, t: 2 },
  { src: `${IMG_DIR}/platetale-4.png`, alt: "PlateTale: Help PlateTale know you", w: 353, h: 635, t: 0 },
];

type Section = {
  id: string;
  title: string;
  body: ReactNode;
};

const SECTIONS: Section[] = [
  {
    id: "platetale-startup",
    title: "PlateTale Startup",
    body: (
      <>
        At PlateTale, I explored why choosing a meal can feel difficult even
        with hundreds of options. I reviewed 30+ research papers and helped
        prepare 2 million+ food records for an AI recommendation system, then
        contributed to product strategy as we reached 1,000 users and a
        2,000-person waitlist.
      </>
    ),
  },
  {
    id: "stanford-vinuniversity-e2w-research",
    title: "Stanford × VinUniversity E2W Research",
    body: (
      <>
        I wanted to understand what would make Vietnamese riders choose an
        electric motorcycle despite its higher upfront price. Through Stanford ×
        VinUniversity research, I surveyed prospective buyers and studied
        dealerships to examine how subsidies and dealer-based incentives could
        make that choice more affordable.
      </>
    ),
  },
  {
    id: "wharton-global-youth-program",
    title: "Wharton Global Youth Program",
    body: (
      <>
        During Wharton’s <strong>150-hour finance program</strong>, I learned to
        look beyond a company’s latest strong year. I traced{" "}
        <strong>5 years</strong> of NVIDIA’s financial data, connecting changes
        in revenue, profitability, and valuation to questions about whether its
        growth could continue.
      </>
    ),
  },
  {
    id: "usc-pre-college-business-program",
    title: "USC Pre-College Business Program",
    body: (
      <>
        During USC’s <strong>4-week business program</strong>, I worked with a{" "}
        <strong>5-person team</strong> to ask where Viking River Cruises could
        grow next. We studied its finances, customers, and competitors to
        evaluate expansion opportunities while preserving what travelers valued
        about its river cruises.
      </>
    ),
  },
];

function ArrowButton() {
  return (
    <span className={styles.arrow} aria-hidden="true">
      <svg viewBox="0 0 48 48" width="100%" height="100%" fill="none">
        <circle cx="24" cy="24" r="24" fill="#F7BF18" />
        <path
          d="M12 24h24M27 15l9 9-9 9"
          stroke="#fff"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

export default function Economics() {
  return (
    <div className={styles.canvas}>
    <main className={styles.page}>
      {/* ===== Cột trái: tiêu đề + mục lục ===== */}
      <aside className={styles.sidebar}>
        <h1 className={styles.heading}>Economics</h1>

        <Toc items={SECTIONS.map(({ id, title }) => ({ id, title }))} />
      </aside>

      {/* ===== Cột phải: nội dung ===== */}
      <div className={styles.content}>
        {SECTIONS.map((s, i) => (
          <section key={s.id} id={s.id} className={styles.section}>
            <h2 className={styles.title}>{s.title}</h2>
            <p className={styles.text}>{s.body}</p>

            {i === 0 && (
              <div className={styles.galleryWrap}>
                <ul className={styles.gallery}>
                  {PLATETALE_IMAGES.map((img) => (
                    <li
                      key={img.src}
                      className={styles.shot}
                      style={
                        {
                          "--w": img.w,
                          "--h": img.h,
                          "--t": img.t,
                        } as CSSProperties
                      }
                    >
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        sizes="(max-width: 1024px) 60vw, 20vw"
                        quality={100}
                        className={styles.shotImg}
                      />
                    </li>
                  ))}
                </ul>
                <ArrowButton />
              </div>
            )}

            {i < SECTIONS.length - 1 && <hr className={styles.divider} />}
          </section>
        ))}
      </div>
    </main>
    </div>
  );
}