import React from 'react';
import MyButton from './UI/button/MyButton.js';
import {useDispatch,useSelector} from "react-redux";
import {setallNotesFindIdNotesAction,
        setModalAction, 
        setSaveAction, 
        setDateNoteAction, 
        setDateNotesAction} from "../toolkitRedux/toolkitSlice";

const NoteItem = (props) => {
    const dispatch = useDispatch();
    const allNotes = useSelector(state => state.toolkit.allNotes);
    const dateNotes = useSelector(state => state.toolkit.dateNotes);
    const setDateNotes = (par) => ( 
        dispatch(setDateNotesAction(par))
    );
    const setSave = (par) => ( 
        dispatch(setSaveAction(par))
    );
    const setModal = (par) => ( 
        dispatch(setModalAction(par))
    );
    const setDateNote = (par) => ( 
        dispatch(setDateNoteAction(par))
    );

    const saveChanges = () => {
        let id = allNotes[0].selectedDate ;
        dispatch( setallNotesFindIdNotesAction(id) )
        localStorage.setItem('key2',JSON.stringify(allNotes));
    }

    const removePost = (post) => {
        setDateNotes(dateNotes.filter(p=>p.id!==props.post.id));
        saveChanges()
    };
    const openPost = (post) => {
        setDateNote(dateNotes.find(p=>p.id==props.post.id))
        setSave(false);
        setModal(true);
    }

    return (
        <div className="post"
        >
            <div className="post__content"
                onClick={() => openPost(props.post)}         
            >
                {props.post.title}
            </div>
            <div className="post__btns">
                
                <MyButton 
                    onClick={
                        () => removePost(props.post)
                    }
                >
                    x
                </MyButton>
            </div>
        </div>
    );
};

export default NoteItem;