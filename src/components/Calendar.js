
import React, {useMemo, useEffect, useState,useRef} from 'react';
import MyButton from "./UI/button/MyButton";
import ComponentDate from './ComponentDate.js';
import {useDispatch,useSelector} from "react-redux";
import {setDatesAction, setMonthAction, setYearAction, saveChangesAction, setInitNotesAllStateAction, setModalAction, setFilterAction, setSaveAction, setPostAction, setPostsAction, setAllNotesAction, setVisibleAction, increment, } from "../toolkitRedux/toolkitSlice";

const Calendar = () => {
    const dispatch = useDispatch();
    const allNotes = useSelector(state => state.toolkit.allNotes);
    const setAllNotes = (par) => ( 
        dispatch(setAllNotesAction(par))
    );
    const setVisible = (par) => ( 
        dispatch(setVisibleAction(par))
    );
    const setPosts = (par) => ( 
        dispatch(setPostsAction(par))
    );
    const year = useSelector(state => state.toolkit.year);
    const setYear = (par) => ( 
        dispatch(setYearAction(par))
    );
    const month = useSelector(state => state.toolkit.month);    const setMonth = (par) => ( 
        dispatch(setMonthAction(par))
    );

    let initDates = draw(year,month)
    // const[dates,setDates] = useState(initDates);
    const dates = useSelector(state => state.toolkit.dates);
    const setDates = (par) => ( 
        dispatch(setDatesAction(par))
    );
    useEffect(()=>{
        setDates(initDates)
    },[])

    // arr of dates
    function range(count) {
        let arr = [];
        for(let i = 1;i<=count;i++){
            arr.push(i)
        }
        return arr
    }

    // function for getting last day of month
    function getLastDay(year, month) {
        return new Date(year,month+1,0).getDate()
    }

    // function for getting first day of month
    function getFirstWeekDay(year, month) {
        let date = new Date(year, month, 1);
        let num  = date.getDay();
        if (num == 0) {
            return 6;
        } else {
            return num - 1;
        }
    }

    //  function for getting last day last week of month
    function getLastWeekDay(year, month) {
        let date = new Date(year, month + 1, 0);
        let num  = date.getDay(); 
        if (num == 0) {
            return 6;
        } else {
            return num - 1;
        }
    }

    //function for normalize arr(adding empty lines around the edges)
    function normalize(arr, left, right) {
        for(let i = 0;i< left;i++){
            arr.unshift('')
        }
        for(let i = 0;i< right;i++){
            arr.push('')
        }
        return arr
    }

    //  function for forming a two-dimensional array
    function chunk(arr, n) {
        // n - the number of elements in the subarray
        let amountWeeks = arr.length/n
        let arr2 = [];
        for(let i = 0;i<amountWeeks;i++ ){
            arr2.push(arr.splice(0,n));
        }
        return arr2
    }

    // ....
    function getNextYear(){
        if (month == 11) {
            let copyYear = year+1;
            // setYear(copyYear);
            setYear(year+1);

            // return copyYear
            return year+1
        }

        let copyYear = year;
        // setYear(copyYear);
        setYear(year);

        return year
    }

    // ....
    function getNextMonth(){
        if(month==11){
            let copyMonth = 0;
            // setMonth(copyMonth);
            setMonth(0);

            // return copyMonth
            return 0
        } else {
            // let copyMonth = month+1;
            // setMonth(copyMonth);
            setMonth(month+1);

            // return  copyMonth
            return  month+1
        }
    }

    // ....
    function getPrevYear(){
        if (month == 0) {
            let copyYear = year-1;
            setYear(copyYear);

            return copyYear 
        }
        let copyYear = year;
        setYear(copyYear);

        return copyYear
    }

    // ....
    function getPrevMonth(){
        if(month==0){
            let copyMonth = 11;
            setMonth(copyMonth)

            return copyMonth
        } else {
            let copyMonth = month-1;
            setMonth(copyMonth);

            return copyMonth 
        }
    }

    function draw( year, month) {
        let arr = range(getLastDay(year, month));
        let firstWeekDay = getFirstWeekDay(year, month);    
        let lastWeekDay  = getLastWeekDay(year, month);
        let datesBuffer = chunk(normalize(arr, firstWeekDay, 
            6 - lastWeekDay), 7); 

        return datesBuffer
    }

    function next() {
        const nextMonth = getNextMonth();
        let nextDates = [...draw(getNextYear(), nextMonth )]
        setDates(nextDates);
    }

    function prev() {
        let prevtDates = [...draw(getPrevYear(), getPrevMonth() )]
        setDates(prevtDates);
    }

    function createInfoMonth(month){
        let  monthes = 
            [
                'Січень','Лютий','Березень','Квітень', 
                'Травень','Червень','Липень','Серпень',
                'Вересень','Жовтень','Листопад','Грудень'
            ];

        return monthes[month]
    } 

    return (
        <div id="calendar">
            <h1 
                className ='info'>
                {year}  
                {createInfoMonth(month)}
            </h1>
            <table>
                <thead>
                    <tr>
                        <th>пн</th>
                        <th>вт</th>
                        <th>ср</th>
                        <th>чт</th>
                        <th>пт</th>
                        <th>сб</th>
                        <th>нд</th>
                    </tr>
                </thead>
                <tbody>
                    {dates.map((week, index) =>
                        <tr key={index}>
                            {week.map((date, index) =>
                                <ComponentDate 
                                    key={index}
                                    allNotes={allNotes}
                                    setAllNotes={setAllNotes}
                                >
                                    {date}
                                </ComponentDate>
                            )} 
                        </tr>
                    )}
                </tbody>
            </table>

            <div className="nav">
                <MyButton 
                    onClick={prev }
                >
                    ←  
                </MyButton>
                <MyButton 
                    onClick={next }
                >
                    →
                </MyButton>
            </div>
       </div>
    );
};

export default Calendar ;