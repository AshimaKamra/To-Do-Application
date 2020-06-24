import React,{useState,useEffect} from 'react';
import EntryForm from './EntryForm';
import EntryList from './EntryList';


const Entry=()=>{
    const [userEntry,setUserEntry]=useState([]);

    useEffect(()=>{
        fetch('https://to-do-application-c601d.firebaseio.com/entry.json')
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
            setUserEntry(loadedEntry);
        })
    },[]);

    const addEntryHandler=entry=>{
        fetch('https://to-do-application-c601d.firebaseio.com/entry.json',{
        method:'POST',
        body: JSON.stringify(entry),
        headers:{'Content-type':'application/json'}
    }).then(response=>{
        return response.json();
    }).then(responseData=>{
        setUserEntry(prevEntry=>[
        ...prevEntry,{id:responseData.name,...entry}])
    });
    }
  
    const removeEntryHandler=entryId=>{
        fetch(`https://to-do-application-c601d.firebaseio.com/entry/${entryId}.json`,{
        method:'DELETE',
    }).then(response=>{
        setUserEntry(prevEntry=>
            prevEntry.filter(entry=>entry.id!==entryId)
            );
    })
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