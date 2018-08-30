import React, { Component } from 'react';
import _ from 'lodash';
import CollectionView from '../components/CollectionView';
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
            clubDetails: [],
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
        const { clubDetails } = this.state;
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

                <CollectionView className='dashboard-clubs-club-list'
                    orientation={CollectionView.Orientation.vertical}
                    data={
                        this.state.followingClubs
                            .filter((club) => {
                                if (_.isNil(this.state.selectedUmbrella)) {
                                    return true;
                                }
                                const clubDetail = clubDetails.find((cd) => cd.id == club.ID);
                                return clubDetail && clubDetail.Umbrella.id === this.state.selectedUmbrella.id;
                            })
                            .map((club, index) => {
                                const clubDetail = clubDetails.find((cd) => cd.id == club.ID);
                                const image = UIUtil.getClubThumbnail(clubDetail);
                                return Maps.mapClubToDashboardComponent({ ...club, ...clubDetail, image }, index, () => this.props.onSelectClub(club));
                            })
                    } />
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
        // 1. get all clubs
        const followingClubs = await Networking.getFollowedClubs();
        this.setState({
            followingClubs,
        });

        // 2. fill in club detail objects
        // get them one by one in stead of Promise.all so that don't shoot too much network requrests
        for (const club of followingClubs) {
            if (this.state.clubDetails.some((clb) => clb.id == club.ID)) {
                continue;
            }
            const clubDetail = await Networking.getClubInformation(club.ID);
            this.setState({
                clubDetails: [...this.state.clubDetails, clubDetail],
            });
        }
    }



	/****************************
    *                           *
    *           STYLES          *
    *                           *
    *****************************/

}

export default DashboardClubs;
