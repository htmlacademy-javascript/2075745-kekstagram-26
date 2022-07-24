import { findElement, isEnterKey, isEscapeKey, onElementClick } from './utils.js';
import { sendData } from './api.js';
import { minusScale, plusScale, changeScale, defaultFormData } from './slider.js';
import { TYPES_OF_FILE, HASHTAG_RULE, MAX_COUNT_HASHTAGS, MIN_LENGTH_HASHTAG, MAX_LENGTH_DESCRIPTION, MAX_LENGTH_HASHTAG } from './const.js';

const form = findElement(document, '#upload-select-image');
const uploadFile = findElement(form, '#upload-file');
const modalWindow = findElement(form, '.img-upload__overlay');
const imagePreview = findElement(modalWindow, '.img-upload__preview img');
const pictureCancel = findElement(modalWindow, '#upload-cancel');
const scaleSmaller = findElement(modalWindow, '.scale__control--smaller');
const scaleBigger = findElement(modalWindow, '.scale__control--bigger');

export const showPreviewImage = (input) => {
  const file = input.files[0];
  const fileName = file.name.toLowerCase();
  const matches = TYPES_OF_FILE.some((it) => fileName.endsWith(it));

  if (matches) {
    imagePreview.src = URL.createObjectURL(file);
  }
};

uploadFile.addEventListener('change', () => {
  showPreviewImage(uploadFile);
  openModal();
});


form.addEventListener('reset', defaultFormData);
const hashtagsField = findElement(form, '.text__hashtags');

const pristine = new Pristine(form, {
  classTo: 'text__label',
  errorClass: 'text__label--invalid',
  successClass: 'text__label--valid',
  errorTextParent: 'text__label',
  errorTextTag: 'p',
  errorTextClass: 'text__error'
});

const getArrayFromString = (value) => value.toLowerCase().split(' ').filter(String);

const minLength = (arr) => {
  if (arr.length === 0) {
    return false;
  }
  let min = Number.MAX_VALUE;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].length < min) {
      min = arr[i].length;
    }
  }
  return min;
};

const maxLength = (arr) => {
  if (arr.length === 0) {
    return false;
  }
  let max = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].length > max) {
      max = arr[i].length;
    }
  }
  return max;
};

const validateHashtags = (value) => (value.length === 0) ? true : getArrayFromString(value).every((item) => HASHTAG_RULE.test(item));
const checkHashtagCount = (value) => (getArrayFromString(value).length <= MAX_COUNT_HASHTAGS);
const checkHashtagLengthMin = (value) => (getArrayFromString(value).length === 0 || minLength(getArrayFromString(value)) >= MIN_LENGTH_HASHTAG);
const checkHashtagLengthMax = (value) => (maxLength(getArrayFromString(value)) <= MAX_LENGTH_HASHTAG);
const checkDuplicate = (array) => [...new Set(array)].length === array.length;
const checkHashtagRepeat = (value) => checkDuplicate(getArrayFromString(value));
const checkes = [
  { check: validateHashtags, message: 'Хештеги начинаются с #, разделяются пробелом' },
  { check: checkHashtagCount, message: `Количество тегов больше ${MAX_COUNT_HASHTAGS}` },
  { check: checkHashtagLengthMin, message: `Длина тега меньше ${MIN_LENGTH_HASHTAG}` },
  { check: checkHashtagLengthMax, message: `Длина тега больше ${MAX_LENGTH_HASHTAG}, включая #` },
  { check: checkHashtagRepeat, message: 'Повторяющиеся теги' }
];

for (let i = 0; i < checkes.length; i++) {
  pristine.addValidator(
    hashtagsField,
    checkes[i].check,
    checkes[i].message
  );
}

hashtagsField.addEventListener('keydown', (evt) => {
  if (isEscapeKey) {
    evt.stopPropagation();
  }
});

const checkDescription = (value) => value.length <= MAX_LENGTH_DESCRIPTION;

const descriptionField = findElement(form, '.text__description');

pristine.addValidator(
  descriptionField,
  checkDescription,
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

const sliderElementValue = findElement(modalWindow, '.scale__control--value');

function openModal() {
  modalWindow.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.body.addEventListener('keydown', onModalEscKeyDown);
  onElementClick(pictureCancel, closeModal);
  onElementClick(scaleSmaller, minusScale);
  onElementClick(scaleBigger, plusScale);
  sliderElementValue.addEventListener('change', changeScale);
  submitButton.focus();
}

export function closeModal() {
  modalWindow.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.body.removeEventListener('keydown', onModalEscKeyDown);
  pictureCancel.removeEventListener('click', closeModal);
  scaleSmaller.removeEventListener('click', minusScale);
  scaleBigger.removeEventListener('click', plusScale);
  sliderElementValue.removeEventListener('change', changeScale);
  form.reset();
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

  onElementClick(message, (evt) => {
    if (evt.target.classList.contains(typeError)) {
      closeMessage();
    }
  });

  onElementClick(button, closeMessage);
  document.addEventListener('keydown', callEventKeyboard);

  function callEventKeyboard(evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      closeMessage();
    }
  }

  messageFragment.appendChild(message);
  document.body.appendChild(messageFragment);
};

export const setUserFormSubmit = (onSuccess, onError) => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      sendData(
        () => {
          closeModal();
          unblockSubmitButton();
          renderMessage('success', findElement(findElement(document, '#success').content, '.success'));
          form.reset();
        },
        () => {
          closeModal();
          unblockSubmitButton();
          renderMessage('error', findElement(findElement(document, '#error').content, '.error'));
        },
        new FormData(evt.target),
      );
    }
  });
};
