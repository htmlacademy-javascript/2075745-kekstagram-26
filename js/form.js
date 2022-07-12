import { findElement, isEnterKey, isEscapeKey, showAlert } from './utils.js';
import { sendData } from './api.js';

const uploadFile = findElement(document, '#upload-file');
uploadFile.addEventListener('change', openModal);

const modalWindow = findElement(document, '.img-upload__overlay');
const pictureCancel = findElement(modalWindow, '#upload-cancel');

const form = findElement(document, '#upload-select-image');
const pristine = new Pristine(form);
// const pristine = new Pristine(form, {
//   classTo: 'success',
//   errorTextParent: 'success',
//   errorTextClass: 'error',
// });

// < !--Сообщение с ошибкой загрузки изображения-- >
// <template id="error">
//   <section class="error">
//     <div class="error__inner">
//       <h2 class="error__title">Ошибка загрузки файла</h2>
//       <button type="button" class="error__button">Загрузить другой файл</button>
//     </div>
//   </section>
// </template>

// <!--Сообщение об успешной загрузке изображения-- >
// <template id="success">
//   <section class="success">
//     <div class="success__inner">
//       <h2 class="success__title">Изображение успешно загружено</h2>
//       <button type="button" class="success__button">Круто!</button>
//     </div>
//   </section>
// </template>

// <!--Экран загрузки изображения-- >
// <template id="messages">
//   <div class="img-upload__message  img-upload__message--loading">Загружаем...</div>
// </template>

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
  console.log('Проверка на # пройдена');

  if (arr.length > MAX_COUNT_HASHTAGS) {
    showAlert(`Количество хэштегов больше ${MAX_COUNT_HASHTAGS}`);
    return `Количество хэштегов больше ${MAX_COUNT_HASHTAGS}`;
  }
  console.log('Проверка на количество хештегов пройдена');

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
  console.log('Проверка на длину тегов пройдена');

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
  console.log('Тест на повторы пройден');

  for (let i = 0; i < arr.length; i++) {
    if (!(/^[a-zA-Z0-9\d]+$/.test(arr[i]))) {
      showAlert(`Элемент содержит запрещенные символы: ${arr[i]}`);
      return `Элемент содержит запрещенные символы: ${arr[i]}`;
    }
  }
  console.log('Проверка на запрещенные символы пройдена');
  console.log(`${str} ГОДЕН`);

  const templateSuccess = findElement(document, '#success');
  const templateSection = findElement(templateSuccess.content, 'section');
  const templateFragment = document.createDocumentFragment();
  const successElement = templateSection.cloneNode(true);
  const successTitle = findElement(successElement, 'h2');
  successTitle.textContent = 'Ошибка по умолчанию/Успешно';
  templateFragment.appendChild(successElement);
  return true;
}

// validateHashtags('#fdsfds #FDSFDS1 #vvxcvxc #12345');

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

// ?focus по-прежнему на основном окне, при нажатии на Enter снова открывается форма
function openModal() {
  modalWindow.classList.remove('hidden');
  const body = findElement(document, 'body');
  body.classList.add('modal-open');
  console.log('открыто модальное окно');
  // renderPicture(image);
  body.addEventListener('keydown', onModalEscKeyDown);
}

export function closeModal() {
  modalWindow.classList.add('hidden');
  const body = findElement(document, 'body');
  body.classList.remove('modal-open');
  // надо ли чистить что-то за собой ? анти rendererPicture
  body.removeEventListener('keydown', onModalEscKeyDown);
  uploadFile.value = '';
}

pictureCancel.addEventListener('click', () => {
  closeModal();
});

pictureCancel.addEventListener('keydown', (evt) => {
  if (isEnterKey(evt)) {
    closeModal();
  }
});

const submitButton = findElement(form, '#upload-submit');
const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Публикую...';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

export const setUserFormSubmit = (onSuccess) => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      sendData(
        () => {
          onSuccess();
          unblockSubmitButton();
        },
        () => {
          showAlert('Не удалось отправить форму. Попробуйте ещё раз');
          unblockSubmitButton();
        },
        new FormData(evt.target),
      );
    }
  });
};

//     Заведите модуль, который будет отвечать за работу с формой.
//     Пропишите тегу < form > правильные значения атрибутов method и адрес action для отправки формы на сервер.
//         Обратите внимание.В разделе про работу с сетью мы доработаем механизм отправки данных, а пока достаточно правильных атрибутов у тега < form >.
//         Если форма заполнена верно, то после отправки покажется страница сервера(по адресу из атрибута action тега form) с успешно отправленными данными.Если же форма пропустила какие - то некорректные значения, то будет показана страница с допущенными ошибками.В идеале у пользователя не должно быть сценария, при котором он может отправить некорректную форму.
//     Проверьте разметку вашего проекта и добавьте недостающие атрибуты.Например, всем обязательным полям нужно добавить атрибут required.Затем проверьте, правильные ли типы стоят у нужных полей, если нет — проставьте правильные.
//   Изучите, что значит загрузка изображения, и как, когда и каким образом показывается форма редактирования изображения.Напишите код и добавьте необходимые обработчики для реализации этого пункта техзадания.В работе вы можете опираться на код показа окна с полноразмерной фотографией, который вы, возможно, уже написали в предыдущей домашней работе.
//     Важно.Подстановка выбранного изображения в форму — это отдельная домашняя работа.В данном задании этот пункт реализовывать не нужно.
//     После реализуйте закрытие формы.
//         Обратите внимание, что при закрытии формы дополнительно необходимо сбрасывать значение поля выбора файла #upload - file.В принципе, всё будет работать, если при повторной попытке загрузить в поле другую фотографию.Но! Событие change не сработает, если пользователь попробует загрузить ту же фотографию, а значит окно с формой не отобразится, что будет нарушением техзадания.Значение других полей формы также нужно сбрасывать.
//     Напишите код для валидации формы добавления изображения.Список полей для валидации:
// Хэш - теги
// Комментарий
//         На расширенном тарифе валидацию хэш - тегов делать не нужно.Достаточно проверки, что поле не пустое.
//     Реализуйте логику проверки так, чтобы, как минимум, она срабатывала при попытке отправить форму и не давала этого сделать, если форма заполнена не по правилам.При желании, реализуйте проверки сразу при вводе значения в поле.
// Как отменить обработчик Esc при фокусе ?
//   Валидация хеш - тегов ?
//     Поля, не перечисленные в техзадании, но существующие в разметке, особой валидации не требуют.
