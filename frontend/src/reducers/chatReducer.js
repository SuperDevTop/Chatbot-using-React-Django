import { SET_MESSAGES, ADD_SUB_MESSAGE } from 'src/actions/types';

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

    case ADD_SUB_MESSAGE:
      const { message } = action.payload;
      const lastMessage = state.messages[state.messages.length - 1];
      const updatedLastMessage = {
        ...lastMessage,
        text: lastMessage.text + message.text
      };

      // console.log([...state.messages.slice(0, -1), updatedLastMessage]);
      
      return {
        ...state,
        messages: [...state.messages.slice(0, -1), updatedLastMessage]
      };

    default:
      return state;
  }
};

export default chatReducer;
