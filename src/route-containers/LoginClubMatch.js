import React, { Component } from 'react';
import CollectionView from '../components/CollectionView';
import Maps from '../util/Maps';
import '../css/containers/LoginClubMatch.css';

class LoginClubMatch extends Component {

	/****************************
    *                           *
    *            INIT           *
    *                           *
    *****************************/

    constructor(props) {
        super(props);
        
        this.state = {
            selectedInterests: props.selectedInterests || ['Art', 'Sports', 'Social', 'Tech'],
            matchingClubs: props.matchingClubs || [{
                category: 'Art'
            }, {
                category: 'Art'
            }, {
                category: 'Art'
            }, {
                category: 'Sports'
            }, {
                category: 'Sports'
            }, {
                category: 'Sports'
            }, {
                category: 'Social'
            }, {
                category: 'Social'
            }, {
                category: 'Social'
            }, {
                category: 'Social'
            }, {
                category: 'Tech'
            }, {
                category: 'Tech'
            }, {
                category: 'Tech'
            }, {
                category: 'Tech'
            }]
        }
    }


	/****************************
    *                           *
    *           RENDER          *
    *                           *
    *****************************/

	render() {
		return (
			<div className="LoginClubMatch container">
				<h1 className='login-club-matches-title'>
                    <span>{this.state.matchingClubs.length}</span>&nbsp;
                    clubs match your interests perfectly!
                </h1>
                <p className='login-club-matches-subtitle'>Find out more about these by clicking on them!</p>

                <button className='pill-button filter-button'>
                    Still overwhelmed? Let's get refined. <span className='fas fa-filter'></span>
                </button>

                <CollectionView className='login-interests-selections'
                                orientation={CollectionView.Orientation.vertical}
                                edgeInsets={['20px', '0px', '30px', '0px']}
                                isScrollEnabled={false}
                                data={
                                    this.state.selectedInterests.map((val, index) => {
                                        const clubs = this.state.matchingClubs.filter((val2) => val2.category === val);
                                        return Maps.mapInterestWithClubsToComponent(val, clubs);
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





	/****************************
    *                           *
    *           STYLES          *
    *                           *
    *****************************/

}

export default LoginClubMatch;
