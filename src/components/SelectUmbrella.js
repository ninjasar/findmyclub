import React from 'react';
import $ from 'jquery';

import CollectionView from './CollectionView';
import Maps from '../util/Maps';

import '../css/SelectUmbrella.css';

import * as InterestsAndCategories from '../util/InterestsAndCategories';

export default class SelectUmbrella extends React.Component {
  state = {
    umbrellaSearchFocused: false,
  };

  renderDropdown = () => {
    return (
      <CollectionView className='dashboard-clubs-umbrellas-list'
        orientation={CollectionView.Orientation.vertical}
        data={
          InterestsAndCategories.umbrellas.map((val, index) => {
            return Maps.mapUmbrellaToLabelComponent(val.name, index, this.props.didSelectUmbrella.bind(this, val));
          })
        }
        style={{
          visibility: this.state.umbrellaSearchFocused === true ? 'visible' : 'hidden'
        }} />
    );
  }

  renderButton = () => {
    return (
      <button className='dashboard-clubs-umbrella-btn'
        onFocus={this.handleUmbrellaSearchClicked}
        onBlur={() => {
          this.setState({ umbrellaSearchFocused: false })
        }}>
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

  handleUmbrellaSearchClicked = () => {
    if (this.props.selectedUmbrella) {
      $('.dashboard-clubs-umbrella-btn').blur();
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
