"use client";
import { useState, useEffect, useRef } from "react";
import styles from "./booking.module.css";

export default function BookingForm() {
  const [showGuestBox, setShowGuestBox] = useState(false);
  const [guests, setGuests] = useState(1);
  const [rooms, setRooms] = useState(0);
  const today = new Date().toISOString().split("T")[0];
  const tomorrow = new Date(new Date().setDate(new Date().getDate() + 15)).toISOString().split("T")[0];
  const [checkInDate, setCheckInDate] = useState(today);
  const [checkOutDate, setCheckOutDate] = useState(tomorrow);
  const popupRef = useRef<HTMLDivElement>(null);
  const checkIn = useRef<HTMLInputElement>(null);
  const checkOut = useRef<HTMLInputElement>(null);
  const [form, setForm] = useState({
    check_in: checkInDate,
    check_out: checkOutDate,
    adults: guests,
    children: rooms,
    min_price: 0,
    max_price: 3000
  });
  
  useEffect(() => {
    const handleClickOutside = (e: any) => {
      if (popupRef.current && !popupRef.current.contains(e.target)) {
        setShowGuestBox(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

    useEffect(() => {
    const form = localStorage.getItem("form");
    if (form) {
      setForm(JSON.parse(form));
      setCheckInDate(JSON.parse(form).check_in);
      setCheckOutDate(JSON.parse(form).check_out);
      setGuests(JSON.parse(form).adults);
      setRooms(JSON.parse(form).children);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if(new Date(checkInDate) > new Date(checkOutDate)) {
      alert("تاريخ الوصول يجب أن يكون قبل تاريخ المغادرة");
      return;
    }
    const newForm = {...form, check_in: checkInDate, check_out: checkOutDate, adults: guests, children: rooms};
    setForm(newForm);
    localStorage.setItem("form", JSON.stringify(newForm));
    window.location.href = "/rooms";
  };

  return (
    <div className={styles.bookingWrapper}>
      <form className={styles.bookingForm} onSubmit={handleSubmit}>
        <div className={styles.formItem}>
          <label>تاريخ الوصول</label>
          <input
            type="date"
            id="checkIn"
            value={checkInDate}
            onChange={(e) => setCheckInDate(e.target.value)}
            onClick={() => checkIn.current?.showPicker()}
            className={styles.input}
            ref={checkIn}
          />
        </div>

        <span className={styles.divider}></span>

        <div className={styles.formItem}>
          <label>تاريخ المغادرة</label>
          <input
            type="date"
            id="checkOut"
            value={checkOutDate}
            onChange={(e) => setCheckOutDate(e.target.value)}
            onClick={() => checkOut.current?.showPicker()}
            className={styles.input}
            ref={checkOut}
          />
        </div>

        <span className={styles.divider}></span>

        <div
          className={styles.formItem}
          onClick={() => setShowGuestBox(!showGuestBox)}
        >
          <label>عدد الضيوف والغرف</label>
          <div className={styles.guestsDisplay}>
            {guests} Guest / {rooms} Room
          </div>

          {showGuestBox && (
            <div
              className={styles.popup}
              ref={popupRef}
              onClick={(e) => e.stopPropagation()}
            >
              <h4>Select Guests</h4>

              <div className={styles.counterRow}>
                <span>Guest</span>
                <div className={styles.counter}>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setGuests(Math.max(1, guests - 1));
                    }}
                  >
                    -
                  </button>
                  <span>{guests}</span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setGuests(guests + 1);
                    }}
                  >
                    +
                  </button>
                </div>
              </div>

              <div className={styles.counterRow}>
                <span>Room</span>
                <div className={styles.counter}>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setRooms(Math.max(0, rooms - 1));
                    }}
                  >
                    -
                  </button>
                  <span>{rooms}</span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setRooms(rooms + 1);
                    }}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        <button type="submit" className={styles.btn}>
          Book Now
        </button>
      </form>
    </div>
  );
}

