import React, { Component } from 'react';
import CollectionView from '../components/CollectionView';
import Maps from '../util/Maps';
import { interests } from '../util/InterestsAndCategories';
import '../css/containers/LoginInterestSelection.css';

class LoginInterestSelection extends Component {

	/****************************
    *                           *
    *            INIT           *
    *                           *
    *****************************/

    constructor(props) {
        super(props);
        this.state = {
            interests: []
        }
    }
    
    componentDidMount() {
        this.populateInterests();
    }



	/****************************
    *                           *
    *           RENDER          *
    *                           *
    *****************************/

	render() {
		return (
			<div className="LoginInterestSelection container">
                <h2 className='login-interests-title'>What are you most interested in?</h2>

                <CollectionView ref='interests-collection-view'
                                className='login-interests-selections'
                                orientation={CollectionView.Orientation.vertical}
                                edgeInsets={['0px', '0px', '30px', '0px']}
                                isScrollEnabled={false}
                                data={
                                    this.state.interests.map((val) => {
                                        return Maps.mapInterestToComponent(val, 
                                                                        { className: 'login-interests' }, 
                                                                        this.didSelectInterest.bind(this));
                                    })
                                }/>

				<button className='round-rect-button login-interests-finish-btn'
                        onClick={this.handleFinishSelectingInterests.bind(this)}>Get my results</button>
			</div>
		);
	}


	/****************************
    *                           *
    *         FUNCTIONS         *
    *                           *
    *****************************/

    /** Handles the next action when the user is done selecting their interests. */
    handleFinishSelectingInterests() {
        if(this.props.onNext) {
            const selected = this.state.interests.filter((val) => val.selected);
            this.props.onNext(selected);
        }
    }


    /** Reloads the collection view when an option is clicked. */
    didSelectInterest(ID) {
        // 1.) Get the object at the selected index.
        const data = this.state.interests;
        const selectedObject = data.filter((val) => val.ID === ID)[0];

        // 2.) Update the value of whether or not it was selected.
        selectedObject.selected = selectedObject.selected === true ? false : true;

        // 3.) Set the state again.
        this.setState({ interests: data });
    }


    /** Sets the state with some interests for the user. */
    async populateInterests() {
        this.setState({
            interests: Object.values(interests).map((val) => {
                return {
                    ...val,
                    selected: false
                }
            })
        });
    }



	/****************************
    *                           *
    *           STYLES          *
    *                           *
    *****************************/

}

export default LoginInterestSelection;
