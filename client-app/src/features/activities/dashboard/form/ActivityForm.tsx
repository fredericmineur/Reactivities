import { observer } from "mobx-react-lite";
import React, { ChangeEvent, useState } from "react";
import { useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { Button, FormField, Segment, Label } from "semantic-ui-react";
import LoadingComponent from "../../../../app/layout/LoadingComponent";
import { useStore } from "../../../../app/stores/store";
import { v4 as uuid } from 'uuid';
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from 'yup';
import MytextInput from "../../../../app/common/form/MyTextInput";
import MyTextArea from "../../../../app/common/form/MyTextArea";
import MySelectInput from "../../../../app/common/form/MySelectInput";
import { categoryOptions } from "../../../../app/common/options/options";




export default observer(function ActivityForm() {

    const { activityStore } = useStore();
    const { createActivity, updateActivity, loading, loadActivity, loadingInitial } = activityStore;

    const { id } = useParams<{ id: string }>();

    const history = useHistory();

    const [activity, setActivity] = useState({
        id: '',
        title: '',
        date: '',
        description: '',
        category: '',
        city: '',
        venue: ''
    });

    const validationSchema = Yup.object({
        title: Yup.string().required('The activity title is required'),
        description: Yup.string().required('The activity description is required'),
        date: Yup.string().required(),
        category: Yup.string().required(),
        city: Yup.string().required(),
        venue: Yup.string().required()
    })

    useEffect(() => {
        if (id) loadActivity(id).then(activity => setActivity(activity!))
    }, [id, loadActivity])




    // function handleSubmit() {
    //     // activity.id ? updateActivity(activity) : createActivity(activity);
    //     if (activity.id.length===0) {
    //         const newActivity = {...activity, id: uuid()};
    //         createActivity(newActivity).then(()=>{
    //             history.push(`/activities/${newActivity.id}`)
    //         });

    //     } else {
    //         updateActivity(activity).then(()=>{
    //             history.push(`/activities/${activity.id}`)
    //         });

    //     }
    // }

    // function handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    //     const { name, value } = event.target;
    //     setActivity({ ...activity, [name]: value })
    // }

    if (loadingInitial) return <LoadingComponent content="Loading activity..." />

    return (
        <Segment clearing>
            <Formik 
            validationSchema={validationSchema}
            enableReinitialize 
            initialValues={activity} 
            onSubmit={(values) => console.log(values)} >
                {({ values: activity, handleChange, handleSubmit }) => (
    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
        <MytextInput name='title' placeholder='Title' />
        <MyTextArea placeholder='Description' rows={3} name='description' />
        <MySelectInput placeholder='Category' name='category' options={categoryOptions} />
        <MytextInput placeholder='Date' name='date' />
        <MytextInput placeholder='City' name='city' />
        <MytextInput placeholder='Venue' name='venue' />
        <Button floated='right' positive type='submit' content='Submit' loading={loading} />
        <Button as={Link} to='/activities' floated='right' type='button' content='Cancel' />
                    </Form>
                )}
            </Formik>

        </Segment>
    )
})