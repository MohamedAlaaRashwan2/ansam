"use client";
import { motion } from "framer-motion";
import styles from "./about.module.css";
import Image from "next/image";
import Booking from "./booking";

export default function About() {
  return (
    <main>
      <section className={styles.about} id="about">
        <div className={`${styles.aboutContainer} container`}>
            <Booking />
          <motion.div
            className={styles.boxText}
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className={styles.mainText}>
              <h6>عــنـنــا</h6>
              <h2>
                مرحبًا بكم في <span>أنسام</span> مكة
              </h2>
            </div>
            <div className={styles.aboutText}>
              <p>
سلسلة أنسام مكة هي واحدة من أبرز الشركات المتخصصة في الخدمات الفندقية وخدمات الحج والعمرة في المملكة العربية السعودية، حيث نسعى لتوفير تجربة راقية ومتكاملة لضيوف الرحمن القادمين من داخل المملكة وخارجها.
نهدف إلى الجمع بين جودة الإقامة، وسهولة الحجز، والالتزام بالمعايير الشرعية والتنظيمية التي تضمن راحة وأمان المعتمر والحاج في كل خطوة من رحلته الإيمانية
              </p>
            </div>
          </motion.div>

          <div
            className={styles.boxImage}

          >
            <div className={styles.containerImage}>
              <div className={styles.boxImage1}>
                <motion.div 
                className={styles.image}
                initial={{ opacity: 0, y: -100 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}>
                  <Image
                    src="/about3.jpg"
                    alt="غرف أنسام مكة"
                    width={300}
                    height={300}
                  />
                </motion.div>
                <motion.div
                 className={styles.image}
                  initial={{ opacity: 0, y: 100 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}>
                  <Image
                    src="/about2.jpg"
                    alt="خدمة الحجاج"
                    width={300}
                    height={300}
                  />
                </motion.div>
              </div>

              <motion.div 
              className={styles.boxImage2}
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}>
                <Image
                  src="/about1.jpg"
                  alt="فنادق قريبة من الحرم"
                  width={350}
                  height={400}
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
