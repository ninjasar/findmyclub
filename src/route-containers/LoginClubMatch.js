import React, { Component } from 'react';
import $ from 'jquery';
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
            interestColors: ['#3cced9', '#f5a623', '#ff7bac', 'crimson'],
            matchingClubs: props.matchingClubs || [{
                category: 'Art',
                title: 'Art Club',
                tags: 'art',
                followed: false
            }, {
                category: 'Art',
                title: 'Art Club',
                tags: 'art',
                followed: false
            }, {
                category: 'Art',
                title: 'Art Club',
                tags: 'art',
                followed: false
            }, {
                category: 'Sports',
                title: 'Basketball',
                tags: 'sports',
                followed: false
            }, {
                category: 'Sports',
                title: 'Basketball',
                tags: 'sports',
                followed: false
            }, {
                category: 'Sports',
                title: 'Basketball',
                tags: 'sports',
                followed: false
            }, {
                category: 'Social',
                title: 'Pi Beta Phi',
                tags: 'greek life',
                followed: false
            }, {
                category: 'Social',
                title: 'Pi Beta Phi',
                tags: 'greek life',
                followed: false
            }, {
                category: 'Social',
                title: 'Pi Beta Phi',
                tags: 'greek life',
                followed: false
            }, {
                category: 'Social',
                title: 'Pi Beta Phi',
                tags: 'greek life',
                followed: false
            }, {
                category: 'Tech',
                title: 'Tech@NYU',
                tags: 'tech',
                followed: false
            }, {
                category: 'Tech',
                title: 'Tech@NYU',
                tags: 'tech',
                followed: false
            }, {
                category: 'Tech',
                title: 'Tech@NYU',
                tags: 'tech',
                followed: false
            }, {
                category: 'Tech',
                title: 'Tech@NYU',
                tags: 'tech',
                followed: true
            }],

            maxPerCategory: [2, 2, 2, 2],
            
            selectedInterest: '',
            selectedClubs: [],
            selectedIntersetColor: 'orange',

            clubFilterOveralay: <div></div>
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
                {this.state.clubFilterOveralay}
                <div className='club-detail-list-view' style={{ 
                        top: '50%',
                        left: '50%',
                        width: '0px',
                        height: '0px',
                        visibility: 'hidden'
                    }}>
                    <div className='club-detail-header'>
                        <button className='club-detail-list-back-btn'
                                onClick={() => {
                                    this.closeSeeMore();
                                }}><span className='fa fa-chevron-left'/> Go Back</button>
                        <button className='pill-button filter-button club-detail-list-filter-btn'
                                onClick={() => {
                                    if(this.props.onRefine) {
                                        this.props.onRefine();
                                    }
                                }}>
                            <p>Refine<span className='fas fa-sliders-h'></span></p>
                        </button>
                    </div>

                    <div className='club-detail-body'>
                        <h1 className='club-detail-list-section-title'>{this.state.selectedInterest}</h1>
                        <h1 className='club-detail-list-section-subtitle'>
                            We found <span style={{ color: this.state.selectedIntersetColor }}>{this.state.selectedClubs.length} club(s)</span> that match your interest.
                        </h1>

                        <CollectionView className='club-detail-list-club-list'
                                        ref='club-detail-list-club-list'
                                        orientation={CollectionView.Orientation.vertical}
                                        edgeInsets={['20px', '0px', '20px', '0px']}
                                        data={
                                            this.state.selectedClubs.map((val, index) => {
                                                return Maps.mapClubToComponent({ ...val, tagColor: this.state.selectedIntersetColor }, 
                                                                                index,
                                                                                this.didSelectClubCard.bind(this),
                                                                                (key, title, tags, followed) => {
                                                                                    const n = this.didFollowClubCard(key, title, tags, followed);
                                                                                    this.setState({ selectedClubs: n }, () => {
                                                                                        this.forceUpdate();
                                                                                    })
                                                                                });
                                            })
                                        }/>
                        </div>
                    </div>

                <div className='login-club-matches-header'>
                    <h1 className='login-club-matches-title'>
                        <span>{this.state.matchingClubs.length}</span>&nbsp;clubs match your interests perfectly!
                    </h1>
                    <p className='login-club-matches-subtitle'>Find out more about these by clicking on them!</p>

                    <p className='login-club-matches-button-title'>Still feeling overwhelmed?</p>
                    <button className='pill-button filter-button'
                            onClick={() => {
                                if(this.props.onRefine) {
                                    this.props.onRefine();
                                }
                            }}>
                        <p>Refine your search&nbsp;<span className='fas fa-sliders-h'></span></p>
                    </button>
                </div>

                <div className='login-club-matches-body'>
                    <CollectionView className='login-club-matches-list'
                                    ref='login-club-matches-list'
                                    orientation={CollectionView.Orientation.vertical}
                                    edgeInsets={['20px', '0px', '30px', '0px']}
                                    isScrollEnabled={false}
                                    data={
                                        this.state.selectedInterests.map((val, index) => {
                                            const clubs = this.state.matchingClubs.filter((val2) => val2.category === val);
                                            const maxAt = this.state.maxPerCategory[index];
                                            const tagColor = this.state.interestColors[index];

                                            return Maps.mapInterestWithClubsToComponent(val, index, clubs, tagColor, maxAt, (c) => {
                                                this.handleSeeMore(val, c, tagColor);
                                            }, 
                                            this.didSelectClubCard.bind(this), this.didFollowClubCard.bind(this));
                                        })
                                    }/>

                    <button className='round-rect-button login-club-matches-finish-btn'
                            onClick={() => {
                                if(this.props.onNext) {
                                    this.props.onNext();
                                }
                            }}>Finish</button>
                    <button className='login-club-matches-skip-btn'
                            onClick={() => {
                                if(this.props.onNext) {
                                    this.props.onNext();
                                }
                            }}>Skip this step</button>
                </div>
			</div>
		);
	}






	/****************************
    *                           *
    *         FUNCTIONS         *
    *                           *
    *****************************/

    /** What to do when you click on a club card. */
    didSelectClubCard(key, title, tags) {
        if(this.props.onSelectClub) {
            const items = this.state.matchingClubs.filter((val) => val.tags === tags);
            const item = items[key];
            this.props.onSelectClub(item);
        }
    }


    /** What to do when you click on the follow button for a club card. */
    didFollowClubCard(key, title, tags, followed) {
        // Update the item in the state.
        const items = this.state.matchingClubs.filter((val) => val.tags === tags);
        const selected = items[key];

        const correctIndex = this.state.matchingClubs.indexOf(selected);
        selected.followed = !selected.followed;
        const n = this.state.matchingClubs;
        n[correctIndex] = selected;
        this.setState({ matchingClubs: n });

        // Update the data in the list.
        const list = this.refs['login-club-matches-list'];
        const newData = this.state.selectedInterests.map((val, index) => {
            const clubs = this.state.matchingClubs.filter((val2) => val2.category === val);
            const maxAt = this.state.maxPerCategory[index];
            const tagColor = this.state.interestColors[index];

            return Maps.mapInterestWithClubsToComponent(val, index, clubs, tagColor, maxAt, (c) => {
                this.handleSeeMore(val, c, tagColor);
            }, 
            this.didSelectClubCard.bind(this), this.didFollowClubCard.bind(this));
        })

        list.reloadData(newData);
        console.log(list);
        return n.filter((val) => val.tags === tags);
    }


    /** Shows a view that has all of the clubs related to a particular interest. 
    * @param {String} interest The name of the interest.
    * @param {Array} clubs The full list of clubs related to particualr interest.
    * @param {String} interestColor The color of the interest highlighting. */
    handleSeeMore(interest, clubs, interestColor) {
        $('.club-detail-list-view').css('visibility', 'visible');
        this.setState({
            selectedClubs: clubs,
            selectedInterest: interest,
            selectedIntersetColor: interestColor,
        }, () => {
            $('.club-detail-list-view').animate({
                opacity: 1,
                top: '0px',
                left: '0px',
                width: '100%',
                height: '100%',
            }, '0.2s', () => {
                
            });
        });
    }


    /** Hides the see more view. */
    closeSeeMore() {
        $('.club-detail-list-view').animate({
            opacity: 0,
            top: '50%',
            left: '50%',
            width: '0px',
            height: '0px',
        }, '0.3s', () => {
            $('.club-detail-list-view').css('visibility', 'hidden');
            this.setState({
                selectedClubs: [],
                selectedInterest: '',
                selectedIntersetColor: ''
            });
        })
    }





	/****************************
    *                           *
    *           STYLES          *
    *                           *
    *****************************/



    /****************************
    *                           *
    *          OVERLAY          *
    *                           *
    *****************************/

}

export default LoginClubMatch;
