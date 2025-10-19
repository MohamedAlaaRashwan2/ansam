"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import styles from "./contact.module.css";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("✅ تم إرسال رسالتك بنجاح!");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section className={styles.contactSection} id="contact">
      <motion.div
        className={styles.container}
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className={styles.title}>تواصل معنا</h2>

        <div className={styles.grid}>
          <motion.div
            className={styles.infoBox}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3>معلومات التواصل</h3>
            <p>📍 العنوان: مكة المكرمة، المملكة العربية السعودية</p>
            <p><a href="tel:+6283185971687" target="_blank">📞 الهاتف: +62 831-859-71687</a></p>
            <p><a href="mailto:ansammakka@gmail.com" target="_blank">📧 البريد الإلكتروني: ansammakka@gmail.com</a></p>

            <div className={styles.mapContainer}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3623.9374918262664!2d39.825556874699826!3d21.42248718028754!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x15c204b3075e3e67%3A0x7c84e6e7b6d098a5!2sMasjid%20al-Haram!5e0!3m2!1sar!2ssa!4v1702030500000!5m2!1sar!2ssa"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
              ></iframe>
            </div>
          </motion.div>
          <motion.div
            className={styles.formBox}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h3>أرسل لنا رسالة</h3>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="الاسم الكامل"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="البريد الإلكتروني"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <textarea
                name="message"
                placeholder="اكتب رسالتك هنا..."
                value={formData.message}
                onChange={handleChange}
                rows={5}
                required
              ></textarea>
              <button type="submit">إرسال الرسالة</button>
            </form>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
