

const moment = require('moment-timezone');

/**
 * @author Sebastian Pekarek
 * @module ical-generator
 * @class ICalTools
 */
class ICalTools {
    static formatDate(timezone, d, dateonly, floating) {
        const m = timezone ? moment(d).tz(timezone) : moment(d).utc();
        let s = m.format('YYYYMMDD');

        if(!dateonly) {
            s += 'T';
            s += m.format('HHmmss');

            if(!floating) {
                s += 'Z';
            }
        }

        return s;
    }

    // For information about this format, see RFC 5545, section 3.3.5
    // https://tools.ietf.org/html/rfc5545#section-3.3.5
    static formatDateTZ(timezone, property, date, eventData) {
        let tzParam = '';
        let floating = eventData.floating;

        if(eventData.timezone) {
            tzParam = ';TZID=' + eventData.timezone;

            // This isn't a 'floating' event because it has a timezone;
            // but we use it to omit the 'Z' UTC specifier in formatDate()
            floating = true;
        }

        return property + tzParam + ':' + module.exports.formatDate(timezone, date, false, floating);
    }

    static escape(str) {
        return str.replace(/[\\;,"]/g, function(match) {
            return '\\' + match;
        }).replace(/(?:\r\n|\r|\n)/g, '\\n');
    }

    static toJSON(object, attributes, options) {
        const result = {};
        options = options || {};
        options.ignoreAttributes = options.ignoreAttributes || [];
        options.hooks = options.hooks || {};

        attributes.forEach(function(attribute) {
            if(options.ignoreAttributes.indexOf(attribute) !== -1) {
                return;
            }

            let value = object[attribute](),
                newObj;

            if(moment.isMoment(value)) {
                value = value.toJSON();
            }
            if(options.hooks[attribute]) {
                value = options.hooks[attribute](value);
            }
            if(!value) {
                return;
            }

            result[attribute] = value;

            if(Array.isArray(result[attribute])) {
                newObj = [];
                result[attribute].forEach(function(object) {
                    newObj.push(object.toJSON());
                });
                result[attribute] = newObj;
            }
        });

        return result;
    }

    static foldLines(input) {
        return input.split('\r\n').map(function(line) {
            return line.match(/(.{1,74})/g).join('\r\n ');
        }).join('\r\n');
    }
}

module.exports = ICalTools;
