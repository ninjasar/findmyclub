import React from 'react';

import CollectionView from './CollectionView';
import Maps from '../util/Maps';

import '../css/SelectUmbrella.css';

import * as InterestsAndCategories from '../util/InterestsAndCategories';

export default class SelectUmbrella extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			umbrellaSearchFocused: false,
		}
		this.dropDownRef = React.createRef()
		this.tabs = []
		this.currentTab = 0
	}

	componentDidMount() {
		document.addEventListener('mousedown', this.handleClickOutside)
		document.addEventListener('touchstart', this.handleClickOutside)
		document.addEventListener('keydown', this.handleKeyDown)
	}

	componentWillUnmount() {
		document.removeEventListener('mousedown', this.handleClickOutside)
		document.removeEventListener('touchstart', this.handleClickOutside)
		document.removeEventListener('keydown', this.handleKeyDown)
	}

	componentDidUpdate() {
		this.tabs = document.querySelectorAll(".dashboard-umbrella-label")
		this.currentTab = 0
	}

	handleKeyDown = (e) => {
		if (e.target.className !== "dashboard-clubs-umbrella-btn" && e.target.className !== "dashboard-umbrella-label") return;
		let passDown = true
		if (e.which === 9) {
			this.setState({ umbrellaSearchFocused: false })
		} else if (e.which === 13 && e.target.className === "dashboard-clubs-umbrella-btn") {
			this.setState({ umbrellaSearchFocused: true }, () => {
				this.activeTab(this.currentTab)
			})
			passDown = false
		} else if (e.which === 38) {
			this.activeTab(this.currentTab - 1)
			passDown = false
		} else if (e.which === 40) {
			this.activeTab(this.currentTab + 1)
			passDown = false
		}
		if (!passDown) e.preventDefault()
	}

	activeTab = (tabIndex) => {
		this.currentTab = tabIndex
		if (this.currentTab >= this.tabs.length) this.currentTab = this.tabs.length - 1
		else if (this.currentTab < 0) this.currentTab = 0
		this.tabs[this.currentTab].focus()
	}

	handleClickOutside = (e) => {
		console.log(this.state)
		console.log(this.dropDownRef.current)
		if (this.state.umbrellaSearchFocused && !this.dropDownRef.current.contains(e.target)) {
			this.setState({ umbrellaSearchFocused: false })
		}
	}

	handleUmbrellaSearchClicked = (e) => {
		if(this.props.selectedUmbrella) {
			this.props.didSelectUmbrella(undefined);
		}
		if(this.state.umbrellaSearchFocused === true) {
			this.setState({ umbrellaSearchFocused: false });
		} else {
			this.setState({ umbrellaSearchFocused: true });
		}
	}

	renderDropdown = () => {
		return (
			<div ref={this.dropDownRef} className='dashboard-clubs-umbrellas-container'>
				{this.state.umbrellaSearchFocused &&
					<CollectionView className="dashboard-clubs-umbrellas-list"
						orientation={CollectionView.Orientation.vertical}
						data={
							InterestsAndCategories.umbrellas.map((val, index) => {
								return Maps.mapUmbrellaToLabelComponent(val.name, index, () => {
									this.props.didSelectUmbrella(val);
									this.setState({
										umbrellaSearchFocused: false,
									});
								}, this.props.overlayShowing);
							})
						}
					/>
				}
			</div>
		)
	}

	handleKeyPress = (event) => {
  if(event.key == 'Enter'){
    console.log('enter press here! ')
  }
}


	renderButton = () => {
		return (
			<div className='dashboard-clubs-umbrella-btn'
					onClick={this.handleUmbrellaSearchClicked}
					aria-label={
						this.props.selectedUmbrella ?
							`Umbrella Filter Button: The currently selected umbrella is ${this.props.selectedUmbrella.name}. Press Enter to change, Tab to skip.` :
							`Umbrella Filter Button: Click to select an umbrella. Currently ${this.state.umbrellaSearchFocused ? ' is' : 'is not'} selected. Press Enter, Up and Down to change, Tab to skip.`
					}
					tabIndex={this.props.overlayShowing ? -1 : 0}
					role='button'>
					{
						this.props.selectedUmbrella ?
							<React.Fragment /*tabIndex={-1}*/>
								<span className='dashboard-clubs-umbrella-btn-content'>{this.props.selectedUmbrella.name}&nbsp;&nbsp;&nbsp;</span>
								<span className='fa fa-times-circle' />
							</React.Fragment> :
							<React.Fragment /*tabIndex={-1}*/>
								<span className='fas fa-umbrella' />
								<span className='dashboard-clubs-umbrella-btn-content'>&nbsp;All Schools&nbsp;&nbsp;&nbsp;</span>
								<span className='fa fa-chevron-down' />
							</React.Fragment>
					}
			</div>
		);
	}

	render() {
		return (
			<React.Fragment /*tabIndex={-1}*/>
				{this.renderButton()}
				{this.state.umbrellaSearchFocused && this.renderDropdown()}
			</React.Fragment>
		);
	}
}
