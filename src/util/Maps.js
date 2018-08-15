import React from 'react';
import CollectionView from '../components/CollectionView';


const mCtC = ({ image, title, tags, tagColor }) => {
    return (
        <div className='club-item'>
            <div className='club-card'>
                <img src={image} alt='club-preview' className='club-card-image'/>

                <h3 className='club-card-title'>{title}</h3>
                <div className='club-card-tags' style={{
                    backgroundColor: tagColor 
                }}>{tags}</div>
            </div>

            <div className='club-card-follow-button'>+ Follow</div>
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
    * @param {Array} clubs The clubs that match the interest. 
    * @param {String} interestColor The color to use on the subtitle label.
    * @param {Number} max The maximum number of items to show. 
    * @param {Function} onSeeMore What to do when you click see more (or see less). */
    mapInterestWithClubsToComponent: (interest, clubs, interestColor, max, onSeeMore) => {
        return (
            <div className='login-club-matches-category-section'>
                <h1 className='login-club-matches-category-section-title'>{interest}</h1>
                <h1 className='login-club-matches-category-section-subtitle'>
                    We found <span style={{ color: interestColor }}>{clubs.length} club(s)</span> that match your interest.
                </h1>

                <CollectionView className='login-club-matches-club-list'
                                orientation={CollectionView.Orientation.vertical}
                                edgeInsets={['20px', '0px', '10px', '0px']}
                                data={
                                    clubs.map((val) => {
                                        return mCtC({ ...val, tagColor: interestColor });
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
    * @param {Object} club The club that is to be displayed. */
    mapClubToComponent: mCtC
}