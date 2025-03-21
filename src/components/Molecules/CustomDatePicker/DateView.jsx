/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from "react";
import styles from "./DatePicker.module.css"
import {
    addDays,
    addMonths,
    differenceInMonths,
    format,
    isSameDay,
    lastDayOfMonth,
    startOfMonth
} from "date-fns";
import { es, enUS } from 'date-fns/locale';


const DateView = ({startDate, lastDate, selectDate, getSelectedDay, primaryColor, labelFormat, marked}) => {
    const [selectedDate, setSelectedDate] = useState(null);
    const firstSection = {marginLeft: '0px'};
    const selectedStyle = {fontWeight:"bold",width:"55px",height:"60px",borderRadius:"12px",background:primaryColor,color:"white",boxShadow:"0 3px 8px rgba(0, 0, 0, 0.15)"};
    const labelColor = {color: primaryColor};
    const markedStyle = {color: "#8c3737", padding: "2px", fontSize: 12};

    // const selectedLocale = locale === 'es' ? es : enUS;

    const getStyles = (day) => {
        return isSameDay(day, selectedDate)?selectedStyle:null;
    };

    const getId = (day) => {
        return isSameDay(day, selectedDate)?'selected':"";
    };

    const getMarked = (day) => {
        console.log("marked",marked)
        let markedRes = marked.find(i => isSameDay(i.date, day));
        if (markedRes) {
            if (!markedRes?.marked) {
                return;
            }

            return <div style={{ ...markedRes?.style ?? markedStyle }} className={styles.markedLabel}>
                {markedRes.text}
            </div>;
        }

        return "";
    };

    const renderDays = () => {
        const dayFormat = "E";
        const dateFormat = "d";

        const months = [];
        let days = [];

        // const styleItemMarked = marked ? styles.dateDayItemMarked : styles.dateDayItem;

        for (let i = 0; i <= differenceInMonths(lastDate, startDate); i++) {
            let start, end;
            const month = startOfMonth(addMonths(startDate, i));

            start = i === 0 ? Number(format(startDate, dateFormat)) - 1 : 0;
            end = i === differenceInMonths(lastDate, startDate) ? Number(format(lastDate, "d")) : Number(format(lastDayOfMonth(month), "d"));

            // if (i === 0) {
            //     // Primer mes
            //     start = Number(format(startDate, dateFormat)) - 1;
            //     end = Number(format(lastDayOfMonth(month), "d"));
            // } else if (i === differenceInMonths(lastDate, startDate)) {
            //     // Último mes
            //     start = 0;
            //     end = Number(format(lastDate, "d"));
            // } else {
            //     // Meses intermedios
            //     start = 0;
            //     end = Number(format(lastDayOfMonth(month), "d"));
            // }

            for (let j = start; j < end; j++) {
                let currentDay = addDays(month, j);
                days.push(
                    <div id={`${getId(currentDay)}`}
                         className={marked ? styles.dateDayItemMarked : styles.dateDayItem}
                         style={getStyles(currentDay)}
                         key={currentDay}
                        //  onClick={() => onDateClick(currentDay)}
                    >
                        <div className={styles.dayLabel}>{format(currentDay, dayFormat, {locale: es})}</div>
                        <div className={styles.dateLabel}>{format(currentDay, dateFormat, {locale: es})}</div>
                        {/* {getMarked(currentDay)} */}
                    </div>
                );
            }
            months.push(
                <div className={styles.monthContainer}
                     key={month}
                >
                    <span className={`${styles.monthYearLabel} text-uppercase`} style={labelColor}>
                        {format(month, labelFormat || "MMMM yyyy", {locale: es})}
                    </span>
                    <div className={styles.daysContainer} style={i===0?firstSection:null}>
                        {days}
                    </div>
                </div>
            );
            days = [];

        }
        return <div id={"container"} className={styles.dateListScrollable}>{months}</div>;
    }

    const onDateClick = day => {
        setSelectedDate(day);
        if (getSelectedDay) {
            getSelectedDay(day);
        }
    };

    useEffect(() => {
        if (getSelectedDay) {
            if (selectDate) {
                getSelectedDay(selectDate);
            } else {
                getSelectedDay(startDate);
            }
        }
    }, []);

    useEffect(() => {
        if (selectDate) {
            if (!isSameDay(selectedDate, selectDate)) {
                setSelectedDate(selectDate);
                setTimeout(() => {
                    let view = document.getElementById('selected');
                    if (view) {
                        view.scrollIntoView({behavior: "smooth", inline: "center", block: "nearest"});
                    }
                }, 20);
            }
        }
    }, [selectDate]);

    return <React.Fragment>{renderDays()}</React.Fragment>
}




export { DateView }