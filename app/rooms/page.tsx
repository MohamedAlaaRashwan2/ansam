"use client";
 import Rooms from "./components/rooms";
 import styles from "./page.module.css";
import { useState } from "react";

 export default function RoomsPage() {

  const [currentPage, setCurrentPage] = useState<number>(1);

  return(
    <main className={styles.main}>
    <Rooms />
    </main>
  );
}

