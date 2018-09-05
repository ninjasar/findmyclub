import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import _ from 'lodash';
import CollectionView from '../components/CollectionView';
import Maps from '../util/Maps';
import ReactGA from 'react-ga';
import GACat from '../util/GACategories';
import * as Storage from '../util/Storage';
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
        this.alertRef = React.createRef()
        this.state = {
            interests: [],
            isAlertVisible: false,
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
                <h2 ref={this.alertRef} className='login-interests-title'>What are you most interested in?</h2>
                {this.state.isAlertVisible &&
                    <div style={{ fontFamily: 'Gotham', color: '#c82368' }}>You have to select at least one interest</div>
                }
                <CollectionView ref='interests-collection-view'
                    className='login-interests-selections'
                    orientation={CollectionView.Orientation.vertical}
                    edgeInsets={['10px', '0px', '30px', '0px']}
                    isScrollEnabled={false}
                    data={
                        this.state.interests.map((val) => {
                            return Maps.mapInterestToComponent(val,
                                { className: 'login-interests' },
                                this.didSelectInterest.bind(this));
                        })
                    } />

                {this.state.interests.some(i => i.selected) && <button 
                    className='round-rect-button login-interests-finish-btn'
                    onClick={this.handleFinishSelectingInterests.bind(this)}>Next
                </button>}
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
        if (this.props.onNext) {
            // Trigger an event in Google Analytics for each selected interest.
            // This lets us know which categories are most clicked on.
            const selected = this.state.interests.filter((val) => val.selected);
            if (!selected.length) {
                this.setState({ isAlertVisible: true })
                const alertNode = ReactDOM.findDOMNode(this.alertRef.current)
                alertNode.scrollIntoView(true)
                return
            }
            for (var i in selected) {
                ReactGA.event({
                    category: GACat.SelectedInterest,
                    action: `User selected interest: ${selected[i].Name} `,
                    label: selected[i].Name
                });
            }

            // store this selection
            Storage.setSelectedInsterest(_.map(selected, 'Name'));

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
        const previousSelection = Storage.getSelectedInsterest() || [];
        this.setState({
            interests: Object.values(interests).map((val) => {
                return {
                    ...val,
                    selected: _.includes(previousSelection, val.Name),
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
