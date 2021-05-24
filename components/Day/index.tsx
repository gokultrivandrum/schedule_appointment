import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
import ReminderForm from "./ReminderForm";
import Reminder from "./Reminder";
import _sortBy from "lodash/sortBy";
import styles from "./day.module.css";
import { toast } from 'react-toastify';

const defaultColor = "#000";
type Props = {
  remindersProp?: any,
  date?: any,
  firstDayIndex?: any,
  editDay?: any,
  handleSetEditDay?: any,
  day?: any,
  deleteReminder?: any,
  updateReminder?: any,
  createReminder?: any,
  enable?:any
}
const Day = ({ remindersProp, date, firstDayIndex, editDay, handleSetEditDay, day, deleteReminder, updateReminder, createReminder, enable}: Props) => {

  const [editReminder, setEditReminder] = useState({});

  useEffect(() => {
    setEditReminder({
      _id: null,
      id: null,
      date: date,
      time: null,
      description: null,
      color: defaultColor
    })
  }, []);

  const handleSetColor = (data: any) => {
    setEditReminder({
      ...editReminder,
      color: data.color
    });
  };

  const handleSetEdit = (reminder: any) => {
    handleSetEditDay(day);

    setEditReminder({
      ...editReminder,
      ...reminder
    });
  };

  const handleCreateUpdateReminder = (e: any, update: any) => {
    e.preventDefault();
    let payload: any = {};
    const form = e.target;
    const description = form.querySelector(".description")?.value.trim();
    const editReminderColor:any = editReminder;
    if (description?.length) {
      payload = {
        date: date,
        time: form.querySelector(".rc-time-picker-input")?.value,
        description: description,
        color:  editReminderColor.color || defaultColor
      };
      if (update.id) {
        payload["id"] = update.id;
        payload["_id"] = update._id;
        updateReminder(payload);
      } else {
        const reminderFiltered = (remindersProp[date]) ? remindersProp[date].filter((reminder: any) => {
          return reminder.date === date && reminder.time === payload.time;
        }) : [];
        if (reminderFiltered.length > 0) {
          toast.warn('Please choose someother slot', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: 1,
          });
        } else {
          createReminder(payload);
        }
      }

      handleSetEditDay(null);
      setEditReminder({});
    }
  };

  const handleDeleteReminder = (id: any) => {
    deleteReminder(date, id);
  };

  const reminders =
    _sortBy(remindersProp[date], "time") || [];
  const cssClasses = firstDayIndex
    ? `${styles.day} firstIndex${firstDayIndex}`
    : `${styles.day}`;
  const circleCss = `${styles.btnNewReminder} fas fa-plus-circle`;

  return (
    <article className={cssClasses}>
      {!editDay && enable && (
        <button
          className={styles.btnNewReminder}
          onClick={() => handleSetEditDay(day)}
        >
          <i className={circleCss} />
        </button>
      )}

      {editDay === day ? (
        <ReminderForm
          reminder={editReminder}
          handleSetColor={handleSetColor}
          handleSetEditDay={handleSetEditDay}
          handleCreateUpdateReminder={handleCreateUpdateReminder}
          defaultColor={defaultColor}
        />
      ) : (
        <React.Fragment>
          <header>{day}</header>

          {reminders.length
            ? reminders.map((reminder: any, i: any) => {
              return (
                <Reminder
                  key={i}
                  reminder={reminder}
                  handleSetEdit={handleSetEdit}
                  handleDeleteReminder={handleDeleteReminder}
                />
              );
            })
            : null}
        </React.Fragment>
      )}
    </article>
  );
}

const mapStateToProps = (state: any) => {
  return {
    remindersProp: state
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    createReminder: (payload: any) => dispatch(actions.createReminder(payload)),
    updateReminder: (payload: any) => dispatch(actions.updateReminder(payload)),
    deleteReminder: (date: any, id: any) => dispatch(actions.deleteReminder(date, id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Day);
