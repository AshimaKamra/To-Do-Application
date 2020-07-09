import React,{useState,useEffect} from 'react';
import EntryForm from './EntryForm';
import EntryList from './EntryList';
import { connect } from 'react-redux';
import * as actionTypes from '../store/actions/actionTypes';


const Entry=(props)=>{
    const [userEntry,setUserEntry]=useState([]);

    const requestUserAction = () =>{
       
            fetch('https://to-do-application-c601d.firebaseio.com/entry.json',{
            method:'GET'})
        .then(response=>response.json())
        .then(responseData=>{
            const loadedEntry=[];
            for(const key in responseData)
            {
                loadedEntry.push({
                    id:key,
                    name:responseData[key].name,
                    job:responseData[key].job
                });
            }
            console.log(loadedEntry);
            //setUserEntry(loadedEntry);
            props.onFetchEntry(loadedEntry);

         })
    };

    const addEntryHandler=entry=>{
        fetch('https://to-do-application-c601d.firebaseio.com/entry.json',{
        method:'POST',
        body: JSON.stringify(entry),
        headers:{'Content-type':'application/json'}
    }).then(response=>{
        return response.json();
    }).then(responseData=>{
        // setUserEntry(prevEntry=>[
        // ...prevEntry,{id:responseData.name,...entry}])
        props.onAddEntry({id:responseData.name,...entry})
    });
    }
    
    useEffect(()=>{
        requestUserAction();
       // props.onFetchEntry();
      },[]);

      useEffect(()=>{
        console.log("userEntry",props.userEntry)
      },[props.userEntry]);

    const deleteEntryHandler=entryId=>{
        fetch(`https://to-do-application-c601d.firebaseio.com/entry/${entryId}.json`,{
        method:'DELETE',
    }).then(response=>{
        // setUserEntry(prevEntry=>
        //     prevEntry.filter(entry=>entry.id!==entryId)
        //     );
        props.onDeleteEntry(entryId)
    })
    };
    return(
        <div className="App">
            <EntryForm onAddEntry={addEntryHandler}/>

            <section>
                {/*The list will be displayed here*/}
                <EntryList entry={props.userEntry} 
                onRemoveItem={deleteEntryHandler}/>
            </section>
        </div>
    )
}

const mapStateToProps = (state) =>{
    return {
        userEntry: state.results
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        onFetchEntry: (data) => dispatch(actionTypes.fetchEntriesSuccess(data)), 
        onAddEntry: (data)=> dispatch(actionTypes.addResult(data)),
        onDeleteEntry: (id)=>dispatch(actionTypes.delete_entry(id))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Entry);