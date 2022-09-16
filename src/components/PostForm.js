
// IMPORTS.........................................................................
import React, {useEffect, useState,useRef} from 'react';
import MyButton from './UI/button/MyButton.js';
import MyTextArea from './UI/textArea/MyTextArea.js';
import MyInput from './UI/input/MyInput.js';


// COMPONENT.............................................................................
const PostForm = ({create,editPost,save,post,setPost,setModal,allNotes,setAllNotes,initNotesAll,posts}) => {

// 

const saveChanges = () => {

   let id = allNotes[0].dateId ;
   allNotes.find(elem=>elem.id==id).notes = posts;
   setAllNotes([...allNotes ]);
   initNotesAll = allNotes;
   localStorage.setItem('key2',JSON.stringify(allNotes));
   let initNotesAllCopy = JSON.parse( localStorage.getItem('key2') );
 }


  const addNewPost = (e) => {
    e.preventDefault()
    const newPost = {
            ...post, id: Date.now()
        }
        create(newPost)
    saveChanges();
  }
  
// 
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
            onClick={ save ? addNewPost : saveEditedPost
            }
          >
          Зберегти запис
          </MyButton>

        </form>
    </div>


    );
};

export default PostForm;