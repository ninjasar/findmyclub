import _ from 'lodash';
import React, { Component } from 'react';
import CollectionView from '../components/CollectionView';
import '../css/containers/DashboardEvents.css';
import Maps from '../util/Maps';
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
        }
    }

    componentWillMount = () => {
        this.reloadEvents();
    }

    reloadEvents = async () => {
        // const startDate = new Date(Date.now() - 1000 * 3600 * 24);
        // const endDate = new Date(Date.now() + 1000 * 3600 * 24 * 7);
        // const followedClubs = await Networking.getFollowedClubs();
        // const allEvents = await Promise.all(followedClubs.map((club) => Networking.getEventsForClub(club.ID, startDate, endDate)));
        // const events = _.reduce(allEvents, (events) => events) || [];
        // events.sort((e1, e2) => new Date(e1.date.starts_at).getTime() - new Date(e2.date.starts_at).getTime());
        const events = [
            { title: 'Test Evet', location: 'Test location' },
            { title: 'Test Evet', location: 'Test location' },
            { title: 'Test Evet', location: 'Test location' },
            { title: 'Test Evet', location: 'Test location' },
        ]
        this.setState({
            events,
        });
    }

	/****************************
    *                           *
    *           RENDER          *
    *                           *
    *****************************/

    renderEvents = () => {
        return (
            <CollectionView className='dashboard-events-event-list'
                orientation={CollectionView.Orientation.vertical}
                edgeInsets={['20px', '0px', '0px', '0px']}
                data={
                    this.state.events.map((val, index) => {
                        return Maps.mapEventToComponent(val, index, this.didSelectEvent.bind(this));
                    })
                } />
        );
    };

    renderLoading = () => {
        return 'Loading Events';
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
    didSelectEvent(_, __, ___, index) {
        if (this.props.onSelectEvent) {
            const items = this.state.events;
            const item = items[index];
            this.props.onSelectEvent(item);
        }
    }






	/****************************
    *                           *
    *           STYLES          *
    *                           *
    *****************************/

}

export default DashboardEvents;
