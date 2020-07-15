import React,{useState,useEffect} from 'react';
import EntryForm from './EntryForm';
import EntryList from './EntryList';
import { connect } from 'react-redux';
import * as actionTypes from '../store/actions/actionCreators';



const Entry=(props)=>{
   // const [userEntry,setUserEntry]=useState([]);

    useEffect(()=>{
        props.onFetchEntry(props.userEntry);
      },[]);



    return(
        <div className="App">
            <EntryForm onAddEntry={props.onAddEntry} />

            <section>
                {/*The list will be displayed here*/}
                <EntryList entry={props.userEntry} 
                onRemoveItem={props.onDeleteEntry}/>
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
        onFetchEntry: () => dispatch(actionTypes.fetchedEntry()), 
        onAddEntry: (data)=> dispatch(actionTypes.addResult(data)),
        onDeleteEntry: (id)=>dispatch(actionTypes.deleteResult(id))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Entry);