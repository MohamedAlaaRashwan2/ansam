"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import styles from "../../components/roomhome.module.css";
import { FaWifi, FaUtensils, FaMosque, FaSnowflake, FaStar } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import {Pagination, Autoplay, FreeMode } from "swiper/modules";
import Link from "next/link";

// ✅ تعريف نوع بيانات الغرفة
interface Room {
  id: number;
  name: string;
  price: number;
  rating?: number;
  description: string;
  images?: string[];
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
  
  const shuffledRooms = [...rooms].sort(() => Math.random() - 0.5);
  shuffledRooms.length = 10;

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
    <section className={styles.rooms}
    style={{
      padding: "0"
    }}>
      <div className={styles.container} style={{
                margin: '0 0 20px 0', width: '100%'
              }}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          style={{
            marginBottom: "20px"
          }}
        >
          <h2 className={styles.title + " " + styles.titleroomid}  >غرف مشابهة</h2>
        </motion.div>

        <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7}}
              viewport={{ once: true }}
        >
        <Swiper 
        modules={[Pagination, Autoplay, FreeMode]}
        spaceBetween={30}
        slidesPerView={3}
        loop={true}
        speed={500}
        grabCursor={true}
        freeMode={true}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        breakpoints={{
          0: {        // من أول شاشة الموبايل
           slidesPerView: 1,
           freeMode: false,
          },
             640: {      // تابلت صغير
          slidesPerView: 2,
          },
           1024: {     // لاب أو شاشة كبيرة
           slidesPerView: 3,
          },
          1280: {     // شاشات أكبر
           slidesPerView: 4,
          },
        }}
        >
          {shuffledRooms.map((room, index) => (
            <SwiperSlide key={room.id} >
            <Link
              href={`/rooms/${room.id}`}
              className={styles.card}
            >
              <div className={styles.imageWrapper}>
                <img
                  src={room.images?.[0] || "/about1.jpg"}
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
            </Link>
            </SwiperSlide>
          ))}
        </Swiper>
        </motion.div>
      </div>
    </section>
  );
}
