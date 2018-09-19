import React, { Component } from 'react';
import _ from 'lodash';
import $ from 'jquery';

import ClubList from '../components/ClubList';
import SelectUmbrella from '../components/SelectUmbrella';
import LoadingBubbles from '../components/LoadingBubbles';

import Networking from '../util/Networking';

import '../css/containers/DashboardClubs.css';
import Globals from '../util/Globals';

class DashboardClubs extends Component {

	/****************************
    *                           *
    *            INIT           *
    *                           *
    *****************************/

    constructor(props) {
        super(props);
        this.state = {
            // plain club objects get from 
            followingClubs: undefined,
            selectedUmbrella: undefined,
        }
    }

    async componentDidMount() {
        await this.reloadFollowingClubs();
        document.title = 'Find My Club | Dashboard Clubs';

        if(!this.state.followingClubs || this.state.followingClubs.length === 0) {
            Globals.searchDisabled = true;
        } else {
            Globals.searchDisabled = false;
        }
        this.props.parent.forceUpdate();
    }





	/****************************
    *                           *
    *           RENDER          *
    *                           *
    *****************************/

    render = () => {
        return (
            <div className="DashboardClubs dashboard-container" style={{
                top: this.props.searchShowing === true ? '108px' : '70px',
                height: this.props.searchShowing === true ? 'calc(100% - 170px)' : 'calc(100% - 120px)'
            }} tabIndex={this.props.overlayShowing ? - 1 : 0}>
                <div className='dashboard-clubs-header' tabIndex={-1}>
                    <h1 className='dashboard-clubs-title' 
                        aria-label='Header: My Clubs'
                        tabIndex={this.props.overlayShowing ? -1 : 0}>My Clubs</h1>

                    <SelectUmbrella
                        overlayShowing={this.props.overlayShowing}
                        didSelectUmbrella={this.didSelectUmbrella}
                        selectedUmbrella={this.state.selectedUmbrella}
                    />
                </div>
                <main>
                    {
                        _.isNil(this.state.followingClubs) ?
                            <LoadingBubbles /> :
                            <ClubList
                                overlayShowing={this.props.overlayShowing}
                                emptySubtitle='You aren’t following any clubs!'
                                searchKeyword={this.props.searchKeyword}
                                clubs={this.state.followingClubs}
                                filterUmbrellaID={this.state.selectedUmbrella && this.state.selectedUmbrella.id}
                                onSelectClub={this.props.onSelectClub}
                            />
                    }
                </main>
                
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
