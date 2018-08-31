import React, { Component } from 'react';
import _ from 'lodash';

import ClubList from '../components/ClubList';
import SelectUmbrella from '../components/SelectUmbrella';

import Networking from '../util/Networking';

import '../css/containers/DashboardClubs.css';

class DashboardClubs extends Component {

	/****************************
    *                           *
    *            INIT           *
    *                           *
    *****************************/

    constructor(props) {
        super(props);
        this.state = {
            clubs: [],

            // plain club objects get from 
            followingClubs: [],
            selectedUmbrella: undefined,
        }
    }


    /** REMEMBER TO CHANGE THIS LATER: This page should only show the clubs that you are part of, not
     * all the clubs at nyu.
     */
    async componentDidMount() {
        this.reloadFollowingClubs();
    }
   


	/****************************
    *                           *
    *           RENDER          *
    *                           *
    *****************************/

    render() {
        return (
            <div className="DashboardClubs dashboard-container">
                <div className='dashboard-clubs-header'>
                    <h1 className='dashboard-clubs-title'>My Clubs</h1>

                    <SelectUmbrella
                        didSelectUmbrella={this.didSelectUmbrella}
                        selectedUmbrella={this.state.selectedUmbrella}
                    />
                </div>
                <ClubList
                    emptySubtitle='You aren’t following any clubs!'
                    searchKeyword={this.props.searchKeyword}
                    clubs={this.state.followingClubs}
                    filterUmbrellaID={this.state.selectedUmbrella && this.state.selectedUmbrella.id}
                    onSelectClub={this.props.onSelectClub}
                    />
            </div>
        );
    }


	/****************************
    *                           *
    *         FUNCTIONS         *
    *                           *
    *****************************/

    /** When you click an umbrella to search through. */
    didSelectUmbrella = (umbrella) => {
        this.setState({
            selectedUmbrella: umbrella,
        });
    }

    async reloadFollowingClubs() {
        this.setState({
            followingClubs: await Networking.getFollowedClubs(),
        });
    }



	/****************************
    *                           *
    *           STYLES          *
    *                           *
    *****************************/

}

export default DashboardClubs;
