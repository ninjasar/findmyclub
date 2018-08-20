import React, { Component } from 'react';
import Maps from '../util/Maps';
import CollectionView from '../components/CollectionView';
import '../css/containers/DashboardEventDetail.css';

class DashboardEventDetail extends Component {

	/****************************
    *                           *
    *            INIT           *
    *                           *
    *****************************/

    constructor(props) {
        super(props);
        this.state = {
            event: {
                title: 'First Meeting of the Semester',
                host: 'NYU Ballroom and Latin Dance Team',
                date: '11 Sep',
                image: '',
                location: 'Kimmel',
                description: 'ieokiehbjgbkmjnhiskdj'
            }
        }
    }
   

	/****************************
    *                           *
    *           RENDER          *
    *                           *
    *****************************/

	render() {
		return (
			<div className="DashboardEventDetail overlay">
                <button className='event-detail-close-btn'
                        onClick={() => {
                            if(this.props.onClose) {
                                this.props.onClose();
                            }
                        }}><span className='fa fa-times'/></button>
				<img className='event-detail-background-image' src={this.state.event.image} alt='image-preview'/>

                <button className='pill-button event-detail-calender-btn'>
                    <span className='fa fa-plus'/>&nbsp;Add to Calendar
                </button>

                <div className='event-detail-date-area'>
                    <p className='event-detail-date-1'>{this.state.event.date.split(" ")[0]}</p>
                    <p className='event-detail-date-2'>{this.state.event.date.split(" ")[1]}</p>
                </div>

                <p className='event-detail-title'>{this.state.event.title}</p>
                <p className='event-detail-host'>{this.state.event.host}</p>

                <h1 className='event-detail-event-info-label'>Event Information</h1>
                <p className='event-date-label'><span className='far fa-clock'/>&nbsp;&nbsp;{this.state.event.date.split(" ")}</p>
                <p className='event-location-label'><span className='fas fa-map-marker-alt'/>&nbsp;&nbsp;{this.state.event.location}</p>
                
                <h1 className='event-detail-description-label'>Description</h1>
                <p className='event-detail-description'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi auctor tellus at sem ornare fermentum. Maecenas et semper nunc, id accumsan ante. Fusce fringilla mi turpis. Donec nec tellus placerat, convallis leo eu, fringilla enim. Maecenas blandit feugiat mi, at porta augue vestibulum sed. Maecenas consectetur egestas mi, ut ultrices risus viverra nec. Donec fringilla dui non ex maximus, vitae finibus nisi egestas.
                    Fusce ac bibendum augue. In convallis varius diam eu condimentum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae.
                </p>
			</div>
		);
	}


	/****************************
    *                           *
    *         FUNCTIONS         *
    *                           *
    *****************************/





	/****************************
    *                           *
    *           STYLES          *
    *                           *
    *****************************/

}

export default DashboardEventDetail;
