
import React, {useMemo, useEffect, useState,useRef} from 'react';
import PostList from './components/PostList';
import MyButton from './components/UI/button/MyButton.js';
import MyInput from './components/UI/input/MyInput.js';
import MySelect from './components/UI/select/MySelect.js';
import PostForm from './components/PostForm';
import PostFilter from './components/PostFilter.js';
import CalendarDate from './components/ComponentDate.js';
import Calendar from './components/Calendar.js';
import Notes from './components/Notes.js';
import {useDispatch,useSelector} from "react-redux";
import {setInitNotesAllStateAction, setPostsAction, setAllNotesAction, setVisibleAction, increment, } from "./toolkitRedux/toolkitSlice";
import './styles/App.css';
import './styles/responsive.css';


function App() {
    const dispatch = useDispatch();
    const cash = useSelector(state => state.toolkit.count);
    const addCash = (cash) => ( 
        dispatch(increment(cash))
    );
    // const initNotesAllState = useSelector(state => state.toolkit.initNotesAllState);
    // const setInitNotesAllState = (par) => ( 
    //     dispatch(setInitNotesAllStateAction(par))
    // )
    const visible = useSelector(state => state.toolkit.visible);
    const setVisible = (par) => ( 
        dispatch(setVisibleAction(par))
    );
    // const allNotes = useSelector(state => state.toolkit.allNotes);
    // const setAllNotes = (par) => ( 
    //     dispatch(setAllNotesAction(par))
    // );
    // const posts = useSelector(state => state.toolkit.posts);
    // const setPosts = (par) => ( 
    //     dispatch(setPostsAction(par))
    // );

    // let initNotesAll = 
    // [
    //     {
    //         id:'postsFrominitNotesAll',
    //         notes:[
    //             {id:'1IDpostsFrominitNotesAll[0]', title:'1titlepostsFrominitNotesAll', body:'1bodypostsFrominitNotesAll'},
    //             {id:'2IDpostsFrominitNotesAll', title:'2titlepostsFrominitNotesAll', body:'2bodypostsFrominitNotesAll3'},
    //             {id:'3IDpostsFrominitNotesAll', title:'3titlepostsFrominitNotesAll', body:'3bodypostsFrominitNotesAll'},
    //         ],
    //         dateId:'initNotesAll',
    //     },
    //     {
    //         id:'',
    //         notes:[],
    //     },
    // ];
    // if (JSON.parse( localStorage.getItem('key2') )===null) {
    //     localStorage.setItem('key2',JSON.stringify(initNotesAll));
    // }
    // else{
    //      initNotesAll = JSON.parse( localStorage.getItem('key2') );
    // }

    useEffect(() => {
        // setAllNotes(initNotesAll)
        addCash(cash+1)
    }, [])
    // useEffect(() => {
    //     setPosts( allNotes[0].notes);
    // }, [allNotes[0].notes])

    return (
        <div className='App'  >
            <div className='organizer' >
                <div className="calendarWrapper">
                    <Calendar/>
                </div>
                <>
                    {cash}<br/>
                    <button onClick={()=>addCash()}>add money</button>
                    <button onClick={()=>setVisible(visible?false:true)}>visible</button>
                </>
                {
                    visible
                    ?
                    <>
                        <Notes  
                        />
                    </>
                    :
                    <></>
                }
            </div>
        </div>
    );
}

export default App;
