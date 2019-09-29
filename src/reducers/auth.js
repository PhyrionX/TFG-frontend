export const authInitialState = {
  token: '',
  user: '',
  email: ''
}

export const  AUTH_CONSTANTS = {
  SET_AUTH: 'SET_AUTH',
  LOGOUT: 'LOGOUT'
}


const authReducer = (state = authInitialState, action) => {
  switch (action.type) {
    case AUTH_CONSTANTS.SET_AUTH:
      return {
        token: action.payload.token,
        user: action.payload.user,
        email: action.payload.email
      }
    case AUTH_CONSTANTS.LOGOUT:
      return authInitialState
  }

  return state;
}

export default authReducer;