import React, { useState } from 'react';
import './EntryForm.css';
import { Formik, Form, useFormik } from 'formik';
import * as Yup from 'yup';


const validationSchema=Yup.object({
    name:Yup.string()
        .required("Name Required")
        .max(20,"Too Long"),

      job: Yup.string()
           .required("Job Required")
           .max(20,"Too Long")  
      
});


const EntryForm = (props) =>
{

    const { values,touched,errors,isSubmitting,handleChange,handleBlur,handleSubmit} = useFormik({
    initialValues:{
        name:"",
        job:""
    },
    validationSchema,
    onSubmit(values){
        console.log(values)
        props.onAddEntry({name:values.name,job:values.job})

    }
})
   return (
   
        <section className="entry-form">
        <form onSubmit={handleSubmit}>
            <div className="form-control">
                <label htmlFor="title">Name</label>
                <input type="text" 
                id="title"
                name="name"
                value={values.name}
                onBlur={handleBlur}
                className={errors.name && touched.name && "error" }
                onChange={handleChange}
                
                />
                {errors.name && touched.name && (
                    <div className="input-feedback">{errors.name}</div>
                )}
            </div> 
            <div className="form-control">
                <label htmlFor="job-profile">Job profile</label>
                <input type="text" 
                id="job-profile"
                name="job"
                value={values.job}
                onBlur={handleBlur}
               
                className={errors.job && touched.job && "error"}
                onChange={handleChange}
                />
                 {errors.job && touched.job && (
                    <div className="input-feedback">{errors.job}</div>
                )}
            </div>
        <div className="entry-form_actions">
            <button type="submit" id="submit-button" >Add Information</button>
        </div>
        </form>
</section>
    );
}
//}



    
export default EntryForm;