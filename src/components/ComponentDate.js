import React from 'react';

import {useDispatch,useSelector} from "react-redux";
import {
        setNotesOfThisDateAction, 
        setallNotesDateIdAction, 
        pushNewNotesDateAction, 
        setVisibleAction
        } from "../toolkitRedux/toolkitSlice";

const ComponentDate = ({children, index}) => {
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
                    notes:[
                            {id:'111', title:'dateNoteOrganizeComponenetDAte', body:''},
                        ]
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