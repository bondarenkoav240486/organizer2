import {createAction,createReducer} from  "@reduxjs/toolkit"


const initialState = {
	count:0,
	customers:[
			{
        		name:"vitaly",
        		id: Date.now(),
      		}
      	],
}

export const increment = createAction("INCREMENT");
export const decrement = createAction("DECREMENT");



export default createReducer(initialState, {

	[increment]:function(state,action){
		console.log(action)
		state.count = state.count + action.payload
	},

	[decrement]:function(state,action){
		state.count = state.count - action.payload
	},
} )

// console.log(dencrement)