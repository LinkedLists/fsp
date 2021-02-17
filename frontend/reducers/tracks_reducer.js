import { RECEIVE_ALL_TRACKS, RECEIVE_TRACK, REMOVE_TRACK } from "../actions/track_actions";

const TracksReducer = (oldState = {}, action) => {
  Object.freeze(oldState);

  switch(action.type) {
    case RECEIVE_ALL_TRACKS:
      return action.tracks
    case RECEIVE_TRACK:
      return Object.assign({}, oldState, {id: action.track.id})
    case REMOVE_TRACK:
      return Object.assign({}, oldState, {id: null})
    default:
      return oldState
  }
}

export default TracksReducer