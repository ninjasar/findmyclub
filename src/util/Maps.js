import React from 'react';

export default {

    /** Maps an interest object to a component.
    * @param {Object} _ The data to populate the component with.
    * @param {Object} props Any other properties that need to be passed to the rendered component. */
    mapInterestToComponent: ({ id, title, image }, props) => {
        return <div key={id} className={props.className + ' interest-item'}>
            <img src={image} alt='interest-item' className={props.className + ' interest-image'}/>
            <h2 className={props.className + ' interest-title'}>{title}</h2>
        </div>
    }



}