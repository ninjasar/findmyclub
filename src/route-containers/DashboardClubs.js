import React, { Component } from 'react';
import _ from 'lodash';
import CollectionView from '../components/CollectionView';
import ClubList from '../components/ClubList';
import Maps from '../util/Maps';
import Networking from '../util/Networking';
import * as UIUtil from '../util/UI';
import * as InterestsAndCategories from '../util/InterestsAndCategories';
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
            umbrellaSearchFocused: false,
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
        const selectedUmbrellaName = this.state.selectedUmbrella ? this.state.selectedUmbrella.name : 'All Schools';
        return (
            <div className="DashboardClubs dashboard-container">
                <div className='dashboard-clubs-header'>
                    <h1 className='dashboard-clubs-title'>My Clubs</h1>
                    <button className='dashboard-clubs-umbrella-btn'
                        onFocus={() => {
                            this.setState({ umbrellaSearchFocused: true })
                        }}
                        onBlur={() => {
                            this.setState({ umbrellaSearchFocused: false })
                        }}>
                        <span className='fas fa-umbrella' />&nbsp;{selectedUmbrellaName}&nbsp;&nbsp;&nbsp;<span className='fa fa-chevron-down' />
                    </button>
                </div>
                <CollectionView className='dashboard-clubs-umbrellas-list'
                    orientation={CollectionView.Orientation.vertical}
                    data={
                        InterestsAndCategories.umbrellas.map((val, index) => {
                            return Maps.mapUmbrellaToLabelComponent(val.name, index, this.didSelectUmbrella.bind(this, val));
                        })
                    }
                    style={{
                        visibility: this.state.umbrellaSearchFocused === true ? 'visible' : 'hidden'
                    }} />

                <ClubList
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
    didSelectUmbrella(umbrella) {
        if (this.state.selectedUmbrella && this.state.selectedUmbrella.id === umbrella.id) {
            this.setState({
                selectedUmbrella: undefined,
            });
        } else {
            this.setState({
                selectedUmbrella: umbrella,
            });   
        }
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
