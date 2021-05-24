import React from "react";
import TimePicker from "rc-time-picker";
// @ts-ignore
import ColorPicker from "rc-color-picker";
import moment from "moment";
import styles from "./ReminderForm.module.css";
const textareaCSS = `${styles.textarea} ${styles.description} description`;
type Props = {
  reminder?: any,
  handleCreateUpdateReminder?: any,
  handleSetEditDay?: any,
  defaultColor?: any,
  handleSetColor?: any,
}
const reminderForm = ({ reminder, handleCreateUpdateReminder, handleSetEditDay, defaultColor, handleSetColor } : Props) => {
  const time = reminder.time
    ? moment(reminder.time, "HH:mm a")
    : moment()
      .hour(0)
      .minute(0);
  const maxLength =30;

  return (
    <form
      method="post"
      className={styles.reminderForm}
      onSubmit={e => handleCreateUpdateReminder(e, reminder)}
    >
      <textarea
        className={textareaCSS}
        placeholder="Appointment"
        maxLength={maxLength}
        defaultValue={reminder.description}
      />

      <TimePicker
        showSecond={false}
        defaultValue={time}
        format="h:mm a"
        use12Hours
        inputReadOnly
      />

      <ColorPicker
        className={styles.colorPicker}
        animation="slide-up"
        color={reminder.color || defaultColor}
        onClose={handleSetColor}
      />

      <button className={styles.btnSubmit}>Submit</button>

      <button
        className={styles.btnCancel}
        onClick={() => handleSetEditDay(null)}
      >
        Cancel
      </button>
    </form>
  );
};

export default reminderForm;
