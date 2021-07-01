import { observer } from "mobx-react-lite";
import React from "react";
import { Item,  Segment } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import ActivityListItem from "./dashboard/ActivityListItem";


export default observer (function ActivityList() {

    const {activityStore} = useStore();
    const {activitiesByDate} = activityStore;

    return (
        <Segment>
            <Item.Group divided>
                {activitiesByDate.map(activity =>
                    <ActivityListItem activity={activity} key={activity.id} />
                )}
            </Item.Group>
        </Segment>
    )
})