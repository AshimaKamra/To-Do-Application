 import * as actionTypes from '../actions/actionTypes';
 import { updateObject } from '../utility';

 const initialState = {
     results:[]
 }

 const deleteResult = ( state, action ) => {
    const updatedArray = state.results.filter( result => result.id !== action.resultElId );
    return updateObject( state, { results: updatedArray } );
};

const newEntrySuccess = (state,action)=>{
    return updateObject(state,
        { results: state.results.concat( {  value: action.result  } ) }
    )
}

const fetchEntrySuccess = (state,action)=>{
    return {...state, 
             results: action.results}
}
const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.ADD_ENTRY :
            return {...state,
                results:[...state.results, action.result]}

       
        case actionTypes.FETCH_ENTRIES_SUCCESS:
             return fetchEntrySuccess(state,action);


        case actionTypes.DELETE_ENTRY:
              console.log(action.resultElId)
              const updatedArray = state.results.filter(results => results.id !== action.resultElId);
            return {
                ...state,
                results: updatedArray
            }
    }
    return state;
};

export default reducer;