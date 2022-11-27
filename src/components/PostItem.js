import React from 'react';
import MyButton from './UI/button/MyButton.js';
import {useDispatch,useSelector} from "react-redux";
import {setModalAction, 
        setSaveAction, 
        setPostAction, 
        setPostsAction} from "../toolkitRedux/toolkitSlice";

const PostItem = (props) => {
    const dispatch = useDispatch();
    const posts = useSelector(state => state.toolkit.posts);
    const setPosts = (par) => ( 
        dispatch(setPostsAction(par))
    );
    const save = useSelector(state => state.toolkit.save);
    const setSave = (par) => ( 
        dispatch(setSaveAction(par))
    );
    const modal = useSelector(state => state.toolkit.modal);
    const setModal = (par) => ( 
        dispatch(setModalAction(par))
    );
    const post = useSelector(state => state.toolkit.post);
    const setPost = (par) => ( 
        dispatch(setPostAction(par))
    );

    const removePost = (post) => {
        setPosts(posts.filter(p=>p.id!==props.post.id))
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
                    видалити
                </MyButton>
            </div>
        </div>
    );
};

export default PostItem;