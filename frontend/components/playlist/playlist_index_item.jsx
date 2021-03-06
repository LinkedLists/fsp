import React from 'react';
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PlayButton from '../playbutton/playbutton_container'

class PlaylistIndexItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    }
    this.flag = false
    this.handleRoute = this.handleRoute.bind(this)
    this.handleRoute2 = this.handleRoute2.bind(this)
    this.cuteColors = this.cuteColors.bind(this)
    this.clickPlaybtn = this.clickPlaybtn.bind(this)
  }

  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }

  cuteColors(background) {
    if (background) {
      const r1 = this.getRandomInt(160, 200)
      const g1 = this.getRandomInt(160, 200)
      const b1 = this.getRandomInt(170, 250)
      const r2 = r1 + this.getRandomInt(5, 30)
      const g2 = g1 + this.getRandomInt(5, 30)
      const b2 = b1 - this.getRandomInt(5, 30)
      const r3 = r2 + this.getRandomInt(5, 30)
      const g3 = g2 + this.getRandomInt(5, 30)
      const b3 = b2 - this.getRandomInt(5, 30)
      background.style.background = `linear-gradient(to left, 
          rgb(${r1}, ${g1}, ${b1}), 
          rgb(${r2}, ${g2}, ${b2}), 
          rgb(${r3}, ${g3}, ${b3}))`
    }
  }
  
  handleRoute() {
    // Make sure you only fetch a track if you are inside the track show page
    // and make sure you dont change the backdrop color if you are trying to
    // go to the same history track as the show track
    const background = document.getElementsByClassName("track-show-header-container")[0];
    if (this.props.fetchTrack && this.props.currentTrack.id !== this.props.track.id) {
      this.props.fetchTrack(this.props.track.id)
      this.cuteColors(background)
    }
  }

  handleRoute2() {
    let currentUserShowPage = Number(window.location.href.split('/').pop())
    if (this.props.track.uploader_id !== currentUserShowPage) {
      const background = document.getElementsByClassName("user-show-header-container")[0];
      this.props.fetchUser(this.props.track.uploader_id)
      this.cuteColors(background)
    }
  }

  clickPlaybtn() {
    // Condition to prevent a double click if this is the current track
    if (this.props.track.id !== this.props.currentTrack.id) {
      document.getElementById(this.props.track.id).click()
    }
  }

  render() {
    let sourceMsg
    this.props.sourceMessage ? 
      sourceMsg = <span className="playlist-src-msg">&#8226; {this.props.sourceMessage}</span> :
      sourceMsg = <></>

    return (
      this.props.track ? 
      <li className="playlist-track-item">
        <div className="playlist-track-item-link">
          <div className="playlist-track-icon-container">
            <div className="playlist-img-container" onClick={this.clickPlaybtn}>
              <div className="playlist-play-btn-wrapper">
                <PlayButton track={this.props.track}/>
              </div>
              <div className="playlist-track-icon-link">
                <img src={this.props.track.photoUrl} className="playlist-track-icon" onClick={this.handleRoute}/>
              </div>
            </div> 
          </div>

          <div className="playlist-track-details">
            <span>
              <div className="playlist-detail-wrapper noselect" onClick={this.handleRoute2}>
                { 
                  this.props.track.uploader_id !== this.props.currentUserShowPage ? 
                    <Link to={`/users/${this.props.track.uploader_id}`} className="playlist-item-link"> 
                      {this.props.track.username} {sourceMsg}
                    </Link> : 
                    <p className="playlist-item-link">
                      {this.props.track.username} {sourceMsg}
                    </p>
                }
              </div>
            </span>
            <span>
              <div className="playlist-detail-wrapper noselect" onClick={this.handleRoute}>
                <Link to={`/tracks/${this.props.track.id}`} className="playlist-item-link"> 
                  <p className={`playlist-item-link ${this.props.track.id}`}>
                    {this.props.track.title}
                  </p>
                </Link>
              </div>
            </span> 
          </div>
            <div className="playlist-comment-wrapper">
              <FontAwesomeIcon icon="comment-alt" color="#999" id="playlist-comment-icon"/>
              <span style={{fontSize: 12}}>
                {this.props.track.numComments}
              </span>
            </div>  
        </div>
      </li> : null
    )
  }
}

export default PlaylistIndexItem;