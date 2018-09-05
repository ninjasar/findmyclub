import React, { Component } from 'react';
import _ from 'lodash';

import CollectionView from '../components/CollectionView';
import LoadingBubbles from '../components/LoadingBubbles';
import EmptyList from '../components/EmptyList';
import * as UIUtil from '../util/UI';
import Maps from '../util/Maps';

import '../css/containers/DashboardEvents.css';

import Networking from '../util/Networking';

class DashboardEvents extends Component {

	/****************************
    *                           *
    *            INIT           *
    *                           *
    *****************************/

    constructor(props) {
        super(props);
        this.state = {
            // undefined if loading
            // array of events if loading done
            events: undefined,
            eventsToClubs: undefined,
        }
    }

    componentWillMount = () => {
        this.reloadEvents();
    }

	/****************************
    *                           *
    *           RENDER          *
    *                           *
    *****************************/

    renderEvents = () => {
        const eventsToShow = UIUtil.filterEventByKeyword(this.state.events, this.props.searchKeyword);

        if (_.isEmpty(eventsToShow)) {
            return <EmptyList subtitle='You don’t have any upcoming events.' />;
        }
        return (
            <CollectionView className='dashboard-events-event-list'
                orientation={CollectionView.Orientation.vertical}
                edgeInsets={['0px', '0px', '0px', '0px']}
                data={
                    eventsToShow.map((event, index) => {
                        const host = this.state.eventsToClubs[event.id]
                        event.host = host.Name
                        return Maps.mapEventToComponent(event, index, () => this.didSelectEvent(event));
                    })
                } />
        );
    };

    renderLoading = () => {
        return <LoadingBubbles />
    };

    render() {
        return (
            <div className="DashboardEvents dashboard-container">
                <div className='dashboard-events-header'>
                    <h1 className='dashboard-events-title'>Events</h1>
                </div>
                {
                    _.isNil(this.state.events) ? this.renderLoading() : this.renderEvents()
                }
            </div>
        );
    }


	/****************************
    *                           *
    *         FUNCTIONS         *
    *                           *
    *****************************/

    /** What to do when you select an event. */
    didSelectEvent(event) {
        if (this.props.onSelectEvent) {
            this.props.onSelectEvent(event, this.state.eventsToClubs[event.id]);
        }
    }

    reloadEvents = async () => {
        const startDate = new Date(Date.now() - 1000 * 3600 * 24);
        const endDate = new Date(Date.now() + 1000 * 3600 * 24 * 7);
        const followedClubs = await Networking.getFollowedClubs();

        // event id to club objects
        const eventsToClubs = {};
        const allEvents = [];
        await Promise.all(followedClubs.map(async (club) => {
            const events = await Networking.getEventsForClub(club.ID, startDate, endDate);
            events.forEach((event) => {
                eventsToClubs[event.id] = club;
            });
            allEvents.push(...events);
        }));
        allEvents.sort((e1, e2) => new Date(e1.date.starts_at).getTime() - new Date(e2.date.starts_at).getTime());
        this.setState({
            eventsToClubs,
            events: allEvents,
        });
    }




	/****************************
    *                           *
    *           STYLES          *
    *                           *
    *****************************/

}

export default DashboardEvents;
