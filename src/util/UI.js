import Constants from './Constants';

export const getClubThumbnail = (club) => {
  club = club || {};
  return club.picture_url || club.header_graphic || Constants.clubThumbnailDefaultPath;
}

export const getEventThumbnail = (event) => {
  event = event || {};
  return event.thumbnail_url || Constants.clubThumbnailDefaultPath;
}
