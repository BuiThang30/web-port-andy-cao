import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.hero}>
      {/* Đặt ảnh nền tại public/images/hero.jpg */}
      <Image
        src="/images/background-home.png"
        alt="Andy Cao Vu looking out a window toward green leaves"
        fill
        priority
        quality={100}
        sizes="100vw"
        className={styles.bg}
      />

      <h1 className={styles.name}>
        Andy
        <br />
        Cao Vu
      </h1>

      <div className={styles.intro}>
        <p className={styles.quote}>
          “I love giving ordinary things jobs above their pay grade.”
        </p>
        <p className={styles.text}>
          Welcome! I’m Andy Cao, raised in Hanoi and now living in California.
          From food recommendations to cardboard models and maps of Hanoi, my
          projects turn small ideas into something people can use, learn from,
          or connect with. I’m excited to share them here!
        </p>
      </div>
    </main>
  );
}