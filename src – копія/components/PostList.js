
// IMPORTS
import React from 'react';
import PostItem from "./PostItem";
import {TransitionGroup, CSSTransition} from "react-transition-group";


// COMPONENT
const PostList = ({posts,title,remove,open,cross,setPost}) => {

    if (!posts.length) {
        return (
            <h1 style={{textAlign: 'center'}}>
                Записи не знайдені !
            </h1>
        )
    }

    return (

    <div className="postlist">

 <TransitionGroup >

    {posts.map((post, index) =>

        <CSSTransition
         key={post.id}
              timeout={500}
              classNames="post"
            >
       
        <PostItem 
        remove={remove}
        open={open}
         key={post.id}
          remove={remove} 
          number={index + 1} 
          post={post} 
          setPost={setPost}
          />

          </CSSTransition>

     )}
     
 </TransitionGroup >

    </div>

        );
    };

export default PostList ;