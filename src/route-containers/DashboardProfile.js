import React, { Component } from 'react';
import Maps from '../util/Maps';
import '../css/containers/DashboardProfile.css';
import Networking from '../util/Networking';
import Constants from '../util/Constants';

class DashboardProfile extends Component {

	/****************************
    *                           *
    *            INIT           *
    *                           *
    *****************************/

	/****************************
    *                           *
    *           RENDER          *
    *                           *
    *****************************/

    render() {
        const user = this.getUserInfo();
        return (
            <div className="DashboardProfile overlay">
                <button className='dashboard-profile-back-btn'
                    onClick={() => {
                        if (this.props.onClose) {
                            this.props.onClose();
                        }
                    }}>
                    <span className='fa fa-chevron-left' />
                </button>

                <h4 className='dashboard-profile-fullname'>{user.fullName}</h4>
                <p className='dashboard-profile-school'>{user.school}</p>

                <div className='dashboard-profile-action-button-container'>
                    <button className='dashboard-profile-action-button dashboard-profile-action-button-primary' onClick={() => { this.handleEditPreference() }}>
                        Edit Preferences
                    </button>
                    <button className='dashboard-profile-action-button dashboard-profile-action-button-clear' onClick={() => { this.handleLogout() }}>
                        Log Out
                    </button>
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

            const fullName = jwtPayload.email;
            const firstAffiliation = jwtPayload.affiliation
                .filter((aff) => aff.affiliation_status === 'current' && aff.affiliation_type === 'student');
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
        window.location.href = '/';
    }

    handleLogout = () => {
        Constants.clearToken();
        window.location.href = '/';
    }


	/****************************
    *                           *
    *           STYLES          *
    *                           *
    *****************************/

}

export default DashboardProfile;
