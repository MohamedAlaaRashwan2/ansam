"use client";
import { useState, useEffect, useRef, RefObject } from "react";
import styles from "./booking.module.css";

export default function BookingForm() {
  const [showGuestBox, setShowGuestBox] = useState(false);
  const [guests, setGuests] = useState(0);
  const [rooms, setRooms] = useState(0);
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
        <div className={styles.formItem} onClick={() => checkIn.current?.showPicker()}>
          <label htmlFor="checkIn">Check In</label>
          <input
            type="date"
            id="checkIn"
            className={styles.input}
            defaultValue="2024-01-30"
            ref={checkIn}
          />
        </div>

        <span className={styles.divider}></span>

        <div className={styles.formItem} onClick={() => checkOut.current?.showPicker()}>
          <label htmlFor="checkOut">Check Out</label>
          <input
            type="date"
            id="checkOut"
            className={styles.input}
            defaultValue="2024-01-30"
            ref={checkOut}
          />
        </div>

        <span className={styles.divider}></span>

        <div
          className={styles.formItem}
          onClick={() => setShowGuestBox(!showGuestBox)}
        >
          <label>Guests and Rooms</label>
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

