
import React, {useEffect} from 'react';
import PostList from './PostList';
import MyButton from './UI/button/MyButton.js';
import PostForm from './PostForm';
import PostFilter from './PostFilter.js';
import {TransitionGroup, CSSTransition} from "react-transition-group";
import {useDispatch,useSelector} from "react-redux";
import {setModalAction, 
        setDateNoteAction, 
        setDateNotesAction, 
        setAllNotesAction, 
        setVisibleAction} from "../toolkitRedux/toolkitSlice";

const Notes = () => {
    const dispatch = useDispatch();
    const allNotes = useSelector(state => state.toolkit.allNotes);
    const setAllNotes = (par) => ( 
        dispatch(setAllNotesAction(par))
    );
    // const setPosts = (par) => ( 
    //     dispatch(setPostsAction(par))
    // );
    const setDateNotes = (par) => ( 
        dispatch(setDateNotesAction(par))
    );
    const setDateNote = (par) => ( 
        dispatch(setDateNoteAction(par))
    );
    const setModal = (par) => ( 
        dispatch(setModalAction(par))
    );

    let bufferInitAllNotes;
   
    if (JSON.parse( localStorage.getItem('key2') )===null) {
        // localStorage.setItem('key2',JSON.stringify(allNotes[0].notes));
        localStorage.setItem('key2',JSON.stringify(allNotes));
    }
    else{
         bufferInitAllNotes= JSON.parse( localStorage.getItem('key2') );
    }
    
    useEffect(() => {
        setAllNotes(bufferInitAllNotes)       
    }, []);
    useEffect(() => {
        localStorage.setItem('key2',JSON.stringify(allNotes));
    }, [allNotes]);

    useEffect(() => {
        setDateNotes( allNotes[0].notes);
    }, [allNotes[0].notes])
   
    //delete all notes (from localStorage) 
    const removeAllNotes = () => {
        localStorage.clear();
        setDateNotes(allNotes[0].notes);                  
    }

    return (
        <div className = "posts">
            <MyButton 
                onClick={()=>{
                        setModal(true);
                        setDateNote({title:'!@2',body:'!!!22'});
                    }
                }   
                style={{marginTop:'30px'}}
            >
                Сворити запис
            </MyButton>

            <PostForm/>
            <hr style={{margin: '15px'}}/>

            <PostFilter/>

            <PostList/>

            <div className="buttons">    
                
               
                <MyButton 
                    onClick={removeAllNotes}
                >
                    видалити всі записи
                </MyButton>
            </div>
        </div>
    );
};

export default Notes ;