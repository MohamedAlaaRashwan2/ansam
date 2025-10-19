"use client";
import Link from "next/link";
import Image from "next/image";
import styles from "./navbar.module.css";
import { useEffect, useState, useRef } from "react";

export default function Navbar() {

const checkboxRef = useRef<HTMLInputElement>(null);
const menuRef = useRef<HTMLDivElement>(null);

useEffect(() => {
  const handleClickOutside = (event: MouseEvent) => {
    if (!checkboxRef.current || !menuRef.current) return;

    const burgerClicked = event.target === checkboxRef.current || 
      (event.target as HTMLElement).closest(`.${styles.burger}`);

    const menuClicked = menuRef.current.contains(event.target as Node);

    if (!menuClicked && !burgerClicked) {
      checkboxRef.current.checked = false;
    }
  };

  document.addEventListener("click", handleClickOutside);
  return () => document.removeEventListener("click", handleClickOutside);
}, []);





    return (
    <nav className={`${styles.navbar} `}>
        <div className={`${styles.container} container`}>
          <div className={styles.logoContainer}>
            <Image className={styles.logo} src="/ansam_logo_FAINL.png" alt="ansa hotel" width={100} height={100} />
          </div>
            <ul className={styles.navLinks}>
                <li><Link href="/">الرئيسية</Link></li>
                <li><Link href="#about">عننا</Link></li>
                <li><Link href="/rooms">الغرف</Link></li>
                <li><Link href="#contact">التواصل</Link></li>
            </ul>
            <Link className={styles.bookingButton} href="/booking"><button>احجز الآن</button></Link>
            <input ref={checkboxRef} type="checkbox" id="burger" className={styles.burgerCheckbox} />
           <label className={styles.burger} htmlFor="burger">
               <span></span>
               <span></span>
               <span></span>
            </label>
            <div ref={menuRef} className={styles.navLinksMobile}>
                <Image className={styles.logoMobile} src="/ansam_logo_FAINL.png" alt="ansa hotel" width={100} height={100} />
                <ul>
                <li><Link href="/">الرئيسية</Link></li>
                <li><Link href="#about">عننا</Link></li>
                <li><Link href="/rooms">الغرف</Link></li>
                <li><Link href="#contact">التواصل</Link></li>
                </ul>
                <Link className={styles.bookingButtonMobile} href="/booking"><button>احجز الآن</button></Link>
            </div>
        </div>
    </nav>
    );
}