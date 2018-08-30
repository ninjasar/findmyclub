import React, { Component } from 'react';
import _ from 'lodash';
import Maps from '../util/Maps';
import Networking from '../util/Networking';
import * as UIUtil from '../util/UI';
import CollectionView from '../components/CollectionView';
import '../css/containers/LoginClubDetail.css';
import * as InterestsAndCategories from '../util/InterestsAndCategories';

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
            maxEvents: 2,
            followed: false,
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
        await this.reloadCategory();
        await this.reloadEvents();
        await this.reloadClubDetail();
        await this.reloadFollowedClubs();
    }
    
	/****************************
    *                           *
    *           RENDER          *
    *                           *
    *****************************/
    
	render() {
        const galleryImageSrc = UIUtil.getClubThumbnail(this.state.clubDetail);
        const headerImageSrc = UIUtil.getClubThumbnail(this.state.clubDetail);
        const links = this.state.clubDetail && this.state.clubDetail.links;
        const interest = this.state.category && this.state.category.interest && this.state.category.interest.Name;
		return (
			<div className="LoginClubDetail overlay">
                
                <div className="login-club-detail-top">
                    <img className='club-detail-background-image' src={headerImageSrc} alt='image-preview'/>
                    <button 
                        className='club-detail-close-btn'
                        onClick={() => {
                            if(this.props.onClose) {
                                this.props.onClose();
                            }
                        }}><span className='fa fa-times'/>
                    </button>

                </div>
                
                <div className="login-club-detail-middle">

                    <button className='pill-button club-detail-follow-btn' onClick={this.handleFollowClub}>
                        <span className={this.state.followed ? 'fa fa-check' : 'fa fa-plus'} />&nbsp;{this.state.followed ? 'Followed' : 'Follow'}
                    </button>
                    <a className='pill-button club-detail-go-to-engage-btn' href={links && links.web} target='_blank'>
                        <span className='fa fa-sign-out-alt'/>&nbsp;Go to Engage
                    </a>
                
                    <h1 className='club-detail-title'>{this.props.club.Name}</h1>
                    <p className='club-detail-information'><span>Interest</span> {this.state.category && this.state.category.interest && this.state.category.interest}</p>
                    <p className='club-detail-information'><span>Category</span> {this.state.category && this.state.category.Name}</p>
                    <p className='club-detail-information'><span>Umbrella</span> {this.state.clubDetail && this.state.clubDetail.Umbrella && this.state.clubDetail.Umbrella.name}</p>
                    
                    <p className='club-detail-description'>
                        {this.state.clubDetail && this.state.clubDetail.description}
                    </p>
                    
                    <h3 className='club-detail-portal-title'>Portal Information</h3>
                    <div className='club-detail-portal-information'>
                        <p className='club-detail-portal-information-title'>Website</p>
                        {
                            links && links.web && 
                            <a className='club-detail-portal-information-link' href={links.web}>{links.web}</a>
                        }
                    </div>
                    
                    <h3 className='club-detail-events-title'>Upcoming Events</h3>
                    <CollectionView 
                        className='club-detail-events-list'
                        orientation={CollectionView.Orientation.vertical}
                        edgeInsets={['10px', '0px', '0px', '0px']}
                        data={
                            this.state.upcomingEvents.map((val, index) => {
                                return Maps.mapEventToComponent(val, index, (_, __, ___, idx) => {
                                    if(this.props.onSelectEvent) {
                                        const items = this.state.upcomingEvents;
                                        const item = items[idx];
                                        this.props.onSelectEvent(item);
                                    } else {
                                        alert('Nothing here');
                                    }
                                })
                            }).filter((_, index) => {
                                if(this.state.maxEvents === 2) {
                                    return index < this.state.maxEvents;
                                } else {
                                    return index;
                                }
                            })
                    }/>
                    <button 
                        className='club-detail-see-more-btn'
                        onClick={() => {
                            this.setState({
                                maxEvents: this.state.maxEvents === 2 ? -1 : 2
                            })
                    }}>See {this.state.maxEvents === 2 ? 'More' : 'Less'}</button>
                    <button className="club-detail-see-more-btn" onClick={() => {
                        this.setState({
                            maxEvents: this.state.maxEvents === 2 ? -1 : 2
                        });
                    }}>
                    See {this.state.maxEvents === 2 ? "More" : "Less"}
                    </button>
                    
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
    