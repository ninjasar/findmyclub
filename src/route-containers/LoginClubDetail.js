import React, { Component } from 'react';
import _ from 'lodash';
import Maps from '../util/Maps';
import Networking from '../util/Networking';
import * as UIUtil from '../util/UI';
import CollectionView from '../components/CollectionView';
import '../css/containers/LoginClubDetail.css';
import * as InterestsAndCategories from '../util/InterestsAndCategories';
import EmptyList from '../components/EmptyList';
import ReactGA from 'react-ga';

const maxEvents = 2;

class LoginClubDetail extends Component {
    
	/****************************
    *                           *
    *            INIT           *
    *                           *
    *****************************/
    
    constructor(props) {
        super(props);
        
        this.state = {
            upcomingEvents: [],
            category: undefined,
            clubDetail: undefined,
            maxEvents,
            followed: false,

            clubWebsite: undefined,
            clubFacebook: undefined,
            clubInstagram: undefined,
            clubMeetings: undefined,
            clubContact: undefined,
            clubContactEmail: undefined,
        }
    }
    
    reloadCategory = async () => {
        const category = await InterestsAndCategories.getCategoryFromID(this.props.club.CategoryID);
        this.setState({ category });
    }
    
    reloadEvents = async () => {
        const events = await Networking.getEventsForClub(this.props.club.ID, new Date(Date.now() - 3600 * 1000 * 24 * 1), new Date(Date.now() + 3600 * 1000 * 24 * 7));
        this.setState({
            upcomingEvents: events,
        });
    }
    
    reloadClubDetail = async () => {
        const clubDetail = await Networking.getClubInformation(this.props.club.ID);
        this.setState({
            clubDetail,
        });
    }
    
    reloadFollowedClubs = async () => {
        const followedClubs = await Networking.getFollowedClubs();
        const followingClubIDs = _.map(followedClubs || [], 'ID');
        const followed = _.includes(followingClubIDs, this.props.club.ID);
        this.setState({
            followed,
        });
    }
    
    async componentDidMount() {
        try { ReactGA.pageview(`/club/${this.props.club.ID}`); }
        catch (err) { }

        await this.reloadCategory();
        await this.reloadEvents();
        await this.reloadClubDetail();
        await this.reloadFollowedClubs();
        
        if(this.state.clubDetail) {
            const portalInfo = this.state.clubDetail.profile_responses;
            
            const website = this.state.clubDetail.website_url;
            const facebook = portalInfo.find((item) => { return item.element.name === 'Facebook' });
            const insta = portalInfo.find((item) => { return item.element.type === 'Instagram' });
            const meetings = portalInfo.find((item) => { return item.element.name === 'Meetings' });
            const address = portalInfo.find((item) => { return item.element.name === 'Address' });
            const contact = portalInfo.find((item) => { return item.element.name === 'Advisor Name' });
            const email = portalInfo.find((item) => { return item.element.name === 'Advisor Email' });
            this.setState({
                clubWebsite: (website),
                clubFacebook: (facebook && facebook.data),
                clubInstagram: (insta),
                clubMeetings: ((meetings && address) && (meetings.data && address.data) && meetings.data + "\n" + address.data),
                clubContact: (contact && contact.data && contact.data.name),
                clubContactEmail: (email && email.data),
            }, () => {
                if(this.state.clubWebsite) { this.setState({ clubWebsite: this.state.clubWebsite.substring(0, 50) }) };
            });
        }

        this.refs['club-detail-close-btn'].focus();
    }
    
	/****************************
    *                           *
    *           RENDER          *
    *                           *
    *****************************/
    
	render() {
        const headerImageSrc = UIUtil.getClubHeaderGraphic(this.state.clubDetail);
        const links = this.state.clubDetail && this.state.clubDetail.links;
        const interestName = this.state.category && this.state.category.interest;
        const interestColor = this.state.category && this.state.category.interestColor;
		return (
			<div className="LoginClubDetail overlay">
                
                <div className="login-club-detail-top">
                    <img aria-hidden={true} className='club-detail-background-image' src={headerImageSrc} alt='preview'/>
                    <button 
                        tabIndex={0}
                        ref='club-detail-close-btn'
                        className='club-detail-close-btn'
                        role='button'
                        aria-live='polite'
                        aria-label='Close Club Detail Button'
                        onClick={() => {
                            if(this.props.onClose) {
                                this.props.onClose();
                            }
                        }}><span aria-hidden={true} className='fa fa-times'/>
                    </button>
                </div>
                
                <div className="login-club-detail-middle">

                    <div className="login-club-detail-buttons">
                        <button className='pill-button club-detail-follow-btn' 
                                onClick={this.handleFollowClub}
                                role='button'
                                aria-live='polite'
                                aria-label={`Follow the club ${this.state.clubDetail && this.state.clubDetail.Name}`}
                                style={{
                                    color: this.state.followed ? 'white' : '#330d51',
                                    backgroundColor: this.state.followed ? '#330d51' : 'white'
                                }}>
                            <span aria-hidden={true} className={this.state.followed ? 'fa fa-check' : 'fa fa-plus'} />&nbsp;{this.state.followed ? 'Followed' : 'Follow'}
                        </button>
                    </div>

                    <h1 className='club-detail-title'>{this.props.club.Name}</h1>
                    {
                        (this.state.category) &&
                        <p className='club-detail-information club-detail-information-interest'
                            role='region'
                            aria-live='polite'
                            aria-label={`Interest: ${interestName}`}>
                            <span tabIndex={0} aria-hidden={true}>Interest</span>
                            {interestName}
                            <div className='club-detail-interest-dot' style={{ backgroundColor: interestColor }}>&nbsp;</div>
                        </p>
                    }
                    <p tabIndex={0} className='club-detail-information'
                        role='region'
                        aria-live='polite'
                        aria-label={`Category: ${this.state.category && this.state.category.Name}`}><span aria-hidden={true}>Category</span> {this.state.category && this.state.category.Name}</p>
                    <p tabIndex={0} className='club-detail-information'
                        role='region'
                        aria-live='polite'
                        aria-label={`Umbrella: ${this.state.clubDetail && this.state.clubDetail.Umbrella && this.state.clubDetail.Umbrella.name}`}><span aria-hidden={true}>Umbrella</span> {this.state.clubDetail && this.state.clubDetail.Umbrella && this.state.clubDetail.Umbrella.name}</p>
                    <p className='club-detail-information'
                        role='button'
                        aria-live='polite'
                        aria-label={`Click to go to NYU Engage`}><span aria-hidden={true} tabIndex={0}>Join Link</span> <a className='club-detail-go-to-engage-link' href={links && links.web} target='_blank'>Join on Engage</a></p>
                
                    <p className='club-detail-description' tabIndex={0}
                        role='region'
                        aria-live='polite'>
                        {this.state.clubDetail && this.state.clubDetail.description}
                    </p>

                    <h3 className='club-detail-portal-title' tabIndex={0}>Portal Information</h3>
                    <div className='club-detail-portal-information'>
                        <p className='club-detail-portal-information-title' tabIndex={0}>Website</p>
                        <a className='club-detail-portal-information-link' href={this.state.clubWebsite || "/"}>
                            {this.state.clubWebsite || "N/A"}
                        </a>

                        <p className='club-detail-portal-information-title' tabIndex={0}>Facebook</p>
                        <a className='club-detail-portal-information-link' href={this.state.clubFacebook || "/"} >
                            {this.state.clubFacebook || "N/A"}
                        </a>

                        <p className='club-detail-portal-information-title' tabIndex={0}>Instagram</p>
                        <a className='club-detail-portal-information-link' href={this.state.clubInstagram || "/"} >
                            {this.state.clubInstagram || "N/A"}
                        </a>
                        
                        <p className='club-detail-portal-information-title' tabIndex={0}>Meetings</p>
                        <p className='club-detail-portal-information-link not-link'>
                            {this.state.clubMeetings || "N/A"}
                        </p>

                        <p className='club-detail-portal-information-title' tabIndex={0}>Contact</p>
                        <p className='club-detail-portal-information-link not-link'>
                            {this.state.clubContact || "N/A"}
                        </p>

                        <p className='club-detail-portal-information-title' tabIndex={0}>Email</p>
                        <a className='club-detail-portal-information-link' href={this.state.clubContactEmail || "/"}>
                            {this.state.clubContactEmail || "N/A"}
                        </a>
                    </div>
                    
                    <h3 className='club-detail-events-title' tabIndex={0}>Upcoming Events</h3>
                    <CollectionView 
                        className='club-detail-events-list'
                        orientation={CollectionView.Orientation.vertical}
                        edgeInsets={['10px', '0px', '10px', '0px']}
                        emptyDataView={<EmptyList subtitle='There are no upcoming events for this club'/>}
                        data={
                            
                            _.slice(this.state.upcomingEvents, 0, (this.state.maxEvents || this.state.upcomingEvents.length))
                                .map((val, index) => {
                                    const _val = {
                                        ...val,
                                        host: (this.props.club.Name) || "NYU Club"
                                    }
                                    return Maps.mapEventToComponent(_val, index, (_, __, ___, idx) => {
                                        if (this.props.onSelectEvent) {
                                            const items = this.state.upcomingEvents;
                                            const item = items[idx];
                                            this.props.onSelectEvent(item);
                                        } else {
                                            alert('Nothing here');
                                        }
                                    })
                                })
                    }/>
                    
                    {this.state.upcomingEvents.length > maxEvents && (
                        <button className="club-detail-see-more-btn" onClick={() => {
                                this.setState({
                                    maxEvents: this.state.maxEvents === 0 ? maxEvents : 0,
                                });
                            }} 
                            tabIndex={0}
                            role='button'
                            aria-live='polite'
                            aria-label='Click to see more or fewer events'>
                            See {this.state.maxEvents === 0 ? "Less" : "More"}
                        </button>
                    )}
                    
                </div>
            </div>
            );
        }
        
        
        /****************************
        *                           *
        *         FUNCTIONS         *
        *                           *
        *****************************/
        
        handleFollowClub = async () => {
            if (this.state.followed) {
                await Networking.unfollowClub(this.props.club.ID);
            } else {
                await Networking.followClub(this.props.club.ID);
            }
            await this.reloadFollowedClubs();
        }
        
        /****************************
        *                           *
        *           STYLES          *
        *                           *
        *****************************/
        
    }
    
    export default LoginClubDetail;
    