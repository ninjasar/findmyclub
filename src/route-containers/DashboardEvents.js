import React, { Component } from 'react';
import CollectionView from '../components/CollectionView';
import Maps from '../util/Maps';

import '../css/containers/DashboardEvents.css';

class DashboardEvents extends Component {

	/****************************
    *                           *
    *            INIT           *
    *                           *
    *****************************/

    constructor(props) {
        super(props);
        this.state = {
            events: [{
                title: 'First Meeting',
                date: '11 Sep',
                host: 'NYU Ballroom and Latin Dance Team',
                location: 'Kimmel'
            },{
                title: 'First Meeting',
                date: '11 Sep',
                host: 'NYU Ballroom and Latin Dance Team',
                location: 'Kimmel'
            },{
                title: 'First Meeting',
                date: '11 Sep',
                host: 'NYU Ballroom and Latin Dance Team',
                location: 'Kimmel'
            },{
                title: 'First Meeting',
                date: '11 Sep',
                host: 'NYU Ballroom and Latin Dance Team',
                location: 'Kimmel'
            },{
                title: 'First Meeting',
                date: '11 Sep',
                host: 'NYU Ballroom and Latin Dance Team',
                location: 'Kimmel'
            }]
        }
    }


	/****************************
    *                           *
    *           RENDER          *
    *                           *
    *****************************/

	render() {
		return (
			<div className="DashboardEvents dashboard-container">
				<div className='dashboard-events-header'>
                    <h1 className='dashboard-events-title'>Events</h1>
                </div>

                <CollectionView className='dashboard-events-event-list'
                                orientation={CollectionView.Orientation.vertical}
                                edgeInsets={['20px','0px','0px','0px']}
                                data={
                                    this.state.events.map((val, index) => {
                                        return Maps.mapEventToComponent(val, index, this.didSelectEvent.bind(this));
                                    })
                                }/>
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
        if(this.props.onSelectEvent) {
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
