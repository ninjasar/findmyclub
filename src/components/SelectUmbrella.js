import React from 'react';

import CollectionView from './CollectionView';
import Maps from '../util/Maps';

import '../css/SelectUmbrella.css';

import * as InterestsAndCategories from '../util/InterestsAndCategories';


// UW.Dropdowns = Backbone.View.extend({
//         chunkSize: 8,
//         menuWidth: 1170,
//         menuBlock: '<div class="menu-block"></div>',
//         menuBlockWidth: 230,
//         index: {
//             topmenu: 0,
//             submenu: 0
//         },
//         elements: {
//             toplevel: ".dawgdrops-item"
//         },
//         keys: {
//             enter: 13,
//             esc: 27,
//             tab: 9,
//             left: 37,
//             up: 38,
//             right: 39,
//             down: 40,
//             spacebar: 32
//         },
//         events: {
//             "keydown .dawgdrops-menu a": "moveFocusInSubMenu",
//             "keydown .dawgdrops-item > a": "toggleSubMenu",
//             "focus .dawgdrops-item": "positionSubmenu",
//             "mouseenter .dawgdrops-item": "positionSubmenu"
//         },
//         initialize: function(a) {
//             _.bindAll(this, "render", "chunk", "wrap", "wrapChildren", "positionSubmenu", "toggleSubMenu"),
//             this.settings = _.extend({}, this.defaults, this.$el.data(), a),
//             this.$topLevelNav = this.$el.find(this.elements.toplevel),
//             this.render()
//         },
//         render: function() {
//             _.each(this.$topLevelNav, this.wrapChildren)
//         },
//         chunk: function(a, b) {
//             return Math.floor(b / this.chunkSize)
//         },
//         wrapChildren: function(a) {
//             $(a).find("li").length > this.chunkSize && _.each(_.groupBy($(a).find("li"), this.chunk), this.wrap)
//         },
//         wrap: function(a) {
//             $(a).wrapAll(this.menuBlock)
//         },
//         positionSubmenu: function(a) {
//             var b = $(a.currentTarget)
//               , c = b.position()
//               , d = b.find(".menu-block")
//               , e = this.menuBlockWidth * d.length + c.left
//               , f = e > UW.$window.width() ? b.outerWidth() + c.left - d.length * this.menuBlockWidth : c.left;
//             b.find("ul").css({
//                 top: c.top + 58,
//                 left: f
//             })
//         },
//         toggleSubMenu: function(a) {
//             switch (a.keyCode) {
//             case this.keys.enter:
//             case this.keys.down:
//                 return $(a.currentTarget).attr("aria-expanded", "true"),
//                 this.currentSubMenu = $(a.currentTarget).siblings("ul"),
//                 this.currentSubMenuAnchors = this.currentSubMenu.find("a"),
//                 this.currentSubMenu.attr("aria-expanded", "true").show().find("a").eq(0).focus(),
//                 !1;
//             case this.keys.left:
//                 return $(a.currentTarget).parent().prev().children("a").first().focus(),
//                 !1;
//             case this.keys.right:
//                 return $(a.currentTarget).parent().next().children("a").first().focus(),
//                 !1;
//             case this.keys.spacebar:
//                 return window.location.href = $(a.currentTarget).attr("href"),
//                 !1
//             }
//         },
//         moveFocusInSubMenu: function(a) {
//             switch (a.keyCode) {
//             case this.keys.tab:
//                 this.currentSubMenu && (this.currentSubMenu.hide(),
//                 this.currentSubMenu = null,
//                 this.index.submenu = 0);
//                 break;
//             case this.keys.down:
//                 return this.index.submenu = this.index.submenu === this.currentSubMenuAnchors.length - 1 ? 0 : this.index.submenu + 1,
//                 this.currentSubMenuAnchors.eq(this.index.submenu).focus(),
//                 !1;
//             case this.keys.up:
//                 return this.index.submenu = 0 === this.index.submenu ? this.currentSubMenuAnchors.length - 1 : this.index.submenu - 1,
//                 this.currentSubMenuAnchors.eq(this.index.submenu).focus(),
//                 !1;
//             case this.keys.left:
//                 return this.currentSubMenu.hide().parent().prev().children("a").first().focus(),
//                 this.index.submenu = 0,
//                 this.currentSubMenu.attr("aria-expanded", "false").parent().children("a").first().attr("aria-expanded", "false"),
//                 !1;
//             case this.keys.right:
//                 return this.currentSubMenu.hide().parent().next().children("a").first().focus(),
//                 this.index.submenu = 0,
//                 this.currentSubMenu.attr("aria-expanded", "false").parent().children("a").first().attr("aria-expanded", "false"),
//                 !1;
//             case this.keys.spacebar:
//             case this.keys.enter:
//                 return window.location.href = $(a.currentTarget).attr("href"),
//                 !1;
//             case this.keys.esc:
//                 return this.currentSubMenu.attr("aria-expanded", "false").hide().parent().children("a").first().attr("aria-expanded", "false").focus(),
//                 !1;
//             default:
//                 var b = String.fromCharCode(a.which)
//                   , c = !1;
//                 return this.currentSubMenuAnchors.filter(function() {
//                     return c = this.innerHTML.charAt(0) === b
//                 }).first().focus(),
//                 !c
//             }
//         }
//     }),

export default class SelectUmbrella extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			umbrellaSearchFocused: false,
		}
		this.listItems = [];
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
		} else if ([13, 38, 40].includes(e.which) && e.target.className === "dashboard-clubs-umbrella-btn") {
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
		this.listItems = InterestsAndCategories.umbrellas.map((val, index) => {
			return Maps.mapUmbrellaToLabelComponent(val.name, index, () => {
				this.props.didSelectUmbrella(val);
				this.setState({
					umbrellaSearchFocused: false,
				});
			}, this.props.overlayShowing);
		});
		let umbrellaLength = InterestsAndCategories.umbrellas.length;
		return (
			<div ref={this.dropDownRef} className='dashboard-clubs-umbrellas-container'>
				{this.state.umbrellaSearchFocused &&
					<CollectionView className="dashboard-clubs-umbrellas-list"
						orientation={CollectionView.Orientation.vertical}
						data={
							InterestsAndCategories.umbrellas.map((val, index) => {
								return Maps.mapUmbrellaToLabelComponent(
									val.name,
									val.name + (index === 0 ? ". You reach the first element of the list." : (index >= umbrellaLength - 1 ? ". You reach the last element of the list." : "")), 
									index, 
									() => {
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
  if(event.key === 'Enter'){
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
							`Umbrella Filter Button: Click to select an umbrella. Currently ${this.state.umbrellaSearchFocused ? ' is' : 'is not'} selected. Press Enter, Up and Down Arrow to change, Tab to skip.`
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
