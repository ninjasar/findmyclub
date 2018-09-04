import React, { Component } from 'react';
import _ from 'lodash';

import LoadingBubbles from '../components/LoadingBubbles';
import SelectUmbrella from '../components/SelectUmbrella';
import ClubList from '../components/ClubList';

import '../css/containers/DashboardDiscover.css';

import Networking from '../util/Networking';

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
            allClubs: undefined,

            selectedUmbrella: undefined,
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
                    <SelectUmbrella
                        didSelectUmbrella={this.didSelectUmbrella}
                        selectedUmbrella={this.state.selectedUmbrella}
                    />
                    {/* <button className='dashboard-discover-filter-btn'
                        onClick={this.handleRefine}>
                        <span className='fas fa-sliders-h' />
                    </button> */}
                </div>
                {
                    _.isNil(this.state.allClubs) ?
                        <LoadingBubbles /> :
                        <ClubList
                            emptySubtitle='There are no clubs related to your search.'
                            searchKeyword={this.props.searchKeyword}
                            clubs={this.state.allClubs}
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
