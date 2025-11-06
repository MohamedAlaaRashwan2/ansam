"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import styles from "../components/roomhome.module.css";
import { FaWifi, FaUtensils, FaMosque, FaSnowflake, FaStar } from "react-icons/fa";

// ✅ تعريف نوع بيانات الغرفة
interface Room {
  id: number;
  name: string;
  price: number;
  rating?: number;
  description: string;
  images?: string[];
  services?: string[];
  roomid?: number;
}

export default function RoomsSection() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const roomidmain = localStorage.getItem("formData");
  const room = JSON.parse(roomidmain || "");
  const roomid = room.roomid;

  useEffect(() => {
    async function fetchRooms() {
      try {
        const res = await fetch(
          `https://paleturquoise-beaver-156875.hostingersite.com/api_php/room.php/${roomid}`
        );
        if (!res.ok) {
          throw new Error("Failed to load data");
        }
        const data: Room[] = await res.json();
        setRooms(Array.isArray(data) ? data : [data]);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unexpected error occurred");
        }
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

        <div className={styles.cards}>
          {rooms.map((room) => (
            <a
              href={`/rooms/${room.id}`}
              key={room.id}
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
                    <FaStar className={styles.star} />{" "}
                    {room.rating ?? "4.8"}
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
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
