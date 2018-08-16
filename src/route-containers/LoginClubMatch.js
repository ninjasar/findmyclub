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
            }, {
                category: 'Art',
                title: 'Art Club',
                tags: 'art',
            }, {
                category: 'Art',
                title: 'Art Club',
                tags: 'art',
            }, {
                category: 'Sports',
                title: 'Basketball',
                tags: 'sports'
            }, {
                category: 'Sports',
                title: 'Basketball',
                tags: 'sports',
            }, {
                category: 'Sports',
                title: 'Basketball',
                tags: 'sports',
            }, {
                category: 'Social',
                title: 'Pi Beta Phi',
                tags: 'greek life',
            }, {
                category: 'Social',
                title: 'Pi Beta Phi',
                tags: 'greek life',
            }, {
                category: 'Social',
                title: 'Pi Beta Phi',
                tags: 'greek life'
            }, {
                category: 'Social',
                title: 'Pi Beta Phi',
                tags: 'greek life',
            }, {
                category: 'Tech',
                title: 'Tech@NYU',
                tags: 'tech'
            }, {
                category: 'Tech',
                title: 'Tech@NYU',
                tags: 'tech'
            }, {
                category: 'Tech',
                title: 'Tech@NYU',
                tags: 'tech'
            }, {
                category: 'Tech',
                title: 'Tech@NYU',
                tags: 'tech'
            }],

            maxPerCategory: [2, 2, 2, 2],
            
            clubFilterOveralay: <div></div>,
            clubDetailView: <div ></div>
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
                {this.state.clubDetailView}


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
                    <p>Refine your search <span className='fas fa-filter'></span></p>
                </button>

                <CollectionView className='login-interests-selections'
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

                <button className='round-rect-button login-club-matches-finish-btn'>Finish</button>
                <button className='login-club-matches-skip-btn'>Skip this step</button>
			</div>
		);
	}


    renderClubDetail(interest, clubs, interestColor) {
        return (
            <div className='club-detail-list-view'>
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
                    <p>Refine<span className='fas fa-filter'></span></p>
                </button>

                <h1 className='club-detail-list-section-title'>{interest}</h1>
                <h1 className='club-detail-list-section-subtitle'>
                    We found <span style={{ color: interestColor }}>{clubs.length} club(s)</span> that match your interest.
                </h1>

                <CollectionView className='club-detail-list-club-list'
                                orientation={CollectionView.Orientation.vertical}
                                edgeInsets={['20px', '0px', '20px', '0px']}
                                data={
                                    clubs.map((val, index) => {
                                        return Maps.mapClubToComponent({ ...val, tagColor: interestColor }, 
                                                                        index,
                                                                        this.didSelectClubCard.bind(this),
                                                                        this.didFollowClubCard.bind(this));
                                    })
                                }/>
            </div>
        )
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
    didFollowClubCard(key, title, tags) {
        if(this.props.onFollowClub) {
            const items = this.state.matchingClubs.filter((val) => val.tags === tags);
            const item = items[key];
            this.props.onFollowClub(item);
        }
    }


    /** Shows a view that has all of the clubs related to a particular interest. 
    * @param {String} interest The name of the interest.
    * @param {Array} clubs The full list of clubs related to particualr interest.
    * @param {String} interestColor The color of the interest highlighting. */
    handleSeeMore(interest, clubs, interestColor) {
        this.setState({
            clubDetailView: this.renderClubDetail(interest, clubs, interestColor)
        }, () => {
            $('.club-detail-list-view').css('opacity', '1');
            $('.club-detail-list-view').css('top', '0px');
            $('.club-detail-list-view').css('left', '0px');
            $('.club-detail-list-view').css('width', '100%');
            $('.club-detail-list-view').css('height', '100%');
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
            this.setState({ clubDetailView: <div></div> });
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
