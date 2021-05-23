import React from "react";
import styles from "./HeaderWeekDays.module.css";
type Props = {
  days?: any
}
const headerWeekDays = ({days}: Props) => (
  <header className={styles.weekdays}>
    {days.map((weekday: any, i:any) => (
      <strong key={i} className={styles.strong}>{weekday}</strong>
    ))}
  </header>
);

export default headerWeekDays;
