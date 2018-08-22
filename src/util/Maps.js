import React from 'react';
import CollectionView from '../components/CollectionView';

// club to card
const mCtC = ({ image, title, tags, tagColor, followed }, key, onClubClick, onFollowClick) => {
    return (
        <div className='club-item' key={key}>
            <div className='club-card'>
                <div className='club-card-top' onClick={() => { onClubClick(key, title, tags) }}>
                    <div className='club-card-image-area'>
                        <img src={image} alt='club-preview' className='club-card-image'/>
                    </div>

                    <h3 className='club-card-title'>{title}</h3>
                    <div className='club-card-tags' style={{
                        backgroundColor: tagColor 
                    }}></div>
                    <p className='club-card-tags-label'>{tags}</p>
                </div>
                <div className='club-card-follow-button' 
                    onClick={() => { onFollowClick(key, title, tags, followed) }}
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
    mapInterestToComponent: ({ id, title, image, selected }, props, onClick) => {
        return <div key={id} 
                    className={props.className + ' interest-item'}
                    style={{
                        backgroundColor: selected ? '#f3edf7' : 'unset',
                        border: selected ? '2px solid #dfceeb' : 'none'
                    }}
                    onClick={() => {
                        onClick(id);
                    }}>
            <img src={image} alt='interest-item' className={props.className + ' interest-image'}/>
            <h2 className={props.className + ' interest-title'}>{title}</h2>
        </div>
    },


    /** Maps an interest to a cell with clubs inside of it.
    * @param {String} interest The name of the interest 
    * @param {String|Number} key The key to use for this list item. 
    * @param {Array} clubs The clubs that match the interest. 
    * @param {String} interestColor The color to use on the subtitle label.
    * @param {Number} max The maximum number of items to show. 
    * @param {Function} onSeeMore What to do when you click see more (or see less).
    * @param {Function} onClubClick What to do when you click the club card.
    * @param {Function} onFollowClick What to do when you click the follow button. */
    mapInterestWithClubsToComponent: (interest, key, clubs, interestColor, max, onSeeMore, onClubClick, onFollowClick) => {
        return (
            <div className='login-club-matches-category-section' key={key}>
                <h1 className='login-club-matches-category-section-title'>{interest}</h1>
                <h1 className='login-club-matches-category-section-subtitle'>
                    We found <span style={{ color: interestColor }}>{clubs.length} club(s)</span> that match your interest.
                </h1>

                <CollectionView className='login-club-matches-club-list'
                                orientation={CollectionView.Orientation.vertical}
                                edgeInsets={['20px', '0px', '10px', '0px']}
                                data={
                                    clubs.map((val, index) => {
                                        return mCtC({ ...val, tagColor: interestColor }, index, onClubClick, onFollowClick);
                                    }).filter((_, index, __) => {
                                        return index < max;
                                    })
                                }/>
                <button className='login-club-matches-see-more-btn'
                        onClick={() => {
                            onSeeMore(clubs);
                        }}>--- See {max === clubs.length ? 'Less' : 'More'} ---</button>
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
    mapEventToComponent: ({ title, date, host, location }, key, onClick) => {
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
    mapClubToDashboardComponent: ({ title, tag, image, tagColor }, key, onClick) => {
        return (
            <div className='dashboard-club-item' key={key} onClick={() => { onClick(key, title, tag) } }>
                <img src={image} alt='club' className='dashboard-club-item-image'/>
                <h4 className='dashboard-club-item-title'>{title}</h4>
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