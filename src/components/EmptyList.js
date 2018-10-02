import React from 'react';
import '../css/EmptyList.css';

export default class EmptyList extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			subtitle: props.subtitle || '= ='
		}
	}

	render() {
		return (
			<div className='no-results-view'>
				<p className='no-results-view-emoji'><span role="img" aria-label='sad'>😞</span></p>
				<p className='no-results-view-title'>No Results</p>
				<p className='no-results-view-subtitle'>{this.state.subtitle}</p>
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
