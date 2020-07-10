import * as actionTypes from './actionTypes';
import axios from 'axios';

export const fetchEntriesSuccess = ( results ) => {
   return {
       type: actionTypes.FETCH_ENTRIES_SUCCESS,
       results: results
   };
};
export const fetchEntriesFail = ( error ) => {
   return {
       type: actionTypes.FETCH_ENTRIES_FAIL,
       error: error
   };
};

export const fetchEntriesStart = () => {
   return {
       type: actionTypes.FETCH_ENTRIES_START
   };
};

export const fetchedEntry =()=>{
   return dispatch => {
      dispatch(fetchEntriesStart());
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
           .catch(err=>{
              dispatch(fetchEntriesFail(err));
           })
   };
}

export const add_entry = (res) =>{
   return{
       type: actionTypes.ADD_ENTRY,
       result: res
   }
}
export const addResult = (res)=>{
return dispatch =>{
   fetch('https://to-do-application-c601d.firebaseio.com/entry.json',{
        method:'POST',
        body: JSON.stringify(res),
        headers:{'Content-type':'application/json'}
    }).then(response=>{
        return response.json();
    }).then(responseData=>{
        //props.onAddEntry({id:responseData.name,...entry})
        dispatch(add_entry(res))
    });
}
};

export const delete_entry = ( resElId ) => {
   return {
       type: actionTypes.DELETE_ENTRY,
       resultElId: resElId
   };
};

export const deleteResult = (resElId) =>{
   return dispatch=>{
      fetch(`https://to-do-application-c601d.firebaseio.com/entry/${resElId}.json`,{
        method:'DELETE',
    }).then(response=>{
        //props.onDeleteEntry(entryId)
        dispatch(delete_entry(resElId));
    })
   }
}

