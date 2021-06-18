import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Header, List } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashBoard from '../../features/activities/ActivityDashBoard';

function App() {

  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);

  useEffect(() => {
    axios.get<Activity[]>('http://localhost:5000/api/activities')
      .then(res => {
        console.log(res);
        setActivities(res.data);
      })
  }, [])

  function handleSelectActivity (id: string) {
    setSelectedActivity(activities.find(x => x.id===id));
  }

  function handleCancelSelectActivity () {
    setSelectedActivity(undefined);
  }

  return (
    <>
      <NavBar />
      <Container style={{marginTop: "7em"}}>
        <ActivityDashBoard 
        activities={activities} 
        selectedActivity = {selectedActivity}
        selectActivity = {handleSelectActivity}
        cancelSelectActivity = {handleCancelSelectActivity} />
      </Container>
    </>
  );
}

export default App;
