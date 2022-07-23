import { findElement, isEnterKey, isEscapeKey, elementAddEventClick } from './utils.js';
import { sendData } from './api.js';
import { minusScale, plusScale, changeScale, defaultFormData } from './slider.js';
import { TYPES_OF_FILE, HASHTAG_RULE, MAX_COUNT_HASHTAGS, MAX_LENGTH_DESCRIPTION } from './const.js';

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
const hashtagsField = findElement(form, '.text__hashtags');
// const pristine = new Pristine(form);

const pristine = new Pristine(form, {
  classTo: 'text__label',
  errorClass: 'text__label--invalid',
  successClass: 'text__label--valid',
  errorTextParent: 'text__label',
  errorTextTag: 'p',
  errorTextClass: 'text__error'
});

const getArrayFromString = (value) => value.toLowerCase().split(' ').filter(String);

const validateHashtags = (value) => {
  // при пустом поле возвращаем true
  if (value.length === 0) {
    return true;
  }
  return getArrayFromString(value).every((it) => HASHTAG_RULE.test(it));
};

const minLength = function (arr) {
  let min = Number.MAX_VALUE;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].length < min) {
      min = arr[i].length;
    }
  }
  return min;
};

const maxLength = function (arr) {
  let max = Number.EPSILON;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].length > max) {
      max = arr[i].length;
    }
  }
  return max;
};

const checkHashtagCount = (value) => (getArrayFromString(value).length <= MAX_COUNT_HASHTAGS);
const checkHashtagLengthMin = (value) => (getArrayFromString(value).length === 0 || minLength(getArrayFromString(value)) >= 2);
const checkHashtagLengthMax = (value) => (maxLength(getArrayFromString(value)) <= 20);
const checkDuplicate = (array) => [...new Set(array)].length === array.length;
const checkHashtagRepeat = (value) => checkDuplicate(getArrayFromString(value));

pristine.addValidator(
  hashtagsField,
  validateHashtags,
  'Хештеги начинаются с #, разделяются пробелом'
);

pristine.addValidator(
  hashtagsField,
  checkHashtagCount,
  `Количество тегов больше ${MAX_COUNT_HASHTAGS}`
);

pristine.addValidator(
  hashtagsField,
  checkHashtagLengthMin,
  'Длина тега меньше 2'
);
pristine.addValidator(
  hashtagsField,
  checkHashtagLengthMax,
  'Длина тега больше 20, включая #'
);
pristine.addValidator(
  hashtagsField,
  checkHashtagRepeat,
  'Повторяющиеся теги'
);

hashtagsField.addEventListener('keydown', (evt) => {
  if (isEscapeKey) {
    evt.stopPropagation();
  }
});

const validateDescription = (value) => value.length <= MAX_LENGTH_DESCRIPTION;

const descriptionField = findElement(form, '.text__description');

pristine.addValidator(
  descriptionField,
  validateDescription,
  `Превышена максимальная длина описания ${MAX_LENGTH_DESCRIPTION}`
);

descriptionField.addEventListener('keydown', (evt) => {
  if (isEscapeKey) {
    evt.stopPropagation();
  }
});

const onModalEscKeyDown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeModal();
  }
};
const submitButton = findElement(form, '#upload-submit');

const body = findElement(document, 'body');
function openModal() {
  modalWindow.classList.remove('hidden');
  body.classList.add('modal-open');
  body.addEventListener('keydown', onModalEscKeyDown);

  elementAddEventClick(findElement(modalWindow, '#upload-cancel'), closeModal);
  elementAddEventClick(findElement(modalWindow, '.scale__control--smaller'), minusScale);
  elementAddEventClick(findElement(modalWindow, '.scale__control--bigger'), plusScale);

  const sliderElementValue = findElement(document, '.scale__control--value');
  sliderElementValue.onchange = changeScale;
  submitButton.focus();
}

export function closeModal() {
  modalWindow.classList.add('hidden');
  body.classList.remove('modal-open');
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

const renderMessage = (typeError, template) => {
  const messageFragment = document.createDocumentFragment();
  const message = template.cloneNode(true);
  const button = message.querySelector(`.${typeError}__button`);

  const closeMessage = () => {
    message.remove();
    document.removeEventListener('keydown', callEventKeyboard);
  };

  message.addEventListener('click', (evt) => {
    if (evt.target.classList.contains(typeError)) {
      closeMessage();
    }
  });

  button.addEventListener('click', closeMessage);
  document.addEventListener('keydown', callEventKeyboard);

  function callEventKeyboard(evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      closeMessage();
    }
  }

  messageFragment.appendChild(message);
  body.appendChild(messageFragment);
};

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
          renderMessage('success', findElement(findElement(document, '#success').content, '.success'));
          form.reset();
        },
        () => {
          onError();
          unblockSubmitButton();
          renderMessage('error', findElement(findElement(document, '#error').content, '.error'));
        },
        new FormData(evt.target),
      );
    }
  });
};
