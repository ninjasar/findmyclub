import React, { Component } from 'react';
import _ from 'lodash';

import ClubList from '../components/ClubList';
import SelectUmbrella from '../components/SelectUmbrella';
import LoadingBubbles from '../components/LoadingBubbles';

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
            // plain club objects get from 
            followingClubs: undefined,
            selectedUmbrella: undefined,
        }
    }

    async componentDidMount() {
        this.reloadFollowingClubs();
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
                height: this.props.searchShowing === true ? 'calc(100% - 20px)' : '100%'
            }}>
                <div className='dashboard-clubs-header'>
                    <h1 className='dashboard-clubs-title'>My Clubs</h1>

                    <SelectUmbrella
                        didSelectUmbrella={this.didSelectUmbrella}
                        selectedUmbrella={this.state.selectedUmbrella}
                    />
                </div>
                {
                    _.isNil(this.state.followingClubs) ?
                        <LoadingBubbles /> :
                        <ClubList
                            emptySubtitle='You aren’t following any clubs!'
                            searchKeyword={this.props.searchKeyword}
                            clubs={this.state.followingClubs}
                            filterUmbrellaID={this.state.selectedUmbrella && this.state.selectedUmbrella.id}
                            onSelectClub={this.props.onSelectClub}
                        />
                }
                
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
