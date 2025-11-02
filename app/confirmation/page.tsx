"use client";

import { useEffect, useState } from "react";
import RoomConf from "./roomconf";  

interface BookingData {
  checkInDate: string;
  checkOutDate: string;
  adults: string;
  children: string;
}

export default function ConfirmationPage() {
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

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
  e.preventDefault();

  if (!bookingData) return;

  // 🧠 نقرأ بيانات الغرفة من localStorage
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
  };
  console.log(finalBooking);

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
      console.log("Error details:", data);
      console.log( `++++++++++++++++++++++Server response: ${data}`);
    }
  } catch (error) {
    alert("حدث خطأ أثناء حفظ الحجز!");
    console.error(error);
  }
}


  if (!bookingData) {
    return <div className="flex items-center justify-center h-screen text-gray-600">لا توجد بيانات حجز حالياً</div>;
  }

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-2xl">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">🧾 استكمال تأكيد الحجز</h1>
        <RoomConf/>

        <div className="bg-gray-100 p-4 rounded-xl mb-6">
          <h2 className="text-lg font-semibold mb-3">📅 تفاصيل الحجز</h2>
          <p><span className="font-semibold">تاريخ الوصول:</span> {bookingData.checkInDate}</p>
          <p><span className="font-semibold">تاريخ المغادرة:</span> {bookingData.checkOutDate}</p>
          <p><span className="font-semibold">عدد البالغين:</span> {bookingData.adults}</p>
          <p><span className="font-semibold">عدد الأطفال:</span> {bookingData.children}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" name="fullName" placeholder="اسمك الكامل" value={form.fullName} onChange={handleChange} required className="w-full border border-gray-300 rounded-lg p-2" />
          <input type="tel" name="phone" placeholder="رقم الهاتف" value={form.phone} onChange={handleChange} required className="w-full border border-gray-300 rounded-lg p-2" />
          <input type="email" name="email" placeholder="البريد الإلكتروني" value={form.email} onChange={handleChange} required className="w-full border border-gray-300 rounded-lg p-2" />
          <select name="payment" value={form.payment} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-2">
            <option value="credit">بطاقة ائتمان 💳</option>
            <option value="paypal">PayPal 🅿️</option>
            <option value="cash">دفع عند الوصول 💵</option>
          </select>
          <textarea name="notes" value={form.notes} onChange={handleChange} placeholder="ملاحظات إضافية (اختياري)" className="w-full border border-gray-300 rounded-lg p-2" />
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">تأكيد الحجز ✅</button>
        </form>
      </div>
    </main>
  );
}
