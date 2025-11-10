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
    
      if (formTop < window.innerHeight / 1.7  ) {
        setShowButton(false);
      } else {
        setShowButton(true);
      }
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

  if(typeof window !== "undefined") {
  }
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

  async function handleSubmit(e: React.FormEvent) {
  e.preventDefault();

  if (!bookingData) return;

  const savedRoom = localStorage.getItem("formData");
  const room = savedRoom ? JSON.parse(savedRoom) : null;
  const roomid = room.roomid;



  if (!room || !roomid) {
    alert("❌ لم يتم تحديد الغرفة بشكل صحيح!");
    return;
  }

  const finalBooking = {
    room_id: roomid,
    user_name: form.fullName,
    check_in: bookingData.checkInDate,
    check_out: bookingData.checkOutDate,
    adults: bookingData.adults,
    children: bookingData.children,
    phone: form.phone,
    email: form.email,
    payment: form.payment,
    notes: form.notes,
    price: roomm.price,
  };

  localStorage.setItem("finalBooking", JSON.stringify(finalBooking));


  try {
    const res = await fetch("https://paleturquoise-beaver-156875.hostingersite.com/api_php/book_room.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(finalBooking),
    });

    const data = await res.json();

    if (data.status === "success") {
      alert("✅ تم تأكيد الحجز بنجاح!");
      localStorage.removeItem("formData");
    } else {
      alert("❌ " + data.message);
    }
  } catch (error) {
    alert("حدث خطأ أثناء حفظ الحجز!");
  }
  localStorage.clear();
 }


  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  // الأخطاء المنفصلة
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
  });


  // عند الخروج من الحقل
  const handleBlur = (field: string, value: string) => {
    if (!value.trim()) {
      setErrors((prev) => ({
        ...prev,
        [field]: "يرجى إدخال",
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
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
              if (form) {
                form.scrollIntoView({ behavior: "smooth" });
              }}}
            ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M297.4 566.6C309.9 579.1 330.2 579.1 342.7 566.6L502.7 406.6C515.2 394.1 515.2 373.8 502.7 361.3C490.2 348.8 469.9 348.8 457.4 361.3L352 466.7L352 96C352 78.3 337.7 64 320 64C302.3 64 288 78.3 288 96L288 466.7L182.6 361.3C170.1 348.8 149.8 348.8 137.3 361.3C124.8 373.8 124.8 394.1 137.3 406.6L297.3 566.6z"/></svg>ادخل بياناتك</button>)}

      <CheckoutSteps currentStep={2} />
      <div className={`${styles.container} container`}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <h2 className={styles.titleForm}> ادخل بياناتك</h2>
          <div className="p-4 bg-gray-50 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center gap-3">
              <span className={styles.icon}>
                <FaInfoCircle size={50} />
              </span>
              <div className={`${styles.infoText} flex flex-col gap-1 text-gray-800`}>
                <p className="text-lg font-medium">
                  أوشكت على الانتهاء! قم فقط بتعبئة البيانات المطلوبة{" "}
                  <strong className="text-red-500">*</strong>
                </p>
                <p className="text-sm text-gray-600">
                  يرجى إدخال بياناتك بالرموز اللاتينية لضمان فهمها من قِبل مكان الإقامة
                </p>
              </div>
            </div>
          </div>
          <div className={styles.containerInput}>
          <label htmlFor="fullName">اسمك الكامل <span> *</span></label>
          <input type="text" name="fullName" placeholder="اسمك الكامل" value={form.fullName} onChange={(e) => {setName(e.target.value); handleChange(e)}} onBlur={() => handleBlur("name", name)} required className={`border ${errors.name ? "border-red-500" : "border-gray-300"}`} />
          {errors.name && <p className={styles.error}>{errors.name} اسمك الكامل</p>}
          </div>
          <div className={styles.containerInput}>
          <label htmlFor="phone">رقم الهاتف <span> *</span></label>
          <input type="tel" name="phone" placeholder="رقم الهاتف" value={form.phone} onChange={(e) => {setPhone(e.target.value); handleChange(e)}} onBlur={() => handleBlur("phone", phone)} required className={`border ${errors.phone ? "border-red-500" : "border-gray-300"}`} />
          {errors.phone && <p className={styles.error}>{errors.phone} رقم الهاتف</p>}
          </div>
          <div className={styles.containerInput}>
          <label htmlFor="email">البريد الإلكتروني <span> *</span></label>
          <input type="email" name="email" placeholder="البريد الإلكتروني" value={form.email} onChange={(e) => {setEmail(e.target.value); handleChange(e)}} onBlur={() => handleBlur("email", email)} required className={`border ${errors.email ? "border-red-500" : "border-gray-300"}`} />
          {errors.email && <p className={styles.error}>{errors.email} البريد الإلكتروني</p>}
          </div>
          <div className={styles.containerInput}>
          <label htmlFor="payment">طريقة الدفع <span> *</span></label>
          <select name="payment" value={form.payment} onChange={handleChange}>
            <option value="stripe">stripe</option>
            <option value="cash">cash</option>
          </select>
          <span className={styles.arrow}>
          </span>
          </div>
          <div className={styles.containerInput}>
          <label htmlFor="notes">طلبات خاصة</label>
          <p>لا يمكن ضمان الطلبات الخاصة، ولكن سيبذل مكان الإقامة قصارى جهده لتلبية احتياجاتك. يمكنك دائماً تقديم طلب خاص بعد إكمال الحجز الخاص بك!</p>
          </div>
          <textarea name="notes" value={form.notes} onChange={handleChange} placeholder="يرجي كتابة طلباتك هنا (اختياري)"/>
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
            <p><span>الإجمالي : </span> {roomm.price} <span>SAR</span></p>
          </div>
          <RoomConf/>
        </div>
      </div>
    </main>
  );
}
