import Image from "next/image";
import type { CSSProperties } from "react";
import Toc from "./toc";
import styles from "./page.module.css";

/* ===== ẢNH =====
   Đặt ảnh trong public/images/urban-design/. Ảnh đặt tên urban-1 ... urban-34 theo thứ tự xuất hiện trên trang.
   Đổi tên ở đây nếu bạn đặt khác (đuôi .png hoặc .png).
   w, h: kích thước hiển thị trong Figma (px).
   rotate: ảnh trong Figma bị xoay -90° (file gốc dọc, hiển thị ngang). */
const DIR = "/images/urban-design";

type Shot = { src: string; alt: string; w: number; h: number; rotate?: boolean };

const shot = (file: string, alt: string, w: number, h: number, rotate = false): Shot => ({
  src: `${DIR}/${file}`,
  alt,
  w,
  h,
  rotate,
});

type Block =
  | {
      type: "row";
      items: Shot[];
      gap: number; // khoảng cách giữa các ảnh (px Figma)
      mt?: number; // khoảng cách phía trên (px Figma)
      ml?: number; // lệch trái (px Figma)
      align?: "start" | "center";
      arrow?: boolean; // nút mũi tên vàng trang trí
    }
  | { type: "note"; text: string; mt?: number }
  | { type: "button"; label: string; mt?: number };

type Section = {
  id: string;
  title: string;
  text: string;
  blocks: Block[];
};

const NOTE = "Note";

const SECTIONS: Section[] = [
  {
    id: "hanoi-architectural-university-internship",
    title: "Hanoi Architectural University Internship",
    text: "At Hanoi Architectural University, I moved between the scale of a neighborhood and the details of one home. While contributing to the Phú Lương urban master plan, I designed a three-story house in AutoCAD and SketchUp, using a recessed balcony and rooftop pergola to bring in light while preserving the neighborhood’s character.",
    blocks: [
      {
        type: "row",
        gap: 12,
        mt: 39,
        items: [
          shot("urban-1.png", "SketchUp model of the three-story house", 695, 402),
          shot("urban-2.png", "Street view of the neighborhood in Hanoi", 723, 402),
        ],
      },
      {
        type: "row",
        gap: 0,
        mt: 39,
        items: [shot("urban-3.png", "Urban study map of a Hanoi district", 652, 812)],
      },
      {
        type: "note",
        mt: 20,
        text: "Urban study map of a Hanoi district showing land use, residential blocks, road networks, green spaces, and public areas. During my internship at Hanoi Architectural University, I analyzed these spatial patterns to understand urban development and its impact on residents’ daily lives.",
      },
    ],
  },
  {
    id: "the-economic-value-of-cultural-authenticity",
    title: "The Economic Value of Cultural Authenticity",
    text: "In Little Saigon, I asked how redevelopment could help a neighborhood grow without pushing out the businesses that give it its identity. I studied 100+ pages of city plans, 20+ academic papers, and census data across 4 cultural districts, developing recommendations for affordable commercial space and public programming that brings young people back.",
    blocks: [
      {
        type: "row",
        gap: 0,
        mt: 52,
        items: [
          shot("urban-4.png", "Research paper on cultural authenticity in Little Saigon", 652, 844),
        ],
      },
    ],
  },
  {
    id: "ai-smart-waste-management-research-wico",
    title: "AI Smart Waste Management Research (WICO)",
    text: "I joined a 26-member team to explore how a waste system could respond to trash from sorting to collection. Our system identified waste with 94.2% accuracy, reduced odors and airborne bacteria by approximately 85%, and completed a 48-hour stress test, earning a WICO Gold Award.",
    blocks: [
      {
        type: "row",
        gap: 14,
        mt: 39,
        ml: 20,
        align: "start",
        arrow: true,
        items: [
          shot("urban-5.png", "Smart waste bin prototype", 465, 619),
          shot("urban-6.png", "Smart waste bin prototype, side view", 463, 620),
          shot("urban-7.png", "Smart waste bin prototype, detail", 462, 617),
        ],
      },
      { type: "note", mt: 26, text: NOTE },
      {
        type: "row",
        gap: 30,
        mt: 73,
        items: [
          shot("urban-8.png", "Team at the WICO World Invention Creativity Olympic", 898, 673),
          shot("urban-9.png", "Team presenting at the WICO poster booth", 502, 673),
        ],
      },
      { type: "note", mt: 26, text: NOTE },
    ],
  },
  {
    id: "virtual-hanoi-heritage-map",
    title: "Virtual Hanoi Heritage Map",
    text: "Each time I returned to Hanoi, familiar buildings had changed or disappeared. I created an interactive map of 100+ landmarks, historic buildings, and redevelopment sites, pairing my photographs with historical research so people could see what remains and what has been lost.",
    blocks: [
      {
        type: "row",
        gap: 0,
        mt: 34,
        items: [shot("urban-10.png", "Interactive map of Hanoi heritage sites", 1235, 694)],
      },
      { type: "button", mt: 23, label: "EXPLORE THE WEBSITE →" },
    ],
  },
  {
    id: "architecture-club",
    title: "Architecture Club",
    text: "After moving to America, I founded Architecture Club to find community through something I loved. What began with weekly model-building workshops for 30+ students grew into campus redesign projects with school administrators, taking our ideas beyond the classroom.",
    blocks: [
      {
        type: "row",
        gap: 11,
        mt: 40,
        items: [
          shot("urban-11.png", "Architecture model workshop, overhead view", 608, 389, true),
          shot("urban-12.png", "Architecture model workshop, close-up", 613, 388, true),
        ],
      },
      {
        type: "row",
        gap: 11,
        mt: 14,
        items: [
          shot("urban-13.png", "Student model on a desk", 608, 398),
          shot("urban-14.png", "Student model with sketches", 613, 398),
        ],
      },
      { type: "note", mt: 22, text: NOTE },
      {
        type: "row",
        gap: 14,
        mt: 25,
        items: [
          shot("urban-15.png", "Students building a model outdoors", 607, 387),
          shot("urban-16.png", "Blue campus structure model", 607, 387),
        ],
      },
      {
        type: "row",
        gap: 14,
        mt: 14,
        items: [
          shot("urban-17.png", "Folded paper shelter model", 605, 388),
          shot("urban-18.png", "Paper shelter model on the grass", 606, 388),
        ],
      },
      { type: "note", mt: 23, text: NOTE },
      {
        type: "row",
        gap: 10,
        mt: 23,
        items: [
          shot("urban-19.png", "Students working on models", 304, 430),
          shot("urban-20.png", "Students working on models together", 304, 429),
          shot("urban-21.png", "Finished white architectural models", 596, 430),
        ],
      },
      { type: "note", mt: 23, text: NOTE },
      {
        type: "row",
        gap: 8,
        mt: 30,
        items: [
          shot("urban-22.png", "Club workshop in progress", 407, 299),
          shot("urban-23.png", "Club members collaborating", 406, 299),
          shot("urban-24.png", "Club members building", 397, 299),
        ],
      },
      { type: "note", mt: 23, text: NOTE },
    ],
  },
  {
    id: "community-water-filtration-project",
    title: "Community Water Filtration Project",
    text: "In Hòa Bình, I worked with 30 students to turn lessons about filtration into something families could use. I guided them through assembling, testing, and revising 10 low-cost filters, which we installed in underserved households.",
    blocks: [
      {
        type: "row",
        gap: 10,
        mt: 55,
        items: [
          shot("urban-25.png", "Students assembling a water filter", 402, 535),
          shot("urban-26.png", "Students testing a water filter", 402, 535),
          shot("urban-27.png", "Filter installation with a family", 402, 535),
        ],
      },
      { type: "note", mt: 24, text: NOTE },
      {
        type: "row",
        gap: 10,
        mt: 39,
        items: [
          shot("urban-28.png", "Building filter components", 401, 534),
          shot("urban-29.png", "Students revising the filter design", 401, 534),
          shot("urban-30.png", "Installing a filter in a household", 401, 535),
        ],
      },
      { type: "note", mt: 25, text: NOTE },
    ],
  },
  {
    id: "sustainable-architecture-summer-program",
    title: "Sustainable Architecture Summer Program",
    text: "Back in Hanoi, I spent 3 days helping 15 students turn recycled materials into their own visions of houses and community spaces. As they built 30+ models, I guided them through testing weak foundations and rebuilding structures that collapsed.",
    blocks: [
      {
        type: "row",
        gap: 0,
        mt: 38,
        items: [shot("urban-31.png", "Model house built from recycled materials", 1428, 800)],
      },
      {
        type: "row",
        gap: 7,
        mt: 8,
        items: [
          shot("urban-32.png", "Students in the summer program classroom", 472, 327),
          shot("urban-33.png", "Students building models", 472, 327),
          shot("urban-34.png", "Students testing their structures", 472, 327),
        ],
      },
    ],
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

function Media({ item }: { item: Shot }) {
  const style = { "--w": item.w, "--h": item.h } as CSSProperties;
  return (
    <li className={styles.shot} style={style}>
      <div className={item.rotate ? styles.rotated : styles.fill}>
        <Image
          src={item.src}
          alt={item.alt}
          fill
          sizes="(max-width: 1024px) 90vw, 40vw"
          quality={100}
          className={styles.shotImg}
        />
      </div>
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

  if (block.type === "button") {
    return (
      <div className={styles.buttonWrap} style={{ "--mt": block.mt ?? 24 } as CSSProperties}>
        <button type="button" className={styles.button}>
          {block.label}
        </button>
      </div>
    );
  }

  const style = {
    "--gap": block.gap,
    "--mt": block.mt ?? 24,
    "--ml": block.ml ?? 0,
  } as CSSProperties;

  return (
    <div className={styles.rowWrap} style={style}>
      <ul
        className={`${styles.row} ${
          block.align === "start" ? styles.rowStart : styles.rowCenter
        }`}
      >
        {block.items.map((item) => (
          <Media key={item.src} item={item} />
        ))}
      </ul>
      {block.arrow && <ArrowButton />}
    </div>
  );
}

export default function UrbanDesign() {
  return (
    <div className={styles.canvas}>
      <main className={styles.page}>
        {/* ===== Cột trái: tiêu đề + mục lục ===== */}
        <aside className={styles.sidebar}>
          <h1 className={styles.heading}>
            Urban
            <br />
            Design
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