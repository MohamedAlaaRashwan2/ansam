"use client";

import { useEffect, useState } from "react";
import RoomConf from "./roomconf";  
import styles from "./page.module.css";
import { FaInfoCircle } from "react-icons/fa";
import CheckoutSteps from "./checkoutSteps";

interface BookingData {
  checkInDate: string;
  checkOutDate: string;
  adults: string;
  children: string;
}

export default function ConfirmationPage() {

  const [showButton, setShowButton] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const formSection = document.querySelector("form");
      if (!formSection) return;
      const formTop = formSection.getBoundingClientRect().top;
      setShowButton(formTop >= window.innerHeight / 1.7);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [bookingData, setBookingData] = useState<BookingData | null>(null);
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    payment: "credit",
    notes: "",
  });

  useEffect(() => {
    const saved = localStorage.getItem("formData");
    if (saved) setBookingData(JSON.parse(saved));
  }, []);

  const [value, setValue] = useState<string | null>(null);
  useEffect(() => {
    const roomData = localStorage.getItem("room");
    setValue(roomData);
  }, []);
  const roomm = value ? JSON.parse(value) : null; 

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  // Validation Errors
  const [errors, setErrors] = useState({ name: "", email: "", phone: "" });
  const handleBlur = (field: string, value: string) => {
    if (!value.trim()) {
      setErrors((prev) => ({ ...prev, [field]: "يرجى إدخال" }));
    } else {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  if (!bookingData) {
    return <div className="flex items-center justify-center h-screen text-gray-600">لا توجد بيانات حجز حالياً</div>;
  }

  return (
    <main className={styles.main}>
      {showButton && (
        <button
          className={styles.scrollBtn}
          onClick={() => {
            const form = document.querySelector("form");
            if (form) form.scrollIntoView({ behavior: "smooth" });
          }}
        >
          ادخل بياناتك
        </button>
      )}

      <CheckoutSteps currentStep={2} />
      <div className={`${styles.container} container`}>
        <form 
          className={styles.form} 
          action="https://paleturquoise-beaver-156875.hostingersite.com/api_php/create_payment.php" 
          method="POST"
        >
          <h2 className={styles.titleForm}>ادخل بياناتك</h2>

          <div className="p-4 bg-gray-50 rounded-lg shadow-sm border border-gray-200 flex items-center gap-3">
            <span className={styles.icon}>
              <FaInfoCircle size={50} />
            </span>
            <div className={`${styles.infoText} flex flex-col gap-1 text-gray-800`}>
              <p className="text-lg font-medium">
                أوشكت على الانتهاء! قم فقط بتعبئة البيانات المطلوبة <strong className="text-red-500">*</strong>
              </p>
              <p className="text-sm text-gray-600">
                يرجى إدخال بياناتك بالرموز اللاتينية لضمان فهمها من قِبل مكان الإقامة
              </p>
            </div>
          </div>

          {/* Full Name */}
          <div className={styles.containerInput}>
            <label htmlFor="fullName">اسمك الكامل <span>*</span></label>
            <input 
              type="text" 
              name="fullName" 
              placeholder="اسمك الكامل" 
              value={form.fullName} 
              onChange={handleChange} 
              onBlur={() => handleBlur("name", form.fullName)}
              required 
              className={`border ${errors.name ? "border-red-500" : "border-gray-300"}`} 
            />
            {errors.name && <p className={styles.error}>{errors.name} اسمك الكامل</p>}
          </div>

          {/* Phone */}
          <div className={styles.containerInput}>
            <label htmlFor="phone">رقم الهاتف <span>*</span></label>
            <input 
              type="tel" 
              name="phone" 
              placeholder="رقم الهاتف" 
              value={form.phone} 
              onChange={handleChange} 
              onBlur={() => handleBlur("phone", form.phone)}
              required 
              className={`border ${errors.phone ? "border-red-500" : "border-gray-300"}`} 
            />
            {errors.phone && <p className={styles.error}>{errors.phone} رقم الهاتف</p>}
          </div>

          {/* Email */}
          <div className={styles.containerInput}>
            <label htmlFor="email">البريد الإلكتروني <span>*</span></label>
            <input 
              type="email" 
              name="email" 
              placeholder="البريد الإلكتروني" 
              value={form.email} 
              onChange={handleChange} 
              onBlur={() => handleBlur("email", form.email)}
              required 
              className={`border ${errors.email ? "border-red-500" : "border-gray-300"}`} 
            />
            {errors.email && <p className={styles.error}>{errors.email} البريد الإلكتروني</p>}
          </div>

          {/* Payment */}
          <div className={styles.containerInput}>
            <label htmlFor="payment">طريقة الدفع <span>*</span></label>
            <select name="payment" value={form.payment} onChange={handleChange}>
              <option value="stripe">stripe</option>
              <option value="cash">cash</option>
            </select>
          </div>

          {/* Notes */}
          <div className={styles.containerInput}>
            <label htmlFor="notes">طلبات خاصة</label>
            <p>لا يمكن ضمان الطلبات الخاصة، ولكن سيبذل مكان الإقامة قصارى جهده لتلبية احتياجاتك.</p>
            <textarea name="notes" value={form.notes} onChange={handleChange} placeholder="يرجي كتابة طلباتك هنا (اختياري)"/>
          </div>

          {/* Hidden Inputs for PHP */}
          <input type="hidden" name="room_id" value={roomm?.roomid || ""} />
          <input type="hidden" name="price" value={roomm?.price || ""} />
          <input type="hidden" name="check_in" value={bookingData.checkInDate} />
          <input type="hidden" name="check_out" value={bookingData.checkOutDate} />
          <input type="hidden" name="adults" value={bookingData.adults} />
          <input type="hidden" name="children" value={bookingData.children} />

          <button type="submit">تأكيد الحجز</button>
        </form>

        <div className={styles.info}>
          <div className={styles.dataRoom}>
            <h2>تفاصيل حجزك</h2>
            <div className={styles.check}>
              <p><span>تاريخ الوصول</span> {bookingData.checkInDate}</p>
              <span className="w-[1px] bg-gray-300"></span>
              <p><span>تاريخ المغادرة</span> {bookingData.checkOutDate}</p>
            </div>
            <div className={styles.check}>
              <p><span>عدد البالغين</span> {bookingData.adults}</p>
              <span className="w-[1px] bg-gray-300"></span>
              <p><span>عدد الأطفال</span> {bookingData.children}</p>
            </div>
            <p><span>الإجمالي : </span> {roomm?.price} <span>ENG</span></p>
          </div>
          <RoomConf/>
        </div>
      </div>
    </main>
  );
}
