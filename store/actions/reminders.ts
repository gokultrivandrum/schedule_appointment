import * as actionTypes from "./actionTypes";

// Action creators
const createReminderAction = (reminder: any) => {
  return {
    type: actionTypes.CREATE_REMINDER,
    reminder: reminder
  };
};

const updateReminderAction = (reminder: any) => {
  return {
    type: actionTypes.UPDATE_REMINDER,
    reminder: reminder
  };
};

const deleteReminderAction = (date: any, id: any) => {
  return {
    type: actionTypes.DELETE_REMINDER,
    date: date,
    id: id
  };
};
const getReminderAction = (reminders: any) => {
  return {
    type: actionTypes.GET_REMINDER,
    reminders: reminders
  };
};

// Actions
export const createReminder = (payload: any) => {
  return (dispatch:any) => {
    dispatch(createReminderAction(payload));
  };
};

export const updateReminder = (payload: any) => {
  return (dispatch:any) => {
    dispatch(updateReminderAction(payload));
  };
};

export const deleteReminder = (date: any, id: any) => {
  return (dispatch:any) => {
    dispatch(deleteReminderAction(date, id));
  };
};
export const getReminder = (reminders: any) => {
  return (dispatch:any) => {
    dispatch(getReminderAction(reminders));
  };
};