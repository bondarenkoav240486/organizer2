
// IMPORTS....................................................................................................
import React, {useMemo, useEffect, useState,useRef} from 'react';
// IMPORTS...............................................................................
import PostList from './components/PostList';
import MyButton from './components/UI/button/MyButton.js';
import MyInput from './components/UI/input/MyInput.js';
import MySelect from './components/UI/select/MySelect.js';
import PostForm from './components/PostForm';
import PostFilter from './components/PostFilter.js';
import ComponentDate from './components/ComponentDate.js';
import Calendar from './components/Calendar.js';
import Notes from './components/Notes.js';

import './styles/App.css';
import './styles/responsive.css';

// ...............................................................................
function App() {


   const [visible, setVisible] = useState(false);

   let initNotesAll = [
   {
      id:'',
      notes:[
   // {id:'1', title:'1', body:''},
   // {id:'11', title:'1', body:''},
   // {id:'111', title:'1', body:''},
   ],
   dateId:'',
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

const [allNotes, setAllNotes] = useState(initNotesAll);

const [posts, setPosts] = useState(
   allNotes[0].notes
   );




return (

   <div className='App' >

   <div className='organizer' >

   <div className="calendarWrapper">
   <Calendar
   allNotes={allNotes}
   setAllNotes={setAllNotes}
   setVisible={setVisible}
   setPosts={setPosts}
   />
   </div>

   {
      visible
      ?
      <Notes  
      posts={posts}
      setPosts={setPosts}
      allNotes={allNotes}
      setAllNotes={setAllNotes}
      initNotesAll={initNotesAll}
      setVisible={setVisible}

      />
      :
      <></>
   }

   </div>

   </div>

   );
}

export default App;
