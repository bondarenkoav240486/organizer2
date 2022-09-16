
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


// COMPONENT.......................................................................
const Notes = ({posts,setPosts,allNotes,setAllNotes,initNotesAll,setVisible}) => {

const [post, setPost] = useState({title:'',body:''});
const [save, setSave] = useState(true);
const [filter, setFilter] = useState({sort:'', query:''});
const [modal, setModal] = useState(false);


// POSTS CREATE..............................................
const createPost = (newPost) => {
 setPosts([...posts, newPost])
 setModal(false)
 setSave(true)
 
   // console.log(save)......................................
 }

// POSTS edit................................................
const editPost = (editedPost) => {
  let i = posts.indexOf( posts.find(p=>p.id==editedPost.id) )
  setPosts([...posts.slice(0, i), editedPost, ...posts.slice( i + 1)])
  setSave(true)
  console.log(save)
}

// POSTS REMOVE..............................................
const removePost = (post) => {
  setPosts(posts.filter(p=>p.id!==post.id))
}

//POSTS open.................................................
const openPost = (post) => {
  setPost(posts.find(p=>p.id==post.id))
  setSave(false);
  setModal(true);
}

//POSTS sorte................................................
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

// saving changes for this date
const saveChanges = () => {

   let id = allNotes[0].dateId ;
   allNotes.find(elem=>elem.id==id).notes = posts;
   // let copyNotesForDate = allNotes.find(elem=>elem.id==id).notes;


   setAllNotes([...allNotes ]);
   // console.log(initNotesAll)
   initNotesAll = allNotes;
   // console.log(initNotesAll)

   localStorage.setItem('key2',JSON.stringify(allNotes));
   let initNotesAllCopy = JSON.parse( localStorage.getItem('key2') );
   // console.log(initNotesAllCopy)

 }

//delete all notes (from localStorage) 
 const removeAllNotes = () => {
    localStorage.clear();
   setPosts(allNotes[0].notes);                  
}



// return
 return (
  <div className = "posts">


  <MyButton 
     onClick={()=>{
       setModal(true);
        setPost({title:'',body:''});
        // console.log({...post, title:'', body:''})
      }
     }   
  style={{marginTop:'30px'}}
  >
  Сворити запис
  </MyButton>


  <MyModal 
  visible={modal}
  setVisible={setModal}
  >

  <PostForm  
  create={createPost} 
  editPost={editPost}
  save={save}
  post={post}
  setPost={setPost}
  setModal = {setModal}
  allNotes={allNotes}
  setAllNotes={setAllNotes}
  initNotesAll={initNotesAll}
  posts={posts}
  />
  
  </MyModal >


  <hr style={{margin: '15px'}}/>

  <div >

  <PostFilter
  filter={filter}
  setFilter={setFilter}
  />

  </div>

  <PostList
  posts={sortedAndSearchedPosts}
  title={'posts of JS'}
  remove={removePost}
  open={openPost}
  setPost = {setPost}

  />

  <div className="buttons">    
  <MyButton 
  onClick={saveChanges }
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