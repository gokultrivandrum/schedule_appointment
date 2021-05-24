import * as actionTypes from "../actions/actionTypes";
// @ts-ignore
import uniqueId from "uuid/v1";
import getConfig from 'next/config'
const {publicRuntimeConfig} = getConfig();
const {API_URL} = publicRuntimeConfig;

const initialState = {};

const createReminder = (prevState: any, action: any) => {
  const reminder = {
    id: uniqueId(),
    date: action.reminder.date,
    time: action.reminder.time,
    description: action.reminder.description,
    color: action.reminder.color
  };
  // GET request using fetch with error handling
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(reminder)
  };
  fetch(API_URL, requestOptions)
    .then(async (response: any) => {
      const isJson = response.headers.get('content-type').includes('application/json');
      const data = isJson && await response.json();
      console.log("data", data);
      // check for error response
      if (!response.ok) {
        // get error message from body or default to response status
        const error = (data && data.message) || response.status;
      }
    })
    .catch(error => {
      console.log("error", error);

      console.error('There was an error!', error);
    });

  return {
    ...prevState,
    [action.reminder.date]: prevState[action.reminder.date]
      ? prevState[action.reminder.date].concat(reminder)
      : [reminder]
  };
};

const updateReminder = (prevState: any, action: any) => {
  const reminders: any = [];
  let updatedReminder: any;
  [...prevState[action.reminder.date]].forEach(reminder => {
    if (action.reminder.id === reminder.id) {
      reminder = {
        id: reminder.id,
        date: action.reminder.date,
        time: action.reminder.time,
        description: action.reminder.description,
        color: action.reminder.color,
      };
      updatedReminder = reminder;
    }
    reminders.push(reminder);
  });
  // GET request using fetch with error handling
  const requestOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedReminder)
  };
  fetch(`${API_URL}/${updatedReminder.id}`, requestOptions)
    .then(async (response: any) => {
      const isJson = response.headers.get('content-type').includes('application/json');
      const data = isJson && await response.json();
      console.log("data", data);
      // check for error response
      if (!response.ok) {
        // get error message from body or default to response status
        const error = (data && data.message) || response.status;
      }
    })
    .catch(error => {
      console.log("error", error);

      console.error('There was an error!', error);
    });
  return {
    ...prevState,
    [action.reminder.date]: reminders
  };
};

const deleteReminder = (prevState: any, action: any) => {
  const [updatedReminder] = [...prevState[action.date]].filter(reminder => {
    return reminder.id === action.id;
  });

  // GET request using fetch with error handling
  const requestOptions = {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' }
  };
  fetch(`${API_URL}/${updatedReminder._id}`, requestOptions)
    .then(async (response: any) => {
      const isJson = response.headers.get('content-type').includes('application/json');
      const data = isJson && await response.json();
      console.log("data", data);
      // check for error response
      if (!response.ok) {
        // get error message from body or default to response status
        const error = (data && data.message) || response.status;
      }
    })
    .catch(error => {
      console.log("error", error);

      console.error('There was an error!', error);
    });
  return {
    ...prevState,
    [action.date]: [...prevState[action.date]].filter(reminder => {
      return reminder.id !== action.id;
    })
  };
};
const getReminder = (prevState: any, action: any) => {

  return {
    ...prevState, ...action.reminders
  };
};

const reducer = (prevState = initialState, action: any) => {
  switch (action.type) {
    case actionTypes.CREATE_REMINDER:
      return createReminder(prevState, action);
    case actionTypes.UPDATE_REMINDER:
      return updateReminder(prevState, action);
    case actionTypes.DELETE_REMINDER:
      return deleteReminder(prevState, action);
    case actionTypes.GET_REMINDER:
      return getReminder(prevState, action);
    default:
      return prevState;
  }
};

export default reducer;
