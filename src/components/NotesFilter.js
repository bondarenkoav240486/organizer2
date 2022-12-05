
import React from 'react';
import MyInput from "./UI/input/MyInput";
import MySelect from "./UI/select/MySelect";
import {setFilterAction} from "../toolkitRedux/toolkitSlice";
import {useDispatch,useSelector} from "react-redux";

const NotesFilter = () => {
     const dispatch = useDispatch();
     const filter = useSelector(state => state.toolkit.filter);
     const setFilter = (par) => ( 
          dispatch(setFilterAction(par))
     );

    return (
          <div  className='notesFilter'>
               <MyInput 
                    value={filter.query}
                    onChange={e=>setFilter({...filter,query:e.target.value})}
                    placeholder="Пошук..."
               / >
               <MySelect
                    value={filter.sort}
                    onChange={selectedSort=>setFilter({...filter,sort:selectedSort})}
                    defaultValue='Cортування'
                    options={
                         [
                              {value:'title',name:'За назвою'},
                              {value:'body',name:'За змістом'},
                         ]
                    }
               />
        </div>
    );
};

export default NotesFilter;
