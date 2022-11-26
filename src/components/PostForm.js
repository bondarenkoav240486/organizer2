
// IMPORTS.........................................................................
import React, {useEffect, useState,useRef} from 'react';
import MyButton from './UI/button/MyButton.js';
import MyTextArea from './UI/textArea/MyTextArea.js';
import MyInput from './UI/input/MyInput.js';

import {useDispatch,useSelector} from "react-redux";
import {setallNotesFindIdNotesAction, setInitNotesAllStateAction, setModalAction, setFilterAction, setSaveAction, setPostAction, setPostsAction, setAllNotesAction, setVisibleAction, increment, } from "../toolkitRedux/toolkitSlice";

// COMPONENT.............................................................................
const PostForm = ({initNotesAll}) => {

// 

  const dispatch = useDispatch();
// .................................................
  const initNotesAllState = useSelector(state => state.toolkit.initNotesAllState);
  const setInitNotesAllState = (par) => ( 
      dispatch(setInitNotesAllStateAction(par))
      )
  const visible = useSelector(state => state.toolkit.visible);
  const setVisible = (par) => ( 
    dispatch(setVisibleAction(par))
    );
// const [allNotes, setAllNotes] = useState(initNotesAll);
  const allNotes = useSelector(state => state.toolkit.allNotes);
  const setAllNotes = (par) => ( 
    dispatch(setAllNotesAction(par))
    );
// const [posts, setPosts] = useState(allNotes[0].notes);
  const posts = useSelector(state => state.toolkit.posts);
  const setPosts = (par) => ( 
    dispatch(setPostsAction(par))
    );

// .......................................
// const [post, setPost] = useState({title:'',body:''});
  const post = useSelector(state => state.toolkit.post);
  const setPost = (par) => ( 
    dispatch(setPostAction(par))
    );
// const [save, setSave] = useState(true);
  const save = useSelector(state => state.toolkit.save);
  const setSave = (par) => ( 
    dispatch(setSaveAction(par))
    );
// const [filter, setFilter] = useState({sort:'', query:''});
  const filter = useSelector(state => state.toolkit.filter);
  const setFilter = (par) => ( 
    dispatch(setFilterAction(par))
    );
// const [modal, setModal] = useState(false);
  const modal = useSelector(state => state.toolkit.modal);
  const setModal = (par) => ( 
    dispatch(setModalAction(par))
    );


// POSTS CREATE..............................................
  const createPost = (newPost) => {
   setPosts([...posts, newPost])
   setModal(false)
   setSave(true)
   // console.log(save)......................................
}




const saveChanges = () => {

 let id = allNotes[0].dateId ;
 // allNotes.find(elem=>elem.id==id).notes = posts;
 dispatch( setallNotesFindIdNotesAction(id) )
 // setAllNotes([...allNotes ]);
 initNotesAll = allNotes;
 localStorage.setItem('key2',JSON.stringify(allNotes));
 let initNotesAllCopy = JSON.parse( localStorage.getItem('key2') );
}


const addNewPost = (e) => {
    e.preventDefault()
    const newPost = {
        ...post, id: Date.now()
    }
    createPost(newPost)
    saveChanges();
}

// editPost..........................................................
const editPost = (editedPost) => {
  let i = posts.indexOf( posts.find(p=>p.id==editedPost.id) )
  setPosts([...posts.slice(0, i), editedPost, ...posts.slice( i + 1)])
  setSave(true)
  console.log(save)
}

// saveEditedPost..........................................................
const saveEditedPost = (e) => {
    e.preventDefault()
    const editedPost = {
        ...post
    }
    editPost(editedPost);
    setModal(false)
    saveChanges(); 
}

return (
    <div className="PostForm">
        <form>
            <MyInput
                value={post.title}
                onChange={e=>setPost({ ...post, title: e.target.value})}
                type='text' 
                placeholder='заголовок' 
            />
            <MyTextArea type='text' 
                value={post.body}
                onChange={e=>setPost({ ...post, body: e.target.value})}
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