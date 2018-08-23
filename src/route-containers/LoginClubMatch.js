import React, { Component } from 'react';
import $ from 'jquery';
import CollectionView from '../components/CollectionView';
import Maps from '../util/Maps';
import Networking from '../util/Networking';
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
            /* Of the form:
                {
                    interestID: [Array of Clubs]
                }
            */
            clubMatches: props.clubMatches || {},
            clubInterests: props.interests || {},
        
            selectedInterest: '',
            selectedClubs: [],
            selectedIntersetColor: 'orange',

            clubFilterOveralay: <div></div>
        }
    }

    componentDidMount() {
        console.log(this.props.clubMatches);
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
                {/* The see more overlay. */}
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
                            We found <span style={{ color: 'cyan' }}>{this.state.selectedClubs.length} club(s)</span> that match your interest.
                        </h1>

                        <CollectionView className='club-detail-list-club-list'
                                        ref='club-detail-list-club-list'
                                        orientation={CollectionView.Orientation.vertical}
                                        edgeInsets={['20px', '0px', '20px', '0px']}
                                        data={
                                            this.state.selectedClubs.map((val) => {
                                                return Maps.mapClubToComponent({ ...val, tagColor: 'cyan' }, 
                                                                                this.didSelectClubCard.bind(this),
                                                                                this.didFollowClubCard.bind(this));
                                            })
                                        }/>
                        </div>
                    </div>


                {/* The actual club matches page. */}
                <div className='login-club-matches-header'>
                    <h1 className='login-club-matches-title'>
                        {/* <span>{this.state.matchingClubs.length}</span>&nbsp;clubs match your interests perfectly! */}
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
                                        this.populateClubs()
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
    didSelectClubCard(ID, Name, tags) {
        if(this.props.onSelectClub) {
            const clubs = Object.values(this.state.clubMatches).map((val) => val);
            const flat = clubs.reduce((acc, x) => acc.concat(x));
            const _item = flat.filter((val) => val.ID === ID)[0];
            const item = { ..._item, image: '', tags: 'art', tagColor: 'cyan', followed: false };
            this.props.onSelectClub(item);
        }
    }


    /** What to do when you click on the follow button for a club card. */
    didFollowClubCard(ID, Name, tags) {
        console.log(ID);
        Networking.followClub(ID);
    }


    /** Shows a view that has all of the clubs related to a particular interest. 
    * @param {String} interestWithClubs The name and clubs associated with a category.
    * @param {String} interestColor The color of the interest highlighting. */
    handleSeeMore(interestWithClubs, interestColor) {
        $('.club-detail-list-view').css('visibility', 'visible');
        this.setState({
            selectedClubs: interestWithClubs.clubs,
            selectedInterest: interestWithClubs.ID,
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
    *           OTHER           *
    *                           *
    *****************************/

    populateClubs() {
        const clubs = Object.keys(this.state.clubMatches).map((val) => {
            const name = this.state.clubInterests[val];
            return { 
                ID: name,
                clubs: this.state.clubMatches[val].map((val2) => {
                    return { ...val2, image: '', tags: 'art', tagColor: 'cyan', followed: false }
                })
            };
        });
        const mapped = clubs.map((val) => {
            return Maps.mapInterestWithClubsToComponent(val, (c) => {
                this.handleSeeMore(val, c, 'cyan');
            }, this.didSelectClubCard.bind(this), this.didFollowClubCard.bind(this));
        })

        return mapped;
    }

}

export default LoginClubMatch;
