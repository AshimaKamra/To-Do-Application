 import * as actionTypes from '../actions/actionTypes';


 const initialState = {
     results:[],
     validation:{
         required:true
     },
     valid:false
 }

 const deleteResult = ( state, action ) => {
    const updatedArray = state.results.filter(results => results.id !== action.resultElId);
    return {
        ...state,
        results: updatedArray
    }
};

const newEntrySuccess = (state,action)=>{
    return {...state,
        results:[...state.results, action.result]}
}

const fetchEntrySuccess = (state,action)=>{
    return {...state, 
             results: action.results}
}


const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.ADD_ENTRY :
            return newEntrySuccess(state,action)

       
        case actionTypes.FETCH_ENTRIES_SUCCESS:
             return fetchEntrySuccess(state,action);


        case actionTypes.DELETE_ENTRY:
             return deleteResult(state,action)

    }

    return state;
};

export default reducer;
