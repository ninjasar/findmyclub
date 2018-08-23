import React, { Component } from 'react';
import CollectionView from '../components/CollectionView';
import Maps from '../util/Maps';
import Networking from '../util/Networking';
import '../css/containers/DashboardDiscover.css';

class DashboardDiscover extends Component {

	/****************************
    *                           *
    *            INIT           *
    *                           *
    *****************************/

    constructor(props) {
        super(props);
        this.state = {
            clubs: [],

            umbrellas: ['College of Arts and Science', 'Tisch School of the Arts', 'Stern School of Business',
                        'Gallatain School of Individualized Studies', 'Tandon School of Engineering',
                        'School of Professional Studies'],
            umbrellaSearchFocused: false
        }
    }

    async componentDidMount() {
        var allClubs = [];

        // Get all the interests, then all those clubs.
        const allItrs = await Networking.getInterests();
        for(var i in allItrs) {
            const clubs = await Networking.getClubs(allItrs[i].ID);
            allClubs = allClubs.concat(clubs);
        }

        // Set the state to all of the clubs.
        allClubs = allClubs.map((val) => {
            return { ...val, image: '', tag: 'art', tagColor: 'cyan' }
        });
        this.setState({ clubs: allClubs });
        console.log(allClubs);
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
                                    this.state.umbrellas.map((val, index) => {
                                        return Maps.mapUmbrellaToLabelComponent(val, index, this.didSelectUmbrella.bind(this));
                                    })
                                }
                                style={{
                                    visibility: this.state.umbrellaSearchFocused === true ? 'visible' : 'hidden'
                                }}/>

                <CollectionView className='dashboard-discover-club-list'
                                orientation={CollectionView.Orientation.vertical}
                                data={
                                    this.state.clubs.map((val) => {
                                        return Maps.mapClubToDashboardComponent(val, this.didSelectClub.bind(this));
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
    didSelectClub(ID, Name, tags) {
        if(this.props.onSelectClub) {
            const items = this.state.clubs;
            const item = items.filter((val) => val.ID === ID)[0];
            this.props.onSelectClub(item);
        }
    }


    /** When you click an umbrella to search through. */
    didSelectUmbrella() {
        console.log('Filtered by umbrella');
    }






	/****************************
    *                           *
    *           STYLES          *
    *                           *
    *****************************/

}

export default DashboardDiscover;
