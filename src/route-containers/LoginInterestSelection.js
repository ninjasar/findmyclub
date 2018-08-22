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
                <h2 className='login-interests-title'>What are you most interested in?</h2>

                <CollectionView ref='interests-collection-view'
                                className='login-interests-selections'
                                orientation={CollectionView.Orientation.vertical}
                                edgeInsets={['0px', '0px', '30px', '0px']}
                                isScrollEnabled={false}
                                data={
                                    this.state.interests.map((val) => {
                                        return Maps.mapInterestToComponent(val, 
                                                                        { className: 'login-interests' }, 
                                                                        this.didSelectInterest.bind(this));
                                    })
                                }/>

				<button className='round-rect-button login-interests-finish-btn'
                        onClick={this.handleFinishSelectingInterests.bind(this)}>Get my results</button>
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
            const selected = this.state.interests.filter((val) => val.selected);
            this.props.onNext(selected);
        }
    }


    /** Reloads the collection view when an option is clicked. */
    didSelectInterest(id) {
        // 1.) Get the object at the selected index.
        const data = this.state.interests;
        const selectedObject = data[id];

        // 2.) Update the value of whether or not it was selected.
        selectedObject.selected = selectedObject.selected === true ? false : true;

        // 3.) Set the state again.
        this.setState({ interests: data });
    }


    /** Sets the state with some interests for the user. */
    populateInterests() {
        return [{
            id: 0,
            title: 'Academic',
            image: '📚',
            selected: false
        },{
            id: 1,
            title: 'Community Engagement',
            image: '👥',
            selected: false
        },{
            id: 2,
            title: 'Culture',
            image: '👩',
            selected: false
        },{
            id: 3,
            title: 'Fraternity and Sorority Life',
            image: '🎉',
            selected: false
        },{
            id: 4,
            title: 'Media and Publication',
            image: '📱',
            selected: false
        },{
            id: 5,
            title: 'Health Professions and Clinical Interests',
            image: '❤️',
            selected: false
        },{
            id: 6,
            title: 'Performance and Arts',
            image: '🎨',
            selected: false
        },{
            id: 7,
            title: 'Politics and Advocacy',
            image: '🧠',
            selected: false
        },{
            id: 8,
            title: 'Professional Development',
            image: '👨‍🎓',
            selected: false
        },{
            id: 9,
            title: 'Religion and Spirituality',
            image: '🤷‍♂️',
            selected: false
        },{
            id: 10,
            title: 'Science and Technology',
            image: '💻',
            selected: false
        },{
            id: 11,
            title: 'Self-Identity',
            image: '🙋‍♂️',
            selected: false
        },{
            id: 12,
            title: 'Social',
            image: '💃',
            selected: false
        },{
            id: 13,
            title: 'Sports and Games',
            image: '🏀',
            selected: false
        },{
            id: 14,
            title: 'Student Governance',
            image: '🕴',
            selected: false
        },{
            id: 15,
            title: 'Students with Different Abilities',
            image: '⭐️',
            selected: false
        }]
    }



	/****************************
    *                           *
    *           STYLES          *
    *                           *
    *****************************/

}

export default LoginInterestSelection;
