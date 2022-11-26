

import React, {useEffect, useState,useRef} from 'react';

import {useDispatch,useSelector} from "react-redux";
import {setNotesOfThisDateAction, setallNotesDateIdAction, pushNewNotesDateAction, setDatesAction, setMonthAction, setYearAction, saveChangesAction, setInitNotesAllStateAction, setModalAction, setFilterAction, setSaveAction, setPostAction, setPostsAction, setAllNotesAction, setVisibleAction, increment, } from "../toolkitRedux/toolkitSlice";


const ComponentDate = ({children, index, setShowNotesDate,}) => {
    const dispatch = useDispatch();
    const allNotes = useSelector(state => state.toolkit.allNotes);
     const setAllNotes = (par) => ( 
        dispatch(setAllNotesAction(par))
    );
    const setVisible = (par) => ( 
        dispatch(setVisibleAction(par))
    );
    const year = useSelector(state => state.toolkit.year);
    const setYear = (par) => ( 
        dispatch(setYearAction(par))
    );
    const posts = useSelector(state => state.toolkit.posts);
    // console.log(posts)
        // const setMonth = (par) => ( 
        // dispatch(setMonthAction(par))
        //);
    const month = useSelector(state => state.toolkit.month);
    const setPosts = (par) => ( 
        dispatch(setPostsAction(par))
    );

    function organize(event) {
        console.log('posts :', posts)

        setVisible(true);
        // 
        let tdArr = Array.from(document.querySelectorAll('td'));
        tdArr.forEach((elem,i,arr) => {
            elem.style.background = "transparent";
        })
        // 
        event.target.style.background = "lightblue";
        //  
        if( event.target.textContent == ''){
            return 
        }
        else{
        }  
        // 
        let id = event.target.textContent + '.' + month + '.' + year;
        let obj ={};
        // 
        // за необхідності створюємо записник за цю дату
        if( allNotes.find(elem=>elem.id==id)==undefined ){
            obj = {
            id:id,
            notes:[
                {id:'1', title:id+'titlenew notes', body:'bodynew notes'},
                {id:'11', title:id+'titlenew notes', body:'bodynew notes'},
                // {id:'111', title:'', body:''},
                ]
            };
            // allNotes.push(obj);
           dispatch( pushNewNotesDateAction(obj) );
        }
        else{
        }
        // 
        // allNotes[0].dateId = allNotes.find(elem=>elem.id==id).id
        dispatch( setallNotesDateIdAction(id) );
        // 
        // console.log('allNotes :', ...allNotes.find(elem=>elem.id==id));
        //set notes of this date  
        // setPosts(  [...allNotes.find(elem=>elem.id==id).notes]  )
        dispatch( setNotesOfThisDateAction(id) );
        // 
        // setAllNotes([...allNotes ])
        console.log(posts)
        // 
    }

        // console.log('children :', children)
    return (
        <td key={index}
            onClick = {organize}
        >
        {children}
        </td> 
    );
};

export default ComponentDate;