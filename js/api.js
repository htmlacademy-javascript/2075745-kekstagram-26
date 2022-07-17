import { createPosts } from './data.js';

export const getData = (onSuccess) => {
  fetch('https://26.javascript.pages.academy/kekstagram/data')
    .then((response) => response.json())
    .then((messages) => {
      onSuccess(messages);
      // createPosts(messages);
    });
};

export const sendData = (onSuccess, onFail, body) => {
  fetch(
    'https://26.javascript.pages.academy/kekstagram',
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

export function onSuccessMessage() {
  console.log('Успешно');
}

export function onFailMessage() {
  console.log('Неудачно');
}
