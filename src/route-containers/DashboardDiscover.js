import React, { Component } from 'react';
import _ from 'lodash';

import CollectionView from '../components/CollectionView';
import ClubList from '../components/ClubList';
import '../css/containers/DashboardDiscover.css';
import * as InterestsAndCategories from '../util/InterestsAndCategories';
import Networking from '../util/Networking';
import Maps from '../util/Maps';

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
                                        return Maps.mapUmbrellaToLabelComponent(umbrella.name, index, () => this.didSelectUmbrella(umbrella));
                                    })
                                }
                                style={{
                                    visibility: this.state.umbrellaSearchFocused === true ? 'visible' : 'hidden'
                                }}/>

                <ClubList
                    emptySubtitle='There are no clubs related to your search.'
                    searchKeyword={this.props.searchKeyword}
                    clubs={this.state.allClubs}
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

    reloadClubs = async () => {
        const allCategories = await Networking.getCategories();
        this.setState({
            allCategories,
        });

        const allClubs = await Networking.getClubs(_.map(allCategories, 'ID'));
        allClubs.sort();

        this.setState({
            allClubs,
        });
    }


	/****************************
    *                           *
    *           STYLES          *
    *                           *
    *****************************/

}

export default DashboardDiscover;
