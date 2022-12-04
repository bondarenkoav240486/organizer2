
import React, {useEffect} from 'react';
import MyButton from "./UI/button/MyButton";
import ComponentDate from './ComponentDate.js';
import {useDispatch,useSelector} from "react-redux";
import {setDatesAction, 
        setMonthAction, 
        setYearAction, 
        } from "../toolkitRedux/toolkitSlice";

const Calendar = () => {
    const dispatch = useDispatch();
    const year = useSelector(state => state.toolkit.year);
    const setYear = (par) => ( 
        dispatch(setYearAction(par))
    );
    const month = useSelector(state => state.toolkit.month);
    const setMonth = (par) => ( 
        dispatch(setMonthAction(par))
    );
    let initDates = draw(year, month)
    const dates = useSelector(state => state.toolkit.dates);
    const setDates = (par) => ( 
        dispatch(setDatesAction(par))
    );
     useEffect(()=>{
        setDates(initDates)
    },[year, month])

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

    function draw( year, month) {
        let arr = range(getLastDay(year, month));
        let firstWeekDay = getFirstWeekDay(year, month);    
        let lastWeekDay  = getLastWeekDay(year, month);
        let datesBuffer = chunk(normalize(arr, firstWeekDay, 
            6 - lastWeekDay), 7);

        return datesBuffer
    }

    function getNextYear(){
        if (month == 11) {
            setYear(year+1);
        } else {
            setYear(year);
        }
    }

    function getNextMonth(){
        if(month==11){
            setMonth(0);
        } else {
            setMonth(month+1);
        }
    }

    function next() {
        getNextYear()
        getNextMonth()      
    }

    function getPrevYear(){
        if (month == 0) {
            setYear(year-1);
        } else {
            setYear(year);
            return year
        }
    }

    function getPrevMonth(){
        if(month==0){
            setMonth(11)
        } else {
            setMonth(month-1);
        }
    }
 
    function prev() {
        getPrevYear()
        getPrevMonth() 
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
                className ='info'
            >
                {createInfoMonth(month) + " "}
                {year}  
            </h1>

            <div className = 'calendarTableWrapper'>
                <table>
                    <thead>
                        <tr>
                            <td>пн</td>
                            <td>вт</td>
                            <td>ср</td>
                            <td>чт</td>
                            <td>пт</td>
                            <td>сб</td>
                            <td>нд</td>
                        </tr>
                    </thead>
                    <tbody>
                        {dates.map((week, index) =>
                            <tr key={index}>
                                {week.map((date, index) =>
                                    <ComponentDate 
                                        key={index}
                                        style = {
                                            date == '' + new Date().getDate()
                                            &&month==new Date().getMonth()
                                            &&year==new Date().getFullYear() ?
                                            { 
                                                background: ' #0971DD',
                                                color: '#FFFFFF'
                                            }
                                            :
                                            { }
                                        }
                                    >
                                        {date}
                                    </ComponentDate>
                                )} 
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div className="nav">
                <MyButton 
                    onClick={prev }
                >
                    &lt;  
                </MyButton>
                <MyButton 
                    onClick={next }
                >
                    &gt;    
                </MyButton>
            </div>
       </div>
    );
};

export default Calendar ;