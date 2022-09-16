import React from 'react';
import classes from './MyTextArea.module.css';

const MyTextArea = React.forwardRef((props, ref) => {
    return (
        <textarea rows="10"
             ref={ref} className={classes.myTextArea} {...props}/>
    );
});

export default MyTextArea;