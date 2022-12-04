
import React from 'react';
import MyButton from './components/UI/button/MyButton.js';
import Calendar from './components/Calendar.js';
import InfoToday from './components/InfoToday.js';
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
                <InfoToday/>
                <br/>
                <hr style={{margin: '15px'}}/>

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
                <div className = 'buttons'>
                    <MyButton 
                        onClick={ ()=>setVisible(visible?false:true) }
                        id = 'showNotes'    
                    >
                        {visible ? 
                            'Приховати розклад'
                            :
                            'Показати розклад'
                        }
                    </MyButton>
                </div>
            </div>
        </div>
    );
}

export default App;
