"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import styles from "./roomhome.module.css";
import { FaWifi, FaUtensils, FaMosque, FaSnowflake, FaStar } from "react-icons/fa";

// ✅ تعريف نوع بيانات الغرفة
interface Room {
  id: number;
  name: string;
  price: number;
  rating?: number;
  description: string;
  image?: string;
  services?: string[];
}

export default function RoomsSection() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchRooms() {
      try {
        const res = await fetch("https://paleturquoise-beaver-156875.hostingersite.com/api_php/rooms.php"); // ← غيّر الرابط حسب API بتاعك
        if (!res.ok) throw new Error("فشل في تحميل البيانات");
        const data: Room[] = await res.json();
        data.length = 4;
        setRooms(data);
      } catch (err: unknown) {
        if (err instanceof Error) setError(err.message);
        else setError("حدث خطأ غير متوقع");
      } finally {
        setLoading(false);
      }
    }

    fetchRooms();
  }, []);

  if (loading) {
    return (
      <section className={styles.rooms}>
        <div className={styles.container}>
          <p className={styles.loading}>جاري تحميل الغرف...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className={styles.rooms}>
        <div className={styles.container}>
          <p className={styles.error}>حدث خطأ أثناء تحميل البيانات: {error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.rooms}>
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className={styles.title}>غرفنا الفندقية</h2>
          <p className={styles.subtitle}>تجربة راقية</p>
        </motion.div>

        <div className={styles.cards}>
          {rooms.map((room, index) => (
            <motion.a
              href={`/rooms/${room.id}`}
              key={room.id}
              className={styles.card}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <div className={styles.imageWrapper}>
                <img
                  src={room.image || "/about1.jpg"}
                  alt={room.name}
                  className={styles.image}
                />
                <div className={styles.price}>{room.price} ريال / الليلة</div>
              </div>

              <div className={styles.content}>
                <div className={styles.headerRow}>
                  <h4 className={styles.roomName}>{room.name}</h4>
                  <p className={styles.rating}>
                    <FaStar className={styles.star} /> {room.rating ?? "4.8"}
                  </p>
                </div>
                <p className={styles.description}>{room.description}</p>

                <ul className={styles.services}>
                  {room.services?.includes("wifi") && (
                    <li>
                      <FaWifi /> <span>إنترنت مجاني</span>
                    </li>
                  )}
                  {room.services?.includes("ac") && (
                    <li>
                      <FaSnowflake /> <span>مكيف هواء</span>
                    </li>
                  )}
                  {room.services?.includes("food") && (
                    <li>
                      <FaUtensils /> <span>وجبات</span>
                    </li>
                  )}
                  {room.services?.includes("mosque") && (
                    <li>
                      <FaMosque /> <span>قريب من الحرم</span>
                    </li>
                  )}
                </ul>
              </div>
            </motion.a>
          ))}
        </div>

        <motion.div
          className={styles.moreBtn}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <a href="/rooms" className={styles.btn}>
            عرض جميع الغرف
          </a>
        </motion.div>
      </div>
    </section>
  );
}
