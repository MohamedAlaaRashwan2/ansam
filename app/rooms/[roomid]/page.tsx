
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
  bad?: string;
  capacity?: number;
}
export default async function RoomPage({ params }: { params: { roomid: string } }) {

  const  roomid  = params.roomid;

    const res = await fetch(`https://paleturquoise-beaver-156875.hostingersite.com/api_php/room.php/${roomid}`, {
      next: {
        revalidate: 60,
      },
    });
    const Room = await res.json();

  return (
    <div>
      <h4>{Room.name}</h4>
      <p>{Room.description}</p>
      <div className={styles.mainimage}>
        <img src={Room.images[0]} alt={Room.name} />
      </div>
      <div className={styles.images}>
      {Room.images.map((image:string) => (
        <img key={image} src={image} alt={Room.name} />
      ))}
      </div>
      <p>{Room.price}</p>  <p>{Room.rating}</p>
    </div>
  );
}
