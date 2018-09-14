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

        const checkedCategories = this.props.checkedCategories || {};
        [...new Set((this.props.clubMatches || []).map(c => c.category))]
            .forEach(category => {
                checkedCategories[category] = this.props.selectedClubs.map(sc => sc.category).includes(category);
            });
        
        this.state = {
            checkedCategories,
        }
    }

    componentDidMount() {
        this.refs['login-club-filter-close-btn'].focus();
    }

    
    
	/****************************
    *                           *
    *           RENDER          *
    *                           *
    *****************************/
    
	render() {
		return (
			<div className="LoginClubFilter overlay">
                <button
                    ref='login-club-filter-close-btn'
                    className='login-club-filter-close-btn'
                    tabIndex={0}
                    onClick={() => {
                        if(this.props.onClose) {
                            this.props.onClose();
                        }
                    }}
                >
                    <span className='fa fa-times'/>
                </button>
                <h1 className='login-club-filter-title' tabIndex={0}>Filter</h1>
                <p className='login-club-filter-subtitle' tabIndex={0}>Check the boxes below to filter your results!</p>
                
                <CollectionView 
                    className='login-club-filters-filter-section'
                    orientation={CollectionView.Orientation.vertical}
                    data={
                        this.props.interests.map((interest, index) => {
                            let filts = this.props.categories
                                .filter((cat) => cat.interest === interest.Name)
                                .map(c => ({ interest: interest.Name, title: c.Name, checked: this.state.checkedCategories[c.Name] }))

                                filts = filts.filter((f, ind) => filts.map(f2 => f2.title).indexOf(f.title) === ind);
                            return Maps.mapInterestToFilters(interest.Name, index, filts, this.didToggleFilter.bind(this));
                        })}
                />
                <button 
                    tabIndex={0}
                    className='round-rect-button login-club-filters-filter-btn'
                    onClick={() => {
                        if(this.props.onFiltered) {
                            this.props.onFiltered(Object.keys(this.state.checkedCategories)
                                .filter(c => this.state.checkedCategories[c]));
                        }
                    }}
                > See {(this.getMatchingClubsCount() || 0)} Matching Clubs </button>
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
    didToggleFilter(categoryName) {
        
        const checkedCategories = {
            ...this.state.checkedCategories,
            [categoryName]: !this.state.checkedCategories[categoryName],
        };
        
        this.setState({
            checkedCategories,
        });
    }
    
    getMatchingClubsCount() {

        const count = (this.props.clubMatches || [])
            .filter(c => Object.keys(this.state.checkedCategories)
                .filter(cc => this.state.checkedCategories[cc])
                .includes(c.category))
            .length;

        return count;
    }
    
    
	/****************************
    *                           *
    *           STYLES          *
    *                           *
    *****************************/
    
}

export default LoginClubFilter;
