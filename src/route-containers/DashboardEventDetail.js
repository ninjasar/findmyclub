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
        
        this.refs['event-detail-close-btn'].focus();
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
                        ref='event-detail-close-btn'
                        role='button'
                        aria-label='Close Button: Click to close Event Detail'
                        onClick={() => {
                            if(this.props.onClose) {
                                this.props.onClose();
                            }
                        }}><span className='fa fa-times'/></button>
                <img className='event-detail-background-image' src={thumbnail} alt=''/>

                <button className='pill-button event-detail-calender-btn' onClick={this.handleExportCalendar}
                        role='button' aria-label='Calendar Button: Click to download to calendar'>
                    <span className='fa fa-plus'/>&nbsp;Download iCal
                </button>

                <div className='event-detail-date-area' role='region' aria-live='polite' aria-label={`Date of Event: ${month}, ${day}`}>
                    <p aria-hidden={true} className='event-detail-date-1'>{day}</p>
                    <p aria-hidden={true} className='event-detail-date-2'>{month}</p>
                </div>

                <div className='event-detail-bottom'>
                    <p className='event-detail-title' 
                        role='region'
                        aria-live='polite'
                        aria-label={`Event Title: ${this.props.event.title}`}>{this.props.event.title}</p>
                    <p className='event-detail-host'
                        role='region'
                        aria-live='polite'
                        aria-label={`Event Host: ${this.props.event.category.name}`}>{this.props.event.category.name}</p>

                    <h1 className='event-detail-event-info-label'
                        role='region'
                        aria-live='polite'
                        aria-label='Header: Event Information'>Event Information</h1>
                    <p className='event-date-label'
                        role='region'
                        aria-live='polite'
                        aria-label={`Event Time: ${starts_at} - ${ends_at}`}><span className='far fa-clock'/>&nbsp;&nbsp;{starts_at} - {ends_at}</p>
                    <p className='event-location-label'
                        role='region'
                        aria-live='polite'
                        aria-label={`Event Location: ${this.props.event.location}`}><span className='fas fa-map-marker-alt'/>&nbsp;&nbsp;{this.props.event.location}</p>
                    
                    <h1 className='event-detail-description-label'
                        role='region'
                        aria-live='polite'
                        aria-label='Header: Description'>Description</h1>
                    <p className='event-detail-description'
                        role='region'
                        aria-live='polite'
                        aria-label={`${this.props.event.description}`}>
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
