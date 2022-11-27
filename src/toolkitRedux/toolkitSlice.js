import {createSlice} from '@reduxjs/toolkit'


const toolkitSlice = createSlice({

	name: "toolkit",
	initialState: {
		visible: true,
		allNotes:  
			[
				{
				id:'postsFromallNotes0',
				notes:[
   					{id:'1', title:'STATEpostsFromallNotes0', body:''},
   					{id:'11', title:'STATEpostsFromallNotes0', body:''},
   					{id:'111', title:'STATEpostsFromallNotes0', body:''},
					],
				dateId:'Init!',
				},
				{
					id:'',
					notes:[{id:'postsFromallNotes0', title:'postsFromallNotes0', body:'postsFromallNotes0'},],
				},
			],
		posts:[],
		post:{title:'!1',body:'!1'},
		save:true,
		filter:{sort:'', query:''},
		modal:false,
		year:new Date().getFullYear(),
		month:new Date().getMonth(),
		dates:[],
	},
	reducers: {
		increment(state,action) {
			state.count = state.count + 1
		},
		setInitNotesAllStateAction(state,action) {
			state.count = state.count + 1
		},
		setVisibleAction(state,action) {
			state.visible =  action.payload
		},
		setAllNotesAction(state,action) {
			state.allNotes = action.payload
		},
		setPostsAction(state,action) {
			state.posts =  action.payload
		},
		// ююююююююююююююююююююююююююююююююююю
		setPostAction(state,action) {
			state.post =  action.payload
		},
		setSaveAction(state,action) {
			state.save =  action.payload
		},
		setFilterAction(state,action) {
			state.filter =  action.payload
		},
		setModalAction(state,action) {
			state.modal =  action.payload
		},
		saveChangesAction(state,action) {
			state.allNotes[0].notes =  action.payload
		},
		// ..................................................
		setYearAction(state,action) {
			state.year =  action.payload
		},
		setMonthAction(state,action) {
			state.month =  action.payload
		},
		setDatesAction(state,action) {
			state.dates =  action.payload
		},
		// юююююююююююююююююююююююююююююююююююююююююююююююююююююю
		pushNewNotesDateAction(state,action) {
			state.allNotes.push(action.payload)
		},
		setallNotesDateIdAction(state,action) {
			state.allNotes[0].dateId = state.allNotes.find(elem=>elem.id==action.payload).id
			// state.allNotes[0].dateId = action.payload
		},
		setNotesOfThisDateAction(state,action) {
			// state.posts =   [...allNotes.find(elem=>elem.id==id).notes]  		
			state.posts =   state.allNotes.find(elem=>elem.id==action.payload).notes  
		},
		setallNotesFindIdNotesAction(state,action) {
			// state.posts =   [...allNotes.find(elem=>elem.id==id).notes]  		
			state.allNotes.find(elem=>elem.id==action.payload).notes = state.posts;
        	// localStorage.setItem('key2',JSON.stringify(state.allNotes));
		},
	}	
})

export default toolkitSlice.reducer

export const {	setallNotesFindIdNotesAction,
				setNotesOfThisDateAction, 
				setallNotesDateIdAction, 
				pushNewNotesDateAction, 
				setDatesAction, 
				setMonthAction, 
				setYearAction, 
				saveChangesAction, 
				setInitNotesAllStateAction, 
				setModalAction, 
				setFilterAction, 
				setSaveAction, 
				setPostAction, 
				setPostsAction, 
				setAllNotesAction, 
				setVisibleAction, 
				increment} = toolkitSlice.actions