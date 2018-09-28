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

import AppLogo from '../images/FindMyClub_NEWLOGO.svg';
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
            searchBarShowing: false,
            showingOverlay: false,
            searchDisabled: false,
        }
    }

    componentDidMount() {
        this.showClubsTab();
        document.title = 'Find My Club | Dashboard';
    }

    componentDidUpdate() {
        const searchDisabled = this.state.searchDisabled
        this.refs['dashboard-toggle-search-btn'].style.opacity = searchDisabled ? '0.4' : '1';
        this.refs['dashboard-toggle-search-btn'].style.cursor = searchDisabled ? 'default' : 'pointer';
        
        if(this.state.searchBarShowing === true) {
            setTimeout(() => {
                this.refs['dashboard-search-bar'].focus();
            }, 200);
        }
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

                <header>
                    <div className='dashboard-top-bar'>
                        <div className='dashboard-toggle-search-btn'
                            ref='dashboard-toggle-search-btn'
                            tabIndex={this.state.showingOverlay ? -1 : 0}
                            role='button'
                            aria-live='polite'
                            aria-label='Search Button: Click to open the search bar'
                            onClick={() => {
                                if (this.state.searchDisabled === true) return;
                                this.setState({ searchBarShowing: !this.state.searchBarShowing })
                            }}
                        ><span aria-hidden={true} className='fas fa-search' /></div>
                        <img src={AppLogo} alt='' tabIndex={-1} className='dashboard-app-logo' />
                        <img src={require('../images/profile_image.png')}
                            alt=''
                            className='dashboard-profile-button'
                            tabIndex={this.state.overlayShowing ? - 1 : 0}
                            role='button'
                            aria-live='polite'
                            aria-label='Profile Button: Click to go to your profile'
                            onClick={this.toggleProfile.bind(this)} />
                    </div>
                    <div className='dashboard-search-bar-area'
                        style={{
                            position: 'absolute',
                            // top: this.setState.searchBarShowing === true ? '61px' : '0px',
                            height: this.state.searchBarShowing === true ? '42px' : '0px',
                            borderBottom: this.state.searchBarShowing === true ? '1px solid #e6e9ef' : 'none'
                        }}>
                        <form role='search'>
                            <input type='text'
                                ref='dashboard-search-bar'
                                className='dashboard-search-bar'
                                placeholder='Search for keywords'
                                tabIndex={this.state.showingOverlay ? -1 : 0}
                                aria-label={`Search Bar: Edit to search for clubs and events. Current Text: ${this.state.searchKeyword}`}
                                onChange={this.handleSearchKeywordChange}
                                value={this.state.searchKeyword}
                                style={{
                                    position: 'relative',
                                    top: this.state.searchBarShowing === true ? '7px' : '0px',
                                    height: this.state.searchBarShowing === true ? '26px' : '0px',
                                    visibility: this.state.searchBarShowing === true ? 'visible' : 'hidden',
                                    border: this.setState.searchBarShowing === true ? '1px solid purple' : 'none'
                                }}
                                onKeyPress={(e) => {
                                    if (e.keyCode !== 32 && e.keyCode !== 13) return;
                                    if (this.state.currentTab === 'clubs') {
                                        this.refs['dashboard-clubs-view'].focus();
                                    } else if (this.state.currentTab === 'event') {
                                        this.refs['dashboard-events-view'].focus();
                                    } else {
                                        this.refs['dashboard-discover-view'].focus();
                                    }
                                }} />
                        </form>
                    </div>
                </header>


                {this.renderCurrentTab()}


                <nav>
                    <div className='dashboard-tab-bar'>
                        <div className='dashboard-tab-indicator' style={{
                            left: `${this.getTabIndicatorLeft(this.state.currentTab)}%`
                        }}></div>
                        <div className="dashboard-tab-bar-items-contain">
                            <div className='dashboard-tab-bar-item'
                                role='button'
                                aria-label='Click to go to the My Clubs Tab'
                                tabIndex={this.state.showingOverlay ? -1 : 0}
                                onClick={this.showClubsTab.bind(this)}>
                                <span className='fa fa-user' />&nbsp;My Clubs
                        </div>
                            <div className='dashboard-tab-bar-item'
                                role='button'
                                aria-label='Click to go to the Events Tab'
                                tabIndex={this.state.showingOverlay ? -1 : 0}
                                onClick={this.showEventsTab.bind(this)}>
                                <span className='fas fa-comments' />&nbsp;Events
                        </div>
                            <div className='dashboard-tab-bar-item'
                                role='button'
                                aria-label='Click to go to the All NYU Tab'
                                tabIndex={this.state.showingOverlay ? -1 : 0}
                                onClick={this.showDiscoverTab.bind(this)}>
                                <span className='fas fa-search' />&nbsp;All NYU
                        </div>
                        </div>
                    </div>
                </nav>
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
                    ref='dashboard-clubs-view'
                    overlayShowing={this.state.overlayShowing}
                    searchShowing={this.state.searchBarShowing}
                    searchKeyword={this.state.searchKeyword}
                    setSearchDisabled={this.setSearchDisabled}
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
                <DashboardEvents
                    ref='dashboard-events-view'
                    overlayShowing={this.state.overlayShowing}
                    searchShowing={this.state.searchBarShowing}
                    searchKeyword={this.state.searchKeyword}
                    setSearchDisabled={this.setSearchDisabled}
                    onSelectEvent={(event, club) => {
                        this.showOverlay(<EventDetail event={event} club={club} onClose={() => this.hideOverlay()} />);
                    }} />
            );
        } else {
            return (
                <DashboardDiscover
                    ref='dashboard-discover-view'
                    overlayShowing={this.state.overlayShowing}
                    searchShowing={this.state.searchBarShowing}
                    searchKeyword={this.state.searchKeyword}
                    setSearchDisabled={this.setSearchDisabled}
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

    setSearchDisabled = (isDisabled) => {
        this.setState({ searchDisabled: isDisabled })
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
                    if (then) then();
                });
            })
        })
    }


    /** Brings up an overlay view on top of the current container.
    * @param {Component} overlayView The view to display in the overlay.
    * @param {Number} duration How long the transition should last for.
    * @param {Function} then What to do when the transition is over. */
    showOverlay(overlayView, duration = Constants.OVERLAY_TRANSITION_TIME, then, showTopBar = false) {
        const top = showTopBar ? '60px' : '0px';
        this.setState({ showingOverlay: true });
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
                }, duration || Constants.OVERLAY_TRANSITION_TIME, () => {
                    if (then) then();
                })
            });
        });
    }


    /** Hides the currently displaying overlay.
    * @param {Function} then What to do after the view has animated away.
    * @param {Number} duration How long the transition should last. */
    hideOverlay(then, duration = Constants.OVERLAY_TRANSITION_TIME) {
        this.setState({ showingOverlay: false });
        $('.overlay').animate({
            opacity: 0,
            top: '0px',
            left: '100%',
            width: '0px',
            height: '0px',
        }, duration || Constants.OVERLAY_TRANSITION_TIME, () => {
            // 2.) Set the state of the new overlay.
            this.setState({ currentOverlay: <div className='overlay'></div> }, () => {
                if (then) then();
            });
        });
    }

}

export default Dashboard;
