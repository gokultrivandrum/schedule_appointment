import React from "react";
import styles from "./reminder.module.css";
const trashCss=`${styles.fas} fas fa-trash-alt`;
const editCss=`${styles.fas} fas fa-edit`;
type Props = {
  reminder?: any,
  handleDeleteReminder?: any,
  handleSetEdit?: any
}
const reminder = ({reminder, handleDeleteReminder, handleSetEdit}:Props) => (
  <article className={styles.reminder} style={{ background: reminder.color }}>
    <div className={styles.tools}>
      <button onClick={() => handleDeleteReminder(reminder.id)}>
        <i className={trashCss} />
      </button>
      <button onClick={() => handleSetEdit(reminder)}>
        <i className={editCss} />
      </button>
    </div>
    <strong className={styles.strong}>{reminder.description}</strong>
    <time>{reminder.time}</time>
  </article>
);

export default reminder;
