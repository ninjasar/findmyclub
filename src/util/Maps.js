import React from 'react';
import CollectionView from '../components/CollectionView';
import dateformat from 'dateformat';

// club to card
const mCtC = ({ image, ID, Name, tags, tagColor, followed }, onClubClick, onFollowClick) => {
    return (
        <div className='club-item' key={ID}>
            <div className='club-card'>
                <div className='club-card-top' onClick={() => { onClubClick(ID, Name, tags) }}>
                    <div className='club-card-image-area'>
                        <img src={image} alt='club-preview' className='club-card-image'/>
                    </div>

                    <h3 className='club-card-title'>{Name}</h3>
                    <div className='club-card-tags' style={{
                        backgroundColor: tagColor 
                    }}></div>
                    <p className='club-card-tags-label'>{tags}</p>
                </div>
                <div className='club-card-follow-button' 
                    onClick={() => { onFollowClick(ID, Name, tags) }}
                    style={{
                        color: followed === true ? 'white' : '#330d51',
                        backgroundColor: followed === true ? '#330d51' : 'white'
                    }}>
                    <span className={followed === true ? 'fa fa-check' : 'fa fa-plus'}/> Follow
                </div>
            </div>
        </div>
    )
}

// filter to component
const mFtC = ( { title, checked, interest }, key, onChange) => {
    return (
        <div className='filter-item' key={key}>
            <h2 className='filter-item-title'>{title}</h2>
            <div className={checked === true ? 'filter-item-checkbox-checked' : 'filter-item-checkbox-unchecked'} 
                onClick={() => { onChange(key, interest) }}>
                <span className={checked === true ? 'fa fa-check' : ''}/>
            </div>
        </div>
    )
}





export default {

    /** Maps an interest object to a component.
    * @param {Object} _ The data to populate the component with.
    * @param {Object} props Any other properties that need to be passed to the rendered component. 
    * @param {Function} onClick What should happen when you click on this item. */
    mapInterestToComponent: ({ ID, Name, emoji, selected }, props, onClick) => {
        return <div key={ID} 
                    className={props.className + ' interest-item'}
                    style={{
                        backgroundColor: selected ? '#f3edf7' : 'unset',
                        border: selected ? '2px solid #dfceeb' : 'none'
                    }}
                    onClick={() => {
                        onClick(ID);
                    }}>
            {/* <img src={image} alt='interest-item' className={props.className + ' interest-image'}/> */}
            <div className={`${props.className + ' interest-image-circle'}`}>
            <span className={`${props.className + ' interest-image-emoji'}`}>
                {emoji}
            </span>
            </div>
            <h2 className={props.className + ' interest-title'}>{Name}</h2>
        </div>
    },


    /** Maps an interest to a cell with clubs inside of it.
    * @param {String} interestWithClubs Object where the key is the interest name and the value is array of clubs.
    * @param {Function} onSeeMore What to do when you click see more (or see less).
    * @param {Function} onClubClick What to do when you click the club card.
    * @param {Function} onFollowClick What to do when you click the follow button. */
    mapInterestWithClubsToComponent: (interestWithClubs, onSeeMore, onClubClick, onFollowClick) => {
        const name = interestWithClubs.ID;
        const clubs = interestWithClubs.clubs;
        return (
            <div className='login-club-matches-category-section' key={name}>
                <h1 className='login-club-matches-category-section-title'>{name}</h1>
                <h1 className='login-club-matches-category-section-subtitle'>
                    We found <span style={{ color: 'cyan' }}>{clubs.length} club(s)</span> that match your interest.
                </h1>

                <CollectionView className='login-club-matches-club-list'
                                orientation={CollectionView.Orientation.vertical}
                                edgeInsets={['20px', '0px', '10px', '0px']}
                                data={
                                    clubs.map((val) => {
                                        return mCtC({ ...val, tagColor: 'cyan' }, onClubClick, onFollowClick);
                                    }).filter((_, index, __) => {
                                        return index < 2;
                                    })
                                }/>
                <button className='login-club-matches-see-more-btn'
                        onClick={() => {
                            onSeeMore(clubs);
                        }}>--- See More ---</button>
            </div>
        )
    },


    /** Maps a club to a card style component.
    * @param {Object} club The club that is to be displayed. 
    * @param {String|Number} key The key to use for this list item.
    * @param {Function} onClubClick What to do when you click the club card.
    * @param {Function} onFollowClick What to do when you click the follow button. */
    mapClubToComponent: mCtC,



    /** Maps an interest to section of a collection view that lets you select filters. 
    * @param {String} interest Array of strings with the name of the interest. 
    * @param {String|Number} key The key to use for this list item.
    * @param {Array} filters Array of the names of filters that are associated with this interest.
    * @param {Function} onFilterSelected What to do when you select a filter. */
    mapInterestToFilters: (interest, key, filters, onFilterSelected) => {
        return (
            <div className='login-club-filter-section' key={key}>
                <h1 className='login-club-filter-section-title'>{interest}</h1>

                <CollectionView className='login-club-filter-section-items'
                                orientation={CollectionView.Orientation.vertical}
                                data={
                                    filters.map((val, index) => {
                                        return mFtC(val, index, onFilterSelected);
                                    })
                                }/>
            </div>
        )
    },


    /** Maps a single filter object to a component that can sit inside of the filter section.
    * @param {String} title The title of the filter
    * @param {String|Number} key The key to use for this list item.
    * @param {Bool} checked Whether or not this filter is checked on
    * @param {Function} onChange What to do when the filter is toggled. */
    mapFilterToComponent: mFtC,


    /** Maps an upcoming event object to a component. 
    * @param {Object} _ The event object to use for info gathering.
    * @param {String|Number} key The key used to identify this event component.
    * @param {Function} onClick What to do when an event is clicked. */
    mapEventToComponent: (event, key, onClick) => {
        const { title, location } = event;
        const firestDate = (event.dates || [])[0];
        const starts_at = firestDate && firestDate.starts_at;
        const date = (starts_at && dateformat(starts_at, 'mmm dd')) || '';
        const host = ''; // event.category && event.category.name;
        return (
            <div className='event-item' key={key}>
                <div className='event-left' onClick={() => onClick(title, date, host, key)}>
                    <div className='event-date-area'>
                        <p>{date.split(" ")[0]}</p>
                        <p>{date.split(" ")[1]}</p>
                    </div>
                </div>
                <div className='event-middle' onClick={() => onClick(title, date, host, key)}>
                    <div className='event-info-area'>
                        <p className='event-title'>{title}</p>
                        <p className='event-subtitle'>{host}</p>
                        <p className='event-date'><span className='far fa-clock'/>&nbsp;&nbsp;{date}</p>
                        <p className='event-location'><span className='fas fa-map-marker-alt'/>&nbsp;&nbsp;{location}</p>
                    </div>
                </div>
                <div className='event-right' onClick={() => {
                    console.log('add to calendar');
                }}>
                    <div className='event-calendar-area'>
                        <span className='fas fa-calendar-alt'/>
                        <p className='event-calendar-label'>Add to calendar</p>
                    </div>
                </div>
{/*                 
                <h1 className='event-item-date-1'>{date.split(" ")[0]}</h1>
                <h3 className='event-item-date-2'>{date.split(" ")[1]}</h3>

                <h4 className='event-item-title'>{title}</h4>
                <p className='event-item-host'>Hosted by <span>{host}</span></p> */}
            </div>
        )
    },


    /** Maps a club object to a dashboard component.
    * @param {Object} club The club object with all the data that needs to be displayed.
    * @param {String|Number} key The key for identifying the component in the collection view. 
    * @param {Function} onClick What to do when you click on a club. */
    mapClubToDashboardComponent: ({ Name, tag, image, tagColor, ID }, index, onClick) => {
        return (
            <div className='dashboard-club-item' key={index} onClick={() => { onClick(ID, Name, tag) } }>
                <img src={image} alt='club' className='dashboard-club-item-image'/>
                <h4 className='dashboard-club-item-title'>{Name}</h4>
                <div className='dashboard-club-item-tag'>
                    <div className='dashboard-club-item-tag-bubble'
                        style={{
                            backgroundColor: tagColor
                        }}></div>&nbsp;<p>{tag}</p>
                </div>
            </div>
        )
    },


    /** Maps an umbrella to a component with just at text label. 
    * @param {String} umbrellaName The name of the umbrella.
    * @param {String|Number} key The key for identifying the component in the collection view.
    * @param {Function} onClick What to do when you click the label. */
    mapUmbrellaToLabelComponent: (umbrellaName, key, onClick) => {
        return (
            <div className='dashboard-umbrella-label' key={key} onClick={onClick}>
                {umbrellaName.substring(0, 18) + '...'}
            </div>
        )
    },


    /** Maps an interest to a small component that can be clicked on to show the associated tags. 
    * @param {Object} interest The interest object to display.
    * @param {Function} onClick What to do when you click on this item. */
    mapInterestToProfileComponent: ({ id, title, image }, onClick) => {
        return (
            <div className='profile-interest' onClick={() => { onClick(id, title) }}>
                <img src={image} alt='alt'/>
            </div>
        )
    }

}