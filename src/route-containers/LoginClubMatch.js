import React, { Component } from 'react';
import CollectionView from '../components/CollectionView';
import Maps from '../util/Maps';
import Networking from '../util/Networking';
import * as UIUtil from '../util/UI';
import ReactGA from 'react-ga';
import GACat from '../util/GACategories';
import '../css/containers/LoginClubMatch.css';

const TALL_HEADER = '140px'
const SHORT_HEADER = '75px'

const ClubMatchesHeader = ({ selectedClubs, onRefine, isScrolled, handleGoBack }) =>
    <div style={{ height: isScrolled ? SHORT_HEADER : TALL_HEADER }}
        className='login-club-matches-header'>
        {!isScrolled &&
            <div style={{ height: isScrolled ? '0' : TALL_HEADER }}
                className='login-club-matches-header-tall'>
                <h1 className='login-club-matches-title' role='region' aria-live='polite' aria-label={`${selectedClubs.length} clubs match your interests!`}>
                    <span>{selectedClubs.length}</span>&nbsp;clubs match your interests!
                    </h1>
                <button className='pill-button filter-button club-detail-list-filter-btn'
                    onClick={() => {
                        if (onRefine) {
                            onRefine();
                        }
                    }}
                    role='button'
                    aria-live='assertive'
                    aria-label='Refine Button: Click to refine your search button'>
                    <p>Refine your search<span className='fas fa-sliders-h'></span></p>
                </button>
            </div>
        }
        
        <div className='login-club-matches-header-short' role='button' aria-label='Back Button: Click to go back to the interests selection page'>
            <span aria-hidden={true} onClick={handleGoBack} className='login-club-matches-go-back'>
                <span aria-hidden={true} className='fa fa-chevron-left' />&nbsp; Go back
    </span>
            <button className='pill-button filter-button-sm'
                onClick={() => {
                    if (onRefine) {
                        onRefine();
                    }
                }}
                role='button'
                aria-live='assertive'
                aria-label='Refine Button: Click to refine your search button'
                tabIndex={isScrolled ? 0 : 1}>
                Refine&nbsp;<span className='fas fa-sliders-h'></span>
            </button>
        </div>

    </div>

class LoginClubMatch extends Component {

	/****************************
    *                           *
    *            INIT           *
    *                           *
    *****************************/

    constructor(props) {
        super(props);
        this.state = {
            selectedClubs: props.selectedClubs || [],
            clubMatches: props.clubMatches || [],
            clubInterests: props.interests || [],
            isScrolled: false,
            // list of club objects
            followingClubs: [],
            thumbnails: [],
            selectedInterest: '',
            selectedIntersetColor: 'orange',
            clubFilterOverlay: <div></div>
        }
    }

    async componentDidMount() {
        this.reloadFollowingClubs();
        // await this.getClubThumbnail();
        this.setState({ thumbnails: this.props.thumbnails || [] });

        document.title = 'Find My Club | Club Matches';
    }

    handleScroll = (e) => {
        const scrollTop = e.target.scrollTop
        const isScrolled = this.state.isScrolled
        if (scrollTop > 100 && !isScrolled) {
            this.setState({ isScrolled: true })
        } else if (scrollTop <= 100 && isScrolled) {
            this.setState({ isScrolled: false })
        }
    }

	/****************************
     *                           *
     *           RENDER          *
     *                           *
     *****************************/

    render() {
        // const clubComponents = this.props.selectedClubs.map((club) => {
        //     const followed = this.followingClub(club);
        //     return Maps.mapClubToComponent({ ...club, image: this.state.thumbnails[club.ID] || require("../util/Constants").default.clubThumbnailDefaultPath, tagColor: club.interestColor, followed },
        //     () => this.didSelectClubCard(club),
        //     () => this.didFollowClubCard(club));
        // });
        const clubComponents = this.state.clubInterests.map((interest) => {
            // Get the clubs that match the interest.
            const clubs = this.props.selectedClubs.filter((club) => {
                return club.interestID === interest.ID;
            }).map((club) => {
                const followed = this.followingClub(club);
                return {
                    ...club,
                    followed: followed,
                    tagColor: interest.Color,
                    image: this.state.thumbnails[club.ID] || require("../util/Constants").default.clubThumbnailDefaultPath,
                }
            })

            return Maps.mapInterestWithClubsToComponent(interest, clubs,
                () => { console.log('See More') },
                this.didSelectClubCard.bind(this),
                this.didFollowClubCard.bind(this));
        });

        return (
            <div className="LoginClubMatch container"
                onScroll={this.handleScroll} >
                {this.state.clubFilterOverlay}
                {/* The see more overlay. */}
                <div className='club-detail-list-view' >
                    <div className='club-detail-body' role='region' aria-live='assertive'>
                        <CollectionView
                            className='club-detail-list-club-list'
                            ref='club-detail-list-club-list'
                            orientation={CollectionView.Orientation.vertical}
                            edgeInsets={['150px', '0', '0', '0']}
                            data={clubComponents}
                        />
                    </div>
                </div>


                {/* The actual club matches page. */}
                <ClubMatchesHeader
                    selectedClubs={this.props.selectedClubs}
                    isScrolled={this.state.isScrolled}
                    onRefine={this.props.onRefine}
                    handleGoBack={this.handleGoBack}
                />
                {/* <div className='login-club-matches-header'>
                    <h1 className='login-club-matches-title'>
                        {<span>{this.props.selectedClubs.length}</span>}&nbsp;clubs match your interests!
                    </h1>
                    <button className='pill-button filter-button club-detail-list-filter-btn'
                        onClick={() => {
                            if (this.props.onRefine) {
                                this.props.onRefine();
                            }
                        }}>
                        <p>Refine your search<span className='fas fa-sliders-h'></span></p>
                    </button>
                </div> */}
                <div className='login-club-matches-body'>

                    <button
                        role='button'
                        aria-live='polite'
                        aria-label='Click to Finish Selecting Clubs'
                        className='bottom-rect-button login-club-matches-finish-btn'
                        onClick={() => {
                            if (this.props.onNext) {
                                this.props.onNext();
                            }
                        }}>
                        Finish
                    </button>
                    { /*
                        <button className='login-club-matches-skip-btn'
                        onClick={() => {
                                    if(this.props.onNext) {
                                        this.props.onNext();
                                    }
                                }}>Skip this step
                    </button> */ }
                </div>
            </div>
        );
    }






    /****************************
     *                           *
     *         FUNCTIONS         *
     *                           *
     *****************************/

    async getClubThumbnail() {

        const thumbnails = {};
        const promises = this.props.selectedClubs.map(async club => {
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
        this.followingClub(club) ? await Networking.unfollowClub(club.ID) : await Networking.followClub(club.ID);
        await this.reloadFollowingClubs();

        // Send to GA.
        if (this.followingClub(club)) {
            ReactGA.event({
                category: GACat.FollowedClub,
                action: `User followed the club: ${club.Name}`,
                label: club.Name
            });
        } else {
            ReactGA.event({
                category: GACat.UnfollowedClub,
                action: `User unfollowed the club: ${club.Name}`,
                label: club.Name
            });
        }
    }

    reloadFollowingClubs = async () => {
        this.setState({
            followingClubs: await Networking.getFollowedClubs(),
        });
    }

    handleGoBack = () => {
        window.location.href = '/';
    }

    // /** Shows a view that has all of the clubs related to a particular interest. 
    // * @param {String} interestWithClubs The name and clubs associated with a category.
    // * @param {String} interestColor The color of the interest highlighting. */
    // handleSeeMore(interestWithClubs, interestColor) {
    //     $('.club-detail-list-view').css('visibility', 'visible');
    //     this.setState({
    //         selectedClubs: interestWithClubs.clubs,
    //         selectedInterest: interestWithClubs.ID,
    //         selectedIntersetColor: interestColor,
    //     }, () => {
    //         $('.club-detail-list-view').animate({
    //             opacity: 1,
    //             top: '0px',
    //             left: '0px',
    //             width: '100%',
    //             height: '100%',
    //         }, '0.2s', () => {

    //         });
    //     });
    // }


    // /** Hides the see more view. */
    // closeSeeMore() {
    //     $('.club-detail-list-view').animate({
    //         opacity: 0,
    //         top: '50%',
    //         left: '50%',
    //         width: '0px',
    //         height: '0px',
    //     }, '0.3s', () => {
    //         $('.club-detail-list-view').css('visibility', 'hidden');
    //         this.setState({
    //             selectedClubs: [],
    //             selectedInterest: '',
    //             selectedIntersetColor: ''
    //         });
    //     })
    // }

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
