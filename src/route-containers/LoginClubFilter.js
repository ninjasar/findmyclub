import React, { Component } from 'react';
import Maps from '../util/Maps';
import CollectionView from '../components/CollectionView';
import '../css/containers/LoginClubFilter.css';

class LoginClubFilter extends Component {

	/****************************
    *                           *
    *            INIT           *
    *                           *
    *****************************/

    constructor(props) {
        super(props);
        this.state = {
            interests: props.interests || ['Art', 'Sports', 'Social', 'Tech'],
            categoriesPerInterest: props.categoriesPerInterest || [{
                title: 'Dance',
                interest: 'Art',
                checked: false
            },{
                title: 'Comedy',
                interest: 'Art',
                checked: false
            },{
                title: 'Improve',
                interest: 'Art',
                checked: false
            },{
                title: 'Music',
                interest: 'Art',
                checked: false
            },{
                title: 'Racquet',
                interest: 'Sports',
                checked: false
            },{
                title: 'Hand',
                interest: 'Sports',
                checked: false
            },{
                title: 'Foot',
                interest: 'Sports',
                checked: false
            },{
                title: 'Running',
                interest: 'Sports',
                checked: false
            },{
                title: 'Frats',
                interest: 'Social',
                checked: false
            },{
                title: 'Sororities',
                interest: 'Social',
                checked: false
            },{
                title: 'Eating',
                interest: 'Social',
                checked: false
            },{
                title: 'Exploring',
                interest: 'Social',
                checked: false
            },{
                title: 'Museums',
                interest: 'Social',
                checked: false
            },{
                title: 'Science',
                interest: 'Tech',
                checked: false
            },{
                title: 'Medicine',
                interest: 'Tech',
                checked: false
            },{
                title: 'Software',
                interest: 'Tech',
                checked: false
            },{
                title: 'Hardware',
                interest: 'Tech',
                checked: false
            }]
        }
    }


	/****************************
    *                           *
    *           RENDER          *
    *                           *
    *****************************/

	render() {
		return (
			<div className="LoginClubFilter overlay">
                <button className='login-club-filter-close-btn'
                        onClick={() => {
                            if(this.props.onClose) {
                                this.props.onClose();
                            }
                        }}>
                    <span className='fa fa-times'/>
                </button>
				<h1 className='login-club-filter-title'>Filter</h1>
                <p className='login-club-filter-subtitle'>Check the boxes below to filter your results!</p>

                <CollectionView className='login-club-filters-filter-section'
                                orientation={CollectionView.Orientation.vertical}
                                data={
                                    this.state.interests.map((val, index) => {
                                        const filts = this.state.categoriesPerInterest.filter((val2) => val2.interest === val);
                                        return Maps.mapInterestToFilters(val, index, filts, this.didToggleFilter.bind(this));
                                    })
                                }/>
                <button className='round-rect-button login-club-filters-filter-btn'
                        onClick={() => {
                            if(this.props.onFiltered) {
                                const onFilters = this.state.categoriesPerInterest.filter((val) => val.checked === true);
                                this.props.onFiltered(onFilters);
                            }
                        }}>
                        X clubs match your interest!
                </button>
			</div>
		);
	}


	/****************************
    *                           *
    *         FUNCTIONS         *
    *                           *
    *****************************/

    /** Handles the action when you click on a filter.
    * @param {Number} selectedIndex The index of the selected filter.
    * @param {String} selectedInterest The name of the interest that goes along with this filter. */
    didToggleFilter(selectedIndex, selectedInterest) {
        // 1.) Get the objects in the state.
        const items = this.state.categoriesPerInterest;
        const filtered = items.filter((obj) => obj.interest === selectedInterest);
        const selected = filtered[selectedIndex];
        
        // 2.) Update the selected item.
        const totalIndex = items.indexOf(selected);
        selected.checked = !selected.checked;

        // 3.) Reset the state.
        const updated = items;
        updated[totalIndex] = selected;
        this.setState({ categoriesPerInterest: updated });
    }




	/****************************
    *                           *
    *           STYLES          *
    *                           *
    *****************************/

}

export default LoginClubFilter;
