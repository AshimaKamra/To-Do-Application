import React,{useState} from 'react';
import EntryForm from './EntryForm';
import EntryList from './EntryList';


const Entry=()=>{
    const [userEntry,setUserEntry]=useState([]);
    const addEntryHandler=entry=>{
        setUserEntry(prevEntry=>[...prevEntry,{id:Math.random(),...entry}])
    }
  
    const removeEntryHandler=entryId=>{
      setUserEntry(prevEntry=>
        prevEntry.filter(entry=>entry.id!==entryId)
        );
    };
    return(
        <div className="App">
            <EntryForm onAddEntry={addEntryHandler}/>

            <section>
                {/*The list will be displayed here*/}
                <EntryList entry={userEntry} 
                onRemoveItem={removeEntryHandler}/>
            </section>
        </div>
    )
}
export default Entry;