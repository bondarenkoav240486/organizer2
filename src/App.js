
import React from 'react';
import MyButton from './components/UI/button/MyButton.js';
import Calendar from './components/Calendar.js';
import Notes from './components/Notes.js';
import {useDispatch,useSelector} from "react-redux";
import {setVisibleAction} from "./toolkitRedux/toolkitSlice";
import './styles/App.css';
import './styles/responsive.css';

function App() {
    const dispatch = useDispatch();
    const visible = useSelector(state => state.toolkit.visible);
    const setVisible = (par) => ( 
        dispatch(setVisibleAction(par))
    );
    
    return (
        <div className='App'  >
            <div className='organizer' >
                <div className="calendarWrapper">
                    <Calendar/>
                </div>
                {
                    visible
                    ?
                    <Notes/>
                    :
                    <></>
                }
                <>
                     <MyButton 
                         onClick={ ()=>setVisible(visible?false:true) }
                    >
                        {visible ? 
                            'Приховати розклад'
                            :
                            'Показати розклад'
                        }
                    </MyButton>
                </>
            </div>
        </div>
    );
}

export default App;
