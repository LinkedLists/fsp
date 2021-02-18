import React from 'react';
import { connect } from 'react-redux';
import NavBar from './navbar'
import { openModal } from '../../actions/modal_actions';
import { login, logout } from '../../actions/session_actions'

// importing just to test it out
import { fetchTracks } from '../../actions/track_actions'

const mapStateToProps = (state) => {
  return {
    state,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: (user) => dispatch(login(user)),
    logout: () => dispatch(logout()),
    openModal: modal => dispatch(openModal(modal)),

    // fetching tracks just for a test
    fetchTracks: () => dispatch(fetchTracks())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)