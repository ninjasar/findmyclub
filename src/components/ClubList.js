import React from 'react';
import LazyLoad from 'react-lazyload';
import _ from 'lodash';
import '../css/ClubList.css';

import Maps from '../util/Maps';
import Networking from '../util/Networking';
import * as InterestsAndCategories from '../util/InterestsAndCategories';
import * as UIUtil from '../util/UI';

export default class ClubList extends React.Component {
  props = {
    clubs: [],
    filterUmbrellaID: undefined,
  };

  state = {
    // club details, in format of orgsync response
    clubDetails: {},
  };

  componentDidUpdate(prevProps) {
    if (prevProps === this.props) {
      return;
    }
    const oldClubsIndexed = { };
    (prevProps.clubs || []).forEach((club) => { oldClubsIndexed[club.ID] = club });
    const newClubs = this.props.clubs.filter((club) => !oldClubsIndexed[club.ID]);
    this.reloadClubDetails(newClubs);
  }

  render() {
    return (
      <div className='club-list'>
        {
          this.clubsToShow().map((club, index) => {
            const clubDetail = this.state.clubDetails[club.ID];
            const interest = InterestsAndCategories.getInterestFromCategory(clubDetail && clubDetail.category && clubDetail.category.name);
            return (
              <LazyLoad key={club.ID} height={84} overflow>
                {
                  Maps.mapClubToDashboardComponent({
                    ...club,
                    image: UIUtil.getClubThumbnail(this.state.clubDetails[club.ID]),
                  }, interest, index, () => this.props.onSelectClub(club))
                }
              </LazyLoad>
            );
          })
        }
      </div>
    );
  }

  clubsToShow = () => {
    return this.props.clubs
      .filter((club) => {
        if (_.isNil(this.props.filterUmbrellaID)) {
          return true;
        }
        const clubDetail = this.state.clubDetails[club.ID];
        return clubDetail && clubDetail.Umbrella.id === this.props.filterUmbrellaID;
      })
  }

  reloadClubDetails = (clubs) => {
    clubs.forEach(async (club) => {
      if (this.state.clubDetails[club.ID]) {
        return;
      }
      const clubDetail = await Networking.getClubInformation(club.ID);
      this.setState((state) => ({
        ...state,
        clubDetails: {
          ...state.clubDetails,
          [club.ID]: clubDetail,
        },
      }));
    });
  }
}
