

import React, {useEffect, useState,useRef} from 'react';


const ComponentDate = ({children,index,organize,setShowNotesDate,allNotes,setAllNotes}) => {


  return (
  	<td key={index}
  	onClick = {organize}
  	>
  	{children}
  	</td> 

  	);
  };

export default ComponentDate;