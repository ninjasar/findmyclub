import React, { Component } from 'react';
import CollectionView from '../components/CollectionView';
import Maps from '../util/Maps';
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
            clubDetails: [],

            umbrellas: ['College of Arts and Science', 'Tisch School of the Arts', 'Stern School of Business',
                        'Gallatain School of Individualized Studies', 'Tandon School of Engineering',
                        'School of Professional Studies'],
            umbrellaSearchFocused: false
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
                        <span className='fas fa-umbrella'/>&nbsp;All Schools&nbsp;&nbsp;&nbsp;<span className='fa fa-chevron-down'/>
                    </button>
                </div>
                <CollectionView className='dashboard-clubs-umbrellas-list'
                                orientation={CollectionView.Orientation.vertical}
                                data={
                                    this.state.umbrellas.map((val, index) => {
                                        return Maps.mapUmbrellaToLabelComponent(val, index, this.didSelectUmbrella.bind(this));
                                    })
                                }
                                style={{
                                    visibility: this.state.umbrellaSearchFocused === true ? 'visible' : 'hidden'
                                }}/>

                <CollectionView className='dashboard-clubs-club-list'
                                orientation={CollectionView.Orientation.vertical}
                                data={
                                    this.state.followingClubs.map((val, index) => {
                                        const clubDetail = clubDetails.find((cd) => cd.id == val.ID);
                                        const image = clubDetail && (clubDetail.picture_url || clubDetail.header_graphic);
                                        return Maps.mapClubToDashboardComponent({ ...val, ...clubDetail, image }, index, this.didSelectClub.bind(this));
                                    })
                                }/>
			</div>
		);
	}


	/****************************
    *                           *
    *         FUNCTIONS         *
    *                           *
    *****************************/

    /** What to do when you click on a club. */
    didSelectClub(key, title, tag) {
        if(this.props.onSelectClub) {
            const items = this.state.clubs;
            const item = items[key];
            this.props.onSelectClub(item);
        }
    }


    /** When you click an umbrella to search through. */
    didSelectUmbrella() {
        console.log('Filtered by umbrella');
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
