import React, { Component } from 'react';
import $ from 'jquery';
import _ from 'lodash';
import ReactGA from 'react-ga';
import Constants from '../util/Constants';
import * as InterestsAndCategories from '../util/InterestsAndCategories';

/* CONTAINERS */
import DashboardClubs from '../route-containers/DashboardClubs';
import DashboardEvents from '../route-containers/DashboardEvents';
import DashboardDiscover from '../route-containers/DashboardDiscover';
/* CONTAINERS */

/* OVERLAYS */
import LoginClubFilter from '../route-containers/LoginClubFilter';
import ClubDetail from '../route-containers/LoginClubDetail';
import EventDetail from '../route-containers/DashboardEventDetail';
import DashboardProfile from '../route-containers/DashboardProfile';
/* OVERLAYS */

import AppLogo from '../images/Beta-logo@2x.png';
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
            profileShown: false,
            searchBarShowing: false
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
                    <button className='dashboard-toggle-search-btn'
                            onClick={() => {
                                this.setState({ searchBarShowing: !this.state.searchBarShowing })
                            }}><span className='fas fa-search'/></button>
                    <img src={AppLogo} alt='logo' className='dashboard-app-logo'/>
                    <img src={require('../images/profile_image_smiling-face-with-sunglasses_1f60e.png')} alt='person' className='dashboard-profile-button' onClick={this.toggleProfile.bind(this)}/>
                </div>
                <div className='dashboard-search-bar-area'
                    style={{
                        position: 'absolute',
                        // top: this.setState.searchBarShowing === true ? '61px' : '0px',
                        height: this.state.searchBarShowing === true ? '42px' : '0px',
                        borderBottom: this.state.searchBarShowing === true ? '1px solid #e6e9ef' : 'none'
                    }}>
                    <input type='text'
                        className='dashboard-search-bar'
                        placeholder='Search for keywords'
                        onChange={this.handleSearchKeywordChange}
                        value={this.state.searchKeyword}
                        style={{
                            position: 'relative',
                            top: this.state.searchBarShowing === true ? '7px' : '0px',
                            height: this.state.searchBarShowing === true ? '26px' : '0px',
                            visibility: this.state.searchBarShowing === true ? 'visible' : 'hidden',
                            border: this.setState.searchBarShowing === true ? '1px solid purple' : 'none'
                        }} />
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
                        <span className='fas fa-search'/>&nbsp;All NYU
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
                    searchShowing={this.state.searchBarShowing}
                    searchKeyword={this.state.searchKeyword}
                    onSelectClub={(club) => {
                        this.showOverlay(<ClubDetail club={club}
                            onSelectEvent={(event) => {
                                this.showOverlay(<EventDetail event={event} club={club} onClose={() => this.hideOverlay()} />);
                            }}
                            onClose={() => {
                                this.hideOverlay()
                            }} />);
                    }} />
            );
        } else if (this.state.currentTab === 'event') {
            return (
                <DashboardEvents searchShowing={this.state.searchBarShowing} searchKeyword={this.state.searchKeyword} onSelectEvent={(event, club) => {
                    this.showOverlay(<EventDetail event={event} club={club} onClose={() => this.hideOverlay()} />);
                }} />
            );
        } else {
            return (
                <DashboardDiscover
                    searchShowing={this.state.searchBarShowing}
                    searchKeyword={this.state.searchKeyword}
                    onSelectClub={(club) => {
                        this.showOverlay(<ClubDetail club={club}
                            onSelectEvent={(event) => {
                                this.showOverlay(<EventDetail event={event} club={club} onClose={() => this.hideOverlay()} />);
                            }}
                            onClose={() => {
                                this.hideOverlay()
                            }} />);
                    }}
                    onRefine={(selectedCategories, allCategories, clubs, onRefineDone) => {
                        const filterer = this.getFilterer(selectedCategories, allCategories, clubs, onRefineDone);
                        this.showOverlay(filterer);
                    }} />
            );
        }
    }

    getFilterer = (selectedCategories, allCategories, clubs, onRefineDone) => {
        return (
            <LoginClubFilter
                checkedCategories={selectedCategories}
                onFiltered={(categoryNames) => {
                    onRefineDone(categoryNames);
                    this.hideOverlay();
                }}
                onClose={this.hideOverlay.bind(this)}
                interests={_.values(InterestsAndCategories.interests)}
                categories={allCategories}
                selectedClubs={clubs}
            />
        );
    }


	/****************************
    *                           *
    *         FUNCTIONS         *
    *                           *
    *****************************/

    /** Shows the list of clubs the user is part of. */
    showClubsTab() {
        try { ReactGA.pageview(`/dashboard/clubs`); }
        catch (err) { }
        this.setState({
            currentTab: 'club',
            searchKeyword: '',
        });
    }


    /** Shows the events list. */
    showEventsTab() {
        try { ReactGA.pageview(`/dashboard/events`); }
        catch (err) { }
        this.setState({
            currentTab: 'event',
            searchKeyword: '',
        })
    }


    /** Shows the discover tab. */
    showDiscoverTab() {
        try { ReactGA.pageview(`/dashboard/all_nyu`); }
        catch (err) { }
        this.setState({
            currentTab: 'discover',
            searchKeyword: '',
        })
    }


    /** Shows the profile overlay. */
    toggleProfile() {
        if (this.state.profileShown) {
            this.hideOverlay();
        } else {
            this.showOverlay(<DashboardProfile onClose={() => {
                this.hideOverlay()
            }} />, Constants.OVERLAY_TRANSITION_TIME, undefined, true);
        }
        this.setState((state) => ({
            profileShown: !state.profileShown,
        }));
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
