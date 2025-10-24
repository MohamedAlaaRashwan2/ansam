"use client";

import { useState, useRef } from "react";
import styles from "./formroom.module.css";

export default function BookingForm() {
  const today = new Date().toISOString().split("T")[0];
  const tomorrow = new Date(new Date().setDate(new Date().getDate() + 15)).toISOString().split("T")[0];
  const [checkInDate, setCheckInDate] = useState(today);
  const [checkOutDate, setCheckOutDate] = useState(tomorrow);
  const [adults, setAdults] = useState("1");
  const [children, setChildren] = useState("0");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(3000);
  const checkIn = useRef<HTMLInputElement>(null);
  const checkOut = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      checkInDate,
      checkOutDate,
      adults,
      children,
      minPrice,
      maxPrice,
    });
  };

  // لو المستخدم حرّك أقل من الحد الأعلى، نمنع التداخل
  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (value <= maxPrice - 100) setMinPrice(value);
    const percentage = value / 3000 * 100;
    const rangeContainer = document.querySelector(".rangeContainer") as HTMLElement;
    if (rangeContainer) {
      rangeContainer.style.left = percentage + "%";
      console.log(percentage);
    }
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (value >= minPrice + 100) setMaxPrice(value);
    const percentage = value / 3000 * 100;
    const rangeContainer = document.querySelector(".rangeContainer") as HTMLElement;
    if (rangeContainer) {
      rangeContainer.style.right = percentage + "%";
    }
  };

  return (
    <div className={styles.reservationArea}>
      <form onSubmit={handleSubmit} className={styles.form}>
        {/* التواريخ */}
        <div className={styles.formGroup}>
          <label>تاريخ الوصول والمغادرة</label>
          <div className={styles.row}>
            <input
              type="date"
              value={checkInDate}
              onChange={(e) => setCheckInDate(e.target.value)}
              className={styles.input}
              required
              ref={checkIn}
              onClick={() => checkIn.current?.showPicker()}
            />
            <input
              type="date"
              value={checkOutDate}
              onChange={(e) => setCheckOutDate(e.target.value)}
              className={styles.input}
              required
              ref={checkOut}
              onClick={() => checkOut.current?.showPicker()}
            />
          </div>
        </div>

        <div className={styles.formGroup}>
          <label>عدد النزلاء</label>
          <div className={styles.row}>
            <select
              value={adults}
              onChange={(e) => setAdults(e.target.value)}
              className={styles.select}
            >
              <option value="1">1 بالغ</option>
              <option value="2">2 بالغين</option>
              <option value="3">3 بالغين</option>
              <option value="4">4 بالغين</option>
            </select>

            <select
              value={children}
              onChange={(e) => setChildren(e.target.value)}
              className={styles.select}
            >
              <option value="0">0 أطفال</option>
              <option value="1">1 طفل</option>
              <option value="2">2 أطفال</option>
              <option value="3">3 أطفال</option>
            </select>
          </div>
        </div>

        <div className={styles.formGroup}>
          <label>
            Price Range: ${minPrice} - ${maxPrice}
          </label>
        <div className={styles.sliderValues}>
          <div className={styles.rangeContainer} style={{
            background: `linear-gradient(to left, #e6eef2 ${(
              (minPrice / 3000) *
              100
            ).toFixed(1)}%, #f0b100 ${(
              (minPrice / 3000) *
              100
            ).toFixed(1)}%, #f0b100 ${(
              (maxPrice / 3000) *
              100
            ).toFixed(1)}%, #e6eef2 ${(
              (maxPrice / 3000) *
              100
            ).toFixed(1)}%)`,
          }}>
          </div>
        </div>
        <div className={styles.inputRange}>
             <input
              type="range"
              min="0"
              max="3000"
              step="50"
              value={minPrice}
              onChange={handleMinChange}
              className={`${styles.range} ${styles.rangeMin}`}
            />
            <input
              type="range"
              min="0"
              max="3000"
              step="50"
              value={maxPrice}
              onChange={handleMaxChange}
              className={`${styles.range} ${styles.rangeMax}`}
            />
        </div>
        </div>

        <button type="submit" className={styles.submitBtn}>
          عرض الغرف المتاحة
        </button>
      </form>
    </div>
  );
}
