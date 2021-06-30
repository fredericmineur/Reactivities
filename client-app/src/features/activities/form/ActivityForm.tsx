import { observer } from "mobx-react-lite";
import React, { ChangeEvent, useState } from "react";
import { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Button, Form, Segment} from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import { v4 as uuid } from 'uuid';
import { act } from "react-dom/test-utils";



export default observer (function ActivityForm() {

    const {activityStore} = useStore();
    const {createActivity, updateActivity, loading, loadActivity, loadingInitial} = activityStore;

    const {id} = useParams<{id:string}>();

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
   
    useEffect(()=>{
        if (id) loadActivity(id).then(activity => setActivity(activity!))
    }, [id, loadActivity])
    

    

    function handleSubmit() {
        // activity.id ? updateActivity(activity) : createActivity(activity);
        if (activity.id.length===0) {
            const newActivity = {...activity, id: uuid()};
            createActivity(newActivity).then(()=>{
                history.push(`/activities/${newActivity.id}`)
            });
            
        } else {
            updateActivity(activity).then(()=>{
                history.push(`/activities/${activity.id}`)
            });
           
        }
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = event.target;
        setActivity({ ...activity, [name]: value })
    }

    if (loadingInitial) return <LoadingComponent content="Loading activity..." />

    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off'>
                <Form.Input placeholder='Title' value={activity.title} name='title' onChange={handleInputChange} />
                <Form.TextArea placeholder='Description' value={activity.description} name='description' onChange={handleInputChange} />
                <Form.Input placeholder='Category' value={activity.category} name='category' onChange={handleInputChange} />
                <Form.Input placeholder='Date' type="date" value={activity.date} name='date' onChange={handleInputChange} />
                <Form.Input placeholder='City' value={activity.city} name='city' onChange={handleInputChange} />
                <Form.Input placeholder='Venue' value={activity.venue} name='venue' onChange={handleInputChange} />
                <Button floated='right' positive type='submit' content='Submit' loading= {loading} />
                <Button floated='right' type='button' content='Cancel' />
            </Form>
        </Segment>
    )
})