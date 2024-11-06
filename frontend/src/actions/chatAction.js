import { SET_MESSAGES, ADD_SUB_MESSAGE } from './types';

export const setMessages = (data) => async (dispatch) => {
  dispatch({
    type: SET_MESSAGES,
    payload: { newMessage: data.message }
  });
};

export const sendMessage = (data) => async (dispatch) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/api/chat/`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify(data)
      }
    );

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let partialMessage = '';
    let k = 0;

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;

      const text = decoder.decode(value);
      const lines = (partialMessage + text).split('\n');
      partialMessage = lines.pop(); // Keep the last partial line

      for (const line of lines) {
        if (line.trim() && k === 0) {
          try {
            const chunk = JSON.parse(line);
            dispatch({
              type: SET_MESSAGES,
              payload: { newMessage: { sender: 'bot', text: chunk.message } }
            });
          } catch (e) {
            console.error('Error parsing JSON:', e);
          }
        } else if (line.trim()) {
          try {
            const chunk = JSON.parse(line);
            dispatch({
              type: ADD_SUB_MESSAGE,
              payload: { message: { sender: 'bot', text: chunk.message } }
            });
          } catch (e) {
            console.error('Error parsing JSON:', e);
          }
        }

        k++;
      }
    }
  } catch (error) {
    console.error(error);
    dispatch({
      type: SET_MESSAGES,
      payload: {
        newMessage: { sender: 'bot', text: 'Sorry, something went wrong.' }
      }
    });
  }
};
