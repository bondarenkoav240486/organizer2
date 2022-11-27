
import React from 'react';
import MyInput from "./UI/input/MyInput";
import MySelect from "./UI/select/MySelect";
import {setFilterAction} from "../toolkitRedux/toolkitSlice";
import {useDispatch,useSelector} from "react-redux";

const PostFilter = () => {
     const dispatch = useDispatch();

     const filter = useSelector(state => state.toolkit.filter);
     const setFilter = (par) => ( 
          dispatch(setFilterAction(par))
     );

    return (
          <div  className='PostFilter'>
               <MyInput 
                    value={filter.query}
                    onChange={e=>setFilter({...filter,query:e.target.value})}
                    placeholder="пошук..."
               / >
               <MySelect
                    value={filter.sort}
                    onChange={selectedSort=>setFilter({...filter,sort:selectedSort})}
                    defaultValue='сортування'
                    options={
                         [
                              {value:'title',name:'за назвою'},
                              {value:'body',name:'за змістом'},
                         ]
                    }
               />
        </div>
    );
};

export default PostFilter;
