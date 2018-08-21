import React, { Component } from 'react';
import Maps from '../util/Maps';
import CollectionView from '../components/CollectionView';
import '../css/containers/DashboardProfile.css';

class DashboardProfile extends Component {

	/****************************
    *                           *
    *            INIT           *
    *                           *
    *****************************/

    constructor(props) {
        super(props);
        this.state = {
            user: {
                profilePicture: '',
                fullName: 'Jane Doe',
                school: 'Tisch School of the Arts',
                year: 'Class of 2020',
            },
            interests: [{
                title: 'Art',
                image: '',
                tags: ['art', 'art', 'art']
            },{
                title: 'Sports',
                image: '',
                tags: ['sports', 'sports', 'sports']
            },{
                title: 'Social',
                image: '',
                tags: ['social', 'social', 'social']
            },{
                title: 'Tech',
                image: '',
                tags: ['tech', 'tech', 'tech']
            },{
                title: 'Academic',
                image: '',
                tags: ['academic', 'academic', 'academic']
            },{
                title: 'Religious',
                image: '',
                tags: ['religious', 'religious', 'religious']
            },{
                title: 'Political',
                image: '',
                tags: ['political', 'political', 'political']
            }],

            editOptionsVisible: false,
            selectedItem: null
        }
    }


	/****************************
    *                           *
    *           RENDER          *
    *                           *
    *****************************/

	render() {
		return (
			<div className="DashboardProfile overlay">
				<button className='dashboard-profile-back-btn'
                        onClick={() => {
                            if(this.props.onClose) {
                                this.props.onClose();
                            }
                        }}><span className='fa fa-chevron-left'/></button>
                <button className='dashboard-profile-edit-btn'
                        onClick={this.showEditOptions.bind(this)}
                        onBlur={() => {
                            this.setState({
                                editOptionsVisible: false
                            })
                        }}>
                    <span className='fas fa-ellipsis-h'/>
                </button>

                <div className='dashboard-profile-picture'>
                    <img src={this.state.user.profilePicture} 
                        alt='profile'/>
                </div>
                <h4 className='dashboard-profile-fullname'>{this.state.user.fullName}</h4>
                <p className='dashboard-profile-school'>{this.state.user.school} | {this.state.user.year}</p>

                <p className='dashboard-profile-interests-header'>Your Interests</p>
                <CollectionView className='dashboard-profile-interests-list'
                                orientation={CollectionView.Orientation.vertical}
                                data={
                                    this.state.interests.map((val, index) => {
                                        return Maps.mapInterestToProfileComponent(val, this.didSelectInterest.bind(this));
                                    })
                                }/>

                <CollectionView className='dashboard-profile-edit-options'
                                orientation={CollectionView.Orientation.vertical}
                                data={
                                    ['Edit Preferences', 'Log out'].map((val, index) => {
                                        return (
                                            <div className='profile-edit-option' key={index} onClick={() => { this.didSelectAction(index) }}>
                                                <p>{val}</p>
                                            </div>
                                        )
                                    })
                                }
                                style={{
                                    visibility: this.state.editOptionsVisible === true ? 'visible' : 'hidden'
                                }}/>

                <div className='dashboard-profile-overlay' style={{
                    visibility: this.state.selectedItem === null ? 'hidden' : 'visible'
                }}
                onClick={() => {
                    this.setState({
                        selectedItem: null
                    })
                }}>
                    <div className='dashboard-profile-alert'>
                        <button className='dashboard-profile-close-alert-btn'
                            onClick={() => {
                                this.setState({
                                    selectedItem: null
                                })
                            }}><span className='fa fa-times'/></button>
                        <div className='dashboard-profile-alert-image'>
                            <img src={this.state.selectedItem && this.state.selectedItem.image}
                                alt='icon'/>
                        </div>
                        <h1 className='dashboard-profile-alert-title'>
                            {this.state.selectedItem && this.state.selectedItem.title || "Arts & Performance"} 
                        </h1>
                        <CollectionView className='dashboard-profile-alert-tags'
                                orientation={CollectionView.Orientation.vertical}
                                data={
                                    (this.state.selectedItem && this.state.selectedItem.tags || ['art','art','art']).map((val, index) => {
                                        return (
                                            <div className='dashboard-profile-alert-tag' key={index}>
                                                {val}
                                            </div>
                                        )
                                    })
                                }/>
                    </div>
                </div>
			</div>
		);
	}


	/****************************
    *                           *
    *         FUNCTIONS         *
    *                           *
    *****************************/

    /** Brings up the editing options for the user. */
    showEditOptions() {
        this.setState({
            editOptionsVisible: !this.state.editOptionsVisible
        })
    }

    /** What to do when you select an action. */
    didSelectAction(index) {
        if(index === 0) {
            // Edit preferences
        } else {
            // Logout
            window.location.href = '/';
        }
    }

    /** When you select an interest. */
    didSelectInterest(id, title) {
        this.setState({
            selectedItem: this.state.interests[id]
        })
    }



	/****************************
    *                           *
    *           STYLES          *
    *                           *
    *****************************/

}

export default DashboardProfile;
