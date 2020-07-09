import axios from 'axios';

export const ADD_ENTRY = 'ADD_ENTRY';
export const DELETE_ENTRY ='DELETE_ENTRY';
export const REQUEST_USERS= 'REQUEST_USERS';
export const RECEIVE_USERS ='RECEIVE_USERS';
export const FETCH_ENTRIES_SUCCESS='FETCH_ENTRIES_SUCCESS';

const requestUsers = () => ({
    type: REQUEST_USERS
});

export const addResult = (res) =>{
    return{
        type: ADD_ENTRY,
        result: res
    }
}
export const add_entry = (res)=>{
   return dispatch=>{
    dispatch(requestUsers());
     dispatch(addResult(res));
   }
};
export const fetchEntriesSuccess = ( results ) => {
    return {
        type: FETCH_ENTRIES_SUCCESS,
        results: results
    };
};

export const fetchedEntry =()=>{
    return dispatch => {
        axios.get('https://to-do-application-c601d.firebaseio.com/entry.json')
            .then( res => {
                const fetchedEntries = [];
                for ( let key in res.data ) {
                    fetchedEntries.push( {
                        ...res.data[key],
                        id: key
                    } );
                }
                dispatch(fetchEntriesSuccess(fetchedEntries));
            } )
    };
}

export const delete_entry = ( resElId ) => {
    return {
        type: DELETE_ENTRY,
        resultElId: resElId
    };
};
