

import React from 'react';

import {useDispatch,useSelector} from "react-redux";
import {
        setNotesOfThisDateAction, 
        setallNotesDateIdAction, 
        pushNewNotesDateAction, 
        // setDatesAction, 
        // setMonthAction, 
        // setYearAction, 
        // saveChangesAction, 
        // setInitNotesAllStateAction, 
        // setModalAction, 
        // setFilterAction, 
        // setSaveAction, 
        // setPostAction, 
        // setPostsAction, 
        // setAllNotesAction, 
        setVisibleAction
        } from "../toolkitRedux/toolkitSlice";


const ComponentDate = ({children, index}) => {
    const dispatch = useDispatch();
    const allNotes = useSelector(state => state.toolkit.allNotes);
    //  const setAllNotes = (par) => ( 
    //     dispatch(setAllNotesAction(par))
    // );
    const setVisible = (par) => ( 
        dispatch(setVisibleAction(par))
    );
    const year = useSelector(state => state.toolkit.year);
    // const setYear = (par) => ( 
    //     dispatch(setYearAction(par))
    // );
    // const posts = useSelector(state => state.toolkit.posts);
    const month = useSelector(state => state.toolkit.month);
    // const setPosts = (par) => ( 
    //     dispatch(setPostsAction(par))
    // );

    function organize(event) {
        setVisible(true);
        
        let tdArr = Array.from(document.querySelectorAll('td'));
        tdArr.forEach((elem,i,arr) => {
            elem.style.background = "transparent";
        })
        if( event.target.textContent !== ''){
            event.target.style.background = "lightblue";
        } else {
            return 
        }

        let id = event.target.textContent + '.' + month + '.' + year;
        let obj ={};

        // за необхідності створюємо записник за цю дату
        if( allNotes.find(elem=>elem.id==id)==undefined ){
            obj = 
                {
                    id:id,
                    notes:[]
                };
            dispatch( pushNewNotesDateAction(obj) );
        }
        dispatch( setallNotesDateIdAction(id) );
        dispatch( setNotesOfThisDateAction(id) );
        // ...завершення функції organize
    }

    return (
        <td key={index}
            onClick = {organize}
        >
            {children}
        </td> 
    );
};

export default ComponentDate;