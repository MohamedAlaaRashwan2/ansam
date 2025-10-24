"use client";
import { useState, useEffect, useRef, RefObject } from "react";
import styles from "./booking.module.css";

export default function BookingForm() {
  const [showGuestBox, setShowGuestBox] = useState(false);
  const [guests, setGuests] = useState(0);
  const [rooms, setRooms] = useState(0);
  const today = new Date().toISOString().split("T")[0];
  const tomorrow = new Date(new Date().setDate(new Date().getDate() + 15)).toISOString().split("T")[0];
  const [checkInDate, setCheckInDate] = useState(today);
  const [checkOutDate, setCheckOutDate] = useState(tomorrow);
  const popupRef = useRef<HTMLDivElement>(null);
  const checkIn = useRef<HTMLInputElement>(null);
  const checkOut = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    const handleClickOutside = (e: any) => {
      if (popupRef.current && !popupRef.current.contains(e.target)) {
        setShowGuestBox(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={styles.bookingWrapper}>
      <form className={styles.bookingForm}>
        <div className={styles.formItem}>
          <label htmlFor="checkIn">تاريخ الوصول</label>
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
          <label htmlFor="checkOut">تاريخ المغادرة</label>
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
                      setGuests(Math.max(0, guests - 1));
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

