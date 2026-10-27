import Image from "next/image";
import type { CSSProperties } from "react";
import Toc from "./toc";
import styles from "./page.module.css";

/* ===== ẢNH =====
   Đặt ảnh trong public/images/culture-community/, tên culture-1 ... culture-9
   theo thứ tự xuất hiện trên trang (trái → phải, trên → dưới).
   Đổi tên ở đây nếu bạn đặt khác (đuôi .png hoặc .jpg).
   w, h: kích thước hiển thị trong Figma (px). */
const DIR = "/images/culture-community";

type Shot = { src: string; alt: string; w: number; h: number };

const shot = (file: string, alt: string, w: number, h: number): Shot => ({
  src: `${DIR}/${file}`,
  alt,
  w,
  h,
});

type Block =
  | {
      type: "row";
      items: Shot[];
      gap: number; // khoảng cách giữa các ảnh (px Figma)
      mt?: number; // khoảng cách phía trên (px Figma)
    }
  | { type: "note"; text: string; mt?: number };

type Section = {
  id: string;
  title: string;
  text: string;
  blocks: Block[];
};

const SECTIONS: Section[] = [
  {
    id: "fund-for-dreams",
    title: "Fund for Dreams",
    text: "When I began teaching 10 Vietnamese students, many knew the grammar but hesitated to speak. I built role-play lessons around everyday situations and Vietnamese traditions, helping them grow from a few-word response to a full conversation.",
    blocks: [
      {
        type: "row",
        gap: 0,
        mt: 46,
        items: [
          shot("culture-1.png", "Online English class on formal greetings with students on video", 1133, 665),
        ],
      },
      { type: "note", mt: 31, text: "Note" },
      {
        type: "row",
        gap: 12,
        mt: 48,
        items: [
          shot("culture-2.png", "English lesson week 1 slides", 560, 282),
          shot("culture-3.png", "Lesson slide deck overview", 560, 282),
        ],
      },
      {
        type: "row",
        gap: 12,
        mt: 10,
        items: [
          shot("culture-4.png", "Past Simple Tense lesson slides", 560, 282),
          shot("culture-5.png", "Active and passive voice lesson slides", 560, 282),
        ],
      },
    ],
  },
  {
    id: "quang-binh-service-expedition",
    title: "Quang Binh Service Expedition",
    text: "In Quang Binh, I led 30 volunteers supporting 2 rural elementary schools, distributing 120 gift packages and visiting 10 families. Beyond delivering supplies, I coordinated photographs of damaged facilities and records of teachers’ needs to help guide future improvements.",
    blocks: [
      {
        type: "row",
        gap: 18,
        mt: 48,
        items: [
          shot("culture-6.png", "Volunteers visiting a family’s wooden home", 772, 513),
          shot("culture-7.png", "Volunteers playing with children at a school", 342, 515),
        ],
      },
      {
        type: "row",
        gap: 18,
        mt: 20,
        items: [
          shot("culture-8.jpg", "Children carrying gift bags at the school", 772, 513),
          shot("culture-9.jpg", "Volunteers and children at the school entrance", 341, 513),
        ],
      },
    ],
  },
];

function Media({ item }: { item: Shot }) {
  const style = { "--w": item.w, "--h": item.h } as CSSProperties;
  return (
    <li className={styles.shot} style={style}>
      <Image
        src={item.src}
        alt={item.alt}
        fill
        sizes="(max-width: 1024px) 90vw, 40vw"
        quality={100}
        className={styles.shotImg}
      />
    </li>
  );
}

function BlockView({ block }: { block: Block }) {
  if (block.type === "note") {
    return (
      <p
        className={styles.note}
        style={{ "--mt": block.mt ?? 24 } as CSSProperties}
      >
        {block.text}
      </p>
    );
  }

  const style = {
    "--gap": block.gap,
    "--mt": block.mt ?? 24,
  } as CSSProperties;

  return (
    <div className={styles.rowWrap} style={style}>
      <ul className={styles.row}>
        {block.items.map((item) => (
          <Media key={item.src} item={item} />
        ))}
      </ul>
    </div>
  );
}

export default function CultureCommunity() {
  return (
    <div className={styles.canvas}>
      <main className={styles.page}>
        {/* ===== Cột trái: tiêu đề + mục lục ===== */}
        <aside className={styles.sidebar}>
          <h1 className={styles.heading}>
            Culture &amp;
            <br />
            Community
          </h1>
          <Toc items={SECTIONS.map(({ id, title }) => ({ id, title }))} />
        </aside>

        {/* ===== Cột phải: nội dung ===== */}
        <div className={styles.content}>
          {SECTIONS.map((s, i) => (
            <section key={s.id} id={s.id} className={styles.section}>
              <h2 className={styles.title}>{s.title}</h2>
              <p className={styles.text}>{s.text}</p>

              {s.blocks.map((block, bi) => (
                <BlockView key={bi} block={block} />
              ))}

              {i < SECTIONS.length - 1 && <hr className={styles.divider} />}
            </section>
          ))}
        </div>
      </main>
    </div>
  );
}