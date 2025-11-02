"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import styles from "./RoomSlider.module.css";

interface Slide {
  images: string[];
  title: string;
}

export default function HeroBackgroundSlider({ slides }: { slides: Slide[] }) {
    const images = slides?.[0].images;
    const title = slides?.[0].title;
  const [current, setCurrent] = useState(0);
  const [dragStartX, setDragStartX] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const normalizedSlides = images.length? images : ["/default-room.jpg"];
  const nextSlide = () => setCurrent((prev) => (prev + 1) % normalizedSlides.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + normalizedSlides.length) % normalizedSlides.length);
  const handleTouchStart = (e: React.TouchEvent) => { setIsPaused(true); setDragStartX(e.touches[0].clientX);};
  const handleTouchEnd = (e: React.TouchEvent) => {
  const dragEndX = e.changedTouches[0].clientX;
  const diff = dragEndX - dragStartX;
    if (diff > 80) prevSlide();
    else if (diff < -80) nextSlide();
    setIsPaused(false);
  };

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [isPaused, current, normalizedSlides.length]);

  return (
    <div
      className={`${styles.slideContainer}`}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className= {`${styles.slide}`}>
        {normalizedSlides.map((slide, index) => {
          const imgUrl = images && images.length ? images[index] : "/default-room.jpg";
          const translateX = (index - current) * 100;
          const visible = index === current;
          return (
            <motion.div
              onClick={() => setSelectedImage(imgUrl)}
              key={index}
              className={`${styles.mainSlide} `}
              style={{
                backgroundImage: `url(${imgUrl})`,
                transform: `translateX(${translateX}%)`,
                opacity: visible ? 1 : 0,
              }}
            >
            </motion.div>
          );
        })}
      </div>
      {selectedImage && (
         <div className={styles.modal} onClick={() => setSelectedImage(null)}>
         <img src={selectedImage} alt="Room full view" className={styles.modalImage} />
         </div>
      )}
      <div className={styles.thumbnails}>
        {normalizedSlides.map((slide, index) => {
          return (
            <div
              key={index}
              onClick={() => {
                setCurrent(index);
                setIsPaused(true);
                setTimeout(() => setIsPaused(false), 3000);
              }}
              className={`w-20 h-14 rounded-md overflow-hidden border-2 cursor-pointer transition-all duration-300 ${
                current === index ? "border-white scale-110" : "border-transparent opacity-70 hover:opacity-100"
              }`}
            >
              <img src={images[index]} alt={title} className="w-full h-full object-cover" />
            </div>
          );
        })}
      </div>
    </div>
  );
}