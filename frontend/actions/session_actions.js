import * as SessionAPIUtil from "../util/session_api_util"

export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const LOGOUT_CURRENT_USER = "LOGOUT_CURRENT_USER";
export const RECEIVE_SESSION_ERRORS = "RECEIVE_SESSION_ERRORS";

const receiveCurrentUser = (user) => ({
  type: RECEIVE_CURRENT_USER,
  user
})

const logoutCurrentUser = () => ({
  type: LOGOUT_CURRENT_USER,
})

const receiveERRORS = (errors) => ({
  type: RECEIVE_SESSION_ERRORS,
  errors
})

export const login = (user) => (dispatch) => (
  SessionAPIUtil.login(user).then( user => dispatch(receiveCurrentUser(user)) ).catch(dispatch(receiveERRORS))
)

export const logout = () => (dispatch) => (
  SessionAPIUtil.logout().then( () => dispatch(logoutCurrentUser()) )
)

export const signup = (user) => (dispatch) => (
  SessionAPIUtil.signup(user).then( user => dispatch(receiveCurrentUser(user)), err => dispatch(receiveERRORS(err.responseJSON) ) )
  // SessionAPIUtil.signup(user).then( user => dispatch(receiveCurrentUser(user)) ).catch(dispatch(receiveERRORS))
)
