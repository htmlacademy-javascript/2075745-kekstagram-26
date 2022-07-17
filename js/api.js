import { createPosts } from './data.js';

export const getData = (onSuccess) => {
  fetch('https://26.javascript.pages.academy/kekstagram/data')
    .then((response) => response.json())
    .then((messages) => {
      onSuccess(messages);
      createPosts(messages);
    });
};

export const sendData = (onSuccess, onFail, body) => {
  fetch(
    'https://26.javascript.pages.academy/kekstagram',
    {
      method: 'POST',
      // enctype: 'multipart/form-data',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail('Не удалось отправить форму. Попробуйте ещё раз');
      }
    })
    .catch(() => {
      onFail('Не удалось отправить форму. Попробуйте ещё раз');
    });
};

export function onSuccessMessage() {
  console.log('Успешно');
}

export function onFailMessage() {
  console.log('Неудачно');
}
