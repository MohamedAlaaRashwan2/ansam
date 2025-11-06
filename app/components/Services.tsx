"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBus,
  faUtensils,
  faMosque,
  faBed,
  faWifi,
  faHotel,
  faKaaba,
  faGlobe,
  faHeadset,
  faGift,
} from "@fortawesome/free-solid-svg-icons";
import { easeInOut, motion } from "framer-motion";
import styles from "./Services.module.css";

export default function Services() {
  const services = [
    {
      id: 1,
      icon: faMosque,
      title: "قرب الفنادق من الحرم",
      description:
        "فنادقنا تقع بالقرب من المسجد الحرام لتسهيل الوصول أثناء أداء المناسك.",
      delay: 0.1,
    },
    {
      id: 2,
      icon: faBus,
      title: "نقل من وإلى المطار",
      description: "خدمة نقل مريحة وآمنة من المطار إلى الفندق والعكس.",
      delay: 0.2,
    },

    {
      id: 4,
      icon: faBed,
      title: "غرف مريحة ومكيفة",
      description: "استمتع بإقامة مريحة في غرف مجهزة بالكامل ومكيفة.",
      delay: 0.3,
    },
    {
      id: 5,
      icon: faWifi,
      title: "إنترنت مجاني",
      description: "شبكة إنترنت مجانية وسريعة في جميع أنحاء الفندق.",
      delay: 0.4,
    },
    {
      id: 7,
      icon: faKaaba,
      title: "تنظيم برامج الحج والعمرة",
      description: "حملات متكاملة تشمل النقل، السكن، والإعاشة بإشراف كوادر مؤهلة.",
      delay: 0.5,
    },
    {
      id: 8,
      icon: faGlobe,
      title: "خدمة الحجز الإلكتروني المسبق",
      description: "نظام حجز أونلاين آمن وسهل مع تأكيد فوري للحجوزات.",
      delay: 0.6,
    },
    {
      id: 9,
      icon: faHeadset,
      title: "خدمة عملاء",
      description: "فريق متخصص لخدمة النزلاء والاستجابة لجميع الاستفسارات في أي وقت.",
      delay: 0.7,
    },
    {
      id: 10,
      icon: faGift,
      title: "عروض موسمية ومرونة في الإلغاء",
      description: "خصومات خاصة للمواسم وإمكانية إلغاء أو تعديل الحجز وفق سياسات مرنة.",
      delay: 0.8,
    },

  ];

  return (
    <section className={styles.servicesArea} id="services" dir="rtl">
      <motion.div
        className={styles.container}
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <motion.h2
          className={styles.sectionTitle}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          خدماتنا
        </motion.h2>

        <motion.p
          className={styles.sectionSubtitle}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          نوفر لحجاج بيت الله الحرام أفضل الخدمات والفنادق لراحة تامة أثناء أداء المناسك.
        </motion.p>

        <div className={styles.serviceContent}>
          {services.map((service) => (
            <motion.div
              key={service.id}
              className={styles.singleService}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{backgroundColor: "#fff", boxShadow: "0 10px 25px rgba(0, 0, 0, 0.08)", transition: {duration: 0.3, type: "spring", stiffness: 100},}}
              transition={{
                duration: 0.6,
                delay: service.delay,
              }}
              viewport={{ once: true  }}
            >
              <FontAwesomeIcon icon={service.icon} className={styles.icon} />
              <h5>{service.title}</h5>
              <p>{service.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
