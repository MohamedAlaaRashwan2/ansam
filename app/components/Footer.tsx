"use client";
import { useEffect, useRef } from "react";
import styles from "./Footer.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faPhone,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faTwitter,
  faInstagram,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
  const footerRef = useRef(null);

  // ظهور تدريجي عند التمرير
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.show);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (footerRef.current) observer.observe(footerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <footer ref={footerRef} className={styles.footer} dir="rtl">
      <div className={`${styles.container} container`}>
        <div className={styles.col}>
          <h3 className={styles.logo}>أنسام مكة</h3>
          <p className={styles.text}>
            وجهتك الفندقية الأقرب للحرم، بخدمات راقية وأجواء تعبق بالسكينة
            والطمأنينة لضيوف الرحمن.
          </p>
        </div>

        <div className={styles.col}>
          <h4 className={styles.title}>روابط سريعة</h4>
          <ul className={styles.links}>
            <li><a href="#home">الرئيسية</a></li>
            <li><a href="#about">عنّا</a></li>
            <li><a href="#services">خدماتنا</a></li>
            <li><a href="#contact">تواصل معنا</a></li>
          </ul>
        </div>

        <div className={styles.col}>
          <h4 className={styles.title}>تواصل معنا</h4>
          <ul className={styles.contact}>
            <li><FontAwesomeIcon icon={faLocationDot} /> مكة المكرمة، السعودية</li>
            <li><FontAwesomeIcon icon={faPhone} /> <a href="tel:+6283185971687" target="_blank">+62 831-859-71687</a></li>
            <li><FontAwesomeIcon icon={faEnvelope} /> <a href="mailto:ansammakka@gmail.com" target="_blank">ansammakka@gmail.com</a></li>
          </ul>
          <div className={styles.social}>
            <a href="https://www.facebook.com/ansammakka" target="_blank"><FontAwesomeIcon icon={faFacebook} /></a>
            <a href="https://twitter.com/ansammakka" target="_blank"><FontAwesomeIcon icon={faTwitter} /></a>
            <a href="https://www.instagram.com/ansam_makka?igsh=bXMyOTNpOWJlcWVu" target="_blank"><FontAwesomeIcon icon={faInstagram} /></a>
            <a href="https://wa.me/6283185971687" target="_blank"><FontAwesomeIcon icon={faWhatsapp} /></a>
          </div>
        </div>
      </div>
      <div className={styles.copy}>
        <span>© 2025 أنسام مكة | جميع الحقوق محفوظة</span>
        <p className={styles.developer}>
          تطوير بواسطة <a href="https://rashwan.site" target="_blank">محمد رشوان</a>
        </p>
      </div>
    </footer>
  );
}
