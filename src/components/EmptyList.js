import React from 'react';
import '../css/EmptyList.css';

export default class EmptyList extends React.Component {
	props = {
		subtitle: '= =',
	}

	render() {
		return (
			<div className='no-results-view'>
				<p className='no-results-view-emoji'>😞</p>
				<p className='no-results-view-title'>No Results</p>
				<p className='no-results-view-subtitle'>{this.props.subtitle}</p>
			</div>
		)
	}

	// render() {
	//   return (
	//     <div className='emptylist-container'>
	//       <span role="img" aria-label='sad'>😞</span>
	//       <p className='emptylist-title'>No Results</p>
	//       <p>{this.props.subtitle}</p>
	//     </div>
	//   );
	// }
}
