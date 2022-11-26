
// IMPORTS.....................................................................
import React, {useMemo, useEffect, useState,useRef} from 'react';
import PostList from './PostList';
import MyButton from './UI/button/MyButton.js';
import MyInput from './UI/input/MyInput.js';
import MySelect from './UI/select/MySelect.js';
import PostForm from './PostForm';
import PostFilter from './PostFilter.js';
import MyModal from "../components/UI/MyModal/MyModal";
import {TransitionGroup, CSSTransition} from "react-transition-group";

import {useDispatch,useSelector} from "react-redux";
import {saveChangesAction, setInitNotesAllStateAction, setModalAction, setFilterAction, setSaveAction, setPostAction, setPostsAction, setAllNotesAction, setVisibleAction, increment, } from "../toolkitRedux/toolkitSlice";


// COMPONENT.......................................................................
const Notes = ({initNotesAll}) => {
  // console.log(initNotesAll)


  const dispatch = useDispatch();
// .................................................
  const initNotesAllState = useSelector(state => state.toolkit.initNotesAllState);
 const setInitNotesAllState = (par) => ( 
  dispatch(setInitNotesAllStateAction(par))
  )
  // console.log(initNotesAllState)


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
  // console.log('pjsts:',posts)


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


// // POSTS CREATE..............................................
// const createPost = (newPost) => {
//  setPosts([...posts, newPost])
//  setModal(false)
//  setSave(true)
 
//    // console.log(save)......................................
//  }

// POSTS edit................................................
// const editPost = (editedPost) => {
//   let i = posts.indexOf( posts.find(p=>p.id==editedPost.id) )
//   setPosts([...posts.slice(0, i), editedPost, ...posts.slice( i + 1)])
//   setSave(true)
//   console.log(save)
// }

// POSTS REMOVE..............................................
// const removePost = (post) => {
//   setPosts(posts.filter(p=>p.id!==post.id))
// }

//POSTS open.................................................
// const openPost = (post) => {
//   setPost(posts.find(p=>p.id==post.id))
//   setSave(false);
//   setModal(true);
// }


//POSTS sorte................................................
// console.log('posts:',posts)


const sortedPosts = useMemo(()=>{
 if(filter.sort){
  return  [...posts].sort( (a,b)=>{ 
   return a[filter.sort].localeCompare(b[filter.sort]) 
 }) 
}
return posts;
},[filter.sort,posts])

//POSTS sortedAndSearched....................................
const sortedAndSearchedPosts = useMemo(()=>{
  return sortedPosts.filter(post=>post.title.toLowerCase().includes(filter.query.toLowerCase()))
})

// console.log('sortedPosts :',posts)
// console.log('sortedAndSearchedPosts :',sortedAndSearchedPosts)
// saving changes for this date
// const saveChanges = () => {

   // let id = allNotes[0].dateId ;
//    // allNotes.find(elem=>elem.id==id).notes = posts;
//    // setAllNotes()

//    // allNotes[0].notes = posts;
//    // let allNotesCopy = [...allNotes];
//    // allNotesCopy[0].notes = posts;
//    // let copyNotesForDate = allNotes.find(elem=>elem.id==id).notes;

//    // setAllNotes([...allNotes ]);
//    setAllNotes([...allNotesCopy]);
//    // console.log(initNotesAll)
//    setInitNotesAllState(allNotes);
//    // console.log(initNotesAll)

//    localStorage.setItem('key2',JSON.stringify(allNotes));
//    let initNotesAllCopy = JSON.parse( localStorage.getItem('key2') );
//    // console.log(initNotesAllCopy)
//  }

const saveChanges = (par) => {
   let id = allNotes[0].dateId ;
   dispatch(saveChangesAction(par))
   // setInitNotesAllState(allNotes);
   localStorage.setItem('key2',JSON.stringify(allNotes));
   let initNotesAllCopy = JSON.parse(localStorage.getItem('key2') );
   console.log('allNotes',allNotes)
   console.log('initNotesAllCopy',initNotesAllCopy)
}

//delete all notes (from localStorage) 
 const removeAllNotes = () => {
    localStorage.clear();
   setPosts(allNotes[0].notes);                  
}

// console.log(allNotes)

// return
 return (
  <div className = "posts">


  <MyButton 
     onClick={()=>{
       setModal(true);
        setPost({title:'!@2',body:'!!!22'});
        // console.log({...post, title:'', body:''})
      }
     }   
  style={{marginTop:'30px'}}
  >
  Сворити запис
  </MyButton>




  <PostForm  
  save={save}
  post={post}
  setPost={setPost}
  setModal = {setModal}
  allNotes={allNotes}
  setAllNotes={setAllNotes}
  posts={posts}
  />
  


  <hr style={{margin: '15px'}}/>

  <div >

  <PostFilter
  filter={filter}
  setFilter={setFilter}
  />

  </div>

  <PostList
  sortedAndSearchedPosts={sortedAndSearchedPosts}
  setPost = {setPost}

  />

  <div className="buttons">    
  <MyButton 
  // onClick={saveChanges }
  onClick={()=>saveChanges(posts) }
  >
  зберегти зміни за цю дату
  </MyButton>


  <MyButton 
  onClick={()=>setVisible(false) }
  >
  сховати записи
  </MyButton>


  <MyButton 
    onClick={removeAllNotes}>
    видалити всі записи
  </MyButton>


  </div>

  </div>


  );
};

export default Notes ;