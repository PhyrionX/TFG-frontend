export const testInitialState = {
  counter: 200
}

const testReducer = (state = testInitialState, action) => {
  switch (action.type) {
    case 'increment-counter':
      return {
        counter: state.counter + 1
      }
    case 'decrement-counter':
      return {
        counter: state.counter - 1
      }
  }

  return state;
}

export default testReducer;