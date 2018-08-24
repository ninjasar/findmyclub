import React, { Component } from 'react';
import $ from 'jquery';
import Constants from '../util/Constants';
import Networking from '../util/Networking';

/* CONTAINERS */
import LoginLanding from '../route-containers/LoginLanding';
import LoginWelcome from '../route-containers/LoginWelcome';
import LoginInterestSelection from '../route-containers/LoginInterestSelection';
import LoginMatching from '../route-containers/LoginMatching';
import LoginClubMatch from '../route-containers/LoginClubMatch';
import LoginAllSet from '../route-containers/LoginAllSet';
/* CONTAINERS */

/* OVERLAYS */
import LoginClubFilter from '../route-containers/LoginClubFilter';
import LoginClubDetail from '../route-containers/LoginClubDetail';
import EventDetail from '../route-containers/DashboardEventDetail';
/* OVERLAYS */

import '../css/Login.css';


/** THe login page, which should be the first page of thsi app. */
class Login extends Component {

	/****************************
    *                           *
    *            INIT           *
    *                           *
    *****************************/

    constructor(props) {
        super(props);
        this.state = {
            currentContainer: <div className='container'></div>,
            currentOverlay: <div className='overlay'></div>
        }
    }

    componentDidMount() {
        // Once you get here, check if the user is already logged in. If so,
        // run the onLogin function to go to the next page.
        const token = Networking.getParameterByName('token', window.location.toString());
        if(token !== null) {
            setTimeout(() => {
                this.transitionContainer(<LoginWelcome onNext={this.handleGoToSelectInterests.bind(this)} />);
            }, 200);
        } else {
            setTimeout(() => {
                this.transitionContainer(<LoginLanding onLogin={this.handleGoToIntroductionContainer.bind(this)}/>, 800);
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
			<div className="Login">
                {this.state.currentOverlay}
				{this.state.currentContainer}
			</div>
		);
	}


	/****************************
    *                           *
    *         FUNCTIONS         *
    *                           *
    *****************************/

    /** Transitions to the introduction container. */
    handleGoToIntroductionContainer() {
        this.transitionContainer(<LoginWelcome onNext={this.handleGoToSelectInterests.bind(this)} />);
    }


    /** Transitions to the view that lets people select their interests. */
    handleGoToSelectInterests() {
        this.transitionContainer(<LoginInterestSelection onNext={this.handleGoToMatching.bind(this)}/>);
    }


    /** Goes to the loading screen for finding clubs with your interests.
    * @param {Array} selectedInterests The array of selected interest objects. */
    async handleGoToMatching(selectedInterests) {
        // This page itself does not actually do much. Any API calls should be done
        // here in the login page, then when they are done you go to the next page.
        this.transitionContainer(<LoginMatching />);
        
        // Function to go to the club matches page.
        const finished = (interests, matches) => {
            this.transitionContainer(<LoginClubMatch onRefine={() => {
                this.showOverlay(<LoginClubFilter onFiltered={(onFilters) => {
                                                    this.hideOverlay();
                                                    console.log('Filters that were turned on: ', onFilters);
                                                }} 
                                                onClose={this.hideOverlay.bind(this)}/>);
            }}
            onSelectClub={(selectedCard) => {
                this.showOverlay(<LoginClubDetail club={selectedCard} 
                                                onClose={() => this.hideOverlay()}
                                                onSelectEvent={(item) => {
                                                    this.showOverlay(<EventDetail event={item} onClose={() => this.hideOverlay()}/>);
                                                }}/>);
                console.log(selectedCard);
            }}
            onNext={() => {
                this.transitionContainer(<LoginAllSet onNext={this.handleGoToDashboard.bind(this)}/>);
            }}
            interests={interests}
            clubMatches={matches}/>);
        }

        // Get all the categories.
        const categories = await Networking.getCategories();
        console.log(categories);

        var total = {};
        selectedInterests.forEach((interest, index) => {
            
        })
        // var total = {};
        // var interests = {};
        // selectedInterests.forEach((interest, i) => {
        //     interests[interest.ID] = interest.Name;
        //     Networking.getClubs(interest.ID).then((matchingClubs) => {
        //         total[interest.ID] = matchingClubs;

        //         if(i >= selectedInterests.length - 1) {
        //             finished(interests, total);
        //             return;
        //         }
        //     }).catch((err) => {
        //         console.log(err);

        //         if(i >= selectedInterests.length - 1) {
        //             finished(interests, total);
        //             return;
        //         }
        //     })
        // })
    }


    /** Transitions to the dashboard page. */
    handleGoToDashboard() {

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
        $('.container').animate({
            opacity: 0
        }, duration || Constants.CONTAINER_TRANSITION_TIME, () => {
            // 2.) Switch to the new one.
            this.setState({ currentContainer: newContainer }, () => {
                // 3.) Animate in the new one.
                $('.container').css('opacity', 0);
                $('.container').animate({
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
    showOverlay(overlayView, duration = Constants.OVERLAY_TRANSITION_TIME, then) {
        // 1.) Reset any existing overlay view by animating it away.
        $('.overlay').animate({
            opacity: 0,
            top: '0px',
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
                    top: '0px',
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

export default Login;
