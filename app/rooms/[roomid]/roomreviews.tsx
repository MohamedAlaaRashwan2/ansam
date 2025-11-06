"use client";
import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import styles from "./roomreviews.module.css";
import { AnimatePresence, motion } from "framer-motion";
import Loading from "./loading";
interface Review {
  id: number;
  name: string;
  email?: string;
  rating: number;
  comment: string;
  created_at: string;
}

export default function RoomReviews({ roomId }: { roomId: number }) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [review, setReview] = useState({
    room_id: roomId,
    name: "",
    email: "",
    rating: "3",
    comment: "",
  });

  // 🟢 جلب التقييمات الخاصة بالغرفة
  const fetchReviews = async () => {
    try {
      const res = await fetch(
        `https://paleturquoise-beaver-156875.hostingersite.com/api_php/get_reviews.php?room_id=${roomId}`
      );
      const data = await res.json();
      if (data.status === "success") setReviews(data.data);
    } catch (error) {
      console.error("فشل تحميل التقييمات", error);
    }
  };

  // 🟢 عند التحميل
  useEffect(() => {
    fetchReviews();
  }, [roomId]);

  // 🟢 إرسال رأي جديد
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(
      "https://paleturquoise-beaver-156875.hostingersite.com/api_php/add_review.php",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(review),
      }
    );
    const data = await res.json();
    alert(data.message);
    if (data.status === "success") {
      setReview({ ...review, name: "", email: "", comment: "" });
      fetchReviews(); 
    }
  };
setTimeout(() => {
  const element = document.getElementById('comment');
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'center'
    });
  }
}, 0);
  
 function disableScroll() {
  document.body.style.overflow = "hidden";
}

 function enableScroll() {
  document.body.style.overflow = '';
}

  return (
    <div className={styles.reviewsContainer}>
      <h3 className={styles.title}>تقييمات الضيوف</h3>

      {/* عرض الاراء القادمه من السرفر */}
      {reviews.length > 0 ? (
        <div className={styles.review}>
          {reviews.map((r, index) => (
            <div key={r.id} className={styles.reviewItem} >
              <div className={styles.reviewHeader}>
                <strong>{r.name}</strong>
                <span className={styles.ratingg}>
                  <FaStar className={styles.star} />
                  {r.rating}
                </span>
              </div>
              <p>{r.comment} </p><span className={styles.readMore} onClick={() => {
              setSelected(index)
              setTimeout(() => {
                disableScroll()
              }, 0);
              }}>اقرا المزيد</span>
              <small className={styles.date}>
                {new Date(r.created_at).toLocaleDateString("ar-EG")}
              </small>
            </div>
          ))}
        </div>
      ) : (
        <p>لا توجد تقييمات بعد.</p>
      )}
      {/* اضافه رئي الي السرفر*/}
      <div className={styles.addReview}>
      <h3 className={styles.title}>اضف تقيمك</h3>
      <p className={styles.text}>اكتب رأيك هنا, لن يُنشر عنوان بريدك الإلكتروني</p>
      <form onSubmit={handleSubmit} className={styles.form}>
        <textarea
          placeholder="اكتب رأيك هنا..."
          rows={4}
          required
          value={review.comment}
          onChange={(e) => setReview({ ...review, comment: e.target.value })}
        />
            <div className={styles.rating}>
                <input value="5" name="rate" id="star5" type="radio" onChange={(e) => setReview({ ...review, rating: e.target.value })}/>
                <label title="text" htmlFor="star5"></label>
                <input value="4" name="rate" id="star4" type="radio" onChange={(e) => setReview({ ...review, rating: e.target.value })}/>
                <label title="text" htmlFor="star4"></label>
                <input value="3" name="rate" id="star3" type="radio" defaultChecked onChange={(e) => setReview({ ...review, rating: e.target.value })}/>
                <label title="text" htmlFor="star3"></label>
                <input value="2" name="rate" id="star2" type="radio" onChange={(e) => setReview({ ...review, rating: e.target.value })}/>
                <label title="text" htmlFor="star2"></label>
                <input value="1" name="rate" id="star1" type="radio" onChange={(e) => setReview({ ...review, rating: e.target.value })}/>
                <label title="text" htmlFor="star1"></label>
            </div>
        <div className={`flex gap-4 ${styles.nameEmail}`} > 
           <input
          type="text"
          placeholder="الاسم"
          value={review.name}
          required
          onChange={(e) => setReview({ ...review, name: e.target.value })}
          />
         <input
          type="email"
          required
          placeholder="البريد الإلكتروني"
          value={review.email}
            onChange={(e) => setReview({ ...review, email: e.target.value })}
         />
        </div>
        <button
          type="submit"
          className={styles.button}
        >
          إرسال التقييم
        </button>
      </form>
      </div>
        <AnimatePresence>
        {selected !== null && (
          <>
            <motion.div
              className={styles.modal}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setSelected(null)
                enableScroll()
              }}
            />

            <motion.div
              className={styles.modalItem}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
             <div  key={reviews[selected].id} id="comment" className={styles.reviewModal} >
              <div className={styles.reviewHeader}>
                <strong>{reviews[selected].name}</strong>
                <span className={styles.rating}>
                  ({reviews[selected].rating} / 5)
                </span>
                <FaStar className={styles.star} />
              </div>
              <p>{reviews[selected].comment} </p>
              <small className={styles.date}>
                {new Date(reviews[selected].created_at).toLocaleDateString("ar-EG")}
              </small>
              <button
                className={styles.closeButton}
                onClick={() => {
                  setSelected(null)
                  enableScroll()
                }}
              >
                إغلاق
              </button>
            </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
