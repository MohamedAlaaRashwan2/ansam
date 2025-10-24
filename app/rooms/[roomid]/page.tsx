import styles from "./page.module.css";

interface Room {
  id: number;
  name: string;
  price: number;
  rating?: number;
  description: string;
  images?: string[];
  services?: string[];
  size?: number;
  bed?: string;
  capacity?: number;
}

interface RoomPageProps {
  params: {
    roomid: string;
  };
}

export default async function RoomPage(props: {
  params: Promise<{ roomid: string }>;
}) {
    const { roomid } = await props.params;

  const res = await fetch(
    `https://paleturquoise-beaver-156875.hostingersite.com/api_php/room.php/${roomid}`,
    {
      // ✅ استخدم cache: "no-store" أو revalidate
      next: { revalidate: 60 },
    }
  );

  // ✅ تأكد إن البيانات رجعت بشكل صحيح
  if (!res.ok) {
    return (
      <div>
        <h3>حدث خطأ أثناء تحميل بيانات الغرفة.</h3>
      </div>
    );
  }

  const room: Room = await res.json();

  return (
    <div className={styles.container}>
      <h4>{room.name}</h4>
      <p>{room.description}</p>

      {/* ✅ الصورة الرئيسية */}
      {room.images && room.images.length > 0 && (
        <div className={styles.mainimage}>
          <img
            src={room.images[0]}
            alt={room.name}
            width={500}
            height={300}
            style={{ borderRadius: "12px" }}
          />
        </div>
      )}

      {/* ✅ باقي الصور */}
      {room.images && room.images.length > 1 && (
        <div className={styles.images}>
          {room.images.slice(1).map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`${room.name} image ${index + 1}`}
              width={150}
              height={100}
              style={{ borderRadius: "8px" }}
            />
          ))}
        </div>
      )}

      <p>💰 السعر: {room.price} ريال</p>
      {room.rating && <p>⭐ التقييم: {room.rating}</p>}
    </div>
  );
}
