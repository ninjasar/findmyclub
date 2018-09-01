import ical from '../vendor/ical-generator';
import _ from 'lodash';

import Constants from './Constants';

/**
 * try to figure out thumbnail of a club
 * @param {object} event an event object from orgsync api response
 */
export const getClubThumbnail = (club) => {
  club = club || {};
  return club.picture_url || club.header_graphic || Constants.clubThumbnailDefaultPath;
}

/**
 * try to figure out thumbnail of an event
 * @param {object} event an event object from orgsync api response
 */
export const getEventThumbnail = (event) => {
  event = event || {};
  return event.thumbnail_url || Constants.clubThumbnailDefaultPath;
}

/**
 * handle export to calendar thing
 * @param {object} event an event object from orgsync api response
 */
export const exportEventToICal = (event) => {
  const cal = ical({
    domain: 'findmyclub.nyu.edu',
  });
  cal.createEvent({
    start: new Date(event.date.starts_at),
    end: new Date(event.date.ends_at),
    summary: event.title,
    description: event.description,
  });
  const icsContent = cal.toString();
  const element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(icsContent));
  element.setAttribute('download', `${event.title}.ics`);
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}

export const filterEventByKeyword = (events, keyword) => {
  return (events || []).filter((event) => _.includes((event.title || '').toLowerCase(), keyword.toLowerCase()));
}

export const filterClubsByKeyword = (clubs, keyword) => {
  return (clubs || []).filter((club) => _.includes((club.Name || '').toLowerCase(), keyword.toLowerCase()));
}
