import React from 'react';
import MyButton from './UI/button/MyButton.js';
import {useDispatch,useSelector} from "react-redux";
import {
        // setAllNotesAction, 
        setallNotesFindIdNotesAction,
        setModalAction, 
        setSaveAction, 
        setPostAction, 
        setPostsAction} from "../toolkitRedux/toolkitSlice";

const PostItem = (props) => {
    const dispatch = useDispatch();
    const allNotes = useSelector(state => state.toolkit.allNotes);
    // const setAllNotes = (par) => ( 
    //     dispatch(setAllNotesAction(par))
    // );
    const posts = useSelector(state => state.toolkit.posts);
    const setPosts = (par) => ( 
        dispatch(setPostsAction(par))
    );
    // const save = useSelector(state => state.toolkit.save);
    const setSave = (par) => ( 
        dispatch(setSaveAction(par))
    );
    // const modal = useSelector(state => state.toolkit.modal);
    const setModal = (par) => ( 
        dispatch(setModalAction(par))
    );
    // const post = useSelector(state => state.toolkit.post);
    const setPost = (par) => ( 
        dispatch(setPostAction(par))
    );

    const saveChanges = () => {
        let id = allNotes[0].dateId ;
        dispatch( setallNotesFindIdNotesAction(id) )
        // props.initNotesAll = allNotes;
        localStorage.setItem('key2',JSON.stringify(allNotes));
        // let initNotesAllCopy = JSON.parse( localStorage.getItem('key2') );
    }

    const removePost = (post) => {
        setPosts(posts.filter(p=>p.id!==props.post.id));
        saveChanges()
    };
    const openPost = (post) => {
        setPost(posts.find(p=>p.id==props.post.id))
        setSave(false);
        setModal(true);
    }

    return (
        <div className="post">
            <div className="post__content">
                <strong>{props.post.title}</strong>
            </div>
            <div className="post__btns">
                <MyButton onClick={() => openPost(props.post)}>
                    відкрити
                </MyButton>
                <MyButton onClick={() => removePost(props.post)}>
                    x
                </MyButton>
            </div>
        </div>
    );
};

export default PostItem;