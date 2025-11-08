"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import styles from "./sadbar.module.css";

export default function HeroBackgroundSlider() {
  const slides = [
    {
      image: "/hotel1.jpg",
      title: "مرحبًا بك في أنسام مكة",
      text: "راحة الحجاج هي أولويتنا دائمًا، نقدم لك تجربة إقامة مميزة ومريحة.",
    },
    {
      image: "/hotel2.jpg",
      title: "غرف فاخرة بإطلالة روحانية",
      text: "استمتع بإطلالات مدهشة على الحرم مع خدمات فندقية متكاملة.",
    },
    {
      image: "/hotel3.jpg",
      title: "سهولة الوصول وراحة تامة",
      text: "موقعنا المميز يضمن لك سهولة الوصول إلى المشاعر المقدسة في أي وقت.",
    },
  ];

  const [current, setCurrent] = useState(0);
  const [dragStartX, setDragStartX] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prevSlide = () =>
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsPaused(true);
    setDragStartX(e.touches[0].clientX);
  };

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
  }, [isPaused, current]);

  return (
    <div
      className="relative h-[calc(100vh-70px)] w-full overflow-hidden select-none"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="absolute inset-0 flex">
        {slides.map((slide, index) => {
          const offset = (index - current + slides.length) % slides.length;

          return (
            <motion.div
              key={index}
              className={`${styles.slide} absolute inset-0 bg-cover bg-center transition-all duration-900`}
              style={{
                backgroundImage: `url(${slide.image})`,
                transform: `translateX(${(offset - 1) * 100}%)`,
                opacity: offset === 1 ? 1 : 0,
              }}
            >
              <div className="absolute inset-0 bg-black/50" />
            </motion.div>
          );
        })}
      </div>

      {/* النص */}
      <div className="absolute inset-0 flex flex-col justify-center items-center text-white z-10 text-center p-4 mb-20 md:mb-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className={`${styles.h1text} text-4xl md:text-5xl font-bold mb-4`}>
              {slides[current].title}
            </h1>
            <p className={`${styles.text} text-lg mb-6 max-w-2xl mx-auto`}>
              {slides[current].text}
            </p>
            <button className={`${styles.bookingButton}`}>
              احجز الآن
            </button>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* الأسهم */}
      <button
        onClick={prevSlide}
        className={styles.burgerL}
      >
        <ChevronLeft size={30} className="text-black" />
      </button>

      <button
        onClick={nextSlide}
        className={styles.burger}
      >
        <ChevronRight size={30} className="text-black" />
      </button>
    </div>
  );
}
