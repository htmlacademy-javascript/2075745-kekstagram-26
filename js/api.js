import { GET_DATA_SERVER, POST_DATA_SERVER } from './const.js';

export const getData = (onSuccess, onFail) => {
  fetch(GET_DATA_SERVER)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        onFail();
      }
    })
    .then((messages) => {
      onSuccess(messages);
    })
    .catch(() => {
      onFail();
    });

};

export const sendData = (onSuccess, onFail, body) => {
  fetch(
    POST_DATA_SERVER,
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail();
      }
    })
    .catch(() => {
      onFail();
    });
};
