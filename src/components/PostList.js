
// IMPORTS
// import React from 'react';
import React, {useMemo, useEffect, useState,useRef} from 'react';

import PostItem from "./PostItem";
import {TransitionGroup, CSSTransition} from "react-transition-group";

import {useDispatch,useSelector} from "react-redux";
import {saveChangesAction, setInitNotesAllStateAction, setModalAction, setFilterAction, setSaveAction, setPostAction, setPostsAction, setAllNotesAction, setVisibleAction, increment, } from "../toolkitRedux/toolkitSlice";


// COMPONENT
const PostList = ({sortedAndSearchedPosts, open, setPost}) => {

    const allNotes = useSelector(state => state.toolkit.allNotes);
let dateId = allNotes[0].dateId

   

    if (!sortedAndSearchedPosts.length) {
        return (
            <h1 style={{textAlign: 'center'}}>
                Записи не знайдені !
            </h1>
        )
    }

    return (


        <div className="postlist">
            {allNotes[0].dateId}

            <TransitionGroup >
                {sortedAndSearchedPosts.map((post, index) =>
                    <CSSTransition
                         key={post.id}
                         timeout={500}
                         classNames="post"
                     >
                        <PostItem 
                           key={post.id}
                          number={index + 1} 
                          post={post} 
                        />
                    </CSSTransition>
                )}
            </TransitionGroup >
         </div>
    );
};

export default PostList ;