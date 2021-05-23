import React from "react";
import Link from 'next/link'
import styles from "./HeaderMonth.module.css";
type Props = {
  prevMonth?: any,
  curMonth?: any,
  nextMonth?: any
}
const headerMonth = ({prevMonth, curMonth, nextMonth}: Props) => (
  <header className={styles.monthHeader}>
    <div  className={styles.row}>
      <Link href={`/?date=${prevMonth.slug}`} >
        <i className={styles.fas+' fas fa-chevron-circle-left'} />
      </Link>
    </div>
    <div className={styles.row}>
      <h1>{curMonth.name}</h1>
    </div>
    <div className={styles.row}>
      <Link href={`/?date=${nextMonth.slug}`}>
        <i className={styles.fas + ' fas fa-chevron-circle-right'} />
      </Link>
    </div>
  </header>
);

export default headerMonth;