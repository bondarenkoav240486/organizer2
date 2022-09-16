

import React from 'react';
import MyButton from './UI/button/MyButton.js';


const PostItem = (props) => {



    return (
    <div className="post">
            <div className="post__content">
                <strong>{props.post.title}</strong>
                
            </div>
            <div className="post__btns">
                <MyButton onClick={() => props.open(props.post)}>
                    відкрити
                </MyButton>
                <MyButton onClick={() => props.remove(props.post)}>
                    видалити
                </MyButton>
              
               
            </div>
    </div>

    );
};

export default PostItem;