import React, { useState } from 'react';
import './EntryForm.css';

const EntryForm = React.memo(props =>{

    const [enteredName,setEnteredName]=useState('');
    const [enteredJob,setEnteredJob]=useState('');


    const submitHandler = event =>{
        event.preventDefault();
        //calling the function
        props.onAddEntry({name:enteredName,job:enteredJob})
        
    };

    return (
        <section className="entry-form">
            
                <form onSubmit={submitHandler}>
                    <div className="form-control">
                        <label htmlFor="title">Name</label>
                        <input type="text" id="title"
                        value={enteredName}
                        onChange={event=>{
                            setEnteredName(event.target.value);
                        }}/>
                    </div>
                    <div className="form-control">
                        <label htmlFor="job-profile">Job profile</label>
                        <input type="text" id="job-profile"
                        value={enteredJob}
                        onChange={event=>{
                            setEnteredJob(event.target.value);
                        }}/>
                    </div>
                <div className="entry-form_actions">
                    <button type="submit" id="submit-button">Add Information</button>
                </div>
                </form>
        </section>
    )
})

export default EntryForm;