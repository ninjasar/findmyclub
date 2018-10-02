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
        const followingClubs = await Networking.getFollowedClubs()
        document.title = 'Find My Club | Dashboard Clubs';
        if (!followingClubs || followingClubs.length === 0) {
            this.props.setSearchDisabled(true)
        } else {
            this.props.setSearchDisabled(false)
        }
        this.setState({ followingClubs })
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
            }}>
                <div className='dashboard-clubs-header' tabIndex={-1}>
                    <h1 className='dashboard-clubs-title'
                        aria-label='Header: My Clubs'>My Clubs</h1>

                    <SelectUmbrella
                        overlayShowing={this.props.overlayShowing}
                        didSelectUmbrella={this.didSelectUmbrella}
                        selectedUmbrella={this.state.selectedUmbrella}
                        aria-label='Select which school you would like to search for clubs in'
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

	/****************************
    *                           *
    *           STYLES          *
    *                           *
    *****************************/

}

export default DashboardClubs;
