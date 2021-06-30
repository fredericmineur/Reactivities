import React from 'react';
import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import ActivityDashBoard from '../../features/activities/ActivityDashBoard';
import { observer } from 'mobx-react-lite';
import HomePage from '../../features/home/HomePage';
import { Route } from 'react-router-dom';
import ActivityForm from '../../features/activities/form/ActivityForm';



function App() {

  return (
    <>
      <NavBar />
      <Container style={{ marginTop: "7em" }}>
        <Route exact path='/' component={HomePage} />
        <Route exact path='/activities' component={ActivityDashBoard} />
        <Route path='/createActivity' component={ActivityForm} />
      </Container>
    </>
  );
}

export default observer(App) ;
