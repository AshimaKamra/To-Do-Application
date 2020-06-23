import React from 'react';
import './EntryList.css';
const EntryList = props =>{
    return(
        <section className="entry-list">
            <h2>Loaded List</h2>

            <ul>
                <li>
                    <span style={{fontWeight:'bolder'}}>Name</span>
                    <span style={{fontWeight:'bolder'}}>Job Title</span>
                </li>
                {props.entry.map(li=>(
                    <li key={li.id} onClick={props.onRemoveItem.bind(this,li.id)}>
                        <span>{li.name}</span>
                        <span>{li.job}</span>
                    </li>
                ))}
            </ul>
        </section>
    )
}

export default EntryList;