
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
import {setallNotesFindIdNotesAction, 
        saveChangesAction, 
        setInitNotesAllStateAction, 
        setModalAction, 
        setFilterAction, 
        setSaveAction, 
        setPostAction, 
        setPostsAction, 
        setAllNotesAction, 
        setVisibleAction, 
        increment, } from "../toolkitRedux/toolkitSlice";


const Notes = () => {
    const dispatch = useDispatch();
    // const initNotesAllState = useSelector(state => state.toolkit.initNotesAllState);
    // const setInitNotesAllState = (par) => ( 
    //     dispatch(setInitNotesAllStateAction(par))
    // )
    const visible = useSelector(state => state.toolkit.visible);
    const setVisible = (par) => ( 
        dispatch(setVisibleAction(par))
    );
    const allNotes = useSelector(state => state.toolkit.allNotes);
    const setAllNotes = (par) => ( 
        dispatch(setAllNotesAction(par))
    );
    const posts = useSelector(state => state.toolkit.posts);
    const setPosts = (par) => ( 
        dispatch(setPostsAction(par))
    );

    const post = useSelector(state => state.toolkit.post);
    const setPost = (par) => ( 
        dispatch(setPostAction(par))
    );
    const save = useSelector(state => state.toolkit.save);
    const setSave = (par) => ( 
        dispatch(setSaveAction(par))
    );
    // const filter = useSelector(state => state.toolkit.filter);
    // const setFilter = (par) => ( 
    //     dispatch(setFilterAction(par))
    // );
    const modal = useSelector(state => state.toolkit.modal);
    const setModal = (par) => ( 
        dispatch(setModalAction(par))
    );

    let initNotesAll = 
    [
        {
            id:'postsFrominitNotesAll',
            notes:[
                {id:'1IDpostsFrominitNotesAll[0]', title:'1titlepostsFrominitNotesAll', body:'1bodypostsFrominitNotesAll'},
                {id:'2IDpostsFrominitNotesAll', title:'2titlepostsFrominitNotesAll', body:'2bodypostsFrominitNotesAll3'},
                {id:'3IDpostsFrominitNotesAll', title:'3titlepostsFrominitNotesAll', body:'3bodypostsFrominitNotesAll'},
            ],
            dateId:'initNotesAll',
        },
        {
            id:'',
            notes:[],
        },
    ];
    if (JSON.parse( localStorage.getItem('key2') )===null) {
        localStorage.setItem('key2',JSON.stringify(initNotesAll));
    }
    else{
         initNotesAll = JSON.parse( localStorage.getItem('key2') );
    }

    useEffect(() => {
        setAllNotes(initNotesAll)
    }, [])
    useEffect(() => {
        setPosts( allNotes[0].notes);
    }, [allNotes[0].notes])

    // //POSTS sortedAndSearched....................................
    // const sortedPosts = useMemo(()=>{
    //     if(filter.sort){
    //         return  [...posts].sort( (a,b)=>{ 
    //             return a[filter.sort].localeCompare(b[filter.sort]) 
    //         }) 
    //     }
    //     return posts;
    // },[filter.sort,posts])
    // const sortedAndSearchedPosts = useMemo(()=>{
    //     return sortedPosts.filter(post=>post.title.toLowerCase().includes(filter.query.toLowerCase()))
    // })

    const saveChanges = (par) => {
        let id = allNotes[0].dateId ;
        // dispatch(saveChangesAction(par));
        dispatch( setallNotesFindIdNotesAction(id) )
        localStorage.setItem('key2',JSON.stringify(allNotes));
        let initNotesAllCopy = JSON.parse(localStorage.getItem('key2') );
    }
    useEffect(() => {
        localStorage.setItem('key2',JSON.stringify(allNotes));
    }, [allNotes])

    //delete all notes (from localStorage) 
    const removeAllNotes = () => {
        localStorage.clear();
        setPosts(allNotes[0].notes);                  
    }

    return (
        <div className = "posts">
            <MyButton 
                onClick={()=>{
                        setModal(true);
                        setPost({title:'!@2',body:'!!!22'});
                    }
                }   
                style={{marginTop:'30px'}}
            >
                Сворити запис
            </MyButton>

            <PostForm/>
            <hr style={{margin: '15px'}}/>

            <PostFilter/>

            <PostList/>

            <div className="buttons">    
                <MyButton 
                    onClick={ ()=>saveChanges(posts) }
                >
                    зберегти зміни за цю дату
                </MyButton>
                <MyButton 
                    onClick={ ()=>setVisible(false) }
                >
                    сховати записи
                </MyButton>
                <MyButton 
                    onClick={removeAllNotes}
                >
                    видалити всі записи
                </MyButton>
            </div>
        </div>
    );
};

export default Notes ;