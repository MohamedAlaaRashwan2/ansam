"use client";

import { useState, useRef, useEffect } from "react";
import styles from "./formroom.module.css";

export default function BookingForm() {
  const today = new Date().toISOString().split("T")[0];
  const tomorrow = new Date(new Date().setDate(new Date().getDate() + 15)).toISOString().split("T")[0];
  const [checkInDate, setCheckInDate] = useState(today);
  const [checkOutDate, setCheckOutDate] = useState(tomorrow);
  const [adults, setAdults] = useState("1");
  const [children, setChildren] = useState("0");
  const checkIn = useRef<HTMLInputElement>(null);
  const checkOut = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({
    checkInDate,
    checkOutDate,
    adults,
    children,
    roomid: "",
  });

   useEffect(() => {
    const roomid = window.location.pathname.split("/")[2];
    setFormData((prev) => ({
      ...prev,
      roomid,
    }));
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  useEffect(() => {
      const form = localStorage.getItem("form");
      if (form) {
        setCheckInDate(JSON.parse(form).check_in);
        setCheckOutDate(JSON.parse(form).check_out);
        setAdults(JSON.parse(form).adults);
        setChildren(JSON.parse(form).children);
      }
    }, []);
    useEffect(() => {
  const form = localStorage.getItem("form");
  if (form) {
    const saved = JSON.parse(form);
    setFormData({
      checkInDate: saved.check_in,
      checkOutDate: saved.check_out,
      adults: saved.adults,
      children: saved.children,
      roomid: window.location.pathname.split("/")[2],
    });
  }
}, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if(new Date(checkInDate) > new Date(checkOutDate)) {
      alert("تاريخ الوصول يجب أن يكون قبل تاريخ المغادرة");
      return;
    }
    
    localStorage.setItem("formData", JSON.stringify(formData));
    localStorage.removeItem("form");
    window.location.href = "/confirmation";
  };

  return (
    <>
    <div className={styles.reservationArea}>
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
              name="checkInDate"
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
              name="checkOutDate"
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
              name="adults"
              className={styles.select}
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
              name="children"
              className={styles.select}
            >
              <option value="0">0 أطفال</option>
              <option value="1">1 طفل</option>
              <option value="2">2 أطفال</option>
              <option value="3">3 أطفال</option>
            </select>
          </div>
          </div>
          <button type="submit" className={styles.submitBtn}>
          احجز الغرفة
          </button>
      </form>
    </div>
    </>
  );
}
