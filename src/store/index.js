import {createStore, combineReducers, applyMiddleware} from "redux";

import {cashReducer} from "./cashReducer";
import {customerReducer} from "./customerReducer";

import thunk from "redux-thunk";



import {composeWithDevTools} from "redux-devtools-extension";




const rootReducer = combineReducers({

	cash: cashReducer,
	customers: customerReducer
})

// export const store = createStore(rootReducer, composeWithDevTools)
export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))
// export const store = createStore(cashReducer)
