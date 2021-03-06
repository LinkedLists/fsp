import React from 'react';
import ReactGA from 'react-ga';
import ContentIndexItem from '../content/content_index_item'
import Carousel from '../carousel/carousel_container'
import History from '../history/history'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class TrackIndex extends React.Component {
  constructor(props) {
    super(props)

    this.enableCurrentUser = this.enableCurrentUser.bind(this)
    this.trackPage = this.trackPage.bind(this)
  }

  trackPage(page) {
    ReactGA.set({
      page
    });
    ReactGA.pageview(page);
  };

  componentDidMount() {
    window.scrollTo(0, 0)
    this.enableCurrentUser()
    let track = {}
    if (window.localStorage.getItem("currentTrack") !== 'undefined') {
      track = JSON.parse(window.localStorage.getItem("currentTrack"))
    } else {
      window.localStorage.setItem("currentTrack", JSON.stringify({}))
    }
    if (track && Object.keys(track).length > 0) {
      if (!this.props.currentTrack.id)
      this.props.refreshTrack(JSON.parse(window.localStorage.getItem("currentTrack")));
    }

    const page = this.props.location.pathname;
    this.trackPage(page);
  }

  enableCurrentUser() {
    let userLink = document.getElementById("nav-currentUser");
    if (userLink) {
      userLink.classList.remove("disable")
    }
  }

  render() {
    const trackItems = this.props.tracks.slice().reverse().map( track => {
      return (
        <ContentIndexItem key={track.id} photoUrl={track.photoUrl} track={track}/>
      )
    })
    return (
      <div className="content-container">
        <History />
        <div className="content-wrapper">
          <div className="content-playlist-main-wrapper">
            <div className="library-main-content-wrapper">
              <div className="library-header-wrapper">
                <h3 className="content-playlist-header">Library</h3>
                <h6 className="content-playlist-header-description">All tracks from SoundClout users</h6>
              </div>
              <ul className="library-tracks-ul">
                {trackItems}
              </ul>
              <div className="library-social-links-footer-container">
                <div className="history-social-links-footer-wrapper">
                  <a href="https://angel.co/u/kenny-zeng" target="_blank">AngelList</a>
                  &nbsp;⁃&nbsp;
                  <a href="https://github.com/LinkedLists/SoundClout" target="_blank">Github</a>
                  &nbsp;⁃&nbsp;
                  <a href="https://linkedin.com/in/k-z-96a742208" target="_blank">Linkedin</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )

  }
}

export default TrackIndex