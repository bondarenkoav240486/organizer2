
import React from 'react';

import {useDispatch,useSelector} from "react-redux";
import {
        setNotesOfThisDateAction, 
        setallNotesDateIdAction, 
        pushNewNotesDateAction, 
        setVisibleAction
        } from "../toolkitRedux/toolkitSlice";

const ComponentDate = ({children, index,style}) => {
    const dispatch = useDispatch();
    const allNotes = useSelector(state => state.toolkit.allNotes);
    const setVisible = (par) => ( 
        dispatch(setVisibleAction(par))
    );
    const year = useSelector(state => state.toolkit.year);
    const month = useSelector(state => state.toolkit.month);

    function organize(event) {
        setVisible(true);
        
        let tdArr = Array.from(document.querySelectorAll('td'));
        tdArr.forEach((elem,i,arr) => {
            // elem.style.background = "transparent";
            elem.style.outline = "none";
        })
        if( event.target.textContent !== ''){
            // event.target.style.background = "lightblue";
            event.target.style.outline = "1px solid #0971DD";
        } else {
            return 
        }

        let date = event.target.textContent + '.' + month + '.' + year;
        let obj ={};

        // за необхідності створюємо записник за цю дату
        if( allNotes.find(elem=>elem.date==date)==undefined ){
            obj = 
                {
                    id: Date.now(),
                    date: date,
                    notes:[
                            {id:'111', title:'dateNoteOrganizeComponenetDAte', body:''},
                        ]
                };
            dispatch( pushNewNotesDateAction(obj) );
        }
        dispatch( setallNotesDateIdAction(date) );
        dispatch( setNotesOfThisDateAction(date) );
        // ...завершення функції organize
    }


    return (
        <td key={index}
            onClick = {organize}
            style={style}
        >
            {children}
        </td> 
    );
};

export default ComponentDate;