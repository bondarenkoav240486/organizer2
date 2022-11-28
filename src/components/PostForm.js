
import React from 'react';
import MyButton from './UI/button/MyButton.js';
import MyTextArea from './UI/textArea/MyTextArea.js';
import MyInput from './UI/input/MyInput.js';
import {useDispatch,useSelector} from "react-redux";
import {setallNotesFindIdNotesAction, 
        setModalAction, 
        setSaveAction, 
        setDateNoteAction, 
        setDateNotesAction, 
        setVisibleAction,
        } from "../toolkitRedux/toolkitSlice";

const PostForm = () => {
    const dispatch = useDispatch();
    const allNotes = useSelector(state => state.toolkit.allNotes);
    const dateNotes = useSelector(state => state.toolkit.dateNotes);
     const setDateNotes = (par) => ( 
        dispatch(setDateNotesAction(par))
    );
    const dateNote = useSelector(state => state.toolkit.dateNote);
    const setDateNote = (par) => ( 
        dispatch(setDateNoteAction(par))
    );
    const save = useSelector(state => state.toolkit.save);
    const setSave = (par) => ( 
        dispatch(setSaveAction(par))
    );
    const setModal = (par) => ( 
        dispatch(setModalAction(par))
    );

    const createPost = (newPost) => {
        setDateNotes([...dateNotes, newPost])
        setModal(false)
        setSave(true)
    }

    const saveChanges = () => {
        let id = allNotes[0].dateId ;
        dispatch( setallNotesFindIdNotesAction(id) )
        localStorage.setItem('key2',JSON.stringify(allNotes));
    }

    const addNewPost = (e) => {
        e.preventDefault()
        const newPost = {
            ...dateNote, id: Date.now()
        }
        createPost(newPost)
        saveChanges();
    }

    const editPost = (editedPost) => {
        let i = dateNotes.indexOf( dateNotes.find(p=>p.id==editedPost.id) )
        setDateNotes([...dateNotes.slice(0, i), editedPost, ...dateNotes.slice( i + 1)])
        setSave(true)
    }

    const saveEditedPost = (e) => {
        e.preventDefault()
        const editedPost = {
            ...dateNote
        }
        editPost(editedPost);
        setModal(false)
        saveChanges(); 
    }

    return (
        <div className="PostForm">
            <form>
                <MyInput
                    value={dateNote.title}
                    onChange={e=>setDateNote({ ...dateNote, title: e.target.value})}
                    type='text' 
                    placeholder='заголовок' 
                />
                <MyTextArea type='text' 
                    value={dateNote.body}
                    onChange={e=>setDateNote({ ...dateNote, body: e.target.value})}
                    placeholder='зміст' 
                />
                <MyButton 
                    onClick={save ? addNewPost : saveEditedPost}
                >
                    Зберегти запис
                </MyButton>
            </form>
        </div>
    )
};

export default PostForm;