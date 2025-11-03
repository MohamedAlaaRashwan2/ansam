"use client";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import styles from "./room.module.css";
import { FaWifi, FaUtensils, FaMosque, FaSnowflake, FaStar } from "react-icons/fa";
import Booking from "./formroom";
import Link from "next/link";

interface Room {
  id: number;
  name: string;
  price: number;
  rating?: number;
  description: string;
  images?: string[];
  services?: string[];
  size?: number;
  bad?: string;
  capacity?: number;
}

export default function RoomsSection() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const roomsPerPage = 6;
  


  const [filter, setFilter] = useState({
    check_in: "",
    check_out: "",
    min_price: "",
    max_price: "",
  });

  interface ApiRes {
    data: Room[];
  }
  const fetchRooms = async (filter?: any) => {
    try {
      const res = await fetch(
        "https://paleturquoise-beaver-156875.hostingersite.com/api_php/available_rooms.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(filter),
        }
      );
      if (!res.ok) throw new Error("فشل في تحميل البيانات");
      const data: ApiRes = await res.json();
      setRooms(Array.isArray(data.data) ? data.data : Array.isArray(data) ? data : []);
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError("حدث خطأ غير متوقع");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  useEffect(() => {
    if (
      filter.check_in &&
      filter.check_out &&
      filter.min_price &&
      filter.max_price
    ) {
      fetchRooms(filter);
    }
  }, [filter]);


  const totalPages = Math.max(1, Math.ceil(rooms.length / roomsPerPage));

  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(totalPages);
    if (currentPage < 1) setCurrentPage(1);
  }, [currentPage, totalPages]);

  const currentRooms = useMemo(() => {
    const start = (currentPage - 1) * roomsPerPage;
    return rooms.slice(start, start + roomsPerPage);
  }, [rooms, currentPage, roomsPerPage]);

  const goPrev = () => setCurrentPage((p) => Math.max(p - 1, 1));
  const goNext = () => setCurrentPage((p) => Math.min(p + 1, totalPages));
  const goTo = (page: number) => setCurrentPage(() => Math.min(Math.max(1, page), totalPages));

  if (loading) {
    return (
      <section className={styles.rooms}>
        <div className={styles.container}>
          <div className={styles.loadingContainer}>
            <p className={styles.loading}>جاري تحميل الغرف...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className={styles.rooms}>
        <div className={styles.container}>
          <div className={styles.loadingContainer}>
            <p className={styles.error}>حدث خطأ أثناء تحميل البيانات: {error}</p>
          </div>
        </div>
      </section>
    );
  }

  const getVisiblePages = () => {
    const delta = 2;
    const left = Math.max(1, currentPage - delta);
    const right = Math.min(totalPages, currentPage + delta);
    const pages: number[] = [];
    for (let p = left; p <= right; p++) pages.push(p);
    if (left > 2) return [1, -1, ...pages];
    else if (left === 2) return [1, ...pages];
    else if (right < totalPages - 1) return [...pages, -1, totalPages];
    else if (right === totalPages - 1) return [...pages, totalPages];
    return pages;
  };

  const visiblePages = getVisiblePages();

  return (
    <section className={styles.rooms}>
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

      <div className={styles.containerr}>
        <div className={styles.container}>
          <div className={styles.cards}>
            {currentRooms.map((room, index) => (
              <motion.div
                key={room.id}
                className={styles.card}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: index * 0.08 }}
                viewport={{ once: true }}
              >
                <div className={styles.imageWrapper}>
                  <Link href={`/rooms/${room.id}`}>
                    <img
                      src={room.images?.[0] || "/about1.jpg"}
                      alt={room.name}
                      className={styles.image}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "/about1.jpg";
                      }}
                    />
                  </Link>
                  <div className={styles.price}>{room.price} ريال / الليلة</div>
                </div>

                <div className={styles.content}>
                  <div className={styles.headerRow}>
                    <h4 className={styles.roomName}>{room.name}</h4>
                    <p className={styles.rating}>
                      <FaStar className={styles.star} /> {room.rating ?? "4.8"}
                    </p>
                  </div>

                  <div className={styles.services}>
                    <h6>المساحه: <span>{room.size || 40}م</span></h6>
                    <h6>سعة الغرف: <span>أقصى عدد للأشخاص {room.capacity || 2}</span></h6>
                    <h6>سرير: <span>{room.bad || "سرير ملكي"}</span></h6>
                    <h6>الخدمات: <span>واي فاي,تليفيزون...</span></h6>
                  </div>
                  <Link href={`/rooms/${room.id}`}>المزيد من التفصيل <i className="fa-solid fa-left-long"></i></Link>
                </div>
              </motion.div>
            ))}
          </div>
          <Booking setFilter={setFilter} />
        </div>

        <div className={styles.moreBtn}>
          <ul className={styles.pagination} aria-label="Pagination">
            <li className={styles.pageItem}>
              <button
                className={styles.pageLink}
                onClick={goPrev}
                disabled={currentPage === 1}
                aria-label="الصفحة السابقة"
              >
                « السابق
              </button>
            </li>

            {visiblePages.map((p, i) =>
              p === -1 ? (
                <li key={`dots-${i}`} className={styles.pageItem}>
                  <span className={styles.pageLink} aria-hidden>
                    ...
                  </span>
                </li>
              ) : (
                <li key={p} className={styles.pageItem}>
                  <button
                    className={`${styles.pageLink} ${p === currentPage ? styles.active : ""}`}
                    onClick={() => goTo(p)}
                    aria-current={p === currentPage ? "page" : undefined}
                  >
                    {p}
                  </button>
                </li>
              )
            )}

            <li className={styles.pageItem}>
              <button
                className={styles.pageLink}
                onClick={goNext}
                disabled={currentPage === totalPages}
                aria-label="الصفحة التالية"
              >
                التالي »
              </button>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
