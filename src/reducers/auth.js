export const authInitialState = {
  token: '',
  user: ''
}

export const  AUTH_CONSTANTS = {
  SET_AUTH: 'SET_AUTH'
}


const authReducer = (state = authInitialState, action) => {
  switch (action.type) {
    case AUTH_CONSTANTS.SET_AUTH:
      return {
        token: action.payload.token,
        user: action.payload.user
      }
  }

  return state;
}

export default authReducer;