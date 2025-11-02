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
  const [rooms, setRooms] = useState<Room | null>(null);
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
        setRooms(data);
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
          {rooms && (
            <a
              href={`/rooms/${rooms.id}`}
              key={rooms.id}
              className={styles.card}
            >
              <div className={styles.imageWrapper}>
                <img
                  src={rooms.images?.[0] || "/about1.jpg"}
                  alt={rooms.name}
                  className={styles.image}
                />
      <div className={styles.price}>{rooms.price} ريال / الليلة</div>
              </div>

              <div className={styles.content}>
                <div className={styles.headerRow}>
                  <h4 className={styles.roomName}>{rooms.name}</h4>
                  <p className={styles.rating}>
                    <FaStar className={styles.star} />{" "}
                    {rooms.rating ?? "4.8"}
                  </p>
                </div>
                <p className={styles.description}>{rooms.description}</p>

                <ul className={styles.services}>
                  {rooms.services?.includes("wifi") && (
                    <li>
            <FaWifi /> <span>إنترنت مجاني</span>
                    </li>
                  )}
                  {rooms.services?.includes("ac") && (
                    <li>
            <FaSnowflake /> <span>مكيف هواء</span>
                    </li>
                  )}
                  {rooms.services?.includes("food") && (
                    <li>
            <FaUtensils /> <span>وجبات</span>
                    </li>
                  )}
                  {rooms.services?.includes("mosque") && (
                    <li>
            <FaMosque /> <span>قريب من الحرم</span>
                    </li>
                  )}
                </ul>
              </div>
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
