import React, { Component } from 'react';
import CollectionView from '../components/CollectionView';
import Maps from '../util/Maps';
import '../css/containers/LoginInterestSelection.css';

class LoginInterestSelection extends Component {

	/****************************
    *                           *
    *            INIT           *
    *                           *
    *****************************/

    constructor(props) {
        super(props);
        this.state = {
            interests: this.populateInterests()
        }
    }


	/****************************
    *                           *
    *           RENDER          *
    *                           *
    *****************************/

	render() {
		return (
			<div className="LoginInterestSelection container">
                <button className='login-interests-info-btn'><span className='far fa-question-circle'/></button>

                <h2 className='login-interests-title'>Tell us what you're into.</h2>
                <p className='login-interests-subtitle'>Tap on as many of your favorite interests.</p>

                <CollectionView className='login-interests-selections'
                                orientation={CollectionView.Orientation.vertical}
                                edgeInsets={['20px', '0px', '20px', '0px']}
                                data={
                                    this.state.interests.map((val) => {
                                        return Maps.mapInterestToComponent(val, 'login-interests');
                                    })
                                }/>

				<button className='round-rect-button login-interests-finish-btn'
                        onClick={this.handleFinishSelectingInterests.bind(this)}>Next</button>
			</div>
		);
	}


	/****************************
    *                           *
    *         FUNCTIONS         *
    *                           *
    *****************************/

    /** Handles the next action when the user is done selecting their interests. */
    handleFinishSelectingInterests() {
        if(this.props.onNext) {
            this.props.onNext();
        }
    }


    /** Sets the state with some interests for the user. */
    populateInterests() {
        return [{
            id: 0,
            title: 'Interest 01',
            image: require('../images/FindMyClub_Logo.svg')
        },{
            id: 1,
            title: 'Interest 02',
            image: require('../images/FindMyClub_Logo.svg')
        },{
            id: 2,
            title: 'Interest 03',
            image: require('../images/FindMyClub_Logo.svg')
        },{
            id: 3,
            title: 'Interest 04',
            image: require('../images/FindMyClub_Logo.svg')
        },{
            id: 4,
            title: 'Interest 05',
            image: require('../images/FindMyClub_Logo.svg')
        },{
            id: 5,
            title: 'Interest 06',
            image: require('../images/FindMyClub_Logo.svg')
        },{
            id: 6,
            title: 'Interest 07',
            image: require('../images/FindMyClub_Logo.svg')
        },{
            id: 7,
            title: 'Interest 08',
            image: require('../images/FindMyClub_Logo.svg')
        },{
            id: 8,
            title: 'Interest 09',
            image: require('../images/FindMyClub_Logo.svg')
        },{
            id: 9,
            title: 'Interest 10',
            image: require('../images/FindMyClub_Logo.svg')
        },{
            id: 10,
            title: 'Interest 11',
            image: require('../images/FindMyClub_Logo.svg')
        },{
            id: 11,
            title: 'Interest 12',
            image: require('../images/FindMyClub_Logo.svg')
        }]
    }



	/****************************
    *                           *
    *           STYLES          *
    *                           *
    *****************************/

}

export default LoginInterestSelection;
