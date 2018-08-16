import React, { Component } from 'react';
import Maps from '../util/Maps';
import CollectionView from '../components/CollectionView';
import '../css/containers/LoginClubDetail.css';

class LoginClubDetail extends Component {

	/****************************
    *                           *
    *            INIT           *
    *                           *
    *****************************/

    constructor(props) {
        super(props);
        this.state = {
            club: {
                title: props.club.title || '',
                image: props.club.image || '',
                interest: props.club.category || '',
                category: props.club.category || '',
                umbrella: props.club.umbrella || 'Umbrella',
            },
            upcomingEvents: [{
                title: 'First Meeting',
                date: '11 Sep',
                host: 'NYU Ballroom and Latin Dance Team'
            },{
                title: 'First Meeting',
                date: '11 Sep',
                host: 'NYU Ballroom and Latin Dance Team'
            },{
                title: 'First Meeting',
                date: '11 Sep',
                host: 'NYU Ballroom and Latin Dance Team'
            },{
                title: 'First Meeting',
                date: '11 Sep',
                host: 'NYU Ballroom and Latin Dance Team'
            },{
                title: 'First Meeting',
                date: '11 Sep',
                host: 'NYU Ballroom and Latin Dance Team'
            }],
            clubImages: [
                require('../images/FindMyClub_Logo.svg'),
                require('../images/FindMyClub_Logo.svg'),
                require('../images/FindMyClub_Logo.svg'),
                require('../images/FindMyClub_Logo.svg'),
                require('../images/FindMyClub_Logo.svg'),
                require('../images/FindMyClub_Logo.svg'),
            ],

            maxEvents: 2
        }
    }
   

	/****************************
    *                           *
    *           RENDER          *
    *                           *
    *****************************/

	render() {
		return (
			<div className="LoginClubDetail overlay">
                <button className='club-detail-close-btn'
                        onClick={() => {
                            if(this.props.onClose) {
                                this.props.onClose();
                            }
                        }}><span className='fa fa-times'/></button>
				<img className='club-detail-background-image' src={this.state.club.image} alt='image-preview'/>

                <button className='pill-button club-detail-follow-btn'>
                    <span className='fa fa-plus'/>&nbsp;Follow
                </button>
                <button className='pill-button club-detail-go-to-engage-btn'>
                    <span className='fa fa-sign-out-alt'/>&nbsp;Go to Engage
                </button>

                <h1 className='club-detail-title'>{this.state.club.title}</h1>
                <p className='club-detail-information'><span>Interest</span> {this.state.club.category}</p>
                <p className='club-detail-information'><span>Category</span> {this.state.club.category}</p>
                <p className='club-detail-information'><span>Umbrella</span> {this.state.club.category}</p>

                <p className='club-detail-description'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi auctor tellus at sem ornare fermentum. Maecenas et semper nunc, id accumsan ante. Fusce fringilla mi turpis. Donec nec tellus placerat, convallis leo eu, fringilla enim. Maecenas blandit feugiat mi, at porta augue vestibulum sed. Maecenas consectetur egestas mi, ut ultrices risus viverra nec. Donec fringilla dui non ex maximus, vitae finibus nisi egestas.
                    Fusce ac bibendum augue. In convallis varius diam eu condimentum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae.
                </p>

                <h3 className='club-detail-portal-title'>Portal Information</h3>
                <div className='club-detail-portal-information'>
                    <p className='club-detail-portal-information-title'>Website</p>
                    <a className='club-detail-portal-information-link' href='https://google.com'>https://website.com</a>

                    <p className='club-detail-portal-information-title'>Facebook</p>
                    <a className='club-detail-portal-information-link' href='https://google.com'>https://facebook.com</a>

                    <p className='club-detail-portal-information-title'>Instagram</p>
                    <a className='club-detail-portal-information-link' href='https://google.com'>https://instagram.com</a>
                    
                    <p className='club-detail-portal-information-title'>Location</p>
                    <p className='club-detail-portal-information-link not-link'>Kimmel Center for Student Life</p>

                    <p className='club-detail-portal-information-title'>Contact</p>
                    <p className='club-detail-portal-information-link not-link'>Joe Schmoe</p>

                    <p className='club-detail-portal-information-title'>Email</p>
                    <a className='club-detail-portal-information-link' href='https://google.com'>joeschmoe@nyu.edu</a>
                </div>

                <h3 className='club-detail-events-title'>Upcoming Events</h3>
                <CollectionView className='club-detail-events-list'
                                orientation={CollectionView.Orientation.vertical}
                                edgeInsets={['10px', '0px', '0px', '0px']}
                                data={
                                    this.state.upcomingEvents.map((val, index) => {
                                        return Maps.mapEventToComponent(val, index, (title, date, host) => {
                                            console.log('CLICKED ON: ', title, date, host);
                                        })
                                    }).filter((_, index) => {
                                        if(this.state.maxEvents === 2) {
                                            return index < this.state.maxEvents;
                                        } else {
                                            return index;
                                        }
                                    })
                                }/>
                <button className='club-detail-see-more-btn'
                        onClick={() => {
                            this.setState({
                                maxEvents: this.state.maxEvents === 2 ? -1 : 2
                            })
                        }}>See {this.state.maxEvents === 2 ? 'More' : 'Less'}</button>

                <div className='club-detail-gallery-section'>
                    <h3 className='club-detail-events-title'>Club Gallery</h3>

                    <CollectionView className='club-detail-gallery-list'
                                orientation={CollectionView.Orientation.horizontal}
                                edgeInsets={['0px', '50px', '0px', '20px']}
                                data={
                                    this.state.clubImages.map((val, index) => {
                                        return (
                                            <img key={index}
                                                className='club-detail-gallery-image'
                                                src={val}
                                                alt='gallery'/>
                                        )
                                    })
                                }/>
                </div>
			</div>
		);
	}


	/****************************
    *                           *
    *         FUNCTIONS         *
    *                           *
    *****************************/





	/****************************
    *                           *
    *           STYLES          *
    *                           *
    *****************************/

}

export default LoginClubDetail;
