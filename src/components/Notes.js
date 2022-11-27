
import React, {useEffect} from 'react';
import PostList from './PostList';
import MyButton from './UI/button/MyButton.js';
import MyInput from './UI/input/MyInput.js';
import MySelect from './UI/select/MySelect.js';
import PostForm from './PostForm';
import PostFilter from './PostFilter.js';
import MyModal from "../components/UI/MyModal/MyModal";
import {TransitionGroup, CSSTransition} from "react-transition-group";
import {useDispatch,useSelector} from "react-redux";
import {
        // setallNotesFindIdNotesAction, 
        // saveChangesAction, 
        setModalAction, 
        // setFilterAction, 
        // setSaveAction, 
        setPostAction, 
        setPostsAction, 
        setAllNotesAction, 
        setVisibleAction} from "../toolkitRedux/toolkitSlice";


const Notes = () => {
    const dispatch = useDispatch();
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
    // const setSave = (par) => ( 
    //     dispatch(setSaveAction(par))
    // );
    const modal = useSelector(state => state.toolkit.modal);
    const setModal = (par) => ( 
        dispatch(setModalAction(par))
    );

    let bufferInitNotesAll 
    // = 
        // [
        //     {
        //         id:'postsFrominitNotesAll',
        //         notes:[
        //             {id:'1IDpostsFrominitNotesAll[0]', title:'1titlepostsFrominitNotesAll', body:'1bodypostsFrominitNotesAll'},
        //             {id:'2IDpostsFrominitNotesAll', title:'2titlepostsFrominitNotesAll', body:'2bodypostsFrominitNotesAll3'},
        //             {id:'3IDpostsFrominitNotesAll', title:'3titlepostsFrominitNotesAll', body:'3bodypostsFrominitNotesAll'},
        //         ],
        //         dateId:'initNotesAll',
        //     },
        //     {
        //         id:'',
        //         notes:[],
        //     },
        // ];
    if (JSON.parse( localStorage.getItem('key2') )===null) {
        // localStorage.setItem('key2',JSON.stringify(initNotesAll));
        localStorage.setItem('key2',JSON.stringify(allNotes[0].notes));
    }
    else{
         // initNotesAll = JSON.parse( localStorage.getItem('key2') );
         bufferInitNotesAll = JSON.parse( localStorage.getItem('key2') );
    }
    useEffect(() => {
        setAllNotes(bufferInitNotesAll)       
    }, []);
    useEffect(() => {
        localStorage.setItem('key2',JSON.stringify(allNotes));
    }, [allNotes]);
    console.log('localStorage :',JSON.parse( localStorage.getItem('key2') ) )

    useEffect(() => {
        setPosts( allNotes[0].notes);
    }, [allNotes[0].notes])
   
    

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
                    onClick={removeAllNotes}
                >
                    видалити всі записи
                </MyButton>
            </div>
        </div>
    );
};

export default Notes ;