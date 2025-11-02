"use client";

import { useState, useRef, useEffect } from "react";
import styles from "./formroom.module.css";

export default function BookingForm( {setFilter}: {setFilter: (filter: any) => void}) {
  const today = new Date().toISOString().split("T")[0];
  const tomorrow = new Date(new Date().setDate(new Date().getDate() + 15)).toISOString().split("T")[0];
  const [checkInDate, setCheckInDate] = useState(today);
  const [checkOutDate, setCheckOutDate] = useState(tomorrow);
  const [adults, setAdults] = useState( "1");
  const [children, setChildren] = useState("0");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(3000);
  const [showFilter, setShowFilter] = useState(false);
  const checkIn = useRef<HTMLInputElement>(null);
  const checkOut = useRef<HTMLInputElement>(null);
    const [form, setForm] = useState({
    check_in: checkInDate,
    check_out: checkOutDate,
    min_price: minPrice,
    max_price: maxPrice,
    
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    const newForm = {...form, [name]: value};
    setForm(newForm);
    localStorage.setItem("form", JSON.stringify(newForm));
  }

  useEffect(() => {
    const form = localStorage.getItem("form");
    if (form) {
      setForm(JSON.parse(form));
      setCheckInDate(JSON.parse(form).check_in);
      setCheckOutDate(JSON.parse(form).check_out);
      setMinPrice(JSON.parse(form).min_price);
      setMaxPrice(JSON.parse(form).max_price);
      setAdults(JSON.parse(form).adults);
      setChildren(JSON.parse(form).children);
    }
  }, []);
   

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if(new Date(checkInDate) > new Date(checkOutDate)) {
      alert("تاريخ الوصول يجب أن يكون قبل تاريخ المغادرة");
      return;
    }
    localStorage.setItem("form", JSON.stringify(form));
    setFilter(form);
    };

  // لو المستخدم حرّك أقل من الحد الأعلى، نمنع التداخل
  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (value <= maxPrice - 100) setMinPrice(value);
    const percentage = value / 3000 * 100;
    const rangeContainer = document.querySelector(".rangeContainer") as HTMLElement;
    if (rangeContainer) {
      rangeContainer.style.left = percentage + "%";
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
    <>
    <div className={styles.reservationArea} style={{ display: showFilter ? "flex" : "none" }}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label>تاريخ الوصول والمغادرة</label>
          <div className={styles.row}>
            <input
              type="date"
              value={checkInDate}
              onChange={(e) => {
                setCheckInDate(e.target.value);
                handleChange(e);
              }}
              className={styles.input}
              required
              ref={checkIn}
              onClick={() => checkIn.current?.showPicker()}
              name="check_in"
            />
            <input
              type="date"
              value={checkOutDate}
              onChange={(e) => {
                setCheckOutDate(e.target.value);
                handleChange(e);
              }}
              className={styles.input}
              required
              ref={checkOut}
              onClick={() => checkOut.current?.showPicker()}
              name="check_out"
            />
          </div>
        </div>

        <div className={styles.formGroup}>
          <label>عدد النزلاء</label>
          <div className={styles.row}>
            <select
              value={adults}
              onChange={(e) => {
                setAdults(e.target.value);
                handleChange(e);
              }}
              className={styles.select}
              name="adults"
            >
              <option value="1">1 بالغ</option>
              <option value="2">2 بالغين</option>
              <option value="3">3 بالغين</option>
              <option value="4">4 بالغين</option>
            </select>

            <select
              value={children}
              onChange={(e) => {
                setChildren(e.target.value);
                handleChange(e);
              }}
              className={styles.select}
              name="children"
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
              step="20"
              value={minPrice}
              onChange={(e) => {
                handleMinChange(e);
                handleChange(e);
              }}
              className={`${styles.range} ${styles.rangeMin}`}
              name="min_price"
            />
            <input
              type="range"
              min="0"
              max="3000"
              step="50"
              value={maxPrice}
              onChange={(e) => {
                handleMaxChange(e);
                handleChange(e);
              }}
              className={`${styles.range} ${styles.rangeMax}`}
              name="max_price"
            />
          </div>
        </div>

        <button type="submit" className={styles.submitBtn}>
          عرض الغرف المتاحة
        </button>
      </form>
    </div>
    <div className={styles.buthidn}>
      <button onClick={() => setShowFilter(!showFilter)}>تصفية</button>
    </div>
  </>
);
}
