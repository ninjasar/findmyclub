import React from 'react';
import LazyLoad from 'react-lazyload';
import _ from 'lodash';

import '../css/ClubList.css';

import Maps from '../util/Maps';
import * as UIUtil from '../util/UI';
import EmptyList from '../components/EmptyList';

import Networking from '../util/Networking';
import * as InterestsAndCategories from '../util/InterestsAndCategories';

class Club extends React.Component {
  state = { clubDetail: undefined };

  componentDidMount = () => {
    this.props.onComponentDidMount();
  }

  render() {
    return this.props.children;
  }
}

export default class ClubList extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      // club details, in format of orgsync response
      clubDetails: {},
    };
  }

  renderEmpty = () => {
    return (
      <EmptyList subtitle={this.props.emptySubtitle}/>
    );
  }

  render() {
    const clubsToShow = this.clubsToShow();
    if (_.isEmpty(clubsToShow)) {
      return this.renderEmpty();
    }

    return (
      <div className='club-list'>
        {
          clubsToShow.map((club, index) => {
            const clubDetail = this.state.clubDetails[club.ID];
            const interest = InterestsAndCategories.getInterestFromCategory(clubDetail && clubDetail.category && clubDetail.category.name);
            return (
              <LazyLoad key={club.ID} height={84} overflow>
                <Club club={club} onComponentDidMount={() => this.reloadClubDetail(club.ID)}>
                  {
                    Maps.mapClubToDashboardComponent({
                      ...club,
                      image: UIUtil.getClubThumbnail(this.state.clubDetails[club.ID]),
                    }, interest, index, () => this.props.onSelectClub(club))
                  }
                </Club>
              </LazyLoad>
            );
          })
        }
      </div>
    );
  }

  clubsToShow = () => {
    return UIUtil.filterClubsByKeyword(this.props.clubs, this.props.searchKeyword)
      .filter((club) => {
        if (_.isNil(this.props.filterUmbrellaID)) {
          return true;
        }
        const clubDetail = this.state.clubDetails[club.ID];
        return clubDetail && clubDetail.Umbrella.id === this.props.filterUmbrellaID;
      })
  }

  reloadClubDetail = async (clubID) => {
    if (this.state.clubDetails[clubID]) {
      return;
    }
    const clubDetail = await Networking.getClubInformation(clubID);
    this.setState((state) => ({
      ...state,
      clubDetails: {
        ...state.clubDetails,
        [clubID]: clubDetail,
      },
    }));
  }
}
