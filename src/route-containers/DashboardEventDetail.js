import React, { Component } from 'react';
import '../css/containers/DashboardEventDetail.css';
import dateformat from 'dateformat';
import * as UIUtil from '../util/UI';
import ReactGA from 'react-ga';

class DashboardEventDetail extends Component {

	/****************************
    *                           *
    *            INIT           *
    *                           *
    *****************************/   
    componentDidMount = () => {
        try { ReactGA.pageview(`/event/${this.props.event.id}`); }
        catch (err) { }
    }

	/****************************
    *                           *
    *           RENDER          *
    *                           *
    *****************************/

    renderLoading = () => {
        return (
            <div>loading</div>
        );
    }

	render() {
        const month = dateformat(this.props.event.date.starts_at, 'mmm')
        const day = dateformat(this.props.event.date.starts_at, 'dd');
        const starts_at = dateformat(this.props.event.date.starts_at, 'hh:MM TT');
        const ends_at = dateformat(this.props.event.date.ends_at, 'hh:MM TT');
        const thumbnail = UIUtil.getEventThumbnail(this.props.event);
        if (!this.props.event) {
            return this.renderLoading();
        }

		return (
			<div className="DashboardEventDetail overlay">
                <button className='event-detail-close-btn'
                        onClick={() => {
                            if(this.props.onClose) {
                                this.props.onClose();
                            }
                        }}><span className='fa fa-times'/></button>
                <img className='event-detail-background-image' src={thumbnail} alt='preview'/>

                <button className='pill-button event-detail-calender-btn' onClick={this.handleExportCalendar}>
                    <span className='fa fa-plus'/>&nbsp;Download iCal
                </button>

                <div className='event-detail-date-area'>
                    <p className='event-detail-date-1'>{day}</p>
                    <p className='event-detail-date-2'>{month}</p>
                </div>

                <div className='event-detail-bottom'>

                    <p className='event-detail-title'>{this.props.event.title}</p>
                    <p className='event-detail-host'>{this.props.event.category.name}</p>

                    <h1 className='event-detail-event-info-label'>Event Information</h1>
                    <p className='event-date-label'><span className='far fa-clock'/>&nbsp;&nbsp;{starts_at} - {ends_at}</p>
                    <p className='event-location-label'><span className='fas fa-map-marker-alt'/>&nbsp;&nbsp;{this.props.event.location}</p>
                    
                    <h1 className='event-detail-description-label'>Description</h1>
                    <p className='event-detail-description'>
                        {this.props.event.description}
                    </p>
                </div>
			</div>
		);
	}


	/****************************
    *                           *
    *         FUNCTIONS         *
    *                           *
    *****************************/

    handleExportCalendar = () => {
        this.props.event && UIUtil.exportEventToICal(this.props.event);
    }



	/****************************
    *                           *
    *           STYLES          *
    *                           *
    *****************************/

}

export default DashboardEventDetail;
