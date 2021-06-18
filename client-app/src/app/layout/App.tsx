import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Header, List } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashBoard from '../../features/activities/ActivityDashBoard';

function App() {

  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    axios.get<Activity[]>('http://localhost:5000/api/activities')
      .then(res => {
        console.log(res);
        setActivities(res.data);
      })
  }, [])

  return (
    <>
      <NavBar />
      <Container style={{marginTop: "7em"}}>
        <ActivityDashBoard activities={activities} />
      </Container>

    </>
  );
}

export default App;
