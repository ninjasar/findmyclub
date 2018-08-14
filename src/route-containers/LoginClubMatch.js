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
                category: 'Art',
                title: 'Art Club',
                tags: 'art',
                tagColor: '#3cced9'
            }, {
                category: 'Art',
                title: 'Art Club',
                tags: 'art',
                tagColor: '#3cced9'
            }, {
                category: 'Art',
                title: 'Art Club',
                tags: 'art',
                tagColor: '#3cced9'
            }, {
                category: 'Sports',
                title: 'Basketball',
                tags: 'sports',
                tagColor: '#f5a623'
            }, {
                category: 'Sports',
                title: 'Basketball',
                tags: 'sports',
                tagColor: '#f5a623'
            }, {
                category: 'Sports',
                title: 'Basketball',
                tags: 'sports',
                tagColor: '#f5a623'
            }, {
                category: 'Social',
                title: 'Pi Beta Phi',
                tags: 'greek life',
                tagColor: '#ff7bac'
            }, {
                category: 'Social',
                title: 'Pi Beta Phi',
                tags: 'greek life',
                tagColor: '#ff7bac'
            }, {
                category: 'Social',
                title: 'Pi Beta Phi',
                tags: 'greek life',
                tagColor: '#ff7bac'
            }, {
                category: 'Social',
                title: 'Pi Beta Phi',
                tags: 'greek life',
                tagColor: '#ff7bac'
            }, {
                category: 'Tech',
                title: 'Tech@NYU',
                tags: 'tech',
                tagColor: 'crimson'
            }, {
                category: 'Tech',
                title: 'Tech@NYU',
                tags: 'tech',
                tagColor: 'crimson'
            }, {
                category: 'Tech',
                title: 'Tech@NYU',
                tags: 'tech',
                tagColor: 'crimson'
            }, {
                category: 'Tech',
                title: 'Tech@NYU',
                tags: 'tech',
                tagColor: 'crimson'
            }],

            maxPerCategory: [2, 2, 2, 2]
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
                    <span>{this.state.matchingClubs.length}</span>&nbsp;clubs match your interests perfectly!
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
                                        const maxAt = this.state.maxPerCategory[index];
                                        return Maps.mapInterestWithClubsToComponent(val, clubs, maxAt, (_clubs) => {
                                            const currLen = this.state.maxPerCategory[index];
                                            const longLen = _clubs.length;
                                            const cpy = this.state.maxPerCategory;
                                            cpy[index] = currLen === longLen ? 2 : longLen;
                                            
                                            this.setState({ maxPerCategory: cpy })
                                        });
                                    })
                                }/>

                <button className='round-rect-button login-club-matches-finish-btn'>Finish</button>
                <button className='login-club-matches-skip-btn'>Skip this step</button>
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
