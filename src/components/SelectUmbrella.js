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
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside)
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside)
  }

  renderDropdown = () => {
    return (
      <div ref={this.dropDownRef} className='dashboard-clubs-umbrellas-container'>
        <CollectionView className="dashboard-clubs-umbrellas-list"
          orientation={CollectionView.Orientation.vertical}
          data={
            InterestsAndCategories.umbrellas.map((val, index) => {
              return Maps.mapUmbrellaToLabelComponent(val.name, index, this.props.didSelectUmbrella.bind(this, val));
            })
          }
          style={{
            visibility: this.state.umbrellaSearchFocused === true ? 'visible' : 'hidden'
          }} />
      </div>
    )
  }

  renderButton = () => {
    return (
      <button className='dashboard-clubs-umbrella-btn'
        onClick={this.handleUmbrellaSearchClicked} >
        {
          this.props.selectedUmbrella ?
            <React.Fragment>
              <span className='dashboard-clubs-umbrella-btn-content'>{this.props.selectedUmbrella.name}&nbsp;&nbsp;&nbsp;</span>
              <span className='fa fa-times-circle' />
            </React.Fragment> :
            <React.Fragment>
              <span className='fas fa-umbrella' />
              <span className='dashboard-clubs-umbrella-btn-content'>&nbsp;All Schools&nbsp;&nbsp;&nbsp;</span>
              <span className='fa fa-chevron-down' />
            </React.Fragment>
        }
      </button>
    );
  }

  render() {
    return (
      <React.Fragment>
        {this.renderButton()}
        {this.renderDropdown()}
      </React.Fragment>
    );
  }

  handleClickOutside = (e) => {
    console.log(this.state)
    console.log(this.dropDownRef.current)
    if (this.state.umbrellaSearchFocused && !this.dropDownRef.current.contains(e.target)) {
      this.setState({ umbrellaSearchFocused: false })
    }
  }

  handleUmbrellaSearchClicked = (e) => {
    if (this.props.selectedUmbrella) {
      this.props.didSelectUmbrella(undefined);
      this.setState({
        umbrellaSearchFocused: false,
      });
    } else {
      this.setState({
        umbrellaSearchFocused: true,
      });
    }
  }
}
