import React, { useState, useEffect } from "react";
import HeaderMonth from "../HeaderMonth";
import HeaderWeekDays from "../HeaderWeekDays";
import Day from "../Day";
import moment from "moment";
import styles from "./Month.module.css";
import useSWR from "swr"
import { useRouter } from 'next/router'
import { connect } from "react-redux";
import * as actions from "../../store/actions";
import { uniqBy } from 'lodash';
import getConfig from 'next/config'
const {publicRuntimeConfig} = getConfig();
const {API_URL} = publicRuntimeConfig;

type Props = {
  setReminderArrayStore?: any
}
const Month = ({ setReminderArrayStore }: Props) => {
  const router = useRouter()

  const [curMonth, setCurMonth] = useState({});
  const [nextMonth, setNextMonth] = useState({});
  const [prevMonth, setPrevMonth] = useState({});
  const [days, setDays] = useState([]);

  const weekdays = moment.weekdays();
  const handleSetEditDay = (day: any) => {
    setCurMonth({
      ...curMonth,
      editDay: day
    });
  };
  const buildDays = (curMonth: any = {}) => {
    const days = [];
    const props: any = {
      editDay: curMonth.editDay,
      handleSetEditDay: handleSetEditDay
    };
    for (let i = 1; i <= curMonth.days; i++) {
      let date = `${curMonth.date}-${("0" + i).slice(-2)}`; // Add leading zeros
      props["date"] = date;
      props["day"] = i;
      props['enable'] = (moment().diff(date, 'days') <= 0) ? true : false;
      if (i === 1) {
        props["firstDayIndex"] = moment(date)
          .startOf("month")
          .format("d");
      } else {
        delete props["firstDayIndex"];
      }

      days.push(<Day key={i} {...props} />);
    }
    return days;
  }
  const setReminderArray = (date: any) => {

    const reminders: any = {};
    if (date) {
      // GET request using fetch with error handling
      const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      };
      
      fetch(API_URL, requestOptions)
        .then(async (response: any) => {
          const isJson = response.headers.get('content-type').includes('application/json');
          const data = isJson && await response.json();
          // check for error response
          if (!response.ok) {
            // get error message from body or default to response status
            const error = (data && data.message) || response.status;
          }
          const dateArray = uniqBy(data, 'date').map((item: any) => item.date);
          dateArray.forEach((element: string) => {
            const reminderFiltered = data.filter((reminder: any) => {
              return reminder.date === element;
            })
            reminders[element] = reminderFiltered;
          });
          setReminderArrayStore(reminders);
        })
        .catch(error => {
          console.error('There was an error!', error);
        });
    }

  }
  useEffect(() => {
    const query: any = router.query
    const year = query?.date?.split('/')[0];
    const month = query?.date?.split('/')[1];
    const currentMonthInt = query?.date ? `${year}-${month}`
      : moment().format("YYYY-MM");
    setReminderArray(currentMonthInt);

    const nextMonthInit = moment(currentMonthInt)
      .add(1, "M")
      .format("YYYY-MM");

    const prevMonthInit = moment(currentMonthInt)
      .subtract(1, "M")
      .format("YYYY-MM");

    setCurMonth({
      date: currentMonthInt,
      name: moment(currentMonthInt).format("MMMM YYYY"),
      days: moment(currentMonthInt).daysInMonth(),
      editDay: null
    });
    setNextMonth({
      date: nextMonthInit,
      slug: nextMonthInit.replace("-", "/")
    });
    setPrevMonth({
      date: prevMonthInit,
      slug: prevMonthInit.replace("-", "/")
    });
  }, [router.query]);

  useEffect(() => {
    const setDaysArray: any = buildDays(curMonth || {});
    setDays(setDaysArray);
  }, [curMonth]);
  return (
    <div className={styles.month}>
      <HeaderMonth
        curMonth={curMonth}
        nextMonth={nextMonth}
        prevMonth={prevMonth}
      />
      <HeaderWeekDays days={weekdays} />
      <section className={styles.days}>{days}</section>
    </div>
  );
}
const mapDispatchToProps = (dispatch: (arg0: any) => any) => {
  return {
    setReminderArrayStore: (payload: any) => dispatch(actions.getReminder(payload)),
  };
};
export default connect(
  null,
  mapDispatchToProps
)(Month);