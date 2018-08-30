import React, { Component } from 'react';
import $ from 'jquery';
import CollectionView from '../components/CollectionView';
import Maps from '../util/Maps';
import Networking from '../util/Networking';
import * as UIUtil from '../util/UI';
import '../css/containers/LoginClubMatch.css';
import { getCategoryFromID, getInterestFromCategory } from '../util/InterestsAndCategories';

class LoginClubMatch extends Component {

	/****************************
    *                           *
    *            INIT           *
    *                           *
    *****************************/

    constructor(props) {
        super(props);
        this.state = {
            clubMatches: props.clubMatches || [],
            clubInterests: props.interests || [],
            // list of club objects
            followingClubs: [],
            thumbnails: [],
            selectedInterest: '',
            selectedClubs: this.props.clubMatches,
            selectedIntersetColor: 'orange',

            clubFilterOveralay: <div></div>
        }
    }

    async componentDidMount() {
        console.log(this.props.clubMatches);

        this.reloadFollowingClubs();
        await this.getClubThumbnail();
    }
    
	/****************************
     *                           *
     *           RENDER          *
     *                           *
     *****************************/
    
    render() {
        const clubComponents = this.state.selectedClubs.map((val) => {
            const followed = this.followingClub(val);
            return Maps.mapClubToComponent({ ...val, image: this.state.thumbnails[val.ID], tagColor: 'cyan', followed },
            () => this.didSelectClubCard(val),
            () => this.didFollowClubCard(val));
        });
		return (
            <div className="LoginClubMatch container">
            {this.state.clubFilterOveralay}
            {/* The see more overlay. */}
            <div className='club-detail-list-view'>
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
                                        data={clubComponents}/>
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
    
        async getClubThumbnail () {
    
            const thumbnails = {};
            const promises = this.state.clubMatches.map(async club => {
                return Networking.getClubInformation(club.ID);
            });

            const results = await Promise.all(promises);

            results.forEach(club => {
                thumbnails[club.id] = UIUtil.getClubThumbnail(club);
            });
    
            this.setState({
                thumbnails,
            });
        }
        
        /** What to do when you click on a club card. */
        didSelectClubCard(club) {
            this.props.onSelectClub && this.props.onSelectClub(club);
        }
        
        
        /** What to do when you click on the follow button for a club card. */
        async didFollowClubCard(club) {
            this.followingClub(club) ? 
                await Networking.unfollowClub(club.ID) :
                await Networking.followClub(club.ID);
            await this.reloadFollowingClubs();
        }
        
    reloadFollowingClubs = async () => {
        this.setState({
            followingClubs: await Networking.getFollowedClubs(),
        });
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

    followingClub = (club) => {
        return this.state.followingClubs.some((cl) => cl.ID === club.ID);
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
        console.log(this.state.clubMatches);
        console.log(this.state.clubInterests);

        // const clubs = this.state.clubMatches.map((val, index) => {
        //     const id = val.CategoryID;
        //     const foundCategory = getCategoryFromID(id);
        //     const foundInterest = getInterestFromCategory(foundCategory.Name);
        //     const name = foundInterest.Name;
        //     return { 
        //         ID: name,
        //         clubs: this.state.clubMatches[index].map((val2) => {
        //             return { ...val2, image: '', tags: 'art', tagColor: 'cyan', followed: false }
        //         })
        //     };
        // });
        // const mapped = clubs.map((val) => {
        //     return Maps.mapInterestWithClubsToComponent(val, (c) => {
        //         this.handleSeeMore(val, c, 'cyan');
        //     }, this.didSelectClubCard.bind(this), this.didFollowClubCard.bind(this));
        // })

        // return mapped;
        return [];
    }

}

export default LoginClubMatch;
