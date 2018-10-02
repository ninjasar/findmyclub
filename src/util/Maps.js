import $ from 'jquery';
import React from 'react';
import CollectionView from '../components/CollectionView';
import dateformat from 'dateformat';
import * as UIUtil from '../util/UI';
import EmptyList from '../components/EmptyList';

// club to card
const mCtC = ({ image, ID, Name, tags, tagColor, followed, interest }, onClubClick, onFollowClick, overlayShowing) => {
    return (
        <div className='club-item'  key={ID}>
            <div className='club-card'
            // tabIndex={overlayShowing ? - 1 : 0}
            >
                <div className='club-card-top'
                    onClick={() => { onClubClick({ ID, Name, tags,
                        image, tagColor, followed,
                        interest })
                    }}
                    tabIndex={overlayShowing ? - 1 : 0}
                    role='button' aria-label={`Club Title is ${Name}.
                                                                    The associated interest is ${interest}.`}>
                    <div className='club-card-image-area' aria-hidden={true}>
                        <img src={image} alt='' className='club-card-image'/>
                    </div>

                    <h3 className='club-card-title' aria-hidden={true}>{Name.substring(0, 30)}{Name.length > 30 && '...'}</h3>
                    <div className='club-card-tags' style={{
                        backgroundColor: tagColor
                    }} aria-hidden={true}></div>
                    <p className='club-card-tags-label' aria-hidden={true}>{interest}</p>
                </div>
                <div className='club-card-follow-button'
                   tabIndex={overlayShowing ? - 1 : 0}
                    aria-hidden={true}
                    onClick={() => { onFollowClick({ ID, Name, tags,
                                                    image, tagColor, followed,
                                                    interest }) }}
                    style={{
                        color: followed === true ? 'white' : '#330d51',
                        backgroundColor: followed === true ? '#330d51' : 'white'
                    }}>
                    <span aria-hidden={true} className={followed === true ? 'fa fa-check' : 'fa fa-plus'} /> {followed === true ? 'Followed' : 'Follow' }
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
            <div tabIndex={0}
                className={checked === true ? 'filter-item-checkbox-checked' : 'filter-item-checkbox-unchecked'}
                role='button'
                aria-label={`Filter Name: ${title} is ${checked === true ? 'selected' : 'not selected'}`}
                onClick={() => { onChange(title) }}>
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
                    }}
                    role='button' aria-label={`
                        Interest Name is ${Name}, This Interest is ${selected === true ? '' : 'not'} selected
                    `}
                    tabIndex={0}>
            {/* <img src={image} alt='interest-item' className={props.className + ' interest-image'}/> */}
            <div className={`${props.className + ' interest-image-circle'}`} aria-hidden='true'>
            <span className={`${props.className + ' interest-image-emoji'}`} aria-hidden='true'>
                {emoji}
            </span>
            </div>
            <h2 className={props.className + ' interest-title'} aria-hidden='true'>{Name}</h2>
        </div>
    },


    /** Maps an interest to a cell with clubs inside of it.
    * @param {Object} interest The interest that you want to create a component for.
    * @param {Array} clubs The clubs that match the interest.
    * @param {Function} onSeeMore What to do when you click see more (or see less).
    * @param {Function} onClubClick What to do when you click the club card.
    * @param {Function} onFollowClick What to do when you click the follow button.
    * @param {Bool} overlayShowing Whether or not an overlay is currently showing. */
    mapInterestWithClubsToComponent: (interest, clubs, onSeeMore, onClubClick, onFollowClick, overlayShowing) => {
        const name = interest.Name;
        return (
            <div className='login-club-matches-category-section' key={name}>
                <h1 className='login-club-matches-category-section-title'
                    role='region' aria-label={`Interest Title: ${name}`}
                    onClick={() => { document.getElementsByClassName('login-club-matches-category-section-title')[0].blur(); }}>
                    {name}
                </h1>
                <h1 className='login-club-matches-category-section-subtitle'
                    role='region'
                    aria-label={`We found ${clubs.length} club(s) that match your interest.`} >
                    We found <span aria-hidden={true} style={{ color: '#8061DB' }}>{clubs.length} club(s)</span> that match your interest.
                </h1>

                <CollectionView className='login-club-matches-club-list'
                                orientation={CollectionView.Orientation.vertical}
                                edgeInsets={['20px', '0px', '10px', '0px']}
                                emptyDataView={<EmptyList />}
                                data={
                                    clubs.map((club) => {
                                        return mCtC({ ...club }, onClubClick, onFollowClick);
                                    })
                                }/>

                {/* {clubs.length > 0 ? <button className='login-club-matches-see-more-btn'
                        onClick={() => {
                            onSeeMore(clubs);
                        }}>--- See More ---</button> : <div></div>} */}
            </div>
        )
    },


    /** Maps a club to a card style component.
    * @param {Object} club The club that is to be displayed.
    * @param {String|Number} key The key to use for this list item.
    * @param {Function} onClubClick What to do when you click the club card.
    * @param {Function} onFollowClick What to do when you click the follow button.
    * @param {Bool} overlayShowing Whether or not an overlay is currently showing. */
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
                                    filters.map((filt, index) => {
                                        return mFtC(filt, index, onFilterSelected);
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
    * @param {Function} onClick What to do when an event is clicked.
    * @param {Bool} overlayShowing Whether or not an overlay is currently showing. */
    mapEventToComponent: (event, key, onClick, overlayShowing) => {
        console.log(event)
        const { title } = event;
        const firestDate = (event.dates || [])[0];
        const starts_at = firestDate && firestDate.starts_at;
        const date = (starts_at && dateformat(starts_at, 'dd mmm')) || '';
        const time = (starts_at && dateformat(starts_at, 'HH:MM')) || '';
        const host = event.host; // event.category && event.category.name;
        console.log(event);
        return (
            <div className='event-item' key={key}>
                <div className='event-left' onClick={() => onClick(title, date, host, key)}
                    tabIndex={overlayShowing ? - 1 : 0}
                    role='button'
                    aria-live='polite'
                    aria-label={`
                        Event called ${title}. This event is hosted by ${host} and takes place ${time}.
                    `}>
                    <div className='event-date-area'>
                        <p tabIndex={overlayShowing ? - 1 : 0}>{date.split(" ")[0]}</p>
                        <p tabIndex={overlayShowing ? - 1 : 0}>{date.split(" ")[1]}</p>
                    </div>
                </div>
                <div className='event-middle' onClick={() => onClick(title, date, host, key)}>
                    <div className='event-info-area'>
                        <p tabIndex={overlayShowing ? - 1 : 0} className='event-title'>{title}</p>
                        <p tabIndex={overlayShowing ? - 1 : 0} className='event-subtitle'>{host}</p>
                        <p tabIndex={overlayShowing ? - 1 : 0} className='event-date'><span className='far fa-clock'/>&nbsp;&nbsp;{time}</p>
                    </div>
                </div>
                <div className='event-right' onClick={() => {
                }}>
                    <div tabIndex={overlayShowing ? - 1 : 0}
                        role='button'
                        aria-live='polite'
                        aria-label={`Click to add the event ${title} to calendar.`}
                        className='event-calendar-area'
                        onClick={() => event && UIUtil.exportEventToICal(event)}>
                        <span className='fas fa-calendar-alt'/>
                        <p className='event-calendar-label'>Add to Calendar</p>
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
    * @param {Function} onClick What to do when you click on a club.
    * @param {Bool} overlayShowing Whether or not an overlay is currently showing. */
    mapClubToDashboardComponent: ({ Name, image, ID }, interest, index, onClick, overlayShowing) => {
        interest = interest || {};
        return (
            <div className='dashboard-club-item'
                key={index}
                onClick={() => { onClick(ID, Name) } }
                tabIndex={overlayShowing ? -1 : 0}
                // tabIndex={overlayShowing ? -1 : 0}
                role='button'
                aria-label={`
                    Club name is ${Name} and its associated interest is ${interest.interest}.
                `}
                onKeyDown={(e) => {
                    if(e.keyCode === 27) {
                        // Un-focus the selected club item.
                        $('.dashboard-club-item').blur();
                        $('.club-list').blur();
                    }
                }}>
                <img aria-hidden={true} src={image} alt='' className='dashboard-club-item-image'/>
                <div aria-hidden={true} className='dashboard-club-item-vert'>
                    <h4 aria-hidden={true} className='dashboard-club-item-title dashboard-line-clamp' role='link' tabIndex='0'>{Name}</h4>
                    <div aria-hidden={true} className='dashboard-club-item-tag'>
                        <div aria-hidden={true} className='dashboard-club-item-tag-bubble'
                            style={{
                                backgroundColor: interest.interestColor
                            }}></div>&nbsp;<span>{interest.interest}</span>
                    </div>
                </div>
            </div>
        )
    },


    /** Maps an umbrella to a component with just at text label.
    * @param {String} umbrellaName The name of the umbrella.
    * @param {String|Number} key The key for identifying the component in the collection view.
    * @param {Function} onClick What to do when you click the label.
    * @param {Bool} overlayShowing Whether or not an overlay is currently showing. */
    mapUmbrellaToLabelComponent: (umbrellaName, key, onClick, overlayShowing) => {
        return (
            <div className='dashboard-umbrella-label' key={key} onClick={onClick}
                role='button'
                aria-label={umbrellaName}
                tabIndex={overlayShowing ? -1 : 0}>
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
                <img src={image} alt=''/>
            </div>
        )
    }

}
