import React, { Component } from 'react';
import _ from 'lodash';
import $ from 'jquery';

import LoadingBubbles from '../components/LoadingBubbles';
import SelectUmbrella from '../components/SelectUmbrella';
import ClubList from '../components/ClubList';

import '../css/containers/DashboardDiscover.css';

import Networking from '../util/Networking';
import Globals from '../util/Globals';

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

    async componentDidMount() {
        await this.reloadClubs();
        document.title = 'Find My Club | Dashboard All NYU';

        if(!this.state.allClubs) {
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

	render() {
		return (
			<div className="DashboardDiscover dashboard-container" style={{
                top: this.props.searchShowing === true ? '108px' : '70px',
                height: this.props.searchShowing === true ? 'calc(100% - 170px)' : 'calc(100% - 120px)'
            }}>
				<div className='dashboard-discover-header'>
                    <h1 className='dashboard-discover-title'
                        role='heading'
                        aria-live='assertive'
                        aria-label='Header: All NYU'
                        tabIndex={0}>All NYU</h1>
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
