import React from 'react';
import ContentIndexItem from './content_index_item'

class Content extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchTracks();
  }

  render() {
    const trackItems = this.props.tracks.map( track => {

      return (
        // for now just return an image, later uploader id will be needed
        // so that a user can edit and delete their own tracks
        track? <ContentIndexItem key={track.id} photoUrl={track.photoUrl} track={track}/> : null
      )
    })
    
    
    return (
      <div className="content-container">
        <div className="content-wrapper">
          <div className="playlist-header">Charts: New and hot</div>
          <ul className="content-list-ul">
            {trackItems}
          </ul>
        </div>
      </div>
    )
  }
}

export default Content