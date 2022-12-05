
import React, {useEffect} from 'react';

const InfoToday = () => {
     useEffect(()=>{
        go()    
    },[])

    function go(){
        let timerId = setInterval(timer, 500);
    }

    function timer(){
            // var clock = document.getElementById('clock');
        let date = new Date();
        let clock =  document.getElementById('clock');
        clock.innerHTML = 
            addZero(date.getHours())
            +':'+addZero(date.getMinutes())
            +':'+addZero(date.getSeconds());
    }

    function addZero(num){
            if(num <=9) return '0'+num;
                else return num;
    }

    const getTodayDayOfWeek = () => {
        let  daysOfWeek = 
            [
                'Неділя','Понеділок','Вівторок','Середа', 
                'Четвер',"П'ятниця",'Субота',
            ];

        return daysOfWeek[new Date().getDay()]
    }

    function getTodayMonth(){
        let  monthes = 
            [
                'січня','лютого','березня','квітня', 
                'травня','червня','липня','серпня',
                'вересня','жовтня','листопада','грудня'
            ];

        return monthes[new Date().getMonth()]
    } 

    return (
        <div id="infoToday">
            <div 
                id="clock"
            >
            </div>
            <br/>
            <div id="infoTodayDayAndDate">
                {
                    getTodayDayOfWeek()
                    + ' ' + new Date().getDate()
                    + ' ' + getTodayMonth() 
                    + " " + new Date().getFullYear()
                    + ' р.'
                }
            </div>    
       </div>
    );
};

export default InfoToday ;