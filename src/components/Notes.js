
import React, {useEffect} from 'react';
import PostList from './PostList';
import MyButton from './UI/button/MyButton.js';
import MyModal from "../components/UI/MyModal/MyModal";
import PostForm from './PostForm';
import PostFilter from './PostFilter.js';
import {TransitionGroup, CSSTransition} from "react-transition-group";
import {useDispatch,useSelector} from "react-redux";
import {setModalAction, 
        setDateNoteAction, 
        setDateNotesAction, 
        setAllNotesAction, 
        setVisibleAction,
        setNotesOfThisDateAction, 
        setallNotesDateIdAction, 
        pushNewNotesDateAction, 
        initSelectedDateAction,
    } from "../toolkitRedux/toolkitSlice";

const Notes = () => {
    const dispatch = useDispatch();
    const allNotes = useSelector(state => state.toolkit.allNotes);
    const setAllNotes = (par) => ( 
        dispatch(setAllNotesAction(par))
    );
    // const setModal = (par) => ( 
    //     dispatch(setModalAction(par))
    // );
    const setDateNotes = (par) => ( 
        dispatch(setDateNotesAction(par))
    );
    const setDateNote = (par) => ( 
        dispatch(setDateNoteAction(par))
    );
    const modal = useSelector(state => state.toolkit.modal);
    const setModal = (par) => ( 
        dispatch(setModalAction(par))
    );
    const setNotesOfThisDate =  (par) => ( 
        dispatch(setNotesOfThisDateAction(par))
    );

    const setVisible = (par) => ( 
        dispatch(setVisibleAction(par))
    );
     const initSelectedDate = (par) => ( 
        dispatch(initSelectedDateAction(par))
    );
    const year = useSelector(state => state.toolkit.year);
    const month = useSelector(state => state.toolkit.month);



    let bufferInitAllNotes;
   
    if (JSON.parse( localStorage.getItem('key2') )===null) {
        localStorage.setItem('key2',JSON.stringify(allNotes));
    }
    else{
        bufferInitAllNotes= JSON.parse( localStorage.getItem('key2') );
    }
    
    useEffect(() => {
        setAllNotes(bufferInitAllNotes);
        initSelectedDate(todayDate);
    }, []);
    useEffect(() => {
        localStorage.setItem('key2',JSON.stringify(allNotes));
    }, [allNotes]);
    
    let todayDate = 
                    new Date().getDate()
                    + '.' 
                    + new Date().getMonth()
                    + '.' 
                    + new Date().getFullYear();

    useEffect(() => {
        if(
            allNotes.find(
                elem => elem.date === todayDate
            ) === undefined 
        )
        {
            setDateNotes(allNotes[0].notes);

        } else {        
            setDateNotes(
                allNotes.find(
                        elem => elem.date === todayDate
                ).notes
            );
        }
    }, [allNotes[0].notes]);

    //delete all notes (from localStorage) 
    const removeAllNotes = () => {
        localStorage.clear();
        setDateNotes(allNotes[0].notes);                  
    }

    const getTodayDayOfWeek = (numberOfDay) => {
        let  daysOfWeek = 
            [
                'Неділя','Понеділок','Вівторок','Середа', 
                'Четвер',"П'ятниця",'Субота',
            ];

        return daysOfWeek[numberOfDay]
    }

    function getTodayMonth(numberOfMonth){
        let  monthes = 
            [
                'січня','лютого','березня','квітня', 
                'травня','червня','липня','серпня',
                'вересня','жовтня','листопада','грудня'
            ];

        return monthes[numberOfMonth]
    }

    const getDecoratedSelectedDate = () => {
        let objectDateOfSelectedDate = new Date(
            allNotes[0].selectedDate.split('.')[2],
            allNotes[0].selectedDate.split('.')[1],
            allNotes[0].selectedDate.split('.')[0]
        )
        console.log( allNotes[0].selectedDate )
         return getTodayDayOfWeek(
                    objectDateOfSelectedDate.getDay()
                )
                + ' ' 
                + objectDateOfSelectedDate.getDate()
                + ' '
                + getTodayMonth( 
                    objectDateOfSelectedDate.getMonth()
                )
                + ' '
                + objectDateOfSelectedDate.getFullYear()
                + ' p.'

    }
    //   useEffect(() => {
        getDecoratedSelectedDate()
    // }, []);

    return (
        <div className = "posts">
            <hr style={{margin: '15px'}}/>
            <br/>
            {allNotes[0].selectedDate === todayDate
                ?
                'Сьогодні'
                :
                getDecoratedSelectedDate()
            }
            <br/>
            <MyButton
                id = "createNoteOrEvent" 
                onClick={()=>{
                        setModal(true);
                        setDateNote({title:'!@2',body:'!!!22'});
                    }
                }   
                style={{marginTop:'30px'}}
            >
                Додайте подію або нагадування
            </MyButton>
            
            <MyModal 
                visible={modal}
                setVisible={setModal}
            >
                <PostForm/>
            </MyModal>

            <PostFilter/>

            <PostList/>

            <div className="buttons">    
                <MyButton 
                    id = 'removeAllNotes'
                    onClick={removeAllNotes}
                >
                    видалити всі записи
                </MyButton>
            </div>
        </div>
    );
};

export default Notes ;