import { findElement, isEnterKey, isEscapeKey, showAlert } from './utils.js';
import { sendData } from './api.js';
import { minusScale, plusScale, changeScale, defaultFormData } from './slider.js';

const TYPES_OF_FILE = ['gif', 'jpg', 'jpeg', 'png'];
export const showPreviewImage = (input) => {
  const file = input.files[0];
  const fileName = file.name.toLowerCase();

  const matches = TYPES_OF_FILE.some((it) => fileName.endsWith(it));
  const imagePreview = findElement(document, '.img-upload__preview img');

  if (matches) {
    imagePreview.src = URL.createObjectURL(file);
  }
};

const uploadFile = findElement(document, '#upload-file');
uploadFile.addEventListener('change', () => {
  showPreviewImage(uploadFile);
  openModal();
});

const modalWindow = findElement(document, '.img-upload__overlay');
const pictureCancel = findElement(modalWindow, '#upload-cancel');

const form = findElement(document, '#upload-select-image');
form.addEventListener('reset', defaultFormData);
const pristine = new Pristine(form);
// const pristine = new Pristine(form, {
//   classTo: 'success',
//   errorTextParent: 'success',
//   errorTextClass: 'error',
// });

// const pristine = new Pristine(form, {
//   classTo: 'text__label',
//   errorClass: 'text__label--invalid',
//   successClass: 'text__label--valid',
//   errorTextParent: 'text__label',
//   errorTextTag: 'p',
//   errorTextClass: 'text__error'
// });

// const resetForm = () => {
//   uploadButton.value = '';
//   hashtagsInput.textContent = '';
//   commentArea.textContent = '';
//   resetEffect();
// };

function validateHashtags(str) {
  const arr = [];
  const MAX_COUNT_HASHTAGS = 5;

  const target = '#'; // цель поиска
  let position = 0;
  let foundPos = -2;
  foundPos = str.indexOf(target, position);
  while (foundPos !== -1) {
    position = foundPos + 1; // продолжаем со следующей позиции
    foundPos = str.indexOf(target, position);
    arr.push(str.slice(position, (foundPos !== -1) ? foundPos : str.length));
  }
  if (str.length > 0 && arr.length === 0) {
    showAlert('# не найден');
    return '# не найден';
  }
  // Проверка на # пройдена

  if (arr.length > MAX_COUNT_HASHTAGS) {
    showAlert(`Количество хэштегов больше ${MAX_COUNT_HASHTAGS}`);
    return `Количество хэштегов больше ${MAX_COUNT_HASHTAGS}`;
  }
  // Проверка на количество хештегов пройдена

  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i].slice(-1) !== ' ') {
      showAlert('Пробел не найден');
      return 'Пробел не найден';
    }
  }

  // Удаление пробелов в конце тегов
  for (let i = 0; i < arr.length; i++) {
    while ((arr[i].slice(-1) === ' ')) {
      arr[i] = arr[i].slice(0, -1);
    }
  }

  for (let i = 0; i < arr.length; i++) {
    if (arr[i].length < 1) {
      showAlert('Тег состоит только из #');
      return 'Тег состоит только из #';
    }
    if (arr[i].length > 19) {
      showAlert('Длина тега больше 20, включая #');
      return 'Длина тега больше 20, включая #';
    }
  }
  // Проверка на длину тегов пройдена

  for (let i = 0; i < arr.length; i++) {
    arr[i] = arr[i].toLowerCase();
  }
  const test = arr.filter((elem, pos, array) =>
    (array.indexOf(elem.toLowerCase()) !== array.lastIndexOf(elem.toLowerCase()))
  );

  if (test.length > 0) {
    showAlert(`Есть повторяющиеся элементы: ${test}`);
    return `Есть повторяющиеся элементы: ${test}`;
  }
  // Тест на повторы пройден

  for (let i = 0; i < arr.length; i++) {
    if (!(/^[a-zA-Z0-9\d]+$/.test(arr[i]))) {
      showAlert(`Элемент содержит запрещенные символы: ${arr[i]}`);
      return `Элемент содержит запрещенные символы: ${arr[i]}`;
    }
  }
  // Проверка на запрещенные символы пройдена
  // console.log(`${str} ГОДЕН`);

  const templateSuccess = findElement(document, '#success');
  const templateSection = findElement(templateSuccess.content, 'section');
  const templateFragment = document.createDocumentFragment();
  const successElement = templateSection.cloneNode(true);
  const successTitle = findElement(successElement, 'h2');
  successTitle.textContent = 'Ошибка по умолчанию/Успешно';
  templateFragment.appendChild(successElement);
  return true;
}

// function validateHashtagsLength(value) {
//   return value.length >= 2 && value.length <= 20;
// }

const MAX_LENGTH_DESCRIPTION = 140;
function validateDescription(str) {

  if (str.length > MAX_LENGTH_DESCRIPTION) {
    showAlert(`Превышена максимальная длина описания ${MAX_LENGTH_DESCRIPTION}`);
    return `Превышена максимальная длина описания ${MAX_LENGTH_DESCRIPTION}`;
  }
  return true;
}

const hashtagsField = findElement(form, '.text__hashtags');
pristine.addValidator(hashtagsField, validateHashtags);

hashtagsField.addEventListener('keydown', (evt) => {
  if (isEscapeKey) {
    evt.stopPropagation();
  }
});

const descriptionField = findElement(form, '.text__description');
pristine.addValidator(descriptionField, validateDescription);

descriptionField.addEventListener('keydown', (evt) => {
  if (isEscapeKey) {
    evt.stopPropagation();
  }
});


// __________________ Повтор кода picture.js
// о чем говорится в задании
// В работе вы можете опираться на код показа окна с полноразмерной фотографией, который вы, возможно, уже написали в предыдущей домашней работе.
// renderPicture - другой

const onModalEscKeyDown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeModal();
  }
};
const submitButton = findElement(form, '#upload-submit');

// ?focus по-прежнему на основном окне, при нажатии на Enter снова открывается форма
function openModal() {
  modalWindow.classList.remove('hidden');
  const body = findElement(document, 'body');
  body.classList.add('modal-open');
  // renderPicture(image);
  body.addEventListener('keydown', onModalEscKeyDown);
  pictureCancel.addEventListener('click', closeModal);
  const buttonMinus = findElement(document, '.scale__control--smaller');
  buttonMinus.addEventListener('click', minusScale);
  const buttonPlus = findElement(document, '.scale__control--bigger');
  buttonPlus.addEventListener('click', plusScale);
  const sliderElementValue = findElement(document, '.scale__control--value');
  sliderElementValue.onchange = changeScale;
  submitButton.focus();
}

export function closeModal() {
  modalWindow.classList.add('hidden');
  const body = findElement(document, 'body');
  body.classList.remove('modal-open');
  // надо ли чистить что-то за собой ? анти rendererPicture
  body.removeEventListener('keydown', onModalEscKeyDown);
  uploadFile.value = '';
}

pictureCancel.addEventListener('keydown', (evt) => {
  if (isEnterKey(evt)) {
    closeModal();
  }
});

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Публикую...';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

// ---

function callEventKeyboardSuccess(evt) {
  if (evt.key === 'Escape') {
    removeSuccessWindow();
  }
}
function callMouseOfSuccess() {
  removeSuccessWindow();
}

function removeWindow() {
  const successClass = findElement(document, '.success');
  successClass.removeEventListener('click', callMouseOfSuccess);
  document.removeEventListener('keydown', callEventKeyboardSuccess);
  successClass.remove();
}

function removeSuccessWindow(successButton) {
  successButton.addEventListener('click', () => {
    removeWindow();
  });
}

function showMessageSuccess() {
  const template = findElement(document, '#success');
  const templateSuccess = findElement(template.content, '.success');
  const copyOfSuccess = templateSuccess.cloneNode(true);
  document.body.appendChild(copyOfSuccess);
  const buttonSuccess = findElement(copyOfSuccess, '.success__button');
  // createSuccessButton(buttonSuccess);
  removeSuccessWindow(buttonSuccess);
  document.addEventListener('keydown', callEventKeyboard);
  const successWindow = findElement(document, '.success');
  successWindow.addEventListener('click', callMouseOfSuccess);
}

function showMessageError() {
  const template = findElement(document, '#error');
  const templateError = findElement(template.content, '.error');
  const copyOfError = templateError.cloneNode(true);
  document.body.appendChild(copyOfError);
  const buttonError = findElement(copyOfError, '.error__button');
  createErrorButton(buttonError);
  document.addEventListener('keydown', callEventKeyboard);
  const errorWindow = findElement(document, '.error');
  errorWindow.addEventListener('click', callMouseOfError);
}

function removeErrorWindow() {
  const errorClass = findElement(document, '.error');
  errorClass.removeEventListener('click', callMouseOfError);
  document.removeEventListener('keydown', callEventKeyboard);
  errorClass.remove();
}

function createErrorButton(errorButton) {
  errorButton.addEventListener('click', () => {
    removeErrorWindow();
  });
}

function callEventKeyboard(evt) {
  if (evt.key === 'Escape') {
    removeErrorWindow();
  }
}
function callMouseOfError() {
  removeErrorWindow();
}

export const setUserFormSubmit = (onSuccess, onError) => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      sendData(
        () => {
          onSuccess();
          unblockSubmitButton();
          showMessageSuccess();
          form.reset();
        },
        () => {
          onError();
          unblockSubmitButton();
          showMessageError();
        },
        new FormData(evt.target),
      );
    }
  });
};
