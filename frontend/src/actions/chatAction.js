import axios from 'axios';
import { SET_MESSAGES } from './types';

export const setMessages = (data) => async (dispatch) => {
  dispatch({
    type: SET_MESSAGES,
    payload: { newMessage: data.message }
  });
};

export const sendMessage = (data) => async (dispatch) => {
  try {
    const response = await axios.post(
      process.env.REACT_APP_BACKEND_URL + '/api/chat/',
      data
    );

    dispatch({
      type: SET_MESSAGES,
      payload: { newMessage: { sender: 'bot', text: response.data.message } }
    });
  } catch (error) {
    console.error(error);
    dispatch({
      type: SET_MESSAGES,
      payload: {
        newMessage: { sender: 'bot', text: 'Sorry, something went wrong.' }
      }
    });
  } finally {
    // setLoading(false); // Set loading to false after receiving response
  }
};
