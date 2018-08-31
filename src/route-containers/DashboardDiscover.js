import React, { Component } from 'react';
import _ from 'lodash';
import LazyLoad from 'react-lazyload';

import CollectionView from '../components/CollectionView';
import Maps from '../util/Maps';
import Networking from '../util/Networking';
import '../css/containers/DashboardDiscover.css';
import * as InterestsAndCategories from '../util/InterestsAndCategories';
import * as UIUtil from '../util/UI';

class DashboardDiscover extends Component {

	/****************************
    *                           *
    *            INIT           *
    *                           *
    *****************************/

    constructor(props) {
        super(props);

        this.state = {
            // all categories in format of fmc response
            allCategories: [],

            // list of all clubs, in format of fmc response
            allClubs: [],

            // club details, in format of orgsync response
            clubDetails: {},

            selectedUmbrella: undefined,
            
            currentPage: 0,
            umbrellaSearchFocused: false
        }
    }

    componentDidMount() {
        this.reloadClubs();
    }


	/****************************
    *                           *
    *           RENDER          *
    *                           *
    *****************************/

	render() {
		return (
			<div className="DashboardDiscover dashboard-container">
				<div className='dashboard-discover-header'>
                    <h1 className='dashboard-discover-title'>Discover</h1>
                    <button className='dashboard-discover-umbrella-btn'
                            onFocus={() => {
                                this.setState({ umbrellaSearchFocused: true })
                            }}
                            onBlur={() => {
                                this.setState({ umbrellaSearchFocused: false })
                            }}>
                        <span className='fas fa-umbrella'/>&nbsp;All Schools&nbsp;&nbsp;&nbsp;<span className='fa fa-chevron-down'/>
                    </button>
                    <button className='dashboard-discover-filter-btn'
                            onClick={() => {
                                if(this.props.onRefine) {
                                    this.props.onRefine();
                                }
                            }}>
                        <span className='fas fa-sliders-h'/>
                    </button>
                </div>
                <CollectionView className='dashboard-discover-umbrellas-list'
                                orientation={CollectionView.Orientation.vertical}
                                data={
                                    InterestsAndCategories.umbrellas.map((umbrella, index) => {
                                        return Maps.mapUmbrellaToLabelComponent(umbrella.name, index, this.didSelectUmbrella.bind(this, umbrella));
                                    })
                                }
                                style={{
                                    visibility: this.state.umbrellaSearchFocused === true ? 'visible' : 'hidden'
                                }}/>

                <div className='dashboard-discover-club-list'>
                    {
                        this.filteredClubs().map((club, index) => {
                            const clubDetail = this.state.clubDetails[club.ID];
                            const interest = InterestsAndCategories.getInterestFromCategory(clubDetail && clubDetail.category && clubDetail.category.name);
                            return (
                                <LazyLoad key={club.ID} height={84} overflow>
                                    {
                                        Maps.mapClubToDashboardComponent({
                                            ...club,
                                            image: UIUtil.getClubThumbnail(this.state.clubDetails[club.ID]),
                                        }, interest, index, () => this.props.onSelectClub(club))
                                    }
                                </LazyLoad>
                            );
                        })
                    }
                </div>
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
        this.setState({
            selectedUmbrella: umbrella,
        });
    }

    reloadClubs = async () => {
        const allCategories = await Networking.getCategories();
        this.setState({
            allCategories,
        });

        const allClubsArr = await Promise.all(allCategories.map((cat) => Networking.getClubs(cat.ID)));
        const allClubs = _.flatMap(allClubsArr, (arr) => arr);
        allClubs.sort();

        this.setState({
            allClubs,
        });

        allClubs.forEach(async (club) => {
            const clubDetail = await Networking.getClubInformation(club.ID);
            this.setState((state) => ({
                ...state,
                clubDetails: {
                    ...state.clubDetails,
                    [club.ID]: clubDetail,
                },
            }));
        })
    }

    filteredClubs = () => {
        return this.state.allClubs;
    }


	/****************************
    *                           *
    *           STYLES          *
    *                           *
    *****************************/

}

export default DashboardDiscover;
