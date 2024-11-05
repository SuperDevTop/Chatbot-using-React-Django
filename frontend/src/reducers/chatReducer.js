import { SET_MESSAGES } from 'src/actions/types';

const initialState = {
  messages: []
};

const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_MESSAGES:
      const { newMessage } = action.payload;

      return {
        ...state,
        messages: [...state.messages, newMessage]
      };

    default:
      return state;
  }
};

export default chatReducer;
