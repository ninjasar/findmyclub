import React from 'react';
import '../css/EmptyList.css';

export default class EmptyList extends React.Component {
  props = {
    subtitle: '= =',
  }

  render() {
    return (
      <div className='emptylist-container'>
        <p>😞</p>
        <p className='emptylist-title'>No Results</p>
        <p>{this.props.subtitle}</p>
      </div>
    );
  }
}
