import Constants from './Constants';

export const getClubThumbnails = (club) => {
  club = club || {};
  return club.picture_url || club.header_graphic || Constants.clubThumbnailDefaultPath;
}
