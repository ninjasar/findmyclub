import React from 'react';

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
    * @param {Array} clubs The clubs that match the interest. */
    mapInterestWithClubsToComponent: (interest, clubs) => {
        return (
            <div className='login-club-matches-category-section'>
                <h1 className='login-club-matches-category-section-title'>{interest}</h1>
                <h1 className='login-club-matches-category-section-subtitle'>
                    There were <span>{clubs.length} club(s)</span> that match your interest.
                </h1>
            </div>
        )
    }



}