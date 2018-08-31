import React, { Component } from 'react';
import $ from 'jquery';
import Constants from '../util/Constants';

/* CONTAINERS */
import DashboardClubs from '../route-containers/DashboardClubs';
import DashboardEvents from '../route-containers/DashboardEvents';
import DashboardDiscover from '../route-containers/DashboardDiscover';
/* CONTAINERS */

/* OVERLAYS */
import ClubFilter from '../route-containers/LoginClubFilter';
import ClubDetail from '../route-containers/LoginClubDetail';
import EventDetail from '../route-containers/DashboardEventDetail';
import DashboardProfile from '../route-containers/DashboardProfile';
/* OVERLAYS */

import AppLogo from '../images/FindMyClub_Logo.svg';
import '../css/Dashboard.css';

class Dashboard extends Component {

	/****************************
    *                           *
    *            INIT           *
    *                           *
    *****************************/

    constructor(props) {
        super(props);
        this.state = {
            currentTab: 'clubs',
            currentContainer: <div className='dashboard-container'></div>,
            currentOverlay: <div className='overlay'></div>,
            tabIndicatorLeft: 0,
            searchKeyword: '',
        }
    }

    componentDidMount() {
        this.showClubsTab();
    }



	/****************************
    *                           *
    *           RENDER          *
    *                           *
    *****************************/

	render() {
		return (
			<div className="Dashboard">
				{this.state.currentOverlay}
                
                <div className='dashboard-top-bar'>
                    <img src={AppLogo} alt='logo' className='dashboard-app-logo'/>
                    <img src={require('../images/profile_image.svg')} alt='person' className='dashboard-profile-button' onClick={this.showProfile.bind(this)}/>
                </div>
                <div className='dashboard-search-bar-area'>
                    <input type='text'
                        className='dashboard-search-bar'
                        placeholder='Search for keywords'
                        onChange={this.handleSearchKeywordChange} />
                </div>
                
                
                {this.renderCurrentTab()}
                
                <div className='dashboard-tab-bar'>
                    <div className='dashboard-tab-indicator' style={{
                        left: `${this.getTabIndicatorLeft(this.state.currentTab)}%`
                    }}></div>
                    <div className='dashboard-tab-bar-item' onClick={this.showClubsTab.bind(this)}>
                        <span className='fa fa-user'/>&nbsp;My Clubs
                    </div>
                    <div className='dashboard-tab-bar-item' onClick={this.showEventsTab.bind(this)}>
                        <span className='fas fa-comments'/>&nbsp;Events
                    </div>
                    <div className='dashboard-tab-bar-item' onClick={this.showDiscoverTab.bind(this)}>
                        <span className='fas fa-search'/>&nbsp;Discover
                    </div>
                </div>
			</div>
		);
    }

    getTabIndicatorLeft = (currentTab) => {
        return {
            club: 0,
            event: 33,
            discover: 67,
        }[currentTab];
    }
    
    renderCurrentTab = () => {
        if (this.state.currentTab === 'club') {
            return (
                <DashboardClubs
                    searchKeyword={this.state.searchKeyword}
                    onSelectClub={(club) => {
                        this.showOverlay(<ClubDetail club={club}
                            onSelectEvent={(item) => {
                                this.showOverlay(<EventDetail event={item} onClose={() => this.hideOverlay()} />);
                            }}
                            onClose={() => {
                                this.hideOverlay()
                            }} />);
                    }} />
            );
        } else if (this.state.currentTab === 'event') {
            return (
                <DashboardEvents searchKeyword={this.state.searchKeyword} onSelectEvent={(item) => {
                    this.showOverlay(<EventDetail event={item} onClose={() => this.hideOverlay()} />);
                }} />
            );
        } else {
            return (
                <DashboardDiscover
                    searchKeyword={this.state.searchKeyword}
                    onSelectClub={(club) => {
                        this.showOverlay(<ClubDetail club={club}
                            onSelectEvent={(item) => {
                                this.showOverlay(<EventDetail event={item} onClose={() => this.hideOverlay()} />);
                            }}
                            onClose={() => {
                                this.hideOverlay()
                            }} />);
                    }}
                    onRefine={() => {
                        this.showOverlay(<ClubFilter onClose={() => { this.hideOverlay() }}
                            onFiltered={(filteredResults) => {
                                console.log('Filtered: ', filteredResults);
                                document.body.scroll({ top: 0, behavior: 'instant' });
                                this.hideOverlay();
                            }} />);
                    }} />
            );
        }
    }


	/****************************
    *                           *
    *         FUNCTIONS         *
    *                           *
    *****************************/

    /** Shows the list of clubs the user is part of. */
    showClubsTab() {
        this.setState({
            currentTab: 'club',
        });
    }


    /** Shows the events list. */
    showEventsTab() {
        this.setState({
            currentTab: 'event',
        })
    }


    /** Shows the discover tab. */
    showDiscoverTab() {
        this.setState({
            currentTab: 'discover',
        })
    }


    /** Shows the profile overlay. */
    showProfile() {
        this.showOverlay(<DashboardProfile onClose={() => { 
            this.hideOverlay()
        }} />, Constants.OVERLAY_TRANSITION_TIME, undefined, true);
    }

    handleSearchKeywordChange = (e) => {
        this.setState({
            searchKeyword: e.target.value || '',
        });
    }



	/****************************
    *                           *
    *           STYLES          *
    *                           *
    *****************************/


    /****************************
    *                           *
    *           OTHER           *
    *                           *
    *****************************/

    /** Animates away the current container, switches it to something else  and animates into the new one.
    * @param {Component} newContainer The new container component to switch to.
    * @param {Number} duration How long the transition should last.
    * @param {Function} then What to do after the transition is done. */
    transitionContainer(newContainer, duration = Constants.CONTAINER_TRANSITION_TIME, then) {
        // 1.) Animate away the current one.
        $('.dashboard-container').animate({
            opacity: 0
        }, duration || Constants.CONTAINER_TRANSITION_TIME, () => {
            // 2.) Switch to the new one.
            this.setState({ currentContainer: newContainer }, () => {
                // 3.) Animate in the new one.
                $('.dashboard-container').css('opacity', 0);
                $('.dashboard-container').animate({
                    opacity: 1
                }, duration || Constants.CONTAINER_TRANSITION_TIME, () => {
                    if(then) then();
                });
            })
        })
    }


    /** Brings up an overlay view on top of the current container.
    * @param {Component} overlayView The view to display in the overlay. 
    * @param {Number} duration How long the transition should last for. 
    * @param {Function} then What to do when the transition is over. */
    showOverlay(overlayView, duration = Constants.OVERLAY_TRANSITION_TIME, then, showTopBar=false) {
        const top = showTopBar ? '60px' : '0px';
        // 1.) Reset any existing overlay view by animating it away.
        $('.overlay').animate({
            opacity: 0,
            top,
            left: '100%',
            width: '0px',
            height: '0px',
        }, duration || Constants.OVERLAY_TRANSITION_TIME, () => {
            // 2.) Set the state of the new overlay.
            this.setState({ currentOverlay: overlayView }, () => {
                // 3.) Animate into the new overlay.
                $('.overlay').css('opacity', 0);
                $('.overlay').css('top', '0px');
                $('.overlay').css('left', '100%');
                $('.overlay').css('width', '0px');
                $('.overlay').css('height', '0px');
                $('.overlay').animate({
                    opacity: 1,
                    top,
                    left: '0px',
                    width: '100%',
                    height: '100%'
                },  duration || Constants.OVERLAY_TRANSITION_TIME, () => {
                    if(then) then();
                })
            });
        });
    }


    /** Hides the currently displaying overlay. 
    * @param {Function} then What to do after the view has animated away. 
    * @param {Number} duration How long the transition should last. */
    hideOverlay(then, duration = Constants.OVERLAY_TRANSITION_TIME) {
        $('.overlay').animate({
            opacity: 0,
            top: '0px',
            left: '100%',
            width: '0px',
            height: '0px',
        }, duration || Constants.OVERLAY_TRANSITION_TIME, () => {
            // 2.) Set the state of the new overlay.
            this.setState({ currentOverlay: <div className='overlay'></div> }, () => {
                if(then) then();
            });
        });
    }

}

export default Dashboard;
