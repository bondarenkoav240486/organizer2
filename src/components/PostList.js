import React, {useMemo} from 'react';
import PostItem from "./PostItem";
import {TransitionGroup, CSSTransition} from "react-transition-group";
import {useDispatch,useSelector} from "react-redux";
import {setFilterAction, 
        setPostsAction, } from "../toolkitRedux/toolkitSlice";

const PostList = () => {
    const dispatch = useDispatch();
    const dateNotes = useSelector(state => state.toolkit.dateNotes);
    const filter = useSelector(state => state.toolkit.filter);
    const allNotes = useSelector(state => state.toolkit.allNotes);
    
    let dateId = allNotes[0].dateId

    // console.log('dateNotes :', dateNotes)

    //POSTS sortedAndSearched....................................
    const sortedPosts = useMemo(()=>{
        if(filter.sort){
            return  [...dateNotes].sort( (a,b)=>{ 
                return a[filter.sort].localeCompare(b[filter.sort]) 
            }) 
        }
        return dateNotes;
    },[filter.sort,dateNotes])
    const sortedAndSearchedPosts = useMemo(()=>{
        return sortedPosts.filter(post=>post.title.toLowerCase().includes(filter.query.toLowerCase()))
    })

    if (!sortedAndSearchedPosts.length) {

        return (
            <h1 style={{textAlign: 'center'}}>
                {allNotes[0].dateId}
                <br/>
                Записи не знайдені !
            </h1>
        )
    }



    return (
        <div className="postlist">
            <h1 style={{textAlign: 'center'}}>
            </h1>

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