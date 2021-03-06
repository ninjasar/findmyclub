import React, { Component } from 'react';
import '../css/containers/DashboardProfile.css';
import Networking from '../util/Networking';
import * as Storage from '../util/Storage';

class DashboardProfile extends Component {

	/****************************
    *                           *
    *            INIT           *
    *                           *
    *****************************/

    componentDidMount() {
        document.title = 'Find My Club | Dashboard Profile';
        this.refs['dashboard-profile-back-btn'].focus();
    }

    componentWillUnmount() {
        document.title = 'Find My Club | Dashboard';
    }



	/****************************
    *                           *
    *           RENDER          *
    *                           *
    *****************************/

    render() {
        const user = this.getUserInfo();
        return (
            <div className="DashboardProfile overlay"
                onKeyDown={e => {
                    if(e.keyCode === 27) {
                        if (this.props.onClose) {
                            this.props.onClose();
                        }
                    }
                }}>
                <button className='dashboard-profile-back-btn'
                    onClick={() => {
                        if (this.props.onClose) {
                            this.props.onClose();
                        }
                    }}
                    aria-label='Back Button: Click to close the profile'
                    ref='dashboard-profile-back-btn'
                    tabIndex={0}>
                    <span aria-hidden={true} className='fa fa-chevron-left' />
                </button>
                <div tabIndex={-1} className='dashboard-profile-image'><span role='img' aria-label='cool'>&#x1F60E;</span></div>
                {/* <img tabIndex={-1} src={require('../images/profile_image.png')} alt=''  /> */}
                <h4 tabIndex={0} className='dashboard-profile-fullname'>{user.fullName}</h4>
                <p tabIndex={0} className='dashboard-profile-school'>{user.school}</p>

                <div className='dashboard-profile-action-button-container'>
                    <button className='round-rect-button dashboard-profile-action-button-primary' onClick={() => { this.handleEditPreference() }}
                            tabIndex={0}
                            aria-label='Button: Click to go to the edit preferences page'>
                        Edit Preferences
                    </button>
                    <button className='round-rect-button dashboard-profile-action-button-clear' onClick={() => { this.handleLogout() }}
                            tabIndex={0}
                            aria-label='Button: Click to logout and go to the home page'>
                        Log Out
                    </button>

                    <div className='dashboard-profile-accessibility-information'
                        role='heading'
                        tabIndex={0}
                        aria-label='information: support information'>
                        <div className='dashboard-profile-accessibility-information-title-holder'>
                            <h3 className='dashboard-profile-accessibility-information-title'>Support</h3>
                        </div>
                      <a
                        tabIndex={0}
                        aria-label='Link: Click to go to accessibility information'
                        href="https://www.nyu.edu/footer/accessibility.html">
                        Accessibility
                      </a>
                      <br></br>
                      <a
                      tabIndex={0}
                      aria-label = 'Link:Click to send an email to our support team'
                      href="mailto:it-stit@nyu.edu?Subject=Inquiry%20about%20Find%20My%20Club">
                      Email Us
                      </a>
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

    getUserInfo = () => {
        try {
            const jwtPayload = Networking.getJWTPayload();

            const fullName = jwtPayload.fullname || jwtPayload.email;
            const firstAffiliation = jwtPayload.affiliation
                .filter((aff) => aff.affiliation_status === 'current')[0] || {};
            const school = firstAffiliation.division;
            return { fullName, school };
        }
        catch (err) {
            console.error(err);
            return { userFullName: '', school: '' };
        }
    }

    /** What to do when you select an action. */
    handleEditPreference = () => {
        Storage.setEditPreference();
        window.location.href = '/';
    }

    handleLogout = () => {
        Storage.clearToken();
        window.location.href = '/';
    }


	/****************************
    *                           *
    *           STYLES          *
    *                           *
    *****************************/

}

export default DashboardProfile;
